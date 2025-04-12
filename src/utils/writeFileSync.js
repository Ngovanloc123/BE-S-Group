import fs from "fs";
import path from "path";

function writeFileSync(dbJson) {
  try {
    fs.writeFileSync(
      path.resolve("src/DB/db.json"),
      JSON.stringify(dbJson, null, 2)
    );
    return true;
  } catch (err) {
    console.error("Lỗi khi ghi file JSON:", err);
    return false;
  }
}

export default writeFileSync;
