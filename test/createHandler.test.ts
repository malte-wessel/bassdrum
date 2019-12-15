import { createHandler } from '../src/util/createHandler';

describe('createHandler', () => {
    it('should return a handler function and subject', () => {
        const [handler, subject] = createHandler<string>();
        subject.subscribe(v => expect(v).toBe('foo'));
        handler('foo');
    });
});
