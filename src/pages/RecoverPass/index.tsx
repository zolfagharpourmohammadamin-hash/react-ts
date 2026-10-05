import { Link } from "react-router"
import DsButton from "../../components/disignSystem/DsButton"
import Typography from "../../components/global/Typography"
import { IoArrowBack } from "react-icons/io5"

const RecoverPass=()=>{
    
    return(
       <div className="m-auto mt-[20vh] flex gap-6 flex-col items-center justify-around rounded-2xl w-[35%] min-h-[300px] bg-cyan-950">
        <Typography color="white" text="Recover Password Page" className="m-0"/>

        <div className="flex gap-6 items-center justify-center">
        <Link to={"/login"}>
        <DsButton text="Back" icone={<IoArrowBack/>} color="blue" size="xl"  radios="lg"/>
        </Link>
        </div>
        </div>
    )
}

export default RecoverPass