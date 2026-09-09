import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Generator from "./pages/Generator";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import ParentDashboard from "./pages/ParentDashboard";
import QuranRecitation from "./pages/QuranRecitation";
import VideoGenerator from "./pages/VideoGenerator";
import QuizPage from "./pages/QuizPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/quran" element={<QuranRecitation />} />
            <Route path="/video-generator" element={<VideoGenerator />} />
            <Route path="/quiz" element={<QuizPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
