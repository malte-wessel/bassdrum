import { h, JSX } from 'preact';
import { merge } from 'rxjs';
import { pluck, startWith, map, scan } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
    combine,
    createHandler,
    Handler,
} from 'bassdrum';

import { preventDefault } from '../operators/preventDefault';
import { filterNotNil } from '../operators/filter';
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

    const inputAction = inputEvent.pipe(
        pluck('currentTarget'),
        filterNotNil(),
        pluck('value'),
        map(createInputAction),
    );
    const addAction = addEvent.pipe(preventDefault(), map(createAddAction));
    const doneAction = doneEvent.pipe(map(createDoneAction));
    const removeAction = removeEvent.pipe(map(createRemoveAction));
    const actions = merge(inputAction, addAction, removeAction, doneAction);

    const state = actions.pipe(
        scan(reducer, initialState),
        startWith(initialState),
    );

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
