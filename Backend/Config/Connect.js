// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: 'sql123.epizy.com',
//     dialect: 'mysql',
//     port: 3306,
//   }
// );

// const ConnectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(" Database name", process.env.DB_NAME);
//     console.log("Database user", process.env.USER);
//     if (process.env.PASSWORD) console.log("Database password", "...");
//     console.log("Database host", process.env.HOST);
//     console.log('Connected to the database!');
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//     process.exit(1);
//   }
// };

// export { sequelize, ConnectDB };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.localhost_HOST,
  username: process.env.localhost_USER,
  password: process.env.localhost_PASSWORD,
  database: process.env.localhost_DB_NAME,
  dialectOptions: {
    connectTimeout: 60000,
  },
});

const ConnectDB = async () => {
  try {
    // console.log("Database name:", process.env.localhost_DB_NAME);
    // console.log("Database user:", process.env.localhost_USER);
    // if (process.env.localhost_PASSWORD) console.log("Database password", "...");
    // console.log("Database host:", process.env.localhost_HOST);
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

export { sequelize, ConnectDB };
