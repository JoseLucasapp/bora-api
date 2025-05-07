import { Group } from "../models/groups";
import { User } from "../models/users";

export class GroupsUseCases {
    async createGroup(userId: string, data: any) {
        const user = await User.findById(userId);
        if (!user) {
            return 'User not found';
        }

        if (user.groupLimit <= 0) {
            return 'Group limit reached';
        }

        user.groupLimit -= 1;
        await user.save();

        const group = new Group({
            ...data,
            owner: userId,
            users: [userId]
        });

        await group.save();
        return group;
    }

    async getGroups(filters: any = {}, sort: any = {}): Promise<any[]> {
        return await Group.find(filters).sort(sort).exec();
    }

    async getGroupById(id: string) {
        return await Group.findById(id);
    }

    async deleteGroup(id: string) {
        return await Group.findByIdAndDelete(id);
    }

    async addUserToGroup(groupId: string, userId: any) {
        const group = await Group.findById(groupId);
        if (!group) return 'Group not found';

        if (group.users.includes(userId)) {
            return 'User already in group';
        }

        if (group.users.length >= group.users_limit) {
            return 'Group is full';
        }

        group.users.push(userId);
        group.competitors += 1;

        await group.save();
        return group;
    }

    async incrementScore(groupId: string, amount: number) {
        if (typeof amount !== 'number' || amount <= 0) {
            return 'Invalid amount';
        }

        const group = await Group.findById(groupId);
        if (!group) return 'Group not found';

        group.general_score += amount;
        await group.save();

        return group;
    }



    async updateGroup(id: string, data: any) {
        const group = await Group.findById(id);
        if (!group) return 'Group not found';

        delete data.owner;
        delete data.users;
        delete data.general_score;
        delete data.competitors;

        const allowedFields = ['title', 'description', 'challenger_gen_IA', 'type', 'users_limit'];

        for (const field of allowedFields) {
            if (field in data) {
                (group as any)[field] = data[field];
            }
        }

        await group.save();
        return group;
    }

}
