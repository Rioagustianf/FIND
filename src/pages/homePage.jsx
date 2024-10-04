import ComponentNavbar from "../components/Elements/Navbar";
import ComponentSlider from "../components/Layouts/Slider";
import CarouselComponent from "../components/Layouts/Carousel";
import NowPlayingSlider from "../components/Layouts/NowPlayingSlider";
import FooterComponent from "../components/Elements/Footer";
import PopularActor from "./popularActor";

const HomePage = () => {
  return (
    <>
      <ComponentNavbar />
      <CarouselComponent />
      <ComponentSlider title="Popular Movie" />
      <NowPlayingSlider title="Now Playing" />
      <PopularActor />
      <FooterComponent />
    </>
  );
};

export default HomePage;
