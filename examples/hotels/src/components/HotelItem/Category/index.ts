import { createComponent, ComponentFunction } from 'bassdrum';
import { Template, State } from './template';

const ComponentFn: ComponentFunction<State, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
