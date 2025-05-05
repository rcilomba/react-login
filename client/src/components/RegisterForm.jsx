import React, { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // ersätta senare med ett API-anrop
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
        type="email"
        name="email"
        placeholder="E-post"
        value={formData.email}
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
        Registrera
      </button>
    </form>
  );
}

export default RegisterForm;
