import { useEffect, useState } from "react";
import { URLfetch } from "../../constans/URLfetch";

import { Link } from "react-router";
import Typography from "../../components/global/Typography";
import Loding from "../../components/global/Loding";
import DsButton from "../../components/disignSystem/DsButton";
import DsErorr from "../../components/disignSystem/DsErorr";
import { MdRefresh } from "react-icons/md";


const Posts = () => {
  const [isLoding, setIsLoding] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
   const [refresh, setRefresh] = useState(0);

  const getPosts = () => {
 setError(false);
  setIsLoding(true);

    fetch(`${URLfetch}/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
      console.log(error);
      setError(true);
    })
      .finally(() => setIsLoding(false));
  };

  useEffect(() => {
    getPosts();
  }, [refresh]);

  return (
    <>
     <div className="flex justify-between mt-[10px]">
      <Typography text={"Posts"} />
      <DsButton click={()=>setRefresh((prev) => prev + 1)} clasName="mr-[100px]" text="Refresh" color="cyan" radios="lg"/>
    </div>
      {isLoding ? (
        <Loding />
        ):error?(
         <DsErorr Erorr="Erorr" TextEror="Post not found"/>
      ) : (
        <div className="flex  justify-center items-center mt-5">
          <div className="max-h-[75vh] w-[94%] overflow-y-auto rounded-2xl shadow-xl ">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-cyan-950 text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold">Row</th>
                  <th className="px-6 py-4 text-sm font-bold">User</th>
                  <th className="px-6 py-4 text-sm font-bold">Title</th>
                  <th className="px-6 py-4 text-sm font-bold">Body</th>
                  <th className="px-6 py-4 text-sm font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-gray-200 dark:bg-gray-700 ">
                {posts.map((items, index) => {
                  return (
                    <tr
                      key={items.id}
                      className="transition duration-200 hover:bg-cyan-50 border-b-gray-400 dark:hover:bg-gray-500"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-700 dark:text-white">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 text-gray-600 dark:text-white">
                        {items.userId}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                        {items.title}
                      </td>

                      <td className="px-6 py-4 text-gray-600 dark:text-white">{items.body}</td>

                      <td className="px-6 py-4 text-gray-600 dark:text-white">
                        <Link to={`/app/posts/${items.id}`}>
                        <DsButton radios="xl" clasName={"p-1"} color={"blue"} size={"lg"} text={"Details"}/>
                        </Link>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
