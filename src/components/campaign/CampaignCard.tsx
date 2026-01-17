import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
    id: string;
    title: string;
    description: string;
    master: string;
    players: number;
    maxPlayers: number;
    lastActivity: string;
    status: "active" | "recruiting" | "paused";
}

const statusConfig = {
    active: {
        label: "Ativa",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    recruiting: {
        label: "Recrutando",
        variant: "secondary" as const,
        className: "bg-primary/10 text-primary border-primary/20",
    },
    paused: {
        label: "Pausada",
        variant: "outline" as const,
        className: "bg-muted text-muted-foreground border-border",
    },
};

export function CampaignCard({
    title,
    description,
    master,
    players,
    maxPlayers,
    lastActivity,
    status,
}: CampaignCardProps) {
    const config = statusConfig[status];

    return (
        <Card className="group h-full bg-card border-medieval hover:box-glow transition-all duration-300 flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <Badge
                        variant={config.variant}
                        className={cn("font-display", config.className)}
                    >
                        {config.label}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground font-lora">
                        <Clock className="w-3 h-3 mr-1" />
                        {lastActivity}
                    </div>
                </div>
                <CardTitle className="font-display text-xl text-primary group-hover:text-glow transition-all">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 pb-6 text-sm text-muted-foreground font-lora line-clamp-3">
                {description}
            </CardContent>

            <CardFooter className="pt-0 flex flex-col gap-4">
                <div className="h-px w-full bg-border/50" />
                <div className="w-full flex justify-between items-center text-sm font-lora">
                    <div className="flex items-center text-foreground/80">
                        <Shield className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-xs mr-1 text-muted-foreground">Mestre:</span>
                        {master}
                    </div>
                    <div className="flex items-center text-foreground/80">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        {players}/{maxPlayers}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
