<template>
  <button
    class="btn"
    type="button"
    role="button"
    :aria-label="text"
    :class="{
      'is-disabled': isDisabled
    }"
    :disabled="isDisabled"
    @click="$emit('click', $event)"
  >
    <span class="btn-label">
      {{ text }}
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      text: {
        type: String,
        required: false,
        default: null
      },
      isDisabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    emits: ['click']
  });
</script>

<style lang="scss" scoped>
  .btn {
    flex-shrink: 0;
    min-width: 5em;
    position: relative;
    cursor: pointer;
    margin: 0;
    padding: 0.6em 1em 0.62em 1em;
    white-space: nowrap;
    word-wrap: break-word;
    text-align: center;
    text-decoration: none;
    outline: none;
    font-family: $font-stack;
    color: $color-light;
    font-size: $size-medium;
    line-height: 1.2em;
    font-weight: $weight-black;
    border-radius: 0.25em;
    text-transform: uppercase;
    overflow: hidden;
    background-color: $color-alpha;
    box-shadow: 0 1px 2px 0 rgba(255, 84, 81, 0.2), 0 1px 3px 0 rgba(255, 86, 81, 0.1);
    transition: box-shadow 0.16s ease-out, background 0.16s ease-out;
    border: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: $device-small) {
      width: 100%;
    }

    &:hover,
    &:focus {
      box-shadow: 0 1px 2px 0 rgba(255, 84, 81, 0.2), 0 1px 3px 0 rgba(255, 86, 81, 0.1),
        -4px 8px 40px rgba(1, 198, 150, 0.5);
      text-decoration: none;
      background-size: 150%;
    }

    &:active {
      margin-top: 1px;
      margin-bottom: -1px;
      box-shadow: none;
    }

    &[disabled],
    &.is-disabled {
      cursor: not-allowed;
      border-color: transparent;
      transition: none;
      background-image: none;
      color: $color-grey-medium;
      box-shadow: none;
      background-color: $color-light;
    }
  }
</style>
