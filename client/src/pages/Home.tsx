import { useFetchBlogs } from "../services/getBlogs/useFetchBlogs";
import { InfinitySpin } from "react-loader-spinner";
import BlogItem from "../components/BlogItem/BlogItem";

const Home = () => {
  const { data, isLoading, isError, error } = useFetchBlogs();

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
    <div className="flex-grow flex justify-center flex-col items-stretch sm:items-start gap-3 p-10 lg:px-24 lg:grid lg:grid-rows-[160px] lg:grid-cols-4 xl:grid-cols-5">
      {data ? data.map((blog) => <BlogItem {...blog} key={blog.id} />) : null}
    </div>
  );
};

export default Home;
