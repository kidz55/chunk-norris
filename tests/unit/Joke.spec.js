import { shallowMount } from '@vue/test-utils'
import Joke from '@/components/Joke'

describe('Joke.vue', () => {
  let wrapper;
  const joke = {
    categories: ['super'],
    "id": "nh-b9HjySpeRGeHG5qATEQ",
    "isSelected": true,
    "value": "Chuck Norris washes his hands in the Pacific ocean, and air dries them in tornadoes."
  }
  beforeEach(() => {
    wrapper = shallowMount(Joke, {
      props: {
        joke,
      }
    })
  })
  it('should render the joke correctly', () => {
    expect(wrapper.find('[data-test-joke]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-action]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-category]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-content]').exists()).toBeTruthy()
    expect(wrapper.vm.category).toEqual('super')
    expect(wrapper.vm.categoryHash).toEqual('')
  })
  it('should emit onToggleFavorite on click', async() => {
    const a = wrapper.find('a')
    await a.trigger('click')
    expect(wrapper.emitted().onToggleFavorite).toBeTruthy()
  })
})
