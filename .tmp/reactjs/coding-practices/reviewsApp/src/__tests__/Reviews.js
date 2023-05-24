import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const reviewsList = [
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/wade-warren-img.png',
    username: 'Wade Warren',
    companyName: 'Rang',
    description:
      'The most important thing I learnt is that nothing is a failure, but what we learn from that is a rich and rewarding experience.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/adrian-williams-img.png',
    username: 'Adrian Williams',
    companyName: 'WheelO',
    description:
      'Coming to Startup School is the best thing that has happened to me. I wish every startup in the country should get this opportunity.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/sherry-jhonson-img.png',
    username: 'Sherry Johnson',
    companyName: 'MedX',
    description:
      'I am glad to have such experienced mentors guiding us in every step through out the 4 weeks. I have improved personally and developed many interpersonal skills.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/ronald-jones-img.png',
    username: 'Ronald Jones',
    companyName: 'Infinos Tech',
    description:
      'I am really loving the way how mentors are taking care of us, the way they are explaining big theories with lots of case studies and innovative methods.',
  },
]

describe(':::RJSCPUPPE1_TEST_SUITE_1:::Reviews App tests', () => {
  it(':::RJSCPUPPE1_TEST_1:::Page should consist of HTML heading element with text content as "Reviews":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Reviews/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUPPE1_TEST_2:::Page should consist of HTML button element with data-testid attribute value as "leftArrow":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('leftArrow')).toBeInTheDocument()
    expect(screen.getByTestId('leftArrow').tagName).toBe('BUTTON')
  })

  it(':::RJSCPUPPE1_TEST_3:::Page should consist of HTML button element with data-testid attribute value as "rightArrow":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('rightArrow')).toBeInTheDocument()
    expect(screen.getByTestId('rightArrow').tagName).toBe('BUTTON')
  })

  it(':::RJSCPUPPE1_TEST_4:::Page should consist of HTML image element with alt as "left arrow" and src attribute value as URL for left arrow image:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('img', {name: /left arrow/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /left arrow/i}).src).toBe(
      'https://assets.ccbp.in/frontend/react-js/left-arrow-img.png',
    )
  })

  it(':::RJSCPUPPE1_TEST_5:::Page should consist of HTML image element with alt as "right arrow" and src attribute value as URL for right arrow image:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('img', {name: /right arrow/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /right arrow/i}).src).toBe(
      'https://assets.ccbp.in/frontend/react-js/right-arrow-img.png',
    )
  })

  it(':::RJSCPUPPE1_TEST_6:::Page should initially display the first review, and consist of HTML image element with alt value equal to the "username" value in reviewsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('img', {name: reviewsList[0].username, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUPPE1_TEST_7:::Page should initially display the first review, and consist of HTML image element with alt value equal to the "username" and src attribute value equal to the "imgUrl" value in reviewsList provided:::5:::', () => {
    render(<App />)
    const avatar = screen.getByRole('img', {
      name: reviewsList[0].username,
      exact: false,
    })
    expect(avatar.src).toBe(reviewsList[0].imgUrl)
  })

  it(':::RJSCPUPPE1_TEST_8:::Page should initially display the first review, and consist of HTML paragraph element with text content equal to the "username" value in reviewsList provided:::5:::', () => {
    const {username} = reviewsList[0]
    render(<App />)
    expect(screen.getByText(username, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(username, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPUPPE1_TEST_9:::Page should initially display the first review, and consist of HTML paragraph element with text content equal to the "companyName" value in reviewsList provided:::5:::', () => {
    const {companyName} = reviewsList[0]
    render(<App />)
    const paragraphEl = screen.getByText(companyName, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPUPPE1_TEST_10:::Page should initially display the first review, and consist of HTML paragraph element with text content equal to the "description" value in reviewsList provided:::5:::', () => {
    const {description} = reviewsList[0]
    render(<App />)
    const paragraphEl = screen.getByText(description, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPUPPE1_TEST_11:::When the right arrow is clicked, the page should consist of an HTML image element with alt value equal to the "username" and src attribute value equal to the "imgUrl" value of the next review in reviewsList provided:::5:::', () => {
    const {imgUrl, username} = reviewsList[1]
    render(<App />)
    userEvent.click(screen.getByTestId('rightArrow'))
    const imageEl = screen.getByRole('img', {name: username, exact: false})
    expect(imageEl.src).toBe(imgUrl)
  })

  it(':::RJSCPUPPE1_TEST_12:::When the right arrow is clicked, the page should consist of HTML paragraph elements with "username", "companyName", and "description" of the next review in reviewsList provided:::5:::', () => {
    const {username, companyName, description} = reviewsList[1]
    render(<App />)
    userEvent.click(screen.getByTestId('rightArrow'))
    expect(screen.getByText(username)).toBeInTheDocument()
    expect(screen.getByText(companyName)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it(':::RJSCPUPPE1_TEST_13:::When the left arrow is clicked, the page should consist of an HTML image element with alt attribute value equal to the "imgUrl" value of the previous review in reviewsList provided:::5:::', () => {
    const {imgUrl, username} = reviewsList[0]
    render(<App />)
    userEvent.click(screen.getByTestId('rightArrow'))
    userEvent.click(screen.getByTestId('leftArrow'))
    const imageEl = screen.getByRole('img', {name: username, exact: false})
    expect(imageEl.src).toBe(imgUrl)
  })

  it(':::RJSCPUPPE1_TEST_14:::When the left arrow is clicked, the page should consist of HTML paragraph elements with "username", "companyName", and "description" of the previous review in reviewsList provided:::5:::', () => {
    const {username, companyName, description} = reviewsList[0]
    render(<App />)
    userEvent.click(screen.getByTestId('rightArrow'))
    userEvent.click(screen.getByTestId('leftArrow'))
    expect(screen.getByText(username)).toBeInTheDocument()
    expect(screen.getByText(companyName)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it(':::RJSCPUPPE1_TEST_15:::When viewing the first review, there should not be any state change when the HTML button element with data-testid attribute value as "leftArrow" is clicked:::5:::', () => {
    const {username, companyName, description, imgUrl} = reviewsList[0]
    render(<App />)
    userEvent.click(screen.getByTestId('leftArrow'))
    const imageEl = screen.getByRole('img', {name: username, exact: false})
    expect(imageEl.src).toBe(imgUrl)
    expect(screen.getByText(username)).toBeInTheDocument()
    expect(screen.getByText(companyName)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it(':::RJSCPUPPE1_TEST_16:::When viewing the last review, there should not be any state change when the HTML button element with data-testid attribute value as "rightArrow" is clicked:::5:::', () => {
    const {username, companyName, description, imgUrl} = reviewsList[1]
    render(<App />)
    userEvent.click(screen.getByTestId('rightArrow'))
    const imageEl = screen.getByRole('img', {name: username, exact: false})
    expect(imageEl.src).toBe(imgUrl)
    expect(screen.getByText(username)).toBeInTheDocument()
    expect(screen.getByText(companyName)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
