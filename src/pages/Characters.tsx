import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { CharacterCard } from "@/components/character/CharacterCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Upload } from "lucide-react";
import { useState } from "react";

const MOCK_CHARACTERS = [
    {
        id: "1",
        name: "Thorin Escudo de Carvalho",
        race: "Anão",
        className: "Guerreiro",
        level: 5,
        hp: { current: 45, max: 52 },
        ac: 18,
        campaign: "A Maldição de Strahd",
    },
    {
        id: "2",
        name: "Eldara a Sábia",
        race: "Elfa",
        className: "Maga",
        level: 5,
        hp: { current: 28, max: 30 },
        ac: 13,
        campaign: "A Maldição de Strahd",
    },
    {
        id: "3",
        name: "Grimjaw o Impiedoso",
        race: "Meio-Orc",
        className: "Bárbaro",
        level: 3,
        hp: { current: 38, max: 38 },
        ac: 14,
    },
    {
        id: "4",
        name: "Lyra Canção Prateada",
        race: "Meio-Elfa",
        className: "Barda",
        level: 4,
        hp: { current: 26, max: 28 },
        ac: 14,
        campaign: "Waterdeep: O Roubo",
    },
];

export default function Characters() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCharacters = MOCK_CHARACTERS.filter(char =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.race.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.className.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
                >
                    <div>
                        <h1 className="font-display text-4xl text-primary mb-2 text-glow">
                            Personagens
                        </h1>
                        <p className="text-muted-foreground font-lora">
                            Gerencie suas fichas de personagem e importe PDFs de D&D 5e.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="medieval">
                            <Upload className="h-4 w-4 mr-2" />
                            Importar PDF
                        </Button>
                        <Button variant="hero">
                            <Plus className="h-5 w-5 mr-2" />
                            Novo Personagem
                        </Button>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar personagens..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:box-glow"
                        />
                    </div>
                </motion.div>

                {/* Characters Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredCharacters.map((character, index) => (
                        <motion.div
                            key={character.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <CharacterCard {...character} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredCharacters.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                            <Search className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="font-display text-xl text-foreground mb-2">
                            Nenhum personagem encontrado
                        </h3>
                        <p className="text-muted-foreground font-lora">
                            Tente uma busca diferente ou crie um novo personagem.
                        </p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
