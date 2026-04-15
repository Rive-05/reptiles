-- =============================================
-- BASE DE DATOS: Mundo de los Reptiles
-- =============================================

-- Eliminar base de datos si existe y crearla de nuevo
DROP DATABASE IF EXISTS mundo_reptiles;
CREATE DATABASE mundo_reptiles;
USE mundo_reptiles;

-- =============================================
-- ELIMINAR TABLAS SI EXISTEN (en orden correcto por FK)
-- =============================================
DROP TABLE IF EXISTS quiz_respuestas;
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS estadisticas_visitas;
DROP TABLE IF EXISTS curiosidades;
DROP TABLE IF EXISTS reptiles_continentes;
DROP TABLE IF EXISTS reptiles_habitats;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS reptiles;
DROP TABLE IF EXISTS tipos_reptiles;
DROP TABLE IF EXISTS habitats;
DROP TABLE IF EXISTS continentes;

-- =============================================
-- TABLA 1: continentes
-- =============================================
CREATE TABLE continentes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    codigo VARCHAR(3) NOT NULL,
    superficie_km2 DECIMAL(15,2),
    poblacion_estimada BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA 2: habitats
-- =============================================
CREATE TABLE habitats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    clima VARCHAR(50),
    temperatura_promedio VARCHAR(30),
    humedad_promedio VARCHAR(30)
);

-- =============================================
-- TABLA 3: tipos_reptiles
-- =============================================
CREATE TABLE tipos_reptiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    nombre_cientifico VARCHAR(100),
    descripcion_general TEXT,
    orden_taxonomico VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA 4: reptiles (principal)
-- =============================================
CREATE TABLE reptiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_comun VARCHAR(100) NOT NULL,
    nombre_cientifico VARCHAR(100) NOT NULL,
    tipo_reptil_id INT NOT NULL,
    habitat_id INT,
    continente_id INT,
    longitud_maxima_cm DECIMAL(8,2),
    peso_maximo_kg DECIMAL(8,2),
    esperanza_vida_anos INT,
    coloracion_principal VARCHAR(50),
    dieta VARCHAR(50),
    tipo_alimentacion TEXT,
    es_venenoso BOOLEAN DEFAULT FALSE,
    es_peligroso_para_humanos BOOLEAN DEFAULT FALSE,
    nivel_peligrosidad INT DEFAULT 1,
    tipo_reproduccion VARCHAR(30),
    numero_huevos_promedio INT,
    tiempo_incubacion_dias INT,
    estado_conservacion VARCHAR(50),
    poblacion_estimada VARCHAR(100),
    principales_amenazas TEXT,
    dato_curioso_1 TEXT,
    dato_curioso_2 TEXT,
    imagen_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_reptil_id) REFERENCES tipos_reptiles(id),
    FOREIGN KEY (habitat_id) REFERENCES habitats(id),
    FOREIGN KEY (continente_id) REFERENCES continentes(id)
);

-- =============================================
-- TABLA 5: usuarios (para login)
-- =============================================
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    es_admin BOOLEAN DEFAULT FALSE
);

-- =============================================
-- TABLAS RELACIONALES
-- =============================================
CREATE TABLE reptiles_habitats (
    reptil_id INT,
    habitat_id INT,
    PRIMARY KEY (reptil_id, habitat_id),
    FOREIGN KEY (reptil_id) REFERENCES reptiles(id) ON DELETE CASCADE,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id) ON DELETE CASCADE
);

CREATE TABLE reptiles_continentes (
    reptil_id INT,
    continente_id INT,
    PRIMARY KEY (reptil_id, continente_id),
    FOREIGN KEY (reptil_id) REFERENCES reptiles(id) ON DELETE CASCADE,
    FOREIGN KEY (continente_id) REFERENCES continentes(id) ON DELETE CASCADE
);

