import Header from '../Header'
import NavigationBar from '../NavigationBar'

import {
  NotFoundContainer,
  NotFoundVideos,
  NotFoundVideoImgs,
  NotFoundHeading,
  NotFoundNote,
} from './styledComponents'

import ThemeVideoContext from '../../context/ThemeVideoContext'

const NotFound = () => (
  <ThemeVideoContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
      const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b'
      const noteColor = isDarkTheme ? '#e2e8f0' : '#475569'

      const notFoundImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

      return (
        <>
          <Header />
          <NavigationBar />
          <NotFoundContainer bgColor={bgColor}>
            <NotFoundVideos>
              <NotFoundVideoImgs src={notFoundImage} alt="not found" />
              <NotFoundHeading headingColor={headingColor}>
                page not found
              </NotFoundHeading>
              <NotFoundNote noteColor={noteColor}>
                We are sorry, the page you requested could not be found.
              </NotFoundNote>
            </NotFoundVideos>
          </NotFoundContainer>
        </>
      )
    }}
  </ThemeVideoContext.Consumer>
)

export default NotFound
