import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPLC7S2_TEST_SUITE_1:::Capitals App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPLC7S2_TEST_1:::Page should consist of at least two HTML options and the countryAndCapitalsList should be rendered using a unique key as a prop for each capital option:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('option').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPLC7S2_TEST_2:::Page should consist of HTML main heading element with text content as "Countries And Capitals":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /Countries And Capitals/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPLC7S2_TEST_3:::Page should initially consist of HTML select element with value attribute equal to "NEW_DELHI":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').value).toMatch(/NEW_DELHI/i)
  })

  it(':::RJSCPLC7S2_TEST_4:::Page should consist of HTML option elements with text content equal to "capitalDisplayText" of each object in countryAndCapitalsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[0].capitalDisplayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[1].capitalDisplayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[2].capitalDisplayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[3].capitalDisplayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[4].capitalDisplayText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPLC7S2_TEST_5:::Page should consist of HTML option elements with value attribute equal to "id" of each object in countryAndCapitalsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[0].capitalDisplayText,
        exact: false,
      }).value,
    ).toBe(countryAndCapitalsList[0].id)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[1].capitalDisplayText,
        exact: false,
      }).value,
    ).toBe(countryAndCapitalsList[1].id)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[2].capitalDisplayText,
        exact: false,
      }).value,
    ).toBe(countryAndCapitalsList[2].id)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[3].capitalDisplayText,
        exact: false,
      }).value,
    ).toBe(countryAndCapitalsList[3].id)
    expect(
      screen.getByRole('option', {
        name: countryAndCapitalsList[4].capitalDisplayText,
        exact: false,
      }).value,
    ).toBe(countryAndCapitalsList[4].id)
  })

  it(':::RJSCPLC7S2_TEST_6:::Page should consist of HTML paragraph element with text content as "is capital of which country":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/is capital of which country/i, {exact: false}))
  })

  it(':::RJSCPLC7S2_TEST_7:::Page should initially consist of HTML paragraph element with text content equal to "country" value of first item in countryAndCapitalsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByText(countryAndCapitalsList[0].country, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPLC7S2_TEST_8:::When HTML option with value attribute "PARIS" is selected, then the value attribute of the HTML select element should be "PARIS":::5:::', () => {
    render(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      countryAndCapitalsList[2].capitalDisplayText,
    )
    expect(screen.getByRole('combobox').value).toBe(
      countryAndCapitalsList[2].id,
    )
  })

  it(':::RJSCPLC7S2_TEST_9:::When HTML option with the value attribute "PARIS" is selected, then "France" should be displayed in the HTML paragraph element for the country:::5:::', () => {
    render(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      countryAndCapitalsList[2].capitalDisplayText,
    )
    expect(screen.getByText(countryAndCapitalsList[2].country, {exact: false}))
  })
})
