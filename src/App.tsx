import { Toaster } from "react-hot-toast";
import "./App.css";
import Rout from "./Routing/Rout";


function App() {
  return (
    <>
      <Rout />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
