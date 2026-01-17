export function EventLog() {
    return (
        <div className="p-4">
            <h2 className="font-display text-lg mb-4 text-primary">Log de Eventos</h2>
            <div className="space-y-3">
                <div className="text-xs font-lora text-muted-foreground p-2 bg-muted/20 rounded border border-border/30">
                    Nenhum evento registrado ainda.
                </div>
            </div>
        </div>
    );
}
