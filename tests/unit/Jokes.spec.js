import { shallowMount } from '@vue/test-utils'
import Jokes from '@/views/Jokes'

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
    wrapper = shallowMount(Jokes, {
      props: {
        jokes,
        isLoading: false
      }
    })
  })
  it('should render the section correctly', () => {
    expect(wrapper.find('[data-test-jokes-section]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-action]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-joke-action-fav]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test-search-bar-input]').exists()).toBeTruthy()
  })
  it('should update favorite list with the passed joke selected', async () => {
    const joke1 = jokes[0]
    wrapper.vm.updateFavorites(jokes[0])
    expect(wrapper.vm.favoriteJokes).toEqual([{ ...joke1 , isSelected: true}])
    wrapper.vm.updateFavorites(jokes[0])
    expect(wrapper.vm.favoriteJokes).toEqual([])
  })
  it('should update the principal list with the selected jokes', () => {
    wrapper.vm.updateFavorites(jokes[0])
    expect(wrapper.vm.selectedJokes[0].isSelected).toBeTruthy()
    expect(wrapper.vm.selectedJokes[1].isSelected).toBeFalsy()
  })
  it('should update the principal list with the filter value', async () => {
    const textInput = wrapper.find('input[type="search"]')
    await textInput.setValue('Medusa')
    expect(wrapper.vm.filteredJokes).toEqual([
      {
        "id": "yg5hf4TbTQicAG3ewkfoWQ",
        "isSelected": false,
        "value": "Chuck Norris once turned Medusa to stone",
      }
    ])
  })
})
