<template>
  <v-card hover ripple :to="redirecturl" class="rounded-card flex xs12">
    <div
      v-if="orientation == 'vertical'"
      class="flex xs12"
      style="align-items: center; justify-content: flex-start;"
    >
      <div v-if="progress != undefined" class="flex xs3 md2 lg1">
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="15"
          :value="Math.random()*100"
          color="primary"
        >
          <v-img
            :src="require(`@/assets/img/illustrations/${imagename}`)"
            :min-width="imageWidth"
            class="gradient flex xs12"
          ></v-img>
        </v-progress-circular>
      </div>
      <div v-else class="flex xs3 md2 lg1">
        <v-img
          :src="require(`@/assets/img/illustrations/${imagename}`)"
          :min-width="imageWidth"
          class="gradient flex xs12"
        ></v-img>
      </div>
      <div class="card-text flex xs9 md10 lg11">
        <div style="padding-left: 30px;">{{ percentage }}</div>
        <div class="card-title">
          <span>{{title}}</span>
        </div>
        <div class="card-description">{{description}}</div>
      </div>
    </div>
    <div v-else class="flex xs12">
      <v-img
        :src="require(`@/assets/img/illustrations/${imagename}`)"
        :min-width="imageWidth"
        class="gradient flex xs12"
      ></v-img>
      <div class="card-text flex xs12">
        <div class="card-title">
          <span>{{title}}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style>
.rounded-card {
  margin: 0% 2%;
}

.v-progress-circular__info {
  width: 50%;
}
</style>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}

.card-title {
  padding-left: 15px;
  font-weight: bold;
}

.card-description {
  padding-left: 10px;
  font-size: 1.5625rem;
}

.rounded-card {
  border-radius: 35px;
  display: flex;
  padding: 10px 25px !important;
}

.card-text {
  font-size: 1.5625rem;
}
</style>

<script>
export default {
  name: "ListCard",
  props: {
    redirecturl: String,
    imagename: String,
    imageWidth: {
      type: String,
      default: '100%'
    },
    text: String,
    percentage: String,
    title: String,
    description: String,
    orientation: String,
    progress: {
      type: String,
      default: undefined
    }
  }
};
</script>
