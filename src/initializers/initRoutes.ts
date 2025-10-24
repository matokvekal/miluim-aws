import { Router } from "express";
import { TempController, SNP500Controller } from "../controllers/temp";



export default (router: Router, app: any) => {

   const modelBase = "temp";
   const tempController = new TempController(app, modelBase);

   // GET /api/temp
   router.get(
      `/`,
      tempController.hello.bind(tempController)
   );
   // GET /api/temp/hello
   router.get(
      `/hello`,
      tempController.hello2.bind(tempController)
   );

   // Counter routes
   // GET /api/temp/counter - Get current counter value
   router.get(
      `/counter`,
      tempController.getCounter.bind(tempController)
   );

   // POST /api/temp/counter/increment - Increment counter
   router.post(
      `/counter/increment`,
      tempController.incrementCounter.bind(tempController)
   );

   // POST /api/temp/counter/reset - Reset counter to 0
   router.post(
      `/counter/reset`,
      tempController.resetCounter.bind(tempController)
   );

};

// SNP500 Routes
export const initSNP500Routes = (router: Router, app: any) => {
   const snp500Controller = new SNP500Controller(app, "sequelize");

   // GET /api/snp500 - Get top stocks with max values
   router.get(
      `/`,
      snp500Controller.getSNP500Stocks.bind(snp500Controller)
   );
};