<script setup>
const route = useRoute()

const isPost = ref((route.fullPath).includes('post'))

watch(route, async (newRoute, oldRoute) => {
    isPost.value = (newRoute.fullPath).includes('post')
})
</script>

<template>
    <nav class="bg-[#499F9F] rounded-xl p-4 md:p-16 flex flex-col justify-center items-center gap-16">
        <div class="flex flex-col gap-5">
            <NuxtLink to="/">
                <img class="h-[70px] mx-auto" src="~/assets/logo-white.svg" alt="Questionner Logo">
            </NuxtLink>
            <ul class="flex gap-10 graphik-semibold text-white text-xs sm:text-md  md:text-lg justify-center items-center">
                <li>
                    <NuxtLink to="/">Daily Blogs</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/">About Us</NuxtLink>
                </li>
            </ul>
        </div>
        <div v-if="!isPost" class="flex flex-col gap-5">
            <p class="text-white text-base text-center graphik-semibold">👋 HELLO</p>
            <h1 class="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl text-center graphik-bold">We try to answer general Questions that you may have!</h1>
        </div>
    </nav>
</template>