CREATE TABLE curiosidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reptil_id INT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50),
    FOREIGN KEY (reptil_id) REFERENCES reptiles(id) ON DELETE CASCADE
);

-- =============================================
-- TABLA 6: estadisticas_visitas
-- =============================================
CREATE TABLE estadisticas_visitas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reptil_id INT,
    fecha DATE,
    visitas INT DEFAULT 1,
    FOREIGN KEY (reptil_id) REFERENCES reptiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_visita_dia (reptil_id, fecha)
);

-- =============================================
-- TABLA 7: favoritos
-- =============================================
CREATE TABLE favoritos (
    usuario_id INT,
    reptil_id INT,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, reptil_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (reptil_id) REFERENCES reptiles(id) ON DELETE CASCADE
);

-- =============================================
-- TABLA 8: quiz_respuestas
-- =============================================
CREATE TABLE quiz_respuestas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    reptil_adivinado INT,
    respuestas JSON,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (reptil_adivinado) REFERENCES reptiles(id) ON DELETE SET NULL
);

-- =============================================
-- INSERCIÓN DE DATOS - CONTINENTES
-- =============================================
INSERT INTO continentes (nombre, codigo, superficie_km2, poblacion_estimada) VALUES
('África', 'AF', 30370000, 1400000000),
('América', 'AM', 42549000, 1000000000),
('Asia', 'AS', 44579000, 4600000000),
('Australia/Oceanía', 'OC', 8600000, 43000000),
('Europa', 'EU', 10180000, 748000000),
('Antártida', 'AN', 14200000, 5000);

-- =============================================
-- INSERCIÓN DE DATOS - HÁBITATS
-- =============================================
INSERT INTO habitats (nombre, descripcion, clima, temperatura_promedio, humedad_promedio) VALUES
('Selva tropical', 'Bosques densos con alta precipitación anual', 'Cálido y húmedo', '25-28°C', '80-90%'),
('Desierto', 'Zonas áridas con poca precipitación', 'Extremoso', '20-45°C', '10-30%'),
('Sabanas y pastizales', 'Terrenos abiertos con árboles dispersos', 'Cálido con estación seca', '20-30°C', '40-60%'),
('Ríos y lagos', 'Ecosistemas de agua dulce', 'Variable', 'Variable', 'Alta'),
('Océanos', 'Aguas marinas y costas', 'Variable', 'Variable', '100%'),
('Bosques templados', 'Bosques de climas moderados', 'Templado', '10-20°C', '60-80%'),
('Montañas', 'Zonas de alta altitud', 'Frío a templado', '0-15°C', 'Variable'),
('Manglares', 'Zonas costeras con árboles adaptados', 'Cálido y húmedo', '22-28°C', '70-85%');

-- =============================================
-- INSERCIÓN DE DATOS - TIPOS DE REPTILES
-- =============================================
INSERT INTO tipos_reptiles (nombre, nombre_cientifico, descripcion_general, orden_taxonomico) VALUES
('Serpientes', 'Serpentes', 'Reptiles alargados sin patas, cubiertos de escamas', 'Squamata'),
('Lagartos', 'Lacertilia', 'Reptiles con cuatro patas, cuerpo alargado', 'Squamata'),
('Tortugas', 'Testudines', 'Reptiles con un caparazón óseo', 'Testudines'),
('Cocodrilos', 'Crocodylidae', 'Grandes reptiles semiacuáticos', 'Crocodylia'),
('Tuatara', 'Rhynchocephalia', 'Reptiles endémicos de Nueva Zelanda', 'Rhynchocephalia');

-- =============================================
-- INSERCIÓN DE DATOS - REPTILES (22 especies)
-- =============================================

