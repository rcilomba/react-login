import { useState } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1 className="text-center text-2xl mt-4">Welcome!</h1>
      <div className="flex justify-center space-x-10 mt-10">
        {!isLoggedIn ? (
          <>
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
            <RegisterForm />
          </>
        ) : (
          <Home setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </>
  );
}

export default App;
