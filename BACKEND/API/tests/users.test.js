const request = require("supertest");
const app = require("../app");

let token = "";
const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

beforeAll(async () => {
  const response = await request(app).post("/backend/users/Login").send({
    name: "admin",
    password: "admin",
  });
  token = response.body.token;
});

describe("No User", () => {
  it("sends invalid user", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      password: "password",
    });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" is required',
          path: ["name"],
          type: "any.required",
          context: {
            label: "name",
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Empty User", () => {
  it("sends invalid user", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "",
      password: "password",
    });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" is not allowed to be empty',
          path: ["name"],
          type: "string.empty",
          context: {
            label: "name",
            key: "name",
            value: ""
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("No Password", () => {
  it("sends invalid user", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "admin",
    });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" is required',
          path: ["password"],
          type: "any.required",
          context: {
            label: "password",
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Empty Password", () => {
  it("sends invalid user", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "admin",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" is not allowed to be empty',
          path: ["password"],
          type: "string.empty",
          context: {
            label: "password",
            key: "password",
            value: ""
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Wrong User", () => {
  it("sends invalid user", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "administrator",
      password: "password",
    });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      code: 10,
      data: { login: false },
      msg: "Invalid User.",
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Wrong Password", () => {
  it("sends invalid password", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "admin",
      password: "password",
    });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      code: 10,
      data: { login: false },
      msg: "Invalid Password.",
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Success Login", () => {
  it("sends correct credentials", async () => {
    const res = await request(app).post("/backend/users/Login").send({
      name: "admin",
      password: "admin",
    });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      code: 200,
      data: {
        login: true,
        name: "admin",
        adminPrivileges: true,
        _id: "64a59890ce6902541cd6ec22",
      },
      msg: "Login Success.",
    };

    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Add New User (No Token)", () => {
  it("request with out token", async () => {
    const randomUser = makeid(10);
    const res = await request(app).post("/backend/users").send({
      name: randomUser,
      password: "Hola123*",
      adminPrivileges: false,
    });
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (No Valid Token)", () => {
  const randomUser = makeid(10);
  it("request with out token", async () => {
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", "no valid token")
      .send({
        name: randomUser,
        password: "Hola123*",
        adminPrivileges: false,
      });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user invalid)", () => {
  it("request to create a new user which name is invalid", async () => {
    const userInvalid = false;
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: userInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" must be a string',
          path: ["name"],
          type: "string.base",
          context: {
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user invalid)", () => {
  it("request to create a new user which name is invalid", async () => {
    const userInvalid = "user123.";
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: userInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" must only contain alpha-numeric characters',
          path: ["name"],
          type: "string.alphanum",
          context: {
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user invalid)", () => {
  it("request to create a new user which name is invalid", async () => {
    const userInvalid = "";
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: userInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" is not allowed to be empty',
          path: ["name"],
          type: "string.empty",
          context: {
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user invalid)", () => {
  it("request to create a new user which name is invalid", async () => {
    const userInvalid = "user";
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: userInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" length must be at least 5 characters long',
          path: ["name"],
          type: "string.min",
          context: {
            limit: 5,
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user invalid)", () => {
  it("request to create a new user which name is invalid", async () => {
    const userInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: userInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"name" length must be less than or equal to 255 characters long',
          path: ["name"],
          type: "string.max",
          context: {
            limit: 255,
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (no user)", () => {
  it("request to create a new user which name is invalid", async () => {
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" is required',
          path: ["name"],
          type: "any.required",
          context: {
            label: "name",
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (password invalid)", () => {
  it("request to create a new user which password is invalid", async () => {
    const passwordInvalid = false;
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" must be a string',
          path: ["password"],
          type: "string.base",
          context: {
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (password invalid)", () => {
  it("request to create a new user which password is invalid", async () => {
    const passwordInvalid = "";
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" is not allowed to be empty',
          path: ["password"],
          type: "string.empty",
          context: {
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (password invalid)", () => {
  it("request to create a new user which password is invalid", async () => {
    const passwordInvalid = "hola";
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: `\"password\" with value \"${passwordInvalid}\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`,
          path: ["password"],
          type: "string.pattern.base",
          context: {
            regex: {},
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (password invalid)", () => {
  it("request to create a new user which password is invalid", async () => {
    const passwordInvalid =
      "Hola123********************************************************************************************************************************************************************************************************************************************************************************************";
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"password" length must be less than or equal to 255 characters long',
          path: ["password"],
          type: "string.max",
          context: {
            limit: 255,
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (no password)", () => {
  it("request to create a new user which password is invalid", async () => {
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" is required',
          path: ["password"],
          type: "any.required",
          context: {
            label: "password",
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (adminPrivileges invalid)", () => {
  it("request to create a new user which adminPrivileges is invalid", async () => {
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: "Hola123*",
        adminPrivileges: 1,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"adminPrivileges" must be a boolean',
          path: ["adminPrivileges"],
          type: "boolean.base",
          context: {
            label: "adminPrivileges",
            value: 1,
            key: "adminPrivileges",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (no adminPrivileges)", () => {
  it("request to create a new user which adminPrivileges is invalid", async () => {
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: "Hola123*",
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"adminPrivileges" is required',
          path: ["adminPrivileges"],
          type: "any.required",
          context: {
            label: "adminPrivileges",
            key: "adminPrivileges",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User (user already exists)", () => {
  it("request to create a new user which name already exists in database", async () => {
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: "admin",
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: {},
      msg: "User already exists in DB.",
      code: 10,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add New User", () => {
  it("request to create a new user in database", async () => {
    const randomUser = makeid(10);
    const res = await request(app)
      .post("/backend/users")
      .set("x-access-token", token)
      .send({
        name: randomUser,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(201);
    const expectedResult = {
      data: {
        name: randomUser,
        adminPrivileges: false,
      },
      msg: "User created in DB.",
      code: 200,
    };

    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get User List (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get("/backend/users");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get User List (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/users")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const userInvalid = "user123.";
    const res = await request(app)
      .get(`/backend/users?name=${userInvalid}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" must only contain alpha-numeric characters',
          path: ["name"],
          type: "string.alphanum",
          context: {
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const userInvalid = "";
    const res = await request(app)
      .get(`/backend/users?name=${userInvalid}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"name" is not allowed to be empty',
          path: ["name"],
          type: "string.empty",
          context: {
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const userInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .get(`/backend/users?name=${userInvalid}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"name" length must be less than or equal to 255 characters long',
          path: ["name"],
          type: "string.max",
          context: {
            limit: 255,
            label: "name",
            value: userInvalid,
            key: "name",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const res = await request(app)
      .get(`/backend/users?adminPrivileges=1`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"adminPrivileges" must be a boolean',
          path: ["adminPrivileges"],
          type: "boolean.base",
          context: {
            label: "adminPrivileges",
            value: "1",
            key: "adminPrivileges",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const userInvalid = "";
    const res = await request(app)
      .get(`/backend/users?orderName=${userInvalid}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderName" must be one of [asc, desc]',
          path: ["orderName"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderName",
            value: "",
            key: "orderName",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filter invalid)", () => {
  it("request user list", async () => {
    const userInvalid = "";
    const res = await request(app)
      .get(`/backend/users?orderAdminPrivileges=${userInvalid}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderAdminPrivileges" must be one of [asc, desc]',
          path: ["orderAdminPrivileges"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderAdminPrivileges",
            value: "",
            key: "orderAdminPrivileges",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Users (filtered)", () => {
  it("request user list", async () => {
    const res = await request(app)
      .get(`/backend/users?orderAdminPrivileges=asc&name=adm`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          _id: "64a59890ce6902541cd6ec22",
          name: "admin",
          adminPrivileges: true,
          __v: 0,
        },
      ],
      msg: "User List.",
      code: 200,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get User List", () => {
  it("request user list", async () => {
    const res = await request(app)
      .get("/backend/users")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "User List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Update User (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).put("/backend/users").send({
      password: "Hola123*",
      adminPrivileges: false,
    });
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", "no valid token")
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" is required',
          path: ["_id"],
          type: "any.required",
          context: {
            label: "_id",
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" must be a string',
          path: ["_id"],
          type: "string.base",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" is not allowed to be empty',
          path: ["_id"],
          type: "string.empty",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" length must be at least 24 characters long',
          path: ["_id"],
          type: "string.min",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const idInvalid = "64a5a590648bd50348e07e37q";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"_id" length must be less than or equal to 24 characters long',
          path: ["_id"],
          type: "string.max",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" is required',
          path: ["_id"],
          type: "any.required",
          context: {
            label: "_id",
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const passwordInvalid = false;
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" must be a string',
          path: ["password"],
          type: "string.base",
          context: {
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const passwordInvalid = "";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"password" is not allowed to be empty',
          path: ["password"],
          type: "string.empty",
          context: {
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const passwordInvalid = "test";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: `\"password\" with value \"${passwordInvalid}\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`,
          path: ["password"],
          type: "string.pattern.base",
          context: {
            regex: {},
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to update which is invalid", async () => {
    const passwordInvalid =
      "Hola123********************************************************************************************************************************************************************************************************************************************************************************************";
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: passwordInvalid,
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"password" length must be less than or equal to 255 characters long',
          path: ["password"],
          type: "string.max",
          context: {
            limit: 255,
            label: "password",
            value: passwordInvalid,
            key: "password",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User (user invalid)", () => {
  it("request to create a new user which adminPrivileges is invalid", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: "Hola123*",
        adminPrivileges: 1,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"adminPrivileges" must be a boolean',
          path: ["adminPrivileges"],
          type: "boolean.base",
          context: {
            label: "adminPrivileges",
            value: 1,
            key: "adminPrivileges",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User", () => {
  it("request to update user which in database", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        adminPrivileges: false,
      });

    expect(res.statusCode).toEqual(201);
    const expectedResult = {
      data: {
        _id: "64a5a590648bd50348e07e37",
        name: "user2",
        adminPrivileges: false,
        __v: 0,
      },
      msg: "User updated in DB.",
      code: 200,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update User", () => {
  it("request to update user which in database", async () => {
    const res = await request(app)
      .put("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: "64a5a590648bd50348e07e37",
        password: "Hola123**",
      });

    expect(res.statusCode).toEqual(201);
    const expectedResult = {
      data: {
        _id: "64a5a590648bd50348e07e37",
        name: "user2",
        adminPrivileges: false,
        __v: 0,
      },
      msg: "User updated in DB.",
      code: 200,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).delete("/backend/users");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (user invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" is required',
          path: ["_id"],
          type: "any.required",
          context: {
            label: "_id",
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (user invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" must be a string',
          path: ["_id"],
          type: "string.base",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (user invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" is not allowed to be empty',
          path: ["_id"],
          type: "string.empty",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (user invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" length must be at least 24 characters long',
          path: ["_id"],
          type: "string.min",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User (user invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "64a5a590648bd50348e07e37q";
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"_id" length must be less than or equal to 24 characters long',
          path: ["_id"],
          type: "string.max",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete User", () => {
  it("request to delete user", async () => {
    const idInvalid = "64ac817182ac043f20b5f79a";
    const res = await request(app)
      .delete("/backend/users")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      msg: "User not found in DB.",
      code: 10,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});
