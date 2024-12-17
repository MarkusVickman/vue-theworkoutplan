<script setup>
import { RouterView } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import Footer from './components/footer.vue'

</script>

<!-- Läser in header och footer komponenten samt aktuellt vald routervy -->
<template>
  <HeaderNav />
  <RouterView />
  <Footer />
</template>