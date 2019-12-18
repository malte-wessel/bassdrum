import { tap } from 'rxjs/operators';

export const preventDefault = () =>
    tap((event: Event) => event.preventDefault());
