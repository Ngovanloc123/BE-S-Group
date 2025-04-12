import { nanoid } from "nanoid";
import dbJson from "../../DB/db.json" assert { type: "json" };
import writeFileSync from "../../utils/writeFileSync.js";

class UserModel {
  getAllUsers() {
    return dbJson.users;
  }

  getUserById(id) {
    return dbJson.users.find((user) => user.id === id);
  }

  addUser({ name, email, password }) {
    const newUser = {
      id: nanoid(),
      name,
      email,
      password,
    };

    dbJson.users.push(newUser);
    const success = writeFileSync(dbJson);

    return success ? newUser : null;
  }

  updateUser({id, name, email, password} ) {
    const userIndex = dbJson.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;

    dbJson.users[userIndex] = { id, name, email, password };
    return writeFileSync(dbJson) ? dbJson.users[userIndex] : null;
  }

  // updateUserPartial(id, data) {
  //   const userIndex = dbJson.users.findIndex(user => user.id === parseInt(id));
  //   if (userIndex === -1) return null;

  //   dbJson.users[userIndex] = {
  //     ...dbJson.users[userIndex],
  //     ...data,
  //     id: parseInt(id),
  //   };
  //   return writeFileSync(dbJson) ? dbJson.users[userIndex] : null;
  // }

  deleteUser(id) {
    const userIndex = dbJson.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    dbJson.users.splice(userIndex, 1);
    return writeFileSync(dbJson);
  }
}

export default new UserModel();
