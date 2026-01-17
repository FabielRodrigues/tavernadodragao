import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft, Heart, Shield, Zap, Sword,
    BookOpen, Backpack, Sparkles, Scroll, User,
    Target, Footprints, Brain
} from "lucide-react";
import { CharacterAttributes } from "@/components/character/CharacterAttributes";
import { CharacterSkills } from "@/components/character/CharacterSkills";
import { CharacterCombat } from "@/components/character/CharacterCombat";
import { CharacterEquipment } from "@/components/character/CharacterEquipment";
import { CharacterSpells } from "@/components/character/CharacterSpells";
import { CharacterTraits } from "@/components/character/CharacterTraits";

// Mock data completo de um personagem D&D 5e
const MOCK_CHARACTER = {
    id: "1",
    name: "Thorin Escudo de Carvalho",
    race: "Anão da Montanha",
    className: "Guerreiro",
    subclass: "Campeão",
    level: 5,
    background: "Soldado",
    alignment: "Leal e Bom",
    experiencePoints: 6500,
    nextLevelXP: 14000,
    playerName: "João Silva",
    campaign: "A Maldição de Strahd",

    // Atributos base
    attributes: {
        strength: { score: 18, modifier: 4, savingThrow: 7, proficient: true },
        dexterity: { score: 12, modifier: 1, savingThrow: 1, proficient: false },
        constitution: { score: 16, modifier: 3, savingThrow: 6, proficient: true },
        intelligence: { score: 10, modifier: 0, savingThrow: 0, proficient: false },
        wisdom: { score: 14, modifier: 2, savingThrow: 2, proficient: false },
        charisma: { score: 8, modifier: -1, savingThrow: -1, proficient: false },
    },

    // Pontos de vida
    hp: {
        current: 45,
        max: 52,
        temporary: 0,
        hitDice: { current: 5, max: 5, type: "d10" },
    },

    // Combate
    combat: {
        armorClass: 18,
        initiative: 1,
        speed: 25,
        proficiencyBonus: 3,
        passivePerception: 14,
        inspiration: true,
    },

    // Perícias
    skills: {
        acrobatics: { modifier: 1, proficient: false },
        animalHandling: { modifier: 2, proficient: false },
        arcana: { modifier: 0, proficient: false },
        athletics: { modifier: 7, proficient: true },
        deception: { modifier: -1, proficient: false },
        history: { modifier: 0, proficient: false },
        insight: { modifier: 2, proficient: false },
        intimidation: { modifier: 2, proficient: true },
        investigation: { modifier: 0, proficient: false },
        medicine: { modifier: 2, proficient: false },
        nature: { modifier: 0, proficient: false },
        perception: { modifier: 5, proficient: true },
        performance: { modifier: -1, proficient: false },
        persuasion: { modifier: -1, proficient: false },
        religion: { modifier: 0, proficient: false },
        sleightOfHand: { modifier: 1, proficient: false },
        stealth: { modifier: 1, proficient: false },
        survival: { modifier: 5, proficient: true },
    },

    // Ataques e armas
    attacks: [
        { name: "Machado de Batalha +1", attackBonus: 8, damage: "1d8+5", damageType: "Cortante", properties: ["Versátil (1d10)"] },
        { name: "Besta Leve", attackBonus: 4, damage: "1d8+1", damageType: "Perfurante", properties: ["Munição", "Carregamento"] },
        { name: "Adaga", attackBonus: 7, damage: "1d4+4", damageType: "Perfurante", properties: ["Acuidade", "Leve", "Arremesso"] },
    ],

    // Equipamentos
    equipment: {
        armor: "Cota de Malha",
        shield: "Escudo de Carvalho",
        weapons: ["Machado de Batalha +1", "Besta Leve", "Adaga"],
        items: [
            "Mochila do Explorador",
            "Corda de Cânhamo (15m)",
            "Rações (10 dias)",
            "Cantil",
            "Pederneira",
            "Tocha (10)",
            "Kit de Primeiros Socorros",
            "Insígnia de Patente",
            "Troféu de um inimigo caído",
        ],
        money: {
            platinum: 0,
            gold: 125,
            electrum: 0,
            silver: 45,
            copper: 120,
        },
    },

    // Magias (vazio para guerreiro, mas estrutura preparada)
    spells: {
        spellcastingAbility: null,
        spellSaveDC: null,
        spellAttackBonus: null,
        cantrips: [],
        slots: {},
        knownSpells: [],
    },

    // Características e Traços
    traits: {
        personalityTraits: [
            "Posso olhar fixamente para um demônio sem pestanejar.",
            "Sempre quero saber como as coisas funcionam e o que motiva as pessoas.",
        ],
        ideals: ["Responsabilidade - Faço o que preciso fazer e obedeço apenas a uma autoridade justa."],
        bonds: ["Aqueles que lutam ao meu lado são aqueles por quem vale a pena morrer."],
        flaws: ["Tenho pouca consideração pela minha própria segurança."],
        features: [
            { name: "Estilo de Luta: Defesa", description: "+1 CA quando vestindo armadura" },
            { name: "Retomar Fôlego", description: "1d10+5 PV como ação bônus (1/descanso curto)" },
            { name: "Surto de Ação", description: "Uma ação adicional (1/descanso curto)" },
            { name: "Crítico Aprimorado", description: "Crítico em 19-20" },
            { name: "Ataque Extra", description: "Ataca duas vezes com a ação Atacar" },
            { name: "Resiliência Anã", description: "Vantagem contra veneno, resistência a dano de veneno" },
            { name: "Treinamento Anão em Combate", description: "Proficiência com machados e martelos" },
        ],
    },

    // Proficiências e Idiomas
    proficiencies: {
        armor: ["Armaduras leves", "Armaduras médias", "Armaduras pesadas", "Escudos"],
        weapons: ["Armas simples", "Armas marciais"],
        tools: ["Ferramentas de ferreiro", "Veículos terrestres"],
        languages: ["Comum", "Anão"],
    },

    // Aparência e história
    appearance: {
        age: 145,
        height: "1,35m",
        weight: "75kg",
        eyes: "Castanhos",
        skin: "Bronzeada",
        hair: "Ruivo, longa barba trançada",
    },
    backstory: "Thorin serviu por décadas nas fileiras do exército anão de Mithral Hall, defendendo as minas contra invasores orcs e goblinoides. Após a queda de seu regimento em uma emboscada, ele jurou vingança contra as forças das trevas e partiu em busca de aventura e redenção.",
};

