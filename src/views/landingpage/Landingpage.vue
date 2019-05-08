<template>
<full-page ref="fullpage" :options="options">
  <v-container class="section" fluid pa-0 ma-0>
    <LoginNavbar class="absolute"/>
    <Animatedbackground v-once/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex xs12 sm6 md5>
        <v-img :src="ehvLogo" aspect-ratio="1" contain max-height="300"/>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <div class="display-2 text-xs-center white--text pb-3">make your company legally ready</div>
        <div class="text-xs-center">
          <v-btn to="/landingregister" class="primary" large>Start</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center> 
        <i @click="$refs.fullpage.api.moveSectionDown()" class="down"/>
    </v-layout>
  </v-container>

  <v-container class="section">
    
  </v-container>

  </full-page>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import Animatedbackground from "@/components/background/Animatedbackground";
import LoginNavbar from "@/components/login/LoginNavbar";
import { mapActions } from "vuex";

//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState } = createNamespacedHelpers("app/");

export default {
  name: "landingPage",
  data: () => {
    return {
      ehvLogo: require("@/assets/img/logoehvlinc.png"),
      options: {
        anchors: ['landing', 'info']
      }
    };
  },
  components: {
    Animatedbackground,
    LoginNavbar
  },
  methods: {
    ...mapActions({
      setBackground: "app/setBackground"
    })
  },
  created() {
    this.setBackground("#30002a");
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

<style>
.absolute{
  position: absolute;
  top:0px;
  right:0px;
  z-index: 100;
}

i {
  border: solid white;
  border-width: 0 15px 15px 0;
  display: inline-block;
  padding: 40px;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-bottom: 250px;
}
</style>
