const express = require("express");

module.exports = (userManager, UserDatabase) => {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!userManager.loggedInUser) {
      return res.status(401).json({ error: "Ingen användare är inloggad." });
    }

    if (userManager.loggedInUser.password !== currentPassword) {
      return res
        .status(401)
        .json({ error: "Det nuvarande lösenordet är fel." });
    }

    if (!userManager.isValidPassword(newPassword)) {
      return res.status(400).json({
        error: "Det nya lösenordet uppfyller inte säkerhetskraven.",
      });
    }

    const username = userManager.loggedInUser.username;
    const updated = UserDatabase.updatePassword(username, newPassword);

    if (!updated) {
      return res
        .status(500)
        .json({ error: "Lösenordsändringen misslyckades." });
    }

    userManager.loggedInUser.password = newPassword;

    return res.json({ message: "Lösenordet har ändrats!" });
  });

  return router;
};
