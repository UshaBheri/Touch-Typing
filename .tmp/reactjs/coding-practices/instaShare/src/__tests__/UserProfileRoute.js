import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'

const userProfileRoutePath = '/users/Varun_Aadithya'

const userProfileAPIUrl =
  'https://apis.ccbp.in/insta-share/users/Varun_Aadithya'

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
      {
        id: '1a698dc4-sdf6e83-4ess1222de-sdfsdf998e-638305f7aee6',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-33-img.png',
      },
    ],
    stories: [
      {
        id: 'QAeIMOwzK',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-1-img.png',
      },
      {
        id: '4pXoYRUDq',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-35-img.png',
      },
    ],
  },
}

const userProfileWithNoPostsResponse = {
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
    posts: [],
    stories: [
      {
        id: 'QAeIMOwzK',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-1-img.png',
      },
      {
        id: '4pXoYRUDq',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-35-img.png',
      },
    ],
  },
}

const server = setupServer(
  rest.get(userProfileAPIUrl, (req, res, ctx) =>
    res(ctx.json(userProfileResponse)),
  ),
)

const mockUserProfileRouteAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
    ok: true,
    json: () => Promise.resolve(userProfileResponse),
  }))
  return fetchSpy
}

const mockEnzymeUserProfileRouteWithNoPostsAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
    ok: true,
    json: () => Promise.resolve(userProfileWithNoPostsResponse),
  }))
  return fetchSpy
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

