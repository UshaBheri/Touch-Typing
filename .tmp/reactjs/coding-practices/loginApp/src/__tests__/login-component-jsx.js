import * as csstree from 'css-tree'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const cssCode1 = fs.readFileSync(
  path.resolve(__dirname, '../components/Home/index.css'),
  'utf8',
)
const cssCode2 = fs.readFileSync(
  path.resolve(__dirname, '../components/Login/index.css'),
  'utf8',
)

const cssCode3 = fs.readFileSync(
  path.resolve(__dirname, '../components/Logout/index.css'),
  'utf8',
)

const cssCode4 = fs.readFileSync(
  path.resolve(__dirname, '../components/Message/index.css'),
  'utf8',
)

describe(':::RJSCP83UDS_TEST_SUITE_1:::Login App tests', () => {
  it(':::RJSCP83UDS_TEST_1:::Page should initially consist of an HTML heading element with text content as "Please Login":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Please Login/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP83UDS_TEST_2:::Page should initially consist of an HTML button element with text content as "Login":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument()
  })

  it(':::RJSCP83UDS_TEST_3:::CSS code implementations should not contain "display" property with the value "none":::5:::', () => {
    render(<App />)
    const ast1 = csstree.parse(cssCode1)
    const displayDeclarations1 = csstree.findAll(
      ast1,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl1 = displayDeclarations1.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl1).toBeFalsy()
    const ast2 = csstree.parse(cssCode2)
    const displayDeclarations2 = csstree.findAll(
      ast2,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl2 = displayDeclarations2.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl2).toBeFalsy()
    const ast3 = csstree.parse(cssCode3)
    const displayDeclarations3 = csstree.findAll(
      ast3,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl3 = displayDeclarations3.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl3).toBeFalsy()
    const ast4 = csstree.parse(cssCode4)
    const displayDeclarations4 = csstree.findAll(
      ast4,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl4 = displayDeclarations4.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl4).toBeFalsy()
  })

  it(':::RJSCP83UDS_TEST_4:::When the Login button is clicked, then the text content of the HTML heading element should be changed to "Welcome User":::5:::', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.click(loginButton)
    expect(
      screen.queryByRole('heading', {name: /Please Login/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Welcome User/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP83UDS_TEST_5:::When the Login button is clicked, then the Login button should be changed to the Logout button:::5:::', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.click(loginButton)
    expect(
      screen.queryByRole('button', {name: /Login/i}),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Logout/i})).toBeInTheDocument()
  })

  it(':::RJSCP83UDS_TEST_6:::When the Logout button is clicked, then the text content of the HTML heading element should be changed to "Please Login" and the Logout button should be changed to the Login button:::5:::', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.click(loginButton)
    userEvent.click(screen.getByRole('button', {name: /Logout/i}))
    expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /Logout/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {name: /Welcome User/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Please Login/i,
      }),
    ).toBeInTheDocument()
  })
})
