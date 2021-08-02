<template>
  <div class="search-bar">
    <form class="search-form" @submit.prevent="onSubmit">
      <fieldset class="search-controls">
        <input
          v-model="searchInputValue"
          type="search"
          class="search-input"
          placeholder="Search for the best joke"
          autofocus
          data-test-search-bar-input
        />
        <ActionButton class="action-submit" type="submit" data-test-search-submit @click="onSubmit">
          Search
        </ActionButton>
      </fieldset>
    </form>
    <p v-if="notFound" class="error" data-test-search-bar-error>
      No results found for this search
    </p>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import ActionButton from './ActionButton'
 
export default {
  components: {
    ActionButton
  },
  props: {
    notFound: {
      type: Boolean,
      required: true
    },
  },
  emits: ['on-search'],
  data() {
      return {
        searchInputValue: ''
      };
    },
  computed: {
    trimmedInput() {
      return this.searchInputValue.trim();
    }
  },
  created() {
    this.onSubmit = debounce(this.onSubmit, 1000, { leading: true, trailing: false });
  },
  methods: {
    onSubmit() {
      if (this.trimmedInput) {
        this.$emit('on-search', this.trimmedInput);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    position: relative;
  }

  .search-form {
    position: relative;
    z-index: 2;
    border-radius: 1rem;
    background: rgba(23, 21, 58, 0.55);
    box-shadow: 0 8px 8px rgba(32, 30, 66, 0.5);
    backdrop-filter: blur(16px);
    padding: 1rem;

    @media (min-width: $device-medium) {
      padding: 1rem;
      border-radius: 4rem;
    }
  }

  .search-controls {
    position: relative;
    border: none;
  }

  .search-input {
    width: 100%;
    min-width: 100px;
    margin-bottom: 0.25rem;
    padding: 1rem 1.5rem 1rem 3rem;
    font-family: $font-stack;
    font-size: $size-medium;
    line-height: 1.5rem;
    color: $color-dark;
    background: $color-white;
    border: none;
    border-radius: 2rem;
    transition: all 0.15s ease-out;
    -webkit-appearance: none;

    &:focus-visible {
      outline: 0;
    }

    &::placeholder {
      color: $color-grey-dark;
    }

    @media (min-width: $device-medium) {
      margin-bottom: 0;
    }
  }

  .action-submit {
    float: right;

    @media (min-width: $device-medium) {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      font-size: $size-large;
    }
  }

  .error {
    z-index: 1;
    position: relative;
    bottom: 3.5rem;
    margin-bottom: -3.5rem;
    left: 2rem;
    width: calc(100% - 4rem);
    padding: 3.25rem 1rem 0.5rem 1rem;
    color: $color-light;
    text-align: center;
    background-color: $color-error;
    font-weight: $weight-medium;
    border-radius: 1rem;
    animation: 160ms appearTop cubic-bezier(0.15, 0.75, 0.5, 1.5);

    a {
      color: $color-light;
      text-decoration: underline;
    }

    @media (min-width: $device-medium) {
      left: 8rem;
      width: calc(100% - 16rem);
    }
  }
</style>
