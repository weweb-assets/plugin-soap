export default {
    editor: {
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.url;
            },
        },
    },
    actions: [
        {
            name: 'Request',
            code: 'request',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Request.vue'),
            getIsValid({ url }) {
                return !!url;
            },
            /* wwEditor:end */
        },
    ],
};
