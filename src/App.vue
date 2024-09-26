<template>
  <div id="app">
    <component :is="page">
      <router-view/>
    </component>
  </div>
</template>

<script>
import Adminpage from './views/Admin.vue'
export default {
  name: 'App',
  computed: {
    page() {
      return (this.$route.meta.page || 'admin')
    }
  },
  components:{
    Adminpage
  }
}
</script>