-- REPTILES ORIGINALES (IDs 1-10)
INSERT INTO reptiles (nombre_comun, nombre_cientifico, tipo_reptil_id, habitat_id, continente_id, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, coloracion_principal, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, tipo_reproduccion, numero_huevos_promedio, tiempo_incubacion_dias, estado_conservacion, dato_curioso_1, dato_curioso_2) VALUES
('Cocodrilo del Nilo', 'Crocodylus niloticus', 4, 4, 1, 600, 750, 70, 'Verde oliva', 'Carnívoro', FALSE, TRUE, 5, 'Oviparo', 40, 85, 'Preocupación menor', 'Puede permanecer bajo el agua hasta 2 horas', 'Su mordida es la más fuerte del reino animal'),
('Anaconda Verde', 'Eunectes murinus', 1, 4, 2, 520, 227, 30, 'Verde oscuro', 'Carnívoro', FALSE, TRUE, 4, 'Ovoviviparo', 30, 200, 'Preocupación menor', 'Es la serpiente más pesada del mundo', 'Puede tragar presas enteras del tamaño de un cerdo'),
('Dragón de Komodo', 'Varanus komodoensis', 2, 6, 3, 310, 90, 30, 'Gris oscuro', 'Carnívoro', FALSE, TRUE, 5, 'Oviparo', 20, 210, 'En peligro', 'Su saliva contiene bacterias mortales', 'Puede detectar carne podrida a 9 km'),
('Tortuga Laúd', 'Dermochelys coriacea', 3, 5, 2, 220, 900, 80, 'Negro con manchas', 'Carnívoro', FALSE, FALSE, 1, 'Oviparo', 100, 65, 'Vulnerable', 'Es la tortuga más grande del mundo', 'Puede sumergirse a más de 1200 metros'),
('Mamba Negra', 'Dendroaspis polylepis', 1, 3, 1, 450, 1.6, 11, 'Gris oliva', 'Carnívoro', TRUE, TRUE, 5, 'Oviparo', 15, 90, 'Preocupación menor', 'Es la serpiente más rápida del mundo', 'Una mordedura puede matar a 10 personas'),
('Iguana Verde', 'Iguana iguana', 2, 1, 2, 200, 9, 20, 'Verde brillante', 'Herbívoro', FALSE, FALSE, 2, 'Oviparo', 40, 75, 'Preocupación menor', 'Puede soltar la cola para escapar', 'Tiene un tercer ojo en la cabeza'),
('Cobra Real', 'Ophiophagus hannah', 1, 1, 3, 550, 8, 20, 'Verde oliva', 'Carnívoro', TRUE, TRUE, 5, 'Oviparo', 40, 80, 'Vulnerable', 'Es la serpiente venenosa más larga', 'Construye nidos para sus huevos'),
('Camaleón Pantera', 'Furcifer pardalis', 2, 1, 4, 52, 0.2, 5, 'Multicolor', 'Insectívoro', FALSE, FALSE, 1, 'Oviparo', 20, 240, 'Preocupación menor', 'Puede cambiar de color en segundos', 'Sus ojos se mueven independientemente'),
('Tortuga Galápagos', 'Chelonoidis nigra', 3, 3, 2, 180, 400, 150, 'Marrón oscuro', 'Herbívoro', FALSE, FALSE, 1, 'Oviparo', 16, 130, 'Vulnerable', 'Puede vivir más de 200 años', 'Puede sobrevivir un año sin comer'),
('Caimán Negro', 'Melanosuchus niger', 4, 1, 2, 500, 400, 60, 'Negro', 'Carnívoro', FALSE, TRUE, 4, 'Oviparo', 50, 80, 'Preocupación menor', 'Es el caimán más grande de América', 'Ayuda al equilibrio del ecosistema');

