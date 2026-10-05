import { useEffect, useState } from "react";

import { Link, useParams } from "react-router";

import { FaArrowLeft } from "react-icons/fa";
import { URLfetch } from "../../../constans/URLfetch";
import Typography from "../../../components/global/Typography";
import Loding from "../../../components/global/Loding";


const PostDetails = () => {
  const [isLoding, setIsLoding] = useState(true);
  const [postsDetails, setpostsDetails] = useState(null);

  const { id } = useParams();
  // const postId=useParams();
  console.log(id);

  const getPostsDetails = () => {
    fetch(`${URLfetch}/posts/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setpostsDetails(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoding(false));
  };

  useEffect(() => {
    getPostsDetails();
  }, []);

  return (
    <>
    <Typography text={"Posts Details"}/>
      {isLoding ? (
        <Loding />
      ) : (
        <>
          <div className="flex flex-col m-auto mt-[100px] w-[50%]">
           
            <Link className="w-0" to={"/app/posts"}>
            <button className="flex justify-center items-center bg-cyan-950 text-white p-2 rounded-2xl mb-2 cursor-pointer"><FaArrowLeft/>  Back</button>
            </Link>
            <div className="flex flex-col gap-3 bg-cyan-950 rounded-2xl   text-white p-5.5">
              <h3 className="text-2xl">{postsDetails.title}</h3>
              <h2 className="text-gray-400">{postsDetails.body}</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostDetails;
