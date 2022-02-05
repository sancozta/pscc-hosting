import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';

export class Category implements FireCrudModelAbstract {
  constructor(
    public uid?: string,
    public key?: string,
    public title?: string,
    public order?: number,
    public icon?: string,
  ) { }

  collection(): string {
    return 'categorys';
  }
}
