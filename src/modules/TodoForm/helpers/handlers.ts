import { ITodo } from "../../../models/ITodo";
import { closeModal } from "../../../components/Modal/helpers/closeModal";
import { ITodoStore } from "../store/todoStore";

interface IArgSaveFn{
    todoStore: ITodoStore,
    onUpdateTodoServer: (todo: ITodo) => Promise<ITodo>,
    onSetNoticeMessage: (msg: string) => void,
    onSetShowNotice: (bool: boolean) => void,
    onAddTodoServer: (todo: ITodo) => Promise<ITodo>,
    onSetShowTodoForm: (bool: boolean) => void,
    onSetIsEditing: (bool: boolean) => void,
    onSetEmptyTodo: () => void
}
interface IArgRemoveFn{
    todoStore: ITodoStore,
    onRemoveTodoServer: (todo: ITodo) => Promise<ITodo>,
    onSetNoticeMessage: (msg: string) => void,
    onSetShowNotice: (bool: boolean) => void,
    onAddTodoServer: (todo: ITodo) => Promise<ITodo>,
    onSetShowTodoForm: (bool: boolean) => void,
    onSetIsEditing: (bool: boolean) => void,
    onSetEmptyTodo: () => void
}

export const saveTodo = ({todoStore, onUpdateTodoServer, onSetNoticeMessage, onSetShowNotice, onAddTodoServer, onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo}: IArgSaveFn) => {
  if (todoStore.isEditing) {
    // onUpdateTodo(todoStore.todo)
    // onSetNoticeMessage("Дело успешно отредактировано")
    // onSetShowNotice(true)
    onUpdateTodoServer(todoStore.todo)
      .then(() => {
        onSetNoticeMessage("Дело успешно отредактировано");
      })
      .catch(() => {
        onSetNoticeMessage("При редактировании произошла ошибка");
      })
      .finally(() => onSetShowNotice(true));
  } else {
    const newTodo: ITodo = {
      id: String(Date.now()),
      name: todoStore.todo.name,
      description: todoStore.todo.description,
      event: todoStore.todo.event,
      status: todoStore.todo.status,
    };
    // onAddTodo(newTodo);
    // onSetNoticeMessage("Дело успешно создано")
    // onSetShowNotice(true)
    onAddTodoServer(newTodo)
      .then(() => {
        onSetNoticeMessage("Дело успешно создано");
      })
      .catch(() => {
        onSetNoticeMessage("При создании произошла ошибка");
      })
      .finally(() => onSetShowNotice(true));
  }
  closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo);
};

export const handlerRemoveTodo = ({todoStore, onRemoveTodoServer, onSetNoticeMessage, onSetShowNotice, onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo} : IArgRemoveFn) => {
  // onSetNoticeMessage("Дело успешно удалено")
  // onSetShowNotice(true)
  // onRemoveTodo(todoStore.todo)
  onRemoveTodoServer(todoStore.todo)
    .then(() => {
      onSetNoticeMessage("Дело успешно удалено");
    })
    .catch(() => {
      onSetNoticeMessage("При удалении произошла ошибка");
    })
    .finally(() => onSetShowNotice(true));
  closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo);
};
