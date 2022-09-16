import { Component, Show } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import { TodosView } from './components/TodosView';
import { LoginView } from './components/LoginView';
import { GlobalLoader } from './components/GlobalLoader';

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={TodosView} />
        <Route path="/login" component={LoginView} />
      </Routes>
    </>
  );
};

export default App;
