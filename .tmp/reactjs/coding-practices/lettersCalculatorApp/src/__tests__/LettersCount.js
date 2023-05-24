import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LettersCount from '../App'

const LETTERS_CALCULATOR =
  'https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png'

describe(':::RJSCPB31L8_TEST_SUITE_1:::Letters Calculator tests', () => {
  beforeEach(() => {
    render(<LettersCount />)
  })

  it(':::RJSCPB31L8_TEST_1:::Page should consist of HTML main heading element with text content as "Calculate the Letters you enter":::5:::', () => {
    expect(
      screen.getByRole('heading', {
        name: /Calculate the Letters you enter/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPB31L8_TEST_2:::Page should consist of HTML label element with text content as "Enter the phrase":::5:::', () => {
    const labelEl = screen.getByText(/Enter the phrase/i, {exact: false})

    expect(labelEl).toBeInTheDocument()
    expect(labelEl.tagName).toBe('LABEL')
  })

  it(':::RJSCPB31L8_TEST_3:::Page should consist of HTML input element with label text as "Enter the phrase":::5:::', () => {
    expect(
      screen.getByRole('textbox', {name: /Enter the phrase/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPB31L8_TEST_4:::Page should initially consist of HTML paragraph element with text content as "No.of letters: 0":::5:::', () => {
    const paragraphEl = screen.getByText(/No\.of letters: 0/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPB31L8_TEST_5:::Page should consist of HTML image element with alt attribute value as "letters calculator" and src attribute value as path for stop watch with calculator image:::5:::', () => {
    const imageEl = screen.getByRole('img', {
      name: /letters calculator/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(LETTERS_CALCULATOR)
  })

  it(':::RJSCPB31L8_TEST_6:::When a non-empty value is provided in the HTML input element, then the page should consist of HTML paragraph element with text content having the count of the letters provided:::5:::', () => {
    userEvent.type(screen.getByRole('textbox'), 'ibhubs')
    const paragraphEl = screen.getByText(/6/, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
