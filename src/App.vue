<template>
  <Suspense>
    <template #default>
      <Overview />
    </template>
    <template #fallback>
      <div v-if="!!error" class="error">Ooops, please refresh</div>
    </template>
  </Suspense>
</template>

<script>
  import { defineComponent, defineAsyncComponent, ref, onErrorCaptured } from 'vue';
  export default defineComponent({
    name: 'App',
    components: {
      Overview: defineAsyncComponent(() => import('./views/Overview.vue'))
    },
    setup() {
      const error = ref();
      onErrorCaptured((err) => {
        error.value = err;
        return true;
      });
      return {
        error
      };
    }
  });
</script>

<style>
  .title {
    text-align: center;
  }
  .section-categories {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 4rem auto 2rem auto;
  }
  .section-jokes {
    margin: 4rem auto 2rem auto;
  }
  .jokes-selection {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
</style>
