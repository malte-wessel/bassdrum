import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';
import { Accommodation } from '../../stores/accommodations';
import Image from './Image';
import Title from './Title';

export interface State {
    accommodation: Accommodation;
}

export const Template: ComponentTemplate<State> = ({ accommodation }) => (
    <article className={styles.container}>
        <div className={styles.left}>
            <Image url={accommodation.image} />
        </div>
        <div className={styles.right}>
            <Title title={accommodation.name} />
        </div>
    </article>
);
