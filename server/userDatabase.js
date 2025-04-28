const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

class UserDatabase {
  static saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }

  static loadUsers() {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
}

module.exports = UserDatabase;
