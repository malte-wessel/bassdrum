# bassdrum

bassdrum is a thin wrapper around preact that let's you create reactive type safe components with rxjs.

Prior art: [melody-streams](https://github.com/trivago/melody/tree/master/packages/melody-streams)

## Installation

```bash
# bassdrum has preact and rxjs as peer dependencies
yarn add bassdrum preact rxjs
```

Check out the `/examples` directory on how to set up typescript properly

## API

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
    foo: string;
}

interface State {
    foo: string;
}

// The component function is the heart of your component. The function maps the
// received `props` stream to a `state` stream which values you use in your template
const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

// Use the state returned from your component function in your template
const Template: ComponentTemplate<State> = state => <div>{state.foo}</div>;

// Create the component
const Component = createComponent(ComponentFn, Template);

// Render the component as you would do it with plain preact
const root = document.getElementById('root');
if (root) {
    render(<Component foo="bar" />, root);
}
```

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
