// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        { src: '/js/jquery.js', defer: true },
        { src: '/js/nicepage.js', defer: true }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/nicepage.css' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans|Montserrat'
        }
      ]
    }
  }
})
