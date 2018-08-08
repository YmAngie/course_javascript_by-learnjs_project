'use strict';

const PhoneService = {
    getAll() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'phones/phones.json', false);
        xhr.send();

        if (xhr.status !== 200) {
            alert(`${xhr.status}: ${xhr.statusText}`);
        } else {
            let responseData = JSON.parse(xhr.responseText);
            return responseData;
        }
    },

    get(phoneId) {
        return phoneFromServer;
    }
};

export default PhoneService;
