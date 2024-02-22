import * as mongoose from 'mongoose';


export const CatsSchema = new mongoose.Schema({
    name : { type : String, required : true },
    color : { type : String, required : true },
    image : { type : String, required : false },
});

export interface Cat {
    name : string,
    color : string,
    image : string,
};