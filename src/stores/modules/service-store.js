import { SET_WATCH_SERVICE_FEEDBACK } from '../mutation-types';

export const serviceStore = {
    state: {
        watchServiceFeedback: false,
    },
    mutations: {
        [SET_WATCH_SERVICE_FEEDBACK] (state, value) {
            state.watchServiceFeedback = value;
        }
    },
    getters: {
        getWatchServiceFeedback: state => {
            return state.watchServiceFeedback;
        }
    }
}