import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Compass, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background parchment-texture p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-card border-medieval p-12 text-center rounded-xl shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />

                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="mb-8 inline-block"
                >
                    <Compass className="h-20 w-20 text-primary mx-auto opacity-50" />
                </motion.div>

                <h1 className="font-display text-6xl text-primary mb-2 text-glow">404</h1>

                <h2 className="font-display text-2xl text-foreground mb-4">
                    Caminho Perdido
                </h2>

                <p className="font-lora text-muted-foreground mb-8 text-lg">
                    Parece que você se aventurou além dos mapas conhecidos.
                    Este território ainda não foi explorado pelos nossos cartógrafos.
                </p>

                <div className="flex flex-col gap-3">
                    <Link to="/">
                        <Button variant="hero" className="w-full">
                            <Home className="h-4 w-4 mr-2" />
                            Retornar à Taverna
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="text-muted-foreground hover:text-primary transition-colors font-lora"
                    >
                        Voltar ao Caminho Anterior
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
