import { Request, Response } from "express";
import { GroupsUseCases } from "../useCases/groups";
import { ReturnMessages } from "../helpers/utils";

export class GroupsController {
    constructor(private groupUseCases: GroupsUseCases) { }

    async createGroup(req: Request, res: Response): Promise<Response> {
        try {

            const data = req.body;

            const group = await this.groupUseCases.createGroup(req.user._id, data);

            if (group == 'Group limit reached') {
                return res.status(400).json({
                    message: group
                })
            }

            if (group == 'User not found') {
                return res.status(400).json({
                    message: group
                })
            }

            return res.status(201).json(group);

        } catch (err) {
            return res.status(500).json({
                message: err || ReturnMessages.UnexpectedError
            })
        }
    }


    async getGroups(req: Request, res: Response): Promise<Response> {
        try {
            const filters: any = {};

            if (req.query.title) {
                filters.title = { $regex: String(req.query.title), $options: "i" };
            }

            if (req.query.userId) {
                filters.users = req.query.userId;
            }

            const sortFields = ['general_score'];
            const sort: any = {};

            for (const field of sortFields) {
                if (req.query[field]) {
                    sort[field] = req.query[field] === 'asc' ? 1 : -1;
                }
            }

            if (Object.keys(sort).length === 0) {
                sort.general_score = -1;
            }

            const groups = await this.groupUseCases.getGroups(filters, sort);
            return res.status(200).json({ message: groups });
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            });
        }
    }


    async getGroupById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const group = await this.groupUseCases.getGroupById(id)
            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async deleteGroup(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const group = await this.groupUseCases.deleteGroup(id)
            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async updateGroup(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const group = await this.groupUseCases.updateGroup(id, req.body)

            if (group == 'Group not found') {
                return res.status(404).json({
                    message: group
                })
            }
            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async incrementScore(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const { amount } = req.body
            const group = await this.groupUseCases.incrementScore(id, amount)

            if (group == 'Group not found') {
                return res.status(404).json({
                    message: group
                })
            }

            if (group == "Invalid amount") {
                return res.status(400).json({
                    message: group
                })
            }
            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }

    async addUserToGroup(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const { userId } = req.body
            const group = await this.groupUseCases.addUserToGroup(id, userId)

            if (group == 'Group not found') {
                return res.status(404).json({
                    message: group
                })
            }

            if (group == 'Group is full') {
                return res.status(404).json({
                    message: group
                })
            }

            if (group == 'User already in group') {
                return res.status(404).json({
                    message: group
                })
            }

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({
                message: error || ReturnMessages.UnexpectedError
            })
        }
    }
}