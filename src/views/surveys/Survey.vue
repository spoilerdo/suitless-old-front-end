<template>
    <v-layout align-center justify-center row>
        <Category/>
        <Category/>
        <Category/>
    </v-layout>
</template>

<script>
import Category from '@/components/survey-category/Category';
export default {
    components: {
        Category
    }
};
</script>