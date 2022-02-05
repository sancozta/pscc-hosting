import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';

export class User implements FireCrudModelAbstract {
  constructor(
    public uid?: string,
    public name?: string,
    public email?: string,
    public cpf?: string,
    public phone?: string,
    public token?: string,
    public photo?: string,
    public verify?: boolean,
    public admin?: boolean,
  ) { }

  collection(): string {
    return 'users';
  }
}
