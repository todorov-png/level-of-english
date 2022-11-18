import axios from 'axios';
import { encrypt } from '../../lib/encryption.js';

export default {
    state() {
        return {
            user: {},
        };
    },
    getters: {
        getUserToken(state) {
            return state.user ? state.user.token : null;
        },
        getUser(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        async createUser({ commit }, user) {
            try {
                const token = encrypt(user.email);
                const foundUser = await axios({
                    url: `http://127.0.0.1:3000/api/users/${token}`,
                    method: 'get',
                });
                if (foundUser.data) throw { message: 'User with this email is already registered!' };
                await axios({
                    url: 'http://127.0.0.1:3000/api/users/create',
                    method: 'post',
                    data: {
                        data: encrypt({
                            token,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                        }),
                    },
                });
                commit('setUser', {
                    token,
                    name: user.name,
                    email: user.email,
                });
                localStorage.setItem('userToken', token);
            } catch (e) {
                if (e && e.message) {
                    throw { message: e.message };
                } else {
                    throw { message: 'Error, try again!' };
                }
            }
        },
        async authUser({ commit }, data) {
            try {
                const user = await axios({
                    url: 'http://127.0.0.1:3000/api/users/auth',
                    method: 'post',
                    data: { data: encrypt(data) },
                });
                if (user.data) {
                    commit('setUser', user.data);
                    localStorage.setItem('userToken', user.data.token);
                } else {
                    throw { message: 'Wrong login or password!' };
                }
            } catch (e) {
                if (e && e.message) {
                    throw { message: e.message };
                } else {
                    throw { message: 'Error, try again!' };
                }
            }
        },
        async checkAuth({ getters, commit }) {
            if (getters.getUserToken) return true;
            const userToken = localStorage.getItem('userToken');
            if (!userToken) return false;
            try {
                const user = await axios({
                    url: `http://127.0.0.1:3000/api/users/${userToken}`,
                    method: 'get',
                });
                commit('setUser', user.data);
            } catch {
                return false;
            }
        },
        async updateUser({ commit }, user) {
            try {
                await axios({
                    url: `http://127.0.0.1:3000/api/users/${user.token}`,
                    method: 'put',
                    data: { data: encrypt(user) },
                });
                commit('setUser', user);
            } catch (e) {
                throw { message: 'Error, try again!' };
            }
        },
    },
};
