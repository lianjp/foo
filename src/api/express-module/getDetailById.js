// 运费模板列表
import { autoCancel } from '@/service'
const axios = autoCancel()
const pickBy = require('lodash/pickBy')
// const get = require('lodash/get')
// const set = require('lodash/set')

export default async({ id }) => {
  const data = await axios.get('supdispatch/detail', {
    params: pickBy({
      id
    })
  })
  // const d = data.data.data
  const {
    areas,
    calculatetype,
    dispatchname,
    displayorder,
    enabled,
    express,
    firstweight,
    firstweightprice,
    firstnum,
    firstnumprice,
    isdefault,
    isdispatcharea,
    nodispatchareas,
    yesdispatchareas,
    secondweight,
    secondweightprice,
    secondnum,
    secondnumprice
  } = data.data.data
  data.data.data = {
    areas: areas.map(v => {
      const {
        city,
        key,
        firstweight,
        firstweightprice,
        firstnum,
        firstnumprice,
        secondweight,
        secondweightprice,
        secondnum,
        secondnumprice
      } = v
      return {
        city,
        key,
        firstweightOrNum: calculatetype === '0' ? firstweight : firstnum,
        firstweightOrNumprice:
          calculatetype === '0' ? firstweightprice : firstnumprice,

        isdispatcharea,
        nodispatchareas:
          isdispatcharea === '0' ? nodispatchareas : yesdispatchareas,
        secondweightOrNum: calculatetype === '0' ? secondweight : secondnum,
        secondweightOrNumprice:
          calculatetype === '0' ? secondweightprice : secondnumprice
      }
    }),
    calculatetype,
    dispatchname,
    displayorder,
    enabled,
    express,
    firstweightOrNum: calculatetype === '0' ? firstweight : firstnum,
    firstweightOrNumprice:
      calculatetype === '0' ? firstweightprice : firstnumprice,
    isdefault,
    isdispatcharea,
    nodispatchareas:
      isdispatcharea === '0' ? nodispatchareas : yesdispatchareas,
    secondweightOrNum: calculatetype === '0' ? secondweight : secondnum,
    secondweightOrNumprice:
      calculatetype === '0' ? secondweightprice : secondnumprice
  }

  return data
}
