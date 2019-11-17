import { createComponent, ComponentFunction } from 'bassdrum';
import { Template, State } from './template';
import { Accommodation } from '../../stores/accommodations';

interface Props {
    accommodation: Accommodation;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
