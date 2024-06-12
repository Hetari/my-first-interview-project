import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const UserModel = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  phoneId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'phones',
      key: 'id'
    }
  }
});

export default UserModel;
