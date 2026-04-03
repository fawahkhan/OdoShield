import { CTASection } from "./components/CTA";
import KillerDemoSection from "./components/Demo";
import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProblemSection from "./components/Problem";
import SolutionSection from "./components/Solution";
import { ThemeProvider } from "./components/ThemeContext";
import { TrustSection } from "./components/Trust";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <KillerDemoSection />
        <TrustSection />
        <CTASection />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
