<script setup>
const app = useNuxtApp();

app.hook('page:start', () => {
  console.log('Page start...');
});
app.hook('page:finish', () => {
  console.log('Page finished!');
});
</script>

<template>
  <div class="p-5 bg-[#EBF2FE]">
    <CustomNavbar v-if="!$route.fullPath.includes('admin')" />
    <div>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </div>
    <CustomFooter v-if="!$route.fullPath.includes('admin')" />
  </div>
</template>
