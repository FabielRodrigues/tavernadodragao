import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Heart, Shield, Zap, Footprints, Eye,
    Swords, Dices, Plus, Minus
} from "lucide-react";

interface Attack {
    name: string;
    attackBonus: number;
    damage: string;
    damageType: string;
    properties: string[];
}

interface CharacterCombatProps {
    combat: {
        armorClass: number;
        initiative: number;
        speed: number;
        proficiencyBonus: number;
        passivePerception: number;
        inspiration: boolean;
    };
    attacks: Attack[];
    hp: {
        current: number;
        max: number;
        temporary: number;
        hitDice: { current: number; max: number; type: string };
    };
}

export function CharacterCombat({ combat, attacks, hp }: CharacterCombatProps) {
    const hpPercentage = (hp.current / hp.max) * 100;
    const hitDicePercentage = (hp.hitDice.current / hp.hitDice.max) * 100;

    return (
        <div className="space-y-6">
            {/* Combat Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* HP Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border-medieval rounded-xl p-4 col-span-2 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                    <div className="flex items-center gap-2 mb-3">
                        <Heart className={`h-5 w-5 ${hpPercentage > 50 ? 'text-emerald-500' : hpPercentage > 25 ? 'text-amber-500' : 'text-destructive'}`} />
                        <span className="font-display text-lg text-foreground">Pontos de Vida</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors flex items-center justify-center">
                                <Minus className="h-4 w-4" />
                            </button>
                            <div className="font-display text-4xl text-foreground min-w-[120px] text-center text-glow">
                                {hp.current} / {hp.max}
                            </div>
                            <button className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 transition-colors flex items-center justify-center">
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <Progress value={hpPercentage} className="h-3 mb-2 bg-muted" indicatorClassName={hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 25 ? 'bg-amber-500' : 'bg-destructive'} />

                    {hp.temporary > 0 && (
                        <div className="text-sm text-blue-400 font-lora italic">
                            +{hp.temporary} PV Temporários
                        </div>
                    )}
                </motion.div>

                {/* AC */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-display text-3xl text-foreground">{combat.armorClass}</div>
                    <div className="text-xs text-muted-foreground font-lora">Classe de Armadura</div>
                </motion.div>

                {/* Initiative */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <Zap className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <div className="font-display text-3xl text-foreground">
                        {combat.initiative >= 0 ? `+${combat.initiative}` : combat.initiative}
                    </div>
                    <div className="text-xs text-muted-foreground font-lora">Iniciativa</div>
                </motion.div>

                {/* Speed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center hover:box-glow transition-all duration-300"
                >
                    <Footprints className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <div className="font-display text-3xl text-foreground">{combat.speed}ft</div>
                    <div className="text-xs text-muted-foreground font-lora">Deslocamento</div>
                </motion.div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Passive Perception */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center"
                >
                    <Eye className="h-5 w-5 mx-auto mb-2 text-muted-foreground font-lora" />
                    <div className="font-display text-2xl text-foreground">{combat.passivePerception}</div>
                    <div className="text-xs text-muted-foreground font-lora">Percepção Passiva</div>
                </motion.div>

                {/* Hit Dice */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-card border-medieval rounded-xl p-4 text-center"
                >
                    <Dices className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-display text-2xl text-foreground">
                        {hp.hitDice.current}{hp.hitDice.type}
                    </div>
                    <div className="text-xs text-muted-foreground font-lora">Dados de Vida</div>
                    <Progress value={hitDicePercentage} className="h-1 mt-2" />
                </motion.div>

                {/* Death Saves */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border-medieval rounded-xl p-4 col-span-2"
                >
                    <div className="text-sm text-muted-foreground mb-2 text-center font-lora">Salvaguardas contra Morte</div>
                    <div className="flex justify-center gap-8">
                        <div className="text-center">
                            <div className="text-xs text-emerald-500 mb-1 font-display">Sucessos</div>
                            <div className="flex gap-1">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={`success-${i}`}
                                        className="w-4 h-4 rounded-full border-2 border-emerald-500/50"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-destructive mb-1 font-display">Falhas</div>
                            <div className="flex gap-1">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={`fail-${i}`}
                                        className="w-4 h-4 rounded-full border-2 border-destructive/50"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Attacks */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-card border-medieval rounded-xl p-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Swords className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl text-foreground text-glow">Ataques & Magias</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 text-sm text-muted-foreground font-normal font-lora">Nome</th>
                                <th className="text-center py-2 px-3 text-sm text-muted-foreground font-normal font-lora">Ataque</th>
                                <th className="text-center py-2 px-3 text-sm text-muted-foreground font-normal font-lora">Dano</th>
                                <th className="text-left py-2 px-3 text-sm text-muted-foreground font-normal font-lora">Propriedades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attacks.map((attack, index) => (
                                <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                    <td className="py-3 px-3 font-medium text-foreground font-display text-sm">{attack.name}</td>
                                    <td className="py-3 px-3 text-center">
                                        <Badge className="bg-primary/20 text-primary border-primary/50 text-[10px]">
                                            +{attack.attackBonus}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-3 text-center">
                                        <span className="text-foreground font-lora">{attack.damage}</span>
                                        <span className="text-muted-foreground text-xs ml-1 font-lora">({attack.damageType})</span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <div className="flex flex-wrap gap-1">
                                            {attack.properties.map((prop, i) => (
                                                <Badge key={i} variant="outline" className="text-[10px] font-lora h-4">
                                                    {prop}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
