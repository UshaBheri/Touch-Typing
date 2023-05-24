import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const SEARCH_ICON_URL =
  'https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png'

const tabsList = [
  {tabId: 'SOCIAL', displayText: 'Social'},
  {tabId: 'GAMES', displayText: 'Games'},
  {tabId: 'NEWS', displayText: 'News'},
  {tabId: 'FOOD', displayText: 'Food'},
]

const appsList = [
  {
    appId: 0,
    appName: 'Facebook',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-facebook.png',
    category: 'SOCIAL',
  },
  {
    appId: 1,
    appName: 'Messenger',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-messenger.png',
    category: 'SOCIAL',
  },
  {
    appId: 2,
    appName: 'WhatsApp',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-whatsapp.png',
    category: 'SOCIAL',
  },
  {
    appId: 3,
    appName: 'Instagram',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-instagram.png',
    category: 'SOCIAL',
  },
  {
    appId: 4,
    appName: 'Snapchat',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-snapchat.png',
    category: 'SOCIAL',
  },
  {
    appId: 5,
    appName: 'Twitter',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-twitter.png',
    category: 'SOCIAL',
  },
  {
    appId: 6,
    appName: 'Pinterest',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-pinterest.png',
    category: 'SOCIAL',
  },
  {
    appId: 7,
    appName: 'WeChat',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-wechat.png',
    category: 'SOCIAL',
  },
  {
    appId: 8,
    appName: 'LinkedIn',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-linkedin.png',
    category: 'SOCIAL',
  },
  {
    appId: 9,
    appName: 'Telegram',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/social-telegram.png',
    category: 'SOCIAL',
  },
  {
    appId: 10,
    appName: 'Subway Surfers',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-subway-surfers.png',
    category: 'GAMES',
  },
  {
    appId: 11,
    appName: 'Crossy Road',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-crossy-road.png',
    category: 'GAMES',
  },
  {
    appId: 12,
    appName: 'Super Chef',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-super-chef.png',
    category: 'GAMES',
  },
  {
    appId: 13,
    appName: 'Angry Birds',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-angry-birds.png',
    category: 'GAMES',
  },
  {
    appId: 14,
    appName: 'Hill Climb 2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-hill-climb-2.png',
    category: 'GAMES',
  },
  {
    appId: 15,
    appName: 'Temple Run',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-temple-run.png',
    category: 'GAMES',
  },
  {
    appId: 16,
    appName: 'Dr. Driving',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-dr-driving.png',
    category: 'GAMES',
  },
  {
    appId: 17,
    appName: 'Smurfs Bubble',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-smurfs-bubble.png',
    category: 'GAMES',
  },
  {
    appId: 18,
    appName: 'Grade Learning',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-grade-learning.png',
    category: 'GAMES',
  },
  {
    appId: 19,
    appName: 'My Talking Tom',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/games-my-talking-tom.png',
    category: 'GAMES',
  },
  {
    appId: 20,
    appName: 'Inshorts',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-inshorts.png',
    category: 'NEWS',
  },
  {
    appId: 21,
    appName: 'Way2News',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-way2news.png',
    category: 'NEWS',
  },
  {
    appId: 22,
    appName: 'Google News',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-google-news.png',
    category: 'NEWS',
  },
  {
    appId: 23,
    appName: 'Flipboard',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-flipboard.png',
    category: 'NEWS',
  },
  {
    appId: 24,
    appName: 'SmartNews',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-smart-news.png',
    category: 'NEWS',
  },
  {
    appId: 25,
    appName: 'BBC News',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-bbc-news.png',
    category: 'NEWS',
  },
  {
    appId: 26,
    appName: 'CNN News',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-cnn-news.png',
    category: 'NEWS',
  },
  {
    appId: 27,
    appName: 'Daily Wire',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-daily-wire.png',
    category: 'NEWS',
  },
  {
    appId: 28,
    appName: 'AP News',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-ap-news.png',
    category: 'NEWS',
  },
  {
    appId: 29,
    appName: 'News Break',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/news-news-break.png',
    category: 'NEWS',
  },
  {
    appId: 30,
    appName: 'Zomato',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-zomato.png',
    category: 'FOOD',
  },
  {
    appId: 31,
    appName: 'Swiggy',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-swiggy.png',
    category: 'FOOD',
  },
  {
    appId: 32,
    appName: "Domino's Pizza",
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-dominos.png',
    category: 'FOOD',
  },
  {
    appId: 33,
    appName: 'All in One',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-all-in-one.png',
    category: 'FOOD',
  },
  {
    appId: 34,
    appName: 'Instacart',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-insta-cart.png',
    category: 'FOOD',
  },
  {
    appId: 35,
    appName: 'Saucey',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-saucey.png',
    category: 'FOOD',
  },
  {
    appId: 36,
    appName: 'Waitr',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-waitr.png',
    category: 'FOOD',
  },
  {
    appId: 37,
    appName: 'Grubhub',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-grubhub.png',
    category: 'FOOD',
  },
  {
    appId: 38,
    appName: 'Mercato',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/app-store/food-mercato.png',
    category: 'FOOD',
  },
  {
    appId: 39,
    appName: 'DOT',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/app-store/food-dot.png',
    category: 'FOOD',
  },
]

