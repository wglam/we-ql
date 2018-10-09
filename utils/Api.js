import WxRequest from '/wx-request/index'
import Utils from '/wx-request/helpers/Utils'
class Api extends WxRequest {
 
  constructor(options) {
    super(options)
    // `$$prefix` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    // this.$$prefix = ''
    this.$$path = {
      uploadFile: '/ht/wechat/baseS/uploadFile',
      decodeUserInfo: "/ht/wechat/decodeUserInfo",
      searchConfig: "/ht/wechat/searchConfig"
    }
 
  }
  getPic(url) {
    return Utils.combineURLs(this.defaults.baseURL + 'uploadFile', url);
  }
  uploadFile(params) {
    return this.postRequest(this.$$path.uploadFile, params)
  }
  decodeUserInfo(params) {
    return this.getRequest(this.$$path.decodeUserInfo, params)
  }
  searchConfig() {
    return this.getRequest(this.$$path.searchConfig, {})
  }
}

export default Api