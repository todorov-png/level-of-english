import { createStore } from 'vuex';
import user from './modules/user';
import test from './modules/test';

export default createStore({
    modules: {
        user,
        test,
    },
});
