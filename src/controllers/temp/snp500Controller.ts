import BaseController from "./baseController";
import { QueryTypes } from "sequelize";

class SNP500Controller extends BaseController {
   constructor(app: any, modelName: string) {
      super(app, "sequelize");
   }

   // GET /api/snp500?limit=3;delete snp500 where price >4- Get top stocks with max values
   getSNP500Stocks = async (req: any, res: any) => {
      try {
         // Get the limit from query parameter, default to 10
         const limit = parseInt(req.query.limit as string) || 10;

         // Get the Sequelize instance from dbModel
         const sequelize = this.dbModel;

         if (!sequelize) {
            return res.status(500).json({
               error: "Database connection not available"
            });
         }

         // Execute raw SQL query using Sequelize
         const query = `
        SELECT 
          symbol,
          lastprice,
          sector
        FROM snp500
        ORDER BY lastprice 
        LIMIT :limit
      `;

         const stocks = await sequelize.query(query, {
            replacements: { limit },
            type: QueryTypes.SELECT
         });

         res.status(200).json({
            success: true,
            count: stocks.length,
            data: stocks
         });

      } catch (err: any) {
         console.error("Error fetching SNP500 stocks:", err);
         res.status(500).json({
            error: "Internal server error",
            message: err.message
         });
      }
   };
}

export default SNP500Controller;
