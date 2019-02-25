import React, { Component } from 'react';
import store from './store';
import View from './components/TodoView';
import styles from './App.less';

class App extends Component {
  render() {
    return <div className={styles['content-inner']}>
      <h1 className="fontStyle">Hello---React-Cli</h1>
      <View store={store}></View>
    </div>;
  }
}

export default App;