-- NUEVAS SERPIENTES (IDs 11-13)
INSERT INTO reptiles (nombre_comun, nombre_cientifico, tipo_reptil_id, habitat_id, continente_id, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, coloracion_principal, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, tipo_reproduccion, numero_huevos_promedio, tiempo_incubacion_dias, estado_conservacion, dato_curioso_1, dato_curioso_2) VALUES
('Boa Constrictor', 'Boa constrictor', 1, 1, 2, 400, 27, 30, 'Marrón con manchas', 'Carnívoro', FALSE, TRUE, 3, 'Ovoviviparo', 30, 120, 'Preocupación menor', 'No es venenosa, mata por constricción', 'Puede abrir sus mandíbulas 180 grados'),
('Víbora de Cascabel', 'Crotalus durissus', 1, 2, 2, 180, 2.5, 20, 'Marrón grisáceo', 'Carnívoro', TRUE, TRUE, 5, 'Ovoviviparo', 15, 90, 'Preocupación menor', 'Su cascabel está hecho de queratina', 'Puede detectar calor con fosetas loreales'),
('Pitón Reticulada', 'Malayopython reticulatus', 1, 1, 3, 700, 75, 25, 'Amarillo y marrón', 'Carnívoro', FALSE, TRUE, 4, 'Oviparo', 50, 80, 'Preocupación menor', 'Es la serpiente más larga del mundo', 'Puede tragar animales del tamaño de un cerdo');

-- NUEVOS LAGARTOS (IDs 14-16)
INSERT INTO reptiles (nombre_comun, nombre_cientifico, tipo_reptil_id, habitat_id, continente_id, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, coloracion_principal, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, tipo_reproduccion, numero_huevos_promedio, tiempo_incubacion_dias, estado_conservacion, dato_curioso_1, dato_curioso_2) VALUES
('Gecko Leopardo', 'Eublepharis macularius', 2, 2, 3, 25, 0.1, 20, 'Amarillo con manchas negras', 'Insectívoro', FALSE, FALSE, 1, 'Oviparo', 8, 45, 'Preocupación menor', 'Puede regenerar su cola', 'Tiene párpados móviles (único entre geckos)'),
('Tegu Argentino', 'Salvator merianae', 2, 3, 2, 120, 5, 15, 'Negro con blanco', 'Omnívoro', FALSE, FALSE, 2, 'Oviparo', 30, 60, 'Preocupación menor', 'Es muy inteligente y puede ser domesticado', 'Entra en hibernación en invierno'),
('Escorpión de Cola Espinosa', 'Uromastyx acanthinura', 2, 2, 1, 40, 0.5, 15, 'Amarillo y naranja', 'Herbívoro', FALSE, FALSE, 1, 'Oviparo', 12, 70, 'Vulnerable', 'Su cola espinosa sirve para defenderse', 'Almacena grasa en la cola');

-- NUEVAS TORTUGAS (IDs 17-19)
INSERT INTO reptiles (nombre_comun, nombre_cientifico, tipo_reptil_id, habitat_id, continente_id, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, coloracion_principal, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, tipo_reproduccion, numero_huevos_promedio, tiempo_incubacion_dias, estado_conservacion, dato_curioso_1, dato_curioso_2) VALUES
('Tortuga de Orejas Rojas', 'Trachemys scripta elegans', 3, 4, 2, 30, 2, 30, 'Verde con manchas rojas', 'Omnívoro', FALSE, FALSE, 1, 'Oviparo', 15, 70, 'Vulnerable', 'Las manchas rojas detrás de los ojos son su marca', 'Es una especie invasora en muchos países'),
('Tortuga Caimán', 'Macrochelys temminckii', 3, 4, 2, 80, 90, 80, 'Marrón oscuro', 'Carnívoro', FALSE, TRUE, 3, 'Oviparo', 30, 100, 'Vulnerable', 'Tiene un apéndice en la lengua que parece un gusano', 'Es la tortuga de agua dulce más grande del mundo'),
('Tortuga de Espolones', 'Centrochelys sulcata', 3, 2, 1, 80, 100, 80, 'Amarillo y marrón', 'Herbívoro', FALSE, FALSE, 1, 'Oviparo', 20, 120, 'En peligro', 'Es la tercera tortuga terrestre más grande', 'Puede cavar túneles de hasta 15 metros');

