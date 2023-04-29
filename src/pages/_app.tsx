import '@/styles/globals.css'

import { useEffect, useState } from 'react';
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../../themes'
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}



function MyApp({ Component, pageProps }: Props) {

  // console.log({theme})

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  //le pongo useEffect para que se ejecute una sola vez
  useEffect(() => {
    //estoy guardando en una constante el valor de la cookie o si no existe, le pongo light
    //obtengo el valor de la cookie
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme;

    setCurrentTheme(selectedTheme);
  }, [])



  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}



export default MyApp