import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const PhoneModel = sequelize.define('phones', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  done: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  closed: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  busy: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cardId: {
    type: DataTypes.STRING,
    unique: true
  },
  major: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default PhoneModel;
