"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type UserData = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1) login com Firebase Auth
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      // 2) pega token (idToken) e salva no localStorage
      const token = await user.getIdToken();
      localStorage.setItem("userToken", token);

      // 3) busca dados do usuário no Firestore (collection "users")
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      let userData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? null,
      };

      if (snap.exists()) {
        userData = { ...userData, ...snap.data() };
      } else {
        // Opcional: se não existe, cria um documento mínimo (merge safe)
        const minimal = {
          name: user.displayName ?? "",
          email: user.email ?? "",
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, minimal, { merge: true });
        userData = { ...userData, ...minimal };
      }

      // 4) salva o profile no localStorage para uso imediato
      localStorage.setItem("user", JSON.stringify(userData));

      // 5) redireciona (ajuste conforme sua rota)
      router.push("/");
    } catch (err: unknown) {
      // mapeia erros comuns do Firebase para mensagens amigáveis
      const code = (err as { code?: string })?.code || "";
      let message = "Erro ao fazer login. Tente novamente.";

      if (code === "auth/wrong-password") message = "Senha incorreta.";
      else if (code === "auth/user-not-found") message = "Usuário não encontrado.";
      else if (code === "auth/invalid-email") message = "Email inválido.";
      else if (code === "auth/too-many-requests")
        message = "Muitas tentativas. Tente mais tarde.";
      else if ((err as Error)?.message) message = (err as Error).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-muted-foreground text-balance">
                  Faça Login na sua conta para continuar
                </p>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                {loading ? "Entrando..." : "Login"}
              </Button>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">Ou continue com</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" className="w-full">🍏</Button>
                <Button variant="outline" type="button" className="w-full">🔍</Button>
                <Button variant="outline" type="button" className="w-full">📘</Button>
              </div>

              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <a href="/registar" className="underline underline-offset-4">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:flex md:justify-center md:items-center">
            <Image
              width={300}
              height={300}
              src="/assets/1.png"
              alt="Image"
              className="absolute object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
