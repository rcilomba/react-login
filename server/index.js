console.log("SERVER STARTAR");

const express = require("express");
const cors = require("cors");
const UserManager = require("./userManager");
const UserDatabase = require("./userDatabase"); // ✅ Se till att den importeras korrekt

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Skapa en delad instans av UserManager och ladda användare från users.json
const userManager = new UserManager();
userManager.users = UserDatabase.loadUsers();

const changePasswordRoute = require("./routes/changePassword")(
  userManager,
  UserDatabase
);
app.use("/change-password", changePasswordRoute);

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const result = userManager.register(username, password, email);

  if (typeof result === "string") {
    return res.status(400).json({ error: result });
  }

  UserDatabase.saveUsers(userManager.users);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = userManager.login(username, password);

  if (typeof result === "string") {
    return res.status(400).json({ error: result });
  }

  res.status(200).json({ message: "Login successful" });
});

app.post("/logout", (req, res) => {
  userManager.logout();
  res.status(200).json({ message: "Logout successful" });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

//trigger fpr github actions för cypress
