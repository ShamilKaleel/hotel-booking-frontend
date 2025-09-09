import Hero from "../components/Hero.jsx";
import InfinitySlider from "../components/InfinitySlider.jsx";
import Services from "../components/Services.jsx";
import AboutPage from "./AboutPage.jsx";

export default function IndexPage() {
  return (
    <>
      <Hero />

      <div className="py-20">{/* <InfinitySlider /> */}</div>

      <div className="mt-20">
        <Services />
      </div>

      <AboutPage />
    </>
  );
}
