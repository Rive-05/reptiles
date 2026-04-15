// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'database' && !window.databaseLoaded) {
        window.databaseLoaded = true;
        setTimeout(() => loadSQLData('all'), 100);
    }
}

// ============================================
// INFORMACIÓN DE TIPOS DE REPTILES
// ============================================

function showInfo(type) {
    const infoPanel = document.getElementById('info');
    let content = '';
    switch(type) {
        case 'snakes':
            content = `
                <div class="info-card">
                    <div class="info-header">
                        <span class="info-icon">🐍</span>
                        <h2>Serpientes</h2>
                        <span class="info-icon">🐍</span>
                    </div>
                    <div class="info-section">
                        <h3>📌 Características generales</h3>
                        <ul>
                            <li><strong>Cuerpo alargado sin patas</strong> - Se desplazan deslizándose</li>
                            <li><strong>Escamas imbricadas</strong> - Les protegen y ayudan en el movimiento</li>
                            <li><strong>Lengua bífida</strong> - Recogen partículas del aire para oler</li>
                            <li><strong>Mudan la piel</strong> - Lo hacen varias veces al año (ecdisis)</li>
                            <li><strong>Sentido del calor</strong> - Algunas detectan calor con fosetas loreales</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h3>🍽️ Alimentación</h3>
                        <p><strong>Tipo:</strong> Carnívoras estrictas</p>
                        <p><strong>Presas:</strong> Roedores, aves, huevos, insectos, anfibios, otros reptiles</p>
                        <p><strong>Método:</strong> Algunas usan veneno, otras constricción (aprietan hasta asfixiar)</p>
                    </div>
                    <div class="info-section">
                        <h3>🌍 Distribución mundial</h3>
                        <p>Se encuentran en <strong>TODOS los continentes excepto la Antártida</strong>.</p>
                    </div>
                    <div class="info-section">
                        <h3>📝 Ejemplos famosos</h3>
                        <div class="examples-grid">
                            <div class="example-card">🐍 <strong>Anaconda</strong><br>La serpiente más pesada</div>
                            <div class="example-card">🐍 <strong>Pitón reticulada</strong><br>La más larga (hasta 7m)</div>
                            <div class="example-card">🐍 <strong>Mamba negra</strong><br>La más rápida (20km/h)</div>
                            <div class="example-card">🐍 <strong>Cobra real</strong><br>La más venenosa</div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'lizards':
            content = `
                <div class="info-card">
                    <div class="info-header">
                        <span class="info-icon">🦎</span>
                        <h2>Lagartos</h2>
                        <span class="info-icon">🦎</span>
                    </div>
                    <div class="info-section">
                        <h3>📌 Características generales</h3>
                        <ul>
                            <li><strong>Cuatro patas</strong> (aunque algunas especies han perdido las patas)</li>
                            <li><strong>Párpados móviles</strong> - Pueden parpadear</li>
                            <li><strong>Regeneración de cola</strong> - Pueden soltarla y volver a crecerla</li>
                            <li><strong>Termorregulación</strong> - Toman el sol para calentarse</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h3>🍽️ Alimentación</h3>
                        <p><strong>Tipos:</strong> Insectívoros, herbívoros y omnívoros</p>
                    </div>
                    <div class="info-section">
                        <h3>📝 Ejemplos famosos</h3>
                        <div class="examples-grid">
                            <div class="example-card">🦎 <strong>Dragón de Komodo</strong><br>El más grande y peligroso</div>
                            <div class="example-card">🦎 <strong>Iguana verde</strong><br>Popular como mascota</div>
                            <div class="example-card">🦎 <strong>Camaleón</strong><br>Cambia de color</div>
                            <div class="example-card">🦎 <strong>Gecko</strong><br>Puede caminar por paredes</div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'turtles':
            content = `
                <div class="info-card">
                    <div class="info-header">
                        <span class="info-icon">🐢</span>
                        <h2>Tortugas</h2>
                        <span class="info-icon">🐢</span>
                    </div>
                    <div class="info-section">
                        <h3>📌 Características generales</h3>
                        <ul>
                            <li><strong>Caparazón óseo</strong> - Formado por espaldar y plastrón</li>
                            <li><strong>Pico córneo</strong> - Sin dientes, tienen un pico afilado</li>
                            <li><strong>Lentas pero longevas</strong> - Pueden vivir más de 100 años</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h3>🍽️ Alimentación</h3>
                        <p><strong>Tortugas marinas:</strong> Carnívoras</p>
                        <p><strong>Tortugas terrestres:</strong> Herbívoras</p>
                        <p><strong>Tortugas de agua dulce:</strong> Omnívoras</p>
                    </div>
                    <div class="info-section">
                        <h3>📝 Ejemplos famosos</h3>
                        <div class="examples-grid">
                            <div class="example-card">🐢 <strong>Tortuga Laúd</strong><br>La más grande (900kg)</div>
                            <div class="example-card">🐢 <strong>Tortuga Galápagos</strong><br>La más longeva (200+ años)</div>
                            <div class="example-card">🐢 <strong>Tortuga de Orejas Rojas</strong><br>Mascota común</div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'crocodiles':
            content = `
                <div class="info-card">
                    <div class="info-header">
                        <span class="info-icon">🐊</span>
                        <h2>Cocodrilos</h2>
                        <span class="info-icon">🐊</span>
                    </div>
                    <div class="info-section">
                        <h3>📌 Características generales</h3>
                        <ul>
                            <li><strong>Grandes reptiles semiacuáticos</strong> - Viven en agua y tierra</li>
                            <li><strong>Hocico alargado</strong> - Con dientes visibles</li>
                            <li><strong>Excelentes nadadores</strong> - Usan la cola como timón</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h3>🍽️ Alimentación</h3>
                        <p><strong>Tipo:</strong> Carnívoros oportunistas</p>
                        <p><strong>Presas:</strong> Peces, aves, mamíferos, otros reptiles</p>
                    </div>
                    <div class="info-section">
                        <h3>📝 Ejemplos famosos</h3>
                        <div class="examples-grid">
                            <div class="example-card">🐊 <strong>Cocodrilo de Agua Salada</strong><br>El más grande</div>
                            <div class="example-card">🐊 <strong>Cocodrilo del Nilo</strong><br>El más peligroso</div>
                            <div class="example-card">🐊 <strong>Caimán</strong><br>El más común en América</div>
                        </div>
                    </div>
                    <div class="info-section warning">
                        <h3>⚠️ Advertencia</h3>
                        <p>Los cocodrilos son <strong>depredadores peligrosos</strong>.</p>
                    </div>
                </div>
            `;
            break;
    }
    infoPanel.innerHTML = content;
}

// ============================================
// MAPA INTERACTIVO
// ============================================

function showReptiles(continent) {
    const list = document.getElementById('reptiles-list');
    let content = '';
    switch(continent) {
        case 'africa':
            content = `
                <h3>🦁 Reptiles de África 🦁</h3>
                <ul>
                    <li>🐊 <strong>Cocodrilo del Nilo</strong> - El más grande de África</li>
                    <li>🐍 <strong>Mamba negra</strong> - Una de las serpientes más venenosas</li>
                    <li>🦎 <strong>Tortuga leopardo</strong> - Hermosa tortuga terrestre</li>
                    <li>🐍 <strong>Pitón de Seba</strong> - La serpiente más larga de África</li>
                    <li>🦎 <strong>Gecko africano</strong> - Pequeño y colorido</li>
                    <li>🦎 <strong>Víbora bufadora</strong> - Serpiente venenosa común</li>
                </ul>
            `;
            break;
        case 'america':
            content = `
                <h3>🦅 Reptiles de América 🦅</h3>
                <ul>
                    <li>🐍 <strong>Anaconda verde</strong> - La serpiente más pesada del mundo</li>
                    <li>🦎 <strong>Iguana verde</strong> - Muy común en Centroamérica</li>
                    <li>🐊 <strong>Caimán negro</strong> - Habita en el Amazonas</li>
                    <li>🐍 <strong>Serpiente de cascabel</strong> - Conocida por su cascabel</li>
                    <li>🐢 <strong>Tortuga laúd</strong> - La tortuga marina más grande</li>
                    <li>🐍 <strong>Boa constrictor</strong> - Mata por constricción</li>
                </ul>
            `;
            break;
        case 'asia':
            content = `
                <h3>🐉 Reptiles de Asia 🐉</h3>
                <ul>
                    <li>🦎 <strong>Dragón de Komodo</strong> - El lagarto más grande del mundo</li>
                    <li>🐍 <strong>Cobra real</strong> - La serpiente venenosa más larga</li>
                    <li>🐊 <strong>Cocodrilo marino</strong> - El reptil más grande del planeta</li>
                    <li>🐢 <strong>Tortuga asiática de río</strong> - Especie en peligro</li>
                    <li>🦎 <strong>Gecko tokay</strong> - Conocido por su llamativo color azul</li>
                    <li>🐍 <strong>Pitón reticulada</strong> - La serpiente más larga</li>
                </ul>
            `;
            break;
        case 'australia':
            content = `
                <h3>🦘 Reptiles de Australia 🦘</h3>
                <ul>
                    <li>🐍 <strong>Taipán del interior</strong> - La serpiente más venenosa del mundo</li>
                    <li>🦎 <strong>Dragón barbudo</strong> - Mascota muy popular</li>
                    <li>🐊 <strong>Cocodrilo de agua salada</strong> - Gigante australiano</li>
                    <li>🦎 <strong>Diablo espinoso</strong> - Cubierto de púas</li>
                    <li>🐍 <strong>Serpiente tigre</strong> - Muy venenosa y común</li>
                    <li>🦎 <strong>Lagarto de lengua azul</strong> - Lengua de color azul brillante</li>
                </ul>
            `;
            break;
        case 'europe':
            content = `
                <h3>🏰 Reptiles de Europa 🏰</h3>
                <ul>
                    <li>🦎 <strong>Lagarto verde</strong> - Común en el sur de Europa</li>
                    <li>🐍 <strong>Víbora europea</strong> - La única serpiente venenosa del norte</li>
                    <li>🐢 <strong>Tortuga mediterránea</strong> - Habita en España e Italia</li>
                    <li>🦎 <strong>Salamanquesa</strong> - Pequeño gecko mediterráneo</li>
                    <li>🐍 <strong>Culebra de escalera</strong> - Inofensiva y común</li>
                    <li>🐢 <strong>Tortuga de estanque europea</strong> - Vive en lagos y ríos</li>
                </ul>
            `;
            break;
    }
    list.innerHTML = content;
}

// ============================================
// JUEGO: ¿ES PELIGROSO?
// ============================================

function checkDanger() {
    const result = document.getElementById('danger-result');
    const reptiles = [
        { name: '🐍 Serpiente de cascabel', dangerous: true, desc: 'Su veneno puede ser mortal para humanos' },
        { name: '🐢 Tortuga marina', dangerous: false, desc: 'Es inofensiva y está en peligro de extinción' },
        { name: '🐊 Cocodrilo del Nilo', dangerous: true, desc: 'Uno de los depredadores más peligrosos de África' },
        { name: '🦎 Iguana verde', dangerous: false, desc: 'Es herbívora y muy tranquila' },
        { name: '🐍 Anaconda verde', dangerous: true, desc: 'Puede aplastar a sus presas con su potente cuerpo' },
        { name: '🦎 Gecko leopardo', dangerous: false, desc: 'Pequeño, inofensivo y muy popular como mascota' },
        { name: '🐉 Dragón de Komodo', dangerous: true, desc: 'El lagarto más grande y peligroso del mundo' },
        { name: '🦎 Camaleón pantera', dangerous: false, desc: 'Hermoso y completamente inofensivo' },
        { name: '🐍 Mamba negra', dangerous: true, desc: 'Extremadamente rápida y venenosa' },
        { name: '🐢 Tortuga de tierra', dangerous: false, desc: 'Tranquila y puede vivir más de 100 años' },
        { name: '🐊 Caimán negro', dangerous: true, desc: 'Depredador del Amazonas' },
        { name: '🦎 Gecko tokay', dangerous: false, desc: 'Inofensivo pero puede morder' },
        { name: '🐍 Boa constrictor', dangerous: true, desc: 'Mata por constricción' },
        { name: '🐢 Tortuga caimán', dangerous: true, desc: 'Su mordida puede ser peligrosa' }
    ];
    const random = reptiles[Math.floor(Math.random() * reptiles.length)];
    const dangerIcon = random.dangerous ? '⚠️ ¡PELIGROSO! ⚠️' : '✅ INOFENSIVO ✅';
    const dangerColor = random.dangerous ? '#ff4444' : '#44ff44';
    result.innerHTML = `
        <div style="text-align: center;">
            <p style="font-size: 1.5rem; margin: 10px 0;">${random.name}</p>
            <p style="font-size: 1.2rem; color: ${dangerColor}; font-weight: bold;">${dangerIcon}</p>
            <p style="margin: 15px 0;">${random.desc}</p>
            <p style="margin-top: 15px; font-style: italic;">${random.dangerous ? '🛑 ¡Mantén la distancia y no molestes al animal!' : '🐾 Puedes observarlo con seguridad en su hábitat'}</p>
        </div>
    `;
}

// ============================================
// QUIZ INTERACTIVO
// ============================================

let quizState = {
    step: 0,
    answers: [],
    questions: [
        { text: "🐢 ¿Vives en el agua?", options: ["Sí", "No"] },
        { text: "🦎 ¿Tienes patas?", options: ["Sí", "No"] },
        { text: "🐍 ¿Eres alargado y sin patas?", options: ["Sí", "No"] },
        { text: "🦷 ¿Tienes dientes grandes y afilados?", options: ["Sí", "No"] },
        { text: "🏜️ ¿Vives en lugares secos y calurosos?", options: ["Sí", "No"] },
        { text: "🌿 ¿Eres herbívoro (comes plantas)?", options: ["Sí", "No"] }
    ]
};

function iniciarQuiz() {
    quizState.step = 0;
    quizState.answers = [];
    
    const quizDiv = document.getElementById('quiz');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!quizDiv) return;
    
    resultDiv.innerHTML = '';
    quizDiv.style.display = 'block';
    quizDiv.innerHTML = '';
    
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    quizContainer.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-bar" style="width: 0%"></div>
        </div>
        <div class="quiz-question">
            <p class="question-text">${quizState.questions[0].text}</p>
            <div class="quiz-options">
                <button onclick="responderQuiz(0, 'Sí')" class="quiz-option">✅ Sí</button>
                <button onclick="responderQuiz(0, 'No')" class="quiz-option">❌ No</button>
            </div>
        </div>
        <div class="quiz-info">
            <p>Pregunta 1 de ${quizState.questions.length}</p>
        </div>
    `;
    
    quizDiv.appendChild(quizContainer);
}

function responderQuiz(questionIndex, answer) {
    quizState.answers.push(answer);
    quizState.step++;
    
    const quizDiv = document.getElementById('quiz');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!quizDiv) return;
    
    if (quizState.step < quizState.questions.length) {
        const progressPercent = (quizState.step / quizState.questions.length) * 100;
        
        const quizContainer = quizDiv.querySelector('.quiz-container');
        if (quizContainer) {
            const progressBar = quizContainer.querySelector('.progress-bar');
            if (progressBar) progressBar.style.width = `${progressPercent}%`;
            
            const questionText = quizContainer.querySelector('.question-text');
            if (questionText) questionText.textContent = quizState.questions[quizState.step].text;
            
            const optionsDiv = quizContainer.querySelector('.quiz-options');
            if (optionsDiv) {
                optionsDiv.innerHTML = `
                    <button onclick="responderQuiz(${quizState.step}, 'Sí')" class="quiz-option">✅ Sí</button>
                    <button onclick="responderQuiz(${quizState.step}, 'No')" class="quiz-option">❌ No</button>
                `;
            }
            
            const infoText = quizContainer.querySelector('.quiz-info p');
            if (infoText) infoText.textContent = `Pregunta ${quizState.step + 1} de ${quizState.questions.length}`;
        }
    } else {
        quizDiv.style.display = 'none';
        const resultado = determinarReptil(quizState.answers);
        mostrarResultadoQuiz(resultado);
    }
}

