import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';
import { ImgModel } from './img.model';

export class Product implements FireCrudModelAbstract {
  constructor(
    public uid?: string,
    public order?: number,
    public title?: string,
    public description?: string,
    public category?: string,
    public price?: number,
    public images?: ImgModel[],
  ) { }

  collection(): string {
    return 'products';
  }
}
