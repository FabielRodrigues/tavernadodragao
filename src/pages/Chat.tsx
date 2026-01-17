import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Settings, User, Mic, Play, Users, Wifi, Filter, MoreVertical, LogOut, Dices, Shield, Heart, Zap, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { aiService, AIMessage } from "@/services/aiService";

// --- Mock Data ---

interface CharacterStats {
    name: string;
    class: string;
    level: number;
    avatar: string;
    attributes: { label: string; value: number }[];
    hp: { current: number; max: number };
    skills: string[];
}

const CURRENT_CHARACTER: CharacterStats = {
    name: "Aldric Stormweaver",
    class: "Mago",
    level: 5,
    avatar: "https://i.pravatar.cc/150?u=aldric", // Placeholder
    attributes: [
        { label: "FOR", value: 14 },
        { label: "DES", value: 16 },
        { label: "CON", value: 12 },
        { label: "INT", value: 18 },
        { label: "SAB", value: 13 },
        { label: "CAR", value: 10 },
    ],
    hp: { current: 28, max: 38 },
    skills: ["Arcanismo", "Investigação", "História", "Percepção"]
};

interface GameLog {
    id: number;
    icon: React.ElementType;
    message: string;
    time: string;
    color?: string;
}

const INITIAL_LOGS: GameLog[] = [
    { id: 1, icon: Play, message: "Sessão iniciada", time: "14:00", color: "text-green-500" },
    { id: 2, icon: Users, message: "Maria entrou na mesa", time: "14:05" },
    { id: 3, icon: Dices, message: "Aldric rolou 1d20+7: 23", time: "14:35", color: "text-amber-500" },
    { id: 4, icon: Zap, message: "Resposta do n8n recebida", time: "14:36" },
];

const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: "MESTRE",
        role: "dm",
        content: "A PORTA RANGE AO ABRIR, REVELANDO UMA CÂMARA ILUMINADA POR VELAS TREMELUZENTES. O CHEIRO DE INCENSO ANTIGO PERMEIA O AR ENQUANTO SOMBRAS DANÇAM NAS PAREDES DE PEDRA.",
        timestamp: "14:32",
        type: "narration"
    },
    {
        id: 2,
        sender: "Aldric Stormweaver",
        role: "player",
        content: "Mantenho minha varinha erguida enquanto avanço cautelosamente. 'Fiquem atentos', sussurro aos companheiros.",
        timestamp: "14:33",
        type: "ic"
    }
];

// --- Component ---

