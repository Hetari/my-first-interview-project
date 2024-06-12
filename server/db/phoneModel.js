import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const PhoneModel = sequelize.define('phones', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  status: {
    type: DataTypes.ENUM,
    values: ['done', 'closed', 'busy', 'awaiting'],
    defaultValue: 'awaiting'
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
  },
  attempt: {
    type: DataTypes.INTEGER,
    defaultValue: () => {
      const min = 0;
      const max = 6;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
});

export default PhoneModel;
