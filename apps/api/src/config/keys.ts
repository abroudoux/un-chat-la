import * as dotenv from 'dotenv';


dotenv.config();

const config = {
    mongoURI : process.env.MONGO_URI,
    jwtSecret : process.env.JWT_SECRET,
    jwtExpire : process.env.JWT_EXPIRES,
};

if (!config.mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
};


export default config;