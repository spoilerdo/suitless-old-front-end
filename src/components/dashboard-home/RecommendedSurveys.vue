<template>
  <v-layout fill-height fluid grid-list-sm>
    <Card
      color="primary"
      title="Recommended Surveys"
      text="Surveys we recommend for you based on previous input"
      class="flex xs12 md12"
      icon="mdi-format-list-bulleted"
      style="display: flex; flex-wrap: wrap;"
    >
      <v-layout row wrap>
        <div class="flex xs4">
          <ListCard redirecturl="/survey" imagename="IP.svg" title="Intellectual Property" orientation="horizontal"/>
        </div>
        <div class="flex xs4">
          <ListCard redirecturl="/survey" imagename="Privacy.svg" title="Intellectual Property" orientation="horizontal"/>
        </div>
        <div class="flex xs4">
          <ListCard redirecturl="/survey" imagename="Trademark.svg" title="Intellectual Property" orientation="horizontal"/>
        </div>

        <!-- </div> -->

        <!-- </v-flex> -->
      </v-layout>
    </Card>
  </v-layout>
</template>

<script>
import Card from "@/components/material/Card";
import ListCard from "@/components/material/ListCard";

/**
 * Returns a view containing all of the recommended surveys, these are currently hard-coded.
 * @memberof component.Dashboard
 * @todo remove mock data
 */
export default {
  components: {
    Card,
    ListCard
  },
  data() {
    return {};
  }
};
</script>
