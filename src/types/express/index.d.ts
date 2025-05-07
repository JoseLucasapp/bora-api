import { AuthInterface } from "../../helpers/jwt"; // adapte conforme sua estrutura

declare global {
    namespace Express {
        interface Request {
            user?: AuthInterface;
        }
    }
}