import { useLocation, useParams } from "react-router";
import { useFetchSingleBlog } from "../services/getSingleBlog/getSingleBlog";
import { InfinitySpin } from "react-loader-spinner";
import EditBlogForm from "../components/EditBlogForm/EditBlogForm";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data, isLoading, error, isError } = useFetchSingleBlog(id ?? "");
  const inEditState = state?.inEditState || false;

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-12">
        <InfinitySpin width="80" color="hsl(180, 8%, 52%)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center flex-col items-center p-12">
        {error?.response?.status} - {error?.response?.data?.error}
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-start gap-3 py-10 px-4 lg:px-24 flex-wrap overflow-x-hidden">
      {inEditState ? (
        <>
          <h1 className="text-4xl mx-auto mb-14">Edit Blog - {data?.title}</h1>
          <EditBlogForm
            blogId={id}
            content={data?.content || ""}
            title={data?.title || ""}
          />
        </>
      ) : (
        <div className="w-full text-ellipsis overflow-x-hidden rounded flex flex-col flex-grow">
          <h1 className="text-4xl">{data?.title}</h1>
          <Link to={`/profile/${data?.author.id}`} className="text-xl mt-2">
            {data?.author.username}
          </Link>
          <p className="w-full text-ellipsis overflow-x-hidden mt-5">
            {data?.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
