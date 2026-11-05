// --- DADOS DA LINHA DO TEMPO ---
const timelineData = {
    1943: {
        title: "Ingresso na NACA (West Area Computers)",
        desc: "Contratada durante a Segunda Guerra Mundial para o Laboratório Langley. Trabalhou no setor segregado de computadoras humanas afro-americanas realizando cálculos fundamentais de aeronavegação."
    },
    1949: {
        title: "Primeira Supervisora Afro-Americana",
        desc: "Assumiu a liderança oficial do grupo West Area Computers. Tornou-se a primeira mulher negra a ocupar um cargo de chefia na NACA, promovendo ativamente igualdade e avanço profissional."
    },
    1958: {
        title: "Transição para a NASA & Fim da Segregação",
        desc: "Com a fundação da NASA, as instalações segregadas foram extintas. Dorothy e suas lideradas foram integradas às novas divisões de pesquisa espacial sem divisão racial."
    },
    1961: {
        title: "Liderança na Era Digital e FORTRAN",
        desc: "Aprendeu FORTRAN de forma autodidata e treinou sua equipe para operar os supercomputadores IBM 7090, viabilizando o sucesso das trajetórias orbitais do Projeto Mercury."
    },
    2019: {
        title: "Medalha de Ouro do Congresso",
        desc: "Homenageada postumamente com a Medalha de Ouro do Congresso dos EUA, a maior honraria civil americana, por suas contribuições históricas à ciência aeroespacial."
    }
};

function selectTimeline(year) {
    document.querySelectorAll('.tl-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const card = document.getElementById('timeline-card');
    card.classList.remove('animate-fade-in');
    
    void card.offsetWidth; // Força recarregamento da animação

    document.getElementById('tl-year').innerText = year;
    document.getElementById('tl-bg-year').innerText = year;
    document.getElementById('tl-title').innerText = timelineData[year].title;
    document.getElementById('tl-desc').innerText = timelineData[year].desc;

    card.classList.add('animate-fade-in');
}

// --- SIMULADOR DE CÓDIGO FORTRAN ---
function runFortran() {
    const mass = parseFloat(document.getElementById('massInput').value);
    const thrust = parseFloat(document.getElementById('thrustInput').value);
    const consoleElem = document.getElementById('terminalConsole');

    if (isNaN(mass) || isNaN(thrust) || mass <= 0) {
        consoleElem.innerText = "> ERRO DE COMPILAÇÃO: PARÂMETROS INVÁLIDOS DETECTADOS NO CARTÃO.";
        return;
    }

    const g = 9.81;
    const forceN = thrust * 1000;
    const accel = (forceN / mass) - g;

    consoleElem.innerText = "> PROCESSANDO CARTÃO PERFURADO NO IBM 7090...\n";
    
    setTimeout(() => {
        if (accel <= 0) {
            consoleElem.innerText += `> EMPUXO INSUFICIENTE PARA VENCER A GRAVIDADE (g = 9.81 m/s²).\n> ACELERAÇÃO LÍQUIDA: ${accel.toFixed(2)} m/s²\n> STATUS: DECOLAGEM FALHOU.`;
        } else {
            consoleElem.innerText += `> CÁLCULO DE TRAJETÓRIA CONCLUÍDO COM SUCESSO!\n> ACELERAÇÃO INICIAL: ${accel.toFixed(2)} m/s²\n> STATUS: ORBITA ESTÁVEL ATINGIDA! FOGUETE SCOUT EM ROTA.`;
        }
    }, 400);
}

// --- QUIZ INTERATIVO ---
const quizQuestions = [
    {
        question: "Qual linguagem de programação Dorothy ensinou à sua equipe na NASA?",
        options: ["COBOL", "FORTRAN", "Python", "Assembly"],
        correct: 1
    },
    {
        question: "Em que ano ela se tornou a primeira supervisora negra da NACA?",
        options: ["1943", "1958", "1949", "1969"],
        correct: 2
    },
    {
        question: "Qual era a profissão de Dorothy antes de ingressar no laboratório Langley?",
        options: ["Engenheira Civil", "Professora de Matemática", "Contadora", "Física Teórica"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('quiz-question').innerText = q.question;
    document.getElementById('quiz-progress').innerText = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    document.getElementById('next-quiz-btn').classList.add('hidden');

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-nasa-blue transition-all font-semibold text-sm text-gray-200";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIdx, btnElem) {
    const buttons = document.getElementById('quiz-options').querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (selectedIdx === quizQuestions[currentQuestion].correct) {
        btnElem.className = "w-full text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold text-sm";
        score++;
    } else {
        btnElem.className = "w-full text-left p-4 rounded-xl border-2 border-red-500 bg-red-500/20 text-red-300 font-bold text-sm";
        buttons[quizQuestions[currentQuestion].correct].className = "w-full text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold text-sm";
    }

    document.getElementById('next-quiz-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
        document.getElementById('quiz-score').innerText = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuestion();
}

// --- MODAL DE AUTENTICAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();

    const authModal = document.getElementById('authModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const apiEndpoint = document.getElementById('apiEndpoint');
    const authMessage = document.getElementById('authMessage');

    openLoginBtn?.addEventListener('click', () => authModal.classList.add('modal-active'));
    closeModalBtn?.addEventListener('click', () => authModal.classList.remove('modal-active'));

    tabLogin?.addEventListener('click', () => {
        tabLogin.className = "w-1/2 py-4 font-extrabold text-center text-nasa-orange border-b-2 border-nasa-orange transition-all";
        tabRegister.className = "w-1/2 py-4 font-extrabold text-center text-gray-400 hover:text-white transition-all";
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        apiEndpoint.innerText = "POST /api/auth/login";
        authMessage.classList.add('hidden');
    });

    tabRegister?.addEventListener('click', () => {
        tabRegister.className = "w-1/2 py-4 font-extrabold text-center text-nasa-orange border-b-2 border-nasa-orange transition-all";
        tabLogin.className = "w-1/2 py-4 font-extrabold text-center text-gray-400 hover:text-white transition-all";
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        apiEndpoint.innerText = "POST /api/auth/register";
        authMessage.classList.add('hidden');
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        authMessage.className = "mt-4 p-3 text-xs rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 block";
        authMessage.innerText = `Login realizado para: ${email} (Spring Boot API)`;
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        authMessage.className = "mt-4 p-3 text-xs rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 block";
        authMessage.innerText = `Usuário ${name} cadastrado com sucesso!`;
    });
});