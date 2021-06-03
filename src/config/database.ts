import mongoose from "mongoose";

const ConnectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        if (connection) console.log("Connected to DB (; ...");
    } catch (e) {
        console.log(e);
    }
};

export default ConnectToDb;
