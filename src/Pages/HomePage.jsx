import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Repositories from "./Repositories";
import UserContext from "../utilities/UserContext";

const HomePage = () => {
  const [sdata, setsdata] = useState("");
  const userContext = useContext(UserContext);
  console.log(userContext.username);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/users/${userContext.username}`
      );
      const data = await response.json();
      console.log(data);
      setsdata(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />
      {sdata !== ""}
      <div className="bg-gray-900 min-h-screen flex flex-row justify-evenly items-center">
        <div className=" rounded-xl overflow-hidden bg-gray-800 shadow-lg">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full overflow-hidden w-32 h-32">
                <img className="" src={sdata.avatar_url} alt="Avatar" />
              </div>
              <div className="text-2xl font-bold text-gray-200 mt-4">
                {sdata.name}
              </div>
              <div className="text-xl font-bold text-gray-400 mt-2">
                @{sdata.login}
              </div>
              <div className="flex justify-evenly mt-4">
                <Link to="/follower">
                  <span className="font-semibold text-gray-200 hover:text-yellow-500">
                    Followers: {sdata.followers}
                  </span>
                </Link>
                <Link to="/following">
                  <span className="pl-10 font-semibold text-gray-200 hover:text-yellow-500">
                    Following: {sdata.following}
                  </span>
                </Link>
              </div>
              <Link to="/repositories">
                <div className="mt-4 font-semibold text-gray-200 hover:text-yellow-500">
                  Public Repositories: {sdata.public_repos}
                </div>
              </Link>
              <button className="bg-gray-200 px-4 py-2 rounded-md mt-4 hover:bg-gray-500">
                <a href={sdata.html_url} target="_blank">
                  <span className="font-bold text-gray-900 ">View Profile</span>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