function determinarReptil(respuestas) {
    const viveEnAgua = respuestas[0] === "Sí";
    const tienePatas = respuestas[1] === "Sí";
    const esAlargadoSinPatas = respuestas[2] === "Sí";
    const tieneDientesGrandes = respuestas[3] === "Sí";
    const viveDesierto = respuestas[4] === "Sí";
    const esHerbivoro = respuestas[5] === "Sí";
    
    if (viveEnAgua && tienePatas && tieneDientesGrandes) {
        return {
            nombre: "Cocodrilo",
            icono: "🐊",
            descripcion: "Eres un gran depredador semiacuático. Vives en ríos y lagos, tienes una mordida extremadamente poderosa.",
            caracteristicas: ["Excelente nadador", "Mordida más fuerte del reino animal", "Puede contener la respiración por horas"],
            nivel: "Depredador superior ⚠️"
        };
    } 
    else if (viveEnAgua && !tienePatas && esAlargadoSinPatas) {
        return {
            nombre: "Serpiente de agua",
            icono: "🐍",
            descripcion: "Eres una serpiente acuática. Pasas la mayor parte del tiempo en el agua cazando peces.",
            caracteristicas: ["Excelente nadadora", "Puede cazar bajo el agua", "Algunas especies son venenosas"],
            nivel: "Cazador acuático 🌊"
        };
    }
    else if (viveEnAgua && !tieneDientesGrandes && esHerbivoro) {
        return {
            nombre: "Tortuga marina",
            icono: "🐢",
            descripcion: "Eres una tortuga marina. Viajas grandes distancias por los océanos.",
            caracteristicas: ["Gran nadadora", "Puede vivir más de 100 años", "Viaja miles de kilómetros"],
            nivel: "Viajera oceánica 🌊"
        };
    }
    else if (!viveEnAgua && tienePatas && viveDesierto) {
        return {
            nombre: "Lagarto del desierto",
            icono: "🦎",
            descripcion: "Eres un lagarto adaptado a la vida en el desierto. Te encanta tomar el sol.",
            caracteristicas: ["Muy veloz", "Aguanta altas temperaturas", "Puede almacenar agua"],
            nivel: "Corredor del desierto 🏜️"
        };
    }
    else if (!viveEnAgua && tienePatas && !tieneDientesGrandes && !viveDesierto) {
        return {
            nombre: "Iguana",
            icono: "🦎",
            descripcion: "Eres una iguana, un lagarto herbívoro que vive en árboles.",
            caracteristicas: ["Excelente escaladora", "Puede soltar la cola", "Tiene una cresta dorsal"],
            nivel: "Escalador arbóreo 🌳"
        };
    }
    else if (!viveEnAgua && !tienePatas && esAlargadoSinPatas) {
        return {
            nombre: "Serpiente terrestre",
            icono: "🐍",
            descripcion: "Eres una serpiente que vive en tierra. Te deslizas sigilosamente.",
            caracteristicas: ["Sin patas", "Lengua bífida", "Detecta vibraciones"],
            nivel: "Cazador sigiloso 🎯"
        };
    }
    else if (!viveEnAgua && tienePatas && esHerbivoro) {
        return {
            nombre: "Tortuga terrestre",
            icono: "🐢",
            descripcion: "Eres una tortuga terrestre. Llevas tu casa a cuestas y eres muy longeva.",
            caracteristicas: ["Caparazón protector", "Muy longeva", "Paso lento pero constante"],
            nivel: "Sabio ancestral 🧠"
        };
    }
    else if (!viveEnAgua && tienePatas && tieneDientesGrandes) {
        return {
            nombre: "Dragón de Komodo",
            icono: "🐉",
            descripcion: "Eres el lagarto más grande del mundo. Eres un depredador temible.",
            caracteristicas: ["El lagarto más grande", "Saliva con bacterias", "Excelente cazador"],
            nivel: "Superdepredador 🔥"
        };
    }
    else {
        return {
            nombre: "Reptil misterioso",
            icono: "🦎",
            descripcion: "¡Eres una especie única y fascinante! Aún no te hemos clasificado.",
            caracteristicas: ["Especie única", "Fascinante", "Por descubrir"],
            nivel: "Misterioso 🔮"
        };
    }
}

