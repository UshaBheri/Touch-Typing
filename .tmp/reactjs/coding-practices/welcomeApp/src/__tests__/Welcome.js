import * as csstree from 'css-tree'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const cssCode = fs.readFileSync(
  path.resolve(__dirname, '../components/Welcome/index.css'),
  'utf8',
)

describe(':::RJSCPRQUI5_TEST_SUITE_1:::Welcome App tests', () => {
  it(':::RJSCPRQUI5_TEST_1:::Page should consist of HTML main heading element with text content as "Welcome":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Welcome/i})).toBeInTheDocument()
  })

  it(':::RJSCPRQUI5_TEST_2:::Page should initially consist of HTML button element with text content as "Subscribe":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Subscribe$/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRQUI5_TEST_3:::CSS code implementation should not contain "display" property with value "none":::5:::', () => {
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

  it(':::RJSCPRQUI5_TEST_4:::When the Subscribe button is clicked, then its text content should change to "Subscribed":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Subscribe$/i}),
    ).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: /Subscribe$/i}))
    expect(
      screen.queryByRole('button', {name: /Subscribe$/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: /Subscribed/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRQUI5_TEST_5:::When the Subscribed button is clicked, then its text content should change to "Subscribe":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Subscribe$/i}),
    ).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: /Subscribe$/i}))
    userEvent.click(screen.getByRole('button', {name: /Subscribed/i}))
    expect(
      screen.getByRole('button', {name: /Subscribe$/i}),
    ).toBeInTheDocument()
  })
})
