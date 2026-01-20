import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { UnitsPage } from "./pages/UnitsPage";
import { UnitDetailsPage } from "./pages/UnitDetailsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { DevelopersPage } from "./pages/DevelopersPage";
import { SearchPage } from "./pages/SearchPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/units" element={<UnitsPage />} />
            <Route path="/units/:id" element={<UnitDetailsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
