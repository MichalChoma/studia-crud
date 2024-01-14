import { useAuthContext } from "../../hooks/useAuthContext";
import useMutationDeleteBlog from "../../services/deleteBlog/useMutationDeleteBlog";
import { IBlog } from "../../services/getBlogs/useFetchBlogs";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BlogItem = ({
  title,
  author: { username, id: authorId },
  content,
  id,
}: IBlog) => {
  const { user, token } = useAuthContext();
  const navigate = useNavigate();

  const { mutate: mutateDelete } = useMutationDeleteBlog();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/blogs/${id}`, { state: { inEditState: true } });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutateDelete({ id: String(id), token: token !== null ? token : "" });
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${authorId}`);
  };

  const handleLinkClick = () => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div
      onClick={handleLinkClick}
      className=" cursor-pointer rounded p-4 transition ease-in-out delay-150 flex flex-col justify-between self-stretch gap-2 border border-darkGreen hover:border-darkerGreen bg-white min-h-[160px]"
    >
      <div className="flex flex-col line-clamp-2">
        <h3 className="text-lg">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-3 text-ellipsis overflow-hidden">
          {content}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-800" onClick={handleAuthorClick}>
          {username}
        </p>
        {user?.id === authorId && (
          <div className="flex gap-1">
            <p className="flex items-center" onClick={handleEditClick}>
              <MdModeEdit className="hover:text-darkGreen transition ease-in-out delay-150" />
            </p>
            <p className="flex items-center" onClick={handleDeleteClick}>
              <MdDelete className="hover:text-darkGreen transition ease-in-out delay-150" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