function getFilteredSearchResults(searchText, categoryId) {
  const searchResults = appsList.filter(eachApp =>
    eachApp.appName.toLowerCase().includes(searchText.toLowerCase()),
  )
  const filteredApps = searchResults.filter(
    eachSearchedApp => eachSearchedApp.category === categoryId,
  )

  return filteredApps
}

const originalConsoleError = console.error

describe(':::RJSCPA6SPQ_TEST_SUITE_1:::App Store tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPA6SPQ_TEST_1:::Page should consist of at least two HTML list items and the tabsList, appsList should be rendered using a unique key as a prop for each tab item and app item respectively:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPA6SPQ_TEST_2:::Page should consist of HTML main heading element with text content as "App Store":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /App Store/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_3:::Page should consist of HTML input element with type attribute value as "search":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_4:::Page should consist of HTML image element with alt attribute value as "search icon" and src attribute value as URL for the search icon:::5:::', () => {
    render(<App />)

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
      exact: false,
    })

    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon.src).toBe(SEARCH_ICON_URL)
  })

  it(':::RJSCPA6SPQ_TEST_5:::Page should consist of at least two HTML unordered list elements to display the tabsList and appsList respectively:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPA6SPQ_TEST_6:::Page should initially consist of at least fourteen HTML list items:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(14)
  })

  it(':::RJSCPA6SPQ_TEST_7:::Page should consist of at least four HTML button elements each inside a HTML list item:::5:::', () => {
    const {container} = render(<App />)
    const buttonElements = container.querySelectorAll('li > button')
    expect(buttonElements.length).toBeGreaterThanOrEqual(4)
  })

  it(':::RJSCPA6SPQ_TEST_8:::Page should consist of at least four HTML button elements with text content equal to the "displayText" value of each item in tabsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: tabsList[0].displayText, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: tabsList[1].displayText, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: tabsList[2].displayText, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: tabsList[3].displayText, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_9:::Page should initially consist of at least ten HTML image elements inside HTML list items:::5:::', () => {
    const {container} = render(<App />)
    const imageElements = container.querySelectorAll('li > img')
    expect(imageElements.length).toBeGreaterThanOrEqual(10)
  })

  it(':::RJSCPA6SPQ_TEST_10:::Page should initially consist of at least ten HTML paragraph elements inside HTML list items:::5:::', () => {
    const {container} = render(<App />)
    const paragraphElements = container.querySelectorAll('li > p')
    expect(paragraphElements.length).toBeGreaterThanOrEqual(10)
  })

  it(':::RJSCPA6SPQ_TEST_11:::Page should initially display the apps from the "Social" category:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: tabsList[0].displayText, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_12:::Page should initially consist of HTML image elements with alt value equal to "appName" value and src value equal to "imageUrl" value of each item with "category" equal to "Social" in appsList provided:::5:::', () => {
    render(<App />)
    const firstSocialAppImg = screen.getByRole('img', {
      name: appsList[0].appName,
      exact: false,
    })
    const secondSocialAppImg = screen.getByRole('img', {
      name: appsList[1].appName,
      exact: false,
    })
    const thirdSocialAppImg = screen.getByRole('img', {
      name: appsList[2].appName,
      exact: false,
    })
    const fourthSocialAppImg = screen.getByRole('img', {
      name: appsList[3].appName,
      exact: false,
    })
    const fifthSocialAppImg = screen.getByRole('img', {
      name: appsList[4].appName,
      exact: false,
    })
    const sixthSocialAppImg = screen.getByRole('img', {
      name: appsList[5].appName,
      exact: false,
    })
    const seventhSocialAppImg = screen.getByRole('img', {
      name: appsList[6].appName,
      exact: false,
    })
    const eighthSocialAppImg = screen.getByRole('img', {
      name: appsList[7].appName,
      exact: false,
    })
    const ninthSocialAppImg = screen.getByRole('img', {
      name: appsList[8].appName,
      exact: false,
    })
    const tenthSocialAppImg = screen.getByRole('img', {
      name: appsList[9].appName,
      exact: false,
    })

    expect(firstSocialAppImg).toBeInTheDocument()
    expect(firstSocialAppImg.src).toBe(appsList[0].imageUrl)

    expect(secondSocialAppImg).toBeInTheDocument()
    expect(secondSocialAppImg.src).toBe(appsList[1].imageUrl)

    expect(thirdSocialAppImg).toBeInTheDocument()
    expect(thirdSocialAppImg.src).toBe(appsList[2].imageUrl)

    expect(fourthSocialAppImg).toBeInTheDocument()
    expect(fourthSocialAppImg.src).toBe(appsList[3].imageUrl)

    expect(fifthSocialAppImg).toBeInTheDocument()
    expect(fifthSocialAppImg.src).toBe(appsList[4].imageUrl)

    expect(sixthSocialAppImg).toBeInTheDocument()
    expect(sixthSocialAppImg.src).toBe(appsList[5].imageUrl)

    expect(seventhSocialAppImg).toBeInTheDocument()
    expect(seventhSocialAppImg.src).toBe(appsList[6].imageUrl)

    expect(eighthSocialAppImg).toBeInTheDocument()
    expect(eighthSocialAppImg.src).toBe(appsList[7].imageUrl)

    expect(ninthSocialAppImg).toBeInTheDocument()
    expect(ninthSocialAppImg.src).toBe(appsList[8].imageUrl)

    expect(tenthSocialAppImg).toBeInTheDocument()
    expect(tenthSocialAppImg.src).toBe(appsList[9].imageUrl)
  })

  it(':::RJSCPA6SPQ_TEST_13:::Page should initially consist of HTML paragraph elements with text content equal to the "appName" value of each item with "category" equal to "Social" in appsList provided:::5:::', () => {
    render(<App />)

    const firstParagraphEl = screen.getByText(appsList[0].appName, {
      exact: false,
    })
    const secondParagraphEl = screen.getByText(appsList[1].appName, {
      exact: false,
    })
    const thirdParagraphEl = screen.getByText(appsList[2].appName, {
      exact: false,
    })
    const fourthParagraphEl = screen.getByText(appsList[3].appName, {
      exact: false,
    })
    const fifthParagraphEl = screen.getByText(appsList[4].appName, {
      exact: false,
    })
    const sixthParagraphEl = screen.getByText(appsList[5].appName, {
      exact: false,
    })
    const seventhParagraphEl = screen.getByText(appsList[6].appName, {
      exact: false,
    })
    const eighthParagraphEl = screen.getByText(appsList[7].appName, {
      exact: false,
    })

    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')

    expect(thirdParagraphEl).toBeInTheDocument()
    expect(thirdParagraphEl.tagName).toBe('P')

    expect(fourthParagraphEl).toBeInTheDocument()
    expect(fourthParagraphEl.tagName).toBe('P')

    expect(fifthParagraphEl).toBeInTheDocument()
    expect(fifthParagraphEl.tagName).toBe('P')

    expect(sixthParagraphEl).toBeInTheDocument()
    expect(sixthParagraphEl.tagName).toBe('P')

    expect(seventhParagraphEl).toBeInTheDocument()
    expect(seventhParagraphEl.tagName).toBe('P')

    expect(eighthParagraphEl).toBeInTheDocument()
    expect(eighthParagraphEl.tagName).toBe('P')
  })

  it(':::RJSCPA6SPQ_TEST_14:::When a non-empty value is provided in search input, the list of apps displayed should consist of the search input provided in the app name irrespective of the case:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'wE')

    expect(
      screen.getByRole('img', {name: appsList[7].appName, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_15:::When a tab is clicked, the filtered apps list should be displayed according to the active tab:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: tabsList[1].displayText, exact: false}),
    )
    expect(
      screen.getByRole('img', {name: appsList[10].appName, exact: false}).src,
    ).toBe(appsList[10].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[11].appName, exact: false}).src,
    ).toBe(appsList[11].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[12].appName, exact: false}).src,
    ).toBe(appsList[12].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[13].appName, exact: false}).src,
    ).toBe(appsList[13].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[14].appName, exact: false}).src,
    ).toBe(appsList[14].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[15].appName, exact: false}).src,
    ).toBe(appsList[15].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[16].appName, exact: false}).src,
    ).toBe(appsList[16].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[17].appName, exact: false}).src,
    ).toBe(appsList[17].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[18].appName, exact: false}).src,
    ).toBe(appsList[18].imageUrl)
    expect(
      screen.getByRole('img', {name: appsList[19].appName, exact: false}).src,
    ).toBe(appsList[19].imageUrl)
    expect(
      screen.getByText(appsList[10].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[11].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[12].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[13].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[14].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[15].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[16].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[17].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[18].appName, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(appsList[19].appName, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPA6SPQ_TEST_16:::When a non-empty search text "m" is provided in search input, and a tab is clicked the filtered search results should be displayed:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'm')
    let filteredResults = getFilteredSearchResults('m', tabsList[0].tabId)
    expect(screen.getAllByRole('listitem').length).toBe(
      filteredResults.length + 4,
    )

    userEvent.click(
      screen.getByRole('button', {name: tabsList[1].displayText, exact: false}),
    )
    filteredResults = getFilteredSearchResults('m', tabsList[1].tabId)
    expect(screen.getAllByRole('listitem').length).toBe(
      filteredResults.length + 4,
    )
    expect(screen.getByText(filteredResults[0].appName, {exact: false}))
    expect(screen.getByText(filteredResults[1].appName, {exact: false}))
    expect(screen.getByText(filteredResults[2].appName, {exact: false}))
    expect(screen.getByText(filteredResults[3].appName, {exact: false}))
  })

  it(':::RJSCPA6SPQ_TEST_17:::When a non-empty random search text is provided in search input, and a tab is clicked the filtered search results should be displayed:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'asdf')
    expect(screen.getAllByRole('listitem').length).toBe(4)
  })
})
