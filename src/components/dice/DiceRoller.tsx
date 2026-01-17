import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dices, Plus, Minus, RotateCcw } from "lucide-react";

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

interface DiceConfig {
    type: DiceType;
    sides: number;
    color: string;
}

const DICE_CONFIGS: DiceConfig[] = [
    { type: "d4", sides: 4, color: "from-emerald-600 to-emerald-800" },
    { type: "d6", sides: 6, color: "from-blue-600 to-blue-800" },
    { type: "d8", sides: 8, color: "from-purple-600 to-purple-800" },
    { type: "d10", sides: 10, color: "from-red-600 to-red-800" },
    { type: "d12", sides: 12, color: "from-amber-600 to-amber-800" },
    { type: "d20", sides: 20, color: "from-primary to-candle-soft" },
    { type: "d100", sides: 100, color: "from-slate-600 to-slate-800" },
];

interface RollResult {
    dice: DiceType;
    result: number;
    id: number;
}

export function DiceRoller() {
    const [selectedDice, setSelectedDice] = useState<DiceType>("d20");
    const [quantity, setQuantity] = useState(1);
    const [modifier, setModifier] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [results, setResults] = useState<RollResult[]>([]);
    const [total, setTotal] = useState<number | null>(null);

    const selectedConfig = DICE_CONFIGS.find(d => d.type === selectedDice)!;

    const rollDice = () => {
        setIsRolling(true);
        setResults([]);
        setTotal(null);

        setTimeout(() => {
            const newResults: RollResult[] = [];
            let sum = 0;

            for (let i = 0; i < quantity; i++) {
                const result = Math.floor(Math.random() * selectedConfig.sides) + 1;
                newResults.push({
                    dice: selectedDice,
                    result,
                    id: Date.now() + i,
                });
                sum += result;
            }

            setResults(newResults);
            setTotal(sum + modifier);
            setIsRolling(false);
        }, 800);
    };

    const resetRoller = () => {
        setQuantity(1);
        setModifier(0);
        setResults([]);
        setTotal(null);
    };

    return (
        <div className="bg-card border-medieval rounded-xl p-6 space-y-6">
            {/* Dice Selection */}
            <div className="space-y-3">
                <h3 className="font-display text-lg text-primary">Tipo de Dado</h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {DICE_CONFIGS.map((dice) => (
                        <button
                            key={dice.type}
                            onClick={() => setSelectedDice(dice.type)}
                            className={`relative p-3 rounded-lg border-2 transition-all ${selectedDice === dice.type
                                    ? "border-primary bg-primary/20 box-glow"
                                    : "border-border hover:border-primary/50"
                                }`}
                        >
                            <div className={`w-full aspect-square rounded bg-gradient-to-br ${dice.color} flex items-center justify-center`}>
                                <span className="font-display text-xs text-white">{dice.type}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity and Modifier */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="font-display text-sm text-primary">Quantidade</label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-display text-xl">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.min(20, quantity + 1))}
                            disabled={quantity >= 20}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="font-display text-sm text-primary">Modificador</label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setModifier(modifier - 1)}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-display text-xl">
                            {modifier >= 0 ? `+${modifier}` : modifier}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setModifier(modifier + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Roll Summary */}
            <div className="text-center py-2">
                <span className="font-display text-xl text-foreground">
                    {quantity}{selectedDice}
                    {modifier !== 0 && (
                        <span className="text-primary">
                            {modifier >= 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`}
                        </span>
                    )}
                </span>
            </div>

            {/* Roll Button */}
            <div className="flex gap-3">
                <Button
                    variant="hero"
                    className="flex-1"
                    onClick={rollDice}
                    disabled={isRolling}
                >
                    <Dices className={`h-5 w-5 mr-2 ${isRolling ? "animate-spin" : ""}`} />
                    {isRolling ? "Rolando..." : "Rolar Dados"}
                </Button>
                <Button variant="outline" size="icon" onClick={resetRoller}>
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="flex flex-wrap gap-3 justify-center">
                            {results.map((result, index) => (
                                <motion.div
                                    key={result.id}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${selectedConfig.color} flex items-center justify-center shadow-lg`}
                                >
                                    <span className="font-display text-xl text-white">{result.result}</span>
                                </motion.div>
                            ))}
                        </div>

                        {total !== null && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: results.length * 0.1 + 0.2 }}
                                className="text-center"
                            >
                                <div className="inline-block px-8 py-4 bg-primary/20 rounded-xl border border-primary/40 box-glow">
                                    <span className="font-display text-4xl text-primary text-glow">
                                        {total}
                                    </span>
                                    {modifier !== 0 && (
                                        <span className="block text-sm text-muted-foreground mt-1">
                                            ({results.reduce((a, b) => a + b.result, 0)} {modifier >= 0 ? "+" : "-"} {Math.abs(modifier)})
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
