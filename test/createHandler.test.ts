import { createHandler } from '../src/util/createHandler';

describe('createHandler', () => {
    it('should return a handler function and stream', () => {
        const [handler, stream] = createHandler<string>();
        stream.subscribe(v => expect(v).toBe('foo'));
        handler('foo');
    });
});
