<script setup>
const props = defineProps(['post'])

const timestamp = ref(props.post.created_at)

const created_at = computed(() => {
    return (new Date(timestamp.value.seconds * 1000))
    .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
})
</script>

<template>
    <NuxtLink :to="'/post/' + props.post.id">
        <div class="bg-white p-7 rounded-xl text-[#232E52] transition-shadow duration-300 hover:shadow-2xl">
            <span class="text-xs graphik-medium">{{ created_at }}</span>
            <h1 class="text-2xl graphik-bold">{{ props.post.title }}</h1>
            <p class="text-lg graphik-regular line-clamp-3">{{ props.post.description }}</p>
        </div>
    </NuxtLink>
</template>