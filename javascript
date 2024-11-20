// A estrutura básica da história
const story = {
    "inicio": {
        text: "Você está em uma floresta escura. Ouve um som vindo de um arbusto à sua esquerda. O que você faz?",
        options: [
            {
                text: "Investigar o arbusto",
                nextStep: "investigar_arbusto"
            },
            {
                text: "Seguir em frente pela trilha",
                nextStep: "seguir_trilha"
            }
        ]
    },
    "investigar_arbusto": {
        text: "Você se aproxima do arbusto e encontra um mapa velho. Parece que há algo mais escondido aqui.",
        options: [
            {
                text: "Tentar puxar o que está escondido",
                nextStep: "mapa_encontrado"
            },
            {
                text: "Voltar e seguir pela trilha",
                nextStep: "seguir_trilha"
            }
        ]
    },
    "seguir_trilha": {
        text: "Você segue pela trilha e encontra uma bifurcação. Para onde você vai?",
        options: [
            {
                text: "Vire à esquerda",
                nextStep: "esquerda"
            },
            {
                text: "Vire à direita",
                nextStep: "direita"
            }
        ]
    },
    "mapa_encontrado": {
        text: "Com o mapa nas mãos, você encontra uma entrada secreta para uma caverna.",
        options: [
            {
                text: "Entrar na caverna",
                nextStep: "caverna"
            },
            {
                text: "Sair da floresta",
                nextStep: "fim"
            }
        ]
    },
    "esquerda": {
        text: "Você segue à esquerda e encontra um dragão enorme. O que você faz?",
        options: [
            {
                text: "Lutar com o dragão",
                nextStep: "dragao_lutado"
            },
            {
                text: "Fugir",
                nextStep: "fim"
            }
        ]
    },
    "direita": {
        text: "Você vira à direita e encontra um tesouro. Você o pega?",
        options: [
            {
                text: "Pegar o tesouro",
                nextStep: "fim"
            },
            {
                text: "Deixar o tesouro",
                nextStep: "fim"
            }
        ]
    },
    "caverna": {
        text: "Dentro da caverna, você encontra um tesouro antigo guardado por uma criatura mítica. Você a enfrenta?",
        options: [
            {
                text: "Enfrentar a criatura",
                nextStep: "criatura_enfrentada"
            },
            {
                text: "Fugir da caverna",
                nextStep: "fim"
            }
        ]
    },
    "dragao_lutado": {
        text: "Você derrota o dragão e fica com o tesouro. Você agora pode escolher o que fazer.",
        options: [
            {
                text: "Continuar explorando a floresta",
                nextStep: "seguir_trilha"
            },
            {
                text: "Voltar para a aldeia",
                nextStep: "fim"
            }
        ]
    },
    "criatura_enfrentada": {
        text: "Você derrota a criatura e fica com o tesouro. A aventura termina aqui.",
        options: [
            {
                text: "Fim da Aventura",
                nextStep: "fim"
            }
        ]
    },
    "fim": {
        text: "Você chegou ao fim da sua aventura. Obrigado por jogar!",
        options: []
    }
};

// Função para carregar o estado inicial ou o último passo salvo
function loadStory() {
    const params = new URLSearchParams(window.location.search);
    const lastStep = params.get("step") || localStorage.getItem("lastStep") || "inicio";

    renderStory(lastStep);
}

// Função para renderizar o texto e as opções
function renderStory(step) {
    const storyContent = document.getElementById("story-content");
    const navigationLinks = document.getElementById("navigation-links");
    const currentStory = story[step];

    // Limpar conteúdo anterior
    storyContent.innerHTML = currentStory.text;

    // Adicionar as opções de navegação
    navigationLinks.innerHTML = "";
    currentStory.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", () => {
            localStorage.setItem("lastStep", option.nextStep);
            window.location.search = `?step=${option.nextStep}`;
        });
        navigationLinks.appendChild(button);
    });
}

// Executar a função quando a página carregar
window.onload = loadStory;
