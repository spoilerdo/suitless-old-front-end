<template>
    <v-list class="list-width">
      <template v-for="(answer, index) in answers">
        <Alert
          :value="true"
          :type="type"
          :text="answer.implication"
          :key="index + answer.implication"
        />
      </template>
    </v-list>
</template>

<script>
import Alert from "@/components/material/Alert.vue";
/**
 * Returns a list containing all implications.
 * @memberof component.Survey
 */
export default {
  components:{
    Alert
  },
  props: {
    answers: {
      type: Array,
      required: true
    },
    type: { 
      type: String,
      required: true
    }
  }
}
</script>
