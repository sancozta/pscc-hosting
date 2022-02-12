import { Attributes, IntersectionObserverHooks } from 'ng-lazyload-image';
import { debounceTime } from 'rxjs/operators';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
  override getObservable(attributes: Attributes) {
    return super.getObservable(attributes).pipe(debounceTime(100))
  }
}
