import userRouter from "./user.router.js";
import siteRouter from "./site.router.js";

function route(app) {
    app.use('/users', userRouter);
    app.use('/', siteRouter);
}

export default route;