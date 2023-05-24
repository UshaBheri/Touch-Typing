import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import Slider from 'react-slick'

import App from '../App'

const homeRoutePath = '/'

const userStoriesResponse = {
  users_stories: [
    {
      user_id: 'Arjun_Mark',
      user_name: 'Arjun Mark',
      story_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-2-img.png',
    },
    {
      user_id: 'Gautam_Rajadhyaksha',
      user_name: 'Gautam Rajadhyaksha',
      story_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-3-img.png',
    },
    {
      user_id: 'Prabuddha_Dasgupta',
      user_name: 'Prabuddha Dasgupta',
      story_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-4-img.png',
    },
    {
      user_id: 'Atul_Kasbekar',
      user_name: 'Atul Kasbekar',
      story_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-5-img.png',
    },
    {
      user_id: 'Dayanita_Singh',
      user_name: 'Dayanita Singh',
      story_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-6-img.png   ',
    },
  ],
  total: 9,
}

const postsResponse = {
  posts: [
    {
      post_id: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
      user_id: 'Varun_Aadithya',
      user_name: 'Varun Aadithya',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
        caption: 'Another day, another sunrise',
      },
      comments_count: 2,
      likes_count: 7,
      comments: [
        {
          user_name: 'Prabuddha Dasgupta',
          user_id: 'Prabuddha_Dasgupta',
          comment: 'Lightning is incredible.',
        },
        {
          user_name: 'Gautam Rajadhyaksha',
          user_id: 'Gautam_Rajadhyaksha',
          comment: 'The Earth laughs in flowers.',
        },
      ],
      created_at: '4 Hours Ago',
    },
    {
      post_id: '2844b49e-28ad-413f-9846-8b9005ed9f6f',
      user_id: 'Dabboo_Ratnani',
      user_name: 'Dabboo Ratnani',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-11-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-2-img.png',
        caption: '#Nofilter needed,',
      },
      comments_count: 2,
      likes_count: 8,
      comments: [
        {
          user_name: 'Varun Aadithya',
          user_id: 'Varun_Aadithya',
          comment: 'Beauty is power; a smile is its sword.',
        },
        {
          user_name: 'Atul Kasbekar',
          user_id: 'Atul_Kasbekar',
          comment: 'Someone looked pretty today.',
        },
      ],
      created_at: 'August 21',
    },
  ],
}

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-share/stories'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}
const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

let spyFetch

const renderReactSlickInTheDOM = async () => {
  const userStoriesPromise = Promise.resolve(userStoriesResponse)
  const postsPromise = Promise.resolve(postsResponse)

  spyFetch = jest.spyOn(window, 'fetch').mockImplementation(url => {
    if (url === userStoriesAPIURL) {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () => userStoriesPromise,
      })
    }
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => postsPromise,
    })
  })

  const div = document.createElement('div')
  document.body.appendChild(div)
  const wrapper = mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    {attachTo: div},
  )

  await act(() => userStoriesPromise)
  await act(() => postsPromise)

  await wrapper.update()

  return wrapper
}

describe(':::RJSCPU2OLA_TEST_SUITE_6:::React Slick tests', () => {
  beforeEach(() => {
    mockGetCookie()
    window.history.pushState({}, 'Test page', homeRoutePath)
  })

  afterEach(() => {
    jest.spyOn(window, 'fetch').mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_127:::When the HTTP GET requests of Home Route are successful, then the page should consist of a "react-slick" third party library to display stories list:::10:::', async () => {
    const wrapper = await renderReactSlickInTheDOM()
    expect(wrapper.find(Slider)).toHaveLength(1)
    spyFetch.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_128:::When the HTTP GET requests of Home Route are successful, then the page should consist of a "react-slick" third party library with all the user story images with src value as the key "profile_pic" received from userStoriesResponse:::10:::', async () => {
    const wrapper = await renderReactSlickInTheDOM()

    const {users_stories} = userStoriesResponse
    const imageOne = users_stories[0].story_url
    const imageTwo = users_stories[1].story_url
    const imageThree = users_stories[2].story_url
    const imageFour = users_stories[3].story_url

    expect(
      wrapper.find('.slick-slide.slick-active').at(0).find('img').prop('src'),
    ).toEqual(imageOne)
    expect(
      wrapper.find('.slick-slide.slick-active').at(1).find('img').prop('src'),
    ).toEqual(imageTwo)
    expect(
      wrapper.find('.slick-slide.slick-active').at(2).find('img').prop('src'),
    ).toEqual(imageThree)
    expect(
      wrapper.find('.slick-slide.slick-active').at(3).find('img').prop('src'),
    ).toEqual(imageFour)
    spyFetch.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_129:::When the HTTP GET requests of Home Route are successful, then the page should consist of a "react-slick" third party library with all the user names received from the key "user_name" from useStoriesResponse:::10:::', async () => {
    const wrapper = await renderReactSlickInTheDOM()

    const {users_stories} = userStoriesResponse
    const userOne = users_stories[0].user_name
    const userTwo = users_stories[1].user_name
    const userThree = users_stories[2].user_name
    const userFour = users_stories[3].user_name

    expect(wrapper.find('.slick-slide.slick-active').at(0).text()).toMatch(
      userOne,
    )
    expect(wrapper.find('.slick-slide.slick-active').at(1).text()).toMatch(
      userTwo,
    )
    expect(wrapper.find('.slick-slide.slick-active').at(2).text()).toMatch(
      userThree,
    )
    expect(wrapper.find('.slick-slide.slick-active').at(3).text()).toMatch(
      userFour,
    )
    spyFetch.mockRestore()
  })
})
