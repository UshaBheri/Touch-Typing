import React from 'react'

const InstaContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default InstaContext
