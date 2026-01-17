import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Dices, Bot, ArrowRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type MessageType = "ic" | "ooc" | "system" | "dm" | "roll" | "ai";

interface ChatMessage {
    id: string;
    type: MessageType;
    author: string;
    content: string;
    timestamp: Date;
    characterName?: string;
    avatar?: string;
    rollResult?: {
        dice: string;
        result: number;
        total: number;
        skill?: string;
    };
    isStreaming?: boolean;
}

interface Player {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    isDM?: boolean;
}

interface GameRoomChatProps {
    campaignTitle: string;
    players: Player[];
}

const messageStyles: Record<MessageType, string> = {
    ic: "bg-card border-border",
    ooc: "bg-muted/30 border-border",
    system: "bg-primary/10 border-primary/30",
    dm: "bg-amber-900/30 border-amber-700/50",
    roll: "bg-card border-border",
    ai: "bg-muted/20 border-border italic",
};

const MOCK_MESSAGES: ChatMessage[] = [
    {
        id: "1",
        type: "dm",
        author: "Mestre",
        content: "A PORTA RANGE AO ABRIR, REVELANDO UMA CÂMARA ILUMINADA POR VELAS TREMELUZENTES. O CHEIRO DE INCENSO ANTIGO PERMEIA O AR ENQUANTO SOMBRAS DANÇAM NAS PAREDES DE PEDRA.",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=DM",
    },
    {
        id: "2",
        type: "ic",
        author: "Maria",
        characterName: "Aldric",
        content: "Mantenho minha varinha erguida enquanto avanço cautelosamente. 'Fiquem atentos', sussurro aos companheiros.",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric",
    },
    {
        id: "3",
        type: "ooc",
        author: "João",
        content: "Preciso sair em 30 minutos, podemos pausar depois dessa cena?",
        timestamp: new Date(Date.now() - 1000 * 60 * 6),
    },
    {
        id: "4",
        type: "roll",
        author: "Maria",
        characterName: "Aldric",
        content: "",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric",
        rollResult: {
            dice: "1d20+7",
            result: 16,
            total: 23,
            skill: "Arcanismo",
        },
    },
    {
        id: "5",
        type: "ai",
        author: "n8n",
        content: "O guardião espectral se move em sua direção...",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        isStreaming: false,
    },
];

