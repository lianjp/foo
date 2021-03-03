import { pickBy } from 'lodash'
export default obj => {
  const params = new URLSearchParams()
  obj = pickBy(obj, d => d !== '' && d !== undefined)
  for (const k in obj) {
    params.append(k, obj[k])
  }
  return params
}
