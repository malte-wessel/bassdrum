import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';
import { Accommodation } from '../../stores/accommodations';
import Image from './Image';
import Title from './Title';
import Category from './Category';
import BookmarkButton from '../BookmarkButton';

export interface State {
    accommodation: Accommodation;
}

export const Template: ComponentTemplate<State> = ({ accommodation }) => (
    <article className={styles.container}>
        <div className={styles.left}>
            <Image url={accommodation.image} />
        </div>
        <div className={styles.right}>
            <div className={styles.headline}>
                <Title title={accommodation.name} className={styles.title} />
                <BookmarkButton
                    accommodationId={accommodation.id}
                    className={styles.bookmarkButton}
                />
            </div>
            <div className={styles.subline}>
                <Category category={accommodation.category} />
            </div>
        </div>
    </article>
);
