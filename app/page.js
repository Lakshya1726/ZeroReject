import Header from "./dashboard/_components/Header";
import HeroSection from "./dashboard/_components/HeroSection";
import Footer from "./dashboard/_components/Footer";
import AIPower from "./dashboard/_components/AIpower";
import HomeStats from "./dashboard/_components/HomeStats";
import Contact from "./dashboard/_components/Contact";
export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <Header/>
        <HeroSection/>
        <HomeStats/>
        <AIPower/>
        <Contact/>
        <Footer/>
      </div>
    </>  
  );
}
