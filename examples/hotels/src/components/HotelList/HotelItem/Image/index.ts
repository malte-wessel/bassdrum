import { createComponent, ComponentFunction, combine } from 'bassdrum';
import { Template, State } from './template';
import { pluck, filter, startWith } from 'rxjs/operators';

interface Props {
    url: string;
    isVisible: boolean;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => {
    const isVisible = props.pipe(pluck('isVisible'));
    const showImage = isVisible.pipe(
        filter(isVisible => isVisible),
        startWith(false),
    );
    return combine(props, {
        showImage,
    });
};

export default createComponent(ComponentFn, Template);
