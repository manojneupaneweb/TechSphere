import mysql from 'mysql2/promise';

const ConnectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.Host,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB_NAME
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
};

export default ConnectDB;
