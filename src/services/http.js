import axios from 'axios'
import _ from 'lodash'
import HttpStatusCode from '../constants/HttpStatusCode'

export const request = (
    endPoint,
    payload = {},
    method = 'get',
    headers = {},
    withoutDomain = false,
    options = {}
) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const csrfTokenKey = document.querySelector('meta[name="csrf-token-key"]').getAttribute('content');
    const  headerDefault = {
        'X-CSRF-TOKEN':csrfToken,
        'X-CSRF-TOKEN-KEY': csrfTokenKey,
    }

    let url = endPoint;
    if (withoutDomain) {
        url = endPoint
    }

    let headerSend = {
        ...headerDefault,
        ...headers
    }

    if (method === 'get') {
        payload = {
            params: payload
        }
    } else {
        payload = {
            data: payload
        }
    }

    return axios({
        method,
        url,
        headers: headerSend,
        ...payload,
        ...options
    })
        .then((res) => {
            const data = _.get(res, 'data')

            const newCsrfToken = _.get(res, 'headers.x-token');
            const newCsrfTokenKey = _.get(res, 'headers.x-token-key');

            if (newCsrfToken && newCsrfTokenKey) {
                document.querySelector('meta[name="csrf-token"]').setAttribute('content', newCsrfToken);
                document.querySelector('meta[name="csrf-token-key"]').setAttribute('content', newCsrfTokenKey);
            }
            return data
        })
        .catch((error) => {
            if (_.get(error, 'code') === 'ERR_NETWORK') {
                return {
                    statusCode: HttpStatusCode.InternalServerError,
                    message: 'ERR_NETWORK'
                }
            }
            return _.get(error, 'response.data')
        })
}

export const httpGet = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false
) => {
    return request(endPoint, payload, 'get', headers, withoutDomain)
}

export const httpPost = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false,
    options = {}
) => {
    return request(endPoint, payload, 'post', headers, withoutDomain, options)
}

export const httpDelete = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false
) => {
    return request(endPoint, payload, 'delete', withoutDomain)
}
