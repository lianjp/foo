import axios from '@/service'
// const get = require('lodash/get')
const pickBy = require('lodash/pickBy')

export default formData => {
  const {
    areas,
    calculatetype,
    dispatchname,
    displayorder,
    enabled,
    express,
    firstweightOrNum,
    firstweightOrNumprice,
    isdefault,
    isdispatcharea,
    nodispatchareas,
    secondweightOrNum,
    secondweightOrNumprice
  } = formData

  const filteredData = pickBy({
    areas: areas.map(v => {
      const {
        city,
        firstweightOrNum,
        firstweightOrNumprice,
        key,
        secondweightOrNum,
        secondweightOrNumprice
      } = v
      return pickBy({
        city,
        key,
        firstweight: calculatetype === '0' ? firstweightOrNum : '',
        firstweightprice: calculatetype === '0' ? firstweightOrNumprice : '',
        firstnum: calculatetype === '1' ? firstweightOrNum : '',
        firstnumprice: calculatetype === '1' ? firstweightOrNumprice : '',
        secondweight: calculatetype === '0' ? secondweightOrNum : '',
        secondweightprice: calculatetype === '0' ? secondweightOrNumprice : '',
        secondnum: calculatetype === '1' ? secondweightOrNum : '',
        secondnumprice: calculatetype === '1' ? secondweightOrNumprice : ''
      })
    }),
    calculatetype,
    dispatchname,
    displayorder,
    enabled,
    express,
    firstweight: calculatetype === '0' ? firstweightOrNum : '',
    firstweightprice: calculatetype === '0' ? firstweightOrNumprice : '',
    firstnum: calculatetype === '1' ? firstweightOrNum : '',
    firstnumprice: calculatetype === '1' ? firstweightOrNumprice : '',
    isdefault,
    isdispatcharea,
    nodispatchareas: isdispatcharea === '0' ? nodispatchareas : '',
    yesdispatchareas: isdispatcharea === '1' ? nodispatchareas : '',
    secondweight: calculatetype === '0' ? secondweightOrNum : '',
    secondweightprice: calculatetype === '0' ? secondweightOrNumprice : '',
    secondnum: calculatetype === '1' ? secondweightOrNum : '',
    secondnumprice: calculatetype === '1' ? secondweightOrNumprice : ''
  })

  return axios.post('supdispatch/add', filteredData)
}
