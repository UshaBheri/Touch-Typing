import Cookies from 'js-cookie'
import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const pageNotFoundPath = '/bad-path'

const homeRoutePath = '/'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-share/stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-share/posts'

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

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),
)

const renderWithBrowserRouter = (ui, {route = pageNotFoundPath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
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

const assertHomeRouteUIElements = async () => {
  await screen.findAllByAltText(/user story/i, {
    exact: false,
  })
  const paragraphEl = await screen.findByText(/Another day, another sunrise/i, {
    exact: false,
  })
  expect(paragraphEl).toBeInTheDocument()
}

describe(':::RJSCPU2OLA_TEST_SUITE_5:::Not Found Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPU2OLA_TEST_122:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML image element with alt attribute value as "page not found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /page not found/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_123:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "PAGE NOT FOUND":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {
        name: /PAGE NOT FOUND/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_124:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "we are sorry, the page you requested could not be found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const paragraphEl = screen.getByText(
      /we are sorry, the page you requested could not be found/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPU2OLA_TEST_125:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML button element with text content as "Home Page":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Home Page/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_126:::In the NotFound Route, if the user clicks on the HTML button element with text content as "Home Page" then it should navigate to Home Page and responses received from the User Stories API, Posts API should be displayed:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const homePageButton = screen.getByRole('button', {
      name: /Home Page/i,
      exact: false,
    })

    userEvent.click(homePageButton)

    await assertHomeRouteUIElements()

    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })
})
