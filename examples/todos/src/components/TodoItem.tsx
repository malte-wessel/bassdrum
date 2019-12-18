import { h } from 'preact';
import { pluck } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
    combine,
    Handler,
} from 'bassdrum';

import { bindHandler } from '../util/bindHandler';
import { Todo } from './reducer';

interface TodoItemProps {
    todo: Todo;
    handleDone: Handler<number>;
    handleRemove: Handler<number>;
}

interface TodoItemState {
    todo: Todo;
    handleClickDone: Handler<MouseEvent>;
    handleClickRemove: Handler<MouseEvent>;
}

const TodoItemFn: ComponentFunction<TodoItemProps, TodoItemState> = ({
    props,
}) => {
    const id = props.pipe(pluck('todo', 'id'));
    const handleDone = props.pipe(pluck('handleDone'));
    const handleRemove = props.pipe(pluck('handleRemove'));
    const handleClickDone = bindHandler(handleDone, id);
    const handleClickRemove = bindHandler(handleRemove, id);
    return combine(props, {
        handleClickDone,
        handleClickRemove,
    });
};

const TodoItemTemplate: ComponentTemplate<TodoItemState> = ({
    todo,
    handleClickDone,
    handleClickRemove,
}) => (
    <div style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        #{todo.id} {todo.text}{' '}
        <button type="button" onClick={handleClickDone}>
            {todo.done ? 'Todo' : 'Done'}
        </button>{' '}
        <button type="button" onClick={handleClickRemove}>
            Remove
        </button>
    </div>
);

const TodoItem = createComponent(TodoItemFn, TodoItemTemplate);

export default TodoItem;
