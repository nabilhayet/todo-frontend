export default function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id: id
    }
}