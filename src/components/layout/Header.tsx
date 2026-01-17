import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Swords, User, Bell, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
    toggleSidebar?: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Swords className="h-8 w-8 text-primary candle-flicker" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-cinzel text-xl text-glow-subtle hidden sm:block">
                            RPG de Mesa
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/campaigns"
                            className="text-muted-foreground hover:text-primary transition-colors font-lora"
                        >
                            Campanhas
                        </Link>
                        <Link
                            to="/characters"
                            className="text-muted-foreground hover:text-primary transition-colors font-lora"
                        >
                            Personagens
                        </Link>
                        <Link
                            to="/dice"
                            className="text-muted-foreground hover:text-primary transition-colors font-lora"
                        >
                            Dados
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full text-[10px] flex items-center justify-center text-accent-foreground">
                                3
                            </span>
                        </Button>
                        <Button variant="medieval" size="sm">
                            <User className="h-4 w-4 mr-2" />
                            Entrar
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                            if (toggleSidebar && !mobileMenuOpen) {
                                // Optional: Close sidebar if opening menu, or toggle sidebar instead?
                                // For now, let's keep them separate or let this handle nav.
                            }
                        }}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background"
                    >
                        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link
                                to="/campaigns"
                                className="text-foreground hover:text-primary transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Campanhas
                            </Link>
                            <Link
                                to="/characters"
                                className="text-foreground hover:text-primary transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Personagens
                            </Link>
                            <Link
                                to="/dice"
                                className="text-foreground hover:text-primary transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dados
                            </Link>
                            <Button variant="medieval" className="w-full mt-2">
                                <User className="h-4 w-4 mr-2" />
                                Entrar
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
