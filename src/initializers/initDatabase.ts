import { sequelize } from '../config/mysql';

const initDatabase = async (config: any) => {
  try {
    // Test Sequelize connection
    await sequelize.authenticate();

    const dbModels = {
      sequelize: sequelize,
    };

    return dbModels;
  } catch (err: any) {
    console.error("Database connection failed:", err?.message || err);

    return {
      sequelize: null,
    };
  }
};

export default initDatabase;

//comment mysql