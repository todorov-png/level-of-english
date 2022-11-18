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
        // getTest(state) {
        //     return state.test;
        // },
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
                    url: `http://127.0.0.1:3000/api/tests`,
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
                    url: `http://127.0.0.1:3000/api/tests/${searchName}`,
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
