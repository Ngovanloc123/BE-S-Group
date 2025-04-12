document.addEventListener("DOMContentLoaded", () => {
    // Xóa người dùng
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            if (confirm("Xoá người dùng này?")) {
                await fetch(`/users/${id}`, { method: "DELETE" });
                location.reload(); // reload lại trang sau khi xoá
            }
        });
    });

    // document.querySelectorAll(".edit-btn").forEach(btn => {
    //     btn.addEventListener("click", async () => {
    //         const id = btn.dataset.id;
    //         const name = prompt("Tên mới:", btn.dataset.name);
    //         const email = prompt("Email mới:", btn.dataset.email);
    //         const password = prompt("Mật khẩu mới:", btn.dataset.password);

    //         if (name && email && password) {
    //             await fetch(`/api/users/${id}`, {
    //                 method: "PUT",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ name, email, password })
    //             });
    //             location.reload(); // reload lại trang sau khi sửa
    //         }
    //     });
    // });
});
