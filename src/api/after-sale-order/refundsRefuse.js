import axios from '@/service'

// 卖家拒绝退货退款
export default ({ refundId, excuse, message }) => {
  return axios.post('suprefund/refundsRefuse', {
    refundid: refundId,
    excuse,
    message
  })
}
