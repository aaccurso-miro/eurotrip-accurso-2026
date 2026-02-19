import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import VistaHoy from "@/components/VistaHoy";
import MapSection from "@/components/MapSection";
import TripTimeline from "@/components/TripTimeline";
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
        <VistaHoy />
        <MapSection />
        <TripTimeline />
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
