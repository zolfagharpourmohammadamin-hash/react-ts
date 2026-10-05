import { useContext, useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import DsButton from "../../components/disignSystem/DsButton";
import DsTextBox from "../../components/disignSystem/DsTextBox";
import Typography from "../../components/global/Typography";
import { DUMMY_URL_FETCH } from "../../constans/URLfetch";
import type { user } from "../../Types/user";
import toast from "react-hot-toast";
import { GlobalContext } from "../../context/Global-Context";
import { LucideMoon, LucideSun } from "lucide-react";

type formData = {
  username: string;
  password: string;
};

const intialData: formData = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [formData, setFormData] = useState<formData>(intialData);
  const { them, toggleThem } = useContext(GlobalContext);

  // const user: user = {
  //   name: "Mohammad Amin",
  //   famiy: "Zolfaghar",
  //   mobile: "09210294750",
  // };

  const loginApi = async () => {
    const res = await fetch(`${DUMMY_URL_FETCH}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error("Pleass Chek Your Password Or UserName");
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoding(true);
    setError(false);

    const data = await loginApi();
    localStorage.setItem("token", data.accessToken);
    toast.success("wellcome" + " " + data.firstName);
    navigate("/app/home");
    setIsLoding(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app/home");
    }
  }, []);

  return (
    <>
    <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
      <span onClick={toggleThem} className="cursor-pointer rounded-full bg-cyan-600 flex justify-center items-center w-8 h-8">
            {
              them==="Light"?<LucideMoon color="black"/>:<LucideSun/>
            }
          </span>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="m-auto mt-[20vh] flex gap-6 flex-col items-center justify-around rounded-2xl p-5 w-[35%] min-h-[400px] bg-cyan-950">
          <Typography color="white" text="Login Page" className="m-0" />

          <div className="flex flex-col gap-2.5">
            <DsTextBox
              color="gray"
              textLable="User Name"
              colorLable="white"
              placeHold="inter username"
              className="w-[350px] "
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <DsTextBox
              color="gray"
              textLable="Password"
              colorLable="white"
              placeHold="inter password"
              className="w-[350px] "
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
            />
          </div>

          <div className="flex gap-6 items-center justify-center">
            <DsButton
              text="Login To App"
              color="blue"
              size="xl"
              radios="lg"
              type="submit"
              isLoading={isLoding}
            />
            <Link to={"/recover-pass"}>
              <DsButton
                text="Recover Password"
                color="gray"
                size="xl"
                radios="lg"
                isDisabled={isLoding}
              />
            </Link>
          </div>
        </div>
      </form>
    </main>
    </>
  );
};

export default Login;
