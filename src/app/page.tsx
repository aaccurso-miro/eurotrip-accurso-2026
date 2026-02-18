import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import MapSection from "@/components/MapSection";
import Itinerary from "@/components/Itinerary";
import CityIntro from "@/components/CityIntro";
import DrivingInfo from "@/components/DrivingInfo";
import WeatherInfo from "@/components/WeatherInfo";
import CurrencyTips from "@/components/CurrencyTips";
import PackingChecklist from "@/components/PackingChecklist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <MapSection />
        <Itinerary />
        <CityIntro />
        <DrivingInfo />
        <WeatherInfo />
        <CurrencyTips />
        <PackingChecklist />
      </main>
      <Footer />
    </>
  );
}
