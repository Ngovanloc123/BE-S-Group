// const regexEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3}$/;


// function validate(req, res, next) {
//     const { name, email, id } = req.body;
//     const errors = [];

//     if (!name || name.length < 5) {
//       errors.push("Tên user phải hơn 5 ký tự");
//     }

//     if (!regexEmail.test(email)) {
//       errors.push("Không đúng dạng email");
//     }


//     const found = dbJson.users.find(user => user.email === email && user.id != id);
//     if (found) {
//       errors.push("Email đã tồn tại");
//     }

//     if (errors.length > 0) {
//       return res.status(400).render("users/error", {
//         title: "Thêm người dùng",
//         errors,
//         user: req.body // Để hiển thị lại dữ liệu nhập sai
//       });
//     }
    

//     next();
//   }

// export default validate;
