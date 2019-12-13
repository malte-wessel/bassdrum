import cn from 'classnames';
import { h, Ref } from 'preact';
import { ComponentTemplate } from 'bassdrum';

import { Hotel } from '../../../stores/hotels';
import BookmarkButton from '../../BookmarkButton';

import Image from './Image';
import Title from './Title';
import Category from './Category';
import styles from './styles.scss';

export interface State {
    hotel: Hotel;
    isVisible: boolean;
    rootRef: Ref<HTMLElement>;
}

export const Template: ComponentTemplate<State> = ({
    hotel,
    rootRef,
    isVisible,
}) => (
    <article
        ref={rootRef}
        className={cn(styles.container, isVisible && styles.isVisible)}
    >
        <div className={styles.left}>
            <Image isVisible={isVisible} url={hotel.image} />
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
                <Category category={hotel.category} type={hotel.type} />
            </div>
        </div>
    </article>
);
