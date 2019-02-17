import {
  getBreadCrumbList,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  setTagNavListInLocalstorage,
  getHomeRoute
} from '@/libs/util'
import routes from '@/router/routers'

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routes),
    locale: ''
  },
  getters: {
    menuList: (state, getter, rootState) => getMenuByRouter(routes, rootState.user.access)
  },
  mutations: {
    setBreadCrumb(state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched)
    },
    setTagNavList(state, list) {
        if(list){
            state.tagNavList = [...list]
        }else{
            state.tagNavList = getTagNavListFromLocalstorage()
        }
    },
    addTag(state, item, type="unshift") {
        if(state.tagNavList.findIndex(tag => tag.name === item.name) < 0){
            if(type === 'push'){
                state.tagNavList.push(item)
            }else{
                state.tagNavList.unshift(item)
            }
            setTagNavListInLocalstorage([...state.tagNavList])
        }
    },
    setLocal(state, lang){
        state.locale = lang
    }
  }
}
