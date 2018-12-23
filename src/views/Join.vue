<template>
  <v-app>
    <v-content>
      <v-toolbar app dark>
        <!-- <a class="brand-logo" href="http://localkrave.com">
          <img v-bind:src="`localkravebrand.png`" alt="Local Krave">
        </a> -->
        <v-toolbar-title class="headline text-uppercase">
          <span>Local Krave Market</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fill-height fluid justify-center class="background">
        <v-flex xs8>
          <div class="cta mb-5 text-xs-center">
            <h3 class="display-1 mb-0 font-weight-light mb-5">
              Join and get <span class="font-weight-bold">20% discounts</span> on all purchases and access to our members-only Marketplace for just $20/month.
            </h3>
            <div class="subheading">
              * Our Marketplace allows any members to
              buy beans, ground or whole, from local coffee shops
              around San Diego with <span class="font-weight-bold">free shipping</span>.
            </div>
          </div>
          <div class="cta-actions">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 sm6 md5>
                  <v-text-field
                    solo
                    v-model="member.email"
                    label="Email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md4>
                  <v-text-field
                    solo
                    v-model="member.number"
                    label="Phone Number"
                    :rules="numberRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn block color="orange">
                    Join
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </div>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // import { PRODUCTS_COLLECTION } from '../configs';

  export default {
    components: {
    },
    data() {
      return {
        valid: false,
        member: {
          email: '',
          number: '',
        },
        emailRules: [],
        numberRules: []
      }
    },
    created() {
    },
    methods: {
    },
    computed: {
    }
  }
</script>


<style lang="scss">
  .brand-logo,
  .brand-logo img {
    max-height: 40px;
  }
  .container {
    padding: 0;
  }
  .background {
    background-image: url(https://scontent-lax3-1.cdninstagram.com/vp/739d95b1a47ba4c5a504ec356af26bf7/5CAC5009/t51.2885-15/e35/36910254_2008362826140409_3771233984583827456_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    border-top: 3px solid orange;

    &:before {
      background-image: linear-gradient(to top right, rgba(100,115,201,.33), rgba(25,32,72,.7));
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      // opacity: 0.8;
    }
  }

  .cta {
    position: relative;
    color: white;
    // background: rgba(25,32,72,.5);
    // background-image: linear-gradient(to top right, rgba(25,32,72,.7), rgba(100,115,201,.33) );
    // background: rgba(100,115,201,.5);
    // background: rgba(157,117,88, .6);
    // background: rgba(25,32,72,.7);
    background: rgba(32,27,48, .4);

    padding: 20px;
  }


</style>