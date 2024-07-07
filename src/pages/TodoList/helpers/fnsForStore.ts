import { ITodo } from "../../../models/ITodo"

export const addTodoFunc = (todos: ITodo[], newTodo: ITodo) => {
    return [...todos, newTodo]
}
export const removeTodoFunc = (todos: ITodo[], removeTodo: ITodo) => {
    return todos.filter(todo => todo.id !== removeTodo.id)
}
export const updateTodoFunc = (todos: ITodo[], updateTodo: ITodo) => {
    return todos.map(todo => {
        if(updateTodo.id === todo.id){
            return updateTodo; 
        }
        return todo
    })
}