function mostrarResultadoQuiz(resultado) {
    const resultDiv = document.getElementById('quiz-result');
    
    let caracteristicasHTML = '';
    resultado.caracteristicas.forEach(car => {
        caracteristicasHTML += `<li>✨ ${car}</li>`;
    });
    
    resultDiv.innerHTML = `
        <div class="quiz-resultado">
            <div class="resultado-header">
                <span class="resultado-icono">${resultado.icono}</span>
                <h3>¡Eres un/a ${resultado.nombre}!</h3>
                <span class="resultado-icono">${resultado.icono}</span>
            </div>
            <div class="resultado-descripcion">
                <p>${resultado.descripcion}</p>
            </div>
            <div class="resultado-caracteristicas">
                <h4>🌟 Tus características principales:</h4>
                <ul>${caracteristicasHTML}</ul>
            </div>
            <div class="resultado-nivel">
                <p><strong>📊 Nivel:</strong> ${resultado.nivel}</p>
            </div>
            <button onclick="iniciarQuiz()" class="reiniciar-quiz-btn">
                🔄 Jugar de nuevo
            </button>
        </div>
    `;
}

// ============================================
// FUNCIONES DE SESIÓN
// ============================================

function verificarSesion() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    
    if (token && user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (userInfo) userInfo.style.display = 'block';
        
        try {
            const userData = JSON.parse(user);
            if (userNameSpan) {
                userNameSpan.innerHTML = `${userData.nombre}`;
            }
            console.log(`✅ Usuario logueado: ${userData.nombre}`);
        } catch(e) {
            console.log('✅ Usuario logueado');
            if (userNameSpan) {
                userNameSpan.innerHTML = 'Usuario';
            }
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }
}

