import { Attributes, IntersectionObserverHooks } from 'ng-lazyload-image';
import { debounceTime } from 'rxjs/operators';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
  getObservable(attributes: Attributes) {
    return super.getObservable(attributes).pipe(debounceTime(100))
  }
}
