import React from "react";

function Home({ setIsLoggedIn }) {
  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Hej, du är inloggad! 👋</h1>
      <button
        onClick={() => setIsLoggedIn(false)}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Logga ut
      </button>
    </div>
  );
}

export default Home;