function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
}

// ============================================
// FUNCIONES PARA BASE DE DATOS SQL
// ============================================

async function loadSQLData(type) {
    const resultsDiv = document.getElementById('results-table');
    const loadingDiv = document.querySelector('#sql-results .loading');
    const countSpan = document.getElementById('result-count');
    
    if (!resultsDiv) return;
    
    if (loadingDiv) loadingDiv.style.display = 'block';
    resultsDiv.innerHTML = '';
    
    try {
        let url = '';
        switch(type) {
            case 'all':
                url = 'api/reptiles_api.php?action=getAllReptiles';
                break;
            case 'peligrosos':
                url = 'api/reptiles_api.php?action=getPeligrosos';
                break;
            case 'estadisticas':
                url = 'api/reptiles_api.php?action=getEstadisticas';
                break;
            case 'curiosidades':
                url = 'api/reptiles_api.php?action=getCuriosidades';
                break;
            default:
                url = 'api/reptiles_api.php?action=getAllReptiles';
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            resultsDiv.innerHTML = `<div class="error">❌ Error: ${data.error}</div>`;
        } else if (data.length === 0) {
            resultsDiv.innerHTML = '<div class="no-results">📭 No se encontraron resultados</div>';
            if (countSpan) countSpan.textContent = '0 registros';
        } else {
            displayResults(data);
            if (countSpan) countSpan.textContent = `${data.length} registros encontrados`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = `<div class="error">❌ Error al cargar datos.</div>`;
    } finally {
        if (loadingDiv) loadingDiv.style.display = 'none';
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results-table');
    
    if (!data || data.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">📭 No se encontraron resultados</div>';
        return;
    }
    
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.replace(/_/g, ' ').toUpperCase();
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            let value = row[header];
            
            if (value === null || value === undefined) {
                value = '—';
            } else if (typeof value === 'boolean') {
                value = value ? '✅ Sí' : '❌ No';
            } else if (header === 'nivel_peligrosidad' && typeof value === 'number') {
                const peligroIconos = ['🟢', '🟡', '🟠', '🟠🔴', '🔴'];
                value = `${peligroIconos[value-1] || '⚪'} Nivel ${value}`;
            }
            
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(table);
}

function showQueryEditor() {
    const editor = document.getElementById('query-editor');
    if (editor) {
        editor.style.display = editor.style.display === 'none' ? 'block' : 'none';
    }
}

async function executeCustomQuery() {
    const query = document.getElementById('sql-query').value.trim();
    const resultsDiv = document.getElementById('results-table');
    const countSpan = document.getElementById('result-count');
    const loadingDiv = document.querySelector('#sql-results .loading');
    
    if (!query) {
        alert('❌ Por favor, escribe una consulta SQL');
        return;
    }
    
    if (loadingDiv) loadingDiv.style.display = 'block';
    if (resultsDiv) resultsDiv.innerHTML = '';
    
    try {
        const formData = new URLSearchParams();
        formData.append('query', query);
        
        const response = await fetch('api/reptiles_api.php?action=executeQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            if (result.data && result.data.length > 0) {
                displayResults(result.data);
                if (countSpan) countSpan.textContent = `${result.count} registros encontrados`;
                
                const queryInfo = document.createElement('div');
                queryInfo.className = 'query-info';
                queryInfo.innerHTML = `<small>📝 Consulta ejecutada: <code>${escapeHtml(query)}</code></small>`;
                if (resultsDiv) resultsDiv.insertBefore(queryInfo, resultsDiv.firstChild);
            } else {
                if (resultsDiv) resultsDiv.innerHTML = '<div class="no-results">📭 La consulta no devolvió resultados</div>';
                if (countSpan) countSpan.textContent = '0 registros';
            }
        } else {
            if (resultsDiv) resultsDiv.innerHTML = `<div class="error">❌ Error SQL: ${result.error}</div>`;
        }
    } catch (error) {
        if (resultsDiv) resultsDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
    } finally {
        if (loadingDiv) loadingDiv.style.display = 'none';
    }
}

function showExamples() {
    const examples = document.getElementById('query-examples');
    if (examples) {
        examples.style.display = examples.style.display === 'none' ? 'block' : 'none';
    }
}

function setExample(query) {
    const textarea = document.getElementById('sql-query');
    if (textarea) {
        textarea.value = query;
    }
    const examples = document.getElementById('query-examples');
    if (examples) {
        examples.style.display = 'none';
    }
    executeCustomQuery();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    verificarSesion();
    if (document.getElementById('quiz')) {
        iniciarQuiz();
    }
});
// ============================================
// FUNCIONES PARA API DE WIKIPEDIA (GRATUITA Y REAL)
// ============================================

