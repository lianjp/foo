import axios from '@/service'

// addWarehouse
export default ({ name, zipcode, address, tel, isdefault }) => {
  return axios.post('/supwarehouse/add', {
    name,
    zipcode: zipcode.county,
    address,
    tel,
    isdefault
  })
}
