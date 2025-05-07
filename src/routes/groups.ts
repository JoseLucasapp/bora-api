import { Request, Response, Router } from "express";
import { GroupsController } from "../controllers/groups";
import { GroupsUseCases } from "../useCases/groups";
import { validadeJwt } from "../middlewares/loginAuth";

const groupUseCases = new GroupsUseCases();
const groupsController = new GroupsController(groupUseCases);

const groupsRouter = Router();

groupsRouter.post("/groups", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.createGroup(req, res);
});

groupsRouter.get("/groups", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.getGroups(req, res);
});

groupsRouter.get("/groups/:id", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.getGroupById(req, res);
});

groupsRouter.put("/groups/:id", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.updateGroup(req, res);
});

groupsRouter.delete("/groups/:id", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.deleteGroup(req, res);
});

groupsRouter.put("/groups/:id/adduser", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.addUserToGroup(req, res);
});

groupsRouter.put("/groups/:id/score", validadeJwt, async (req: Request, res: Response): Promise<any> => {
    return await groupsController.incrementScore(req, res);
});


export default groupsRouter;