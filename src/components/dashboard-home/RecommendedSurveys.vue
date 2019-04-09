<template>
 <v-layout fill-height fluid grid-list-sm>
   <Card
      color="primary" 
      title="Recommended Surveys"
      text="Surveys we recommend for you based on previous input"
      >
      <v-layout row wrap>
        <v-flex v-for="i in 4" :key="`4${i}`" class="text-xs-center">
            <CustomCard redirecturl="/survey"  imagename="IP.svg" text="Intellectual Property"/>
        </v-flex>
      </v-layout>
    </Card>
 </v-layout>
</template>

<script>
import Card from '@/components/material/Card'
import CustomCard from "@/components/login-landingpage/CustomCard";

export default {
  components: {
    Card,
    CustomCard
  },
  data() {
    return {
    };
  },
};
</script>
