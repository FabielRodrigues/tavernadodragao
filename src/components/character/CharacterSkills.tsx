import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

interface Skill {
    modifier: number;
    proficient: boolean;
}

interface CharacterSkillsProps {
    skills: Record<string, Skill>;
    proficiencyBonus: number;
}

const SKILL_NAMES: Record<string, { name: string; attribute: string }> = {
    acrobatics: { name: "Acrobacia", attribute: "DES" },
    animalHandling: { name: "Adestrar Animais", attribute: "SAB" },
    arcana: { name: "Arcanismo", attribute: "INT" },
    athletics: { name: "Atletismo", attribute: "FOR" },
    deception: { name: "Enganação", attribute: "CAR" },
    history: { name: "História", attribute: "INT" },
    insight: { name: "Intuição", attribute: "SAB" },
    intimidation: { name: "Intimidação", attribute: "CAR" },
    investigation: { name: "Investigação", attribute: "INT" },
    medicine: { name: "Medicina", attribute: "SAB" },
    nature: { name: "Natureza", attribute: "INT" },
    perception: { name: "Percepção", attribute: "SAB" },
    performance: { name: "Atuação", attribute: "CAR" },
    persuasion: { name: "Persuasão", attribute: "CAR" },
    religion: { name: "Religião", attribute: "INT" },
    sleightOfHand: { name: "Prestidigitação", attribute: "DES" },
    stealth: { name: "Furtividade", attribute: "DES" },
    survival: { name: "Sobrevivência", attribute: "SAB" },
};

// Group skills by attribute
const SKILLS_BY_ATTRIBUTE = {
    FOR: ["athletics"],
    DES: ["acrobatics", "sleightOfHand", "stealth"],
    CON: [],
    INT: ["arcana", "history", "investigation", "nature", "religion"],
    SAB: ["animalHandling", "insight", "medicine", "perception", "survival"],
    CAR: ["deception", "intimidation", "performance", "persuasion"],
};

export function CharacterSkills({ skills }: CharacterSkillsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS_BY_ATTRIBUTE).map(([attr, skillKeys], groupIndex) => {
                if (skillKeys.length === 0) return null;

                return (
                    <motion.div
                        key={attr}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: groupIndex * 0.05 }}
                        className="bg-card border-medieval rounded-xl p-4 hover:box-glow transition-all duration-300"
                    >
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                            <Badge variant="outline" className="font-display text-primary text-[10px] h-5">
                                {attr}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-lora italic">Perícias</span>
                        </div>

                        <div className="space-y-1.5 font-lora">
                            {skillKeys.map((skillKey) => {
                                const skill = skills[skillKey];
                                const skillInfo = SKILL_NAMES[skillKey];

                                return (
                                    <div
                                        key={skillKey}
                                        className={`flex items-center justify-between p-2 rounded-lg transition-colors group ${skill.proficient ? 'bg-primary/10' : 'hover:bg-muted/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {skill.proficient ? (
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary text-glow" />
                                            ) : (
                                                <Circle className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors" />
                                            )}
                                            <span className={`text-sm ${skill.proficient ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                                {skillInfo.name}
                                            </span>
                                        </div>
                                        <span className={`font-display text-lg ${skill.proficient ? 'text-primary' : 'text-foreground'}`}>
                                            {skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
