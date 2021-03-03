import axios from '@/service'

// addBackAdress
export default ({ title, name, mobile, zipcode, isdefault, address }) => {
  return axios.post('suprefundaddress/add', {
    title,
    name,
    mobile,
    zipcode: zipcode.county,
    address,
    isdefault
  })
}
