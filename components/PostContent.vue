<script setup>
const props = defineProps(['link'])
const { $markdown } = useNuxtApp()

const content = ref("")

const { data: post } = await useFetch(props.link, {initialCache: false})
content.value = $markdown.render(post.value)
</script>

<template>
    <div class="bg-white rounded-xl mx-auto mt-8 md:mt-16 p-5 md:p-12 max-w-max">
        <div v-html="content" class="prose prose-headings:text-[#232E52] prose-p:text-[#232E52] max-w-[80ch]"></div>
    </div>
</template>