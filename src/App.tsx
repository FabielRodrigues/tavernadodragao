import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import Campaigns from "@/pages/Campaigns";
import Characters from "@/pages/Characters";
import Chat from "@/pages/Chat";
import DicePage from "@/pages/DicePage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import CharacterSheet from "@/pages/CharacterSheet";
import GameRoom from "@/pages/GameRoom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dice" element={<DicePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/characters/:id" element={<CharacterSheet />} />
          <Route path="/gameroom/:id" element={<GameRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
