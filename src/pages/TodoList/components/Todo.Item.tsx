import { FaArrowRight, FaPen, FaTrashAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { URLfetch } from "../../../constans/URLfetch";
import DsButton from "../../../components/disignSystem/DsButton";
import toast from "react-hot-toast";

const TodoItem = ({ user, editingItem, afterDelete }) => {
  const handleDlete = () => {
    if (!window.confirm("are you sure to deleted?")) {
      return;
    }

    fetch(`${URLfetch}/todos/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response);
        afterDelete(user.id);
        toast.error("Item Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li
      key={user.id}
      className="flex justify-between border-b p-2 hover:bg-cyan-900 transition"
    >
      <p className={`${user.completed ? "line-through opacity-40" : ""}`}>
        {user.title}
      </p>
      <div className="flex justify-center items-center gap-2">
        {user.completed ? (
          <DsButton icone={<FaArrowRight />} size="lg" radios="lg" />
        ) : (
          <DsButton
            icone={<TiArrowBack />}
            color={"gray"}
            size="lg"
            radios="lg"
          />
        )}
        <DsButton
          icone={<FaPen />}
          color={"blue"}
          click={() => editingItem(user.id)}
          size="lg"
          radios="lg"
        />
        <DsButton
          icone={<FaTrashAlt />}
          color={"red"}
          click={() => handleDlete(user.id)}
          size="lg"
          radios="lg"
        />
      </div>
    </li>
  );
};

export default TodoItem;
