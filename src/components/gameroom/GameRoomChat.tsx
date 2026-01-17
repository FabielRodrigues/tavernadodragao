export function GameRoomChat({ campaignTitle }: { campaignTitle: string }) {
    return (
        <div className="flex-1 flex flex-col h-full z-10">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <p className="text-muted-foreground italic text-center text-sm font-lora py-12 border-b border-border/20">
                    Início da conversa em <span className="text-primary">{campaignTitle}</span>
                </p>
            </div>
            <div className="p-6 border-t border-border/50 bg-card/50 backdrop-blur-md">
                <div className="flex gap-3 items-center max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Digite sua mensagem ou /rolar 1d20..."
                            className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 shadow-inner"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50 font-lora tracking-tighter">
                            ENTER PARA ENVIAR
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
