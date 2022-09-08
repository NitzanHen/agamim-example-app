import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import { TodosView } from './components/TodosView';
import classes from './app.module.scss';

const App: Component = () => {
  return (
    <main class={classes.main}>
      <Routes>
        <Route path="/" component={TodosView} />
      </Routes>
    </main>
  );
};

export default App;
