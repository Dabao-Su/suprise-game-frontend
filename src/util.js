import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

/**
 *
 * @param url 请求url
 * @param method 请求方法，GET,POST,DELETE,PUT
 * @param param 请求数据
 * @param dataType 请求类型，0：表单数据，1：json数据
 * @returns {*}
 */
export const httpUtil = (url='', method = 'GET', param = {}, dataType = 0) => {
  let data, contentType;
  if(dataType == 0){
    data = qs.stringify(param)
    contentType = 'application/x-www-form-urlencoded';
  }else if(dataType == 1){
    data = param
  }

  return axios({
    method: method,
    url: url,
    headers: {
      'Content-Type': contentType
    },
    data: data
  }).then(function (response) {
    return response.data
  });
}

