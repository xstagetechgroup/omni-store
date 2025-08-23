'use client';
import { Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { app, db } from '@/lib/firebaseConfig';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface BaiPaymentProps {
    productData?: {
        title: string | null;
        plan: string | null;
        price: number | null;
        qty: number | null;
    };
}

const copyToClipboard = async (text: string, setCopied: (v: boolean) => void) => {
    try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    } catch {
        setCopied(false);
    }
};

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => copyToClipboard(value, setCopied)}
            aria-label="Copiar"
            title="Copiar"
            className="ml-2 relative p-0 bg-transparent border-0 cursor-pointer align-middle"
            type="button"
        >
            <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-blue-700"
                strokeWidth={2}
            >
                <rect x="9" y="9" width="13" height="13" rx="2" fill="#fff" />
                <rect x="3" y="3" width="13" height="13" rx="2" fill="#fff" />
            </svg>
            {copied && (
                <span className="absolute -top-5 left-1 text-green-700 text-xs font-semibold select-none">
                    Copiado!
                </span>
            )}
        </button>
    );
};

const IBAN = "0040 0000 9731 0384 1010 6";
const BENEFICIARIO = "BPA-INOVAÇÕES - COMÉRCIO E SERVIÇOS, LDA";

interface IUser {
    uid: string;
    name: string;
    email: string | null;
    phone: string | null;
    address?: string; // opcional
}

export default function BaiPayment({ productData }: BaiPaymentProps) {

    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState<null | "success" | "error">(null);

    const [referencia] = useState(() => {
        const randomNumbers = Math.floor(1000000 + Math.random() * 9000000);
        return `BPA${randomNumbers}`;
    });

    // Captura usuário logado
    useEffect(() => {
        const auth = getAuth(app);
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // 1. Dados básicos do Firebase Auth
                let userData: IUser = {
                    uid: currentUser.uid,
                    name: currentUser.displayName || "Sem nome",
                    email: currentUser.email,
                    phone: currentUser.phoneNumber,
                };

                // 2. Puxa os dados adicionais do Firestore
                const userRef = doc(db, "users", currentUser.uid);
                const snap = await getDoc(userRef);

                if (snap.exists()) {
                    userData = { ...userData, ...snap.data() } as IUser;
                }

                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const handlePaymentDone = async () => {
        if (!user || user === null) {
            alert("Você precisa estar logado para confirmar o pagamento.");
            return;
        }

        setLoading(true);
        try {
            // --- Enviar email ---
            const res = await fetch("/api/send-payment-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productData,
                    userData: user,
                    bankData: {
                        iban: IBAN,
                        valor: (productData?.price ?? 0) * (productData?.qty ?? 0),
                        beneficiario: BENEFICIARIO,
                        referencia,
                    }
                })
            });

            const data = await res.json();

            // --- Salvar no Firestore ---
            const docRef = await addDoc(collection(db, "orders"), {
                userId: user.uid,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone ?? null,
                product: productData,
                bankData: {
                    iban: IBAN,
                    valor: (productData?.price ?? 0) * (productData?.qty ?? 0),
                    beneficiario: BENEFICIARIO,
                    referencia,
                },
                status: "pending", // você pode criar um fluxo: pending, paid, shipped...
                createdAt: serverTimestamp(),
            });

            console.log("Document written with ID: ", docRef.id);

            if (data.success) {
                setOpenDialog("success");
            } else {
                setOpenDialog("error");
            }
        } catch (err) {
            console.error(err);
            setOpenDialog("error");
        }
        setLoading(false);
    };

    // Volta para a página anterior ao clicar em "Cancelar Compra"
    function handleCancel(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        if (typeof window !== "undefined") {
            window.history.back();
        }
    }

    return (
        <div className="w-full my-10 bg-white rounded-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-extrabold mb-6">
                Instruções de Pagamento BAI DIRETO
            </h2>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
                <div className="text-blue-700 font-medium mb-3">Siga estes passos:</div>
                <ol className="pl-5 list-decimal space-y-4 text-gray-700">
                    <li>Abra o seu aplicativo BAI DIRETO e selecione Transferências Nacionais</li>

                    <li>
                        Insira o nosso IBAN e o montante:
                        <div className="flex justify-between items-center mt-2 bg-white border border-blue-200 rounded-md px-4 py-2 font-mono text-base ">
                            AO06 {IBAN}
                            <CopyButton value={IBAN} />
                        </div>
                        <div className="flex justify-between items-center mt-2 bg-white border border-blue-200 rounded-md px-4 py-2 font-bold text-base">
                            {((productData?.price ?? 0) * (productData?.qty ?? 0)).toLocaleString("pt-BR")} AKZ
                            <CopyButton
                                value={((productData?.price ?? 0) * (productData?.qty ?? 0)).toString()}
                            />
                        </div>

                    </li>

                    <li>
                        Confirme se o nome de beneficiário é{" "}
                        <span className="font-semibold text-blue-700">{BENEFICIARIO}</span>
                    </li>

                    <li>
                        Insira esta referência no Descritivo para o Beneficiário:
                        <div className="flex justify-between items-center mt-2 bg-white border border-blue-200 rounded-md px-4 py-2 font-mono font-bold text-base">
                            {referencia}
                            <CopyButton value={referencia} />
                        </div>
                    </li>

                    <li>
                        <span className="text-blue-700 font-bold">Atenção:</span> o descritivo é para o Beneficiário e não para o Ordenante
                    </li>

                    <li>Confirme o pagamento</li>
                </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-8 flex items-center gap-3 text-yellow-900">
                <Info className='size-5' />
                <div>
                    <b>Importante:</b>
                    <br />
                    A compra só será efetuada após clicar no botão Pagamento Feito abaixo. Receberá a sua compra em alguns minutos após a confirmação.
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    type="button"
                    onClick={handlePaymentDone}
                    disabled={loading}
                    className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg transition-colors duration-200"
                >
                    {loading ? "Enviando..." : "Pagamento Feito"}
                </Button>
                <Button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-6 text-lg transition-colors duration-150"
                >
                    Cancelar Compra
                </Button>
            </div>
            {/* Dialog de sucesso */}
            <AlertDialog open={openDialog === "success"} onOpenChange={() => setOpenDialog(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmação Enviada</AlertDialogTitle>
                        <AlertDialogDescription>
                            A sua solicitação foi enviada e será atendida brevemente!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className='cursor-pointer' onClick={() => window.location.href = "/"}>Ir para Página Inicial</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Dialog de erro */}
            <AlertDialog open={openDialog === "error"} onOpenChange={() => setOpenDialog(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Erro ao enviar confirmação</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ocorreu um erro ao enviar a sua solicitação. Tente novamente mais tarde.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className='cursor-pointer' onClick={() => setOpenDialog(null)}>Fechar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
