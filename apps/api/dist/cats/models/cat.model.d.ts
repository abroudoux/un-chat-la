import * as mongoose from 'mongoose';
export declare const CatsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    color: string;
    image?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    color: string;
    image?: string;
}>> & mongoose.FlatRecord<{
    name: string;
    color: string;
    image?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Cat {
    name: string;
    color: string;
    image: string;
}
