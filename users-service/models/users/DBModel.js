import { ObjectId } from 'mongoose';

export interface UserModelInterface{
    name: string,
    family: string,
    password: string,
    two_factor_auth: string,
    phone: string,
    email: string,
    userId: string,
    coupon: string,
    creditCard: string,
    comments: {body: string, date: Date}
}

const DBModel: UserModelInterface = {
  name: String,
  family: String,
  password: String,
  two_factor_auth: String,
  phone: String,
  email: { type: String, unique: true },
  userId: { type: ObjectId, unique: true, required: true, auto: true },
  coupon: String,
  creditCard: String,
  comments: { body: String, date: Date }
};

export default DBModel;
