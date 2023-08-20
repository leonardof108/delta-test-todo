import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
