const request = require("supertest");
const app = require("../app");

let token = "";

beforeAll(async () => {
  const response = await request(app).post("/backend/users/Login").send({
    name: "admin",
    password: "admin",
  });
  token = response.body.token;
});

describe("Add Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).post("/backend/tasks");
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

describe("Add Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .post("/backend/tasks")
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

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" is required',
          path: ["userId"],
          type: "any.required",
          context: {
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" must be a string',
          path: ["userId"],
          type: "string.base",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" is not allowed to be empty',
          path: ["userId"],
          type: "string.empty",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = ".";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" must only contain alpha-numeric characters',
          path: ["userId"],
          type: "string.alphanum",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "64a5a5b95583d70fb0928c30s";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" is required',
          path: ["title"],
          type: "any.required",
          context: {
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = false;
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" must be a string',
          path: ["title"],
          type: "string.base",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" is required',
          path: ["description"],
          type: "any.required",
          context: {
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = false;
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" must be a string',
          path: ["description"],
          type: "string.base",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is required',
          path: ["endDate"],
          type: "any.required",
          context: {
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = false;
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" must be a string',
          path: ["endDate"],
          type: "string.base",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .post("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get("/backend/tasks");
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

describe("Get Task List (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/tasks")
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

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?userId=${idInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" is not allowed to be empty',
          path: ["userId"],
          type: "string.empty",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = ".";
    const res = await request(app)
      .get(`/backend/tasks?userId=${idInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" must only contain alpha-numeric characters',
          path: ["userId"],
          type: "string.alphanum",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .get(`/backend/tasks?userId=${idInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "64a5a5b95583d70fb0928c30s";
    const res = await request(app)
      .get(`/backend/tasks?userId=${idInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?title=${titleInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .get(`/backend/tasks?title=${titleInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?description=${descriptionInvalid}`)
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: descriptionInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = "false";
    const res = await request(app)
      .get(`/backend/tasks?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be a number',
          path: ["status"],
          type: "number.base",
          context: {
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 0;
    const res = await request(app)
      .get(`/backend/tasks?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be greater than or equal to 1',
          path: ["status"],
          type: "number.min",
          context: {
            limit: 1,
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 4;
    const res = await request(app)
      .get(`/backend/tasks?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be less than or equal to 3',
          path: ["status"],
          type: "number.max",
          context: {
            limit: 3,
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = "false";
    const res = await request(app)
      .get(`/backend/tasks?priority=${priorityInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be a number',
          path: ["priority"],
          type: "number.base",
          context: {
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = -1;
    const res = await request(app)
      .get(`/backend/tasks?priority=${priorityInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be greater than or equal to 0',
          path: ["priority"],
          type: "number.min",
          context: {
            limit: 0,
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = 3;
    const res = await request(app)
      .get(`/backend/tasks?priority=${priorityInvalid}`)
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: priorityInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be less than or equal to 2',
          path: ["priority"],
          type: "number.max",
          context: {
            limit: 2,
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?tagsText=${textInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tagsText" is not allowed to be empty',
          path: ["tagsText"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "tagsText",
            key: "tagsText",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?notesText=${textInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notesText" is not allowed to be empty',
          path: ["notesText"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "notesText",
            key: "notesText",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .get(`/backend/tasks?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .get(`/backend/tasks?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"updateDate" is not allowed to be empty',
          path: ["updateDate"],
          type: "string.empty",
          context: {
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10";
    const res = await request(app)
      .get(`/backend/tasks?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"updateDate" length must be at least 10 characters long',
          path: ["updateDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10000";
    const res = await request(app)
      .get(`/backend/tasks?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"updateDate" length must be less than or equal to 10 characters long',
          path: ["updateDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?orderStatus=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderStatus" must be one of [asc, desc]',
          path: ["orderStatus"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderStatus",
            value: orderInvalid,
            key: "orderStatus",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?orderPriority=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderPriority" must be one of [asc, desc]',
          path: ["orderPriority"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderPriority",
            value: orderInvalid,
            key: "orderPriority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?orderTitle=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderTitle" must be one of [asc, desc]',
          path: ["orderTitle"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderTitle",
            value: orderInvalid,
            key: "orderTitle",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?orderEndDate=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderEndDate" must be one of [asc, desc]',
          path: ["orderEndDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderEndDate",
            value: orderInvalid,
            key: "orderEndDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks?orderUpdateDate=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderUpdateDate" must be one of [asc, desc]',
          path: ["orderUpdateDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderUpdateDate",
            value: orderInvalid,
            key: "orderUpdateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (filtered)", () => {
  it("request to search for a task", async () => {
    const res = await request(app)
      .get(`/backend/tasks?userId=64a5a590648bd50348e07e37&status=1&tagsText=Endea`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get Task List", () => {
  it("request task list", async () => {
    const res = await request(app)
      .get("/backend/tasks")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get Tasks By UserId (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get(
      "/backend/tasks/64a5db2384755554e46c3eb5"
    );
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

describe("Get Tasks By UserId (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/tasks/64a5db2384755554e46c3eb5")
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

describe("Get Tasks By UserId (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .get("/backend/tasks/1")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: "1",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .get("/backend/tasks/64a5db2384755554e46c3eb5q")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: "64a5db2384755554e46c3eb5q",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?title=${titleInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?title=${titleInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?description=${descriptionInvalid}`)
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: descriptionInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = "false";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be a number',
          path: ["status"],
          type: "number.base",
          context: {
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 0;
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be greater than or equal to 1',
          path: ["status"],
          type: "number.min",
          context: {
            limit: 1,
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 4;
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?status=${statusInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"status" must be less than or equal to 3',
          path: ["status"],
          type: "number.max",
          context: {
            limit: 3,
            value: statusInvalid,
            label: "status",
            key: "status",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = "false";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?priority=${priorityInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be a number',
          path: ["priority"],
          type: "number.base",
          context: {
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = -1;
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?priority=${priorityInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be greater than or equal to 0',
          path: ["priority"],
          type: "number.min",
          context: {
            limit: 0,
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = 3;
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?priority=${priorityInvalid}`)
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: priorityInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"priority" must be less than or equal to 2',
          path: ["priority"],
          type: "number.max",
          context: {
            limit: 2,
            value: priorityInvalid,
            label: "priority",
            key: "priority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?tagsText=${textInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tagsText" is not allowed to be empty',
          path: ["tagsText"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "tagsText",
            key: "tagsText",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?notesText=${textInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notesText" is not allowed to be empty',
          path: ["notesText"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "notesText",
            key: "notesText",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?endDate=${endDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"updateDate" is not allowed to be empty',
          path: ["updateDate"],
          type: "string.empty",
          context: {
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"updateDate" length must be at least 10 characters long',
          path: ["updateDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10000";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?updateDate=${updateDateInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"updateDate" length must be less than or equal to 10 characters long',
          path: ["updateDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?orderStatus=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderStatus" must be one of [asc, desc]',
          path: ["orderStatus"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderStatus",
            value: orderInvalid,
            key: "orderStatus",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?orderPriority=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderPriority" must be one of [asc, desc]',
          path: ["orderPriority"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderPriority",
            value: orderInvalid,
            key: "orderPriority",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?orderTitle=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderTitle" must be one of [asc, desc]',
          path: ["orderTitle"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderTitle",
            value: orderInvalid,
            key: "orderTitle",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?orderEndDate=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderEndDate" must be one of [asc, desc]',
          path: ["orderEndDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderEndDate",
            value: orderInvalid,
            key: "orderEndDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?orderUpdateDate=${orderInvalid}`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"orderUpdateDate" must be one of [asc, desc]',
          path: ["orderUpdateDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "orderUpdateDate",
            value: orderInvalid,
            key: "orderUpdateDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (filtered)", () => {
  it("request to search for a task", async () => {
    const res = await request(app)
      .get(`/backend/tasks/64a5db2384755554e46c3eb5?status=1&tagsText=Endea`)
      .set("x-access-token", token)
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get Tasks By UserId", () => {
  it("request to delete user", async () => {
    const res = await request(app)
      .get("/backend/tasks/64a5db2384755554e46c3eb5")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Update Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).put("/backend/tasks");
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

describe("Update Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .put("/backend/tasks")
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" is required',
          path: ["userId"],
          type: "any.required",
          context: {
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" must be a string',
          path: ["userId"],
          type: "string.base",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" is not allowed to be empty',
          path: ["userId"],
          type: "string.empty",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = ".";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" must only contain alpha-numeric characters',
          path: ["userId"],
          type: "string.alphanum",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "64a5db2384755554e46c3eb";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "64a5db2384755554e46c3eb5a";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
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
            value: _IdInvalid,
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
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
            value: _IdInvalid,
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = ".";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"_id" must only contain alpha-numeric characters',
          path: ["_id"],
          type: "string.alphanum",
          context: {
            label: "_id",
            value: _IdInvalid,
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "64a5db2384755554e46c3eb";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
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
            value: _IdInvalid,
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "64a5db2384755554e46c3eb5a";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
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
            value: _IdInvalid,
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

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" must be a string',
          path: ["title"],
          type: "string.base",
          context: {
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const descriptionInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" must be a string',
          path: ["description"],
          type: "string.base",
          context: {
            label: "description",
            value: descriptionInvalid,
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            label: "description",
            value: descriptionInvalid,
            key: "description",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" must be a string',
          path: ["endDate"],
          type: "string.base",
          context: {
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes" must be an array',
          path: ["notes"],
          type: "array.base",
          context: {
            label: "notes",
            value: notesInvalid,
            key: "notes",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [{}];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" is required',
          path: ["notes", 0, "text"],
          type: "any.required",
          context: {
            label: "notes[0].text",
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" must be a string',
          path: ["notes", 0, "text"],
          type: "string.base",
          context: {
            label: "notes[0].text",
            value: false,
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" is not allowed to be empty',
          path: ["notes", 0, "text"],
          type: "string.empty",
          context: {
            label: "notes[0].text",
            value: "",
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" is required',
          path: ["notes", 0, "date"],
          type: "any.required",
          context: {
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" must be a string',
          path: ["notes", 0, "date"],
          type: "string.base",
          context: {
            label: "notes[0].date",
            value: false,
            key: "date",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" is not allowed to be empty',
          path: ["notes", 0, "date"],
          type: "string.empty",
          context: {
            label: "notes[0].date",
            value: "",
            key: "date",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "10/10/10",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" length must be at least 10 characters long',
          path: ["notes", 0, "date"],
          type: "string.min",
          context: {
            limit: 10,
            value: "10/10/10",
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "10/10/10000",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"notes[0].date" length must be less than or equal to 10 characters long',
          path: ["notes", 0, "date"],
          type: "string.max",
          context: {
            limit: 10,
            value: "10/10/10000",
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = false;
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tags" must be an array',
          path: ["tags"],
          type: "array.base",
          context: {
            label: "tags",
            value: tagsInvalid,
            key: "tags",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [{}];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" is required',
          path: ["tags", 0, "text"],
          type: "any.required",
          context: {
            label: "tags[0].text",
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" must be a string',
          path: ["tags", 0, "text"],
          type: "string.base",
          context: {
            label: "tags[0].text",
            value: false,
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" is not allowed to be empty',
          path: ["tags", 0, "text"],
          type: "string.empty",
          context: {
            label: "tags[0].text",
            value: "",
            key: "text",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "test",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].color" is required',
          path: ["tags", 0, "color"],
          type: "any.required",
          context: {
            label: "tags[0].color",
            key: "color",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "test",
        color: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      data: [
        {
          message:
            '"tags[0].color" must be one of [primary, secondary, danger, warning, success, info, dark, light, white, muted]',
          path: ["tags", 0, "color"],
          type: "any.only",
          context: {
            valids: [
              "primary",
              "secondary",
              "danger",
              "warning",
              "success",
              "info",
              "dark",
              "light",
              "white",
              "muted",
            ],
            label: "tags[0].color",
            value: "",
            key: "color",
          },
        },
      ],
      msg: "Invalid Data.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task", () => {
  it("request to Update a task", async () => {
    const tagsInvalid = [
      {
        text: "test",
        color: "success",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(201);
    const expectedResult = {
      msg: "Task updated in DB.",
      code: 200,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Delete Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).delete("/backend/tasks");
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

describe("Delete Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "64a5a590648bd50348e07e37q";
    const res = await request(app)
      .delete("/backend/tasks")
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

describe("Delete Task", () => {
  it("request to delete user", async () => {
    const idInvalid = "64ac817182ac043f20b5f79a";
    const res = await request(app)
      .delete("/backend/tasks")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(400);
    const expectedResult = {
      msg: "Task not found in DB.",
      code: 10,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});
