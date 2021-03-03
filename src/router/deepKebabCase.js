import kebabCase from 'lodash/kebabCase'
const helper = routes => {
  for (const k in routes) {
    if (routes[k].path) {
      routes[k].path = routes[k].path
        .split('/')
        .map(v => kebabCase(v))
        .join('/')
    }
    if (routes[k].children) {
      helper(routes[k].children, kebabCase)
    }
  }
}

const deepKebabCase = options => {
  helper(options.routes)
  return options
}

export default deepKebabCase
