import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

inject('store');
@observer
class View extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        未完成:
        {store.unfinishedTodoCount}
        {store.todos.map(item => (
          <div>{item.title}</div>
        ))}
      </div>
    );
  }
}
export default View;
