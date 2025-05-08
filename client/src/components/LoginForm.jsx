import React, { useState } from "react";

function LoginForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage("Fel användarnamn eller lösenord.");
        } else {
          setIsLoggedIn(true); // användaren är inloggad
        }
      })
      .catch(() => {
        setErrorMessage("Ett nätverksfel uppstod. Försök igen.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="text"
        name="username"
        placeholder="Användarnamn"
        value={formData.username}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Lösenord"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Logga in
      </button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
