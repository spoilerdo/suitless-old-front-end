<template>
  <v-container class="section">
    <v-layout class="background-content-container" column fill-height>
      <v-flex xs12 sm6 md8>
        <v-layout column align-center justify-center fill-height>
          <div class="display-2 text-xs-center red--text bold">How we do it!</div>
          <div
            class="display-1 text-xs-center"
            style="color: #666666; max-width: 70%;"
          >A law and tax incubator in which students provide legal and tax advice to startups, under the supervision of law firms and tax consultans</div>
        </v-layout>
      </v-flex>

      <v-layout align-start justify-space-between row fill-heights wrap style="justify-content: center">
        <v-flex xs12 sm8 md4 pl-4 pr-4 style="padding: 30px 0px">
          <v-img :src="Students" aspect-ratio="1" contain max-height="100"/>
          <br>
          <div class="display-1 text-xs-center bold">Students</div>
          <br>
          <div class="textSize text-xs-center">
            The incubator works with master's students from Tilburg University, from the masters Law and Technology and (International) Business law.
            The students will work for the incubator 8 - 12 hours per week.
            During this time the students will research the legal and tax issues of the start-up, make legal and tax documents for the start-up and meet with lawyers to evaluate their findings.
            This way: students obtain practical experience from a first-hand source, and get feedback from lawyers from established law firms.
          </div>
        </v-flex>
        <v-flex xs12 sm8 md4 pl-4 pr-4 style="padding: 30px 0px">
          <v-img :src="Startups" aspect-ratio="1" contain max-height="100"/>
          <br>
          <div class="display-1 text-xs-center bold">Startups</div>
          <br>
          <div class="textSize text-xs-center">
            Every start-up gets in touch with our legal and tax teams.
            The legal teams will work on the basic legal documents and memo's needed to safely operate in the applicable market.
            The tax-team will focus on pointing the startup towards the optimal tax structure.
            The start-up will have to spend a maximum of two hours per week to help students get all the information they need.
            In return the start-ups will be provided with good quality legal and tax support, an insight in their tax position and high level legal documents.
          </div>
        </v-flex>
        <v-flex xs12 sm8 md4 pl-4 pr-4 style="padding: 30px 0px">
          <v-img :src="LawFirms" aspect-ratio="1" contain max-height="100"/>
          <br>
          <div class="display-1 text-xs-center bold">Law Firms</div>
          <br>
          <div class="textSize text-xs-center">
            All students that work for ehvLINC are assigned an advisary law or tax firm, which firm will funciton as a mentor.
            Law firms review the work done by the students, this way high quality is assured.
            The law firms are asked to spend 2 hours a week per start-up.
            By working with the start-ups the law firms have a chance to interact with entrepreneurs, whom can give them an insight in how to approach the start-up scene.
            The law firms will also get to know the master’s students, which could be their future employees.
          </div>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      Students: "http://ironsm4sh.nl:3305/Students",
      Startups: "http://ironsm4sh.nl:3305/Startups",
      LawFirms: "http://ironsm4sh.nl:3305/LawFirms"
    };
  }
};
</script>

<style>
.textSize {
  font-size: 1.4em;
  text-align: justify!important;
  font-weight: bold;
}
</style>