-- NUEVOS COCODRILOS (IDs 20-22)
INSERT INTO reptiles (nombre_comun, nombre_cientifico, tipo_reptil_id, habitat_id, continente_id, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, coloracion_principal, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, tipo_reproduccion, numero_huevos_promedio, tiempo_incubacion_dias, estado_conservacion, dato_curioso_1, dato_curioso_2) VALUES
('Cocodrilo Americano', 'Crocodylus acutus', 4, 8, 2, 500, 500, 70, 'Verde grisáceo', 'Carnívoro', FALSE, TRUE, 4, 'Oviparo', 40, 80, 'Vulnerable', 'Puede vivir en agua salada y dulce', 'Su hocico es más alargado que el del caimán'),
('Gavial', 'Gavialis gangeticus', 4, 4, 3, 650, 250, 50, 'Verde oliva', 'Carnívoro', FALSE, TRUE, 3, 'Oviparo', 40, 90, 'En peligro crítico', 'Su hocico largo es ideal para pescar', 'Solo quedan unos 200 ejemplares en libertad'),
('Caimán de Anteojos', 'Caiman crocodilus', 4, 4, 2, 250, 58, 40, 'Verde oliva', 'Carnívoro', FALSE, TRUE, 3, 'Oviparo', 25, 75, 'Preocupación menor', 'Tiene una protuberancia entre los ojos como anteojos', 'Se adapta fácilmente a hábitats alterados');

-- =============================================
-- RELACIONES reptiles_habitats
-- =============================================

-- Originales
INSERT INTO reptiles_habitats (reptil_id, habitat_id) VALUES
(1, 4), (1, 8), (2, 4), (2, 1), (3, 6), (3, 7), (4, 5), (5, 3), (5, 6),
(6, 1), (6, 6), (7, 1), (7, 6), (8, 1), (9, 3), (10, 1), (10, 4);

-- Nuevas serpientes
INSERT INTO reptiles_habitats (reptil_id, habitat_id) VALUES
(11, 1), (11, 6), (12, 2), (12, 3), (13, 1), (13, 6);

-- Nuevos lagartos
INSERT INTO reptiles_habitats (reptil_id, habitat_id) VALUES
(14, 2), (15, 3), (15, 6), (16, 2);

-- Nuevas tortugas
INSERT INTO reptiles_habitats (reptil_id, habitat_id) VALUES
(17, 4), (18, 4), (19, 2);

-- Nuevos cocodrilos
INSERT INTO reptiles_habitats (reptil_id, habitat_id) VALUES
(20, 8), (20, 4), (21, 4), (22, 4);

-- =============================================
-- RELACIONES reptiles_continentes
-- =============================================

-- Originales
INSERT INTO reptiles_continentes (reptil_id, continente_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 2), (5, 1), (6, 2), (7, 3), (8, 4), (9, 2), (10, 2);

-- Nuevas serpientes
INSERT INTO reptiles_continentes (reptil_id, continente_id) VALUES
(11, 2), (12, 2), (13, 3);

-- Nuevos lagartos
INSERT INTO reptiles_continentes (reptil_id, continente_id) VALUES
(14, 3), (15, 2), (16, 1);

-- Nuevas tortugas
INSERT INTO reptiles_continentes (reptil_id, continente_id) VALUES
(17, 2), (18, 2), (19, 1);

-- Nuevos cocodrilos
INSERT INTO reptiles_continentes (reptil_id, continente_id) VALUES
(20, 2), (21, 3), (22, 2);

-- =============================================
-- CURIOSIDADES (TODAS)
-- =============================================

