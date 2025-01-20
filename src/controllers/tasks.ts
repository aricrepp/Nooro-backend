import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postTask: RequestHandler = async (req, res, next) => {
  const { title, color } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, color },
      select: {
        id: true,
        title: true,
        completed: true,
        color: true,
        createdOn: true,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        completed: true,
        color: true,
        createdOn: true,
        updatedOn: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

export const updateTasks: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
      select: {
        id: true,
        title: true,
        completed: true,
        color: true,
        updatedOn: true,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
