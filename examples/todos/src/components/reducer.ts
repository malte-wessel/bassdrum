export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

let id = 0;
const createTodo = (text: string): Todo => ({
    id: ++id,
    text: text,
    done: false,
});

export interface InputAction {
    type: 'INPUT';
    payload: string;
}

export const createInputAction = (text: string): InputAction => ({
    type: 'INPUT',
    payload: text,
});

export interface AddAction {
    type: 'ADD';
}

export const createAddAction = (): AddAction => ({
    type: 'ADD',
});

export interface DoneAction {
    type: 'DONE';
    payload: number;
}

export const createDoneAction = (id: number): DoneAction => ({
    type: 'DONE',
    payload: id,
});

export interface RemoveAction {
    type: 'REMOVE';
    payload: number;
}

export const createRemoveAction = (id: number): RemoveAction => ({
    type: 'REMOVE',
    payload: id,
});

type Actions = InputAction | AddAction | DoneAction | RemoveAction;

export interface TodosState {
    value: string;
    todos: Todo[];
}

export const initialState: TodosState = {
    value: '',
    todos: [],
};

export const reducer = (state: TodosState, action: Actions) => {
    switch (action.type) {
        case 'INPUT': {
            return {
                ...state,
                value: action.payload,
            };
        }
        case 'ADD': {
            if (!state.value) return state;
            return {
                ...state,
                value: '',
                todos: state.todos.concat(createTodo(state.value)),
            };
        }
        case 'DONE': {
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, done: !todo.done }
                        : todo,
                ),
            };
        }
        case 'REMOVE': {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        }
        default: {
            return state;
        }
    }
};
