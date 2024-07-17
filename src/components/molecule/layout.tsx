import React from "react";
import NavigationBar from "./navigation-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
