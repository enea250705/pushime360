import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import CalendarPage from "./pages/CalendarPage";
import HolidaysPage from "./pages/HolidaysPage";
import LongWeekendsPage from "./pages/LongWeekendsPage";
import SmartPlannerPage from "./pages/SmartPlannerPage";
import PlannerPage from "./pages/PlannerPage";
import KosovoPage from "./pages/KosovoPage";
import ApiPage from "./pages/ApiPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kalendari" element={<CalendarPage />} />
            <Route path="/festat" element={<HolidaysPage />} />
            <Route path="/fundjava" element={<LongWeekendsPage />} />
            <Route path="/sugjerime" element={<SmartPlannerPage />} />
            <Route path="/plani" element={<PlannerPage />} />
            <Route path="/kosova" element={<KosovoPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
