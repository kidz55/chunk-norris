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
      Overview: defineAsyncComponent(() => import('./views/Overview.vue')),
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
  .section-search-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin: 4rem auto 2rem auto;
    max-width: 54rem;
    animation: 220ms appearTop cubic-bezier(0.15, 0.75, 0.5, 1.5);

    @media (min-width: $device-large) {
      min-height: 50vh;
    }
  }
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