// Cargar información de reptiles desde Wikipedia API
async function cargarInfoReptiles() {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-api">🔄 Cargando información de reptiles desde Wikipedia...</div>';
    
    try {
        // Lista de reptiles para buscar en Wikipedia
        const reptiles = [
            { nombre: "Cocodrilo", query: "Cocodrilo" },
            { nombre: "Serpiente", query: "Serpiente" },
            { nombre: "Tortuga", query: "Tortuga" },
            { nombre: "Iguana", query: "Iguana" },
            { nombre: "Camaleón", query: "Camaleón" },
            { nombre: "Dragón de Komodo", query: "Dragón de Komodo" }
        ];
        
        const resultados = [];
        
        for (const reptil of reptiles) {
            try {
                // Llamada a la API de Wikipedia
                const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(reptil.query)}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data && data.title && !data.title.includes("Not found")) {
                    resultados.push({
                        titulo: data.title,
                        descripcion: data.extract || `Información sobre ${reptil.nombre}`,
                        imagen: data.thumbnail?.source || "https://via.placeholder.com/350x180?text=Reptil",
                        url: data.content_urls?.desktop?.page || "#",
                        fuente: "Wikipedia"
                    });
                }
            } catch (e) {
                console.log(`No se pudo cargar ${reptil.nombre}:`, e);
            }
        }
        
        if (resultados.length > 0) {
            mostrarNoticias(resultados);
        } else {
            container.innerHTML = '<div class="error-api">❌ No se pudo cargar la información. Intenta de nuevo.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="error-api">❌ Error al cargar la información. Por favor, intenta de nuevo.</div>';
    }
}

