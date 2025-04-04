const baseUrl = "https://charada-back-end.vercel.app";
const aleatorio = "/charadas";
let respostaCorreta = "";
let charadaAtualId = "";

// Elementos do DOM
const charadaPerguntaEl = document.getElementById("charada-pergunta");
const respostaInputEl = document.getElementById("resposta-input");
const respostaContainerEl = document.getElementById("resposta-container");

// Carrega uma nova charada
async function getCharada() {
    try {
        // Resetar estado
        respostaContainerEl.innerHTML = '<p class="text-gray-400">Aguardando sua resposta...</p>';
        respostaContainerEl.className = "";
        respostaInputEl.value = "";
        charadaPerguntaEl.textContent = "Carregando...";
        charadaPerguntaEl.className = "";
        
        const response = await fetch(baseUrl + aleatorio);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        
        const charadaJson = await response.json();
        
        if (!charadaJson.pergunta || !charadaJson.resposta) {
            throw new Error("Dados da charada inválidos");
        }
        
        charadaPerguntaEl.textContent = charadaJson.pergunta;
        respostaCorreta = charadaJson.resposta;
        charadaAtualId = charadaJson.id || "";
        
        // Adiciona animação
        charadaPerguntaEl.classList.add("fade-in");
        setTimeout(() => charadaPerguntaEl.classList.remove("fade-in"), 500);
        
    } catch (error) {
        console.error("Erro ao carregar charada:", error);
        charadaPerguntaEl.textContent = "Erro ao carregar a charada. Tente novamente.";
        respostaContainerEl.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
}

// Normaliza texto para comparação
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "");
}

// Verifica a resposta do usuário
function verResposta() {
    try {
        const respostaUsuario = respostaInputEl.value.trim();
        
        if (!respostaUsuario) {
            respostaContainerEl.innerHTML = '<p class="text-yellow-600">Por favor, digite uma resposta.</p>';
            respostaInputEl.focus();
            return;
        }
        
        const respostaNormalizada = normalizarTexto(respostaCorreta);
        const usuarioNormalizado = normalizarTexto(respostaUsuario);
        
        // Comparação mais robusta
        const palavrasCorretas = respostaNormalizada.split(" ").filter(p => p.length > 2);
        const palavrasUsuario = usuarioNormalizado.split(" ").filter(p => p.length > 2);
        
        const palavrasEmComum = palavrasUsuario.filter(palavra => 
            palavrasCorretas.includes(palavra)
        ).length;
        
        const taxaAcerto = palavrasCorretas.length > 0 
            ? palavrasEmComum / palavrasCorretas.length 
            : 0;
        
        // Verifica se a resposta do usuário contém a resposta correta ou vice-versa
        const contemResposta = usuarioNormalizado.includes(respostaNormalizada) || 
                              respostaNormalizada.includes(usuarioNormalizado);
        
        if (taxaAcerto >= 0.5 || contemResposta) {
            respostaContainerEl.innerHTML = '<p class="text-green-600 font-bold">Correto! 🎉</p>';
            respostaContainerEl.className = "correct show";
        } else {
            respostaContainerEl.innerHTML = `
                <p class="text-red-500">
                    Quase! A resposta correta é: <span class="font-bold">${respostaCorreta}</span>
                </p>`;
            respostaContainerEl.className = "incorrect show shake";
            setTimeout(() => respostaContainerEl.classList.remove("shake"), 500);
        }
        
    } catch (error) {
        console.error("Erro ao verificar resposta:", error);
        respostaContainerEl.innerHTML = '<p class="text-red-500">Erro ao verificar resposta</p>';
    }
}

// Gera uma nova charada
function novaCharada() {
    getCharada();
}

// Event listeners
respostaInputEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        verResposta();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    getCharada();
    
    // Adiciona foco automático no input
    setTimeout(() => {
        respostaInputEl.focus();
    }, 500);
});