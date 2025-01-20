import request from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "../index";

const prisma = new PrismaClient();

const testTask = {
  title: "Test Task",
  color: "#FF0000",
};

describe("Todo API Tests", () => {
  beforeEach(async () => {
    await prisma.task.deleteMany({});
  });

  describe("GET /tasks", () => {
    it("should return empty array", async () => {
      const response = await request(app).get("/api/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return all tasks", async () => {
      await prisma.task.create({ data: testTask });

      const response = await request(app).get("/api/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("title", testTask.title);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const response = await request(app)
        .post("/api/tasks/create")
        .send(testTask);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", testTask.title);
      expect(response.body).toHaveProperty("completed", false);
    });
  });

  describe("PUT /tasks/:id", () => {
    let taskId: number;

    beforeEach(async () => {
      const task = await prisma.task.create({ data: testTask });
      taskId = task.id;
    });

    it("should update an existing task", async () => {
      const updatedData = {
        title: "Updated Task",
        completed: true,
        color: "#00FF00",
      };

      const response = await request(app)
        .put(`/api/tasks/edit/${taskId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedData);
    });
  });

  describe("DELETE /tasks/:id", () => {
    let taskId: number;

    beforeEach(async () => {
      const task = await prisma.task.create({ data: testTask });
      taskId = task.id;
    });

    it("should delete an existing task", async () => {
      const response = await request(app).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(204);

      const deletedTask = await prisma.task.findUnique({
        where: { id: taskId },
      });
      expect(deletedTask).toBeNull();
    });
  });
});
