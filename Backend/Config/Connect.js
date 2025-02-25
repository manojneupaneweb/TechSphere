import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql'
  }
);

const ConnectDB = async () => {
  try {
    // console.log(process.env.DB_NAME,);
    // console.log(process.env.USER);
    // console.log(process.env.PASSWORD);
    
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

export { sequelize, ConnectDB };
