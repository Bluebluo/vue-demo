import {
  login
} from '@/api/user'
import {
  setUser,
  getUser,
  clearUser
} from '@/libs/util'
import {
  rejects
} from 'assert';
import { stat } from 'fs';

const cookieUser = getUser()

export default {
  state: {
    userName: cookieUser.username,
    token: cookieUser.token,
    userId: cookieUser.userId,
    access: cookieUser.access,
    avatorImgPath: cookieUser.avatorImgPath
  },
  mutations: {
    setUserId(state, userId){
        state.id = userId;
    },
    setUserName(state, username){
        state.username = username
    },
    setUserToken(state, token){
        state.token = token
    },
    setUserAccess(state, access){
        state.access = access.map( a => {
            return a.toLowerCase()
        })
    },
    setUserAvatorImgPath(state, avatorImgPath){
        state.avatorImgPath = avatorImgPath
    },
    setUser(state, data){
        const user = {
            username: data.username,
            userId: data.username,
            token: data.token,
            access: data.roles.map(a => a.toLowerCase()),
            avatorImgPath: ''
        }
        state.userId = user.userId
        state.username = user.username
        state.avatorImgPath = user.avatorImgPath
        state.access = user.access
        state.token = user.token
        setUser(user)
    },
    clearUser(state){
        clearUser()
        state.userId = ''
        state.username = ''
        state.avatorImgPath = ''
        state.access = []
        state.token = null
    }
  },
  actions: {
    handleLogin({
      commit
    }, {
      username,
      password,
      validateCode
    }) {
      username = username.trim()
      return new Promise((reslove, reject) => {
        login({
          username: username,
          password: password,
          validateCode: validateCode
        }).then(res => {
          const data = res.data
          data.username = username
          commit('setUser', data)
          reslove()
        }).catch(err => {
          if (err.status === 401) {
            reject(401)
          } else {
            reject(err)
          }
        })
      })
    },
    handleLogout({ state, commit}){
        return new Promise((reslove, reject) => {
            commit('setUserToken', null)
            commit('setUserAccess', [])
            clearUser()
            reslove()   
        })
    }
  }
}
