import SearchWeatherForm from "../components/molecule/search-weather-form";
import { IoSearch } from "react-icons/io5";
import { CgTrashEmpty } from "react-icons/cg";
import { useWeatherProvider } from "../context/weather-context";
import "./search.css";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { setCity, searchHistory, setSearchHistory } = useWeatherProvider();
  const [formWeather] = Form.useForm();
  const navigate = useNavigate();

  const handleSearchCity = async (value: string) => {
    const apiKey = import.meta.env.VITE_API_OPEN_WEATHER;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    const params = new URLSearchParams({
      q: value,
      units: "metric",
      appid: apiKey,
    });

    try {
      const response = await fetch(`${baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (!data) {
        formWeather.setFields([
          { name: "city", errors: ["Invalid country or city"] },
        ]);
      }

      setCity(value);
      setSearchHistory((prev) => {
        // when search new city, that new city will be on top
        const newData = [
          `${data?.name}, ${data?.sys.country}`,
          ...prev.filter(
            (item) => !item.includes(`${data?.name}, ${data?.sys.country}`)
          ),
        ];
        localStorage.setItem("searchHistory", JSON.stringify(newData));
        return newData;
      });

      navigate("/");
    } catch (error) {
      formWeather.setFields([
        { name: "city", errors: ["Invalid country or city"] },
      ]);
    }
  };

  return (
    <div className="w-[40vw] mx-auto pt-4">
      <div className="flex flex-col gap-5">
        <SearchWeatherForm onFinish={handleSearchCity} form={formWeather} />
        <div className="lg:text-2xl font-medium">Search History</div>
        <div className="bg-white min-h-[250px] w-auto rounded-2xl border border-gray-200 shadow-xl px-6 py-8 flex flex-col gap-7">
          {searchHistory.map((item, index) => {
            const keyItem = `${item}-${index}`;
            return (
              <div className="flex justify-between" key={keyItem}>
                <span className="lg:text-2xl text-gray-700">{item}</span>
                <div className="action-group flex align-middle gap-5">
                  <button
                    onClick={() => {
                      handleSearchCity(item.split(",")[0]);
                    }}
                  >
                    <IoSearch size={32} />
                  </button>
                  <button
                    onClick={() => {
                      if (searchHistory.length <= 1) {
                        handleSearchCity("Singapore");
                      }
                      setSearchHistory((prev) => {
                        const newData = [...prev.filter((i) => i !== item)];
                        localStorage.setItem(
                          "searchHistory",
                          JSON.stringify(newData)
                        );
                        return newData;
                      });
                    }}
                  >
                    <CgTrashEmpty size={32} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
