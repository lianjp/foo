import axios from '@/service'

import applyToBecomeSupplierInlandTypeMap from '@/type/applyToBecomeSupplierInlandTypeMap.js'

import { filterLocalToServicePic } from '@/api/filterPicArray'
// 用户注册成为供应商

export default ({
  supplierName,
  name,
  telephone,
  supplierType,
  businessLicenseType,
  organizingUUId,
  taxRegistration,
  businessLicenseImgList,
  businessLicenseImgList3In1,
  certificateImgList,
  brandLicensingImgList,
  trademarkRegistrationCertificate,
  foodCirculationCertificate,
  otherQualification
}) => {
  return axios.post('supreg/apply', {
    merchname: supplierName,
    realname: name,
    mobile: telephone,
    type: supplierType,
    license_new: businessLicenseType,
    code: organizingUUId,
    registration: filterLocalToServicePic(taxRegistration),
    // 只有新的 才用 3in1 的, 其他的全用 businessLicenseImgList
    license:
      businessLicenseType ===
      applyToBecomeSupplierInlandTypeMap.newLicenseTypeLabel
        ? filterLocalToServicePic(businessLicenseImgList3In1)
        : filterLocalToServicePic(businessLicenseImgList),
    ID_face: filterLocalToServicePic([certificateImgList[0]]),
    ID_con: filterLocalToServicePic([certificateImgList[1]]),
    brand: filterLocalToServicePic(brandLicensingImgList),
    trademark: filterLocalToServicePic(trademarkRegistrationCertificate),
    food: filterLocalToServicePic(foodCirculationCertificate),
    other: filterLocalToServicePic(otherQualification)
  })
}
