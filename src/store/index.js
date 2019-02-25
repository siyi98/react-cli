// store出口
import { observable, computed } from 'mobx';

class Todo {
    id = Math.random();

    @observable title;

    @observable isfinished = false;

    constructor(title) {
      this.title = title;
    }
}


class TodoList {
    @observable todos = [];

    @computed get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
    }
}
const store = new TodoList();
store.todos.push(new Todo('Learn mobx'));
store.todos.push(new Todo('Learn mobx'));
store.todos[0].isfinished = true;

export default store;
