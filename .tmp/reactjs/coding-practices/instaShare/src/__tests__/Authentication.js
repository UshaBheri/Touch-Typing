import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {act} from 'react-dom/test-utils'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

// #region - start test case preparation

const loginRoutePath = '/login'
const homeRoutePath = '/'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
}

const invalidUser = {
  error_msg: 'Username is not found',
}

const loginAPIUrl = 'https://apis.ccbp.in/login'
const userStoriesAPIURL = 'https://apis.ccbp.in/insta-share/stories'
const postsAPIURL = 'https://apis.ccbp.in/insta-share/posts'

const userStoriesResponse = {
  users_stories: [
    {
      user_id: 'Varun_Aadithya',
      user_name: 'Varun Aadithya',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    },
    {
      user_id: 'Arjun_Mark',
      user_name: 'Arjun Mark',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-2-img.png',
    },
    {
      user_id: 'Gautam_Rajadhyaksha',
      user_name: 'Gautam Rajadhyaksha',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-3-img.png',
    },
    {
      user_id: 'Prabuddha_Dasgupta',
      user_name: 'Prabuddha Dasgupta',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-4-img.png',
    },
  ],
  total: 9,
  my_story: null,
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
  rest.post(loginAPIUrl, (req, res, ctx) => {
    const {username, password} = JSON.parse(req.body)

    if (username === 'rahul' && password === 'rahul@2021') {
      return res(ctx.json(loginSuccessResponse))
    }
    return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
  }),
)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
}

const mockGetCookie = () => {
  const mockedGetCookie = jest.fn(() => ({
    jwt_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
  }))
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const rtlRender = (ui, path = '/login') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

const renderWithBrowserRouter = (ui, {route = loginRoutePath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

// #endregion test case preparation

describe(':::RJSCPU2OLA_TEST_SUITE_1:::Login Route Tests', () => {
  // #region

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

  // #endregion

  // #region - Authentication

  it(':::RJSCPU2OLA_TEST_1:::When "/login" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login":::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPU2OLA_TEST_2:::When "/login" is provided as the URL by an authenticated user, then the page should be navigated to Home Route and responses received from userStories, posts should be displayed:::10:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/user story/i, {exact: false})

    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  // #endregion

  // #region - Login UI

  it(':::RJSCPU2OLA_TEST_3:::Login Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_4:::Login Route should consist of an HTML image element with alt attribute value as "website login":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_5:::Login Route should consist of an HTML image element with alt attribute value as "website logo":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website logo/i})
    expect(imageEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_6:::Login Route should consist of an HTML main heading element with text content as "Insta Share":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const headingEl = screen.getByRole('heading', {
      name: /Insta Share/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(':::RJSCPU2OLA_TEST_7:::Login Route should consist of the HTML input element with label text as "USERNAME" and type attribute value as "text":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it(':::RJSCPU2OLA_TEST_8:::Login Route should consist of the HTML input element with label text as "PASSWORD" and type attribute value as "password":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}).type).toBe(
      'password',
    )
  })

  it(':::RJSCPU2OLA_TEST_9:::Login Route should consist of an HTML button element with text content as "Login" and type attribute value as "submit":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  // #endregion

  // #region - Login Functionality

  it(':::RJSCPU2OLA_TEST_10:::When a non-empty value is provided in the HTML input element with the label text as "USERNAME", then the value provided should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const userNameEl = screen.getByRole('textbox')
    userEvent.type(userNameEl, 'rahul')
    expect(userNameEl).toHaveValue('rahul')
  })

  it(':::RJSCPU2OLA_TEST_11:::When a non-empty value is provided in the HTML input element with the label text as "PASSWORD", then the value provided should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const passwordEl = screen.getByLabelText(/PASSWORD/i)
    userEvent.type(passwordEl, 'rahul')
    expect(passwordEl).toHaveValue('rahul')
  })

  it(':::RJSCPU2OLA_TEST_12:::When non-empty values are provided for username and password and the Login button is clicked, an HTTP POST request should be made to the given Login API URL:::5:::', async () => {
    mockSetCookie()
    const promise = Promise.resolve(loginSuccessResponse)

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(promise),
    }))

    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/Username/i)
    const passwordField = screen.getByLabelText(/Password/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await act(() => promise)
    expect(fetchSpy.mock.calls[0][0]).toMatch(`${loginAPIUrl}`)

    fetchSpy.mockRestore()
    restoreSetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_13:::When an invalid username and valid password are provided and the Login button is clicked then the respective error message should be displayed and the page should not be navigated:::10:::', async () => {
    renderWithBrowserRouter(<App />)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe(loginRoutePath)

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)

    const paragraphEl = await screen.findByText(/Username is not found/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()

    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPU2OLA_TEST_14:::When the valid username and password are provided and the Login button is clicked, then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument, and expiry days as the third argument:::15:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />)

    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it(':::RJSCPU2OLA_TEST_15:::When the valid username and password are provided and the Login button is clicked, then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/Username/i, {
      exact: false,
    })
    const passwordFields = screen.getByLabelText(/Password/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordFields, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })

  it(':::RJSCPU2OLA_TEST_16:::When a valid username and valid password are provided and the Login button is clicked then the page should be navigated to Home Route:::15:::', async () => {
    renderWithBrowserRouter(<App />)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)

    mockGetCookie()

    await screen.findAllByAltText(/user story/i, {
      exact: false,
    })
    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  // #endregion
})
