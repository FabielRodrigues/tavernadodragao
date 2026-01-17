export function CharacterSidebar({ character }: { character: any }) {
    return (
        <div className="p-4">
            <h2 className="font-display text-lg mb-4 text-primary">{character.name}</h2>
            <div className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase font-lora">Classe & Nível</p>
                    <p className="font-display">{character.class} {character.level}</p>
                </div>
                {/* Placeholder for more stats */}
            </div>
        </div>
    );
}
