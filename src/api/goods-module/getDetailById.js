import axios from '@/service'
import { filterServiceToLocalPic } from '@/api/filterPicArray'

const get = require('lodash/get')
const set = require('lodash/set')

// 获取商品详情，并返回
export default async({ id }) => {
  const data = await axios.get('supgoods/goodsmarketdetail', {
    params: {
      id
    }
  })
  const { goods, options, specs } = get(data, 'data.data', {})
  const hasoption = goods.hasoption
  set(data, 'data.data', {
    ...goods,
    thumb: filterServiceToLocalPic(goods.thumb),
    standerdTableFormData: {
      list:
        hasoption === '1'
          ? options.map(
            ({
              costprice,
              goodssn,
              title,
              stock,
              minretailprice,
              maxretailprice,
              // 标题是 preProps 全排列的拼接
              productsn,
              weight
            }) => {
              return {
                costprice,
                goodssn,
                maxretailprice,
                minretailprice,
                preProps: title.split(','),
                // prePropsTitle,
                productsn,
                stock,
                weight
              }
            }
          )
          : [],
      specs:
        hasoption === '1'
          ? specs.map(({ title, content }) => {
            return {
              title: title,
              content: content.split(',')
            }
          })
          : []
    }
  })
  return data
}
