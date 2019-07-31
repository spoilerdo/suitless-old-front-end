<template>
    <v-alert 
        :value="value"
        :type="type"
        :icon="icon"
        :outline="outline"
        >{{ text }}</v-alert>
</template>

<script>
export default {
    props:{
        value: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        outline: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{ 
            icon: null
        }
    },
    mounted(){
        //I want a new default theme for the alert and I want it to have a icon
        //So i just override the default icons of all the theme options with a switch
        switch(this.type) {
            case "success":
                this.icon="mdi-check-circle";
                break;
            case "info":
                this.icon="mdi-information";
                break;
            case "warning":
                this.icon="mdi-exclamation";
                break;
            case "error":
                this.icon="mdi-alert";
                break;
            default:
                this.icon="mdi-arrow-right-bold";
                break;
        }
    }
}
</script>
