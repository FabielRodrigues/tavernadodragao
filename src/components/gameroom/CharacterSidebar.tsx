import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CharacterSidebarProps {
    character: {
        id: string;
        name: string;
        class: string;
        level: number;
        avatar: string;
        hp: { current: number; max: number };
        attributes: {
            for: number;
            des: number;
            con: number;
            int: number;
            sab: number;
            car: number;
        };
        quickSkills: { name: string; modifier: number }[];
    };
}

const attributeLabels = {
    for: "FOR",
    des: "DES",
    con: "CON",
    int: "INT",
    sab: "SAB",
    car: "CAR",
};

export function CharacterSidebar({ character }: CharacterSidebarProps) {
    const hpPercentage = (character.hp.current / character.hp.max) * 100;

    const getHpColor = () => {
        if (hpPercentage > 60) return "bg-emerald-500";
        if (hpPercentage > 30) return "bg-amber-500";
        return "bg-red-500";
    };

    const getModifier = (value: number) => {
        const mod = Math.floor((value - 10) / 2);
        return mod >= 0 ? `+${mod}` : mod.toString();
    };

    return (
        <div className="p-4 space-y-6 scrollbar-thin">
            {/* Character Header */}
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-primary/50 overflow-hidden mb-3 bg-muted shadow-lg shadow-primary/20"
                >
                    <img
                        src={character.avatar}
                        alt={character.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <h2 className="font-display text-lg text-foreground font-bold truncate px-2" title={character.name}>
                    {character.name}
                </h2>
                <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 text-[10px]">
                        {character.class}
                    </Badge>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-500 bg-amber-500/5 text-[10px]">
                        Nível {character.level}
                    </Badge>
                </div>
            </div>

            {/* Attributes Grid */}
            <div className="space-y-3">
                <h3 className="font-display text-[10px] tracking-widest text-muted-foreground/70 uppercase">ATRIBUTOS</h3>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(character.attributes).map(([key, value]) => (
                        <div
                            key={key}
                            className="bg-muted/20 border border-border/50 rounded-lg p-2 text-center hover:border-primary/30 transition-colors group"
                        >
                            <span className="text-[10px] text-muted-foreground block mb-0.5">
                                {attributeLabels[key as keyof typeof attributeLabels]}
                            </span>
                            <span className="font-display text-lg text-foreground block leading-none mb-1 group-hover:text-primary transition-colors">{value}</span>
                            <span className="text-[10px] text-primary font-bold bg-primary/10 rounded px-1.5 py-0.5 inline-block">
                                {getModifier(value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* HP */}
            <div className="space-y-3">
                <h3 className="font-display text-[10px] tracking-widest text-muted-foreground/70 uppercase">PONTOS DE VIDA</h3>
                <div className="space-y-2 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="relative h-2.5 bg-background shadow-inner rounded-full overflow-hidden border border-border/30">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${hpPercentage}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className={`h-full ${getHpColor()} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                        />
                    </div>
                    <div className="flex items-center justify-between text-xs px-1">
                        <div className="flex items-center gap-1.5">
                            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500/20" />
                            <span className="font-display text-foreground/80">VITALIDADE</span>
                        </div>
                        <span className="font-display font-bold text-foreground">
                            {character.hp.current} / {character.hp.max}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Skills */}
            <div className="space-y-3">
                <h3 className="font-display text-[10px] tracking-widest text-muted-foreground/70 uppercase">PERÍCIAS RÁPIDAS</h3>
                <div className="space-y-2">
                    {character.quickSkills.map((skill, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-between text-xs h-9 bg-muted/10 border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                        >
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                            <span className="text-primary font-display font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                1d20{skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Character Switcher */}
            <div className="pt-6 border-t border-border/50">
                <label className="text-[10px] tracking-widest text-muted-foreground/50 mb-3 block uppercase font-display">
                    Trocar Personagem
                </label>
                <Select defaultValue={character.id}>
                    <SelectTrigger className="w-full bg-muted/20 border-border/40 h-10 text-xs">
                        <SelectValue placeholder="Selecione um personagem" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/50 shadow-2xl">
                        <SelectItem value={character.id} className="text-xs">{character.name}</SelectItem>
                        <SelectItem value="new" className="text-xs text-primary font-bold">+ Criar novo personagem</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
