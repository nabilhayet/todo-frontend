export default function todosReducer(state = { todos: [] }, action) {
    let idx;
    switch (action.type) {
        case 'START_ADDING_TODOS':
            return { ...state, todos: [...state.todos] }
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.todo] };
        case "GET_TODOS":
            return { ...state, todos: action.todos };
        case "UPDATE_TODO":
            idx = state.todos.findIndex(todo => todo.id === action.todo.id);
            const newState = [...state.todos]
            newState.splice(idx, 1, action.todo);
            return { ...state, todos: newState }
        case "DELETE_TODO":
            idx = state.todos.findIndex(todo => todo.id === action.id);
            return { ...state, todos: [...state.todos.slice(0, idx), ...state.todos.slice(idx + 1)] };
        default:
            return state;
    }
}