import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import HolidaysPage from "./pages/HolidaysPage.tsx";
import LongWeekendsPage from "./pages/LongWeekendsPage.tsx";
import SmartPlannerPage from "./pages/SmartPlannerPage.tsx";
import PersonalPlannerPage from "./pages/PersonalPlannerPage.tsx";
import KosovoPage from "./pages/KosovoPage.tsx";
import ApiPage from "./pages/ApiPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kalendari" element={<CalendarPage />} />
          <Route path="/festat" element={<HolidaysPage />} />
          <Route path="/fundjava" element={<LongWeekendsPage />} />
          <Route path="/sugjerime" element={<SmartPlannerPage />} />
          <Route path="/plani" element={<PersonalPlannerPage />} />
          <Route path="/kosova" element={<KosovoPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
