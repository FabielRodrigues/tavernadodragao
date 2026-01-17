import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Drama,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Swords,
    Users
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Swords, label: "Campanhas", path: "/campaigns" },
        { icon: Users, label: "Personagens", path: "/characters" },
        { icon: MessageSquare, label: "Chat", path: "/chat" },
        { icon: Settings, label: "Configurações", path: "/settings" },
    ];

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-lg transition-transform duration-300 ease-in-out transform md:translate-x-0 md:static md:inset-auto",
                !isOpen && "-translate-x-full md:hidden"
            )}
        >
            <div className="flex h-16 items-center justify-center border-b border-border">
                <div className="flex items-center gap-2">
                    <Drama className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-cinzel text-primary">Taverna RPG</span>
                </div>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-4 left-0 right-0 p-4">
                <div className="rounded-lg bg-muted p-4 text-center">
                    <p className="text-xs text-muted-foreground">Logado como</p>
                    <p className="font-semibold text-sm truncate">Mestre de Jogo</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
