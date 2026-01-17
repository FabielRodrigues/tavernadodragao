import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Wand2 } from "lucide-react";

interface Spell {
    name: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    duration: string;
    prepared?: boolean;
}

interface CharacterSpellsProps {
    spells: {
        spellcastingAbility: string | null;
        spellSaveDC: number | null;
        spellAttackBonus: number | null;
        cantrips: Spell[];
        slots: Record<string, { current: number; max: number }>;
        knownSpells: Spell[];
    };
}

export function CharacterSpells({ spells }: CharacterSpellsProps) {
    const hasSpells = spells.spellcastingAbility !== null;

    if (!hasSpells) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border-medieval rounded-xl p-12 text-center"
            >
                <Wand2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="font-display text-xl text-foreground mb-2">
                    Sem Habilidades Mágicas
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto font-lora">
                    Este personagem não possui a capacidade de conjurar magias.
                    Algumas classes como Guerreiro ou Ladino não têm acesso a magias
                    (exceto subclasses específicas).
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Spellcasting Stats */}
            <div className="grid grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <div className="text-sm text-muted-foreground mb-1 font-lora">Atributo de Conjuração</div>
                    <div className="font-display text-2xl text-primary">{spells.spellcastingAbility}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <div className="text-sm text-muted-foreground mb-1 font-lora">CD de Resistência</div>
                    <div className="font-display text-2xl text-foreground">{spells.spellSaveDC}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <div className="text-sm text-muted-foreground mb-1 font-lora">Bônus de Ataque</div>
                    <div className="font-display text-2xl text-foreground">+{spells.spellAttackBonus}</div>
                </motion.div>
            </div>

            {/* Spell Slots */}
            {Object.keys(spells.slots).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card border-medieval rounded-xl p-6"
                >
                    <h3 className="font-display text-xl text-foreground mb-4 text-glow">Espaços de Magia</h3>
                    <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
                            const slot = spells.slots[`level${level}`];
                            return (
                                <div key={level} className={`text-center p-3 rounded-lg border border-border/50 transition-colors ${slot ? 'bg-primary/5' : 'bg-muted/30 opacity-50'}`}>
                                    <div className="text-xs text-muted-foreground mb-1 font-lora">{level}º</div>
                                    <div className="font-display text-lg text-foreground">
                                        {slot ? `${slot.current}/${slot.max}` : "-"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Cantrips */}
            {spells.cantrips.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border-medieval rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="font-display text-xl text-foreground text-glow">Truques</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {spells.cantrips.map((cantrip, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="bg-primary/10 border-primary/30 text-foreground py-1.5 px-3 font-lora"
                            >
                                {cantrip.name}
                            </Badge>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Known Spells */}
            {spells.knownSpells.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-card border-medieval rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h3 className="font-display text-xl text-foreground text-glow">Magias Conhecidas</h3>
                    </div>
                    <div className="space-y-2">
                        {spells.knownSpells.map((spell, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-primary/20 group font-lora"
                            >
                                <div className="flex items-center gap-3">
                                    {spell.prepared && (
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                                    )}
                                    <span className={`font-medium ${spell.prepared ? 'text-foreground' : 'text-muted-foreground'}`}>{spell.name}</span>
                                    <Badge variant="outline" className="text-[10px] h-4">
                                        {spell.school}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                                    <span className="font-display text-xs">Nível {spell.level}</span>
                                    <span>{spell.castingTime}</span>
                                    <span>{spell.range}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
