import { useState } from "react";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "../store";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  localStorage.clear();
  return (
    <div
      className="m-0 p-0  "
      style={{
        backgroundImage:
          "url(https://pets-images.dev-apis.com/pets/wallpaperB.jpg)",
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {/* we can put anything inside value like an object, number but in this case i am passing a hook */}
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center ">
              <Link className="text-6xl text-white hover:text-gray-300" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/" element={<SearchParams />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
