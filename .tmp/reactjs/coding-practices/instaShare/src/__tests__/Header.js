import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {FaRegComment, FaSearch} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'

const homeRoutePath = '/'

const myProfileRoutePath = '/my-profile'

const userProfileRoutePath = '/users/Varun_Aadithya'

const searchFailure = 'https://apis.ccbp.in/insta-share/posts?search=sky'

const searchPostsAPIUrl = 'https://apis.ccbp.in/insta-share/posts?search=sky'

const userStoriesAPIUrl = 'https://apis.ccbp.in/insta-share/stories'

const postsAPIUrl = 'https://apis.ccbp.in/insta-share/posts'

const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'

const likeOrUnlikeSearchAPIUrl =
  'https://apis.ccbp.in/insta-share/posts/6fb210a9-0c4d-431f-8585-b3a4f065a171/like'

const userProfileAPIUrl =
  'https://apis.ccbp.in/insta-share/users/Varun_Aadithya'

const searchUserProfileAPIUrl =
  'https://apis.ccbp.in/insta-share/users/Atul_Kasbekar'

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
      likes_count: 6,
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
      likes_count: 9,
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

const myProfileResponse = {
  profile: {
    id: 'df3234jkjn2-324sdf1132nnknn-234324234',
    user_id: 'rahul',
    user_name: 'John',
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/profile/instagram-mini-project-profile-1.png',
    followers_count: 289,
    following_count: 12,
    user_bio:
      'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.',
    posts: [
      {
        id: '1a698dc4-sdf6e83-4ede-998e-638305f7aee6',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-31-img.png',
      },
      {
        id: '1a698dc4-sdf6e83-4e222de-sdfsdf998e-638305f7aee6',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-32-img.png',
      },
      {
        id: '4pXoYRUDq',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-35-img.png',
      },
    ],
    posts_count: 3,
    stories: [
      {
        id: '5HJ25nUNJ',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-34-img.png',
      },
    ],
  },
}

const searchResultsResponse = {
  posts: [
    {
      post_id: '6fb210a9-0c4d-431f-8585-b3a4f065a171',
      user_id: 'Atul_Kasbekar',
      user_name: 'Atul Kasbekar',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-5-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-5-img.png',
        caption: 'The sky is the daily bread of the eyes.',
      },
      comments_count: 2,
      likes_count: 9,
      comments: [
        {
          user_name: 'Arjun Mark',
          user_id: 'Arjun_Mark',
          comment:
            'Aim for the sky, but move slowly, enjoying every step along the way.',
        },
        {
          user_name: 'Sooni Taraporevala',
          user_id: 'Sooni_Taraporevala',
          comment: 'The sky is an infinite movie to me.',
        },
      ],
      created_at: '4 Hours Ago',
    },
    {
      post_id: '72a1826b-6455-448a-9482-8edf8bb4e2d0',
      user_id: 'Sooni_Taraporevala',
      user_name: 'Sooni Taraporevala',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-8-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-15-img.png',
        caption: 'Even the birds are chained to the sky.',
      },
      comments_count: 2,
      likes_count: 9,
      comments: [
        {
          user_name: 'Gautam Rajadhyaksha',
          user_id: 'Gautam_Rajadhyaksha',
          comment:
            'You were born with wings, why prefer to crawl through life.',
        },
        {
          user_name: 'Varun Aadithya',
          user_id: 'Varun_Aadithya',
          comment: 'I wish we had all been birds instead.',
        },
      ],
      created_at: '1 Hour Ago',
    },
  ],
  total: 2,
}

const userProfileResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-234324234',
    user_id: 'Varun_Aadithya',
    user_name: 'Varun Aadithya',
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    followers_count: 300,
    following_count: 400,
    user_bio:
      'Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO Ambassador தமிழன்.',
    posts_count: 5,
    posts: [
      {
        id: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
      },
    ],
    stories: [
      {
        id: 'QAeIMOwzK',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-1-img.png',
      },
    ],
  },
}

const searchUserProfileResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-qweqw123312',
    user_id: 'Atul_Kasbekar',
    user_name: 'Atul Kasbekar',
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-5-img.png',
    followers_count: 296,
    following_count: 304,
    user_bio:
      'Atul Kasbekar (born 22 April 1965) is an Indian fashion photographer and Bollywood film producer. He is recognised for his Kingfisher Calendar shoots.',
    posts_count: 3,
    posts: [
      {
        id: '6fb210a9-0c4d-431f-8585-b3a4f065a171',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-5-img.png',
      },
      {
        id: '29e3a940-d491-4595-bc52-1c98db617db3',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-7-img.png',
      },
    ],
    stories: [
      {
        id: 'hpsCUlIY1',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-13-img.png',
      },
      {
        id: 'cQ28FW1iG',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-14-img.png',
      },
    ],
  },
}

const likeOrUnlikeAPIResponse = {message: 'Post has been liked'}

const server = setupServer(
  rest.get(userStoriesAPIUrl, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIUrl, (req, res, ctx) => {
    const query = req.url.searchParams
    const search = query.get('search')

    if (search === 'sky') {
      return res(ctx.json(searchResultsResponse))
    }
    if (search === '~' || search === 'rahul') {
      return res(ctx.json({posts: [], total: 0}))
    }
    return res(ctx.json(postsResponse))
  }),
  rest.get(myProfileUrl, (req, res, ctx) => res(ctx.json(myProfileResponse))),
  rest.post(likeOrUnlikeSearchAPIUrl, (req, res, ctx) =>
    res(ctx.json(likeOrUnlikeAPIResponse)),
  ),
  rest.get(userProfileAPIUrl, (req, res, ctx) =>
    res(ctx.json(userProfileResponse)),
  ),
  rest.get(searchUserProfileAPIUrl, (req, res, ctx) =>
    res(ctx.json(searchUserProfileResponse)),
  ),
)

const mockHomeRouteWithSearchResultsFailureAPIs = () => {
  server.use(
    rest.get(postsAPIUrl, (req, res, ctx) => {
      const query = req.url.searchParams
      const search = query.get('search')

      if (search === 'sky') {
        return res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        )
      }
      if (search === '~' || search === 'rahul') {
        return res(ctx.json({posts: [], total: 0}))
      }
      return res(ctx.json(postsResponse))
    }),
  )
}

const mockHomeRouteSearchWithLikeUnLikeAPIs = () => {
  const spyFetch = jest.spyOn(window, 'fetch').mockImplementation(url => {
    if (url === searchFailure) {
      return {
        ok: true,
        json: () => Promise.resolve(searchResultsResponse),
      }
    }
    if (url === userStoriesAPIUrl) {
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    }
    if (url === likeOrUnlikeSearchAPIUrl) {
      return {
        ok: true,
        json: () => Promise.resolve(likeOrUnlikeAPIResponse),
      }
    }
    return {
      ok: true,
      json: () => Promise.resolve(postsResponse),
    }
  })
  return spyFetch
}

const searchResults = (value = 'sky') => {
  const searchInputEl = screen.getByPlaceholderText(/Search/i, {exact: false})

  expect(searchInputEl).toBeInTheDocument()
  expect(searchInputEl.type).toBe('search')

  userEvent.type(searchInputEl, value)
  expect(searchInputEl).toHaveValue(value)

  const searchIcon = screen.getAllByTestId('searchIcon')
  expect(searchIcon[0]).toBeInTheDocument()

  userEvent.click(searchIcon[0])
}

const likeFirstPostItem = async () => {
  const postsLikeIcons = await screen.findAllByTestId('likeIcon')

  expect(postsLikeIcons[0]).toBeInTheDocument()

  userEvent.click(postsLikeIcons[0])
}

const unLikeFirstPostItem = async () => {
  const postsUnLikeIcons = await screen.findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
  expect(postsUnLikeIcons.length).toBe(1)
  userEvent.click(postsUnLikeIcons[0])
}

const assertHomeRouteUIElements = async () => {
  await screen.findAllByAltText(/user story/i, {
    exact: false,
  })
  const paragraphEl = await screen.findByText(/Another day, another sunrise/i, {
    exact: false,
  })
  expect(paragraphEl).toBeInTheDocument()
}

const assertFirstPostLikeIcon = async () => {
  const postsLikeIcons = await screen.findAllByTestId('likeIcon')
  expect(postsLikeIcons[0]).toBeInTheDocument()
}

const assertFirstPostUnLikeIcon = async () => {
  const postsUnLikeIcons = await screen.findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
}

