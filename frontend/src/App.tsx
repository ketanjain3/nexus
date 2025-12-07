import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConnectWallet from "./pages/ConnectWallet";
import Dashboard from "./pages/Dashboard";
import CreatePool from "./pages/CreatePool";
import BrowsePools from "./pages/BrowsePools";
import PoolDetails from "./pages/PoolDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-pool" element={<CreatePool />} />
          <Route path="/browse-pools" element={<BrowsePools />} />
          <Route path="/pool/:id" element={<PoolDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