export function GameRoomChat({ campaignTitle, players }: GameRoomChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [messageType, setMessageType] = useState<"ic" | "ooc">("ic");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        // Check for roll command
        const rollMatch = inputValue.match(/^\/roll\s+(\d+d\d+(?:[+-]\d+)?)/i);

        if (rollMatch) {
            const diceNotation = rollMatch[1];
            const match = diceNotation.match(/(\d+)d(\d+)([+-]\d+)?/);
            if (match) {
                const numDice = parseInt(match[1]);
                const diceSize = parseInt(match[2]);
                const modifierString = match[3];
                const modifier = modifierString ? parseInt(modifierString) : 0;

                let diceResult = 0;
                for (let i = 0; i < numDice; i++) {
                    diceResult += Math.floor(Math.random() * diceSize) + 1;
                }

                const newMessage: ChatMessage = {
                    id: Date.now().toString(),
                    type: "roll",
                    author: "Você",
                    characterName: "Aldric",
                    content: "",
                    timestamp: new Date(),
                    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric",
                    rollResult: {
                        dice: diceNotation,
                        result: diceResult,
                        total: diceResult + modifier,
                    },
                };
                setMessages([...messages, newMessage]);
            }
        } else {
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                type: messageType,
                author: "Você",
                characterName: messageType === "ic" ? "Aldric" : undefined,
                content: inputValue,
                timestamp: new Date(),
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aldric",
            };
            setMessages([...messages, newMessage]);
        }

        setInputValue("");
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background/40 backdrop-blur-sm">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {/* Welcome message */}
                <div className="text-center py-6 border-b border-border/20 mb-4">
                    <p className="text-xs text-muted-foreground font-lora italic">
                        Início da aventura em <span className="text-primary font-bold">{campaignTitle}</span>
                    </p>
                </div>

                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${messageStyles[message.type]}`}
                        >
                            {/* DM Message - Special styling */}
                            {message.type === "dm" && (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-display text-amber-500 tracking-wider font-bold text-xs uppercase">
                                            {message.author} (Mestre)
                                        </span>
                                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-foreground/90 uppercase tracking-widest text-sm leading-relaxed font-display">
                                        {message.content}
                                    </p>
                                </>
                            )}

                            {/* IC Message */}
                            {message.type === "ic" && (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        {message.avatar && (
                                            <div className="w-8 h-8 rounded-full ring-2 ring-primary/20 overflow-hidden shrink-0">
                                                <img
                                                    src={message.avatar}
                                                    alt={message.characterName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="font-display text-foreground font-bold text-sm">
                                            {message.characterName}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-foreground/90 ml-11 font-lora leading-relaxed">{message.content}</p>
                                </>
                            )}

                            {/* OOC Message */}
                            {message.type === "ooc" && (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-muted-foreground font-bold">
                                            {message.author}
                                        </span>
                                        <Badge variant="outline" className="h-4 text-[9px] bg-muted/50 py-0 px-1 border-none uppercase tracking-tighter">
                                            OFF
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground/80 text-sm italic font-lora">{message.content}</p>
                                </>
                            )}

                            {/* Roll Message */}
                            {message.type === "roll" && message.rollResult && (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        {message.avatar && (
                                            <div className="w-8 h-8 rounded-full ring-2 ring-primary/20 overflow-hidden shrink-0">
                                                <img
                                                    src={message.avatar}
                                                    alt={message.characterName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="font-display text-foreground font-bold text-sm">
                                            {message.characterName}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 ml-11 bg-muted/20 p-3 rounded-lg border border-border/30">
                                        <div className="bg-primary/20 p-2 rounded-lg">
                                            <Dices className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs text-muted-foreground font-bold">
                                                    {message.rollResult.dice}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
                                                <span className="text-xs text-muted-foreground">
                                                    Result: {message.rollResult.result}
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-background/50 rounded-full overflow-hidden w-full max-w-[200px] border border-border/20">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((message.rollResult.total / 20) * 100, 100)}%` }}
                                                    transition={{ duration: 1, ease: "circOut" }}
                                                    className={`h-full ${message.rollResult.total >= 18 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-primary'}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-display text-3xl leading-none ${message.rollResult.total >= 18 ? 'text-amber-500 text-glow' : 'text-primary'}`}>
                                                {message.rollResult.total}
                                            </span>
                                        </div>
                                    </div>
                                    {message.rollResult.skill && (
                                        <div className="text-[10px] text-muted-foreground/70 ml-11 mt-2 uppercase tracking-widest font-bold">
                                            {message.rollResult.skill}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* AI Response */}
                            {message.type === "ai" && (
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
                                        <Bot className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">N8N ORACLE</span>
                                            <span className="text-[9px] text-muted-foreground/40 font-mono italic">AI RESPONSE</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm font-lora italic leading-relaxed">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-md shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                {/* Message Type Selector */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Modo Chat:</span>
                    <div className="flex bg-background/50 p-1 rounded-lg border border-border/40 gap-1">
                        <button
                            onClick={() => setMessageType("ic")}
                            className={`text-[10px] px-3 py-1 rounded-md transition-all font-bold uppercase tracking-tighter ${messageType === "ic" ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}
                        >
                            Em Personagem (IC)
                        </button>
                        <button
                            onClick={() => setMessageType("ooc")}
                            className={`text-[10px] px-3 py-1 rounded-md transition-all font-bold uppercase tracking-tighter ${messageType === "ooc" ? 'bg-muted text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}
                        >
                            Fora de Jogo (OFF)
                        </button>
                    </div>
                </div>

                {/* Input */}
                <div className="flex gap-3 items-end max-w-5xl mx-auto">
                    <div className="flex-1 relative group">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder={messageType === "ic" ? "Fale como Aldric..." : "Comentário fora de jogo..."}
                            className="w-full min-h-[56px] max-h-[160px] resize-none rounded-xl bg-background/50 border border-border/50 p-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-inner group-hover:border-primary/20"
                        />
                        <div className="absolute right-4 bottom-4 flex items-center gap-2">
                            <span className="hidden sm:inline text-[9px] text-muted-foreground/30 font-display">SHIFT+ENTER PARA LINHA</span>
                        </div>
                    </div>
                    <Button
                        onClick={sendMessage}
                        className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group transition-all"
                        disabled={!inputValue.trim()}
                    >
                        <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        <span className="font-display font-bold uppercase tracking-wider text-xs">Enviar</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
