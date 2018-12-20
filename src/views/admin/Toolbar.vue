<template>
  <v-toolbar app dark>
    <v-toolbar-title class="headline text-uppercase">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="font-weight-bold">Local Krave</span>
      <span class="font-weight-light"> Admin</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
  import router from '../../router'

  export default {
    props: [
      'title'
    ],
    data: () => ({
      drawer: true
    })
  }
</script>

<style>

</style>
