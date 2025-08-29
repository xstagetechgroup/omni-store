'use client'
import Container from "@/components/shared/container";
import { products } from "@/utils/products";
import { Check, CheckCheck, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlanSelector from "@/components/planSelector";
import React, { useEffect, useState } from "react";
import { TPlan } from "@/types/product";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import RecomendedProducts from "@/components/recomendations";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "@/lib/firebaseConfig";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { User } from "@/types/user";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = React.use(params); // Extrai o ID do produto da promise
    const productId = parseInt(id);
    const product = products.find((p) => p.id === productId); // Busca o produto pelo ID
    const [selectedPlan, setSelectedPlan] = useState<TPlan | undefined>(product?.plans[0]); // Define o plano selecionado inicialmente
    const [quantity, setQuantity] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    // 🔑 verificar login no Firebase
    useEffect(() => {
        const auth = getAuth(app);
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }

        return () => unsub();
    }, []);

    if (!product) {
        return notFound(); // Redireciona para página 404 do Next se não encontrar
    }

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handlePlanSelect = (plan: TPlan) => {
        setSelectedPlan(plan);
    };

    const goToExpressPayment = () => {
        if (!product || !selectedPlan) return;

        if (!isLoggedIn) {
            setOpenDialog(true); // se não estiver logado, mostra alerta
            return;
        }
        router.push(`/pagamento/express?productTitle=${product.title}&plan=${encodeURIComponent(selectedPlan.title)}&price=${encodeURIComponent(selectedPlan.price)}&qty=${quantity}`);
    };

    const goToBaiPayment = () => {
        if (!product || !selectedPlan) return;

        if (!isLoggedIn) {
            setOpenDialog(true); // se não estiver logado, mostra alerta
            return;
        }
        router.push(`/pagamento/baidireto?productTitle=${product.title}&plan=${encodeURIComponent(selectedPlan.title)}&price=${encodeURIComponent(selectedPlan.price)}&qty=${quantity}`);
    };

    const handleLoginRedirect = () => {
        setOpenDialog(false);
        router.push("/login");
    };

    // Defina o número e a mensagem
    const whatsappNumber = "244937695529";
    const message = `Olá *OmniBox*, eu ${user?.name} gostaria de solicitar o serviço: 
    *Serviço*: ${product.title}
    *Plano:* ${selectedPlan?.title}
    *Preço Unitário:* ${selectedPlan?.price}
    *Quantidade:* ${quantity}
    *Catalogo:* ${product.catalogue}`;

    // Função para abrir o WhatsApp
    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    console.log(selectedPlan);

    return (
        <div>
            <div className="w-full h-[300px] bg-gray-700 text-white flex flex-col justify-end pb-10 items-center">
                <h1 className="text-4xl font-medium">Detalhes do Produto</h1>
                <div className="flex items-center justify-center gap-2 text-lg">
                    <Link href={'#'} className="hover:text-[#732DFF]">Home</Link>
                    <p>/</p>
                    <p>Detalhes</p>
                </div>
            </div>

            <Container>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-300 rounded-xl p-5 mt-10">
                    {/* Coluna da imagem */}
                    <div className="flex flex-col gap-5 col-span-1">
                        <Image
                            width={900}
                            height={900}
                            alt="Product"
                            src={product.imageSecondary}
                            className="object-cover w-full aspect-square object-center rounded-lg"
                        />
                        <div className="w-full flex flex-col gap-2 p-5 bg-gray-100 rounded-lg">
                            <span className="flex items-center gap-2">
                                <CheckCheck className="size-5 text-blue-600" />
                                <p className="text-lg font-medium">Método de Ativação</p>
                            </span>
                            <p className="text-base">{product.description}</p>
                        </div>
                    </div>

                    {/* Coluna de informações */}
                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-2xl font-medium">{product.title}</p>
                        <p className="text-xs font-medium text-gray-500">{product.about}</p>

                        <div className="w-full flex flex-col p-5 bg-gray-50 rounded-lg">
                            <p className="text-3xl font-bold">{product.plans && product.plans.length > 0 ? Number(selectedPlan?.price).toLocaleString("pt-BR") : Number(product.price).toLocaleString("pt-BR")} AKZ</p>
                            <span className="flex text-green-500 text-xs items-center gap-1">
                                <Check className="size-5 pt-1" />
                                <p>Em estoque • Envio imediato</p>
                            </span>
                        </div>

                        {product.plans && product.plans.length > 0 && (
                            <PlanSelector plans={product.plans} onSelect={handlePlanSelect} />
                        )}
                        <div className="w-full bg-gray-50 rounded-lg p-4 space-y-4">
                            <p className="font-semibold">Finalizar compra</p>

                            {/* Quantidade */}
                            <div className="flex items-center gap-0">
                                <button
                                    onClick={decrease}
                                    className="border rounded-l px-2 py-2 hover:bg-gray-100 bg-gray-200"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 py-1 border-y">{quantity}</span>
                                <button
                                    onClick={increase}
                                    className="border rounded-r px-2 py-2 hover:bg-gray-100 bg-gray-200"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* Botão principal */}
                            <button
                                onClick={() => setShowOptions((prev) => !prev)}
                                className="w-full bg-[#732DFF] hover:bg-violet-800 cursor-pointer text-white font-semibold rounded-md py-3 flex justify-center items-center"
                            >
                                Comprar Agora
                                <span
                                    className={`ml-2 transform transition ${showOptions ? "rotate-180 mt-2" : ""
                                        }`}
                                >
                                    <ChevronUp className="size-5 pt-1" />
                                </span>
                            </button>

                            {/* Opções adicionais */}
                            {showOptions && (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
                                    >
                                        <FaWhatsapp className="size-5" />
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={goToExpressPayment}
                                        className="flex-1 cursor-pointer bg-[#EC8C0F] hover:bg-[#E66907] text-white py-2 rounded-md flex items-center justify-center gap-2"
                                    >
                                        <Image
                                            src={"/assets/express-logo.png"}
                                            alt="Express Logo"
                                            width={100}
                                            height={100}
                                            className="w-5 h-5"
                                        />
                                        Multicaixa Express
                                    </button>
                                    <button
                                        onClick={goToBaiPayment}
                                        className="flex-1 cursor-pointer bg-[#00A1E0] hover:bg-[#001A48] text-white py-2 rounded-md flex items-center justify-center gap-2"
                                    >
                                        BAI DIRETO
                                    </button>
                                </div>
                            )}



                            {/* Adicionar ao carrinho */}
                            <button className="w-full cursor-pointer border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
                                <ShoppingCart size={18} />
                                Adicionar ao Carrinho
                            </button>
                        </div>
                        {/* AlertDialog do Shadcn */}
                        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Login necessário</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Para continuar com o pagamento via Multicaixa Express, você precisa estar logado na sua conta.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLoginRedirect}>
                                        Fazer Login
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <RecomendedProducts />
            </Container>

        </div>
    );
}
