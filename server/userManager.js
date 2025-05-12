const User = require("./user");

class UserManager {
  constructor() {
    this.users = [];
    this.loggedInUser = null;
  }

  register(username, password, email) {
    if (this.users.find((user) => user.username === username)) {
      return "Username already exists.";
    }

    if (this.users.find((user) => user.email === email)) {
      return "Email already exists.";
    }

    if (!this.isValidPassword(password)) {
      return "Password does not meet security requirements.";
    }

    const newUser = new User(username, password, email);
    this.users.push(newUser);
    return newUser;
  }

  login(username, password) {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      return "User not found.";
    }

    if (user.password !== password) {
      return "Incorrect password.";
    }

    this.loggedInUser = user;
    return true;
  }

  logout() {
    this.loggedInUser = null;
    return true;
  }

  isValidPassword(password) {
    // Minst 8 tecken, minst en stor bokstav och en siffra
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
}

module.exports = UserManager;