// Cargar curiosidades de reptiles desde API
async function cargarCuriosidadesAPI() {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-api">🔄 Cargando datos curiosos sobre reptiles...</div>';
    
    // Datos curiosos reales sobre reptiles (fallback si la API falla)
    const curiosidadesReptiles = [
        {
            titulo: "🦎 Los reptiles son de sangre fría",
            descripcion: "Los reptiles son ectotermos, lo que significa que dependen del entorno para regular su temperatura corporal. Por eso les gusta tomar el sol.",
            fuente: "National Geographic",
            imagen: "https://via.placeholder.com/350x180?text=Reptil+Solar"
        },
        {
            titulo: "🐍 Las serpientes huelen con la lengua",
            descripcion: "Las serpientes usan su lengua bífida para recoger partículas del aire y llevarlas a un órgano especial en el paladar llamado órgano de Jacobson.",
            fuente: "Scientific American",
            imagen: "https://via.placeholder.com/350x180?text=Lengua+Serpiente"
        },
        {
            titulo: "🐢 Las tortugas pueden vivir más de 150 años",
            descripcion: "La tortuga gigante de Aldabra puede vivir más de 150 años, y se cree que algunas tortugas de Galápagos superan los 200 años.",
            fuente: "BBC Earth",
            imagen: "https://via.placeholder.com/350x180?text=Tortuga+Gigante"
        },
        {
            titulo: "🐊 Los cocodrilos tragan piedras",
            descripcion: "Los cocodrilos tragan piedras (gastrolitos) que les ayudan a triturar la comida y también actúan como lastre para sumergirse.",
            fuente: "Animal Planet",
            imagen: "https://via.placeholder.com/350x180?text=Cocodrilo"
        },
        {
            titulo: "🦎 El dragón de Komodo tiene saliva letal",
            descripcion: "La saliva del dragón de Komodo contiene más de 50 bacterias diferentes que pueden matar a una presa en 24 horas.",
            fuente: "National Geographic",
            imagen: "https://via.placeholder.com/350x180?text=Dragon+Komodo"
        },
        {
            titulo: "🐍 La mamba negra es la más rápida",
            descripcion: "La mamba negra puede alcanzar velocidades de hasta 20 km/h en distancias cortas, lo que la convierte en la serpiente más rápida del mundo.",
            fuente: "Discovery Channel",
            imagen: "https://via.placeholder.com/350x180?text=Mamba+Negra"
        }
    ];
    
    mostrarNoticias(curiosidadesReptiles);
}

