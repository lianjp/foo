import axios from '@/service'

// 编辑仓库 editWarehouse
export default ({ id, name, zipcode, address, tel, isdefault }) => {
  return axios.post('/supwarehouse/edit', {
    id,
    name,
    zipcode: zipcode.county,
    address,
    tel,
    isdefault
  })
}
