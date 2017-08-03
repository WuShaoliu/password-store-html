import 'whatwg-fetch'
import { remote } from '@/config'

function request_post(url, params) {
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function(response) {
        return response.json()
    })
}

function request_get(url) {
    return fetch(url, {
        credentials: 'include',
    }).then(function(response) {
        return response.json()
    })
}

function request_setup(url, method, params) {
    if (method === 'GET') {
        if (params) {
            url += '?'
            let first = true
            for (let i in params) {
                if ((typeof(params[i]) == 'string' || typeof(params[i]) == 'number')) {
                    if (first) {
                        url += (i + '=' + params[i])
                        first = false
                    }
                    else {
                        url += ('&' + i + '=' + params[i])
                    }
                }
            }
            return request_get(url)
        }
        else {
            return request_get(url)
        }
    }
    else if (method === 'POST') {
        return request_post(url, params)
    }
}

export default {
    get_passwords: params => request_setup(`${remote.SERVER_HOST}/passwords`, 'GET'),
    add_passwords: params => request_setup(`${remote.SERVER_HOST}/password/add`, 'POST', params),
    edit_passwords: params => request_setup(`${remote.SERVER_HOST}/password/edit`, 'POST', params),
    delete_password: params => request_setup(`${remote.SERVER_HOST}/password/delete`, 'GET', params),
}