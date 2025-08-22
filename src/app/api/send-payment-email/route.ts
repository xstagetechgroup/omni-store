// app/api/send-payment-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { productData, userData, bankData } = await req.json();

        // Configuração do transporter (exemplo com Gmail — substitua pelas suas credenciais SMTP)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === "465", // true se 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Monta o corpo do e-mail
        const mailOptions = {
            from: `"Loja Virtual" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "Novo Pedido - Pagamento Feito",
            html: `
                <h2>Pagamento Realizado</h2>
                <h3>📦 Produto</h3>
                <p><b>Serviço:</b> ${productData.title}</p>
                <p><b>Plano:</b> ${productData.plan}</p>
                <p><b>Total a Pagar:</b> ${productData.price * productData.qty} AKZ</p>
                <p><b>Quantidade Solicitada:</b> ${productData.qty}</p>

                <h3>👤 Usuário</h3>
                <p><b>Nome:</b> ${userData.name}</p>
                <p><b>Email:</b> ${userData.email}</p>
                <p><b>Telemovel:</b> ${userData.phone}</p>
                <p><b>Endereço:</b> ${userData.address}</p>
                <p><b>UID Firebase:</b> ${userData.uid}</p>

                <h3>🏦 Dados Bancários</h3>
                <p><b>IBAN/EXPRESS:</b> ${bankData.iban}</p>
                <p><b>Descritivo:</b> ${bankData.referencia}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
