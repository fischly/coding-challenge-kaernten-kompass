// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/image', '@samk-dev/nuxt-vcalendar'],
  css: ['@/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Caveat', provider: 'local', src: '/fonts/Caveat.ttf' },
    ],
    defaults: {
      weights: [300, 400, 600, 700],
    }
  },
  app: {
    head: {
      title: 'Kärnten Kompass',
      htmlAttrs: {
        lang: 'de',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'description', content: 'Entdecke, was Kärnten bewegt. Finde und erkunde regionale Veranstaltungen in Kärnten - von Kultur und Kunst bis hin zu einzigartigen Events.' },
        { name: 'keywords', content: 'Kärnten, Veranstaltungen, Events, Kultur, Kunst, Österreich, Carinthia' },
        { name: 'author', content: 'Kärnten Kompass' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: 'Kärnten Kompass' },
        { name: 'og:description', content: 'Entdecke, was Kärnten bewegt. Finde und erkunde regionale Veranstaltungen in Kärnten - von Kultur und Kunst bis hin zu einzigartigen Events.' },

        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Kärnten Kompass' },
        { name: 'twitter:description', content: 'Entdecke, was Kärnten bewegt. Finde und erkunde regionale Veranstaltungen in Kärnten - von Kultur und Kunst bis hin zu einzigartigen Events.' },

        { name: 'robots', content: 'index, follow' },
      ]
    }
  }
})