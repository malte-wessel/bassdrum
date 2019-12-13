import { Subject, BehaviorSubject } from 'rxjs';
import omit from 'lodash/omit';
import { createLocalStorageStore } from '../../util/createLocalStorageStore';
import { Dictionary } from '../../types/util';
import { ofType } from '../../util/ofType';
import { map, withLatestFrom, pluck } from 'rxjs/operators';

export interface Bookmark {
    accommodationId: number;
    createdAt: string;
}

export interface BookmarksStoreState {
    byAccommodationId: Dictionary<Bookmark>;
}

interface BookmarksStoreAddAction {
    type: 'ADD';
    payload: number;
}

interface BookmarksStoreRemoveAction {
    type: 'REMOVE';
    payload: number;
}

export interface BookmarksStoreToggleAction {
    type: 'TOGGLE';
    payload: number;
}

type BookmarksStoreActions =
    | BookmarksStoreAddAction
    | BookmarksStoreRemoveAction
    | BookmarksStoreToggleAction;

const add = (accommodationId: number): BookmarksStoreAddAction => ({
    type: 'ADD',
    payload: accommodationId,
});

const remove = (accommodationId: number): BookmarksStoreRemoveAction => ({
    type: 'REMOVE',
    payload: accommodationId,
});

const toggle = (accommodationId: number): BookmarksStoreToggleAction => ({
    type: 'TOGGLE',
    payload: accommodationId,
});

const createBookmark = (accommodationId: number): Bookmark => ({
    accommodationId,
    createdAt: new Date().toISOString(),
});

const initialState = (): BookmarksStoreState => ({
    byAccommodationId: {},
});

const reducer = (state: BookmarksStoreState, action: BookmarksStoreActions) => {
    switch (action.type) {
        case 'ADD': {
            const accommodationId = action.payload;
            return {
                ...state,
                byAccommodationId: {
                    ...state.byAccommodationId,
                    [accommodationId]: createBookmark(accommodationId),
                },
            };
        }
        case 'REMOVE': {
            const accommodationId = action.payload;
            return {
                ...state,
                byAccommodationId: omit(
                    state.byAccommodationId,
                    accommodationId,
                ),
            };
        }
        default: {
            return state;
        }
    }
};

const actionCreators = {
    toggle,
};

const epic = (
    action: Subject<BookmarksStoreActions>,
    state: BehaviorSubject<BookmarksStoreState>,
) => {
    const byAccommodationId = state.pipe(pluck('byAccommodationId'));
    return action.pipe(
        ofType('TOGGLE'),
        pluck('payload'),
        withLatestFrom(byAccommodationId),
        map(([id, byId]) => (byId[id] ? remove(id) : add(id))),
    );
};

export const bookmarksStore = createLocalStorageStore(
    'bookmarks/v1',
    actionCreators,
    reducer,
    initialState(),
    epic,
);