-- Curiosidades originales
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(1, 'Respirador profesional', 'Los cocodrilos del Nilo pueden permanecer bajo el agua hasta 2 horas sin respirar', 'Física'),
(2, 'Tragona extrema', 'La anaconda puede pasar hasta un año sin comer después de una gran presa', 'Alimentación'),
(3, 'Cazador silencioso', 'El dragón de Komodo puede cazar presas del tamaño de un búfalo', 'Comportamiento'),
(5, 'Velocidad letal', 'La mamba negra puede matar a una persona en 20 minutos sin antídoto', 'Peligrosidad'),
(6, 'Autotomía', 'La iguana puede desprender su cola para distraer depredadores', 'Defensa'),
(7, 'Nido real', 'La cobra real es la única serpiente que construye un nido', 'Reproducción');

-- Curiosidades nuevas serpientes
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(11, 'Constrictora poderosa', 'La boa constrictor no es venenosa. Mata a sus presas apretándolas hasta que no puedan respirar.', 'Comportamiento'),
(11, 'Nodriza de crías', 'Las boas son ovovivíparas: dan a luz crías vivas en lugar de huevos.', 'Reproducción'),
(12, 'Cascabel mortal', 'El cascabel de la víbora crece cada vez que muda la piel. Puede tener hasta 10 segmentos.', 'Física'),
(12, 'Detecta el calor', 'Las víboras de cascabel tienen fosetas loreales que detectan el calor de sus presas.', 'Sentidos'),
(13, 'La más larga', 'La pitón reticulada es la serpiente más larga del mundo, puede superar los 7 metros.', 'Récords'),
(13, 'Excelente nadadora', 'Esta pitón es una gran nadadora y se ha encontrado en islas lejanas.', 'Comportamiento');

-- Curiosidades nuevas lagartos
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(14, 'Regenera su cola', 'El gecko leopardo puede soltar su cola para distraer a los depredadores y luego regenerarla.', 'Defensa'),
(14, 'Tiene párpados', 'A diferencia de otros geckos, el gecko leopardo tiene párpados móviles y puede parpadear.', 'Física'),
(15, 'Lagarto inteligente', 'El Tegu argentino es considerado uno de los lagartos más inteligentes, puede reconocer a sus dueños.', 'Comportamiento'),
(15, 'Hiberna en invierno', 'Entra en letargo durante los meses fríos, enterrándose en madrigueras.', 'Comportamiento'),
(16, 'Cola espinosa', 'Su cola está cubierta de espinas que usa para defenderse en su madriguera.', 'Defensa'),
(16, 'Come plantas', 'Es uno de los pocos lagartos del desierto que es completamente herbívoro.', 'Alimentação');

-- Curiosidades nuevas tortugas
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(17, 'Mascota popular', 'La tortuga de orejas rojas es una de las mascotas más comunes en todo el mundo.', 'Mascotas'),
(17, 'Especie invasora', 'En muchos países se considera una especie invasora porque compite con tortugas nativas.', 'Conservación'),
(18, 'Lengua con señuelo', 'La tortuga caimán tiene un apéndice en la lengua que parece un gusano para atraer peces.', 'Alimentación'),
(18, 'Mordida peligrosa', 'Su mordida puede partir un hueso humano fácilmente.', 'Peligrosidad'),
(19, 'Excavadora experta', 'La tortuga de espolones puede cavar túneles de hasta 15 metros de largo.', 'Comportamiento'),
(19, 'Tercera más grande', 'Es la tercera tortuga terrestre más grande del mundo.', 'Récords');

-- Curiosidades nuevas cocodrilos
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(20, 'Agua salada y dulce', 'El cocodrilo americano es uno de los pocos que puede vivir tanto en agua dulce como salada.', 'Hábitat'),
(20, 'Hocico alargado', 'Su hocico es más largo y delgado que el del caimán, ideal para pescar.', 'Física'),
(21, 'Hocico de pez', 'El gavial tiene el hocico más largo de todos los cocodrilos, especializado para pescar.', 'Física'),
(21, 'En peligro crítico', 'Solo quedan unos 200 ejemplares en libertad, principalmente en la India.', 'Conservación'),
(22, 'Parece que usa gafas', 'El caimán de anteojos tiene una protuberancia entre los ojos que parece un par de gafas.', 'Física'),
(22, 'Muy adaptable', 'Es la especie de caimán más común y adaptable, vive en muchos países de América.', 'Hábitat');

