<template>
  <button
    class="btn"
    type="button"
    role="button"
    :aria-label="text"
    :class="{
      'is-disabled': isDisabled,
      'is-loading': isLoading
    }"
    :disabled="isDisabled || isLoading"
    @click="$emit('click', $event)"
  >
    <span class="btn-label">
      {{ text }}
      <slot></slot>
    </span>
    <span v-if="isLoading" class="btn-loader"></span>
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
      },
      isLoading: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    emits: ['click']
  });
</script>

<style lang="scss" scoped>
  .btn-loader {
    display: none;
  }

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

    .btn-label {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
    }

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

    &.is-loading {
      position: relative;
      box-shadow: none;
      background: $color-white;
      color: $color-alpha;
      background-color: $color-white;

      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 50%;
        top: 0;
        right: 0;
        background-color: $color-alpha;
        animation: 0.6s linear infinite loader;
      }

      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 50%;
        right: 0;
        background-color: $color-alpha;
        animation: 0.6s linear infinite loader-reverse;
        animation-delay: 0.3s;
        visibility: hidden;
      }

      .btn-loader {
        display: block;
        position: absolute;
        z-index: 1;
        content: '';
        top: 2px;
        right: 2px;
        bottom: 2px;
        left: 2px;
        border-radius: 1.25em;
        background-color: $color-white;
      }

      .btn-label {
        position: relative;
        z-index: 2;
      }
    }
  }

  @keyframes loader {
    0% {
      left: -100%;
    }

    100% {
      left: 100%;
    }
  }

  @keyframes loader-reverse {
    0% {
      visibility: visible;
      left: 100%;
    }

    100% {
      left: -100%;
    }
  }
</style>
