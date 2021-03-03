// 图片数组过滤成可发送给服务器 的数组
export const filterLocalToServicePic = arr => {
  return Array.isArray(arr)
    ? arr.map(pictureInfo => ({
      name: pictureInfo.name,
      id: pictureInfo.response.data.id,
      status: pictureInfo.status,
      size: pictureInfo.size,
      uid: pictureInfo.uid
    }))
    : []
}

export const filterServiceToLocalPic = arr => {
  return Array.isArray(arr)
    ? arr.map(v => {
      return {
        ...v,
        response: {
          data: {
            id: v.id
          }
        }
      }
    })
    : []
}
