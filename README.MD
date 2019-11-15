# basedrum

A thin wrapper around preact that let's you create reactive type safe components with rxjs.

Prior art: [melody-streams](https://github.com/trivago/melody/tree/master/packages/melody-streams)

## Example

```tsx
import { map, startWith, scan } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
    combine,
    createRef,
    createHandler,
    MouseEventHandler,
    MouseEvent,
    Ref,
} from 'basedrum';

interface Props {
    name: string;
}

interface State {
    name: string;
    ref: Ref<HTMLDivElement>;
    width: number;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    toggle: boolean;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => {
    const [ref, el] = createRef<HTMLDivElement>();
    const [handleClick, clicks] = createHandler<
        MouseEvent<HTMLButtonElement>
    >();

    const toggle = clicks.pipe(
        scan(value => !value, true),
        startWith(true),
    );

    const width = el.pipe(
        map(el => el.offsetWidth),
        startWith(0),
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
        <p>Hello {name}, welcome to basedrum!</p>
        <p>This element is {width}px wide.</p>
        <button onClick={handleClick}>Toggle width</button>
    </div>
);

const Component = createComponent(ComponentFn, Template);
```
