import { Router } from "express";
import fs from "fs";
import dbJson from "../db.json" assert { type: "json" };
import { log } from "console";

const router = Router();

// callback function
router.get("/users", (req, res) => {
  const users = dbJson.users;
  res.status(200).json(users);
});

// callback function
router.post("/users", (req, res) => {
  // Destructuring assignment
  const { name, email, password } = req.body;

  const newUser = {
    id: dbJson.users.length + 1,
    name,
    email,
    password,
  };

  // Thêm user mới vào danh sách
  dbJson.users.push(newUser);

  // Ghi lại file db.json
  fs.writeFile("./db.json", JSON.stringify(dbJson, null, 2), (err) => {
    if (err) {
      console.error("Lỗi :", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  });
});

router.put("/users/:id", (req, res) => {
  console.log("id");
  const { id } = req.params;

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Phải đầy đủ thông tin" });
  }

  // Lấy vị trí của user có id
  const userIndex = dbJson.users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  dbJson.users[userIndex] = { id: parseInt(id), name, email, password };

  fs.writeFile("./db.json", JSON.stringify(dbJson, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi dữ liệu" });
    }
    res.status(200).json({
      message: "User update successfully",
      user: dbJson.users[userIndex],
    });
  });
});

router.patch("/users/:id", (req, res) => {
    const { id } = req.params;
  
    const { name, email, password } = req.body;
  
    // Lấy vị trí của user có id
    const userIndex = dbJson.users.findIndex((user) => user.id === parseInt(id));
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    dbJson.users[userIndex] = { 
        id: parseInt(id), 
        name: name || dbJson.users[userIndex].name, 
        email: email || dbJson.users[userIndex].email, 
        password: password || dbJson.users[userIndex].password
    };
  
    fs.writeFile("./db.json", JSON.stringify(dbJson, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi dữ liệu" });
      }
      res.status(200).json({
        message: "User update successfully",
        user: dbJson.users[userIndex],
      });
    });
  });

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = dbJson.users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "Không tìm thấy" });
  }

  dbJson.users.splice(userIndex, 1);
  fs.writeFile("./db.json", JSON.stringify(dbJson, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi lưu dữ liệu" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      id: id,
    });
  });
});

export default router;
