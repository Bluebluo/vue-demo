import config from '@/config'
import {
  hasOneOf
} from '@/libs/tools'
import {
  get
} from 'http';

const TOKEN_KEY = 'QRY_TOKEN'

export const setUser = (user) => {
  const expTime = new Date().getTime() + (config.cookieExpires || 1) * 86400000 //有效期
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify({
    exp: expTime,
    data: user
  }))
}

export const getUser = () => {
  let json = window.localStorage.getItem(TOKEN_KEY)
  if (json) {
    json = JSON.parse(json)
    if (new Date() >= json.exp) {
      window.localStorage.removeItem(TOKEN_KEY)
    } else {
      return json.data
    }
  }
  return {
    username: '',
    token: null,
    userId: '',
    access: [],
    avatorImgPath: ''
  }
}

export const clearUser = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

/**
 * @description 该角色能否通过该路由
 * @param {String} access 
 * @param {Array} route 
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) {
    return hasOneOf(access, route.meta.access)
  } else {
    return true
  }
}

/**
 * @description遍历该角色可访问路由
 * @param {String} name 期望通过的name
 * @param {String} access 当前用户角色
 * @param {Array} routes 路由表
 */
export const canAccessTo = (name, access, routes) => {
  const getHasAccessRouteNames = (list) => {
    let canAccessNames = []
    list.forEach(element => {
      if (element.children && element.children.length) {
        canAccessNames = [].concat(canAccessNames, getHasAccessRouteNames(element.children))
      } else {
        if (element.meta && element.meta.access) {
          if (hasAccess(access, element)) canAccessNames.push(element.name)
        } else {
          canAccessNames.push(element.name)
        }
      }
    });
    return canAccessNames
  }
  const canAccessNames = getHasAccessRouteNames(routes)
  //console.log(canAccessNames, name, access,canAccessNames.indexOf(name))
  return canAccessNames.indexOf(name) > -1
}

/**
 * 
 * @description 是否还有子路由
 * @param {string} item 
 */
export const hasChild = (item) => {
  return item.children && item.children.length > 0
}

/**
 * @description 显示该菜单
 * @param {String} item 
 * @param {String} access 
 */
const showThisMenuItem = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const getMenuByRouter = (routes, access) => {
  let menu = []
  routes.forEach(item => {
    if (item.meta && !item.meta.hideInMenu) {
      let menuItem = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item) && showThisMenuItem(item, access)) {
        menuItem.children = getMenuByRouter(item.children, access)
      }
      if (item.meta.href) {
        menuItem.href = item.meta.href
      }
      if (showThisMenuItem(item, access)) {
        menu.push(menuItem)
      }
    }
  })
  return menu
}

/**
 * @description 获得面包屑数据
 * @param {Array} routeMetched 当前匹配路由
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched) => {
  console.log(routeMetched)
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInMenu
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{
    name: 'home',
    to: '/home'
  }, ...res]
}

export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNavList
  return list ? JSON.parse(list) : []
}

export const setTagNavListInLocalstorage = (list) => {
  localStorage.tagNavList = JSON.stringify(list)
}

export const getHomeRoute = (routes) => {
  let i = -1
  let len = routes.length
  let homeRoute = {}
  while (++i < len) {
    let item = routes[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) {
        return res
      }
    } else {
      if (item.name === 'home') {
        homeRoute = item
      }
    }
  }
  return homeRoute
}

export const getNewTagList = (list, newRoute) => {
  const {
    name,
    path,
    meta
  } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) > 0) return newList
  else newList.push({
    name,
    path,
    meta
  })
  return newList
}

export const getNextName = (list, name) => {
  let res = ''
  if (list.length === 2) {
    res = 'home'
  } else {
    if (list.findIndex(item => item.name === name) === list.length - 1) res = list[list.length - 2].name
    else res = list[list.findIndex(item => item.name === name) + 1].name
  }
  return res
}
