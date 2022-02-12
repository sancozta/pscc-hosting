import { FireCrudModelAbstract } from '../abstracts/fire-crud-model.abstract';

export class Testimonial extends FireCrudModelAbstract {
  public override uid?: string;
  public description?: string;

  static collection(): string {
    return 'testimonials';
  }
}
