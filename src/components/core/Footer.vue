<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class=" footer-links white--text">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright white--text">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://www.eindhovenlinc.com/"
        target="_blank"
        class="white--text">ehvLINC</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Landing', Link: '/' },
      { name: 'Home', Link: '/Dashboard' },
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
