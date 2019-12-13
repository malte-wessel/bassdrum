import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';

import styles from './styles.scss';

export interface State {
    url: string;
    showImage: boolean;
}

export const Template: ComponentTemplate<State> = ({ url, showImage }) => (
    <div className={styles.container}>
        {showImage && <img className={styles.image} src={url} />}
    </div>
);
