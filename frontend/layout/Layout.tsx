import React, { ReactNode } from "react";
import { Menu } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import textContent from "../utils/content.json";
import { X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col mx-auto w-full max-w-[1200px]">
      <Header />
      <button
        className="fixed top-3 left-4  text-blacks p-2 rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col h-full bg-white w-64">
            <div className="p-4">
              <button onClick={() => setIsMenuOpen(false)}>
                <X />
              </button>
            </div>
            <Sidebar />
            <div className="flex-1 p-4 overflow-y-auto">
              <h2 className="font-bold mb-4">News</h2>
              {/* <NewsItems /> */}
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

const TabletLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col mx-auto w-full max-w-[1200px]">
    <Header />
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto border-r-2 border-r-indigo-90 border-l-2 border-r-indigo-90">
        {children}
      </main>
    </div>
  </div>
);

const DesktopLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col mx-auto w-full max-w-[1200px]">
    <Header />
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto border-r-2 border-r-indigo-90 border-l-2 border-r-indigo-90">
        {children}
      </main>
      <aside className="flex flex-col w-64 p-4">
        {/* <h2 className="font-bold mb-4">What's happening</h2> */}
        <div className="flex-1 overflow-y-auto">{/* <NewsItem  /> */}</div>
        <div className="mt-auto">
          <p className="text-sm text-gray-600">{textContent.copyright}</p>
        </div>
      </aside>
    </div>
  </div>
);

const ResponsiveLayout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <div className="md:hidden">
      <MobileLayout>{children}</MobileLayout>
    </div>
    <div className="hidden md:block lg:hidden">
      <TabletLayout>{children}</TabletLayout>
    </div>
    <div className="hidden lg:block">
      <DesktopLayout>{children}</DesktopLayout>
    </div>
  </>
);

export { MobileLayout, TabletLayout, DesktopLayout, ResponsiveLayout };
