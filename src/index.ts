import express from "express";
import { PrismaClient } from "@prisma/client";
import taskRouter from "./routes/task";
import helmet from "helmet";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(helmet());
app.use(express.json());
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
