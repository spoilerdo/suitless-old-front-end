<template>
  <v-flex grow xs12>
    <Card
      color="primary"
      :title="title"
      :text="subTitle"
    >
      <v-layout row wrap class="card-height">
        <div
          v-for="s in items.slice(0, itemCount)"
          :key="s.moduelID"
          class="text-xs-center flex md3 xs12"
          style="padding-bottom: 15px;"
        >
          <ActionCard
            @action="redirecturl"
            :parameter="`/survey/${s.moduleID}`"
            :imageName="s.lincData[0].value"
            :text="s.name"
            rounded
          />
        </div>
      </v-layout>
      <v-layout align-end justify-end row>
        <v-btn class="primary" v-on:click="updateList()" large>{{ btnText }}</v-btn>
      </v-layout>
    </Card>
  </v-flex>
</template> 

<style scoped>
.card-heigth {
  max-height: 573px;
  overflow-y: auto;
}
</style>


<script>
import Card from "@/components/material/Card";
import ActionCard from "@/components/material/ActionCard";
import { mapState } from "vuex";

/**
 * Returns a view containing all surveys.
 * @memberof component.Dashboard
 */
export default {
  components: {
    Card,
    ActionCard
  },
  props:{
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: ""
    },
    itemLimit: {
      type: Number,
      default: 3
    },
    buttonText: {
      type: String,
      default: "Show more"
    },
    buttonTextPressed: {
      type: String,
      default: "Show less"
    },
    items: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      itemCount: this.itemLimit,
      btnText: this.buttonText
    }
  },
  methods: {
    updateList() {
      if (this.itemCount != this.items.length) {
        this.itemCount = this.items.length;
        this.btnText = this.buttonTextPressed;
      } else {
        this.itemCount = this.itemLimit;
        this.btnText = this.buttonText;
      }
    },
    redirecturl(url) {
      this.$router.push(url);
    }
  }
};
</script>
