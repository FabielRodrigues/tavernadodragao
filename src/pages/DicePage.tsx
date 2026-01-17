import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { DiceRoller } from "@/components/dice/DiceRoller";
import { Dices, Info } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function DicePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6 relative animate-in fade-in duration-500">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto pt-8"
                    >
                        {/* Page Header */}
                        <div className="text-center mb-8">
                            <Dices className="h-16 w-16 mx-auto text-primary candle-flicker mb-4" />
                            <h1 className="font-cinzel text-4xl text-foreground mb-2">
                                Rolador de Dados
                            </h1>
                            <p className="text-muted-foreground font-lora">
                                Role seus dados e deixe o destino decidir!
                            </p>
                        </div>

                        {/* Dice Roller */}
                        <DiceRoller />

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 p-4 bg-card/50 border border-border rounded-lg"
                        >
                            <div className="flex gap-3">
                                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div className="text-sm text-muted-foreground font-lora">
                                    <p className="mb-2">
                                        <strong className="text-foreground">Dica:</strong> Em uma campanha,
                                        seus resultados de dados aparecem automaticamente no chat para
                                        todos os jogadores verem.
                                    </p>
                                    <p>
                                        Use os modificadores para adicionar bônus de atributos,
                                        proficiência ou outros efeitos às suas rolagens.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
