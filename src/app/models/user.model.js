import dbJson from "../../DB/db.json" assert { type: "json" };
import writeFileSync from "../../utils/writeFileSync.js";

class UserModel {
  getAllUsers() {
    return dbJson.users;
  }

  getUserById(id) {
    return dbJson.users.find((user) => user.id === parseInt(id));
  }

  addUser({ name, email, password }) {
    const newUser = {
      id: dbJson.users[dbJson.users.length - 1]?.id + 1 || 1,
      name,
      email,
      password,
    };

    dbJson.users.push(newUser);
    const success = writeFileSync(dbJson);

    return success ? newUser : null;
  }

  updateUserFull(id, { name, email, password }) {
    const userIndex = dbJson.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;

    dbJson.users[userIndex] = { id: parseInt(id), name, email, password };
    return writeFileSync(dbJson) ? dbJson.users[userIndex] : null;
  }

  updateUserPartial(id, data) {
    const userIndex = dbJson.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;

    dbJson.users[userIndex] = {
      ...dbJson.users[userIndex],
      ...data,
      id: parseInt(id),
    };
    return writeFileSync(dbJson) ? dbJson.users[userIndex] : null;
  }

  deleteUser(id) {
    const userIndex = dbJson.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return false;

    dbJson.users.splice(userIndex, 1);
    return writeFileSync(dbJson);
  }
}

export default new UserModel();
