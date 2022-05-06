<template>
    <wwEditorInputRow
        label="URL"
        required
        type="query"
        name="url"
        :model-value="api.url"
        placeholder="https://api-url.com/endpoint?wsdl"
        :bindable="collection.mode === 'dynamic'"
        @update:modelValue="setProp('url', $event)"
    />
    <wwEditorInputRow
        label="XML"
        type="code"
        language="xml"
        :model-value="api.data"
        :bindable="collection.mode === 'dynamic'"
        @update:modelValue="setProp('data', $event)"
    />
    <wwEditorInputRow
        label="Headers"
        type="array"
        :model-value="api.headers"
        :bindable="collection.mode === 'dynamic'"
        @update:modelValue="setProp('headers', $event)"
        @add-item="setProp('headers', [...(api.headers || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Enter a value"
                small
                :bindable="collection.mode === 'dynamic'"
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Enter a value"
                small
                :bindable="collection.mode === 'dynamic'"
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow label="Result key">
        <wwEditorInputText
            type="text"
            :model-value="api.resultKey"
            placeholder="result.key"
            small
            @update:modelValue="setProp('resultKey', $event)"
        />
    </wwEditorFormRow>
    <wwEditorFormRow v-if="collection.mode === 'dynamic'">
        <div class="flex items-center">
            <wwEditorInputSwitch
                :model-value="api.isThroughServer"
                @update:modelValue="setProp('isThroughServer', $event)"
            />
            <div class="ww-typo-caption ml-2">Make this request through a server</div>
            <wwEditorQuestionMark tooltip-position="top-right" tooltip-name="rest-api-through-server" class="ml-auto" />
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        collection: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
    computed: {
        api() {
            return {
                url: null,
                headers: [],
                data: null,
                resultKey: '',
                isThroughServer: false,
                ...this.config,
            };
        },
    },
    methods: {
        setProp(key, value) {
            this.$emit('update:config', { ...this.api, [key]: value });
        },
    },
};
</script>