const Chat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState<GameLog[]>(INITIAL_LOGS);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [messageType, setMessageType] = useState("ic"); // ic, ooc, action

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const currentInput = inputValue;
        const currentType = messageType;
        setInputValue("");

        // Player Message
        const newMessage = {
            id: Date.now(),
            sender: "Você",
            role: "player",
            content: currentInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: currentType
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        // Only sending to AI if it's IC or Action for now, to save tokens/calls
        // or always send if you want the DM to react to OOC too.
        setIsLoading(true);

        try {
            // Context for AI
            const context: AIMessage[] = updatedMessages.map(m => ({
                role: m.role === 'dm' ? 'dm' : 'player',
                content: m.content
            }));

            // Call AI Service
            // We prepend [Type] to help AI understand if it's OOC
            const aiPrompt = currentType === 'ooc' ? `[OOC] ${currentInput}` : currentInput;
            const aiResponseText = await aiService.sendMessage(aiPrompt, context);

            setIsLoading(false);

            // Add Log Entry
            setLogs(prev => [...prev, {
                id: Date.now(),
                icon: Zap,
                message: "Resposta do Mestre recebida",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                color: "text-blue-400"
            }]);

            // Typewriter Effect for AI Message
            simulateTypewriter(aiResponseText);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setLogs(prev => [...prev, {
                id: Date.now(),
                icon: Wifi,
                message: "Falha na conexão com Mestre",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                color: "text-red-500"
            }]);
        }
    };

    const simulateTypewriter = (text: string) => {
        const aiMessageId = Date.now() + 1;
        const fullAiMessage = {
            id: aiMessageId,
            sender: "MESTRE",
            role: "dm",
            content: "",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "narration"
        };

        setMessages(prev => [...prev, fullAiMessage]);

        let i = 0;
        const speed = 15;

        const interval = setInterval(() => {
            if (i < text.length) {
                setMessages(prev => prev.map(msg =>
                    msg.id === aiMessageId
                        ? { ...msg, content: text.substring(0, i + 1) }
                        : msg
                ));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    };

    return (
        <MainLayout>
            <div className="flex h-[calc(100vh-6rem)] gap-4 p-2 overflow-hidden bg-background">

                {/* --- Left Column: Character Sheet --- */}
                <Card className="w-80 hidden md:flex flex-col bg-card/60 border-medieval p-4 gap-6 overflow-y-auto">
                    {/* Avatar & Info */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <Avatar className="h-24 w-24 border-2 border-primary ring-2 ring-primary/20">
                                <AvatarImage src={CURRENT_CHARACTER.avatar} />
                                <AvatarFallback>{CURRENT_CHARACTER.name[0]}</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground border-border text-[10px]">
                                Lvl {CURRENT_CHARACTER.level}
                            </Badge>
                        </div>
                        <h2 className="font-cinzel text-xl font-bold text-glow-subtle">{CURRENT_CHARACTER.name}</h2>
                        <span className="text-xs text-muted-foreground font-lora italic">{CURRENT_CHARACTER.class}</span>
                        <Badge variant="outline" className="mt-2 text-[10px] bg-primary/10 border-primary/30">
                            Ficha do Pai
                        </Badge>
                    </div>

                    {/* Attributes Grid */}
                    <div>
                        <h3 className="font-cinzel text-sm text-primary mb-3 uppercase tracking-wider border-b border-primary/20 pb-1">Atributos</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {CURRENT_CHARACTER.attributes.map(attr => (
                                <div key={attr.label} className="bg-background/50 border border-primary/20 rounded p-2 text-center hover:border-primary/50 transition-colors cursor-help group">
                                    <span className="block text-[10px] text-muted-foreground font-bold">{attr.label}</span>
                                    <span className="block text-lg font-cinzel text-foreground group-hover:text-glow">{attr.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HP Bar */}
                    <div>
                        <h3 className="font-cinzel text-sm text-primary mb-2 uppercase tracking-wider">Pontos de Vida</h3>
                        <Progress value={(CURRENT_CHARACTER.hp.current / CURRENT_CHARACTER.hp.max) * 100} className="h-3" />
                        <div className="flex justify-between text-xs mt-1 font-mono text-muted-foreground">
                            <span>{CURRENT_CHARACTER.hp.current} Atual</span>
                            <span>{CURRENT_CHARACTER.hp.max} Máx</span>
                        </div>
                    </div>

                    {/* Quick Skills */}
                    <div className="flex-1">
                        <h3 className="font-cinzel text-sm text-primary mb-3 uppercase tracking-wider border-b border-primary/20 pb-1">Perícias Rápidas</h3>
                        <div className="space-y-2">
                            {CURRENT_CHARACTER.skills.map(skill => (
                                <Button key={skill} variant="ghost" className="w-full justify-between h-8 text-xs border border-transparent hover:border-primary/30 hover:bg-primary/5">
                                    {skill}
                                    <Dices className="h-3 w-3 opacity-50" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Select>
                            <SelectTrigger className="w-full text-xs">
                                <SelectValue placeholder="Trocar Personagem" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aldric">Aldric Stormweaver</SelectItem>
                                <SelectItem value="theren">Theren (NPC)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </Card>


                {/* --- Center Column: Game Area --- */}
                <div className="flex-1 flex flex-col bg-card/60 border-medieval rounded-lg overflow-hidden relative">

                    {/* Header */}
                    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur flex items-center justify-between px-6 shrink-0">
                        <div>
                            <h1 className="font-cinzel text-xl text-foreground font-bold tracking-wide">A CRIPTA DOS SUSSURROS</h1>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span> Sessão Ativa</span>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            {/* Party Avatars placeholder */}
                            {[1, 2, 3].map(i => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-background ring-1 ring-primary/20">
                                    <AvatarFallback className="text-[10px] bg-primary/20">P{i}</AvatarFallback>
                                </Avatar>
                            ))}
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] border-2 border-background ring-1 ring-primary/20 z-10">
                                +2
                            </div>
                        </div>
                    </header>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                        <div className="space-y-6 max-w-4xl mx-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col gap-1 w-full animate-in fade-in slide-in-from-bottom-2 duration-500
                                    ${msg.role === 'dm' ? 'items-center' : 'items-start'}
                                `}>
                                    {/* Sender Info for Player/DM handling differs */}
                                    {msg.role === 'dm' ? (
                                        // DM / Narration Block
                                        <div className="w-full bg-accent/20 border-y-2 border-primary/20 py-6 px-8 text-center relative my-4">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 text-xs font-cinzel font-bold text-primary tracking-[0.2em] uppercase">
                                                {msg.sender} <span className="opacity-50 mx-2">{msg.timestamp}</span>
                                            </div>
                                            <p className="font-cinzel text-lg md:text-xl leading-relaxed text-amber-500/90 drop-shadow-sm lowercase first-letter:capitalize font-medium">
                                                {msg.content}
                                            </p>
                                        </div>
                                    ) : (
                                        // Player Block
                                        <div className="flex gap-4 w-full group">
                                            <Avatar className="h-10 w-10 mt-1 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-baseline justify-between">
                                                    <span className="font-cinzel font-bold text-foreground text-sm flex items-center gap-2">
                                                        {msg.sender}
                                                        <span className="text-[10px] text-muted-foreground font-sans font-normal opacity-50">{msg.timestamp}</span>
                                                    </span>
                                                </div>

                                                {/* Message Content Bubble */}
                                                <div className={`p-4 rounded-r-lg rounded-bl-lg text-sm leading-relaxed border shadow-sm relative
                                                    ${msg.type === 'ic' ? 'bg-background border-primary/20 text-foreground font-lora' : ''}
                                                    ${msg.type === 'ooc' ? 'bg-muted/50 border-transparent text-muted-foreground italic' : ''}
                                                `}>
                                                    {/* Decorative corner */}
                                                    {msg.type === 'ic' && <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 -translate-x-px -translate-y-px" />}

                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="w-full flex justify-center py-4 animate-pulse">
                                    <span className="font-cinzel text-xs text-primary/60 tracking-widest flex items-center gap-2">
                                        <Shield className="h-3 w-3 animate-spin" />
                                        O Mestre está consultando os pergaminhos...
                                    </span>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 bg-background/80 backdrop-blur border-t border-border/50 shrink-0">
                        <div className="flex gap-2 mb-2">
                            <div className="flex items-center gap-2 bg-muted/50 rounded-md p-1">
                                <label className="text-[10px] font-bold text-muted-foreground px-2 uppercase tracking-wide">Tipo:</label>
                                <Select value={messageType} onValueChange={setMessageType}>
                                    <SelectTrigger className="h-7 border-0 bg-transparent text-xs w-[120px] focus:ring-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ic">Interpretando</SelectItem>
                                        <SelectItem value="action">Ação</SelectItem>
                                        <SelectItem value="ooc">Off-Game (OOC)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-2 relative">
                            <Textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Digite sua mensagem ou use /roll 1d20+3..."
                                className="min-h-[80px] bg-background/50 border-primary/20 focus:border-primary/50 resize-none font-lora text-sm pr-20"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <div className="absolute bottom-2 right-2 flex gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <Mic className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-8 bg-amber-600 hover:bg-amber-700 text-white font-cinzel font-bold shadow-lg shadow-amber-900/20"
                                    onClick={handleSendMessage}
                                    disabled={isLoading}
                                >
                                    <Send className="h-3 w-3 mr-2" /> Enviar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* --- Right Column: Logs --- */}
                <Card className="w-72 hidden xl:flex flex-col bg-card/60 border-medieval p-0 overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
                        <h3 className="font-cinzel text-sm font-bold text-muted-foreground">LOG DE EVENTOS</h3>
                        <Filter className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-6 relative">
                            {/* Timeline line */}
                            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-border/50" />

                            {logs.map((log) => (
                                <div key={log.id} className="relative pl-8 group">
                                    <div className={`absolute left-0 top-0.5 h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors ${log.color || 'text-muted-foreground'}`}>
                                        <log.icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="text-xs space-y-0.5">
                                        <p className="text-foreground/90 leading-tight">{log.message}</p>
                                        <span className="text-[10px] text-muted-foreground font-mono opacity-70">{log.time}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Connectivity Status Mock */}
                            <div className="relative pl-8 opacity-50">
                                <div className="absolute left-0 top-0.5 h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center z-10 text-red-500">
                                    <Wifi className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-xs space-y-0.5">
                                    <p className="text-foreground/90 leading-tight">Reconectando...</p>
                                    <span className="text-[10px] text-muted-foreground font-mono opacity-70">14:40</span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>

            </div>
        </MainLayout>
    );
};

export default Chat;
