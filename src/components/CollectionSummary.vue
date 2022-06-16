<template>
    <div class="soap-collection-summary">
        <div class="soap-collection-summary__elem caption-s">URL: {{ config.url || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.soap-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
