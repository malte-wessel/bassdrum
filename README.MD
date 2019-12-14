# 🥁 bassdrum

bassdrum is a thin wrapper around `preact` that let's you create reactive type safe components with `rxjs`.

Prior art: [melody-streams](https://github.com/trivago/melody/tree/master/packages/melody-streams)

## The gist

With bassdrum you create components by transforming `props` to `state` with `rxjs` and render them with `preact`.

```tsx
interface Props {
    items: Item[];
}

interface State {
    items: Item[];
    count: number;
    itemsPerPage: number;
}

const AppFn: ComponentFunction<Props, State> = ({ props }) => {
    const items = props.pipe(pluck('items'));
    const count = items.pipe(map(items => items.length));
    return combine(props, { count, itemsPerPage: 20 });
};

const AppTemplate: ComponentTemplate<State> = ({
    items,
    count,
    itemsPerPage,
}) => (
    <section>
        <p>We got {count} items for you!</p>
        <ItemList items={items} itemsPerPage={itemsPerPage} />
    </section>
);

const App = createComponent(AppFn, AppTemplate);
```

## Installation

```bash
# bassdrum has preact and rxjs as peer dependencies
yarn add bassdrum preact rxjs
```

Check out the `/examples` directory on how to set up typescript properly

## Guide

bassdrum has a minimal api surface. It consists of four functions: `createComponent`, `combine`, `createHandler` & `createRef`.

To create a new bassdrum component use `createComponent`. It expects a `ComponentFunction<Props, State>` and a `ComponentTemplate<State>`.

```tsx
import { h, render } from 'preact';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
} from 'bassdrum';

interface Props {
    name: string;
}

interface State {
    name: string;
}

// The component function is the heart of your component. The function maps the
// received `props` stream to a `state` stream.
const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

// Use the state returned from your component function stream in your template
const Template: ComponentTemplate<State> = state => (
    <div>Hello, {state.name}</div>
);

// Create the component
const Component = createComponent(ComponentFn, Template);

// Render the component as you would do with preact
const root = document.getElementById('root');
if (root) {
    render(<Component name="Baby yoda" />, root);
}
```

### The component function

Let's have a closer look at the component function. This function is called once your component is about to be created. It receives a `props` stream that emits whenever the props change (`componentWillReceiveProps`), an `updates` stream that emits whenever all changes have been flushed to the DOM (`componentDidMount` & `componentDidUpdate`) and a `subscribe` function that you can use to subscribe to streams. The component takes care of unsubscribing from those streams when the component is unmounted.

#### Transforming data

To transform the data that you receive from the `props` stream, you can use the transformation operators from `rxjs`. In the following example we use the `pluck` operator to get a stream of `items` from the `props` and the `map` operator to map the `items` to its length.

```tsx
interface Props {
    items: Item[];
}

interface State {
    items: Item[];
    count: number;
    itemsPerPage: number;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => {
    const items = props.pipe(pluck('items'));
    const count = items.pipe(map(items => items.length));
    return combine(props, { count, itemsPerPage: 20 });
};
```

To combine the `props` stream and your transformed streams use the bassdrum `combine` method. This method can merge data from streams and plain objects that hold primitive values or streams. In the example above `combine` will emit an object that looks like this:

```js
{
    items: [{...}],
    count: 43,
    itemsPerpage: 20
}
```

`combine` emits whenever one of its streams emits. We do a `shallowEqual` compare and only rerender the component if at least one of the values has changed. The component automatically subscribes and unsubscibes from the stream that you return from the component function.

If you derive complex data make sure to use the `rxjs` operator `distinctUntilChanged` to avoid unnecessary rerenders, like in the following example:

```tsx
const ComponentFn: ComponentFunction<Props, State> = ({ props }) => {
    const items = props.pipe(
        // `items` will emit whenever `props` emit,
        // even though `items` haven't changed
        pluck('items'),
        // This operator will do a strict equal check
        // and only emits if the items have really changed
        distinctUntilChanged(),
    );
    const groupedByRating = items.pipe(map(groupBy(item => item.rating)));
    return combine(props, { groupedByRating });
};
```

#### Lifecycle events

To deal with lifecycle events in bassdrum all you need is the `updates` stream. Look at the following example

```tsx
const log = value => tap(() => console.log(value));

const ComponentFn: ComponentFunction<Props, State> = ({
    props,
    updates,
    subscribe,
}) => {
    // the first value emitted by `updates` signals the did mount event
    const mounted = updates.pipe(first());

    // skip the mounted event if you only want updates
    const updated = updates.pipe(skip(1));

    // when the component will unmount, the `updates` stream completes
    const unmounted = updates.pipe(last());

    subscribe(mounted.pipe(log('component did mount')));
    subscribe(updated.pipe(log('component did update')));
    subscribe(unmounted.pipe(log('component will unmount')));

    return props;
};
```

Alright, let's have a look what's happening in this example. We use the `updates` stream to get notified about certain lifecycle events. The `updates` stream emits the current `props` whenever `componenDidMount` or `componentDidUpdate` is called. When the component is about to get unmounted, the `updates` stream completes. We can use the `rxjs` filtering operators to only react to certain events.

The first time `updates` emits the component is mounted. By using the `first` operator we will get a stream that only emits once the component is mounted and attached to the DOM. If you want a stream that only emits when the component has been updated, skip the first emit by using the `skip` operator. To deal with cleaning up use the `last` operator that returns a stream that only emits once the `updates` stream completes.

Let's say you want to notify a parent component about updates of your component. The `updates` stream emits the current value of `props`. Use the `tap` operator to hook into update events and use the data and callbacks passed to your component right there:

```tsx
const ComponentFn: ComponentFunction<Props, State> = ({
    props,
    updates,
    subscribe,
}) => {
    const updated = updates.pipe(
        tap(props => {
            const { handleUpdated, id } = props;
            handleUpdated(id);
        }),
    );
    subscribe(updated);
    return props;
};
```

#### Subscriptions

In the examples above we were using the `subscribe` function that is passed to your component function. Why is that? The streams that we are creating and not returning or passing to `combine` basically do nothing until you subscribe to them. In `rxjs` you would subscribe to a stream by calling it's `subscribe` method. This method returns an `unsubscribe` function that you need to call once you don't need your stream anymore. bassdrum provides you this util function that takes care of managing those subscriptions, so you don't need to deal with it. You can use this function e.g. when you are dealing with side effects that do not result in data that you use in your template.

### Working with handlers

Handlers in bassdrum work just like in `preact`. You create a function that you pass to the DOM or a child component. The way how you create them is different though. Since in bassdrum everything is a `rxjs` stream you want a stream of events when your handler is called. For this purpose we use `createHandler`.

The API of `createHandler` is inspired by react hooks. `createHandler` returns a handler function and an `rxjs` stream that emits whenever the handler is called. This way you can easily transform your event stream to data like in the following example.

```tsx
import {
    combine,
    createHandler,
    ComponentFunction,
    ComponentTemplate,
    Handler,
    MouseEvent,
} from 'bassdrum';

interface Props {}

interface State {
    handleClick: Handler<MouseEvent>;
    counter: number;
}

const ComponentFn: ComponentFunction<Props, State> = ({ updates }) => {
    const [handleClick, clicks] = createHandler<MouseEvent>();

    const counter = clicks.pipe(
        scan(value => value + 1, 0),
        startWith(0),
    );

    return combine({
        handleClick,
        counter,
    });
};

const Template: ComponentTemplate<State> = ({ handleClick, counter }) => (
    <section>
        <p>Your pressed this button {counter} times.</p>
        <button onClick={handleClick}>Increase counter</button>
    </section>
);
```

When the user presses the button the `clicks` stream emits a click `event`. We use this information to increase the counter. The `counter` stream is derived from those clicks. It starts with a `0` and increases everytime it receives an event.

Why do we need to use the `startsWith` operator here? bassdrum expects the stream you return from the component function to immediately emit once your component is created. `combine` won't emit until every input stream has emitted. At the time the component is created `clicks` has never emitted. Thus we need `startWith` to immediately emit on component creation time.

### Working with refs

Similar to `createHandler`, `createRef` returns a `Ref` function that you pass to your template and a stream that emits once the respective element is created.

```tsx
const ComponentFn: ComponentFunction<Props, State> = ({ props, updates }) => {
    const [ref, el] = createRef<HTMLDivElement>();

    subscribe(
        el.pipe(tap(el => console.log('Look ma, this is an element', el))),
    );

    return combine(props, {
        ref,
    });
};
```

When using `refs` there are a few things to keep in mind. The `el` stream returned from `createRef` emits `null` on component creation, since at that point we do not have an element. Once your element is created by `preact` it will emit the element instance. In the example above you would see the following logs:

```
Look ma, this is an element null
Look ma, this is an element [Element]
```

When the component gets unmounted you will see another `Look ma, this is an element null` log message. This is because the element is removed from the DOM and preact calls the handler with `null`. Now it's up to you to do some clean up logic.

Also keep in mind that `el` emits at the time the DOM element is created. This happens even before the component is considered to be mounted. That's why most of the time you want to combine it with the `updates` stream like in the following example.

```tsx
const ComponentFn: ComponentFunction<Props, State> = ({ props, updates }) => {
    const [ref, el] = createRef<HTMLDivElement>();

    const width = combineLatest(el, updates).pipe(
        map(([el]) => (el ? el.offsetWidth : 0)),
        startWith(0),
    );

    return combine(props, {
        ref,
        width,
    });
};
```

`combineLatest(el, updates)` will emit once both `el` and `updates` have emitted. At that time your component is mounted and you can interact with your `el`, e.g. gathering data like the `offsetWith`. Keep in mind to use `startWith(0)` for your inital emit.

## Advanced example

```tsx
import { h, Ref, render } from 'preact';
import { combineLatest } from 'rxjs';
import { map, startWith, scan, distinctUntilChanged } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
    combine,
    createRef,
    createHandler,
    Handler,
    MouseEvent,
} from 'bassdrum';

interface Props {
    name: string;
}

interface State {
    name: string;
    ref: Ref<HTMLDivElement>;
    width: number;
    handleClick: Handler<MouseEvent<HTMLButtonElement>>;
    toggle: boolean;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props, updates }) => {
    const [ref, el] = createRef<HTMLDivElement>();
    const [handleClick, clicks] = createHandler<
        MouseEvent<HTMLButtonElement>
    >();

    const toggle = clicks.pipe(
        scan(value => !value, true),
        startWith(true),
    );

    const width = combineLatest(el, updates).pipe(
        map(([el]) => (el ? el.offsetWidth : 0)),
        startWith(0),
        distinctUntilChanged(),
    );

    return combine(props, {
        width,
        ref,
        handleClick,
        toggle,
    });
};

const Template: ComponentTemplate<State> = ({
    name,
    width,
    ref,
    toggle,
    handleClick,
}) => (
    <div ref={ref} style={{ width: toggle ? '100%' : '50%' }}>
        <p>Hello {name}, welcome to bassdrum!</p>
        <p>This element is {width}px wide.</p>
        <button onClick={handleClick}>Toggle width</button>
    </div>
);

const Component = createComponent(ComponentFn, Template);

const root = document.getElementById('root');
if (root) {
    render(<Component name="Malte" />, root);
}
```
