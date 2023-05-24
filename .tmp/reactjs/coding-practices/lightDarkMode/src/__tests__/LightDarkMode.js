import * as csstree from 'css-tree'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const cssCode = fs.readFileSync(
  path.resolve(__dirname, '../components/LightDarkMode/index.css'),
  'utf8',
)

describe(':::RJSCPPATAJ_TEST_SUITE_1:::Light Dark Mode tests', () => {
  it(':::RJSCPPATAJ_TEST_1:::Page should initially consist of HTML button element with text content as "Light Mode":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Light Mode/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPPATAJ_TEST_2:::CSS code implementation should not contain "display" property with value "none":::5:::', () => {
    render(<App />)
    const ast = csstree.parse(cssCode)
    const displayDeclarations = csstree.findAll(
      ast,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl = displayDeclarations.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl).toBeFalsy()
  })

  it(':::RJSCPPATAJ_TEST_3:::When the app is in Dark mode and the Light Mode button is clicked, then its text content should change to "Dark Mode":::5:::', () => {
    render(<App />)
    const lightModeButton = screen.getByRole('button', {
      name: /Light Mode/i,
    })
    expect(lightModeButton).toBeInTheDocument()
    userEvent.click(lightModeButton)
    expect(screen.getByRole('button', {name: /Dark Mode/i})).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /Light Mode/i}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPPATAJ_TEST_4:::When the app is in Light mode and the Dark Mode button is clicked, then its text content should change to "Light Mode":::5:::', () => {
    render(<App />)
    const lightModeButton = screen.getByRole('button', {
      name: /Light Mode/i,
    })
    expect(lightModeButton).toBeInTheDocument()
    userEvent.click(lightModeButton)

    const darkModeButton = screen.getByRole('button', {
      name: /Dark Mode/i,
    })
    expect(darkModeButton).toBeInTheDocument()
    userEvent.click(darkModeButton)
    expect(
      screen.getByRole('button', {
        name: /Light Mode/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /Dark Mode/i}),
    ).not.toBeInTheDocument()
  })
})
