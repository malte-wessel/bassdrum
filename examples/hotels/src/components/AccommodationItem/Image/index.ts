import { createComponent, ComponentFunction } from 'bassdrum';
import { Template, State } from './template';

interface Props {
    url: string;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
