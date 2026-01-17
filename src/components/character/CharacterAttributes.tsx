import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Attribute {
    score: number;
    modifier: number;
    savingThrow: number;
    proficient: boolean;
}

interface CharacterAttributesProps {
    attributes: {
        strength: Attribute;
        dexterity: Attribute;
        constitution: Attribute;
        intelligence: Attribute;
        wisdom: Attribute;
        charisma: Attribute;
    };
    proficiencyBonus: number;
}

const ATTRIBUTE_NAMES: Record<string, { name: string; abbr: string }> = {
    strength: { name: "Força", abbr: "FOR" },
    dexterity: { name: "Destreza", abbr: "DES" },
    constitution: { name: "Constituição", abbr: "CON" },
    intelligence: { name: "Inteligência", abbr: "INT" },
    wisdom: { name: "Sabedoria", abbr: "SAB" },
    charisma: { name: "Carisma", abbr: "CAR" },
};

export function CharacterAttributes({ attributes, proficiencyBonus }: CharacterAttributesProps) {
    return (
        <div className="space-y-6">
            {/* Proficiency Bonus */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border-medieval rounded-xl p-4 inline-block"
            >
                <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1 font-lora">Bônus de Proficiência</div>
                    <div className="font-display text-3xl text-primary">+{proficiencyBonus}</div>
                </div>
            </motion.div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(attributes).map(([key, attr], index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card border-medieval rounded-xl p-4 text-center relative hover:box-glow transition-all duration-300"
                    >
                        {/* Attribute Name */}
                        <div className="text-xs text-muted-foreground mb-1 font-lora">
                            {ATTRIBUTE_NAMES[key].name}
                        </div>
                        <div className="text-xs font-bold text-primary/80 mb-3 font-display">
                            {ATTRIBUTE_NAMES[key].abbr}
                        </div>

                        {/* Modifier (large) */}
                        <div className="font-display text-4xl text-foreground mb-2">
                            {attr.modifier >= 0 ? `+${attr.modifier}` : attr.modifier}
                        </div>

                        {/* Score (small, in a circle) */}
                        <div className="w-10 h-10 mx-auto rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center">
                            <span className="font-display text-lg text-foreground">{attr.score}</span>
                        </div>

                        {/* Saving Throw */}
                        <div className="mt-4 pt-3 border-t border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-lora">Salvaguarda</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`font-display text-lg ${attr.proficient ? 'text-primary text-glow' : 'text-foreground'}`}>
                                    {attr.savingThrow >= 0 ? `+${attr.savingThrow}` : attr.savingThrow}
                                </span>
                                {attr.proficient && (
                                    <Badge className="bg-primary/20 text-primary border-primary/50 text-[10px] px-1 h-4">
                                        Prof
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
