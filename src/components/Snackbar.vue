<template>
  <v-snackbar
    v-model="show"
    :bottom="true"
    :right="true"
    :vertical="false"
    :color="color || null"
  >
    {{ text }}
    <!-- <v-btn
      color="pink"
      flat
      @click="close"
    >
      Close
    </v-btn> -->
  </v-snackbar>
</template>

<script>
  export default {
    props: [
      'show',
      'text',
      'color',
    ],
  }
</script>

<style>

</style>
