import CreateBlogForm from "../components/CreateBlogForm/CreateBlogForm";

const CreateBlog = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-4 px-10 md:p-10 lg:px-24">
      <h1 className="text-3xl">Create Blog</h1>
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
