import { h, JSX } from 'preact';
import { merge } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
    combine,
    createHandler,
    Handler,
} from 'bassdrum';

import { createState } from '../util/createState';
import { preventDefault } from '../util/preventDefault';
import { filterNotNil } from '../util/filter';
import {
    initialState,
    reducer,
    createInputAction,
    createAddAction,
    createRemoveAction,
    createDoneAction,
    Todo,
} from './reducer';
import TodoItem from './TodoItem';

type InputChangeEvent = JSX.TargetedEvent<HTMLInputElement>;

interface TodoListState {
    todos: Todo[];
    value: string;
    handleInputChange: Handler<InputChangeEvent>;
    handleAdd: Handler<Event>;
    handleDone: Handler<number>;
    handleRemove: Handler<number>;
}

const TodoListFn: ComponentFunction<{}, TodoListState> = () => {
    const [handleAdd, addEvent] = createHandler<Event>();
    const [handleDone, doneEvent] = createHandler<number>();
    const [handleRemove, removeEvent] = createHandler<number>();
    const [handleInputChange, inputEvent] = createHandler<InputChangeEvent>();

    const input = inputEvent.pipe(
        pluck('currentTarget'),
        filterNotNil(),
        pluck('value'),
    );

    const add = addEvent.pipe(preventDefault());

    const inputAction = input.pipe(map(createInputAction));
    const addAction = add.pipe(map(createAddAction));
    const doneAction = doneEvent.pipe(map(createDoneAction));
    const removeAction = removeEvent.pipe(map(createRemoveAction));
    const actions = merge(inputAction, addAction, removeAction, doneAction);

    const state = createState(reducer, initialState, actions);

    return combine(state, {
        handleInputChange,
        handleAdd,
        handleDone,
        handleRemove,
    });
};

const TodoListTemplate: ComponentTemplate<TodoListState> = ({
    todos,
    value,
    handleInputChange,
    handleAdd,
    handleDone,
    handleRemove,
}) => (
    <main>
        <form onSubmit={handleAdd}>
            <input type="text" value={value} onInput={handleInputChange} />
            <button type="submit">Add Todo</button>
        </form>
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDone={handleDone}
                    handleRemove={handleRemove}
                >
                    {todo.text}
                </TodoItem>
            ))}
        </ul>
    </main>
);

const TodoList = createComponent(TodoListFn, TodoListTemplate);

export default TodoList;