-- Curiosidades adicionales para reptiles originales
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(1, 'Madre protectora', 'La madre cocodrilo lleva a sus crías en la boca hasta el agua después de la eclosión.', 'Comportamiento'),
(1, 'Lagrimeo falso', 'Los cocodrilos "lloran" mientras comen, pero no es por tristeza, sino para lubricar sus ojos.', 'Física'),
(2, 'Cazadora submarina', 'La anaconda puede cazar y comer bajo el agua sin necesidad de salir a la superficie.', 'Comportamiento'),
(2, 'Gestación larga', 'El embarazo de una anaconda puede durar hasta 7 meses.', 'Reproducción'),
(3, 'Partenogénesis', 'Las hembras de dragón de Komodo pueden tener crías sin necesidad de macho.', 'Reproducción'),
(3, 'Corredor veloz', 'Pueden correr hasta 20 km/h en distancias cortas.', 'Física'),
(4, 'Viajera incansable', 'Las tortugas laúd viajan más de 16,000 km al año.', 'Comportamiento'),
(4, 'Tragamonedas', 'Confunden las bolsas de plástico con medusas y mueren al comerlas.', 'Conservación'),
(5, 'Color engañoso', 'A pesar de su nombre, la mamba negra es de color gris oliva. El interior de su boca es negro.', 'Física'),
(5, 'Vive en el suelo', 'A diferencia de otras mambas, la mamba negra vive en el suelo, no en los árboles.', 'Hábitat'),
(6, 'Buceadora experta', 'Las iguanas verdes pueden permanecer bajo el agua hasta 30 minutos.', 'Física'),
(6, 'Tercer ojo', 'Tienen un "tercer ojo" en la cabeza que detecta cambios de luz y sombras.', 'Física'),
(7, 'Come serpientes', 'La cobra real se alimenta principalmente de otras serpientes.', 'Alimentación'),
(7, 'Sonido grave', 'Su siseo es más grave que el de otras serpientes y suena como un gruñido.', 'Comportamiento'),
(8, 'Lengua rápida', 'La lengua del camaleón puede medir el doble que su cuerpo y se dispara en 0.07 segundos.', 'Física'),
(8, 'No solo camuflaje', 'Cambian de color para comunicarse, mostrar emociones y regular temperatura.', 'Comportamiento'),
(9, 'Sin depredadores', 'En las Islas Galápagos, las tortugas gigantes no tienen depredadores naturales.', 'Hábitat'),
(9, 'Famoso ejemplar', 'El famoso "Solitaria George" fue el último ejemplar de su especie.', 'Histórica'),
(10, 'Depredador tope', 'El caimán negro es el superdepredador del Amazonas, no tiene enemigos naturales.', 'Comportamiento'),
(10, 'Construye nidos grandes', 'Sus nidos pueden medir hasta 1.5 metros de altura.', 'Reproducción');

-- Curiosidades generales (sin reptil específico)
INSERT INTO curiosidades (reptil_id, titulo, descripcion, categoria) VALUES
(NULL, 'Sangre fría', 'Los reptiles son ectotermos, necesitan tomar el sol para calentar su cuerpo.', 'General'),
(NULL, 'Mudan la piel', 'Todas las serpientes mudan su piel varias veces al año, algunas lo hacen en una sola pieza.', 'General'),
(NULL, 'Huevos resistentes', 'Los huevos de los reptiles tienen cáscara coriácea o calcárea que los protege.', 'Reproducción'),
(NULL, 'Colores brillantes', 'Muchos reptiles usan colores brillantes para advertir que son venenosos.', 'Defensa');

