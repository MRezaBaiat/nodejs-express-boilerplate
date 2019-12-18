import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connection)=>{

}).catch((err)=>{

});


export default mongoose;

