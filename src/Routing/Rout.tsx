import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../components/global/AppLayout";
import AboutUs from "../pages/about-us";
import ContactUs from "../pages/contact-us";
import DropDriling from "../pages/DropDriling";
import Home from "../pages/home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Posts from "../pages/Posts";
import PostDetails from "../pages/Posts/components/PostDetails";
import Profile from "../pages/Profile";
import RecoverPass from "../pages/RecoverPass";
import Todos from "../pages/TodoList";

const Rout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recover-pass" element={<RecoverPass />} />
      <Route path="/" element={<Navigate to="/app/home" />} />
      <Route path="/app" element={<Navigate to="/app/home" />} />

      <Route path="/app" element={<AppLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="todo-list" element={<Todos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="dropdriling" element={<DropDriling />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
 
export default Rout;
