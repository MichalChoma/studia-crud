import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/blogs",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/blogs/:id",
    element: (
      <Layout>
        <BlogPost />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/create-blog",
    element: (
      <Layout>
        <CreateBlog />
      </Layout>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
]);
