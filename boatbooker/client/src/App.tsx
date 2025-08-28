import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Fleet from "@/pages/fleet";
import Destinations from "@/pages/destinations";
import Services from "@/pages/services";
import Contacts from "@/pages/contacts";
import YachtDetail from "@/pages/yacht-detail";
import Booking from "@/pages/booking";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/whatsapp-button";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/fleet" component={Fleet} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/services" component={Services} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/yacht/:yachtId" component={YachtDetail} />
          <Route path="/booking/:yachtId?" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
