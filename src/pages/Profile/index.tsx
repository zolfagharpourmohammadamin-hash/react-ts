import { use, useEffect, useState } from "react";
import Typography from "../../components/global/Typography";
import { DUMMY_URL_FETCH } from "../../constans/URLfetch";
import type { user } from "../../Types/user";
import Loding from "../../components/global/Loding";

const Profile = () => {


    const [user, setUser] = useState<user| null>(null);
    const [isLoding, setIsLoding] = useState(true);

    const getMeApi = async () => {
        setIsLoding(true)
    const res = await fetch(`${DUMMY_URL_FETCH}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT via Authorization header
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    const data= await res.json();
    setUser(data);
    setIsLoding(false)
    
  };

  useEffect(() => {
    getMeApi();
  }, []);

  return (
    <>
    
    {isLoding?
    <Loding/>:
    <div className="flex  flex-col gap-3.5 p-10 bg-cyan-950 text-white w-[45%] mt-[100px] m-auto rounded-2xl min-h-[300px]">
    <Typography color="white" text={"Profile"} />
        
        <div className="flex justify-start gap-3.5">

        <figure>
            <img src={user?.image} alt= {user?.firstName +" "+user?.lastName} />
        </figure>

        <div className="flex flex-col gap-1 text-[20px] pt-2.5">
            <h2>{user?.firstName+" "+user?.lastName}</h2>
            <h3>{user?.email}</h3>
            <h3>{user?.gender}</h3>
        </div>
        </div>
    </div>
    }

    </>
  );
};

export default Profile;
