declare global {
    interface Window {
        REDUX_DATA?: any;
   }
}

export const isServer = typeof window == 'undefined';

export function getInitialState() {
    let state = {};
    if (!isServer && window.REDUX_DATA) {
        state = window.REDUX_DATA;
    }
    return state;
}