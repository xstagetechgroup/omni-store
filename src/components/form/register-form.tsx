"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    getIdToken
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1 - Cria usuário no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2 - Atualiza nome no perfil do Auth
            await updateProfile(user, { displayName: name });

            // 3 - Salva dados adicionais no Firestore
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                phone,
                address,
                createdAt: serverTimestamp()
            });

            // 4 - Pega token e salva no localStorage
            const token = await getIdToken(user);
            localStorage.setItem("userToken", token);

            alert("Usuário registrado com sucesso!");
            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Cadastre-se</h1>
                                <p className="text-muted-foreground text-balance">
                                    Crie uma conta para continuar
                                </p>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="grid gap-3">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" type="text" placeholder="Nome Completo" required
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="phone">Telemóvel</Label>
                                <Input id="phone" type="tel" placeholder="(244) 9## ### ###" required
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="address">Endereço</Label>
                                <Input id="address" type="text" placeholder="Endereço" required
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password" required
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                {loading ? "Cadastrando..." : "Cadastre-se"}
                            </Button>
                        </div>
                    </form>

                    <div className="bg-muted relative hidden md:flex md:justify-center md:items-center">
                        <Image width={300} height={300} src="/assets/1.png" alt="Image"
                            className="absolute object-cover dark:brightness-[0.2] dark:grayscale" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
