import { autoCancel } from '@/service'
const axios = autoCancel()
export default ({ currentPage, keyword, pageSize }) => {
  return axios.get('suprefundaddress/addressList', {
    params: {
      page: currentPage,
      pageSize,
      keyword
    }
  })
}
