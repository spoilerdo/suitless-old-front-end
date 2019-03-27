<template>
  <vue-particles
    class="particles"
    color="#fff"
    :particleOpacity="0.7"
    :particlesNumber="50"
    shapeType="polygon"
    :particleSize="4"
    :lineLinked="false"
    :hoverEffect="false"
    :clickEffect="false"
    :moveSpeed="0.8"
  ></vue-particles>
</template>

<style>
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #30002a 0%, #434343 74%);
}
#app {
    background: #30002a !important;
}
</style>
