const baseProducts = [
    {
        id: 1,
        title: "Netflix Gift Card",
        price: "",
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
                price: "8 500 Kz",
            },
            {
                id: "base",
                title: "Base - Um dispositivo | 720p (HD)",
                price: "10 000 Kz",
            },
            {
                id: "premium",
                title: "Standard - Dois dispositivos | 1080p (Full HD)",
                price: "15 000 Kz",
            },
            {
                id: "standard",
                title: "Premium - Quatro dispositivos | 4K + HDR",
                price: "18 000 Kz",
            },
        ]
    },
    {
        id: 2,
        title: "Spotify Gift Card",
        price: "$12.00",
        rating: "5.0",
        reviews: "1.2k",
        category: "Musica",
        image: '/assets/spotify.webp',
        imageSecondary: "/assets/spotify.webp",
        about: '',
        description: "Description",
        plans: [],
    },
    {
        id: 3,
        title: "Playstation Gift Card",
        price: "$29.90",
        rating: "4.4",
        reviews: "1k",
        category: "Jogos",
        image: '/assets/PlayStation.png',
        imageSecondary: "/assets/PlayStation.png",
        about: '',
        description: "Description",
        plans: [],
    },
    {
        id: 4,
        title: "Nintendo Gift Card",
        price: "$50.00",
        rating: "4.8",
        reviews: "120",
        category: "Jogos",
        image: '/assets/nintendo.webp',
        imageSecondary: "/assets/nintendo.webp",
        about: '',
        description: "Description",
        plans: [],
    },
    {
        id: 5,
        title: "Steam Gift Card",
        price: "$9.90",
        rating: "5.0",
        reviews: "1.2k",
        category: "Jogos",
        image: '/assets/steam.webp',
        imageSecondary: "/assets/steam.webp",
        about: '',
        description: "Description",
        plans: [],
    },
];


// Duplicamos os produtos para simular uma lista maior para a paginação
export const products = [
    ...baseProducts,
];

