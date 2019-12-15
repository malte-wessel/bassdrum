import { combine } from '../src/util/combine';
import { BehaviorSubject, Observable } from 'rxjs';

const collect = (observable: Observable<any>) => {
    const emits: any[] = [];
    observable.subscribe((v: any) => emits.push(v));
    return emits;
};

describe('combine', () => {
    it('should combine multiple observables', () => {
        const a = new BehaviorSubject<any>({ foo: 'bar' });
        const b = new BehaviorSubject<any>({ foo: 'nom', nom: 'bar' });
        const c = new BehaviorSubject<any>({ qux: 'qax' });

        const stream = combine(a, b, c);
        const emits = collect(stream);

        b.next({ nom: 'bar2' });
        c.next({ nom: 'bar3' });

        expect(emits).toMatchSnapshot();
    });
    it('should combine multiple objects', () => {
        const stream = combine(
            { foo: 'bar' },
            { foo: 'nom', nom: 'bar' },
            { qux: 'qax' },
        );
        const emits = collect(stream);
        expect(emits).toMatchSnapshot();
    });
    it('should combine multiple objects with observables', () => {
        const foo = new BehaviorSubject('bar');
        const nom = new BehaviorSubject('nom');
        const qux = new BehaviorSubject('qax');

        const stream = combine({ foo }, { nom, qux });
        const emits = collect(stream);

        nom.next('nax');
        qux.next('qux');

        expect(emits).toMatchSnapshot();
    });

    it('should combine all different types', () => {
        const a = new BehaviorSubject<any>({ foo: 'bar' });
        const foo = new BehaviorSubject('bar');
        const nom = new BehaviorSubject('nom');
        const b = { foo, nom };
        const c = { buz: 'bax' };

        const stream = combine(a, b, c);
        const emits = collect(stream);

        a.next({ lup: 'bar3' });
        foo.next('bar2');

        expect(emits).toMatchSnapshot();
    });
});
