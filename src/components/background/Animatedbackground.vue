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
    :moveSpeed="0.3"
  ></vue-particles>
</template>

<style>
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  /*background: linear-gradient(to top, #30002a 0%, #434343 74%);*/
  background: #30002a; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #30002a 0%,
    #232323 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #30002a 0%,
    #232323 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #30002a 0%,
    #232323 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#30002a', endColorstr='#232323',GradientType=0 );
}
</style>