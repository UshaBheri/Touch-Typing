import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const appLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
const websiteImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
const usernameImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
const passwordImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
const passwordManagerMobileImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
const passwordManagerDesktopImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
const searchImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'
const noPasswordImage =
  'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
const starsImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
const deleteImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

const originalConsoleError = console.error

describe(':::RJSCPKS537_TEST_SUITE_1:::Password Manager tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPKS537_TEST_1:::When two passwords are added, then the page should consist of at least two HTML list items and the passwords list should be rendered using a unique key as a prop for each password item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.type(websiteInputEl, 'Google.com')
    userEvent.type(usernameInputEl, 'Sarah')
    userEvent.type(passwordInputEl, 'password1234')
    userEvent.click(addBtn)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPKS537_TEST_2:::Page should consist of an HTML image element with alt attribute value as "app logo" and src as the given logo URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /app logo/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(appLogo)
  })

  it(':::RJSCPKS537_TEST_3:::Page should consist of an HTML main heading element with text content as "Add New Password":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Add New Password/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_4:::Page should consist of an HTML form element:::5:::', () => {
    const {container} = render(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_5:::Page should consist of an HTML image element with alt attribute value as "website" and src as the given website image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /website/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteImage)
  })

  it(':::RJSCPKS537_TEST_6:::Page should consist of an HTML input element with the placeholder as "Enter Website" and type as "text":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('text')
  })

  it(':::RJSCPKS537_TEST_7:::Page should consist of an HTML image element with alt attribute value as "username" and src as the given username image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /username/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(usernameImage)
  })

  it(':::RJSCPKS537_TEST_8:::Page should consist of an HTML input element with the placeholder as "Enter Username" and type as "text":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter Username/i, {
      exact: false,
    })
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('text')
  })

  it(':::RJSCPKS537_TEST_9:::Page should consist of an HTML image element with alt attribute value as "password" and src as the given password image URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getByRole('img', {
      name: /^password$/i,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(passwordImage)
  })

  it(':::RJSCPKS537_TEST_10:::Page should consist of an HTML input element with the placeholder as "Enter Password" and type as "password":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('password')
  })

  it(':::RJSCPKS537_TEST_11:::Page should consist of an HTML button element with "Add" as text content and type as "submit":::5:::', () => {
    render(<App />)
    const buttonEl = screen.getByRole('button', {name: /Add/i, exact: false})
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it(':::RJSCPKS537_TEST_12:::Page should consist of an HTML image element with alt attribute value as "password manager" and src as the given password manager URL:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /password manager/i,
      exact: false,
    })
    expect(
      imageEls.some(
        eachImg =>
          eachImg.src === passwordManagerMobileImage ||
          passwordManagerDesktopImage,
      ),
    ).toBeTruthy()
  })

  it(':::RJSCPKS537_TEST_13:::Page should consist of an HTML main heading element with text content as "Your Passwords":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Your Passwords/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_14:::Page should initially consist of an HTML paragraph element to display the count of the passwords with text content as "0":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/^0/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_15:::Page should consist of an HTML image element with alt attribute value as "search" and src as the given search image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /search/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(searchImage)
  })

  it(':::RJSCPKS537_TEST_16:::Page should consist of an HTML input element with type attribute value as "search":::5:::', () => {
    render(<App />)
    const searchEl = screen.getByRole('searchbox')
    expect(searchEl.type).toBe('search')
  })

  it(':::RJSCPKS537_TEST_17:::Page should consist of an HTML input element with type attribute value as "checkbox" and label text as "Show passwords":::5:::', async () => {
    render(<App />)
    expect(
      screen.getByRole('checkbox', {
        name: /Show passwords/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_18:::Page should initially consist of an HTML image element with alt attribute value as "no passwords" and src as the given no passwords image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /no passwords/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(noPasswordImage)
  })

  it(':::RJSCPKS537_TEST_19:::Page should initially consist of an HTML paragraph element with text content as "No Passwords":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/No Passwords/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_20:::When a non-empty value is provided in an HTML input element with the placeholder as "Enter Website", then that text should be displayed in the HTML input element:::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(inputEl, 'Youtube.com')
    expect(inputEl).toHaveValue('Youtube.com')
  })

  it(':::RJSCPKS537_TEST_21:::When a non-empty value is provided in an HTML input element with the placeholder as "Enter UserName", then that text should be displayed in the HTML input element:::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(inputEl, 'John')
    expect(inputEl).toHaveValue('John')
  })

  it(':::RJSCPKS537_TEST_22:::When a non-empty value is provided in an HTML input element with the placeholder as "Enter Password", then that text should be displayed in the HTML input element:::5:::', () => {
    render(<App />)
    const inputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(inputEl, 'password123')
    expect(inputEl).toHaveValue('password123')
  })

  it(':::RJSCPKS537_TEST_23:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of at least one HTML unordered list element to display the list of password items:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')
  })

  it(':::RJSCPKS537_TEST_24:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of at least one HTML list item to display the list of password items:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPKS537_TEST_25:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of an HTML paragraph element with text content as website provided:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const paragraphEl = screen.getByText(/Youtube.com/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_26:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of an HTML paragraph element with text content as username provided:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const paragraphEl = screen.getByText(/John/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_27:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of an HTML image element with alt attribute value as "stars" and src as the given stars image URL:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const imageEl = screen.getByRole('img', {name: /stars/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(starsImage)
  })

  it(':::RJSCPKS537_TEST_28:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of an HTML button element with data-testid as "delete":::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const btnEl = screen.getByTestId('delete')
    expect(btnEl).toBeInTheDocument()
    expect(btnEl.tagName).toBe('BUTTON')
  })

  it(':::RJSCPKS537_TEST_29:::When values are provided for a website, username, and password and the Add button is clicked, then the page should consist of an HTML image element with alt attribute value as "delete" and src as the given delete URL:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const imageEl = screen.getByRole('img', {name: /delete/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(deleteImage)
  })

  it(':::RJSCPKS537_TEST_30:::When a new password is added, then the count of the passwords should be incremented by one:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password')
    userEvent.click(addBtn)
    const paragraphEl = screen.getByText(/^1/, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_31:::When a new password is added and "Show passwords" is checked, then the page should consist of an HTML paragraph element with text content as password provided:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.click(screen.getByLabelText(/Show passwords/i, {exact: false}))
    const paragraphEl = screen.getByText(/password123/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_32:::When a non-empty value is provided in the search input element, then that text should be displayed in the search input element:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.type(screen.getByRole('searchbox'), 'Youtube')
    expect(screen.getByRole('searchbox')).toHaveValue('Youtube')
  })

  it(':::RJSCPKS537_TEST_33:::When new passwords are added and a non-empty value is provided in the search input element, the password items should be filtered irrespective of the case:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.type(websiteInputEl, 'Google.com')
    userEvent.type(usernameInputEl, 'Sarah')
    userEvent.type(passwordInputEl, 'password1234')
    userEvent.click(addBtn)
    userEvent.type(screen.getByRole('searchbox'), 'youtube')
    expect(screen.getByText(/Youtube.com/i, {exact: false})).toBeInTheDocument()
    expect(
      screen.queryByText(/Google.com/i, {exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_34:::When new passwords are added and a non-empty value is provided in the search input element, and no password item includes the value given in the search input, then the page should consist of an HTML image element with alt attribute value as "no passwords" and src as the given no passwords image URL:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.type(screen.getByRole('searchbox'), 'random')
    const imageEl = screen.getByRole('img', {
      name: /no passwords/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(noPasswordImage)
  })

  it(':::RJSCPKS537_TEST_35:::When a new password is added and a non-empty value is provided in the search input element, and no password item includes the value given in the search input, then the page should consist of an HTML paragraph element with text content as "No Passwords":::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    userEvent.type(screen.getByRole('searchbox'), 'random')
    const paragraphEl = screen.getByText(/No Passwords/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPKS537_TEST_36:::When a new password is added and the delete button of a password item is clicked, then the respective password item should be deleted:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const btnEl = screen.getByTestId('delete')
    userEvent.click(btnEl)
    expect(
      screen.queryByText(/Youtube.com/i, {exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPKS537_TEST_37:::When a new password is added and the delete button of a password item is clicked, then the page should consist of an HTML image element with alt attribute value as "no passwords" and src as the given no passwords image URL:::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const btnEl = screen.getByTestId('delete')
    userEvent.click(btnEl)
    const imageEl = screen.getByRole('img', {
      name: /no passwords/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(noPasswordImage)
  })

  it(':::RJSCPKS537_TEST_38:::When a new password is added and the delete button of a password item is clicked, then the page should consist of an HTML paragraph element with text content as "No Passwords":::5:::', () => {
    render(<App />)
    const addBtn = screen.getByRole('button', {name: /Add/i, exact: false})
    const websiteInputEl = screen.getByPlaceholderText(/Enter Website/i, {
      exact: false,
    })
    userEvent.type(websiteInputEl, 'Youtube.com')
    const usernameInputEl = screen.getByPlaceholderText(/Enter UserName/i, {
      exact: false,
    })
    userEvent.type(usernameInputEl, 'John')
    const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i, {
      exact: false,
    })
    userEvent.type(passwordInputEl, 'password123')
    userEvent.click(addBtn)
    const btnEl = screen.getByTestId('delete')
    userEvent.click(btnEl)
    const paragraphEl = screen.getByText(/No Passwords/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