// Función principal para cargar noticias (usa Wikipedia)
async function cargarNoticias() {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-api">🔄 Cargando información de Wikipedia...</div>';
    
    try {
        // Buscar información de reptiles en Wikipedia
        const busquedas = [
            "Reptil",
            "Serpiente",
            "Tortuga",
            "Cocodrilo",
            "Lagarto",
            "Camaleón"
        ];
        
        const resultados = [];
        
        for (const busqueda of busquedas) {
            try {
                const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(busqueda)}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data && data.title && !data.title.includes("Not found")) {
                    resultados.push({
                        titulo: `📖 ${data.title}`,
                        descripcion: data.extract ? data.extract.substring(0, 200) + "..." : `Información sobre ${busqueda}`,
                        imagen: data.thumbnail?.source || "https://via.placeholder.com/350x180?text=Wikipedia",
                        url: data.content_urls?.desktop?.page || "#",
                        fecha: new Date().toLocaleDateString('es-ES'),
                        fuente: "Wikipedia"
                    });
                }
            } catch (e) {
                console.log(`Error cargando ${busqueda}:`, e);
            }
            
            // Pequeña pausa para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (resultados.length > 0) {
            mostrarNoticias(resultados);
        } else {
            // Fallback a datos locales
            cargarDatosLocales();
        }
    } catch (error) {
        console.error('Error:', error);
        cargarDatosLocales();
    }
}

// Cargar por categoría
async function cargarNoticiasPorCategoria() {
    const categoria = document.getElementById('categoriaNoticias').value;
    const container = document.getElementById('noticias-container');
    
    if (!container) return;
    
    container.innerHTML = '<div class="loading-api">🔄 Buscando información sobre ' + obtenerNombreCategoria(categoria) + '...</div>';
    
    try {
        let busqueda = obtenerNombreCategoria(categoria);
        const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(busqueda)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.title && !data.title.includes("Not found")) {
            const resultados = [{
                titulo: `📖 ${data.title}`,
                descripcion: data.extract ? data.extract.substring(0, 300) + "..." : `Información sobre ${busqueda}`,
                imagen: data.thumbnail?.source || "https://via.placeholder.com/350x180?text=Wikipedia",
                url: data.content_urls?.desktop?.page || "#",
                fecha: new Date().toLocaleDateString('es-ES'),
                fuente: "Wikipedia"
            }];
            mostrarNoticias(resultados);
        } else {
            cargarDatosPorCategoriaLocal(categoria);
        }
    } catch (error) {
        console.error('Error:', error);
        cargarDatosPorCategoriaLocal(categoria);
    }
}

// Datos locales de respaldo
function cargarDatosLocales() {
    const container = document.getElementById('noticias-container');
    const datosLocales = [
        {
            titulo: "🦎 ¿Sabías que los reptiles existen desde la era de los dinosaurios?",
            descripcion: "Los reptiles aparecieron hace más de 300 millones de años y han sobrevivido a varias extinciones masivas.",
            fuente: "Historia Natural",
            imagen: "https://via.placeholder.com/350x180?text=Dinosaurios"
        },
        {
            titulo: "🐍 Las serpientes pueden dislocar sus mandíbulas",
            descripcion: "Para tragar presas más grandes que su cabeza, las serpientes pueden separar sus mandíbulas gracias a ligamentos elásticos.",
            fuente: "Curiosidades Animales",
            imagen: "https://via.placeholder.com/350x180?text=Serpiente+Comiendo"
        },
        {
            titulo: "🐢 El caparazón de las tortugas es parte de su esqueleto",
            descripcion: "El caparazón de las tortugas está formado por sus costillas y vértebras fusionadas, por eso no pueden salirse de él.",
            fuente: "Biología Marina",
            imagen: "https://via.placeholder.com/350x180?text=Caparazón+Tortuga"
        },
        {
            titulo: "🐊 Los cocodrilos son los reptiles más grandes del mundo",
            descripcion: "El cocodrilo de agua salada puede alcanzar hasta 7 metros de longitud y pesar más de 1000 kilogramos.",
            fuente: "Récords Animales",
            imagen: "https://via.placeholder.com/350x180?text=Cocodrilo+Gigante"
        },
        {
            titulo: "🦎 Los camaleones cambian de color para comunicarse",
            descripcion: "Aunque se cree que cambian de color para camuflarse, lo hacen principalmente para comunicarse con otros camaleones y mostrar su estado de ánimo.",
            fuente: "Comportamiento Animal",
            imagen: "https://via.placeholder.com/350x180?text=Camaleón+Color"
        },
        {
            titulo: "🐍 Existen más de 3,000 especies de serpientes",
            descripcion: "Solo alrededor de 600 especies son venenosas, y de ellas, solo 200 representan un peligro real para los humanos.",
            fuente: "Herpetología",
            imagen: "https://via.placeholder.com/350x180?text=Serpientes"
        }
    ];
    mostrarNoticias(datosLocales);
}

