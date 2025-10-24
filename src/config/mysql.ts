import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
   NAME: process.env.DB_NAME || 'stock',
   USER: process.env.DB_USER || 'root',
   PASSWORD: process.env.DB_PASSWORD || '',
   HOST: process.env.DB_HOST || 'localhost',
   PORT: parseInt(process.env.DB_PORT || '3306'),
   dialect: 'mysql',
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
};

// Create Sequelize instance with authentication plugin support
const sequelize = new Sequelize(config.NAME, config.USER, config.PASSWORD, {
   host: config.HOST,
   port: config.PORT,
   dialect: 'mysql',
   pool: config.pool,
   logging: false, // Set to console.log to see SQL queries
   dialectOptions: {
      authPlugins: {
         mysql_clear_password: () => () => Buffer.from(config.PASSWORD + '\0')
      }
   }
});

const getMySQLConnection = async () => {
   try {
      const connection = await mysql.createConnection({
         host: config.HOST,
         user: config.USER,
         password: config.PASSWORD,
         database: config.NAME,
         port: config.PORT,
         authPlugins: {
            mysql_clear_password: () => () => Buffer.from(config.PASSWORD + '\0')
         }
      });
      return connection;
   } catch (error) {
      console.error('MySQL connection error:', error);
      throw error;
   }
};

export default getMySQLConnection;
export { config, sequelize };

