export default function clearTodo() {
    return {
        type: 'CLEAR_TODOS',
        todos: []
    }
}