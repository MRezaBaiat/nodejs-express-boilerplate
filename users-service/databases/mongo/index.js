import mongoose from 'mongoose';

export const initialize = () => {
  return mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export const shutdown = () => {
  return mongoose.disconnect();
};

export default mongoose;
