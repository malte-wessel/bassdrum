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
        map(([el]) => el.offsetWidth),
        distinctUntilChanged(),
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
