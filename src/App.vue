<template>
  <div class="container">
    <h1 class="title">Chunk Norris generator</h1>
    <div class="section-search-bar">
      <search-bar />
    </div>
    <div class="section-categories">
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
      <Checkbox name="category1" label="label" />
    </div>
    <div class="section-jokes">
      <div class="jokes-selection">
        <a>main</a>
        <a>My favs</a>
      </div>
      <div class="joke-list">
        <JokeList :jokes="selectedJokes"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import SearchBar from './components/SearchBar.vue';
  import Checkbox from './components/Checkbox.vue';
  import JokeList from './components/JokeList.vue';

  export default defineComponent({
    name: 'App',
    components: { SearchBar, Checkbox, JokeList },
    setup() {
      console.log('yoo');
      return {
        selectedJokes: [{
          value:'joke 1',
          id:'1'
        },
        {
          value:'joke 2',
          id:'2'
        }]
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
