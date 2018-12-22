<template>
  <v-snackbar
    v-model="showing"
    :bottom="true"
    :right="true"
    :vertical="false"
    :color="color || null"
    :timeout="2000"
  >
    {{ text }}
    <v-btn
      flat
      color="white"
      @click="showing = false"
    >
      close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    props: [
      'show',
      'text',
      'color',
    ],
    computed: {
      showing: {
        get: function (){
          return this.show
        },
        set: function (value){
          this.$emit('closeToast', value)
        }
      }
    }
  }
</script>

<style>

</style>
