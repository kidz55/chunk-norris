import { shallowMount } from '@vue/test-utils'
import JokeList from '@/components/JokeList'

describe('Jokes.vue', () => {
  let wrapper;
  const  jokes = [
    {
    "id": "nh-b9HjySpeRGeHG5qATEQ", 
    "value": "Chuck Norris washes his hands in the Pacific ocean, and air dries them in tornadoes."
  }, 
  {
    "id": "YuFHInTXRmuWpm3Em2-FqQ", 
    "value": "Jesus walked on water. Chuck Norris skipped through air."
  }, 
  {
    "id": "yg5hf4TbTQicAG3ewkfoWQ", 
    "value": "Chuck Norris once turned Medusa to stone"
  }]
  beforeEach(() => {
    wrapper = shallowMount(JokeList, {
      propsData: {
        jokes,
        isLoading: false,
      }
    })
  })
  it('should render the section correctly', () => {
    expect(wrapper.find('[data-test-joke-list]').exists()).toBeTruthy()
    expect(wrapper.findAll('[data-test-joke]')).toHaveLength(3)
  })
  it('should show the loader when loading', async () => {
    await wrapper.setProps({
      isLoading: true
    })
    expect(wrapper.find('[data-test-joke-list]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-list-loading]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke]').exists()).toBeFalsy()
  })
  it('should show a message whne joke list is empty', async () => {
    await wrapper.setProps({
      jokes: []
    })
    expect(wrapper.find('[data-test-no-joke]').exists()).toBeTruthy()
  })
})
