import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Shield, Sword, Backpack, Coins,
    CircleDollarSign
} from "lucide-react";

interface CharacterEquipmentProps {
    equipment: {
        armor: string;
        shield: string;
        weapons: string[];
        items: string[];
        money: {
            platinum: number;
            gold: number;
            electrum: number;
            silver: number;
            copper: number;
        };
    };
}

const COIN_COLORS: Record<string, string> = {
    platinum: "text-slate-300",
    gold: "text-amber-400",
    electrum: "text-blue-300",
    silver: "text-gray-300",
    copper: "text-orange-400",
};

const COIN_LABELS: Record<string, string> = {
    platinum: "PP",
    gold: "PO",
    electrum: "PE",
    silver: "PP",
    copper: "PC",
};

export function CharacterEquipment({ equipment }: CharacterEquipmentProps) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Armor & Shield */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl text-foreground text-glow">Armadura & Escudo</h3>
                </div>

                <div className="space-y-3 font-lora">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                        <span className="text-muted-foreground">Armadura</span>
                        <span className="font-medium text-foreground">{equipment.armor}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                        <span className="text-muted-foreground">Escudo</span>
                        <span className="font-medium text-foreground">{equipment.shield}</span>
                    </div>
                </div>
            </motion.div>

            {/* Weapons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Sword className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl text-foreground text-glow">Armas</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {equipment.weapons.map((weapon, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="bg-muted/30 border-primary/30 text-foreground py-1.5 px-3 font-lora"
                        >
                            {weapon}
                        </Badge>
                    ))}
                </div>
            </motion.div>

            {/* Items */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Backpack className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl text-foreground text-glow">Inventário</h3>
                </div>

                <ul className="space-y-2 font-lora">
                    {equipment.items.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Money */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card border-medieval rounded-xl p-6 hover:box-glow transition-all duration-300"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Coins className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl text-foreground text-glow">Dinheiro</h3>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {Object.entries(equipment.money).map(([type, amount]) => (
                        <div key={type} className="text-center p-2 rounded-lg bg-muted/30 border border-border/50">
                            <CircleDollarSign className={`h-5 w-5 mx-auto mb-1 ${COIN_COLORS[type]}`} />
                            <div className="font-display text-base text-foreground">{amount}</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-lora">{COIN_LABELS[type]}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between font-lora">
                        <span className="text-muted-foreground">Total em Ouro</span>
                        <span className="font-display text-xl text-amber-400 text-glow">
                            {(
                                equipment.money.platinum * 10 +
                                equipment.money.gold +
                                equipment.money.electrum * 0.5 +
                                equipment.money.silver * 0.1 +
                                equipment.money.copper * 0.01
                            ).toFixed(2)} PO
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
