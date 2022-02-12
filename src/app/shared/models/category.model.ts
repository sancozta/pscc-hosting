import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';

export class Category extends FireCrudModelAbstract {
  public override  uid?: string;
  public key?: string;
  public title?: string;
  public order?: number;
  public icon?: string;

  static collection(): string {
    return 'categorys';
  }
}
