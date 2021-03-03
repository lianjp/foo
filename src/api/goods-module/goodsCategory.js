import axios from '@/service'

export default () => {
  return axios.get('goods/goodsCategory')
}

// export default async () => {
//   return {
//     data: {
//       status: 200,
//       data: [
//         { 'id': '1175', 'name': '女装', 'pid': '1177' },
//         { 'id': '1176', 'name': '男装', 'pid': '0' },
//         { 'id': '1177', 'name': '食品', 'pid': '0' },
//         { 'id': '1178', 'name': '手机', 'pid': '0' },
//         { 'id': '1135', 'name': '女3装', 'pid': '1175' },
//         { 'id': '1136', 'name': '男3装', 'pid': '1135' },
//         { 'id': '1137', 'name': '食3品', 'pid': '1136' },
//         { 'id': '1138', 'name': '手3机', 'pid': '1137' }
//       ]
//     }
//   }
// }
