import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history';
import { isServer, getInitialState } from '../util/server';
import { Request } from 'express';

export interface AppState {
    router: RouterState;
};

export function initStore(req?: Request) {
    const history = isServer ? createMemoryHistory({
        initialEntries: [req.url]
    }) : createBrowserHistory();
    const rootReducer = combineReducers<AppState>({
        router: connectRouter(history)
    });
    const composeEnhancers = composeWithDevTools(applyMiddleware(
        routerMiddleware(history)
    ));
    const store = createStore(rootReducer, getInitialState(), composeEnhancers);

    return {
        history,
        store
    };
}