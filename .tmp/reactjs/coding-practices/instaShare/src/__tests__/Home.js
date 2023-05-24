import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'

const homeRoutePath = '/'

const userStoriesAPIUrl = 'https://apis.ccbp.in/insta-share/stories'

const postsAPIUrl = 'https://apis.ccbp.in/insta-share/posts'

const userProfileAPIUrl =
  'https://apis.ccbp.in/insta-share/users/Varun_Aadithya'

const likeOrUnLikeAPIUrl =
  'https://apis.ccbp.in/insta-share/posts/f25d77f0-602e-41d1-971e-4b8cf54709eb/like'

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

const likeOrUnlikeAPIResponse = {message: 'Post has been liked'}

const server = setupServer(
  rest.get(userStoriesAPIUrl, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIUrl, (req, res, ctx) => res(ctx.json(postsResponse))),
  rest.post(likeOrUnLikeAPIUrl, (req, res, ctx) =>
    res(ctx.json(likeOrUnlikeAPIResponse)),
  ),
  rest.get(userProfileAPIUrl, (req, res, ctx) =>
    res(ctx.json(userProfileResponse)),
  ),
)

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
  {route = homeRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const mountHomeRouteUsingEnzyme = async () => {
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

const mockHomeRouteAPI = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(url => {
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
  return fetchSpy
}

const mockHomeRouteWithLikeUnLikeAPIs = () => {
  const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(url => {
    if (url === userStoriesAPIUrl) {
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    }
    if (url === likeOrUnLikeAPIUrl) {
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
  return fetchSpy
}

const mockUserStoriesListFailureAPI = () => {
  server.use(
    rest.get(userStoriesAPIUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

const mockPostsListFailureAPI = () => {
  server.use(
    rest.get(postsAPIUrl, (req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({message: 'Authorization Header is undefined'}),
      ),
    ),
  )
}

const assertStoriesListUIElements = async () => {
  await screen.findAllByAltText(/user story/i, {
    exact: false,
  })
}

const assertPostsListUIElements = async () => {
  const paragraphEl = await screen.findByText(/Another day, another sunrise/i, {
    exact: false,
  })
  expect(paragraphEl).toBeInTheDocument()
}

const assertHomeRouteUIElements = async () => {
  await assertStoriesListUIElements()
  await assertPostsListUIElements()
}

const likeFirstPostItem = () => {
  const postsLikeIcons = screen.getAllByTestId('likeIcon')

  expect(postsLikeIcons[0]).toBeInTheDocument()

  userEvent.click(postsLikeIcons[0])
}

const unLikeFirstPostItem = () => {
  const postsUnLikeIcons = screen.getAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
  expect(postsUnLikeIcons.length).toBe(1)
  userEvent.click(postsUnLikeIcons[0])
}

const assertFirstPostLikeIcon = async () => {
  const postsLikeIcons = await screen.findAllByTestId('likeIcon')
  expect(postsLikeIcons[0]).toBeInTheDocument()
}

const assertFirstPostUnLikeIcon = async () => {
  const postsUnLikeIcons = await screen.findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
}

const assertUserProfileRouteUIElements = async () => {
  const {
    user_details: {user_name},
  } = userProfileResponse
  const userNames = await screen.findAllByRole('heading', {
    name: user_name,
    exact: false,
  })
  expect(userNames[0]).toBeInTheDocument()
}

describe(':::RJSCPU2OLA_TEST_SUITE_3:::Home Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    jest.spyOn(window, 'fetch').mockRestore()
    jest.spyOn(console, 'error').mockRestore()
  })

  afterAll(() => {
    server.close()
  })

  // #region key related test case

  it(':::RJSCPU2OLA_TEST_64:::When the HTTP GET requests in the Home Route are successful, then the page should consist of at least four HTML list items, User Stories List and User Posts List should be rendered using a unique key as a prop to display each Story and Post respectively:::10:::', async () => {
    mockGetCookie()

    const consoleSpy = jest.spyOn(console, 'error')

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()
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

  it(':::RJSCPU2OLA_TEST_65:::When the Home Route is opened, an HTTP GET request should be made to User Stories API URL and responses received from the User Stories API and Posts API should be displayed:::10:::', async () => {
    mockGetCookie()

    const fetchSpy = mockHomeRouteAPI()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    expect(
      fetchSpy.mock.calls.some(eachCall => eachCall[0] === userStoriesAPIUrl),
    ).toBeTruthy()

    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_66:::When the Home Route is opened, an HTTP GET request should be made to Posts API URL and responses received from the User Stories API and Posts API should be displayed:::10:::', async () => {
    mockGetCookie()

    const fetchSpy = mockHomeRouteAPI()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    expect(
      fetchSpy.mock.calls.some(eachCall => eachCall[0].match(postsAPIUrl)),
    ).toBeTruthy()

    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  // #region authenticated user and unauthenticated user test cases

  it(':::RJSCPU2OLA_TEST_67:::When "/" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login":::15:::', async () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPU2OLA_TEST_68:::When "/" is provided in the URL by an authenticated user, then the page should be navigated to Home Route and responses received from the User Stories API and Posts API should be displayed:::15:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()
    await assertHomeRouteUIElements()

    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  // #region User Stories Loader test case

  it(':::RJSCPU2OLA_TEST_69:::When the Home Route is opened, it should initially consist of two HTML container elements with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(screen.queryAllByTestId('loader').length).toBe(2)

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loader'))

    await assertHomeRouteUIElements()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_70:::When the HTTP GET requests in the Home Route are successful, then the page should consist of at least three HTML unordered list elements to display nav items list, User Stories list and Posts list received from response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loader'))

    const listEls = screen.getAllByRole('list', {hidden: true})
    expect(listEls.length).toBeGreaterThanOrEqual(3)
    expect(listEls.every(eachEl => eachEl.tagName === 'UL')).toBeTruthy()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_71:::When the HTTP GET requests in the Home Route are successful, then the page should consist of at least six HTML list items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(6)

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_72:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML image element with alt attribute value as "post author profile" and src as the value of key "profile_pic" from posts received from Posts API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {profile_pic} = posts[0]

    const profilePics = await screen.findAllByAltText(/post author profile/i, {
      exact: false,
    })
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_73:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML element with text content as the value of the key "user_name" from posts received from Posts API response:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {user_name} = posts[0]

    const postsUserNames = await screen.findAllByText(user_name, {exact: false})
    expect(postsUserNames[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_74:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML image element with alt attribute value as "post" and src as the value of key "image_url" in post_details received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {
      post_details: {image_url},
    } = posts[0]

    const postsPics = await screen.findAllByAltText(/post$/i, {exact: false})
    expect(postsPics[0]).toBeInTheDocument()
    expect(postsPics[0].src).toBe(image_url)
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_75:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML button element with the "BsHeart" icon from the "react-icons" with testid attribute value as "likeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const likeIcons = screen.getAllByTestId('likeIcon')
    expect(likeIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_76:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of the "FaRegComment" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'Home Route', '/')
    const fetchSpy = mockHomeRouteAPI()
    const wrapper = await mountHomeRouteUsingEnzyme()
    expect(wrapper.find(FaRegComment)).toHaveLength(postsResponse.posts.length)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_77:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of the "BiShareAlt" icon from "react-icons":::5:::', async () => {
    mockGetCookie()
    window.history.pushState({}, 'Home Route', '/')
    const fetchSpy = mockHomeRouteAPI()
    const wrapper = await mountHomeRouteUsingEnzyme()
    expect(wrapper.find(BiShareAlt)).toHaveLength(postsResponse.posts.length)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_78:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "caption" from post_details received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {
      post_details: {caption},
    } = posts[0]

    const postCaptions = await screen.findAllByText(caption, {exact: false})
    expect(postCaptions[0]).toBeInTheDocument()
    expect(postCaptions[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_79:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "likes_count" from post_details received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await screen.findAllByText(likes_count, {
      exact: false,
    })

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_80:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML element with text content as the value of the key "user_name" from comments received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {comments} = posts[0]
    const {user_name} = comments[0]

    const postsFirstCommentUsernames = await screen.findAllByText(user_name, {
      exact: false,
    })
    expect(postsFirstCommentUsernames[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_81:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "comment" from comments received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {comments} = posts[0]
    const {comment} = comments[0]

    const commentTextParagraphEl = await screen.findByText(comment, {
      exact: false,
    })
    expect(commentTextParagraphEl).toBeInTheDocument()
    expect(commentTextParagraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_82:::When the HTTP GET requests in the Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "created_at" from posts received from Posts API response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {created_at} = posts[0]

    const postsCreatedTimes = await screen.findAllByText(created_at, {
      exact: false,
    })
    expect(postsCreatedTimes[0]).toBeInTheDocument()
    expect(postsCreatedTimes[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_83:::When the HTTP GET requests in the Home Route are successful and username in the specific post is clicked then the page should be navigated to User Profile route and response received from the User Profile API should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    const {posts} = postsResponse
    const {user_name} = posts[0]

    const postUsernames = await screen.getAllByText(user_name, {exact: false})

    expect(postUsernames[0]).toBeInTheDocument()

    userEvent.click(postUsernames[0])

    await assertUserProfileRouteUIElements()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_84:::When the HTTP GET requests in the Home Route are successful and the like icon of a specific post is clicked then an HTTP POST request should be made to Post Like API URL with like status as true:::15:::', async () => {
    mockGetCookie()

    const fetchSpy = mockHomeRouteWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const bodyObject = JSON.parse(fetchSpy.mock.calls[2][1].body)

    expect(fetchSpy.mock.calls[2][0]).toBe(likeOrUnLikeAPIUrl)
    expect(bodyObject.like_status).toBeTruthy()

    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_85:::When the HTTP GET requests in the Home Route are successful and the like icon of a specific post is clicked then the like icon should be changed to unlike icon and should contain the testid attribute value as "unLikeIcon":::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_86:::When the HTTP GET requests in the Home Route are successful and the like icon of a specific post is clicked then the likes count of that post item should be incremented by one:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await screen.findAllByText(likes_count + 1, {
      exact: false,
    })

    expect(postsLikesCount[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_87:::When the HTTP GET requests in the Home Route are successful and the unlike icon of a specific post is clicked then an HTTP POST request should be made to Post Like API URL with like status as false:::15:::', async () => {
    mockGetCookie()

    const fetchSpy = mockHomeRouteWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const bodyObject = JSON.parse(fetchSpy.mock.calls[3][1].body)

    expect(fetchSpy.mock.calls[3][0]).toBe(likeOrUnLikeAPIUrl)
    expect(bodyObject.like_status).toBeFalsy()

    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_88:::When the HTTP GET requests in the Home Route are successful and the unlike icon of a specific post is clicked then the unlike icon should be changed to that post item and should contain the testid attribute value as "likeIcon":::10:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    restoreGetCookieFns()
    spyFetch.mockRestore()
  })

  it(':::RJSCPU2OLA_TEST_89:::When the HTTP GET requests in the Home Route are successful and the unlike icon of a specific post is clicked then the likes count of that post item should be decremented by one:::5:::', async () => {
    mockGetCookie()

    const spyFetch = mockHomeRouteWithLikeUnLikeAPIs()

    renderWithBrowserRouter()

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const postLikesCount = screen.getByText(likes_count, {
      exact: false,
    })

    expect(postLikesCount).toBeInTheDocument()

    restoreGetCookieFns()
    spyFetch.mockRestore()
  })

  // #region User Stories List Failure test cases

  it(':::RJSCPU2OLA_TEST_90:::When the HTTP GET request made to User Stories API URL in the Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockUserStoriesListFailureAPI()
    renderWithBrowserRouter()
    await assertPostsListUIElements()

    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_91:::When the HTTP GET request made to User Stories API URL in the Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    mockUserStoriesListFailureAPI()
    renderWithBrowserRouter()

    await assertPostsListUIElements()

    expect(
      await screen.findByText(/Something went wrong. Please try again/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_92:::When the HTTP GET request made to User Stories API URL in the Home Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    mockUserStoriesListFailureAPI()
    renderWithBrowserRouter()

    await assertPostsListUIElements()

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_93:::When the HTTP GET request made to User Stories API URL in the Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to User Stories API URL:::15:::', async () => {
    mockGetCookie()

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(url => {
      if (url === userStoriesAPIUrl) {
        return {
          ok: false,
          json: () => Promise.resolve({}),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(postsResponse),
      }
    })

    renderWithBrowserRouter()
    await assertPostsListUIElements()

    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(fetchSpy.mock.calls[2][0]).toBe(userStoriesAPIUrl)

    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })

  // #region Posts List Failure test cases

  it(':::RJSCPU2OLA_TEST_94:::When the HTTP GET request made to Posts API URL in the Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    mockPostsListFailureAPI()
    renderWithBrowserRouter()
    await assertStoriesListUIElements()
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_95:::When the HTTP GET request made to Posts API URL in the Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    mockPostsListFailureAPI()
    renderWithBrowserRouter()
    await assertStoriesListUIElements()

    expect(
      await screen.findByText(/Something went wrong. Please try again/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_96:::When the HTTP GET request made to Posts API URL in the Home Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    mockPostsListFailureAPI()
    renderWithBrowserRouter()
    await assertStoriesListUIElements()

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_97:::When the HTTP GET request made to Posts API URL in the Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to Posts API URL:::15:::', async () => {
    mockGetCookie()

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(url => {
      if (url.match(postsAPIUrl)) {
        return {
          ok: false,
          json: () => Promise.resolve({}),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    })

    renderWithBrowserRouter()

    await assertStoriesListUIElements()
    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(fetchSpy.mock.calls[2][0]).toMatch(postsAPIUrl)
    restoreGetCookieFns()
    fetchSpy.mockRestore()
  })
})
