import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utilities/UserContext";
import Header from "./Header";

const Body = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const userContext = useContext(UserContext);
  const handleButtonClick = () => {
    userContext.setUsername(username);
    if (username !== "") navigate("/home");
  };

  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-50 mb-10">
            Find GitHub Users and Explore Their Repositories with Ease
          </h2>
        </div>
        <form>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-50"
            >
              Enter GitHub username
            </label>
            <input
              type="text"
              id="text"
              autoComplete="off"
              autos
              className="shadow-sm bg-gray-800 border border-gray-700 text-gray-50 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-white text-sm px-5 py-2.5 text-center "
            onClick={handleButtonClick}
          >
            Find User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Body;