-- =============================================
-- USUARIOS (contraseña: admin123)
-- =============================================
INSERT INTO usuarios (nombre, email, password_hash, es_admin) VALUES
('Administrador', 'admin@reptiles.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE),
('Usuario Demo', 'demo@reptiles.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', FALSE);

-- =============================================
-- VISTAS
-- =============================================

CREATE OR REPLACE VIEW vista_reptiles_completa AS
SELECT 
    r.id,
    r.nombre_comun,
    r.nombre_cientifico,
    tr.nombre AS tipo_reptil,
    r.longitud_maxima_cm,
    r.peso_maximo_kg,
    r.esperanza_vida_anos,
    r.dieta,
    r.es_venenoso,
    r.es_peligroso_para_humanos,
    r.nivel_peligrosidad,
    r.estado_conservacion,
    GROUP_CONCAT(DISTINCT h.nombre SEPARATOR ', ') AS habitats,
    GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ', ') AS continentes
FROM reptiles r
LEFT JOIN tipos_reptiles tr ON r.tipo_reptil_id = tr.id
LEFT JOIN reptiles_habitats rh ON r.id = rh.reptil_id
LEFT JOIN habitats h ON rh.habitat_id = h.id
LEFT JOIN reptiles_continentes rc ON r.id = rc.reptil_id
LEFT JOIN continentes c ON rc.continente_id = c.id
GROUP BY r.id;

CREATE OR REPLACE VIEW vista_reptiles_peligrosos AS
SELECT 
    nombre_comun,
    nombre_cientifico,
    nivel_peligrosidad,
    es_venenoso,
    dieta,
    estado_conservacion
FROM reptiles
WHERE es_peligroso_para_humanos = TRUE
ORDER BY nivel_peligrosidad DESC
LIMIT 10;

CREATE OR REPLACE VIEW vista_estadisticas_por_tipo AS
SELECT 
    tr.nombre AS tipo_reptil,
    COUNT(r.id) AS cantidad_especies,
    ROUND(AVG(r.longitud_maxima_cm), 2) AS longitud_promedio_cm,
    ROUND(AVG(r.peso_maximo_kg), 2) AS peso_promedio_kg,
    SUM(CASE WHEN r.es_venenoso THEN 1 ELSE 0 END) AS especies_venenosas,
    SUM(CASE WHEN r.es_peligroso_para_humanos THEN 1 ELSE 0 END) AS especies_peligrosas
FROM tipos_reptiles tr
LEFT JOIN reptiles r ON tr.id = r.tipo_reptil_id
GROUP BY tr.id;

-- =============================================
-- ÍNDICES
-- =============================================

CREATE INDEX idx_reptiles_nombre ON reptiles(nombre_comun);
CREATE INDEX idx_reptiles_tipo ON reptiles(tipo_reptil_id);
CREATE INDEX idx_reptiles_peligrosidad ON reptiles(nivel_peligrosidad);
CREATE INDEX idx_visitas_fecha ON estadisticas_visitas(fecha);
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- =============================================
-- VERIFICACIÓN FINAL
-- =============================================

SELECT '✅ Base de datos creada exitosamente!' AS mensaje;
SELECT COUNT(*) AS total_reptiles FROM reptiles;
SELECT COUNT(*) AS total_usuarios FROM usuarios;
SELECT COUNT(*) AS total_curiosidades FROM curiosidades;
SELECT COUNT(*) AS total_habitats FROM habitats;
SELECT COUNT(*) AS total_continentes FROM continentes;

-- Mostrar resumen de reptiles por tipo
SELECT tr.nombre AS tipo, COUNT(*) AS cantidad
FROM tipos_reptiles tr
LEFT JOIN reptiles r ON tr.id = r.tipo_reptil_id
GROUP BY tr.id;

-- Mostrar lista de todas las tablas
SHOW TABLES;