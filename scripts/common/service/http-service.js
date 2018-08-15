'use strict';

const API_URL = 'https://ymangie.github.io/course_javascript_by-learnjs_project/api/';

const HttpService = {
    sendRequest(url) {
        return fetch(API_URL + url)
            .then(response => response.json());
    }
};

export default HttpService;
