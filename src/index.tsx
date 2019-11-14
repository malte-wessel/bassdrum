import { h, Ref } from 'preact';
import { map, pluck, tap } from 'rxjs/operators';
import {
    ComponentFunction,
    ComponentTemplate,
    createComponent
} from './component';
import { combine } from './util/combine';
import { createHandler } from './util/createHandler';
import { createRef } from './util/createRef';
import { MouseEventHandler, MouseEvent } from './types/events';

interface ItemProps {
    bar: string;
}

interface ItemState {
    bar: string;
    nom: string;
    foo: number;
    ref: Ref<HTMLDivElement>;
    handleClick: MouseEventHandler<HTMLDivElement>;
}

const ItemFn: ComponentFunction<ItemProps, ItemState> = ({
    props,
    subscribe
}) => {
    const [ref, elementStream] = createRef<HTMLDivElement>();
    const [handleClick, clickStream] = createHandler<
        MouseEvent<HTMLDivElement>
    >();

    subscribe(
        elementStream.pipe(
            tap(el => {
                el.getBoundingClientRect();
            })
        )
    );

    subscribe(clickStream.pipe(tap(e => e.currentTarget.ATTRIBUTE_NODE)));

    const nom = props.pipe(
        pluck('bar'),
        map(val => `${val}!`)
    );
    return combine(props, {
        foo: 1,
        handleClick,
        nom,
        ref
    });
};

const ItemTemplate: ComponentTemplate<ItemState> = ({
    bar,
    handleClick,
    ref
}) => {
    return (
        <div onClick={handleClick} ref={ref}>
            {bar}
        </div>
    );
};

export const Item = createComponent(ItemFn, ItemTemplate);
