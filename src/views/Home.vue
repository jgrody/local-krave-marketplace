<template>
  <section>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Local Krave </span>
        <span class="font-weight-light">Market</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <section class="section ghostwhite">
          <div class="container is-fullhd master-container">
            <div style="padding: 20px;">
              <div class="select is-rounded brand-select">
                <select @change="onSelect()" v-model="filter">
                  <option value="null">
                    All Blends
                  </option>
                  <option v-for="brand in brands" v-bind:key="brand">
                    {{brand}}
                  </option>
                </select>
              </div>
            </div>
            <aside class="menu brand-menu">
              <p class="menu-label">
                Brands
              </p>
              <ul class="menu-list">
                <li>
                  <a
                    @click="filterByBrand(null)"
                    v-bind:class="{'is-active': filter === null}"
                  >
                    All Blends
                  </a>
                </li>
                <li v-for="brand in brands" v-bind:key="brand">
                  <a
                    @click="filterByBrand(brand)"
                    v-bind:class="{'is-active': filter === brand}"
                  >
                    {{brand}}
                  </a>
                </li>
              </ul>
            </aside>

            <transition-group
              class="products-container"
              name="product-card-group"
              tag="div"
            >
              <div
                class="product"
                v-for="product in sortedByBrand"
                v-bind:key="product.slug"
              >
                <div
                  class="product-thumb"
                  v-bind:style="{backgroundImage: 'url(' + (product.imageUrl || `https://via.placeholder.com/250`) + ')'}"
                  v-bind:class="[product.brandSlug]"
                >
                </div>
                <div class="product-details">
                  <div style="margin-bottom: 10px;">
                    <div style="margin-bottom: 5px">
                      <div style="font-size: 18px;">
                        <b>{{product.name}}</b>
                        <b
                          style="color: darkgoldenrod"
                          v-if="product.price"
                        >
                          ${{product.price}}
                        </b>
                      </div>
                      <div style="margin-right: 5px; font-size: 14px;">
                        by {{product.brand}}
                      </div>
                    </div>
                    <!-- <div style="margin-bottom: 15px; color: darkslategray; font-size: 14px;">
                      {{product.description}}
                    </div> -->
                  </div>
                  <a class="button is-warning add-to-cart">
                    <span class="icon is-small">
                      <i class="fas fa-cart-plus"></i>
                    </span>
                    <span>Add to Cart</span>
                  </a>
                </div>
              </div>
            </transition-group>
          </div>
        </section>
      </v-container>
    </v-content>
  </section>
</template>

<script>
  import { PRODUCTS_COLLECTION } from '../configs';

  export default {
    components: {
    },
    data() {
      return {
        filter: null,
        products: [],
      }
    },
    created() {
      this.load()
    },
    methods: {
      load(){
        return PRODUCTS_COLLECTION.onSnapshot(querySnapshot => {
          this.products = [];
          querySnapshot.forEach(doc => this.products.push(doc.data()));
        });
      },
      filterByBrand: function(brand) {
        this.filter = brand;
      }
    },
    computed: {
      sortedByBrand: function() {
        let products = this.filter
          ? this.products.filter(p => p.brand == this.filter)
          : this.products;

        return products.filter(p => p.displaying && p.available)
      },
      brands: function() {
        const brands = this.products.map(p => p.brand);
        return Array.from(new Set(brands)).sort((a, b) => a > b)
      }
    }
  }
</script>


<style lang="scss">
.home {
  height: 100vh;
}

.master-container {
  display: flex;
}

.menu {
  flex: 1;
}

.ghostwhite {
  background-color: ghostwhite;
}

.products-container {
  flex: 4;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  padding: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 4px;
  margin: 0 10px 20px 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  flex: 1 225px;
  flex-grow: 0;
  transition: all 0.1s;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
  }

  .product-thumb {
    background-color: lightgrey;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    padding-bottom: 60%;

    &.bird-rock-coffee-roasters {
      background-color: cadetblue;
    }
    &.cafe-moto {
      background-color: ghostwhite;
    }
    &.caffe-calabria {
      background-color: dimgray;
    }
    &.cafe-virtuoso {
      background-color: darkkhaki;
    }
    &.dangerous-coffee-co {
      background-color: goldenrod;
    }
    &.dark-horse-coffee-roasters {
      background-color: lavender;
    }
  }

  .product-details {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.subtitle-note:not(:last-child) {
  margin-bottom: 1em;
}

.greeting-hero {
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.greeting-hero-details-container {
  margin-right: 5%;
}

.greeting-hero-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;

  img {
    min-width: 250px;
    border-radius: 4px;
    box-shadow: 0px 2px 2px 0px black;
  }
}

.menu-list {
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.product-card-group-enter, .product-card-group-leave-to
/* .product-card-group-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.product-card-group-leave-active {
  position: absolute;
}

.brand-select {
  display: none;
}

@media screen and (max-width: 1500px) {
  .product {
    flex: 1 22%;
  }
}

@media screen and (max-width: 1200px) {
  .product {
    flex: 1 30%;
  }
}

@media screen and (max-width: 804px) {
  .product {
    flex: 1 100%;
    flex-direction: row;

    .product-thumb {
      padding-bottom: 0;
      padding-right: 30%;
      width: 125px;
    }

    .add-to-cart {
      align-self: flex-start;
    }
  }

  .master-container {
    display: block;
  }

  .brand-menu {
    display: none;
  }

  .brand-select {
    display: inline-block;
  }
}
</style>