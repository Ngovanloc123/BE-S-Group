import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import route from "./routers/index.router.js"
import { engine } from "express-handlebars";
import methodOverride from 'method-override';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))

app.engine(
  "hbs",
  engine({
    // Cấu hình lại đuôi file
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