export default function CharacterSheet() {
    const { id } = useParams();
    const character = MOCK_CHARACTER;

    const hpPercentage = (character.hp.current / character.hp.max) * 100;
    const xpPercentage = (character.experiencePoints / character.nextLevelXP) * 100;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Link to="/characters">
                        <Button variant="ghost" className="gap-2 font-lora text-muted-foreground hover:text-primary">
                            <ArrowLeft className="h-4 w-4" />
                            Voltar aos Personagens
                        </Button>
                    </Link>
                </motion.div>

                {/* Character Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border-medieval rounded-xl p-6 mb-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Scroll className="w-32 h-32 rotate-12" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Avatar & Basic Info */}
                        <div className="flex gap-6 items-start">
                            <div className="w-32 h-32 rounded-xl bg-muted border-2 border-primary/30 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg group">
                                <User className="h-16 w-16 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h1 className="font-display text-4xl text-primary text-glow">
                                        {character.name}
                                    </h1>
                                    {character.combat.inspiration && (
                                        <Badge className="bg-primary/20 text-primary border-primary/50 animate-pulse">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            Inspirado
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4 text-xs font-lora">
                                    <Badge variant="outline" className="bg-muted/20">
                                        {character.race}
                                    </Badge>
                                    <Badge variant="outline" className="bg-muted/20">
                                        {character.className} • {character.subclass}
                                    </Badge>
                                    <Badge className="bg-primary text-primary-foreground font-display">
                                        Nível {character.level}
                                    </Badge>
                                </div>

                                <div className="text-sm text-muted-foreground space-y-1.5 font-lora">
                                    <p className="flex items-center gap-2">
                                        <Scroll className="w-3.5 h-3.5" />
                                        <span className="text-foreground/70">Antecedente:</span> {character.background}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Target className="w-3.5 h-3.5" />
                                        <span className="text-foreground/70">Alinhamento:</span> {character.alignment}
                                    </p>
                                    {character.campaign && (
                                        <p className="flex items-center gap-2">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span className="text-foreground/70">Campanha:</span> {character.campaign}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {/* HP */}
                            <div className="bg-muted/30 rounded-lg p-3 text-center border border-border/50 hover:box-glow transition-all">
                                <Heart className={`h-5 w-5 mx-auto mb-2 ${hpPercentage > 50 ? 'text-emerald-500' : hpPercentage > 25 ? 'text-amber-500' : 'text-destructive'}`} />
                                <div className="font-display text-xl text-foreground">
                                    {character.hp.current}/{character.hp.max}
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-lora">Vida</div>
                                <Progress
                                    value={hpPercentage}
                                    className="h-1.5 mt-2 bg-muted"
                                    indicatorClassName={hpPercentage > 50 ? 'bg-emerald-500' : hpPercentage > 25 ? 'bg-amber-500' : 'bg-destructive'}
                                />
                            </div>

                            {/* AC */}
                            <div className="bg-muted/30 rounded-lg p-3 text-center border border-border/50 hover:box-glow transition-all">
                                <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                                <div className="font-display text-2xl text-foreground">
                                    {character.combat.armorClass}
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-lora">C. Armadura</div>
                            </div>

                            {/* Initiative */}
                            <div className="bg-muted/30 rounded-lg p-3 text-center border border-border/50 hover:box-glow transition-all">
                                <Zap className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                                <div className="font-display text-2xl text-foreground">
                                    +{character.combat.initiative}
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-lora">Iniciativa</div>
                            </div>

                            {/* Speed */}
                            <div className="bg-muted/30 rounded-lg p-3 text-center border border-border/50 hover:box-glow transition-all">
                                <Footprints className="h-5 w-5 mx-auto mb-2 text-blue-400" />
                                <div className="font-display text-2xl text-foreground">
                                    {character.combat.speed}ft
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-lora">Desloc.</div>
                            </div>
                        </div>
                    </div>

                    {/* XP Bar */}
                    <div className="mt-8 pt-4 border-t border-border/50 relative">
                        <div className="flex items-center justify-between text-[10px] mb-2 uppercase tracking-widest font-lora">
                            <span className="text-muted-foreground">Progresso ({id || character.id})</span>
                            <span className="text-primary font-display text-sm">
                                {character.experiencePoints.toLocaleString()} / {character.nextLevelXP.toLocaleString()} XP
                            </span>
                        </div>
                        <Progress value={xpPercentage} className="h-1.5 bg-muted" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    </div>
                </motion.div>

                {/* Tabs for different sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Tabs defaultValue="attributes" className="w-full">
                        <TabsList className="w-full justify-start overflow-x-auto bg-card border-medieval mb-8 p-1 gap-2 flex-wrap h-auto">
                            <TabsTrigger value="attributes" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <Brain className="h-4 w-4" />
                                Atributos
                            </TabsTrigger>
                            <TabsTrigger value="combat" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <Sword className="h-4 w-4" />
                                Combate
                            </TabsTrigger>
                            <TabsTrigger value="skills" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <Target className="h-4 w-4" />
                                Perícias
                            </TabsTrigger>
                            <TabsTrigger value="equipment" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <Backpack className="h-4 w-4" />
                                Equipamento
                            </TabsTrigger>
                            <TabsTrigger value="spells" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <BookOpen className="h-4 w-4" />
                                Magias
                            </TabsTrigger>
                            <TabsTrigger value="traits" className="gap-2 font-display text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
                                <Scroll className="h-4 w-4" />
                                Traços
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="attributes" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterAttributes
                                attributes={character.attributes}
                                proficiencyBonus={character.combat.proficiencyBonus}
                            />
                        </TabsContent>

                        <TabsContent value="combat" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterCombat
                                combat={character.combat}
                                attacks={character.attacks}
                                hp={character.hp}
                            />
                        </TabsContent>

                        <TabsContent value="skills" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterSkills
                                skills={character.skills}
                                proficiencyBonus={character.combat.proficiencyBonus}
                            />
                        </TabsContent>

                        <TabsContent value="equipment" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterEquipment equipment={character.equipment} />
                        </TabsContent>

                        <TabsContent value="spells" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterSpells spells={character.spells} />
                        </TabsContent>

                        <TabsContent value="traits" className="focus-visible:outline-none focus-visible:ring-0">
                            <CharacterTraits
                                traits={character.traits}
                                proficiencies={character.proficiencies}
                                appearance={character.appearance}
                                backstory={character.backstory}
                            />
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </main>
        </div>
    );
}