const assertSearchResultsUIElements = async () => {
  const {posts} = searchResultsResponse
  const {
    post_details: {caption},
  } = posts[0]

  const paragraphElInSearchResults = await screen.findByText(caption, {
    exact: false,
  })

  expect(paragraphElInSearchResults).toBeInTheDocument()
}

const mockHomeRouteSearchAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(url => {
    if (url === userStoriesAPIUrl) {
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    }
    if (url === searchPostsAPIUrl) {
      return {
        ok: true,
        json: () => Promise.resolve(searchResultsResponse),
      }
    }
    return {
      ok: true,
      json: () => Promise.resolve(postsResponse),
    }
  })
  return fetchSpy
}

const assertMyProfileRouteUIElements = async () => {
  const {
    profile: {user_name},
  } = myProfileResponse
  const userId = await screen.findAllByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(userId[0]).toBeInTheDocument()
}

const assertUserProfileRouteUIElements = async () => {
  const {
    user_details: {user_name},
  } = userProfileResponse
  const userId = await screen.findAllByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(userId[0]).toBeInTheDocument()
}

const assertSearchUserProfileRouteUIElements = async () => {
  const {
    user_details: {user_name},
  } = searchUserProfileResponse
  const userId = await screen.findAllByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(userId[0]).toBeInTheDocument()
}

let historyInstance

const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
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

const assertLogout = () => {
  const logoutBtn = screen.getAllByRole('button', {
    name: /Logout/i,
    exact: false,
  })
  restoreGetCookieFns()
  mockGetCookie(false)
  userEvent.click(logoutBtn[0])
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = homeRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = homeRoutePath) => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const mountHomeRouteSearchUsingEnzyme = async () => {
  const wrapper = mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
  await wrapper.update()
  wrapper
    .find('input')
    .at(0)
    .simulate('change', {target: {value: 'sky'}})
  wrapper.find(FaSearch).at(0).simulate('click')
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
  await wrapper.update()
  return wrapper
}

