import { Observable, BehaviorSubject } from 'rxjs';

export const createLocalStorageStore = <T>(key: string, initialState: T) => {
    const read = () => {
        try {
            const record = localStorage.getItem(key);
            if (!record) return initialState;
            return JSON.parse(record) as T;
        } catch (e) {
            return initialState;
        }
    };

    const write = (data: T) => {
        try {
            const record = JSON.stringify(data);
            localStorage.setItem(key, record);
        } catch (error) {
            return;
        }
    };
    const subject = new BehaviorSubject(read());
    return (input: Observable<T>) => {
        input.subscribe(data => {
            write(data);
            subject.next(data);
        });
        return subject;
    };
};
