import { createRef } from '../src/util/createRef';
describe('createRef', () => {
    it('should return a ref function and stream', () => {
        const el = document.createElement('div');
        const [ref, stream] = createRef<HTMLDivElement>();

        const emits: any = [];
        stream.subscribe(v => emits.push(v));

        ref(el);
        ref(null);
        expect(emits).toMatchSnapshot();
    });
});
