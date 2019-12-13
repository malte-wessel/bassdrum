import { Subject, BehaviorSubject } from 'rxjs';
import omit from 'lodash/omit';
import { createLocalStorageStore } from '../../util/createLocalStorageStore';
import { Dictionary } from '../../types/util';
import { ofType } from '../../util/ofType';
import { map, withLatestFrom, pluck } from 'rxjs/operators';

export interface Bookmark {
    hotelId: number;
    createdAt: string;
}

export interface BookmarksStoreState {
    byHotelId: Dictionary<Bookmark>;
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

const add = (hotelId: number): BookmarksStoreAddAction => ({
    type: 'ADD',
    payload: hotelId,
});

const remove = (hotelId: number): BookmarksStoreRemoveAction => ({
    type: 'REMOVE',
    payload: hotelId,
});

const toggle = (hotelId: number): BookmarksStoreToggleAction => ({
    type: 'TOGGLE',
    payload: hotelId,
});

const createBookmark = (hotelId: number): Bookmark => ({
    hotelId,
    createdAt: new Date().toISOString(),
});

const initialState = (): BookmarksStoreState => ({
    byHotelId: {},
});

const reducer = (state: BookmarksStoreState, action: BookmarksStoreActions) => {
    switch (action.type) {
        case 'ADD': {
            const hotelId = action.payload;
            return {
                ...state,
                byHotelId: {
                    ...state.byHotelId,
                    [hotelId]: createBookmark(hotelId),
                },
            };
        }
        case 'REMOVE': {
            const hotelId = action.payload;
            return {
                ...state,
                byHotelId: omit(state.byHotelId, hotelId),
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
    const byHotelId = state.pipe(pluck('byHotelId'));
    return action.pipe(
        ofType('TOGGLE'),
        pluck('payload'),
        withLatestFrom(byHotelId),
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
