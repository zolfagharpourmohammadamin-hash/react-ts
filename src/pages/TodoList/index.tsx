import { useEffect, useState } from "react";
import "../../App.css";

import TodoItem from "./components/Todo.Item";
import { URLfetch } from "../../constans/URLfetch";
import Typography from "../../components/global/Typography";
import Loding from "../../components/global/Loding";
import DsErorr from "../../components/disignSystem/DsErorr";
import DsButton from "../../components/disignSystem/DsButton";
import toast from "react-hot-toast";

const Todos = () => {
  const [user, setUser] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    isComplited: false,
  });
  const [showErorr, setShowErorr] = useState(false);
  const [lodinErorr, setLodingErorr] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(false);

  const getUser = () => {
    setIsLoding(true);
    setError(false);

    fetch(`${URLfetch}/todos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setIsLoding(false);
        // setLodingErorr(false)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title) {
      // window.alert("ERORR\npleas inter a title");
      setShowErorr(true);
      console.log(showErorr);
      return;
    }

    toast.promise(
  fetch(`${URLfetch}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: formData.title,
      completed: formData.isComplited,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("NEW ITEM:", data);

      const newItem = [
        ...user,
        {
          ...data,
          title: formData.title,
          completed: formData.isComplited,
        },
      ];

      setUser(newItem);

      return data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
      throw error;
    })
    .finally(() => {
      setShowErorr(false);
    }),
  {
    loading: "Adding...",
    success: <b>Item Added!</b>,
    error: <b>Could not add item.</b>,
  },
);
    // console.log(showErorr);
    // console.log(formData);
  };

  const editingItem = (id) => {
    const newItem = user.find((x) => x.id === id);
    // console.log(newItem);
    // console.log(id)
    setEditingId(id);
    console.log(editingId);
    setFormData({
      title: newItem.title,
      isComplited: newItem.completed,
    });
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      isComplited: false,
    });
    setEditingId(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!formData.title) {
      // window.alert("ERORR\npleas inter a title");
      setShowErorr(true);
      console.log(showErorr);
      return;
    }

    toast
      .promise(
        fetch(`${URLfetch}/todos/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({
            title: formData.title,
            completed: formData.isComplited,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }

          const data = await response.json();

          const updatedItems = user.map((todo) =>
            todo.id === editingId
              ? {
                  ...todo,
                  title: formData.title,
                  completed: formData.isComplited,
                }
              : todo,
          );

          setUser(updatedItems);

          return data;
        }),
        {
          loading: "Updating...",
          success: <b>Item Updated!</b>,
          error: <b>Could not update item.</b>,
        },
      )
      .finally(() => {
        setShowErorr(false);
      });
    // console.log(showErorr);
    // console.log(formData);
  };

  const afterDelete = (id) => {
    const reminItems = user.filter((todo) => todo.id !== id);
    setUser(reminItems);
  };

  useEffect(() => {
    getUser();
  }, [refresh]);

  return (
    <>
      <div className="flex justify-between mt-[10px]">
        <Typography text={"Todos"} />
        <DsButton
          click={() => setRefresh((prev) => prev + 1)}
          clasName="mr-[100px]"
          text="Refresh"
          color="cyan"
          radios="lg"
        />
      </div>
      <main>
        {isLoding ? (
          <Loding />
        ) : error ? (
          <DsErorr Erorr="Erorr" TextEror="Todos not found" />
        ) : (
          <section className="flex gap-8 justify-center flex-row-reverse mt-6">
            <div className="drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] bg-cyan-950 text-white w-[50%] h-[77vh] overflow-auto p-4 rounded-2xl">
              {isLoding ? (
                <Loding />
              ) : (
                <ul>
                  {user.map((user) => {
                    return (
                      <TodoItem
                        user={user}
                        key={user.id}
                        editingItem={editingItem}
                        afterDelete={afterDelete}
                      />
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="bg-cyan-950 w-[40%] h-[40vh] p-4 rounded-2xl drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
              <form
                className="flex flex-col gap-2 "
                onSubmit={(e) => {
                  editingId ? handleUpdate(e) : handleSubmit(e);
                }}
              >
                <label className="flex justify-between items-end-safe">
                  <h2 className="text-white text-2xl">Title</h2>
                  {showErorr ? (
                    <span className="text-red-400">pleas inter a title</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  placeholder="inter a title"
                  type="text"
                  value={formData.title}
                  className="bg-white text-cyan-950 rounded-[10px] p-2.5"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                {editingId ? (
                  <div className="flex gap-3.5">
                    <button
                      type="submit"
                      className="font-bold text-1xl text-white w-[70px] rounded-2xl py-2 mt-2 bg-amber-500 hover:bg-amber-200 transition"
                    >
                      save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className=" font-bold text-1xl  text-white w-[70px] rounded-2xl py-2 mt-2 bg-red-500 hover:bg-red-200 transition"
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="t text-cyan-950 w-[50px] rounded-2xl py-2 mt-2 bg-white hover:bg-cyan-200 transition"
                  >
                    Add
                  </button>
                )}

                <label className="text-white text-[20px]">
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isComplited: e.target.checked,
                      })
                    }
                    className="m-[10px] text-4xl"
                    type="checkbox"
                    checked={formData.isComplited}
                  />
                  Completed
                </label>
              </form>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Todos;
