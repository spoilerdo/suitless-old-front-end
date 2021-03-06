<template>
  <v-card v-bind="$attrs" :style="styles" v-on="$listeners">
    <Offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
      class="flex xs12"
    >
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <slot v-if="!title && !text" name="header"/>
        <span v-else>
          <div style="display: flex;">
            <div style="display: flex;">
              <v-icon v-if="icon != undefined" size="40" style="margin-right: 15px;">{{icon}}</v-icon>
            </div>
            <div style="display: flex; flex-direction: column;">
              <h4 class="title font-weight-light mb-2" v-text="title" v-if="title !== undefined"/>
              <p class="category font-weight-thin white--text" v-text="text"/>
            </div>
          </div>
        </span>
      </v-card>
      <slot v-else name="offset"/>
    </Offset>

    <v-card-text>
      <slot/>
    </v-card-text>

    <v-divider v-if="$slots.actions" class="mx-3"/>

    <v-card-actions v-if="$slots.actions">
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import Offset from "@/components/helper/Offset";

/**
 * Returns a material design card to be used in other components
 * @memberof component.Material
 * @property {String} color
 * @property {Number} elevation
 * @property {Boolean} inline
 * @property {Boolean} fullWidth
 * @property {Number} offset
 * @property {String} title
 * @property {String} text
 * @property {String} icon
 */
export default {
  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  components: {
    Offset
  },
  computed: {
    hasOffset() {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      );
    },
    styles() {
      if (!this.hasOffset) return null;

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}
</style>
