<script setup>
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore"

const route = useRoute()
const data = ref("")

const keyInput = ref("")
const titleInput = ref("")
const descriptionInput = ref("")
const contentInput = ref("")

const error = ref("")
const success = ref("")

onBeforeMount(() => {
    const { firestore } = useFirebase()
    const docRef = doc(firestore, `secret`, "WQrg0FWD5EqLCGgUS2gg")
    onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
            data.value = snap.data()
        } else {
            throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
    })
})

const addNewPost = async () => {
    if (data.value.key == keyInput.value) {
        error.value = ""
        if (keyInput.value == '' || titleInput.value == '' || descriptionInput.value == '' || contentInput.value == '') {
            error.value = "All the feilds are required"
        } else {
            const { firestore } = useFirebase()
            const docRef = await addDoc(collection(firestore, "posts"), {
                title: titleInput.value,
                description: descriptionInput.value,
                content: contentInput.value,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
            })
            success.value = "Document written with ID: " + docRef.id
        }
    } else {
        error.value = "Secret Key Entered Is Not Correct!"
    }
}
</script>

<template>
    <div class="flex gap-4 flex-col justify-center items-center h-screen">
        <h1 class="text-[#232E52] graphik-bold">Add New Post</h1>
        <div v-if="error != ''"
            class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300 w-96">
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
                    {{ error }}
                </div>
            </div>
        </div>
        <div v-if="success != ''" class="alert flex flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300 w-96">
			<div class="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
				<span class="text-green-500">
					<svg fill="currentColor"
						 viewBox="0 0 20 20"
						 class="h-6 w-6">
						<path fill-rule="evenodd"
							  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							  clip-rule="evenodd"></path>
					</svg>
				</span>
			</div>
			<div class="alert-content ml-4">
				<div class="alert-title font-semibold text-lg text-green-800">
					Success
				</div>
				<div class="alert-description text-sm text-green-600">
					This is an alert message, alert message goes here..!
				</div>
			</div>
		</div>
        <label class="block text-[#232E52]">
            <span class="graphik-medium">Secret KEY</span>
            <input v-model="keyInput" class="form-input mt-1 block border-2 w-96 rounded-xl graphik-regular"
                placeholder="Admin Secret Key goes here ..." required>
        </label>
        <label class="block text-[#232E52]">
            <span class="graphik-medium">Post Title</span>
            <input v-model="titleInput" class="form-input mt-1 block border-2 w-96 rounded-xl graphik-regular"
                placeholder="New Post title goes here ..." required>
        </label>
        <label class="block text-[#232E52]">
            <span class="graphik-medium">Post Description</span>
            <textarea v-model="descriptionInput"
                class="form-input mt-1 block border-2 w-96 rounded-xl resize-y graphik-regular" rows="4"
                placeholder="New Post description goes here ..." required></textarea>
        </label>
        <label class="block text-[#232E52]">
            <span class="graphik-medium">Post Content Link</span>
            <input v-model="contentInput" class="form-input mt-1 block border-2 w-96 rounded-xl graphik-regular"
                placeholder="New Post content link goes here ..." required>
        </label>
        <button @click="addNewPost" type="button"
            class="bg-[#232E52] rounded-lg w-96 whitespace-nowrap mx-auto text-white graphik-semibold px-4 py-2">Save</button>
    </div>
</template>
