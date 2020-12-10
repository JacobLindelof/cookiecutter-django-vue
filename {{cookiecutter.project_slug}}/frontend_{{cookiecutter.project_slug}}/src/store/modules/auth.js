import axios from 'axios'

// initial state
const state = () => ({
    token: localStorage.getItem('token'),
    status: '',
    user: null,
    endpoints: {
        getProfile: '/api/profile/',
        obtainToken: '/api/token/',
        refreshToken: '/api/token/refresh/',
        baseUrl: '/api/'
    }
})

// getters
const getters = {
    isAuthenticated: state => !!state.token,
    authenticationStatus: state => state.status
}

// mutations
const mutations = {
    authenticationRequest(state) {
        state.status = 'loading';
    },
    authenticationSuccess(state, token) {
        state.status = 'success'
        state.token = token;
    },
    authenticationError(state) {
        state.status = 'error'
        state.token = null;
    },
    authenticationLogout(state) {
        state.status = ''
        state.user = null;
        state.token = null;
    },
    setUser(state, user) {
        state.user = user
    },
}

// actions
const actions = {
    async getUserProfile({commit, state}) {
        return new Promise((resolve, reject) => {
            axios({ url: state.endpoints.getProfile, method: 'GET' })
            .then(resp => {
                commit('setUser', resp.data)
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    async authenticate({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            commit('authenticationRequest')
            axios({ url: state.endpoints.obtainToken, data: payload, method: 'POST' })
            .then(resp => {
                const token = resp.data.access
                const refresh = resp.data.refresh
                localStorage.setItem('token', token)
                localStorage.setItem('refresh', refresh)

                axios.defaults.headers.common['Authorization'] = "Bearer " + token

                commit('authenticationSuccess', token)
                resolve(resp)
            })
            .catch(err => {
                commit('authenticationError', err)
                localStorage.removeItem('token')
                localStorage.removeItem('refresh')
                reject(err)
            })
        })
    }, 
    async logout({commit}) {
        return new Promise((resolve) => {
            commit('authenticationLogout')
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')

            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}