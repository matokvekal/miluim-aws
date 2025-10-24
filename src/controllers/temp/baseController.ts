class BaseController {
  modelName: string = "";
  _dbModel: any = null;
  app: any = null;

  constructor(app: any, modelName: any) {
    this.app = app;
    this.modelName = modelName;
  }

  get dbModel() {
    if (!this._dbModel) {
      const dbModels = this.app.get("dbModels");
      this._dbModel = this.app.get("dbModels")?.[this.modelName];
    }
    return this._dbModel;
  }
}

export default BaseController;
