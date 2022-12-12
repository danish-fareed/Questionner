<script setup>
import { doc, onSnapshot } from "firebase/firestore"

const route = useRoute()
const data = ref("")

onBeforeMount(() => {
  const { firestore } = useFirebase()
  const docRef = doc(firestore, `posts`, route.params.id)
  onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      data.value = snap.data()
    } else {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
  })
})
</script>

<template>
  <PostContent v-if="data != ''" :link="data.content" />
  <PostGrid :count="4" />
</template>