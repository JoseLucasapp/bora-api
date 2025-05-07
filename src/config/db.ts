import "dotenv/config";
import mongoose from "mongoose"

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI as string)