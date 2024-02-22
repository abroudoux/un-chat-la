import * as mongoose from 'mongoose';
export declare const UsersSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    password?: string;
}>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    password?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface User {
    name: string;
    email: string;
    password: string;
}
