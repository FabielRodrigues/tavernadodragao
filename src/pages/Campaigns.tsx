import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, ChevronRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock Data
const MOCK_CAMPAIGNS = [
    {
        id: 1,
        title: "A Maldição de Strahd",
        system: "D&D 5e",
        players: 4,
        nextSession: "18/01/2026 - 20:00",
        description: "Uma aventura gótica nas terras de Barovia.",
        status: "active",
        image: "https://images.unsplash.com/photo-1599751449128-eb724976d752?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "A Mina Perdida de Phandelver",
        system: "D&D 5e",
        players: 5,
        nextSession: "20/01/2026 - 19:30",
        description: "Em busca da forja das magias na costa da espada.",
        status: "active",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Tormenta: O Desafio dos Deuses",
        system: "Tormenta20",
        players: 3,
        nextSession: "TBA",
        description: "Uma jornada épica pelo mundo de Arton.",
        status: "planning",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop"
    }
];

const Campaigns = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="p-4 md:p-8 space-y-8 animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-cinzel text-primary text-glow">Minhas Campanhas</h1>
                        <p className="text-muted-foreground mt-2 font-lora">Gerencie suas aventuras e grupos de jogo.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-cinzel shadow-lg hover:shadow-xl transition-all">
                        <Plus className="mr-2 h-4 w-4" /> Nova Campanha
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_CAMPAIGNS.map((campaign) => (
                        <Card key={campaign.id} className="bg-card border-border border-medieval overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'} className="mb-2">
                                        {campaign.status === 'active' ? 'Em Andamento' : 'Planejamento'}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="relative">
                                <CardTitle className="font-cinzel text-xl text-primary">{campaign.title}</CardTitle>
                                <CardDescription className="font-lora">{campaign.system}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-lora">
                                    {campaign.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span>{campaign.players} Jogadores</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{campaign.nextSession}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/20 p-4">
                                <Button
                                    variant="ghost"
                                    className="w-full text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                                >
                                    Continuar Aventura <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Campaigns;
