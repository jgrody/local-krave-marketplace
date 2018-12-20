<template>
  <v-navigation-drawer
    class="blue-gray"
    app
    permanent
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="goToRoute(item)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import router from '../../router'

  export default {
    data: () => ({
      items: [
        {
          title: 'Products',
          name: 'products',
          icon: 'store'
        },
        {
          title: 'Invites',
          name: 'invites',
          icon: 'person_add'
        }
      ],
      goToRoute: function (route){
        router.push({name: route.name})
      }
    })
  }
</script>

<style>

</style>
