import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';
import { Hotel } from '../../stores/hotels';
import Image from './Image';
import Title from './Title';
import Category from './Category';
import BookmarkButton from '../BookmarkButton';

export interface State {
    hotel: Hotel;
}

export const Template: ComponentTemplate<State> = ({ hotel }) => (
    <article className={styles.container}>
        <div className={styles.left}>
            <Image url={hotel.image} />
        </div>
        <div className={styles.right}>
            <div className={styles.headline}>
                <Title title={hotel.name} className={styles.title} />
                <BookmarkButton
                    hotelId={hotel.id}
                    className={styles.bookmarkButton}
                />
            </div>
            <div>
                <Category category={hotel.category} />
            </div>
        </div>
    </article>
);
