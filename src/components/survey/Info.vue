<template>
    <v-scale-transition>
        <v-card v-if="reason !== undefined">
             <v-card-title primary-title class="grow mb-3">
                <v-layout align-center justify-center row>
                    <h3 class="headline mb-0">Info</h3>
                </v-layout>
            </v-card-title>
            <v-card-actions class="action-card">
                <v-layout align-center justify-center row>
                    {{reason.value}}
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-scale-transition>
</template>

<script>
export default {
    data() {
        return {
            reason: undefined
        }
    },
    props: ["question"],
    mounted() {
        this.reason = this.question.lincData.find(data => data.key === "reason");
    }
}
</script>
