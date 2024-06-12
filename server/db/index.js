import Sequelize from 'sequelize';

let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sequelize.sqlite'
});

export default sequelize;
