import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initTelegram } from "@/lib/telegram";
import SplashPage from "@/pages/Splash";
import RegisterPage from "@/pages/Register";
import DashboardPage from "@/pages/Dashboard";
import PaymentPage from "@/pages/Payment";
import WithdrawPage from "@/pages/Withdraw";
import TestimonialsPage from "@/pages/Testimonials";
import AboutUsPage from "@/pages/AboutUs";
import AMLPolicyPage from "@/pages/AMLPolicy";
import TaxPolicyPage from "@/pages/TaxPolicy";
import AdminPage from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/withdraw" component={WithdrawPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/about" component={AboutUsPage} />
      <Route path="/aml-policy" component={AMLPolicyPage} />
      <Route path="/tax-policy" component={TaxPolicyPage} />
      <Route path="/gmp-admin-secure" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
