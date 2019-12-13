import { createComponent, ComponentFunction, Handler } from 'bassdrum';
import { Template, State } from './template';

interface Props {
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    disabled: boolean;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
