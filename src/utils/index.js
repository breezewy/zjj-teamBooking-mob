import Cookies from 'js-cookie'
// import store from '@/store'

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  // store.commit('resetStore')
  Cookies.remove('token')
  // window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = false
}
