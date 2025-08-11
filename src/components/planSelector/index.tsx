"use client";
import { TPlan } from "@/types/product";
import { useState } from "react";



interface PlanSelectorProps {
    plans: TPlan[];
    onSelect?: (plan: TPlan) => void; // callback para enviar dados ao pai
}

export default function PlanSelector({ plans, onSelect }: PlanSelectorProps) {
    const [selectedId, setSelectedId] = useState(plans[0]?.id || "");
    const [expanded, setExpanded] = useState(false);

    const selectedPlan = plans.find((p) => p.id === selectedId);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        const plan = plans.find((p) => p.id === id);
        if (plan && onSelect) {
            onSelect(plan);
        }
    };

    return (
        <div className="w-full bg-gray-50 rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Plano selecionado</h2>
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-[#732DFF] hover:font-medium duration-100 text-sm cursor-pointer"
                >
                    {expanded ? "Esconder planos" : "Mostrar planos"}
                </button>
            </div>

            {expanded ? (
                <div className="space-y-2">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-100 transition ${selectedId === plan.id ? "bg-blue-50 border-[#732DFF]" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="plan"
                                value={plan.id}
                                checked={selectedId === plan.id}
                                onChange={() => handleSelect(plan.id)}
                                className="mr-3"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{plan.title}</p>
                            </div>
                            <span className="font-semibold">{plan.price}</span>
                        </label>
                    ))}
                </div>
            ) : (
                selectedPlan && (
                    <div className="flex items-center justify-between p-3 border rounded bg-blue-50 border-[#732DFF]">
                        <div>
                            <p className="font-medium">{selectedPlan.title}</p>
                        </div>
                        <span className="font-semibold">{selectedPlan.price}</span>
                    </div>
                )
            )}
        </div>
    );
}
