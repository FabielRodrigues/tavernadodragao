import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { CharacterSidebar } from "@/components/gameroom/CharacterSidebar";
import { GameRoomChat } from "@/components/gameroom/GameRoomChat";
import { EventLog } from "@/components/gameroom/EventLog";
import { Badge } from "@/components/ui/badge";

const MOCK_CAMPAIGN = {
    id: "1",
    title: "A Cripta dos Sussurros",
    status: "active",
    sessionActive: true,
};

const MOCK_PLAYERS = [
    { id: "1", name: "Aldric Stormweaver", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric", online: true },
    { id: "2", name: "Lyra Shadowmend", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lyra", online: true },
    { id: "3", name: "Gorim Ironforge", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Gorim", online: true },
    { id: "4", name: "DM", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=DM", online: true, isDM: true },
];

const MOCK_CHARACTER = {
    id: "1",
    name: "Aldric Stormweaver",
    class: "Mago",
    level: 5,
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric",
    hp: { current: 28, max: 38 },
    attributes: {
        for: 14,
        des: 16,
        con: 12,
        int: 18,
        sab: 13,
        car: 10,
    },
    quickSkills: [
        { name: "Arcanismo", modifier: 7 },
        { name: "Investigação", modifier: 7 },
        { name: "História", modifier: 7 },
        { name: "Percepção", modifier: 4 },
    ],
};

export default function GameRoom() {
    const [selectedCharacter] = useState(MOCK_CHARACTER);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-16 h-screen flex flex-col">
                {/* Campaign Header Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between z-10"
                >
                    <div className="flex items-center gap-4">
                        <h1 className="font-display text-xl text-foreground text-glow font-bold">
                            {MOCK_CAMPAIGN.title}
                        </h1>
                        {MOCK_CAMPAIGN.sessionActive && (
                            <Badge className="bg-emerald-900/50 text-emerald-400 border-emerald-700 animate-pulse">
                                Sessão Ativa
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Online Players */}
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {MOCK_PLAYERS.slice(0, 4).map((player) => (
                                    <div
                                        key={player.id}
                                        className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden hover:z-20 transition-transform hover:scale-110 cursor-pointer"
                                        title={player.name}
                                    >
                                        <img
                                            src={player.avatar}
                                            alt={player.name}
                                            className="w-full h-full object-cover bg-muted"
                                        />
                                        {player.online && (
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {MOCK_PLAYERS.find(p => p.isDM) && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2 font-lora">
                                    <span className="text-primary font-bold">GM</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content - 3 Column Layout */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar - Character */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-72 bg-card/30 border-r border-border/50 overflow-y-auto hidden lg:block scrollbar-thin"
                    >
                        <CharacterSidebar character={selectedCharacter} />
                    </motion.aside>

                    {/* Center - Chat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 flex flex-col min-w-0 bg-background/50 relative overflow-hidden"
                    >
                        {/* Ambient Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                        <GameRoomChat
                            campaignTitle={MOCK_CAMPAIGN.title}
                            players={MOCK_PLAYERS}
                        />
                    </motion.div>

                    {/* Right Sidebar - Event Log */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-72 bg-card/30 border-l border-border/50 overflow-y-auto hidden xl:block scrollbar-thin"
                    >
                        <EventLog />
                    </motion.aside>
                </div>
            </main>
        </div>
    );
}
