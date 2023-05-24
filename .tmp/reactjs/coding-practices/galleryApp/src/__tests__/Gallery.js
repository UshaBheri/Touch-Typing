import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GalleryApp from '../App'

const imagesList = [
  {
    id: 0,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-pond-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-pond-thumbnail-img.png',
    imageAltText: 'nature mountain with pond',
    thumbnailAltText: 'nature mountain with pond thumbnail',
  },
  {
    id: 1,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-sunset-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-sunset-thumbnail-img.png',
    imageAltText: 'nature sunset',
    thumbnailAltText: 'nature sunset thumbnail',
  },
  {
    id: 2,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-ocean-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-ocean-thumbnail-img.png',
    imageAltText: 'nature mountain with ocean',
    thumbnailAltText: 'nature mountain with ocean thumbnail',
  },
  {
    id: 3,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-forest-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-forest-thumbnail-img.png',
    imageAltText: 'nature mountain with forest',
    thumbnailAltText: 'nature mountain with forest thumbnail',
  },
  {
    id: 4,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-leaves-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-leaves-thumbnail-img.png',
    imageAltText: 'nature leaves',
    thumbnailAltText: 'nature leaves thumbnail',
  },
  {
    id: 5,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-tree-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-tree-thumbnail-img.png',
    imageAltText: 'nature tree',
    thumbnailAltText: 'nature tree thumbnail',
  },
  {
    id: 6,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-waterfall-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-waterfall-thumbnail-img.png',
    imageAltText: 'nature waterfall',
    thumbnailAltText: 'nature waterfall thumbnail',
  },
  {
    id: 7,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-river-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-river-thumbnail-img.png',
    imageAltText: 'nature river',
    thumbnailAltText: 'nature river thumbnail',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPF54VJ_TEST_SUITE_1:::Gallery App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPF54VJ_TEST_1:::Page should consist of at least two HTML list items and the imagesList should be rendered using a unique key as a prop for each thumbnail item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<GalleryApp />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPF54VJ_TEST_2:::Page should initially consist of HTML image element with alt equal to the "imageAltText" and src value equal to the "imageUrl" of the first object in imagesList provided:::5:::', () => {
    render(<GalleryApp />)
    const imageEl = screen.getByRole('img', {
      name: imagesList[0].imageAltText,
      exact: true,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(imagesList[0].imageUrl)
  })

  it(':::RJSCPF54VJ_TEST_3:::Page should consist of HTML main heading element with text content as "Nature Photography" and HTML paragraph element with text content as "Nature Photography by Rahul":::5:::', () => {
    render(<GalleryApp />)

    const paragraphEl = screen.getByText(/Nature Photography by Rahul/i, {
      exact: false,
    })

    expect(
      screen.getByRole('heading', {name: /Nature Photography$/i, exact: false}),
    ).toBeInTheDocument()

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPF54VJ_TEST_4:::Page should consist of HTML unordered list element to display the thumbnails:::5:::', () => {
    render(<GalleryApp />)

    const unorderedListEl = screen.getByRole('list')

    expect(unorderedListEl).toBeInTheDocument()
    expect(unorderedListEl.tagName).toBe('UL')
  })

  it(':::RJSCPF54VJ_TEST_5:::Page should consist of at least eight HTML button elements each inside an HTML list item:::5:::', () => {
    const {container} = render(<GalleryApp />)
    const buttonElements = container.querySelectorAll('li > button')
    expect(buttonElements.length).toBeGreaterThanOrEqual(8)
  })

  it(':::RJSCPF54VJ_TEST_6:::Page should consist of at least eight HTML image elements with alt value equal to the "thumbnailAltText" and src value equal to the "thumbnailUrl" in imagesList provided:::5:::', () => {
    render(<GalleryApp />)

    const firstImgEl = screen.getByRole('img', {
      name: imagesList[0].thumbnailAltText,
      exact: false,
    })
    const secondImgEl = screen.getByRole('img', {
      name: imagesList[1].thumbnailAltText,
      exact: false,
    })
    const thirdImgEl = screen.getByRole('img', {
      name: imagesList[2].thumbnailAltText,
      exact: false,
    })
    const fourthImgEl = screen.getByRole('img', {
      name: imagesList[3].thumbnailAltText,
      exact: false,
    })
    const fifthImgEl = screen.getByRole('img', {
      name: imagesList[4].thumbnailAltText,
      exact: false,
    })
    const sixthImgEl = screen.getByRole('img', {
      name: imagesList[5].thumbnailAltText,
      exact: false,
    })
    const seventhImgEl = screen.getByRole('img', {
      name: imagesList[6].thumbnailAltText,
      exact: false,
    })
    const eighthImgEl = screen.getByRole('img', {
      name: imagesList[7].thumbnailAltText,
      exact: false,
    })

    expect(firstImgEl).toBeInTheDocument()
    expect(firstImgEl.src).toBe(imagesList[0].thumbnailUrl)

    expect(secondImgEl).toBeInTheDocument()
    expect(secondImgEl.src).toBe(imagesList[1].thumbnailUrl)

    expect(thirdImgEl).toBeInTheDocument()
    expect(thirdImgEl.src).toBe(imagesList[2].thumbnailUrl)

    expect(fourthImgEl).toBeInTheDocument()
    expect(fourthImgEl.src).toBe(imagesList[3].thumbnailUrl)

    expect(fifthImgEl).toBeInTheDocument()
    expect(fifthImgEl.src).toBe(imagesList[4].thumbnailUrl)

    expect(sixthImgEl).toBeInTheDocument()
    expect(sixthImgEl.src).toBe(imagesList[5].thumbnailUrl)

    expect(seventhImgEl).toBeInTheDocument()
    expect(seventhImgEl.src).toBe(imagesList[6].thumbnailUrl)

    expect(eighthImgEl).toBeInTheDocument()
    expect(eighthImgEl.src).toBe(imagesList[7].thumbnailUrl)
  })

  it(':::RJSCPF54VJ_TEST_7:::When a thumbnail image is clicked, then the active image should have alt equal to the "imageAltText" and src value equal to the "imageUrl" of the thumbnail clicked:::5:::', () => {
    render(<GalleryApp />)
    userEvent.click(
      screen.getByRole('img', {
        name: imagesList[3].thumbnailAltText,
        exact: false,
      }),
    )

    const imageEl = screen.getByRole('img', {
      name: imagesList[3].imageAltText,
      exact: true,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(imagesList[3].imageUrl)
  })
})
