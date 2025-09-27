'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { ThemeStateContext } from './ThemeStateContext'
import Cookies from 'js-cookie'

export default function ThemeStateContextProvider({
  children,
  initialTheme,
}: {
  initialTheme: string
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<string>(initialTheme)
  // Create a ref to the theme state to use in the event listener
  const themeRef = useRef<string>(theme)
  // Update the ref when the theme state changes
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  // On load, if there's no theme already set from the cookie, set the cookie based on the user's system preference
  // Update theme based on cookie
  useEffect(() => {
    function initializeTheme() {
      // if the window hasn't loaded, return
      if (typeof window === 'undefined') return
      // If the cookie doesn't exist, set the cookie based on the user's system preference
      const storedTheme = Cookies.get('theme')
      if (!storedTheme) {
        const themeSetting = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'
        Cookies.set('theme', themeSetting)
        setTheme(themeSetting)
      } else {
        setTheme(storedTheme)
      }
    }
    // Initialize theme on mount
    initializeTheme()
  }, [])

  // If the preferred color scheme is changed on the user's system, update the cookie
  useEffect(() => {
    const currentTheme = themeRef.current
    // Create the function to run on the event listener
    function handleSchemeCHange(e: MediaQueryListEvent) {
      // If the current cookie theme is different than the new preferred color scheme, update the cookie
      const newPreferredTheme = e.matches ? 'dark' : 'light'
      if (newPreferredTheme !== currentTheme) {
        setTheme(newPreferredTheme)
        Cookies.set('theme', newPreferredTheme)
      }
    }
    // Add the event listener to the window
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleSchemeCHange)

    // Clean up the event listener
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleSchemeCHange)
    }
  }, [])

  // On toggle, set the cookie to the preferred theme, and update theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    Cookies.set('theme', theme)
  }, [theme])

  // Function to toggle the theme from light to dark and vice versa
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const contextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    }
  }, [theme])

  return (
    <ThemeStateContext.Provider value={contextValue}>
      {children}
    </ThemeStateContext.Provider>
  )
}
