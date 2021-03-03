// eslint-disable-next-line no-unused-vars
import store from './../store'

const afterEachWatcher = (to, from) => {
  // ...
  console.log(to.path, from.path)
}

// 第一次打开页面需要执行的 action
const oneceEnterAction = (to, from) => {
  if (oneceEnterAction.num) return
  oneceEnterAction.num = 1
  store.dispatch('firstEnterAfterFunc', to)
}

export default [afterEachWatcher, oneceEnterAction]
