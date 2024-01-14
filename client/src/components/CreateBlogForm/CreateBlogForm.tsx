import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutationCreateBlog from "../../services/createBlog/useMutationCreateBlog";
import { ICreateBlogData } from "../../services/createBlog/types";
import Button from "../Button/Button";
import Notification from "../Notification/Notification";
import { useAuthContext } from "../../hooks/useAuthContext";
import { EStatus } from "../Notification/types";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const {
    mutate,
    isError,
    error,
    isPending,
    data: addBlogData,
    isSuccess,
  } = useMutationCreateBlog();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateBlogData>();

  const navigate = useNavigate();

  const { token } = useAuthContext();

  const handleAddBlog = async (data: { title: string; content: string }) => {
    await mutate({ ...data, token: token !== null ? token : "" });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/");
    }
  }, [isSuccess, addBlogData, reset, navigate]);

  return (
    <form
      key={addBlogData?.message}
      onSubmit={handleSubmit(handleAddBlog)}
      className="flex flex-col gap-4 rounded w-full lg:w-[600px]"
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-center gap-[2.7rem]">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="max-w-[390px] flex-grow border rounded hover:border-darkGreen transition ease-in-out delay-150 active:border-primary focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        {errors.title && (
          <span className="text-red-500 transition ease-in-out delay-150">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-center gap-4">
          <label htmlFor="content">Content: </label>
          <textarea
            {...register("content", { required: "content is required" })}
            className="max-w-[390px] h-[120px] flex-grow border rounded hover:border-darkGreen transition ease-in-out delay-150 focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        {errors.content && (
          <span className="text-red-500 transition ease-in-out delay-150">
            {errors.content.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        secondary
        className="w-[200px] self-center"
      >
        {isPending ? "Creating Blog..." : "Create Blog"}
      </Button>

      {isError && (
        <Notification
          status={EStatus.ERROR}
          message={error.response?.data?.error ?? ""}
        />
      )}

      {isSuccess && (
        <Notification status={EStatus.SUCCESS} message={addBlogData.message} />
      )}
    </form>
  );
};

export default CreateBlogForm;
