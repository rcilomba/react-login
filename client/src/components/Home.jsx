import React, { useState } from "react";

function Home({ setIsLoggedIn }) {
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setChangePasswordData({
      ...changePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Bekräfta att "nytt lösenord" matchar "bekräfta nytt lösenord"
    if (
      changePasswordData.newPassword !== changePasswordData.confirmNewPassword
    ) {
      setErrorMessage("Nytt lösenord och bekräftelse matchar inte.");
      return;
    }

    // Gör API-anropet - anpassa endpoint och logik efter vad servern förväntar sig
    fetch("http://localhost:3001/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setSuccessMessage("Lösenordet har ändrats!");
          // Återställ formuläret
          setChangePasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Något gick fel, försök igen senare.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Hej, du är inloggad! 👋</h1>
      <button
        onClick={() => setIsLoggedIn(false)}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Logga ut
      </button>

      <h2 className="text-xl mt-6">Ändra lösenord</h2>
      <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Nuvarande lösenord"
          value={changePasswordData.currentPassword}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nytt lösenord"
          value={changePasswordData.newPassword}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Bekräfta nytt lösenord"
          value={changePasswordData.confirmNewPassword}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Spara nytt lösenord
        </button>
      </form>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}

export default Home;
