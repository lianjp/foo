import axios from '@/service'
/**
 * ? 登录需要自动登录 7 天
 */
import _ from 'lodash'
import applyToBecomeSupplierInlandTypeMap from '@/type/applyToBecomeSupplierInlandTypeMap.js'
export default async({ mobile, pass, needAutoLogIn }) => {
  const result = await axios.post(
    '/suplogin',
    {
      mobile,
      password: pass,
      needAutoLogIn
    },
    {}
  )
  if (!_.isEmpty(_.get(result, 'data.data.merchreg'))) {
    const merchreg = _.mapValues(
      _.get(result, 'data.data.merchreg', {}),
      (item, key) => {
        if (['license_new', 'type'].includes(key)) {
          return parseInt(item)
        }
        if (Array.isArray(item)) {
          return item.map(v => {
            return {
              ...v,
              response: {
                id: v.id
              }
            }
          })
        }
        return item
      }
    )
    result.data.data.merchreg = {
      a: merchreg.ID_con,
      a1: merchreg.ID_face,
      certificateImgList: [...merchreg.ID_face, ...merchreg.ID_con],
      businessLicenseImgList:
        merchreg.license_new ===
        applyToBecomeSupplierInlandTypeMap.oldLicenseTypeLabel
          ? merchreg.license
          : [],
      businessLicenseImgList3In1:
        merchreg.license_new ===
        applyToBecomeSupplierInlandTypeMap.newLicenseTypeLabel
          ? merchreg.license
          : [],
      a2: merchreg.accountid,
      a3: merchreg.applytime,
      brandLicensingImgList: merchreg.brand,
      organizingUUId: merchreg.code,
      a6: merchreg.desc,
      foodCirculationCertificate: merchreg.food,
      a8: merchreg.license,
      a9: merchreg.id,
      businessLicenseType: merchreg.license_new,
      supplierName: merchreg.merchname,
      telephone: merchreg.mobile,
      otherQualification: merchreg.other,
      name: merchreg.realname,
      reason: merchreg.reason,
      taxRegistration: merchreg.registration,
      a18: merchreg.status,
      trademarkRegistrationCertificate: merchreg.trademark,
      supplierType: merchreg.type,
      a22: merchreg.uniacid
    }
  }
  return result
}
