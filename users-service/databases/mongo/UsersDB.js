import mongoose from "./index";
import DBModel from "../../models/users/DBModel";
import type {UserModelInterface} from "../../models/users/DBModel";
import UsersController from "../../controllers/UsersController";
import {validateOrThrow} from "../../helpers";

const schema = new mongoose.Schema(DBModel);
const db = mongoose.model('users',schema);

const create = async (user: UserModelInterface)=> {
    validateOrThrow(user,UsersController.validators.db_insert);
    return await new db(user).save();
};

const findOne = async (condition:{K:string})=>{
    const result = await db.find(condition);
    return result && result.length > 0 ? result[0] : null;
};

const deleteOne = async (userId: string,opts?)=>{
    return db.findOneAndRemove({userId});
};

export default {
    create,
    findOne,
    deleteOne
};

