import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";

const MOCK_CAMPAIGNS = [
    {
        id: "1",
        title: "A Maldição de Strahd",
        description: "Uma campanha de terror gótico nas terras sombrias de Barovia, onde o vampiro Strahd von Zarovich governa com mão de ferro.",
        master: "João Silva",
        players: 4,
        maxPlayers: 5,
        lastActivity: "Há 2 horas",
        status: "active" as const,
    },
    {
        id: "2",
        title: "Waterdeep: O Roubo dos Dragões",
        description: "Uma caça ao tesouro pela cidade de Waterdeep, onde facções disputam uma fortuna escondida.",
        master: "Maria Santos",
        players: 3,
        maxPlayers: 6,
        lastActivity: "Ontem",
        status: "recruiting" as const,
    },
    {
        id: "3",
        title: "Túmulo da Aniquilação",
        description: "Uma expedição às selvas de Chult em busca de uma maldição que drena a vida dos ressuscitados.",
        master: "Pedro Costa",
        players: 5,
        maxPlayers: 5,
        lastActivity: "Há 3 dias",
        status: "paused" as const,
    },
    {
        id: "4",
        title: "Tyranny of Dragons",
        description: "O Culto do Dragão ameaça libertar Tiamat. Os heróis devem impedir o apocalipse dracônico.",
        master: "Ana Oliveira",
        players: 2,
        maxPlayers: 4,
        lastActivity: "Há 5 horas",
        status: "recruiting" as const,
    },
];

export default function Campaigns() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
                >
                    <div>
                        <h1 className="font-display text-4xl text-foreground mb-2">
                            Campanhas
                        </h1>
                        <p className="text-muted-foreground font-lora">
                            Explore campanhas em andamento ou crie a sua própria aventura.
                        </p>
                    </div>
                    <Button variant="hero">
                        <Plus className="h-5 w-5 mr-2" />
                        Nova Campanha
                    </Button>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar campanhas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:box-glow"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2 flex-wrap">
                        {["all", "active", "recruiting", "paused"].map((status) => (
                            <Button
                                key={status}
                                variant={statusFilter === status ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStatusFilter(status)}
                                className="font-display"
                            >
                                {status === "all" && "Todas"}
                                {status === "active" && "Ativas"}
                                {status === "recruiting" && "Recrutando"}
                                {status === "paused" && "Pausadas"}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Campaign Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredCampaigns.map((campaign, index) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <CampaignCard {...campaign} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredCampaigns.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <Filter className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                        <h3 className="font-display text-xl text-foreground mb-2">
                            Nenhuma campanha encontrada
                        </h3>
                        <p className="text-muted-foreground font-lora">
                            Tente ajustar os filtros ou criar uma nova campanha.
                        </p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
