import userRouter from "./user.router.js";
import siteRouter from "./site.router.js";
import authRouter from "./auth.router.js";

function route(app) {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

export default route;