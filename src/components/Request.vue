<template>
    <wwEditorInputRow
        label="URL"
        required
        type="query"
        :model-value="url"
        placeholder="https://api-url.com/endpoint?wsdl"
        bindable
        @update:modelValue="setUrl"
    />
    <wwEditorInputRow
        type="code"
        language="xml"
        :model-value="data"
        label="XML"
        bindable
        @update:modelValue="setData"
    />
    <wwEditorInputRow
        label="Headers"
        type="array"
        :model-value="headers"
        bindable
        @update:modelValue="setHeaders"
        @add-item="setHeaders([...(headers || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow>
        <div class="flex items-center">
            <wwEditorInputSwitch :model-value="isThroughServer" @update:modelValue="setIsThroughServer" />
            <div class="ww-typo-caption ml-2">Make this request through a server</div>
            <wwEditorQuestionMark tooltip-position="top-right" tooltip-name="rest-api-through-server" class="ml-auto" />
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: {
            type: Object,
            default: () => ({ url: null, data: null, headers: [], isThroughServer: false }),
        },
    },
    emits: ['update:args'],
    computed: {
        url() {
            return this.args.url;
        },
        data() {
            return this.args.data;
        },
        headers() {
            return this.args.headers || [];
        },
        isThroughServer() {
            return this.args.isThroughServer || false;
        },
    },
    methods: {
        setUrl(url) {
            this.$emit('update:args', { ...this.args, url });
        },
        setData(data) {
            this.$emit('update:args', { ...this.args, data });
        },
        setHeaders(headers) {
            this.$emit('update:args', { ...this.args, headers });
        },
        setIsThroughServer(isThroughServer) {
            this.$emit('update:args', { ...this.args, isThroughServer });
        },
    },
};
</script>
