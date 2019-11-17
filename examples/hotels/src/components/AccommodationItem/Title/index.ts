import { createComponent, ComponentFunction } from 'bassdrum';
import { Template, State } from './template';

interface Props {
    title: string;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
