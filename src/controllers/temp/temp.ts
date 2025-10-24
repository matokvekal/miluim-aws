import BaseController from "./baseController";

// Global counter shared across all instances
let globalCounter = 0;

class TempController extends BaseController {
  constructor(app: any, modelName: string) {
    super(app, "sql");
  }
  
  // GET /api/temp/hello
  hello = async (req: any, res: any) => {
    res.status(200).json({ message: "Hello  from  temp/hello" });
  };

  // GET /api/temp/hello2
  hello2 = async (req: any, res: any) => {
    try {
      res.status(200).json({ message: "Hello  from  temp/hello3- from gilad" });
    } catch (err) {
      res.status(500).send(" Internal server error");
    }
  };

  // GET /api/temp/counter - Get current counter value
  getCounter = async (req: any, res: any) => {
    try {
      res.status(200).json({ 
        counter: globalCounter,
        message: "Current counter value"
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // POST /api/temp/counter/increment - Increment counter and return new value
  incrementCounter = async (req: any, res: any) => {
    try {
      globalCounter++;
      res.status(200).json({ 
        counter: globalCounter,
        message: "Counter incremented successfully"
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // POST /api/temp/counter/reset - Reset counter to 0 (optional feature)
  resetCounter = async (req: any, res: any) => {
    try {
      globalCounter = 0;
      res.status(200).json({ 
        counter: globalCounter,
        message: "Counter reset to 0"
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };


}

export default TempController;
