const express = require("express");
const cors = require("cors");
const UserManager = require("./userManager");
const UserDatabase = require("./userDatabase");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const userManager = new UserManager();

// Ladda användare från fil -när servern startas
const savedUsers = UserDatabase.loadUsers();
userManager.users = savedUsers;

// Registrera en ny användare
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const result = userManager.register(username, password);

  if (typeof result === "string") {
    return res.status(400).json({ error: result });
  }

  UserDatabase.saveUsers(userManager.users);
  res.status(201).json({ message: "User registered successfully" });
});

// Logga in en användare
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = userManager.login(username, password);

  if (typeof result === "string") {
    return res.status(400).json({ error: result });
  }

  res.status(200).json({ message: "Login successful" });
});

// Logga ut en användare
app.post("/logout", (req, res) => {
  userManager.logout();
  res.status(200).json({ message: "Logout successful" });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
