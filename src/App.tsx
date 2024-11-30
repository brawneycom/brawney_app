import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./sentry";

import { HomeScreen } from "./pages/home";
import { LoginScreen } from "./pages/Login";
import { BrawneyErrorBoundary, ForbiddenError } from "./components/error";
import { AuthProvider, MainMenuProvider, SearchProvider } from "./contexts";

import "./App.css";
const queryClient = new QueryClient();

function App() {
  return (
    <BrawneyErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MainMenuProvider>
              <SearchProvider>
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/forbidden" element={<ForbiddenError />} />
                </Routes>
              </SearchProvider>
            </MainMenuProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </BrawneyErrorBoundary>
  );
}

export default App;
