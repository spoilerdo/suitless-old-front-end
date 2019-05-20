<template>
    <v-card color="" class="questionCard" elevation-4 max-width="300px" max-height="300px" v-bind:class="{selectedCard: selected }">
            <v-img
            v-if="image !== undefined"
            :src="image"
            max-height="90px"
            min-height="45px"
            contain
            @click="onSelect()"
            ></v-img>
            
            <v-card-title primary-title>
                <div class="headline">{{text}}</div>
            </v-card-title>
    </v-card>
</template>

<style scoped>
    .questionCard {
        color: rgba(0, 0, 0, 0.6);
        border-top: 4px solid #e5e5e5;
        border-bottom: 4px solid #e5e5e5;
        border-left: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
    }
    .selectedCard {
        background-color: rgba(194, 52, 76, .6);
        border-color: rgba(192, 24, 51, .6);
    }
</style>


<script>
export default {
    props: {
        text: String,
        image: {
            type: String,
            default: undefined
        },
        answer: {
            type: Object
        }
    },
    data() {
        return {
            selected: false
        }
    },
    methods: {
        onSelect() {
            this.$emit('selectedAnswer', this.answer)
        },
        setSelected(selected) {
            this.selected = selected;
        }
    }
}
</script>
