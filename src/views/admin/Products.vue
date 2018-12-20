<template>
  <v-app>
    <admin-toolbar></admin-toolbar>
    <v-content>
      <admin-menu></admin-menu>
      <v-toolbar flat color="white">
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="info" dark class="mb-2" @click="importData">Import</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="success" dark class="mb-2">Create Product</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs6>
                    <v-text-field
                      v-model="editedItem.brand"
                      label="Brand"
                      :rules="brandRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      label="Description"
                      v-model="editedItem.description"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-switch
                      label="Displaying"
                      v-model="editedItem.displaying"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs6>
                    <v-switch
                      label="In Stock?"
                      v-model="editedItem.available"
                    ></v-switch>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save" :disabled="!editedItem.brand || !editedItem.name">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="products"
        :pagination.sync="sync"
        class="elevation-1"
        :loading="loading"
      >
        <template slot="items" slot-scope="props">
          <td>
            <img v-bind:src="props.item.imageUrl" width="40">
          </td>
          <td>{{ props.item.brand }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.description }}</td>
          <td>
            <span v-if="props.item.price">
              ${{ props.item.price | toCurrency }}
            </span>
          </td>
          <td>{{ props.item.displaying }}</td>
          <td>{{ props.item.available }}</td>
          <td class="">
            <v-icon
              class="mr-3"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
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

      <snackbar
        :show="snackbar"
        :text="snackbarText"
        :color="snackbarColor"
      ></snackbar>
      <loading-dialog
        :loading="importingData"
        :text="importDialogText"
      ></loading-dialog>
      
    </v-content>
  </v-app>
</template>

<script>
import AdminMenu from './Menu.vue'
import AdminToolbar from './Toolbar.vue'
import Snackbar from '../../components/Snackbar.vue'
import LoadingDialog from '../../components/LoadingDialog.vue'
import {slugify} from './../../helpers/slugify'

import { PRODUCTS_COLLECTION } from '../../configs'

const notSortable = {sortable: false}

export default {
  name: 'Products',
  components: {
    AdminMenu,
    AdminToolbar,
    Snackbar,
    LoadingDialog
  },
  data () {
    return {
      dialog: false,
      loading: true,
      headers: [
        { text: 'Image', value: 'image', align: 'left', ...notSortable},
        { text: 'Brand', value: 'brand', width: '15%'},
        { text: 'Name', value: 'name', width: '15%'},
        { text: 'Description', value: 'description', width: '20%', ...notSortable},
        { text: 'Price', value: 'price'},
        { text: 'Displaying', value: 'displaying', ...notSortable},
        { text: 'In stock?', value: 'in_stock', ...notSortable},
        { text: 'Actions', value: 'actions', ...notSortable},
      ],
      products: [],
      sync: {
        rowsPerPage: -1
      },
      editedIndex: -1,
      editedItem: {
        imageUrl: '',
        brand: '',
        name: '',
        description: '',
        price: 0,
        displaying: false,
        available: false,
      },
      defaultItem: {
        imageUrl: '',
        brand: '',
        name: '',
        description: '',
        price: 0,
        displaying: false,
        available: false,
      },
      snackbar: false,
      snackbarText: 'Item deleted.',
      snackbarColor: '',
      importingData: false,
      importDialogText: 'Importing data from CSV. Please wait...',
      brandRules: [
        v => !!v || 'Name is required',
      ],
      nameRules: [
        v => !!v || 'Name is required',
      ],
    }
  },
  created: function (){
    this.load()
  },
  methods: {
    load(){
      return PRODUCTS_COLLECTION.onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => this.products.push(doc.data()));
        this.loading = false
      });
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') && 
        PRODUCTS_COLLECTION.doc(item.slug).delete()
        .then(() => {
          this.toast({
            text: 'Product deleted.',
            color: 'red'
          })
        })
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    importData: function() {
      this.importingData = true;
      Sheetsu.read(
        "https://sheetsu.com/apis/v1.0su/f8724fe0fdbc.json",
        {}
      )
      .then(data => {
          data.forEach(product => {
            const { brand, name } = product;

            const slug = (product.slug = slugify(name));

            product.size = "12oz";
            product.displaying = true;
            product.available = true;
            product.brandSlug = slugify(brand);

            PRODUCTS_COLLECTION.doc(slug).set(product)
          });
        }
      ).then(() => {
        this.importingData = null
      })
    },
    save() {
      const product = this.editedItem
      if (!product.name) return false;

      product.slug = slugify(product.name)

      let ref = PRODUCTS_COLLECTION.doc(product.slug)

      ref.get().then(p => {
        if (p.exists) {
          return ref.update(product)
            .then(() => {
              this.toast({
                text: `Updated Product: ${product.name}`,
                color: 'success'
              })
            })
        } else {
          return ref.set(product)
            .then(() => {
              return this.toast({
                text: `Created Product: ${product.name}`,
                color: 'success'
              })
            })
        }
      })
      .then(() =>  this.close())
    },
    toast(options){
      this.snackbarText = options.text || ''
      this.snackbarColor = options.color || null
      this.snackbar = true
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Create Product' : 'Edit Product'
    }
  },
}
</script>
