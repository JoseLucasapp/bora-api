import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    nickname: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    kmsRunning: {
        type: Number,
        default: 0
    },
    kmsCycle: {
        type: Number,
        default: 0
    },
    daysBodyBuilding: {
        type: Number,
        default: 0
    },
    daysTrained: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    typeAccount: {
        type: String,
        enum: ['BASIC', 'PREMIUM'],
        default: 'BASIC'
    },
    groupLimit: {
        type: Number,
        default: 2
    }
}, {
    timestamps: true
});

export const User = mongoose.model("users", UserSchema);