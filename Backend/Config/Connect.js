import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    port: 3306,
  }
);

const ConnectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

export { sequelize, ConnectDB };
