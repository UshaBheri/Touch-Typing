import React from 'react'

const ThemeVideoContext = React.createContext({
  isDarkTheme: false,
  activeTab: 'Home',
  SavedVideos: [],
  toggleTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
})

export default ThemeVideoContext
