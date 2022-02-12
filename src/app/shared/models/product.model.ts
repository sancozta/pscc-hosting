import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';
import { ImgModel } from './img.model';

export class Product extends FireCrudModelAbstract {
  public override uid?: string;
  public order?: number;
  public title?: string;
  public description?: string;
  public category?: string;
  public price?: number;
  public images?: ImgModel[];

  static collection(): string {
    return 'products';
  }
}
