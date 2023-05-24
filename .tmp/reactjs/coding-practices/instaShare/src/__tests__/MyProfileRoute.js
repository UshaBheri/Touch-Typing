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

const myProfileRoutePath = '/my-profile'

const myProfileURL = 'https://apis.ccbp.in/insta-share/my-profile'

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

const myProfileWithNoPosts = {
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
    posts: [],
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

const server = setupServer(
  rest.get(myProfileURL, (req, res, ctx) => res(ctx.json(myProfileResponse))),
)

const mockMyProfileRouteAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
    ok: true,
    json: () => Promise.resolve(myProfileResponse),
  }))
  return fetchSpy
}

const mockEnzymeMyProfileRouteWithNoPostsAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
    ok: true,
    json: () => Promise.resolve(myProfileWithNoPosts),
  }))
  return fetchSpy
}

const mockMyProfileFailureAPI = () => {
  server.use(
    rest.get(myProfileURL, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

const mockMyProfileAPIWithNoPosts = () => {
  server.use(
    rest.get(myProfileURL, (req, res, ctx) =>
      res(ctx.status(200), ctx.json(myProfileWithNoPosts)),
    ),
  )
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

const renderWithBrowserRouter = (
  ui = <App />,
  {route = myProfileRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const mountMyProfileRouteUsingEnzyme = async () => {
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

const assertMyProfileUIElement = async () => {
  const {
    profile: {user_name},
  } = myProfileResponse
  const myName = await screen.findByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(myName).toBeInTheDocument()
}

describe(':::RJSCPU2OLA_TEST_SUITE_4:::My Profile Route Tests', () => {
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

  it(':::RJSCPU2OLA_TEST_98:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of at least four HTML list items, then the page should consist of at least four HTML list items, My Stories List and My Posts List should be rendered using a unique key as a prop to display each Story and Post respectively:::10:::', async () => {
    mockGetCookie()

    const consoleSpy = jest.spyOn(console, 'error')

    renderWithBrowserRouter()

    await assertMyProfileUIElement()
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

  //   #region base url test cases

  it(':::RJSCPU2OLA_TEST_99:::When the My Profile Route is opened, an HTTP GET request should be made to My Profile API URL:::10:::', async () => {
    mockGetCookie()

    const spyFetch = mockMyProfileRouteAPI()

    renderWithBrowserRouter()

    await assertMyProfileUIElement()

    expect(spyFetch.mock.calls[0][0]).toBe(myProfileURL)
    restoreGetCookieFns()
  })

  // #region authenticated user and unauthenticated user test cases

  it(':::RJSCPU2OLA_TEST_100:::When "/my-profile" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login":::15:::', async () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPU2OLA_TEST_101:::When the "/my-profile" is provided in the URL by an authenticated user, then the page should be navigated to My Profile Route and consists of an HTML main heading element with text content as the value of the key "user_name" from the profile received from the My Profile API response:::15:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertMyProfileUIElement()

    expect(window.location.pathname).toBe(myProfileRoutePath)

    restoreGetCookieFns()
  })

  // #region My Profile Route UI test cases

  it(':::RJSCPU2OLA_TEST_102:::When the My Profile Route is opened, it should initially consist of an HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    await assertMyProfileUIElement()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_103:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of at least two HTML unordered list elements to display Posts and Stories list received from response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertMyProfileUIElement()

    const unorderedLists = screen.getAllByRole('list')

    expect(unorderedLists[0]).toBeInTheDocument()
    expect(unorderedLists[0].tagName).toBe('UL')
    expect(unorderedLists.length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_104:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of at least four HTML list items to display My Stories and My Posts list items received from the response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertMyProfileUIElement()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(4)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_105:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "my profile" and src as the value of key "profile_pic" from the profile received from the My Profile API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {profile_pic},
    } = myProfileResponse

    const profilePicEl = await screen.findByAltText(/my profile/i, {
      exact: false,
    })
    expect(profilePicEl).toBeInTheDocument()
    expect(profilePicEl.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_106:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML main heading element with text content as the value of the key "user_name" from the profile received from the My Profile API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {user_name},
    } = myProfileResponse

    const username = await screen.findByRole('heading', {
      name: user_name,
      exact: false,
    })
    expect(username).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_107:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "posts_count" from the profile received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {posts_count},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(posts_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_108:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "followers_count" from the profile received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {followers_count},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(followers_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_109:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML element with text content as the value of the key "following_count" from the profile received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {following_count},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(following_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_110:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_id" from the profile received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {user_id},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(user_id, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_111:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_bio" from the profile received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {user_bio},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(user_bio, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_112:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "my story" and src as the value of key "image" from each object in stories received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {stories},
    } = myProfileResponse
    const {image} = stories[0]

    const myStories = await screen.findAllByAltText(/my story/i, {
      exact: false,
    })
    expect(myStories[0]).toBeInTheDocument()
    expect(myStories[0].src).toBe(image)
    expect(myStories.length).toBe(stories.length)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_113:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the "BsGrid3X3" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'My Profile Route', myProfileRoutePath)
    const fetchSpy = mockMyProfileRouteAPI()
    const wrapper = await mountMyProfileRouteUsingEnzyme()
    expect(wrapper.find(BsGrid3X3)).toHaveLength(1)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_114:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML main heading element with text content as "Posts":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const headingEl = await screen.findByRole('heading', {
      name: /Posts/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_115:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "my post" and src as the value of key "image" from each object in posts received from the My Profile API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const {
      profile: {posts},
    } = myProfileResponse
    const {image} = posts[0]

    const myPostsPics = await screen.findAllByAltText(/my post/i, {
      exact: false,
    })
    expect(myPostsPics[0]).toBeInTheDocument()
    expect(myPostsPics[0].src).toBe(image)
    expect(myPostsPics.length).toBe(posts.length)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_116:::When the HTTP GET request in the My Profile Route is successful, then the page should consist of the "BiCamera" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'My Profile Route', myProfileRoutePath)
    const fetchSpy = mockEnzymeMyProfileRouteWithNoPostsAPI()
    const wrapper = await mountMyProfileRouteUsingEnzyme()
    expect(wrapper.find(BiCamera)).toHaveLength(1)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_117:::When the HTTP GET request made to My Profile API URL in the My Profile Route returns my posts as empty, then the page should consist of the HTML main heading element with text content as "No Posts":::5:::', async () => {
    mockGetCookie()

    mockMyProfileAPIWithNoPosts()

    renderWithBrowserRouter()

    const noPostsHeadingEl = await screen.findByRole('heading', {
      name: /No Posts/i,
      exact: false,
    })
    expect(noPostsHeadingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region My Profile Route Failure test cases

  it(':::RJSCPU2OLA_TEST_118:::When the HTTP GET request made to My Profile API URL in the My Profile Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockMyProfileFailureAPI()
    renderWithBrowserRouter()
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_119:::When the HTTP GET request made to My Profile API URL in the My Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    mockMyProfileFailureAPI()
    renderWithBrowserRouter()

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

  it(':::RJSCPU2OLA_TEST_120:::When the HTTP GET request made to My Profile API URL in the My Profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    mockMyProfileFailureAPI()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_121:::When the HTTP GET request made to My Profile API URL in the My Profile Route is unsuccessful and the HTML button element with text content as "Try again" is clicked, then an HTTP GET request should be made to My Profile API URL:::15:::', async () => {
    mockGetCookie()

    const spyFetch = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))

    renderWithBrowserRouter()
    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(spyFetch.mock.calls[1][0]).toBe(myProfileURL)
    restoreGetCookieFns()
  })
})
