'use strict';

import HttpService from '../../common/service/http-service.js';

const PhoneService = {
    getAll(callback) {
        HttpService.sendRequest('phones.json', {
            successCallback: callback
        })
    },

    get(phoneId, callback) {
        HttpService.sendRequest(`phones/${phoneId}.json`, {
            successCallback: callback
        })
    }
};

export default PhoneService;
