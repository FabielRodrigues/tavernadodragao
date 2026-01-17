import { motion } from "framer-motion";
import {
    Play,
    UserPlus,
    Dices,
    Wifi,
    WifiOff,
    Filter,
    Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEvent {
    id: string;
    type: "session_start" | "player_join" | "roll" | "ai_response" | "reconnect" | "disconnect";
    description: string;
    timestamp: Date;
    meta?: string;
}

const eventIcons: Record<LogEvent["type"], React.ElementType> = {
    session_start: Play,
    player_join: UserPlus,
    roll: Dices,
    ai_response: Bot,
    reconnect: Wifi,
    disconnect: WifiOff,
};

const eventColors: Record<LogEvent["type"], string> = {
    session_start: "text-emerald-400",
    player_join: "text-primary",
    roll: "text-amber-400",
    ai_response: "text-muted-foreground",
    reconnect: "text-emerald-400",
    disconnect: "text-red-400",
};

const MOCK_EVENTS: LogEvent[] = [
    {
        id: "1",
        type: "session_start",
        description: "Sessão iniciada",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
        id: "2",
        type: "player_join",
        description: "Maria entrou na mesa",
        timestamp: new Date(Date.now() - 1000 * 60 * 55),
    },
    {
        id: "3",
        type: "roll",
        description: "Aldric rolou 1d20+7: 23",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
        id: "4",
        type: "ai_response",
        description: "Resposta do n8n recebida",
        timestamp: new Date(Date.now() - 1000 * 60 * 24),
    },
    {
        id: "5",
        type: "reconnect",
        description: "Reconectando...",
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
];

export function EventLog() {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-[10px] tracking-widest text-muted-foreground/70 uppercase">
                    Log de Eventos
                </h3>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors">
                    <Filter className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Events List */}
            <div className="space-y-4 relative">
                {/* Timeline Line */}
                <div className="absolute left-2 top-2 bottom-0 w-px bg-border/30 z-0" />

                {MOCK_EVENTS.map((event, index) => {
                    const Icon = eventIcons[event.type];
                    const colorClass = eventColors[event.type];

                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 relative z-10 group"
                        >
                            <div className={`mt-0.5 w-4 h-4 rounded-full bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/50 transition-colors ${colorClass}`}>
                                <Icon className="h-2.5 w-2.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-foreground/90 leading-relaxed font-lora">
                                    {event.description}
                                </p>
                                <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter">
                                    {formatTime(event.timestamp)}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Connection Status */}
            <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2.5 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
                    <div className="relative">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                        <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400/90 font-display">
                        Sincronizado
                    </span>
                </div>
            </div>
        </div>
    );
}