describe(':::RJSCPU2OLA_TEST_SUITE_2:::Header Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(window, 'fetch').mockRestore()
  })

  afterAll(() => {
    server.close()
  })

  //   #region Logo test cases

  it(':::RJSCPU2OLA_TEST_17:::Home Route should consist of an HTML image element with alt attribute value as "website logo":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()
    await assertHomeRouteUIElements()
    const imageEl = screen.getAllByAltText(/website logo/i, {
      exact: false,
    })
    expect(imageEl[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_18:::Home Route should consist of an HTML image element with alt attribute value as "website logo" and it should be wrapped with the Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()
    await assertHomeRouteUIElements()

    expect(
      screen.getAllByRole('link', {
        name: /website logo/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_19:::Home Route should consist of an HTML main heading element with text content as "Insta Share":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()
    await assertHomeRouteUIElements()

    expect(
      screen.getAllByRole('heading', {
        name: /Insta Share/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region search UI test cases

  it(':::RJSCPU2OLA_TEST_20:::Home Route should consist of an HTML input element with the placeholder text content as "Search Caption" and type as "search":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const searchInputEl = screen.getAllByPlaceholderText(/Search Caption/i, {
      exact: false,
    })

    expect(searchInputEl[0]).toBeInTheDocument()
    expect(searchInputEl[0].type).toBe('search')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_21:::Home Route should consist of the HTML button element with "FaSearch" icon imported from the "react-icons/fa" and should consist of testid attribute value as "searchIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const searchInputEl = screen.getAllByTestId('searchIcon')

    expect(searchInputEl[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_22:::Home Route should consist of an HTML element with text content as "Home":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    expect(
      screen.getAllByText(/Home/i, {
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_23:::Home Route should consist of a Link from react-router-dom with text content as "Home":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const homeLinkELe = await screen.findAllByRole('link', {
      hidden: true,
      name: /Home/i,
    })

    expect(homeLinkELe[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_24:::Home Route should consist of an HTML element with text content as "Profile":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    expect(
      screen.getAllByText(/Profile/i, {
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_25:::Home Route should consist of a Link from react-router-dom with text content as "Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const profileElements = await screen.findAllByRole('link', {
      hidden: true,
      name: /Profile/i,
    })

    expect(profileElements[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_26:::Home Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const logOutElement = await screen.findAllByRole('button', {
      hidden: true,
      name: /Logout/i,
    })

    expect(logOutElement[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  // #region profile pic Functionality test cases

  it(':::RJSCPU2OLA_TEST_27:::When a non-empty value is provided in the HTML input element with the placeholder text content as "Search Caption" and type as "search", then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    await assertHomeRouteUIElements()
    const searchInputEl = screen.getAllByPlaceholderText(/Search Caption/i, {
      exact: false,
    })
    userEvent.type(searchInputEl[0], 'rainbow')
    expect(searchInputEl[0]).toHaveValue('rainbow')
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_28:::Home Route should consist of "FaSearch" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'Home Route', '/')
    const fetchSpy = mockHomeRouteSearchAPI()
    const wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    await wrapper.update()
    expect(wrapper.find(FaSearch).exists()).toBe(true)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  // #region Search Functionality test cases in Home Route

  it(':::RJSCPU2OLA_TEST_29:::When the search results API in the Home Route is in progress, then the page should consist of HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loader'))

    await assertSearchResultsUIElements()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_30:::When the search results API in the Home Route is successful, then the page should consist of an HTML main heading element with the text content as "Search Results" and response received from Search Posts API URL should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const headingEl = await screen.findByText(/Search Results/i, {exact: false})

    expect(headingEl).toBeInTheDocument()

    await assertSearchResultsUIElements()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_31:::When the search results API in the Home Route is successful, then each Post should consist of an HTML image element with alt attribute value as "post author profile" and src as the value of key "profile_pic" from the posts received from Search Posts API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {profile_pic} = posts[0]

    const profilePics = await screen.findAllByAltText(/post author profile/i, {
      exact: false,
    })
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_32:::When the search results API in the Home Route is successful, then each Post should consist of an HTML element with text content as the value of the key "user_name" from the posts received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {user_name} = posts[0]

    const postsUserNames = await screen.findAllByText(user_name, {exact: false})
    expect(postsUserNames[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_33:::When the search results API in the Home Route is successful, then each Post should consist of an HTML image element with alt attribute value as "post" and src as the value of key "image_url" from the post_details received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {
      post_details: {image_url},
    } = posts[0]

    const postsPics = await screen.findAllByAltText(/post$/i, {exact: false})
    expect(postsPics[0]).toBeInTheDocument()
    expect(postsPics[0].src).toBe(image_url)
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_34:::When the search results API in the Home Route is successful, then each Post should consist of an HTML button element with the "BsHeart" icon imported from the "react-icons/bs" and testid attribute value as "likeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const likeIcons = await screen.findAllByTestId('likeIcon')
    expect(likeIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_35:::When the search results API in the Home Route is successful, then each Post should consist of the "FaRegComment" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'Home Route', '/')
    const fetchSpy = mockHomeRouteSearchAPI()
    const wrapper = await mountHomeRouteSearchUsingEnzyme()
    expect(wrapper.find(FaRegComment)).toHaveLength(
      searchResultsResponse.posts.length,
    )
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_36:::When the search results API in the Home Route is successful, then each Post should consist of the "BiShareAlt" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'Home Route', '/')
    const fetchSpy = mockHomeRouteSearchAPI()
    const wrapper = await mountHomeRouteSearchUsingEnzyme()
    expect(wrapper.find(BiShareAlt)).toHaveLength(
      searchResultsResponse.posts.length,
    )
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_37:::When the search results API in the Home Route is successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "caption" from the post_details received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {
      post_details: {caption},
    } = posts[0]

    const postCaptions = await screen.findAllByText(caption, {exact: false})
    expect(postCaptions[0]).toBeInTheDocument()
    expect(postCaptions[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_38:::When the search results API in the Home Route is successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "likes_count" from the post_details received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await screen.findAllByText(likes_count, {
      exact: false,
    })

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_39:::When the search results API in the Home Route is successful, then each Post should consist of HTML span elements with text content as the value of the key "user_name" from the comments received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {comments} = posts[0]

    const postsFirstCommentUsernames = await screen.findAllByText(
      comments[0].user_name,
      {
        exact: false,
      },
    )
    const postsSecondCommentUsernames = await screen.findAllByText(
      comments[1].user_name,
      {
        exact: false,
      },
    )
    expect(postsFirstCommentUsernames[0]).toBeInTheDocument()
    expect(postsFirstCommentUsernames[0].tagName).toBe('SPAN')
    expect(postsSecondCommentUsernames[0]).toBeInTheDocument()
    expect(postsSecondCommentUsernames[0].tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_40:::When the search results API in the Home Route is successful, then each Post should consist of an HTML paragraph elements with text content as the value of the key "comment" from the comments received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {comments} = posts[0]
    const postsFirstCommentCaptions = await screen.findAllByText(
      comments[0].comment,
      {
        exact: false,
      },
    )
    const postsSecondCommentCaptions = await screen.findAllByText(
      comments[1].comment,
      {
        exact: false,
      },
    )
    expect(postsFirstCommentCaptions[0]).toBeInTheDocument()
    expect(postsFirstCommentCaptions[0].tagName).toBe('P')
    expect(postsSecondCommentCaptions[0]).toBeInTheDocument()
    expect(postsSecondCommentCaptions[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_41:::When the search results API in the Home Route is successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "created_at" from the posts received from Search Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {created_at} = posts[0]

    const postsCreatedTimes = await screen.findAllByText(created_at, {
      exact: false,
    })
    expect(postsCreatedTimes[0]).toBeInTheDocument()
    expect(postsCreatedTimes[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_42:::When the search results API in the Home Route is successful and username in the specific post is clicked, then the page should be navigated to User Profile route and response received from the User Profile API should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const {posts} = searchResultsResponse
    const {user_name} = posts[0]

    const postUsernames = await screen.findAllByText(user_name, {exact: false})

    expect(postUsernames[0]).toBeInTheDocument()

    userEvent.click(postUsernames[0])

    await assertSearchUserProfileRouteUIElements()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_43:::When the search results API in the Home Route is successful and the like icon of a specific post is clicked, then an HTTP POST request should be made to Post Like API URL with like status as true:::15:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteSearchWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const bodyObject = JSON.parse(spyFetch.mock.calls[3][1].body)

    expect(spyFetch.mock.calls[3][0]).toBe(likeOrUnlikeSearchAPIUrl)
    expect(bodyObject.like_status).toBeTruthy()

    spyFetch.mockRestore()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_44:::When the search results API in the Home Route is successful and the like icon of a specific post is clicked, then the like icon should be changed to unlike icon and should contain the testid attribute value as "unLikeIcon":::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_45:::When the search results API in the Home Route is successful and the like icon of a specific post is clicked, then the likes count of that post item should be incremented by one:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await screen.findAllByText(likes_count + 1, {
      exact: false,
    })

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount.length).toBe(1)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_46:::When the search results API in the Home Route is successful and the unlike icon of a specific post is clicked, then an HTTP POST request should be made to Post Like API URL with like status false:::15:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteSearchWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const bodyObject = JSON.parse(spyFetch.mock.calls[4][1].body)

    expect(spyFetch.mock.calls[4][0]).toBe(likeOrUnlikeSearchAPIUrl)
    expect(bodyObject.like_status).toBeFalsy()

    spyFetch.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_47:::When the search results API in the Home Route is successful and the unlike icon of a specific post is clicked, then the icon should be changed to like icon and should contain the testid attribute value as "likeIcon":::10:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteSearchWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    spyFetch.mockRestore()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_48:::When the search results API in the Home Route is successful and the unlike icon of a specific post is clicked, then the likes count of that post item should be decrement by one:::10:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteSearchWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    await likeFirstPostItem()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postLikesCount = await screen.findAllByText(likes_count, {
      exact: false,
    })

    expect(postLikesCount[0]).toBeInTheDocument()

    spyFetch.mockRestore()
    restoreGetCookieFns()
  })

  // #region search Empty view

  it(':::RJSCPU2OLA_TEST_49:::When the HTTP GET request made to Search Posts API URL in the Home Route returns the search posts as empty, then the page should consist of the HTML image element with alt attribute value as "search not found":::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults('~')

    const imgEl = await screen.findByAltText(/search not found/i, {
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_50:::When the HTTP GET request made to Search Posts API URL in the Home Route returns the search posts as empty, then the page should consist of the HTML main heading element with text content as "Search Not Found":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults('~')

    const headingEl = await screen.findByRole('heading', {
      name: /Search Not Found/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_51:::When the HTTP GET request made to Search Posts API URL in the Home Route returns the search posts as empty, then the page should consist of the HTML paragraph element with text content as "Try different keyword or search again":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults('~')

    const paragraphElSearchNotFound = await screen.findByText(
      /Try different keyword or search again/i,
      {
        exact: false,
      },
    )
    expect(paragraphElSearchNotFound).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region Search Failure Test cases in Home Route

  it(':::RJSCPU2OLA_TEST_52:::When the HTTP GET request made to Search Posts API URL in the Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_53:::When the HTTP GET request made to Search Posts API URL in the Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const paragraphElTwo = await screen.findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphElTwo).toBeInTheDocument()
    expect(paragraphElTwo.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_54:::When the HTTP GET request made to Search Posts API URL in the Home Route is unsuccessful, the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()
    searchResults()

    expect(
      await screen.findByRole('button', {
        name: /Try again/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_55:::When the Search Results HTTP GET request made in Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to Search Posts API URL:::15:::', async () => {
    mockGetCookie()

    const spyFetch = jest.spyOn(window, 'fetch').mockImplementation(url => {
      if (url === searchPostsAPIUrl) {
        return {
          ok: false,
          json: () => Promise.resolve({}),
        }
      }
      if (url === userStoriesAPIUrl) {
        return {
          ok: true,
          json: () => Promise.resolve(userStoriesResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(postsResponse),
      }
    })

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    searchResults()

    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(spyFetch.mock.calls[3][0]).toBe(searchPostsAPIUrl)
    spyFetch.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_56:::When the "Profile" link in the Header of the Home Route is clicked, then the page should be navigated to My profile Route and response received from My Profile API should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()
    await assertHomeRouteUIElements()

    const myProfile = screen.getAllByRole('link', {
      name: /^Profile$/i,
      exact: false,
    })

    userEvent.click(myProfile[0])

    await assertMyProfileRouteUIElements()

    expect(window.location.pathname).toBe(myProfileRoutePath)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_57:::My Profile Route should consist of an HTML image element with alt attribute value as "website logo" and it should be wrapped with the Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})
    await assertMyProfileRouteUIElements()

    expect(
      screen.getAllByRole('link', {
        name: /website logo/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_58:::When the "Home" link in the Header of the My Profile Route is clicked, then the page should be navigated to Home Route and response received from User Stories API and Posts API should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})
    await assertMyProfileRouteUIElements()

    const home = screen.getAllByRole('link', {
      name: /Home/i,
      exact: false,
    })

    userEvent.click(home[0])

    await assertHomeRouteUIElements()

    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_59:::User Profile Route should consist of a Link from react-router-dom with text content as "Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: userProfileRoutePath})
    await assertUserProfileRouteUIElements()

    expect(
      screen.getAllByRole('link', {
        name: /Profile/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_60:::When the "Profile" link in the Header of the User Profile Route is clicked, then the page should be navigated to Profile Route and response received from My Profile API should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: userProfileRoutePath})
    await assertUserProfileRouteUIElements()

    const profile = screen.getAllByRole('link', {
      name: /Profile/i,
      exact: false,
    })

    userEvent.click(profile[0])

    await assertMyProfileRouteUIElements()

    expect(window.location.pathname).toBe(myProfileRoutePath)

    restoreGetCookieFns()
  })

  //  #region logout Functionality test cases

  it(':::RJSCPU2OLA_TEST_61:::When the "Logout" button in the Header of the Home Route is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::15:::', async () => {
    mockRemoveCookie()
    mockGetCookie()

    rtlRender(<App />)

    await assertHomeRouteUIElements()

    assertLogout()

    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')

    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_62:::When the "Logout" button in the Header of the Home Route is clicked, then the history.replace() method should be called with the argument "/login":::15:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    const {history} = rtlRender()
    mockHistoryReplace(history)

    await assertHomeRouteUIElements()

    assertLogout()

    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
    restoreHistoryReplace(history)
  })

  it(':::RJSCPU2OLA_TEST_63:::When the "Logout" button in the Header of the Home Route is clicked, then the page should be navigated to Login Route and should consist of an HTML button element with text content as "Login":::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter()
    await assertHomeRouteUIElements()

    assertLogout()

    expect(window.location.pathname).toBe(loginRoutePath)
    const buttonEl = screen.getAllByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl[0]).toBeInTheDocument()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
})
