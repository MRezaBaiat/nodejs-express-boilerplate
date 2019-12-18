import { ModelAttributes, DataTypes } from 'sequelize';

export interface PostModelInterface{
    _id: number,
    senderId: number,
    title: string,
    details: string,
    image_url: string,
    comments: {senderId: string, text: string}[]
}

const DBModel: ModelAttributes = {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  senderId: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  details: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  },
  comments: {
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue('comments'));
    },
    set: function (val) {
      return this.setDataValue('comments', JSON.stringify(val));
    }
  }
};

export default DBModel;
