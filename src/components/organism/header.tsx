// import NavigationBar from "../components/molecule/navigation-bar";
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useWeatherProvider } from "../../context/weather-context";

const Header = () => {
  const { searchHistory } = useWeatherProvider();

  return (
    <div className=" h-[75px]">
      <div className="flex w-[40vw] h-[75px] mx-auto justify-between">
        <Link to={"/"} className="location-title flex gap-1 items-center">
          <GrLocation size={28} />
          <span className="text-2xl font-semibold"> {searchHistory[0]}</span>
        </Link>
        <Link to={"/search"} className="search-icon flex items-center">
          <IoSearch size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
