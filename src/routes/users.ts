import { Request, Response, Router, NextFunction } from "express";
import { UsersController } from "../controllers/users";
import { UsersUseCases } from "../useCases/users";
import { validadeJwt } from "../middlewares/loginAuth";

const usersUseCases = new UsersUseCases();
const usersController = new UsersController(usersUseCases);
const userRouter = Router();

userRouter.get("/users", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await usersController.getUsers(req, res);
});

userRouter.post("/users", async (req: Request, res: Response): Promise<any> => {
    return await usersController.createUser(req, res);
});

userRouter.post("/users/login", async (req: Request, res: Response): Promise<any> => {
    return await usersController.login(req, res);
});

userRouter.get("/users/:id", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await usersController.getUserById(req, res);
});

userRouter.put("/users/:id", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await usersController.updateUser(req, res);
});

export default userRouter;
