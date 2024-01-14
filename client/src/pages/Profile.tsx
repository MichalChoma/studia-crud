import { InfinitySpin } from "react-loader-spinner";
import BlogItem from "../components/BlogItem/BlogItem";
import { useParams } from "react-router";
import { useFetchAuthorBlogs } from "../services/getAuthorBlogs/useFetchAuthorBlogs";

const Profile = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchAuthorBlogs(id ?? "");

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
    <div className="flex flex-col w-full">
      <h1 className="text-4xl p-10 lg:px-24">
        Profile - {`${data?.username}`}
      </h1>
      <div className="flex-grow flex justify-center flex-col items-stretch sm:items-start gap-3 px-10 lg:px-24 lg:grid lg:grid-rows-[160px] lg:grid-cols-4 xl:grid-cols-5">
        {data?.blogs && data.blogs.length > 0 ? (
          data.blogs.map((blog) => (
            <BlogItem
              {...blog}
              author={{ username: data.username, id: data.id }}
              key={blog.id}
            />
          ))
        ) : (
          <h1 className="text-2xl">
            No blogs added, please create something new!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
