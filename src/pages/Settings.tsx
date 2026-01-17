import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
    return (
        <MainLayout>
            <div className="p-4 md:p-8 space-y-8 animate-fade-in-up max-w-3xl mx-auto">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold font-cinzel text-primary text-glow">Configurações</h1>
                    <p className="text-muted-foreground font-lora">Preferências da Taverna</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-cinzel text-foreground">Aparência</h2>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="dark-mode">Modo Escuro (Taverna)</Label>
                                <p className="text-sm text-muted-foreground">O ambiente padrão da taverna é escuro.</p>
                            </div>
                            <Switch id="dark-mode" checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="animations">Animações de Ambiente</Label>
                                <p className="text-sm text-muted-foreground">Efeito de velas e partículas.</p>
                            </div>
                            <Switch id="animations" defaultChecked />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-cinzel text-foreground">Notificações</h2>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifs">E-mail</Label>
                                <p className="text-sm text-muted-foreground">Receber convites e atualizações importantes.</p>
                            </div>
                            <Switch id="email-notifs" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="turn-notifs">Avisos de Turno</Label>
                                <p className="text-sm text-muted-foreground">Notificar quando for sua vez de jogar.</p>
                            </div>
                            <Switch id="turn-notifs" defaultChecked />
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button variant="destructive" className="w-full md:w-auto">Sair da Taverna (Logout)</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings;
