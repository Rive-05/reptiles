<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'mundo_reptiles';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
    exit;
}

// Obtener el tipo de consulta
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch($action) {
    case 'getAllReptiles':
        try {
            // Verificar si la vista existe
            $checkView = $pdo->query("SHOW TABLES LIKE 'vista_reptiles_completa'");
            if ($checkView->rowCount() > 0) {
                $stmt = $pdo->query("SELECT * FROM vista_reptiles_completa LIMIT 50");
            } else {
                // Si la vista no existe, usar la tabla principal
                $stmt = $pdo->query("SELECT id, nombre_comun, nombre_cientifico, longitud_maxima_cm, peso_maximo_kg, esperanza_vida_anos, dieta, es_venenoso, es_peligroso_para_humanos, nivel_peligrosidad, estado_conservacion FROM reptiles LIMIT 50");
            }
            $result = $stmt->fetchAll();
            echo json_encode($result);
        } catch(Exception $e) {
            echo json_encode(['error' => 'Error al obtener reptiles: ' . $e->getMessage()]);
        }
        break;
        
    case 'getReptilesByType':
        $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';
        try {
            $stmt = $pdo->prepare("
                SELECT r.*, tr.nombre as tipo_reptil 
                FROM reptiles r 
                JOIN tipos_reptiles tr ON r.tipo_reptil_id = tr.id 
                WHERE tr.nombre = ?
            ");
            $stmt->execute([$tipo]);
            echo json_encode($stmt->fetchAll());
        } catch(Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'getPeligrosos':
        try {
            $checkView = $pdo->query("SHOW TABLES LIKE 'vista_reptiles_peligrosos'");
            if ($checkView->rowCount() > 0) {
                $stmt = $pdo->query("SELECT * FROM vista_reptiles_peligrosos");
            } else {
                $stmt = $pdo->query("SELECT nombre_comun, nombre_cientifico, nivel_peligrosidad, es_venenoso, dieta FROM reptiles WHERE es_peligroso_para_humanos = TRUE ORDER BY nivel_peligrosidad DESC LIMIT 10");
            }
            echo json_encode($stmt->fetchAll());
        } catch(Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'getEstadisticas':
        try {
            $checkView = $pdo->query("SHOW TABLES LIKE 'vista_estadisticas_por_tipo'");
            if ($checkView->rowCount() > 0) {
                $stmt = $pdo->query("SELECT * FROM vista_estadisticas_por_tipo");
            } else {
                $stmt = $pdo->query("
                    SELECT 
                        tr.nombre as tipo_reptil,
                        COUNT(r.id) as cantidad_especies,
                        AVG(r.longitud_maxima_cm) as longitud_promedio_cm,
                        AVG(r.peso_maximo_kg) as peso_promedio_kg
                    FROM tipos_reptiles tr
                    LEFT JOIN reptiles r ON tr.id = r.tipo_reptil_id
                    GROUP BY tr.id
                ");
            }
            echo json_encode($stmt->fetchAll());
        } catch(Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'getCuriosidades':
        try {
            $stmt = $pdo->query("
                SELECT c.*, r.nombre_comun 
                FROM curiosidades c 
                JOIN reptiles r ON c.reptil_id = r.id 
                ORDER BY RAND() 
                LIMIT 10
            ");
            echo json_encode($stmt->fetchAll());
        } catch(Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'executeQuery':
        $query = isset($_POST['query']) ? $_POST['query'] : '';
        
        // Validar que sea una consulta SELECT (seguridad)
        $queryUpper = strtoupper(trim($query));
        if (!preg_match('/^SELECT/i', $queryUpper)) {
            echo json_encode(['success' => false, 'error' => 'Solo se permiten consultas SELECT por seguridad']);
            break;
        }
        
        // Bloquear comandos peligrosos
        $palabrasProhibidas = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'TRUNCATE', 'GRANT', 'REVOKE'];
        foreach ($palabrasProhibidas as $palabra) {
            if (strpos($queryUpper, $palabra) !== false) {
                echo json_encode(['success' => false, 'error' => 'La consulta contiene palabras prohibidas: ' . $palabra]);
                break 2;
            }
        }
        
        try {
            $stmt = $pdo->query($query);
            $result = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $result, 'count' => count($result)]);
        } catch(Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;
        
    case 'getInfo':
        $info = [
            'tablas' => [],
            'vistas' => [],
            'total_reptiles' => 0
        ];
        
        try {
            // Obtener listado de tablas
            $stmt = $pdo->query("SHOW TABLES");
            $info['tablas'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            // Obtener total de reptiles
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM reptiles");
            $info['total_reptiles'] = $stmt->fetch()['total'];
            
            echo json_encode($info);
        } catch(Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    default:
        echo json_encode([
            'error' => 'Acción no válida',
            'acciones_disponibles' => [
                'getAllReptiles',
                'getReptilesByType',
                'getPeligrosos', 
                'getEstadisticas',
                'getCuriosidades',
                'executeQuery',
                'getInfo'
            ]
        ]);
}
?>