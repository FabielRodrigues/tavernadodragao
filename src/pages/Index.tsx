import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Swords, Scroll, Users, Dices, Sparkles, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-tavern.jpg";
import { useState } from "react";

const features = [
    {
        icon: Sparkles,
        title: "DM Inteligente",
        description: "Mestre de Jogo com IA que cria narrativas dinâmicas e responde às suas ações em tempo real.",
    },
    {
        icon: Scroll,
        title: "Fichas Digitais",
        description: "Importe fichas de D&D 5e em PDF e converta automaticamente para o formato digital.",
    },
    {
        icon: Users,
        title: "Play-by-Post",
        description: "Jogue de forma assíncrona com seu grupo, sem necessidade de horários fixos.",
    },
    {
        icon: Dices,
        title: "Sistema de Dados",
        description: "Rolagem de dados visual com animações 3D e resultados automáticos no chat.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Index() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar added for navigation consistency if user is logged in, or just accessible */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-auto">
                    {/* Hero Section */}
                    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${heroImage})` }}
                        />
                        <div className="absolute inset-0 gradient-tavern" />
                        <div className="absolute inset-0 gradient-candle" />

                        {/* Content */}
                        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-4xl mx-auto"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="mb-8"
                                >
                                    <Swords className="h-20 w-20 mx-auto text-primary candle-flicker" />
                                </motion.div>

                                <h1 className="font-cinzel text-5xl md:text-7xl text-foreground mb-6 text-glow">
                                    RPG de Mesa
                                </h1>

                                <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto font-lora">
                                    Sua taverna virtual para aventuras épicas
                                </p>

                                <p className="text-lg text-muted-foreground/80 mb-10 max-w-xl mx-auto font-lora">
                                    Crie campanhas, convide amigos e deixe nossa IA conduzir narrativas inesquecíveis no estilo Play-by-Post.
                                </p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <Link to="/campaigns">
                                        <Button variant="hero" size="xl">
                                            Começar Aventura
                                            <ChevronRight className="h-5 w-5 ml-2" />
                                        </Button>
                                    </Link>
                                    <Link to="/dice">
                                        <Button variant="medieval" size="xl">
                                            <Dices className="h-5 w-5 mr-2" />
                                            Testar Dados
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
                            >
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* Features Section */}
                    <section className="py-24 bg-card/50 parchment-texture">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <h2 className="font-cinzel text-4xl text-foreground mb-4">
                                    Por que jogar aqui?
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto font-lora">
                                    Uma plataforma completa para suas aventuras de RPG de mesa,
                                    combinando tecnologia moderna com a magia das histórias clássicas.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        variants={itemVariants}
                                        className="group p-6 bg-card border-medieval rounded-xl hover:box-glow transition-all"
                                    >
                                        <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                                            <feature.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <h3 className="font-cinzel text-xl text-foreground mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm font-lora">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
                        <div className="container mx-auto px-4 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="max-w-3xl mx-auto text-center"
                            >
                                <Scroll className="h-16 w-16 mx-auto text-primary mb-6" />
                                <h2 className="font-cinzel text-4xl md:text-5xl text-foreground mb-6">
                                    Pronto para sua próxima aventura?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 font-lora">
                                    Junte-se a outros aventureiros e comece a criar histórias épicas hoje mesmo.
                                </p>
                                <Link to="/campaigns">
                                    <Button variant="hero" size="xl">
                                        Criar Minha Campanha
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-8 border-t border-border">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Swords className="h-5 w-5 text-primary" />
                                    <span className="font-cinzel text-sm text-muted-foreground">
                                        RPG de Mesa © 2026
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground font-lora">
                                    Feito com ❤️ para aventureiros
                                </p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
