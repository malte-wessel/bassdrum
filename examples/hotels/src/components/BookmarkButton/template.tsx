import cn from 'classnames';
import { h } from 'preact';
import { ComponentTemplate, Handler, MouseEvent } from 'bassdrum';
import Button from '../Button';
import styles from './styles.scss';
import { Bookmark } from '../../stores/bookmarks';

export interface State {
    handleToggle: Handler<MouseEvent>;
    bookmark: Bookmark;
    className?: string;
}

export const Template: ComponentTemplate<State> = ({
    className,
    handleToggle,
    bookmark,
}) => (
    <Button
        className={cn(styles.button, className)}
        onClick={handleToggle}
        title={
            bookmark
                ? `Bookmarked on ${new Date(
                      bookmark.createdAt,
                  ).toLocaleDateString()}`
                : 'Bookmark hotel'
        }
    >
        {bookmark ? '❤️' : '🖤'}
    </Button>
);
