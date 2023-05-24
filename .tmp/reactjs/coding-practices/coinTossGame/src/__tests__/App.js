import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const HEADS_IMG_URL = 'https://assets.ccbp.in/frontend/react-js/heads-img.png'

const TAILS_IMG_URL = 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

describe(':::RJSCP7IIZJ_TEST_SUITE_1:::Coin Toss Game tests', () => {
  it(':::RJSCP7IIZJ_TEST_1:::Page should consist of an HTML main heading element with "Coin Toss Game" as text content:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Coin Toss Game/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP7IIZJ_TEST_2:::Page should consist of an HTML paragraph element with "Heads (or) Tails" as text content:::5:::', () => {
    render(<App />)

    const paragraphEl = screen.getByText(/Heads \(or\) Tails/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCP7IIZJ_TEST_3:::Page should initially consist of an HTML image element with alt attribute value as "toss result" and src attribute value as the URL for heads image:::5:::', () => {
    render(<App />)

    const resultImage = screen.getByRole('img', {
      name: /toss result/i,
      exact: false,
    })

    expect(resultImage).toBeInTheDocument()
    expect(resultImage.src).toBe(HEADS_IMG_URL)
  })

  it(':::RJSCP7IIZJ_TEST_4:::Page should consist of HTML button element with text content as "Toss Coin":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP7IIZJ_TEST_5:::Page should initially consist of HTML paragraph element with text content as "Total: 0":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/Total:\s*0/i, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/Total:\s*0/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCP7IIZJ_TEST_6:::Page should initially consist of HTML paragraph element with text content as "Heads: 0":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/Heads:\s*0/i, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/Heads:\s*0/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCP7IIZJ_TEST_7:::Page should initially consist of HTML paragraph element with text content as "Tails: 0":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/Tails:\s*0/i, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/Tails:\s*0/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCP7IIZJ_TEST_8:::When the Toss Coin button is clicked, if the result is "heads" then the heads image should be displayed:::5:::', () => {
    const originalRandom = Math.random
    const mockRandom = jest.fn().mockReturnValue(0.3)
    Math.random = mockRandom
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    )
    expect(
      screen.getByRole('img', {name: /toss result/i, exact: false}).src,
    ).toBe(HEADS_IMG_URL)
    Math.random = originalRandom
  })

  it(':::RJSCP7IIZJ_TEST_9:::When the Toss Coin button is clicked, if the result is "heads" then the heads count should be incremented by one:::5:::', () => {
    const originalRandom = Math.random
    const mockRandom = jest.fn().mockReturnValue(0.3)
    Math.random = mockRandom
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    )
    expect(screen.getByText(/Heads:\s*1/i, {exact: false})).toBeInTheDocument()
    Math.random = originalRandom
  })

  it(':::RJSCP7IIZJ_TEST_10:::When the Toss Coin button is clicked, if the result is "tails" then the tails image should be displayed:::5:::', () => {
    const originalRandom = Math.random
    const mockRandom = jest.fn().mockReturnValue(0.5)
    Math.random = mockRandom
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    )
    expect(
      screen.getByRole('img', {name: /toss result/i, exact: false}).src,
    ).toBe(TAILS_IMG_URL)
    Math.random = originalRandom
  })

  it(':::RJSCP7IIZJ_TEST_11:::When the Toss Coin button is clicked, if the result is "tails" then the tails count should be incremented by one:::5:::', () => {
    const originalRandom = Math.random
    const mockRandom = jest.fn().mockReturnValue(0.5)
    Math.random = mockRandom
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    )
    expect(screen.getByText(/Tails:\s*1/i, {exact: false})).toBeInTheDocument()
    Math.random = originalRandom
  })

  it(':::RJSCP7IIZJ_TEST_12:::When the Toss Coin button is clicked, the total should be incremented by one:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /toss coin/i, exact: false}),
    )
    expect(screen.getByText(/Total:\s*1/i, {exact: false})).toBeInTheDocument()
  })
})
