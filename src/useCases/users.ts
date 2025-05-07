import mongoose from "mongoose";
import { generateToken } from "../helpers/jwt";
import { createHash } from "../helpers/utils";
import { User } from "../models/users";

export class UsersUseCases {

    async createUser(data: any) {
        const userExists = await User.findOne({ username: data.username })

        if (userExists) {
            return 'User already exists'
        }


        const hashed = createHash(data.password);
        data.password = hashed

        const user = new User(data);

        await user.save();
    }

    async getUsers(filters: any = {}, sort: any = {}): Promise<any[]> {
        return await User.find(filters).sort(sort).exec();
    }


    async getUserById(id: string) {
        return await User.findById(id)
    }

    async updateUser(id: string, data: any) {
        const user = await User.findById(id);
        if (!user) return 'User not found';

        if (data.password) {
            data.password = createHash(data.password);
        }

        const incFields = ['kmsRunning', 'kmsCycle', 'daysBodyBuilding', 'daysTrained', 'score'];
        const $inc: any = {};

        for (const field of incFields) {
            if (data[field] !== undefined && typeof data[field] === 'number') {
                $inc[field] = data[field];
            }
        }

        const $set: any = {};
        const directFields = ['username', 'nickname', 'avatar', 'password'];

        for (const field of directFields) {
            if (data[field] !== undefined) {
                $set[field] = data[field];
            }
        }

        const update: any = {};
        if (Object.keys($inc).length > 0) update.$inc = $inc;
        if (Object.keys($set).length > 0) update.$set = $set;

        await User.findByIdAndUpdate(id, update, { new: true });

        return 'User updated';
    }

    async loginUser(data: any) {
        const pass = await createHash(data.password)
        const user = await User.findOne({ username: data.username, password: pass })

        if (!user) {
            const userPass = await User.findOne({ username: data.username })
            if (userPass) {
                return 'Incorrect password'
            }
            return 'Not found'
        }

        const token = generateToken(
            {
                _id: user._id,
                username: user.username
            }
        )

        return { user, token }


    }

    async deleteUser(id: string) {
        return await User.findByIdAndDelete(id);
    }
}