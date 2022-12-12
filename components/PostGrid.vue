<script setup>
import { collection, query, where, getDocs, orderBy, limit, startAfter, getCountFromServer, startAt, endAt, getDoc } from "firebase/firestore"

const props = defineProps(['count'])
const posts = ref([])
const querySnapshot = ref(null)
const recordsCount = ref(100)

const getCount = async () => {
    const { firestore } = useFirebase()
    const q = query(collection(firestore, "posts"))
    const snapshot = await getCountFromServer(q)
    recordsCount.value = snapshot.data().count
}

const loadMore = async () => {
    const { firestore } = useFirebase()
    const lastVisible = querySnapshot.value.docs[querySnapshot.value.docs.length - 1]
    const q = query(collection(firestore, "posts"), orderBy('created_at', 'desc'), startAfter(lastVisible), limit(props.count))
    querySnapshot.value = await getDocs(q);
    querySnapshot.value.forEach((doc) => {
        posts.value.push({
            "id": doc.id,
            ...doc.data()
        })
    })
}

onBeforeMount(async () => {
    getCount()
    const { firestore } = useFirebase()
    const q = query(collection(firestore, "posts"), orderBy('created_at', 'desc'), limit(props.count))
    querySnapshot.value = await getDocs(q);
    querySnapshot.value.forEach((doc) => {
        posts.value.push({
            "id": doc.id,
            ...doc.data()
        })
    })
})
</script>

<template>
    <div class="flex flex-col gap-12 mx-auto my-8 md:my-16 lg:w-[calc(100%-300px)] xl:w-[calc(100%-400px)]">
        <h1 class="text-4xl text-[#232E52] text-center graphik-bold">Daily Blogs</h1>
        <div v-if="recordsCount == 0"
            class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
            <div
                class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
                <span class="text-red-500">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </div>
            <div class="alert-content ml-4">
                <div class="alert-title font-semibold text-lg text-red-800">
                    Error
                </div>
                <div class="alert-description text-sm text-red-600">
                    No Posts to show yet!
                    <br>
                    Create your first post in the admin section now!
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PostCard v-for="(post, index) in posts" :key="index" :post="post" />
        </div>
        <button v-if="posts.length > 0" @click="loadMore" type="button"
            class="bg-[#232E52] rounded-lg max-w-min whitespace-nowrap mx-auto text-white graphik-semibold px-4 py-2">Load
            More</button>
    </div>
</template>