<template>
  <vue-particles
    class="particles"
    color="#fff"
    :particleOpacity="0.7"
    :particlesNumber="60"
    shapeType="polygon"
    :particleSize="2"
    :lineLinked="true"
    :linesWidth="1"
    :lineOpacity="0.5"
    :hoverEffect="false"
    :clickEffect="false"
    :moveSpeed="0.5"
    :style="styles"
  ></vue-particles>
</template>

<script>
export default {
  props: {
    colorA: {
      type: String,
      default: '#30002a 0%'
    },
    colorB: {
      type: String,
      default: '#232323 100%'
    },
    colorC: {
      type: String,
      default: '#eeeeee 101%'
    }
  },
  computed: {
    styles () {
      return {
        background: 'linear-gradient(' + this.colorA + ', ' + this.colorB + ', ' + this.colorC + ')'
      }
    }
  }
}
</script>


<style>
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  /*background: linear-gradient( #30002a 0%, #232323 33.3%, #eeeeee 33.4%);*/
/*
  background: #30002a;
  background: -moz-linear-gradient(
    top,
    #30002a 0%,
    #232323 33%,
    #eee 34%
  );
  background: -webkit-linear-gradient(
    top,
    #30002a 0%,
    #232323 33%,
    #eee 34%
  );
  background: linear-gradient(
    to bottom,
    #30002a 0%,
    #232323 33.3%,
    #eee 33.4%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#30002a', endColorstr='#232323',GradientType=0 );*/
}
</style>