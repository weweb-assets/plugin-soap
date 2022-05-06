/* wwEditor:start */
import './components/CollectionEdit.vue';
import './components/CollectionSummary.vue';
import './components/Request.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Collection API
    \================================================================================================*/
    async fetchCollection(collection) {
        if (collection.mode === 'dynamic' && !collection.config.isThroughServer) {
            try {
                const { url, data, headers, resultKey } = collection.config;
                const responseData = await this._apiRequest(url, data, headers);
                return { data: _.get(responseData, resultKey, responseData), error: null };
            } catch (err) {
                return {
                    error: Object.getOwnPropertyNames(err).reduce((obj, key) => ({ ...obj, [key]: err[key] }), {}),
                };
            }
        } else {
            return { data: null, error: null };
        }
    },
    async apiRequest({ url, data, headers, isThroughServer }, wwUtils) {
        /* wwEditor:start */
        const payload = computePayload(headers);
        if (wwUtils) {
            wwUtils.log({ label: 'Request', preview: url });
            wwUtils.log({
                label: 'Payload',
                preview: { Data: data, Headers: payload.headers },
            });
        }
        /* wwEditor:end */
        if (isThroughServer) {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            const pluginURL = wwLib.wwApiRequests._getPluginsUrl();
            return await axios.post(`${pluginURL}/designs/${websiteId}/soap/request`, {
                url,
                data,
                headers,
            });
        } else {
            return await this._apiRequest(url, data, headers);
        }
    },
    async _apiRequest(url, data, headers) {
        const payload = computePayload(headers);

        const response = await axios({
            url,
            method: 'POST',
            data,
            headers: payload.headers,
        });

        return response.data;
    },
    /* wwEditor:start */
    getCollectionErrorDetails(collection) {
        return (
            collection.error &&
            collection.error.message &&
            collection.error.message === 'Network Error' &&
            '⚠️ There is a network error. That can happen when the server you are trying to call is down, or it is not found, or there is a CORS issue because the server expects a call from another server and not a frontend like WeWeb. If the network error is caused by a CORS issue, you may contact the administrator of the API to allow the “weweb.io” domain to make requests or, if this is not possible, consider enabling the "Make this request through a server" option before clicking on "Continue".'
        );
    },
    /* wwEditor:end */
};

function computePayload(headers) {
    return { headers: { 'content-type': 'text/xml', ...computeList(headers) } };
}

function computeList(list) {
    return (list || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
}