function cargarDatosPorCategoriaLocal(categoria) {
    const container = document.getElementById('noticias-container');
    let datos = [];
    
    switch(categoria) {
        case 'snakes':
            datos = [{
                titulo: "🐍 Datos sobre Serpientes",
                descripcion: "Las serpientes mudan su piel varias veces al año. Existen serpientes en todos los continentes excepto la Antártida.",
                fuente: "Herpetología",
                imagen: "https://via.placeholder.com/350x180?text=Serpientes"
            }];
            break;
        case 'lizards':
            datos = [{
                titulo: "🦎 Datos sobre Lagartos",
                descripcion: "Los lagartos pueden regenerar su cola. El dragón de Komodo es el lagarto más grande del mundo.",
                fuente: "Herpetología",
                imagen: "https://via.placeholder.com/350x180?text=Lagartos"
            }];
            break;
        case 'turtles':
            datos = [{
                titulo: "🐢 Datos sobre Tortugas",
                descripcion: "Las tortugas pueden vivir más de 100 años. Algunas tortugas marinas viajan miles de kilómetros para anidar.",
                fuente: "Herpetología",
                imagen: "https://via.placeholder.com/350x180?text=Tortugas"
            }];
            break;
        case 'crocodiles':
            datos = [{
                titulo: "🐊 Datos sobre Cocodrilos",
                descripcion: "Los cocodrilos tienen la mordida más fuerte del reino animal. Pueden permanecer bajo el agua hasta 2 horas.",
                fuente: "Herpetología",
                imagen: "https://via.placeholder.com/350x180?text=Cocodrilos"
            }];
            break;
        case 'conservation':
            datos = [{
                titulo: "🌱 Conservación de Reptiles",
                descripcion: "Muchas especies de reptiles están en peligro de extinción debido a la pérdida de hábitat y el tráfico ilegal.",
                fuente: "Conservación",
                imagen: "https://via.placeholder.com/350x180?text=Conservación"
            }];
            break;
        default:
            datos = [{
                titulo: "📌 Información sobre Reptiles",
                descripcion: "Los reptiles son vertebrados de sangre fría que incluyen serpientes, lagartos, tortugas y cocodrilos.",
                fuente: "Enciclopedia",
                imagen: "https://via.placeholder.com/350x180?text=Reptiles"
            }];
    }
    
    mostrarNoticias(datos);
}

function obtenerNombreCategoria(categoria) {
    const nombres = {
        'reptiles': 'Reptil',
        'snakes': 'Serpiente',
        'lizards': 'Lagarto',
        'turtles': 'Tortuga',
        'crocodiles': 'Cocodrilo',
        'conservation': 'Conservación de reptiles'
    };
    return nombres[categoria] || 'Reptil';
}

function mostrarNoticias(noticias) {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    let html = '';
    
    noticias.forEach(noticia => {
        html += `
            <div class="noticia-card">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-imagen" onerror="this.src='https://via.placeholder.com/350x180?text=Reptil'">
                <div class="noticia-contenido">
                    <h3 class="noticia-titulo">
                        <a href="${noticia.url}" target="_blank">${noticia.titulo}</a>
                    </h3>
                    <p class="noticia-descripcion">${noticia.descripcion}</p>
                    <div class="noticia-fecha">
                        <span>📅 ${noticia.fecha || new Date().toLocaleDateString('es-ES')}</span>
                        <span class="noticia-fuente">📰 ${noticia.fuente}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar curiosidades (nueva)
async function cargarCuriosidades() {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-api">🔄 Cargando datos curiosos...</div>';
    
    const curiosidades = [
        {
            titulo: "🦎 Los reptiles son más antiguos que los dinosaurios",
            descripcion: "Los primeros reptiles aparecieron hace unos 320 millones de años, mientras que los dinosaurios aparecieron hace unos 230 millones de años.",
            fuente: "Paleontología",
            imagen: "https://via.placeholder.com/350x180?text=Reptiles+Antiguos"
        },
        {
            titulo: "🐍 Las serpientes pueden dormir durante meses",
            descripcion: "Algunas serpientes entran en un estado de letargo llamado brumación durante el invierno, pudiendo pasar meses sin comer.",
            fuente: "Herpetología",
            imagen: "https://via.placeholder.com/350x180?text=Serpiente+Dormida"
        },
        {
            titulo: "🐢 Las tortugas respiran por el ano",
            descripcion: "Algunas tortugas pueden absorber oxígeno del agua a través de su cloaca, lo que les permite permanecer sumergidas más tiempo.",
            fuente: "Biología",
            imagen: "https://via.placeholder.com/350x180?text=Tortuga+Bajo+Agua"
        },
        {
            titulo: "🐊 Los cocodrilos sienten las vibraciones del agua",
            descripcion: "Los cocodrilos tienen unos receptores en la piel llamados órganos sensoriales integumentarios que detectan vibraciones en el agua.",
            fuente: "National Geographic",
            imagen: "https://via.placeholder.com/350x180?text=Cocodrilo"
        },
        {
            titulo: "🦎 El gecko puede caminar por el techo",
            descripcion: "Los geckos tienen millones de pelos microscópicos en sus patas que les permiten adherirse a cualquier superficie gracias a la fuerza de Van der Waals.",
            fuente: "Física Animal",
            imagen: "https://via.placeholder.com/350x180?text=Gecko+Pared"
        },
        {
            titulo: "🐍 La serpiente más pequeña mide 10 cm",
            descripcion: "La serpiente más pequeña del mundo es la Leptotyphlops carlae, que mide solo 10 centímetros y se encuentra en Barbados.",
            fuente: "Récords",
            imagen: "https://via.placeholder.com/350x180?text=Serpiente+Pequeña"
        }
    ];
    
    mostrarNoticias(curiosidades);
}