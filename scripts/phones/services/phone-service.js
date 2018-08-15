'use strict';

import HttpService from '../../common/service/http-service.js';

const PhoneService = {
    getAll({query = '', orderField = ''} = {}) {
        return HttpService.sendRequest('phones.json')
            .then(phones => {
                let filteredPhones = this._filter(phones, query);
                let sortedPhones = this._sort(filteredPhones, orderField);

                return sortedPhones;
            });
    },

    get(phoneId) {
        return HttpService.sendRequest(`phones/${phoneId}.json`);
    },

    _filter(phones, query) {
        const queryLowerCased = query.toLowerCase();
        return phones.filter(phone => phone.name.toLowerCase().includes(queryLowerCased));
    },

    _sort(phones, orderField) {
        return phones.sort((a, b) => a[orderField] > b[orderField] ? 1 : -1);
    }
};

export default PhoneService;
