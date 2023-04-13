import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utilities/UserContext";

const Repositories = () => {
  const [sdata, setsdata] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/users/${userContext.username}/repos`
      );
      const data = await response.json();
      setsdata(data);
    }
    fetchData();
  }, [userContext.username]);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 h-screen">
      <div className="rounded-xl overflow-hidden bg-gray-800 shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 flex justify-center">
            Repositories
          </h2>
          <div className="bg-gray-900 rounded-lg">
            {sdata.length > 0 ? (
              sdata.map((repo) => (
                <div key={repo.id} className="p-4 border-b border-gray-800">
                  <h3 className="text-lg font-medium text-gray-200 mb-1">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 mb-2">{repo.description}</p>
                  <div className="flex items-center text-gray-400">
                    <span className="mr-2 text-yellow-400">
                      {repo.language}
                    </span>
                    <span className="font-bold mr-2">
                      {repo.stargazers_count} stars
                    </span>
                    <span className="font-bold">{repo.forks_count} forks</span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-white mt-2 font-extrabold"
                  >
                    View Repository
                  </a>
                </div>
              ))
            ) : (
              <div className="text-gray-200 text-center py-10 flex justify-between">
                Loading Repositories...
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="absolute top-0 left-0 mt-2 ml-2 px-3 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default Repositories;
