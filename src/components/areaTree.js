import areaOption from './area.js'
// const mapValues = require('lodash/mapValues')
const {
  province_list: provinceList,
  city_list: cityList
  // 不要县
  // county_list: countyList
} = areaOption

// console.log(provinceList, cityList, countyList)

const provinceListArray = Object.entries(provinceList)
const cityListArray = Object.entries(cityList).map(([zipcode, label]) => ({
  zipcode,
  label
}))

const tree = provinceListArray.map(([zipcode, label]) => {
  return {
    zipcode,
    label,
    children: cityListArray.filter(
      v => v.zipcode.slice(0, 2) === zipcode.slice(0, 2)
    )
  }
})
// console.log(tree)

export default tree
