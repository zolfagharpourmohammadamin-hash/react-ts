import { LucideLogOut, LucideMoon, LucideSun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { DUMMY_URL_FETCH } from "../../constans/URLfetch";
import { GlobalContext } from "../../context/Global-Context";
import type { user } from "../../Types/user";

const Head = () => {
  const navigate = useNavigate();
  const [mainLoding, setMainLoding] = useState(true);
  const [user, setUser] = useState<user| null>(null);
  const {them ,toggleThem}=useContext(GlobalContext)



  const handleLogOut = () => {
    if(!confirm("Are You Sure To Leve Page?")){
      return
    }
    localStorage.removeItem("token");
    navigate("/login");
    toast('Good Buy',
  {
    icon: '👋',
    style: {
      borderRadius: '10px',
      background: '#083344',
      color: '#fff',
    },
  }
);
    afterLogOut();
  };

  const afterLogOut=()=>{
    localStorage.removeItem("token")
        navigate("/login")
  };

  const headLink = [
    { title: "Home", Link: "/app/home" },
    { title: "Todo Item", Link: "/app/todo-list" },
    { title: "About Us", Link: "/app/about-us" },
    { title: "Contact Us", Link: "/app/contact-us" },
    { title: "Posts", Link: "/app/posts" },
  ];

  const getMeApi =async () => {
    const res=await fetch(`${DUMMY_URL_FETCH}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT via Authorization header
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    })

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error("Erorr");
       afterLogOut();
    }
  }

  const getMeData =async () => {
    const data = await getMeApi();
    setUser(data);
     setMainLoding(false); 
  };
  

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getMeData();
    }
  }, []);

  useEffect(() => {
  if (them === "Dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [them]);

  return (
    <>
      <header className=" relative flex flex-row-reverse items-center justify-between">
      <div className="flex justify-center items-center gap-5 bg-cyan-950 rounded-2xl px-3 mr-1.5 text-white h-[60px]">
        {
          <span onClick={toggleThem} className="cursor-pointer rounded-full bg-cyan-600 flex justify-center items-center w-8 h-8">
            {
              them==="Light"?<LucideMoon color="black"/>:<LucideSun color=""/>
            }
          </span>
        }
        <Link to={"/app/profile"} className="flex justify-center items-center gap-1">
          <img className="bg-cyan-500 p-[1px] rounded-full w-8 h-8" src={user?.image} alt={user?.firstName +" "+user?.lastName} />   
          <span className="ml-1.5 text-[17px] text-cyan-400">
            {user?.firstName +" "+user?.lastName}
          </span>
        </Link>
      </div>

        <nav className="flex justify-center items-center bg-cyan-950 px-5 h-[60px] text-white  rounded-2xl  absolute left-1/2 -translate-x-1/2 min-w-[45%] text-center">
          <ul className="flex justify-center gap-10 text-[20px]">
            {headLink.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className={({
                      isActive,
                    }) => `text-amber-50 transition-all hover:text-cyan-600
                    ${isActive ? "text-cyan-600" : ""} `}
                    to={item.Link}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          onClick={handleLogOut}
          className="flex justify-center h-[60px] items-center bg-cyan-950 rounded-2xl px-3 cursor-pointer ml-1.5 text-white"
        >
          <span className=" text-cyan-500 mr-2">LogOut</span>
          <LucideLogOut />
        </div>
      </header>
      
        {
          mainLoding&&<div className="z-50 flex justify-center gap-5 items-center text-5xl  w-screen h-screen bg-white fixed top-0 right-0">
            <div className="flex flex-col justify-center text-white gap-[30px]  rounded-4xl items-center mt-[100px] m-auto bg-cyan-900 w-[30%] h-[300px]">
            Pleas Wait ...
            <FaSpinner size={50} className="animate-spin "/>
        </div>
        </div>
        } 
    </>
  );
};

export default Head;
