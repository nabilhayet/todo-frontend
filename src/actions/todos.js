export default function addTodo(todo) {
    return {
        type: 'ADD_TODO',
        todo: todo
    }
}