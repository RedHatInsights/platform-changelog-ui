export default {
    get(url, headers = {}, params = {}) {
        return fetch(url, {
            headers,
            params
        });
    }
};