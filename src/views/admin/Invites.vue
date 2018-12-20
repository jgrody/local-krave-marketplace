<template>
  <v-app>
    <admin-toolbar
      title="Invites"
    ></admin-toolbar>

    <v-content>
      <admin-menu></admin-menu>
      <v-data-table
        :headers="headers"
        :items="invites"
        :pagination.sync="sync"
        :loading="loading"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.status }}</td>
          <td class="">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data" v-if="!loading">
          <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to show yet :(
          </v-alert>
        </template>
      </v-data-table>
    </v-content>
  </v-app>
</template>

<script>
import AdminMenu from './Menu.vue'
import AdminToolbar from './Toolbar.vue'
import { INVITES_COLLECTION } from '../../configs'

export default {
  name: 'Invites',
  components: {
    AdminMenu,
    AdminToolbar
  },
  data () {
    return {
      loading: true,
      headers: [
        { text: 'Email', value: 'email', align: 'left', width: '30%'},
        { text: 'Phone', value: 'number', align: 'left', width: '30%'},
        { text: 'Status', value: 'status', align: 'left'},
        { text: 'Actions', value: '', align: 'left'},
      ],
      invites: [],
      sync: {
        rowsPerPage: -1
      }
    }
  },
  created: function (){
    this.load()
  },
  methods: {
    load: function (){
      INVITES_COLLECTION.onSnapshot(querySnapshot => {
        this.invites = [];
        querySnapshot.forEach(doc => this.invites.push(doc.data()));
        this.loading = false;
      });
    }
  }
}
</script>
