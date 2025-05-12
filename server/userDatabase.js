const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

class UserDatabase {
  // Spara användare till users.json
  static saveUsers(users) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error("Fel vid skrivning till users.json:", error);
    }
  }

  // Läs användare från users.json
  static loadUsers() {
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        return [];
      }

      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Fel vid läsning av users.json:", error);
      return [];
    }
  }

  // Uppdatera specifik användares lösenord
  static updatePassword(username, newPassword) {
    try {
      let users = this.loadUsers();
      const userIndex = users.findIndex((user) => user.username === username);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        this.saveUsers(users);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Fel vid uppdatering av lösenord:", error);
      return false;
    }
  }
}

module.exports = UserDatabase;
