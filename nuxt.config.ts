// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    plugins: ['~/plugins/gtag.js'],  // Register the GTM plugin here
    generate: {
        routes: [
            "/admin",
        ],
    },
})
