import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Scroll, Target, Link, AlertTriangle,
    Sparkles, User, Languages, Wrench, Shield, Sword
} from "lucide-react";

interface Feature {
    name: string;
    description: string;
}

interface CharacterTraitsProps {
    traits: {
        personalityTraits: string[];
        ideals: string[];
        bonds: string[];
        flaws: string[];
        features: Feature[];
    };
    proficiencies: {
        armor: string[];
        weapons: string[];
        tools: string[];
        languages: string[];
    };
    appearance: {
        age: number;
        height: string;
        weight: string;
        eyes: string;
        skin: string;
        hair: string;
    };
    backstory: string;
}

export function CharacterTraits({ traits, proficiencies, appearance, backstory }: CharacterTraitsProps) {
    return (
        <div className="space-y-6">
            {/* Personality */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Personality Traits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-primary text-glow" />
                        <h3 className="font-display text-lg text-foreground">Traços de Personalidade</h3>
                    </div>
                    <ul className="space-y-2 font-lora">
                        {traits.personalityTraits.map((trait, index) => (
                            <li key={index} className="text-muted-foreground text-sm italic">
                                "{trait}"
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Ideals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-primary text-glow" />
                        <h3 className="font-display text-lg text-foreground">Ideais</h3>
                    </div>
                    <ul className="space-y-2 font-lora">
                        {traits.ideals.map((ideal, index) => (
                            <li key={index} className="text-muted-foreground text-sm">
                                {ideal}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Bonds */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Link className="h-5 w-5 text-primary text-glow" />
                        <h3 className="font-display text-lg text-foreground">Vínculos</h3>
                    </div>
                    <ul className="space-y-2 font-lora">
                        {traits.bonds.map((bond, index) => (
                            <li key={index} className="text-muted-foreground text-sm">
                                {bond}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Flaws */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h3 className="font-display text-lg text-foreground">Defeitos</h3>
                    </div>
                    <ul className="space-y-2 font-lora">
                        {traits.flaws.map((flaw, index) => (
                            <li key={index} className="text-muted-foreground text-sm">
                                {flaw}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Features & Traits */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border-medieval rounded-xl p-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary text-glow" />
                    <h3 className="font-display text-xl text-foreground">Características & Talentos</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {traits.features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors font-lora"
                        >
                            <h4 className="font-display text-primary mb-1 text-sm">{feature.name}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Proficiencies */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-card border-medieval rounded-xl p-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Scroll className="h-5 w-5 text-primary text-glow" />
                    <h3 className="font-display text-xl text-foreground">Proficiências</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 font-lora">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground uppercase tracking-wider">Armaduras</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {proficiencies.armor.map((item, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] h-4 bg-muted/20">{item}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sword className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground uppercase tracking-wider">Armas</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {proficiencies.weapons.map((item, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] h-4 bg-muted/20">{item}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground uppercase tracking-wider">Ferramentas</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {proficiencies.tools.map((item, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] h-4 bg-muted/20">{item}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Languages className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground uppercase tracking-wider">Idiomas</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {proficiencies.languages.map((item, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] h-4 bg-muted/20">{item}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Appearance & Backstory */}
            <div className="grid md:grid-cols-3 gap-6 font-lora">
                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border-medieval rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-primary text-glow" />
                        <h3 className="font-display text-lg text-foreground">Aparência</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Idade</span>
                            <span className="text-foreground">{appearance.age} anos</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Altura</span>
                            <span className="text-foreground">{appearance.height}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Peso</span>
                            <span className="text-foreground">{appearance.weight}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Olhos</span>
                            <span className="text-foreground">{appearance.eyes}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Pele</span>
                            <span className="text-foreground">{appearance.skin}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground italic">Cabelo</span>
                            <span className="text-foreground">{appearance.hair}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Backstory */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-card border-medieval rounded-xl p-6 md:col-span-2"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Scroll className="h-5 w-5 text-primary text-glow" />
                        <h3 className="font-display text-lg text-foreground">História</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                        {backstory}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
