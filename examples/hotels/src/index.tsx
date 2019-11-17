import { h, render } from 'preact';
import App from './components/App';
import './index.scss';

const root = document.getElementById('root');
if (root) {
    render(<App />, root);
}
