<template>
  <v-layout align-center justify-center row>
    <Container
      @drop="onDrop($event)"
      non-drag-area-selector=".field"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :class="{isActive: true}"
      class="dnd-container"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable v-for="(answer, index) in testflows" :key="index">
        <v-layout align-center justify-center row>
          <!-- question card for single answer questions -->
          <ActionCard
            @action="selectAnswer"
            :id="'question-' + answer.targetID"
            :parameter="answer"
            :text="getText(answer)"
            :imageName="getImageName(answer)"
            selection
            color="primary"
            style="margin:10px"
            ref="question"
          />
        </v-layout>
      </Draggable>
    </Container>
  </v-layout>
</template>

<style scoped>
.action-card {
  min-height: 62px;
}
.dnd-container {
  width: 100%;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}
</style>

<script>
import ActionCard from "@/components/material/ActionCard.vue";

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/plugins/smooth-dnd/helpers";

export default {
  components: {
    ActionCard,
    Container,
    Draggable
  },
  props: {
    flows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      testflows: this.flows
    };
  },
  methods: {
    getText(answer) {
      return answer.lincData.find(data => data.key === "answer").value;
    },
    getImageName(answer) {
      return answer.lincData.find(data => data.key === "imageName").value;
    },
    selectAnswer(answer) {
      this.$emit("selectAnswer", {
        selectAnswer: answer,
        question: this.$refs.question
      });
    },
    onDrop(dropResult) {      
      const newFlows = applyDrag(this.testflows, dropResult);
      for (let i = 0; i < newFlows.length; i++) {
        const flow = newFlows[i];
        this.testflows[i].targetID = flow.targetID;
      };
      this.testflows = newFlows;
      //this.flows = applyDrag(this.flows, dropResult);
      //TODO: add function to change the actual storage flow
      //You have a localstorage that needs to be changed but this will be deleted when you cliose the window.
      //SO you can't use it ... You could change the survey_model local storage that is used as a autosave function for the flowchart editor.
      //If you change that than it will befine.
      //HOW TO CHANGE IT:
      //find the question that is currently displayed by the test env
      //get the flow of that question and change it (BY ID OFCOURSE)
    }
  }
};
</script>