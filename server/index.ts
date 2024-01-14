import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/client";
import { generateRandomString } from "./utils/generateRandomString";
import session from "express-session";
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server eeoeoo");
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPasswd = await bcrypt.hash(password, 10);

    console.log("hashed password", hashedPasswd);

    await prisma.user.create({
      data: {
        username,
        password: hashedPasswd,
      },
    });

    res.status(201).json({ username, password });
  } catch (err) {
    console.error("Error create user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const JWT_SECRET = generateRandomString(10);

app.use(
  session({
    genid: () => uuidv4(),
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const verifyToken = (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      blogs: true,
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    { user: { id: user.id, username: user.username } },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const returnUser = {
    id: user.id,
    username: user.username,
  };

  res.json({ message: "Login successful", token, returnUser });
});

app.post("/logout", (req: Request, res: Response) => {
  req.session?.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    res.json({ message: "Logout successful" });
  });
});

app.get("/blogs", async (req, res) => {
  const blogs = await prisma.blog.findMany({
    select: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      content: true,
      id: true,
      title: true,
    },
  });
  res.status(200).json(blogs);
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        blogs: true,
      },
    });
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/authors/:id", async (req, res) => {
  const authorId = parseInt(req.params.id, 10);

  try {
    const existingAuthor = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        blogs: true,
      },
      where: {
        id: authorId,
      },
    });
    if (!existingAuthor) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json(existingAuthor);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string | number;
    };
  }
}

app.post("/blogs", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user?.id;

  try {
    if (authorId) {
      const blog = await prisma.blog.create({
        data: {
          title,
          content,
          author: {
            connect: {
              id: typeof authorId === "string" ? parseInt(authorId) : authorId,
            },
          },
        },
      });
      res.status(201).json({ message: "Blog created successfully" });
    } else {
      res.status(401).json({ error: "User not authenticated" });
    }
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  try {
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json(existingBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/blogs/:id", verifyToken, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  const userId = req.user?.id;

  try {
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const { title, content } = req.body;

    if (existingBlog.authorId !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the author of this blog" });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/blogs/:id", verifyToken, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  const userId = req.user?.id;

  try {
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (existingBlog.authorId !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the author of this blog" });
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
