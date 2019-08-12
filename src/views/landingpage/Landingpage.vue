<template>
<full-page ref="fullpage" :options="options">
  <v-container class="section" fluid pa-0 ma-0>
    <LoginNavbar class="absolute"/>
    <Animatedbackground colorA="#30002a 0%" colorB="#232323 25%" colorC="#eeeeee 25.1%" v-once/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex xs12 sm6 md5 class="center" style="justify-content: center;">
        <v-img :src="ehvLogo" aspect-ratio="1" contain class="flex xs6"/>
      </v-flex>
      
      <v-flex xs12 sm6 md5>
        <div class="display-2 text-xs-center white--text pb-3">Make your company legally ready!</div>
        <div class="text-xs-center">
          <v-btn to="/landingregister" class="primary" large>Start</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center> 
        <i @click="$refs.fullpage.api.moveSectionDown()" class="down"/>
    </v-layout>
  </v-container>

  <WhyThisSite/>

  <WhatWeDo/>

  <HowWeDoIt/>

  </full-page>
</template>

<style scoped>
.absolute{
  position: absolute;
  top:0px;
  right:0px;
  z-index: 100;
}

i {
  border: solid white;
  border-width: 0 10px 10px 0;
  display: inline-block;
  padding: 30px;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-bottom: 250px;
}

.bold {
    font-weight: bold;
}

.logo-text {
  font-weight: bold;
  font-size: 36px !important;
  color: white;
  text-align: center;
}
</style>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import Animatedbackground from "@/components/background/Animatedbackground";
import LoginNavbar from "@/components/login/LoginNavbar";
import WhyThisSite from "@/components/landingpage/WhyThisSite";
import WhatWeDo from "@/components/landingpage/WhatWeDo";
import HowWeDoIt from "@/components/landingpage/HowWeDoIt";
import theme from "@/plugins/vuetify/theme";
import { CDN_URL } from "@/store/generalconstants";
import { mapActions } from "vuex";

//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState } = createNamespacedHelpers("app/");

/**
 * Returns the landing page, the page most users see when the open the website.
 * @memberof view
 */
export default {
  name: "landingPage",
  components: {
    Animatedbackground,
    LoginNavbar,
    WhyThisSite,
    WhatWeDo,
    HowWeDoIt
  },
  data: () => {
    return {
      ehvLogo: `${CDN_URL}/LogoWhite`,
      options: {
        anchors: ['Landing', 'Intro', 'WhatWeDo', 'HowWeDoIt']
      }
    };
  },
  methods: {
    ...mapActions("app/", ["setBackground"])
  },
  created() {
    this.setBackground(theme.landingBackground);
  },
  computed: {
    ...mapState(["newUser"])
  },
  beforeMount() {
    if (!this.newUser) {
      this.$router.push("/dashboard");
    }
  }
};
</script>