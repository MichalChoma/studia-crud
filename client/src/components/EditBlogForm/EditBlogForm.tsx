import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Notification from "../Notification/Notification";
import { useAuthContext } from "../../hooks/useAuthContext";
import { EStatus } from "../Notification/types";
import { useNavigate } from "react-router-dom";
import useMutationEditBlog from "../../services/editBlog/useMutationEditBlog";
import { IEditBlogData } from "../../services/editBlog/types";

interface IEditBlogForm {
  blogId?: string;
  title: string;
  content: string;
}

const EditBlogForm = ({ title, content, blogId }: IEditBlogForm) => {
  const {
    mutate,
    isError,
    error,
    isPending,
    data: editBlogData,
    isSuccess,
  } = useMutationEditBlog();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditBlogData>();

  const navigate = useNavigate();

  const { token } = useAuthContext();

  const handleEditBlog = async (data: {
    title: string;
    content: string;
    id: string | undefined;
  }) => {
    await mutate({
      ...data,
      token: token !== null ? token : "",
      id: blogId ? blogId : "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate(`/blogs/${blogId}`, { state: null });
    }
  }, [isSuccess, editBlogData, reset, navigate, blogId]);

  return (
    <form
      key={editBlogData?.message}
      onSubmit={handleSubmit(handleEditBlog)}
      className="flex flex-col gap-4 rounded w-full"
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-center gap-[2.7rem]">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            defaultValue={title}
            {...register("title", { required: "Title is required" })}
            className="max-w-[390px] md:max-w-lg flex-grow border rounded hover:border-darkGreen transition ease-in-out delay-150 active:border-primary focus:outline-none focus:ring focus:ring-primary"
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
            defaultValue={content}
            {...register("content", { required: "content is required" })}
            className="max-w-[390px] md:max-w-lg h-[120px] flex-grow border rounded hover:border-darkGreen transition ease-in-out delay-150 focus:outline-none focus:ring focus:ring-primary"
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
        {isPending ? "Editing Blog..." : "Edit Blog"}
      </Button>

      {isError && (
        <Notification
          status={EStatus.ERROR}
          message={error.response?.data?.error ?? ""}
        />
      )}
    </form>
  );
};

export default EditBlogForm;
