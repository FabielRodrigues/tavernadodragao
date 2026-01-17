import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Heart, Star, BookOpen } from "lucide-react";

interface CharacterCardProps {
    id: string;
    name: string;
    race: string;
    className: string;
    level: number;
    hp: { current: number; max: number };
    ac: number;
    campaign?: string;
}

export function CharacterCard({
    id,
    name,
    race,
    className,
    level,
    hp,
    ac,
    campaign,
}: CharacterCardProps) {
    const hpPercentage = (hp.current / hp.max) * 100;

    return (
        <Card className="group h-full bg-card border-medieval hover:box-glow transition-all duration-300 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 relative">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-display bg-primary/10 text-primary border-primary/20">
                        Nível {level}
                    </Badge>
                    {campaign && (
                        <div className="flex items-center text-[10px] text-muted-foreground font-lora max-w-[120px] text-right truncate">
                            <BookOpen className="w-3 h-3 mr-1 flex-shrink-0" />
                            {campaign}
                        </div>
                    )}
                </div>
                <CardTitle className="font-display text-xl text-primary group-hover:text-glow transition-all truncate">
                    {name}
                </CardTitle>
                <div className="text-xs text-muted-foreground font-lora italic">
                    {race} • {className}
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                {/* HP Bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-lora">
                        <span className="flex items-center text-muted-foreground">
                            <Heart className="w-3 h-3 mr-1 text-red-500" /> PV
                        </span>
                        <span className="text-foreground/80">{hp.current} / {hp.max}</span>
                    </div>
                    <Progress value={hpPercentage} className="h-1.5 bg-red-500/10" indicatorClassName="bg-red-500" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/30 rounded-lg p-2 border border-border/50 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground leading-none">CA</span>
                            <span className="font-display text-sm leading-tight">{ac}</span>
                        </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-2 border border-border/50 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground leading-none">Prof.</span>
                            <span className="font-display text-sm leading-tight">+{(Math.floor((level - 1) / 4) + 2)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-0 pb-6">
                <Link to={`/characters/${id}`} className="w-full">
                    <Button variant="ghost" className="w-full font-display text-xs text-primary hover:bg-primary/10">
                        Ver Detalhes
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
