import { createComponent, ComponentFunction } from 'bassdrum';
import { Template, State } from './template';
import { Hotel } from '../../stores/hotels';

interface Props {
    hotel: Hotel;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
