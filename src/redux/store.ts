import thunk, { ThunkAction } from 'redux-thunk';

import { Action, AnyAction, applyMiddleware, createStore } from 'redux';

import { rootReducer } from './reducers';

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);

// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
