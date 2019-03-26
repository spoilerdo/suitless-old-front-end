<template>
 <v-container fill-height fluid grid-list-sm>
   <Card
      color="primary" 
      title="Recommended Surveys"
      text="Surveys we recommend for you based on previous input"
      width="100%">
      <v-layout row wrap>
        <v-flex v-for="i in 3" :key="`4${i}`" md4 xs4 class="text-xs-center">
            <v-card>
              <v-avatar size="70" color="purple red--after">
                <v-icon 
                  size="40" 
                  dark slot-scope="{hover}" :class="`elevation-${hover ? 12 : 2}`"
                >
                  notifications
              </v-icon>
              </v-avatar>
              
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                  <div> Mooie tekst </div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>


          <!-- <v-avatar size="70" color="purple red--after">
            <v-hover>
              <v-icon 
              size="40" 
              dark slot-scope="{hover}" :class="`elevation-${hover ? 12 : 2}`"
              >
                notifications
              </v-icon>
            </v-hover>
          </v-avatar>
          <v-card-text>
            <b>test</b>
          </v-card-text> -->
        </v-flex>
      </v-layout>
    </Card>
  </v-container>

</template>

<script>
import Card from '@/components/material/Card'

export default {
  components: {
    Card
  },
  data() {
    return {
      messages: [
        {
          id: "0",
          title: "a law has changed",
          date: "14-2-2019 13:00"
        },
        {
          id: "0",
          title: "your results",
          date: "14-2-2019 13:00"
        },
        {
          id: "0",
          title: "welcome!",
          date: "14-2-2019 13:00"
        }
      ],
      items: [
        {
          id: "0",
          name: "IP",
          link: "LINK TO FLOWCHART",
          date: "15-2-2019 15:00"
        },
        {
          id: "1",
          name: "Privacy",
          link: "LINK TO FLOWCHART",
          date: "14-2-2019 13:00"
        },
        {
          id: "2",
          name: "Property",
          link: "LINK TO FLOWCHART",
          date: "22-1-2019, 16:34"
        },
        {
          id: "0",
          name: "IP",
          link: "LINK TO FLOWCHART",
          date: "15-2-2019 15:00"
        },
        {
          id: "1",
          name: "Privacy",
          link: "LINK TO FLOWCHART",
          date: "14-2-2019 13:00"
        },
        {
          id: "2",
          name: "Property",
          link: "LINK TO FLOWCHART",
          date: "22-1-2019, 16:34"
        }
      ],
      recommendedItems: [
        {
          id: "0",
          name: "IP",
          link: "LINK TO FLOWCHART",
          date: "15-2-2019 15:00"
        },
        {
          id: "1",
          name: "Privacy",
          link: "LINK TO FLOWCHART",
          date: "14-2-2019 13:00"
        },
        {
          id: "2",
          name: "Property",
          link: "LINK TO FLOWCHART",
          date: "22-1-2019, 16:34"
        }
      ],
      reports: [
        {
          surveyId: "0",
          date: "3-8-2011 12:95"
        },
        {
          surveyId: "1",
          date: "3-6-1929 32:11"
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
};
</script>
