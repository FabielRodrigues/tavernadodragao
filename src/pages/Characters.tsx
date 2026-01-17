import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Scroll, Shield, Ghost } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const MOCK_CHARACTERS = [
    {
        id: 1,
        name: "Theren Moonwhisper",
        race: "Elf",
        class: "Wizard",
        level: 5,
        campaign: "A Maldição de Strahd",
        image: "https://images.unsplash.com/photo-1535581652167-3d6b98c36cd0?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Grommash Hellscream",
        race: "Half-Orc",
        class: "Barbarian",
        level: 3,
        campaign: "A Mina Perdida de Phandelver",
        image: "https://images.unsplash.com/photo-1579783483458-83d02161294e?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Lyra Silvertongue",
        race: "Human",
        class: "Bard",
        level: 7,
        campaign: "None",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    }
];

const Characters = () => {
    return (
        <MainLayout>
            <div className="p-4 md:p-8 space-y-8 animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-cinzel text-primary text-glow">Meus Personagens</h1>
                        <p className="text-muted-foreground mt-2 font-lora">Gerencie suas fichas e heróis (D&D 5e).</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-cinzel shadow-lg hover:shadow-xl transition-all">
                        <Plus className="mr-2 h-4 w-4" /> Criar Personagem (PDF)
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_CHARACTERS.map((char) => (
                        <Card key={char.id} className="bg-card border-border border-medieval overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary">
                                            <AvatarImage src={char.image} alt={char.name} />
                                            <AvatarFallback><Ghost className="h-6 w-6" /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="font-cinzel text-xl text-primary">{char.name}</CardTitle>
                                            <CardDescription className="font-lora text-base">{char.race} {char.class} • Lvl {char.level}</CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                                    <Shield className="h-4 w-4 text-secondary-foreground" />
                                    <span>Campanha: <span className="text-foreground">{char.campaign}</span></span>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/20 p-4 flex gap-2">
                                <Button variant="ghost" className="flex-1 text-primary hover:text-primary hover:bg-primary/10">
                                    <Scroll className="mr-2 h-4 w-4" /> Ver Ficha
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Characters;
