import { createComponent, ComponentFunction } from 'bassdrum';
import { Hotel } from '../../../stores/hotels';
import { Template, State } from './template';

interface Props {
    hotel: Hotel;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
