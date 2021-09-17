export default function getTodos(todo) {
    return {
        type: 'GET_TODOS',
        todo: todo
    }
}