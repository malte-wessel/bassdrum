import { h, render } from 'preact';
import TodoList from './components/TodoList';

const root = document.getElementById('root');
if (root) {
    render(<TodoList />, root);
}