const assertUserProfileUIElement = async () => {
  const {
    user_details: {user_name},
  } = userProfileResponse
  const username = await screen.findByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(username).toBeInTheDocument()
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = userProfileRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const mockUserProfileFailureAPI = () => {
  server.use(
    rest.get(userProfileAPIUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

const mockUserProfileAPIWithNoPosts = () => {
  server.use(
    rest.get(userProfileAPIUrl, (req, res, ctx) =>
      res(ctx.status(200), ctx.json(userProfileWithNoPostsResponse)),
    ),
  )
}

const mountUserProfileRouteUsingEnzyme = async () => {
  const wrapper = mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
  await wrapper.update()
  return wrapper
}

describe(':::RJSCPU2OLA_TEST_SUITE_7:::Others Profile Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(console, 'error').mockRestore()
    jest.spyOn(window, 'fetch').mockRestore()
  })

  afterAll(() => {
    server.close()
  })

  // #region key related test case

  it(':::RJSCPU2OLA_TEST_130:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of at least four HTML list items, User Stories List and User Posts List should be rendered using a unique key as a prop to display each Story and Post respectively:::10:::', async () => {
    mockGetCookie()

    const consoleSpy = jest.spyOn(console, 'error')

    renderWithBrowserRouter()

    await assertUserProfileUIElement()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4)

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/Each child in a list should have a unique/),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/Encountered two children with the same key/),
      expect.anything(),
      expect.anything(),
    )
    consoleSpy.mockRestore()

    restoreGetCookieFns()
  })

  // #region base url test case

  it(':::RJSCPU2OLA_TEST_131:::When the User Profile Route is opened, an HTTP GET request should be made to the User Profile API URL with the user id as path parameter:::10:::', async () => {
    mockGetCookie()

    const spyFetch = mockUserProfileRouteAPI()

    renderWithBrowserRouter(<App />)

    await assertUserProfileUIElement()

    expect(spyFetch.mock.calls[0][0]).toBe(userProfileAPIUrl)
    restoreGetCookieFns()
  })

  // #region authenticated user and unauthenticated user test cases

  it(':::RJSCPU2OLA_TEST_132:::When "/users/:id" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login":::15:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPU2OLA_TEST_133:::When "/users/:id" is provided in the URL by an authenticated user, then the page should be navigated to User Profile Route and consists of an HTML main heading element with text content as the value of the key "user_name" from the user_details received from the User Profile API response:::15:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertUserProfileUIElement()

    expect(window.location.pathname).toBe(userProfileRoutePath)

    restoreGetCookieFns()
  })

  // #region User Profile Route API Success UI test cases

  it(':::RJSCPU2OLA_TEST_134:::When the User Profile Route is opened, it should initially consist of an HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    await assertUserProfileUIElement()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_135:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of at least two HTML unordered list elements to display Posts and Stories list received from response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertUserProfileUIElement()

    const unorderedLists = screen.getAllByRole('list')

    expect(unorderedLists[0]).toBeInTheDocument()
    expect(unorderedLists[0].tagName).toBe('UL')
    expect(unorderedLists.length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_136:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of at least four HTML list items to display User Stories and User Posts list items received from the response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertUserProfileUIElement()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(4)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_137:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "user profile" and src as the value of key "profile_pic" from the user_details received from the User Profile API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {profile_pic},
    } = userProfileResponse

    const profilePicEl = await screen.findByAltText(/user profile/i, {
      exact: false,
    })
    expect(profilePicEl).toBeInTheDocument()
    expect(profilePicEl.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_138:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML main heading element with text content as the value of the key "user_name" from the user_details received from the User Profile API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_name},
    } = userProfileResponse

    const username = await screen.findByRole('heading', {
      name: user_name,
      exact: false,
    })
    expect(username).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_139:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "posts_count" from the user_details received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {posts_count},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(posts_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_140:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "followers_count" from the user_details received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {followers_count},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(followers_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_141:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "following_count" from the user_details received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {following_count},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(following_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_142:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_id" from the user_details received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_id},
    } = userProfileResponse
    const userId = await screen.findByText(user_id, {
      exact: false,
    })
    expect(userId).toBeInTheDocument()
    expect(userId.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_143:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_bio" from the user_details received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_bio},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(user_bio, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_144:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "user story" and src as the value of key "image" from each object in stories received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {stories},
    } = userProfileResponse
    const {image} = stories[0]

    const userStories = await screen.findAllByAltText(/user story/i, {
      exact: false,
    })
    expect(userStories[0]).toBeInTheDocument()
    expect(userStories[0].src).toBe(image)
    expect(userStories.length).toBe(stories.length)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_145:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the "BsGrid3X3" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'User Profile Route', userProfileRoutePath)
    const fetchSpy = mockUserProfileRouteAPI()
    const wrapper = await mountUserProfileRouteUsingEnzyme()
    expect(wrapper.find(BsGrid3X3)).toHaveLength(1)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_146:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML main heading element with text content as "Posts":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const headingEl = await screen.findByRole('heading', {
      name: /Posts/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_147:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "user post" and src as the value of key "image" from each object in posts received from the User Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {posts},
    } = userProfileResponse
    const {image} = posts[0]

    const userPosts = await screen.findAllByAltText(/user post/i, {
      exact: false,
    })
    expect(userPosts[0]).toBeInTheDocument()
    expect(userPosts[0].src).toBe(image)
    expect(userPosts.length).toBe(posts.length)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_148:::When the HTTP GET request in the User Profile Route is successful, then the page should consist of the "BiCamera" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'User Profile Route', userProfileRoutePath)
    const fetchSpy = mockEnzymeUserProfileRouteWithNoPostsAPI()
    const wrapper = await mountUserProfileRouteUsingEnzyme()
    expect(wrapper.find(BiCamera)).toHaveLength(1)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_149:::When the HTTP GET request made to the User Profile API URL in the User Profile Route returns user posts as empty, then the page should consist of the HTML main heading element with text content as "No Posts":::5:::', async () => {
    mockGetCookie()

    mockUserProfileAPIWithNoPosts()

    renderWithBrowserRouter()

    const noPostsHeadingEl = await screen.findByRole('heading', {
      name: /No Posts/i,
      exact: false,
    })
    expect(noPostsHeadingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region user Profile Failure test cases

  it(':::RJSCPU2OLA_TEST_150:::When the HTTP GET request made to the User Profile API URL in the User Profile Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockUserProfileFailureAPI()
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_151:::When the HTTP GET request made to the User Profile API URL in the User Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    mockUserProfileFailureAPI()
    renderWithBrowserRouter(<App />)

    const paragraphEl = await screen.findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_152:::When the HTTP GET request made to the User Profile API URL in the User Profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    mockUserProfileFailureAPI()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_153:::When the HTTP GET request made to the User Profile API URL in the User Profile Route is unsuccessful and the HTML button element with text content as "Try again" is clicked, then an HTTP GET request should be made to User Profile API URL:::15:::', async () => {
    mockGetCookie()

    const spyFetch = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))

    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(spyFetch.mock.calls[1][0]).toBe(userProfileAPIUrl)
    restoreGetCookieFns()
  })
})
