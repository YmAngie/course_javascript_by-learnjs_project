'use strict';

const API_URL = 'https://ymangie.github.io/course_javascript_by-learnjs_project/api/';

const HttpService = {
    sendRequest(url, {
        method = 'GET',
        successCallback = () => {},
        errorCallback = console.error,
    } = {}) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, API_URL + url, true);
        xhr.send();

        xhr.onload = () => {
            let responseData = JSON.parse(xhr.responseText);
            successCallback(responseData);
        };

        xhr.onerror = () => {
            errorCallback(new Error(`${xhr.status}: ${xhr.statusText}`));
        };
    }
}

export default HttpService;
