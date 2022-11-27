import axios from 'axios';
import { encrypt } from '../../lib/encryption.js';

export default {
    state() {
        return {
            testsName: [],
            test: {},
        };
    },
    getters: {
        getAllTestName(state) {
            return state.testsName;
        },
        getTestName(state) {
            return state.test.name ? state.test.name : '';
        },
        getTestQuestions(state) {
            return state.test.questions ? state.test.questions : [];
        },
    },
    mutations: {
        setTest(state, test) {
            state.test = test;
        },
        setTestsName(state, testsName) {
            state.testsName = testsName;
        },
    },
    actions: {
        async fetchTestsName({ commit }) {
            try {
                const testsName = await axios({
                    url: `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_SERVER_PORT}/api/tests`,
                    method: 'get',
                });
                if (testsName.data) {
                    commit('setTestsName', testsName.data);
                }
            } catch (e) {
                if (e && e.message) {
                    throw { message: e.message };
                } else {
                    throw { message: 'Error, try again!' };
                }
            }
        },
        async fetchTest({ commit }, name) {
            try {
                const searchName = encrypt(name);
                const test = await axios({
                    url: `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_SERVER_PORT}/api/tests/${searchName}`,
                    method: 'get',
                });
                if (test.data) {
                    commit('setTest', test.data);
                }
            } catch (e) {
                if (e && e.message) {
                    throw { message: e.message };
                } else {
                    throw { message: 'Error, try again!' };
                }
            }
        },
    },
};
