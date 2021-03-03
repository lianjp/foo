import axios from '@/service'

// addBackAdress
export default ({ id, title, name, mobile, zipcode, isdefault, address }) => {
  return axios.post('suprefundaddress/edit', {
    id,
    title,
    name,
    mobile,
    zipcode: zipcode.county,
    address,
    isdefault
  })
}
