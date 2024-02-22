import * as mongoose from 'mongoose';


export const UsersSchema = new mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    password : { type : String, require : true },
});

export interface User {
    name : string,
    email : string,
    password : string,
};
