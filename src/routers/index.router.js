import userRouter from "./user.router.js";
import siteRouter from "./site.router.js";
import authRouter from "./auth.router.js";
import meRouter from "./me.router.js";

function route(app) {
    app.use('/me', meRouter);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

export default route;