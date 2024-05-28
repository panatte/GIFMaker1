import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db';

const User = sequelize.define('user_', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path_profile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

const info_image = sequelize.define('info_image', {
  img_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imgName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path_Img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TagNames: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_like: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

const comP = sequelize.define('complain', {
  compID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  img_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Timestamp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

const Tag = sequelize.define('tag', {
  tagID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tagName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

const like_history = sequelize.define('like_history', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  img_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

User.hasMany(info_image, { foreignKey: 'UserID' });
info_image.belongsTo(User, { foreignKey: 'UserID' });

const models = { User, info_image, comP, Tag, like_history };

export default models;
