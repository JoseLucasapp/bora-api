import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    challenger_gen_IA: {
        type: String,
        required: false
    },
    competitors: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['MUSCLE', 'CROSSFIT', 'RUN', 'BIKE', 'SWIMMING', 'STRETCH'],
    },
    general_score: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    users_limit: {
        type: Number,
        default: 5
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
});

export const Group = mongoose.model("groups", GroupSchema);
