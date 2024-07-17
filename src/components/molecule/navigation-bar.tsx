import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigationArray = [
    { title: "Home", link: "/" },
    { title: "Search & history", link: "/search" },
  ];
  return (
    <header className="w-full h-20 bg-[#C2E9F2]/20 backdrop-blur-2xl sticky top-0 z-50">
      <div className="h-full max-w-screen-xl mx-auto flex items-center justify-between ">
        <div>
          <Link to={"/"}>
            <img
              src={"../../../public/open-weather-logo.png"}
              alt="logo"
              className="w-24"
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {navigationArray.map(({ title, link }) => (
            <Link key={link} to={link}>
              <p
                className={`${
                  pathname === link ? "text-black" : "text-gray-700"
                } text-lg uppercase font-semibold hover:text-black cursor-pointer duration-300 `}
              >
                {title}
              </p>
            </Link>
          ))}

          <button className="w-28 h-10 uppercase" />
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
