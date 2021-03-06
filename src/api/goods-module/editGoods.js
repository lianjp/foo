import axios from '@/service'
import { filterLocalToServicePic } from '@/api/filterPicArray'
const pickBy = require('lodash/pickBy')

// 编辑商品
export default formData => {
  const {
    id,
    type,
    tcate,
    brandid,
    title,
    supplyprice,
    smallprice,
    largeprice,
    depotid,
    thumb,
    content,
    goodskey,
    attribute,
    // 是否启用详细规格
    hasoption,
    goodssn,
    productsn,
    weight,
    total,
    dispatchtype,
    dispatchid,
    dispatchprice,
    showtotal,
    // 详细规格的数据
    standerdTableFormData
  } = formData

  const specs =
    hasoption === '1'
      ? standerdTableFormData.specs.map(({ title, content }) => {
        return {
          title: title,
          content: content.join(',')
        }
      })
      : ''

  const options =
    hasoption === '1'
      ? standerdTableFormData.list.map(
        ({
          costprice,
          goodssn,
          maxretailprice,
          minretailprice,
          preProps,
          // prePropsTitle,
          productsn,
          stock,
          weight
        }) => {
          return {
            title: preProps.join(','),
            stock,
            costprice,
            minretailprice,
            maxretailprice,
            // 标题是 preProps 全排列的拼接
            goodssn,
            productsn,
            weight
          }
        }
      )
      : ''
  return axios.post(
    'supgoods/edit',
    pickBy({
      id,
      type,
      tcate,
      brandid,
      title,
      supplyprice,
      smallprice,
      largeprice,
      depotid,
      thumb: filterLocalToServicePic(thumb),
      content,
      goodskey,
      // 详细规格的参数
      specs,
      options,

      attribute,
      hasoption,
      goodssn,
      productsn,
      weight,
      total,
      dispatchtype,
      dispatchid,
      dispatchprice,
      showtotal
    })
  )
}
