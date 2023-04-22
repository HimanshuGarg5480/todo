import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const App = () => {
  const [query, setQuery] = useState("");
  const [editedQuery, setEditedQuery] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [array, setArray] = useState(() => {
    const arraylist = localStorage.getItem("arraylist");
    return arraylist ? JSON.parse(arraylist) : [];
  });

  useEffect(() => {
    localStorage.setItem("arraylist", JSON.stringify(array));
  });

  function addItem(e) {
    const d = [...array, query];
    setArray(d);
    setQuery("");
  }

  function handleEdit(index) {
    setIsEditable(true);
    setEditedQuery(array[index]);
    setArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = editedQuery;
      return newArray;
    });
  }

  function handleKeyPress(e, index) {
    if (e.key === "Enter") {
      setIsEditable(false);
      setArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = editedQuery;
        return newArray;
      });
    }
  }

  return (
    <>
      <div className="flex justify-center bg-slate-700 h-screen relative overflow-y-scroll">
        <input
          type="text"
          className="p-4 text-white border-4 flex bg-slate-800 absolute top-[10%] border-black w-96 h-16 rounded-3xl placeholder:italic"
          placeholder="Enter the tasks...."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className="absolute top-[25%] border-black border-2 rounded-xl w-36 text-lg bg-slate-600"
          onClick={addItem}
        >
          Add Task
        </button>
        <div className="absolute bg-gray-800 top-[35%] border-4 border-black w-[500px] rounded-3xl p-10">
          {array.map((item, i) => (
            <div
              key={i}
              className="flex bg-blue-100 justify-between border-4 border-gray-950 shadow-lg rounded p-5 items-center mb-5"
            >
              <div
                className={"w-[60%] break-words"}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onKeyDown={(e) => handleKeyPress(e, i)}
                onBlur={() => {
                  setIsEditable(false);
                }}
                onChange={(e) => {
                  setEditedQuery(e.target.textContent);
                }}
              >
                {item}
              </div>
              <div className="flex-col justify-center">
                <AiFillDelete
                  className="cursor-pointer"
                  onClick={() => {
                    setArray((prevArray) =>
                      prevArray.filter((_, ind) => ind !== i)
                    );
                  }}
                />
                <AiFillEdit
                  className="mt-2 cursor-pointer"
                  onClick={() => handleEdit(i)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
