export default function deleteTodo(todo) {
    return {
        type: 'ADD_TODO',
        todo: todo
    }
}