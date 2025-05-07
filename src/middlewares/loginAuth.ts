// middlewares/loginAuth.ts
import { RequestHandler } from "express";
import { verifyToken } from "../helpers/jwt";
import { ReturnMessages } from "../helpers/utils";

export const validadeJwt: RequestHandler = (req, res, next): any => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: {
                message: ReturnMessages.invalidToken,
            },
        });
    }

    try {
        const user = verifyToken(authorization); // deve retornar { _id, username }
        if (!user) {
            return res.status(401).json({
                error: {
                    message: ReturnMessages.invalidToken,
                },
            });
        }

        (req as any).user = user; // adicionar user ao req (veja tipagem opcional abaixo)
        next();
    } catch (err) {
        return res.status(401).json({
            error: {
                message: ReturnMessages.invalidToken,
            },
        });
    }
};
