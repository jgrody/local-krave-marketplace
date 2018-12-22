<template>
  <v-app>
    <admin-toolbar
      title="Invites"
    ></admin-toolbar>

    <v-content>
      <admin-menu></admin-menu>
      <v-toolbar flat color="white">
        <v-toolbar-title>Invites</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="success" dark class="mb-2">Invite User</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Invite User</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-alert
                      :value="errors.length"
                      type="error"
                      v-for="error in errors"
                    >
                      {{error}}
                    </v-alert>
                  </v-flex>
                    
                  <v-flex xs12>
                    <v-text-field
                      v-model="invite.email"
                      label="Email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="invite.number"
                      label="Phone Number"
                      :rules="numberRules"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save" :disabled="!invite.email || !invite.number || saving">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
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
              @click="remove(props.item)"
            >
              delete
            </v-icon>
            <!-- <v-icon
              @click="resend(props.item)"
            >
              resend
            </v-icon> -->
          </td>
        </template>
        <template slot="no-data" v-if="!loading">
          <v-alert :value="true" color="error" icon="warning">
            Sorry, there are currently no invites.
            Click "Invite User" above to invite a new user.
          </v-alert>
        </template>
      </v-data-table>

      <snackbar
        :show="snackbar"
        :text="snackbarText"
        :color="snackbarColor"
        v-on:closeToast="snackbar = false"
      ></snackbar>
    </v-content>
  </v-app>
</template>

<script>
import AdminMenu from './Menu.vue'
import AdminToolbar from './Toolbar.vue'
import { INVITES_COLLECTION } from '../../configs'
import { VALID_EMAIL, VALID_PHONE } from '../../helpers/regexes'
import Snackbar from '../../components/Snackbar.vue'

export default {
  name: 'Invites',
  components: {
    AdminMenu,
    AdminToolbar,
    Snackbar
  },
  data () {
    return {
      invite: {
        status: 'Sent'
      },
      dialog: false,
      loading: true,
      saving: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      headers: [
        { text: 'Email', value: 'email', align: 'left', width: '30%'},
        { text: 'Phone', value: 'number', align: 'left', width: '30%'},
        { text: 'Status', value: 'status', align: 'left'},
        { text: 'Actions', value: '', align: 'left'},
      ],
      invites: [],
      sync: {
        rowsPerPage: -1
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => VALID_EMAIL.test(v) || 'E-mail must be valid'
      ],
      numberRules: [
        v => !!v || 'Phone number is required',
        v => VALID_PHONE.test(v) || 'Phone number must be valid'
      ],
      defaultItem: {
        email: '',
        number: '',
      },
      errors: []
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
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.invite = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save(){
      this.errors = []
      let inviteRef = INVITES_COLLECTION.doc(this.invite.email)
      this.$data.saving = true
      inviteRef.get()
        .then(invite => {
          if (!invite.exists) {
            inviteRef.set(this.invite)
              .then(() =>  this.close())
          } else {
            this.errors.push(`
              User with the email
              ${this.invite.email}
              has already been invited.
            `)
          }
        })
        .finally(() => delete this.$data.saving)
    },
    remove(invite){
      return confirm('Are you sure you want to delete this invite?') && 
        INVITES_COLLECTION.doc(invite.email)
        .delete()
        .then(() => this.close())
        .then(() => {
          this.snackbarText = 'Invite deleted.'
          this.snackbarColor = 'red'
          this.snackbar = true
        })
    },
    resend(){
      
    }
  }
}
</script>
