const baseProducts = [
    {
        id: 1,
        title: "Gift Card Netflix",
        price: 8500,
        rating: "5.0",
        reviews: "1.2k",
        category: "Streaming",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/netflix.webp',
        imageSecondary: "/assets/netflix.png",
        about: 'A Netflix é uma plataforma de streaming com milhares de filmes, séries, documentários e produções originais. Oferece conteúdos para todos os gostos, com acesso fácil em diversos dispositivos, sem anúncios e com opção de download. A OMNIBOX oferece as melhores formas de pagar à Netflix estando em Angola.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "mobile",
                title: "Mobile - Um dispositivo móvel | 480p (SD)",
                price: 8500,
            },
            {
                id: "base",
                title: "Base - Um dispositivo | 720p (HD)",
                price: 10000,
            },
            {
                id: "premium",
                title: "Standard - Dois dispositivos | 1080p (Full HD)",
                price: 15000,
            },
            {
                id: "standard",
                title: "Premium - Quatro dispositivos | 4K + HDR",
                price: 18000,
            },
        ]
    },
    {
        id: 2,
        title: "Windows 11 Pro",
        price: 15200,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/windows11.webp',
        imageSecondary: "/assets/windows11.png",
        about: 'O Windows 11 é a mais recente versão do sistema operativo da Microsoft, oferecendo uma interface moderna e recursos avançados para melhorar a produtividade e a criatividade. A OMNIBOX oferece as melhores formas de pagar pelo Windows 11 estando em Angola.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "retail",
                title: "Versão Retail",
                price: 15200,
            },
            {
                id: "oem",
                title: "Versão OEM",
                price: 9800,
            },
        ]
    },
    {
        id: 3,
        title: "Microsoft Office 365 Family Home 6 Usuários 6 Meses",
        price: 106550,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/office365.webp',
        imageSecondary: "/assets/office365.jpg",
        about: 'Uma plataforma de produtividade baseada em nuvem que combina os aplicativos do Office (como Word, Excel, PowerPoint) com serviços como OneDrive e Teams, oferecendo acesso a aplicativos, armazenamento em nuvem e segurança avançada através de uma assinatura.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: []
    },
    {
        id: 4,
        title: "Microsoft Office 2021",
        price: 23950,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/Office2021Pro.png',
        imageSecondary: "/assets/Office2021Pro.jpg",
        about: 'Uma plataforma de produtividade baseada em nuvem que combina os aplicativos do Office (como Word, Excel, PowerPoint) com serviços como OneDrive e Teams, oferecendo acesso a aplicativos, armazenamento em nuvem e segurança avançada através de uma assinatura.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "proplus",
                title: "Versão Profissional Plus",
                price: 23950,
            },
            {
                id: "homeandbusiness",
                title: "Versão Home and Business Para MAC",
                price: 56550,
            },
            {
                id: "proplus5",
                title: "Profissional Plus - 5 Computadores",
                price: 71750,
            },
        ]
    },
    {
        id: 5,
        title: "Microsoft Office 2019",
        price: 28300,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/office2019.png',
        imageSecondary: "/assets/Office2019.jpg",
        about: 'Uma plataforma de produtividade baseada em nuvem que combina os aplicativos do Office (como Word, Excel, PowerPoint) com serviços como OneDrive e Teams, oferecendo acesso a aplicativos, armazenamento em nuvem e segurança avançada através de uma assinatura.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "proplusretail",
                title: "Versão Profissional Plus Retail",
                price: 28300,
            },
            {
                id: "homeandbusiness",
                title: "Versão Home and Business Para MAC",
                price: 56550,
            },
        ]
    },
    {
        id: 6,
        title: "Microsoft Windows Server",
        price: 7600,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/winserver.webp',
        imageSecondary: "/assets/winserver.png",
        about: 'O Windows Server é uma família de sistemas operacionais da Microsoft, projetada para gerenciar servidores em ambientes locais, híbridos e na nuvem, permitindo a execução de aplicativos, serviços e cargas de trabalho empresariais.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "2012r2dc",
                title: "2012 R2 Datacenter",
                price: 7600,
            },
            {
                id: "2012r2std",
                title: "2012 R2 Standard",
                price: 8700,
            },
            {
                id: "2016r2dc",
                title: "2016 R2 Datacenter",
                price: 4350,
            },
            {
                id: "2016r2std",
                title: "2016 R2 Standard",
                price: 6300,
            },
            {
                id: "2019r2dc",
                title: "2019 R2 Datacenter",
                price: 4350,
            },
            {
                id: "2019r2std",
                title: "2019 R2 Standard",
                price: 4950,
            },
            {
                id: "2022r2dc",
                title: "2022 R2 Datacenter",
                price: 9800,
            },
            {
                id: "2022r2std",
                title: "2022 R2 Standard",
                price: 8700,
            },
            {
                id: "2025r2dc",
                title: "2025 R2 Datacenter",
                price: 32600,
            },
            {
                id: "2025r2std",
                title: "2025 R2 Standard",
                price: 28250,
            },
        ]
    },
    {
        id: 7,
        title: "Kaspersky Anti-Virus",
        price: 28250,
        rating: "5.0",
        reviews: "1.2k",
        category: "Software",
        catalogue: 'https://wa.me/p/31271776782413491/244937695529',
        image: '/assets/kaspersky-av.png',
        imageSecondary: "/assets/kaspersky.png",
        about: 'Uma plataforma de produtividade baseada em nuvem que combina os aplicativos do Office (como Word, Excel, PowerPoint) com serviços como OneDrive e Teams, oferecendo acesso a aplicativos, armazenamento em nuvem e segurança avançada através de uma assinatura.',
        description: "Ativação manual. Nossa equipe realizará a ativação para você após a confirmação do pagamento...",
        plans: [
            {
                id: "totalsec",
                title: "Versão Total Security (1 Ano, 1 Dispositivo)",
                price: 28250,
            },
            {
                id: "inter",
                title: "Versão Internet Security (1 Ano, 1 Dispositivo)",
                price: 23900,
            },
        ]
    },
];

// Duplicamos os produtos para simular uma lista maior para a paginação
export const products = [
    ...baseProducts,
];

