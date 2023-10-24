// pages/api/crowdfunding-features.js

export default function handler(req, res) {
    // Inserir lógica de banco de dados aqui pra buscar dados reais,
    // mas, por enquanto, vamos usar dados estáticos para simular a API.
  
    const features = [
      {
        title: "Wallet Integration",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        collectedAmount: "20"
      },
      {
        title: "Marketplace",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        collectedAmount: "45"
      },
      {
        title: "Comments",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        collectedAmount: "30"
      },
    // {
    //   title: "Alexandria",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    //   collectedAmount: "75",
    //   targetAmount: "100"
    // },
    // {
    //   title: "ChatBSV",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    //   collectedAmount: "90",
    //   targetAmount: "100"
    // }
    ];
  
    res.status(200).json(features);
  }
  