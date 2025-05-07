import { Request, Response } from "express";
import { UsersUseCases } from "../useCases/users";
import { ReturnMessages } from "../helpers/utils";

export class UsersController {
    constructor(private userUseCases: UsersUseCases) { }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body

            if (!username || !password) {
                return res.status(400).json({
                    message: "Username and password are required",
                })
            }

            const data = await this.userUseCases.loginUser({
                username: String(username),
                password: String(password),
            })

            if (data == "Incorrect password") {
                return res.status(401).json({
                    message: data
                })
            }

            if (data == "Not found") {
                return res.status(404).json({
                    message: data
                })
            }
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }


    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body

            if (!username || !password) {
                return res.status(400).json({
                    message: "Username and password are required",
                })
            }
            const data = await this.userUseCases.createUser(req.body)

            if (data === 'User already exists') {
                return res.status(400).json({
                    message: data
                })
            }

            return res.status(201).json(ReturnMessages.success)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }


    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const filters: any = {};

            if (req.query.username) {
                filters.username = { $regex: String(req.query.username), $options: "i" };
            }

            if (req.query.nickname) {
                filters.nickname = { $regex: String(req.query.nickname), $options: "i" };
            }

            const sortFields = [
                'kmsRunning',
                'kmsCycle',
                'daysBodyBuilding',
                'daysTrained',
                'score'
            ];

            const sort: any = {};
            for (const field of sortFields) {
                if (req.query[field]) {
                    sort[field] = req.query[field] === 'asc' ? 1 : -1;
                }
            }

            if (Object.keys(sort).length === 0) {
                sort.score = -1;
            }

            const users = await this.userUseCases.getUsers(filters, sort);
            return res.status(200).json({ message: users })
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const user = await this.userUseCases.getUserById(id)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const user = await this.userUseCases.updateUser(id, req.body)

            if (user === 'User not found') {
                return res.status(404).json({
                    message: user
                })
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const user = await this.userUseCases.deleteUser(id)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }


}
