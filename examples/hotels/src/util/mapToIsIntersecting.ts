import { of, Observable, Observer, ObservableInput } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const mapToIsIntersecting = <E extends HTMLElement>(
    options?: IntersectionObserverInit,
) =>
    switchMap<E | null, ObservableInput<boolean>>(el =>
        el
            ? Observable.create((observer: Observer<boolean>) => {
                  const intersectionOptions = {
                      threshold: 1.0,
                      ...options,
                  };
                  const intersectionObserver = new IntersectionObserver(
                      entries => observer.next(entries[0].isIntersecting),
                      intersectionOptions,
                  );
                  console.log('observe', el);
                  intersectionObserver.observe(el);
                  return () => intersectionObserver.unobserve(el);
              })
            : of(false),
    );
