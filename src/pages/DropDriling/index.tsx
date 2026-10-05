import Typography from "../../components/global/Typography";
import type { user } from "../../Types/user";
import Parent from "./components/Parent";

const DropDriling = () => {
    
  
const user :user={
    id:1,
    firstName:"mohmamad Amin",
    lastName:"zoll"
}
  

  return (
    <>
      <Typography text={"Drop Driling"} />
      <Parent/>
    </>
  );
};

export default DropDriling;
