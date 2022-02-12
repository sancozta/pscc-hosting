import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';

export class User extends FireCrudModelAbstract {
  public override uid?: string;
  public name?: string;
  public email?: string;
  public cpf?: string;
  public phone?: string;
  public token?: string;
  public photo?: string;
  public verify?: boolean;
  public admin?: boolean;

  static collection(): string {
    return 'users';
  }
}
