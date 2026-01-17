import { useState } from "react";
import Sidebar from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-auto p-4 pt-20 md:p-6 md:pt-24 pb-20 md:pb-6 relative animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
