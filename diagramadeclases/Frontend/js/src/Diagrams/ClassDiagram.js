// ==============================
// CONFIG GEMINI
// ==============================
const GEMINI_API_KEY = 'AIzaSyB_CvcVPxbydSfQ5DZQm4gJ11__-SXDXwc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// ==============================
// FUNCIÓN PRINCIPAL MEJORADA
// ==============================
const addClassDiagramPalette = function (sb, expand) {
  // ---------------------------------------
  // CELDAS REUTILIZABLES (Optimizadas)
  // ---------------------------------------
  const attributeField = new mxCell('', new mxGeometry(0, 0, 0, 0),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute');
  attributeField.vertex = true;

  const methodField = new mxCell('', new mxGeometry(0, 0, 0, 0),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method');
  methodField.vertex = true;

  const divider = new mxCell('', new mxGeometry(0, 0, 0, 0),
    'line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
  divider.vertex = true;

  function createClassNode(label, width = 160, height = 120) {
    const cell = new mxCell(label, new mxGeometry(0, 0, width, height),
      'swimlane;fontStyle=1;align=center;verticalAlign=top;' +
      'childLayout=stackLayout;horizontal=1;startSize=26;collapsible=1;marginBottom=0;');
    cell.vertex = true;
    cell.insert(attributeField.clone());
    cell.insert(divider.clone());
    cell.insert(methodField.clone());
    return cell;
  }

  // ---------------------------------------
  // EJEMPLOS DE DIAGRAMAS (Optimizados)
  // ---------------------------------------
  const exampleDiagrams = [
    // Ejemplo: Sistema Spring Boot Completo
    sb.addEntry('Sistema Spring Boot (Ejemplo)', function () {
      const entity = createClassNode('Usuario\n---\n- id: Long\n- nombre: String\n- email: String\n---\n+ Usuario()\n+ getters/setters');
      const repository = createClassNode('UsuarioRepository\n---\n<<Interface>>\n---\n+ findAll(): List<Usuario>\n+ findById(Long): Optional<Usuario>\n+ save(Usuario): Usuario');
      const service = createClassNode('UsuarioService\n---\n- usuarioRepository: UsuarioRepository\n---\n+ findAllUsuarios(): List<Usuario>\n+ findUsuarioById(Long): Usuario\n+ saveUsuario(Usuario): Usuario');
      const controller = createClassNode('UsuarioController\n---\n- usuarioService: UsuarioService\n---\n+ getAllUsuarios(): ResponseEntity<List<Usuario>>\n+ getUsuario(Long): ResponseEntity<Usuario>\n+ createUsuario(Usuario): ResponseEntity<Usuario>');

      entity.geometry.x = 50; entity.geometry.y = 50;
      repository.geometry.x = 300; repository.geometry.y = 50;
      service.geometry.x = 50; service.geometry.y = 250;
      controller.geometry.x = 300; controller.geometry.y = 250;

      const edge1 = new mxCell('', new mxGeometry(), 'endArrow=open;dashed=1;strokeWidth=2;html=1;');
      edge1.edge = true; edge1.source = service; edge1.target = repository;

      const edge2 = new mxCell('', new mxGeometry(), 'endArrow=open;strokeWidth=2;html=1;');
      edge2.edge = true; edge2.source = controller; edge2.target = service;

      const edge3 = new mxCell('', new mxGeometry(), 'endArrow=open;dashed=1;strokeWidth=2;html=1;');
      edge3.edge = true; edge3.source = repository; edge3.target = entity;

      return sb.createVertexTemplateFromCells([entity, repository, service, controller, edge1, edge2, edge3], 600, 400, 'Arquitectura Spring Boot');
    }),


// Ejemplo: Herencia simple
  sb.addEntry('Herencia (Ejemplo)', function () {
    const padre = createClassNode('Clase Padre\n---\n+ id: int\n+ nombre: string');
    const hijo = createClassNode('Clase Hijo\n---\n+ edad: int');

    hijo.geometry.x = 220; 
    hijo.geometry.y = 160;

    const edge = new mxCell('', new mxGeometry(), 
      'endArrow=block;endFill=0;strokeWidth=2;html=1;');
    edge.edge = true; 
    edge.source = hijo; 
    edge.target = padre;

    return sb.createVertexTemplateFromCells([padre, hijo, edge], 400, 260, 'Herencia');
  }),

  // Ejemplo: Asociación simple
  sb.addEntry('Asociación (Ejemplo)', function () {
    const usuario = createClassNode('Usuario\n---\n+ id: int\n+ nombre: string');
    const pedido = createClassNode('Pedido\n---\n+ id: int\n+ fecha: Date');

    pedido.geometry.x = 240;

    const edge = new mxCell('', new mxGeometry(),
      'endArrow=open;strokeWidth=2;html=1;');
    edge.edge = true;
    edge.source = pedido;
    edge.target = usuario;

    return sb.createVertexTemplateFromCells([usuario, pedido, edge], 400, 180, 'Asociación');
  }),

  // Ejemplo: Composición
  sb.addEntry('Composición (Ejemplo)', function () {
    const auto = createClassNode('Automóvil\n---\n+ placa: string');
    const motor = createClassNode('Motor\n---\n+ potencia: int');

    motor.geometry.x = 240;

    const edge = new mxCell('', new mxGeometry(),
      'endArrow=diamond;endFill=1;strokeWidth=2;html=1;');
    edge.edge = true;
    edge.source = motor;
    edge.target = auto;

    return sb.createVertexTemplateFromCells([auto, motor, edge], 400, 180, 'Composición');
  }),

  // Ejemplo: Muchos a muchos con tabla intermedia
  sb.addEntry('Muchos a Muchos (Ejemplo)', function () {
    const alumno = createClassNode('Alumno\n---\n+ id: int\n+ nombre: string');
    const curso = createClassNode('Curso\n---\n+ id: int\n+ titulo: string');
    const inscripcion = createClassNode('Inscripción\n---\n+ fecha: Date');

    curso.geometry.x = 400;
    inscripcion.geometry.x = 200; 
    inscripcion.geometry.y = 160;

    const edge1 = new mxCell('', new mxGeometry(),
      'endArrow=open;strokeWidth=2;html=1;');
    edge1.edge = true; 
    edge1.source = inscripcion; 
    edge1.target = alumno;

    const edge2 = new mxCell('', new mxGeometry(),
      'endArrow=open;strokeWidth=2;html=1;');
    edge2.edge = true; 
    edge2.source = inscripcion; 
    edge2.target = curso;

    return sb.createVertexTemplateFromCells([alumno, curso, inscripcion, edge1, edge2], 600, 320, 'Muchos a Muchos');
  }),


// Ejemplo: Interfaz e Implementación
  sb.addEntry('Interfaz (Ejemplo)', function () {
    const interfaz = createClassNode('<<interface>>\nRepositorio\n---\n+ save(obj): void\n+ delete(id: int): void');
    const repo = createClassNode('RepositorioUsuario\n---\n+ save(obj): void\n+ delete(id: int): void');

    repo.geometry.x = 240; 
    repo.geometry.y = 160;

    const edge = new mxCell('', new mxGeometry(),
      'endArrow=block;dashed=1;endFill=0;strokeWidth=2;html=1;');
    edge.edge = true; 
    edge.source = repo; 
    edge.target = interfaz;

    return sb.createVertexTemplateFromCells([interfaz, repo, edge], 480, 280, 'Interfaz');
  
  })
  ];

  sb.addPaletteFunctions('classDiagramExamples', 'Ejemplos de Diagramas de Clases', expand || false, exampleDiagrams);

  // ---------------------------------------
  // ELEMENTOS INDIVIDUALES (Mejorados)
  // ---------------------------------------
  const individualElements = [
    sb.addEntry('Clase Spring Boot', function () {
      return sb.createVertexTemplateFromCells([
        createClassNode(
          'UsuarioEntity\n' +
          '---\n' +
          '- id: Long\n' +
          '- nombre: String\n' +
          '- email: String\n' +
          '---\n' +
          '+ UsuarioEntity()\n' +
          '+ getters/setters()\n' +
          '+ toString(): String'
        )
      ], 180, 140, 'Entidad Spring Boot');
    }),

    sb.addEntry('Repository Interface', function () {
      return sb.createVertexTemplateFromCells([
        createClassNode(
          'UsuarioRepository\n' +
          '---\n' +
          '<<Interface>>\n' +
          '---\n' +
          '+ findAll(): List<Usuario>\n' +
          '+ findById(Long): Optional<Usuario>\n' +
          '+ save(Usuario): Usuario\n' +
          '+ deleteById(Long): void'
        )
      ], 200, 140, 'Repository Interface');
    }),

 sb.addEntry('Clase', function () {
   return sb.createVertexTemplateFromCells(
     [
       createClassNode(
        'Classname\n' +
        '\n' +                 // Separador de atributos
        '+ attribute1: string\n' + // Atributo con visibilidad pública
        '# attribute2: int\n' +    // Atributo protegido
        '-------------------\n' +                 // Separador de métodos
        '+ method1(): void\n' +    // Método público
        '- method2(param: int)'    // Método privado
       )
     ],
     160,
     120,
     'Clase'
   );
 }),



//  Catálogo completo de flechas UML
// Cada entrada incluye el nombre al lado de la flecha
// Relación básica
sb.createEdgeTemplateEntry('endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Asociación', null, 'association'),

// Multiplicidades
sb.createEdgeTemplateEntry('endArrow=none;strokeWidth=2;html=1;', 160, 0, '1..*', 'Asociación 1 a muchos', null, 'association'),
sb.createEdgeTemplateEntry('endArrow=none;strokeWidth=2;html=1;', 160, 0, '0..*', 'Asociación 0 a muchos', null, 'association'),
sb.createEdgeTemplateEntry('endArrow=none;strokeWidth=2;html=1;', 160, 0, '1..1', 'Asociación 1 a 1', null, 'association'),

// Herencia y Realización
sb.createEdgeTemplateEntry('endArrow=block;endFill=0;strokeWidth=2;html=1;', 160, 0, '', 'Herencia (Generalización)', null, 'generalization'),
sb.createEdgeTemplateEntry('endArrow=block;endFill=1;strokeWidth=2;html=1;dashed=1;', 160, 0, '', 'Realización (Interface)', null, 'realization'),

// Composición y Agregación
sb.createEdgeTemplateEntry('startArrow=diamond;startFill=1;endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Composición', null, 'composition'),
sb.createEdgeTemplateEntry('startArrow=diamond;startFill=0;endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Agregación', null, 'aggregation'),

// Dependencias
sb.createEdgeTemplateEntry('endArrow=open;dashed=1;strokeWidth=2;html=1;', 160, 0, '', 'Dependencia', null, 'dependency'),

// Navegabilidad (direccionalidad en asociación)
sb.createEdgeTemplateEntry('endArrow=open;endFill=0;strokeWidth=2;html=1;', 160, 0, '', 'Navegabilidad', null, 'navigability'),

// Casos de uso
sb.createEdgeTemplateEntry('endArrow=block;endFill=1;strokeWidth=2;html=1;', 160, 0, '<<include>>', 'Inclusión', null, 'include'),
sb.createEdgeTemplateEntry('endArrow=block;endFill=0;strokeWidth=2;html=1;dashed=1;', 160, 0, '<<extend>>', 'Extensión', null, 'extend'),

// Secuencias y Mensajes
sb.createEdgeTemplateEntry('endArrow=classic;endFill=1;strokeWidth=2;html=1;', 160, 0, '', 'Mensaje / Llamada', null, 'message'),
sb.createEdgeTemplateEntry('endArrow=open;dashed=1;strokeWidth=2;html=1;', 160, 0, '', 'Llamada Asíncrona', null, 'asyncmessage'),
sb.createEdgeTemplateEntry('endArrow=oval;endFill=0;strokeWidth=2;html=1;', 160, 0, '', 'Flujo de Datos', null, 'dataflow'),

// Extra: Relaciones de paquetes y uso
sb.createEdgeTemplateEntry('endArrow=open;endFill=0;strokeWidth=2;html=1;dashed=1;', 160, 0, '<<use>>', 'Uso', null, 'use'),
sb.createEdgeTemplateEntry('endArrow=open;endFill=0;strokeWidth=2;html=1;', 160, 0, '<<import>>', 'Importación', null, 'import'),
sb.createEdgeTemplateEntry('endArrow=open;endFill=0;strokeWidth=2;html=1;', 160, 0, '<<access>>', 'Acceso', null, 'access')

  ];

  // =======================================
  // AGENTE INTELIGENTE GEMINI (COMPLETAMENTE MEJORADO)
  // =======================================
  if (typeof window !== 'undefined' && window.document) {
    // Crear botón flotante del agente AI
    const chatButton = document.createElement('button');
    chatButton.textContent = "🤖 Agente AI Spring";
    chatButton.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      z-index: 10001; background: #1a73e8; color: white;
      border: none; padding: 12px 16px; border-radius: 50px;
      cursor: pointer; font-size: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.2s ease;
      font-weight: 500;
    `;

    // Añadir efectos de hover
    chatButton.addEventListener('mouseenter', function() {
      this.style.background = '#1557b0';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });
    
    chatButton.addEventListener('mouseleave', function() {
      this.style.background = '#1a73e8';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(chatButton);
    chatButton.onclick = showGeminiModal;

    // Añadir elemento de agente a la paleta
    individualElements.push(sb.addEntry('Agente Spring AI', function () {
      const agent = new mxCell('🤖 Agente Spring AI\n🚀 Genera aplicaciones completas',
        new mxGeometry(0, 0, 240, 120),
        'shape=rectangle;rounded=1;fillColor=#e8f4f8;strokeColor=#1a73e8;strokeWidth=2;' +
        'align=center;verticalAlign=middle;fontSize=12;fontColor=#202124;fontStyle=1;' +
        'gradientColor=#d2e3fc;gradientDirection=north;shadow=1;html=1;spacing=4;spacingTop=6;'
      );
      agent.vertex = true;
      agent.clickHandler = showGeminiModal;
      return sb.createVertexTemplateFromCells([agent], 240, 120, 'Agente Spring AI');
    }));
  }

  sb.addPaletteFunctions('classDiagramElements', 'Elementos de Diagramas de Clases', expand || false, individualElements);

  // =======================================
  // FUNCIÓN MEJORADA PARA ANALIZAR IMÁGENES
  // =======================================
  async function analyzeImageWithGemini(imageFile) {
    if (!GEMINI_API_KEY) {
      return "API Key no configurada. No se puede analizar la imagen.";
    }

    try {
      // Convertir imagen a base64
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Remover el prefijo data:image/...;base64,
          const base64 = e.target.result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(imageFile);
      });

      const prompt = `
      Analiza esta imagen que representa un diagrama de software, modelo de base de datos, o arquitectura de sistema.
      
      Por favor:
      1. Identifica qué tipo de diagrama es (UML, ERD, Arquitectura, etc.)
      2. Describe los componentes principales
      3. Identifica relaciones y dependencias
      4. Extrae entidades, atributos y métodos si es aplicable
      
      Responde de manera concisa pero completa.
      `;

      const requestBody = {
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        }
      };

      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      
      const data = await res.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "No se pudo analizar la imagen. Asegúrate de que sea un diagrama claro.";
      }
    } catch (error) {
      console.error("Error analizando imagen:", error);
      return `Error al analizar imagen: ${error.message}`;
    }
  }

  // =======================================
  // MODAL MEJORADO CON GENERACIÓN SPRING BOOT
  // =======================================
  function showGeminiModal() {
    if (document.getElementById('gemini-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'gemini-modal-overlay';
    overlay.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.6); z-index:10000; display:flex;
      justify-content:center; align-items:center; backdrop-filter: blur(3px);
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
      background:white; padding:24px; border-radius:12px;
      width:900px; max-width:95%; max-height:95vh; overflow-y:auto;
      box-shadow:0 8px 24px rgba(0,0,0,0.3);
      font-family:Roboto, Arial, sans-serif;
    `;

    modal.innerHTML = `
      <h3 style="margin-top:0; color:#1a73e8; display:flex; align-items:center; gap:8px;">
        <span>🤖</span> Agente Spring AI - Generador de Aplicaciones
      </h3>
      <p style="color:#5f6368; margin-top:0; font-size:14px;">
        Elige el tipo de generación y describe tu sistema o sube un diagrama.
      </p>

      <!-- SELECTOR DE MODO DE GENERACIÓN -->
      <div style="margin-bottom:20px; background:#f8f9fa; padding:16px; border-radius:8px;">
        <label style="font-size:14px; color:#5f6368; display:block; margin-bottom:12px; font-weight:500;">
          🎯 Modo de Generación:
        </label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <label style="display:flex; align-items:center; gap:8px; padding:12px; border:2px solid #e8eaed; border-radius:6px; cursor:pointer;">
            <input type="radio" name="generation-mode" value="spring-boot" checked style="margin:0;">
            <div>
              <div style="font-weight:500;">🚀 Spring Boot Completo</div>
              <div style="font-size:12px; color:#5f6368;">Genera proyecto completo con todas las capas</div>
            </div>
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:12px; border:2px solid #e8eaed; border-radius:6px; cursor:pointer;">
            <input type="radio" name="generation-mode" value="code-only" style="margin:0;">
            <div>
              <div style="font-weight:500;">💻 Solo Código</div>
              <div style="font-size:12px; color:#5f6368;">Genera código específico basado en la descripción</div>
            </div>
          </label>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div>
          <label for="project-type" style="font-size:14px; color:#5f6368;">Tipo de Proyecto:</label>
          <select id="project-type" style="width:100%; margin-top:4px; padding:8px; font-size:14px; border:1px solid #dadce0; border-radius:6px;">
            <option value="spring-boot" selected>Spring Boot REST API</option>
            <option value="spring-data-jpa">Spring Data JPA</option>
            <option value="spring-security">Spring Security</option>
            <option value="microservices">Microservicios</option>
          </select>
        </div>
        
        <div>
          <label for="database-type" style="font-size:14px; color:#5f6368;">Base de Datos:</label>
          <select id="database-type" style="width:100%; margin-top:4px; padding:8px; font-size:14px; border:1px solid #dadce0; border-radius:6px;">
            <option value="h2" selected>H2 (Desarrollo)</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="font-size:14px; color:#5f6368; display:block; margin-bottom:8px;">
          📷 Subir diagrama/imagen (opcional):
        </label>
        <input type="file" id="gemini-image" accept="image/*" style="padding:8px; width:100%; font-size:14px; border:1px solid #dadce0; border-radius:6px;" />
        <div id="image-preview" style="margin-top:12px;"></div>
      </div>

      <div style="margin-bottom:16px;">
        <label for="gemini-prompt" style="font-size:14px; color:#5f6368; display:block; margin-bottom:8px;">
          💬 Describe tu sistema:
        </label>
        <textarea id="gemini-prompt" placeholder="Ej: 'Sistema de biblioteca con entidades Libro, Usuario, Préstamo. Libro tiene título, autor, ISBN. Usuario tiene nombre, email. Relaciones: Usuario puede tener múltiples préstamos, Libro puede estar en múltiples préstamos.'"
          style="width:100%; height:120px; padding:12px; font-size:14px; 
          border:1px solid #dadce0; border-radius:8px; resize:vertical;"></textarea>
      </div>

      <div style="display:flex; gap:8px; justify-content:flex-end; margin-bottom:16px;">
        <button id="generate-project-btn" style="
          background:#1a73e8;color:white;padding:12px 24px;border:none;border-radius:6px;
          cursor:pointer;font-weight:500;display:flex;align-items:center;gap:6px;font-size:14px;
        "><span>🚀</span> Generar</button>
        <button id="close-modal" style="
          padding:12px 20px;border:1px solid #dadce0;background:white;
          border-radius:6px;cursor:pointer;color:#5f6368;font-size:14px;
        ">Cerrar</button>
      </div>

      <div id="gemini-status" style="margin-bottom:16px;font-size:14px;padding:12px;border-radius:6px;"></div>

      <!-- CONTENEDOR PARA SPRING BOOT COMPLETO -->
      <div id="project-container" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h4 style="margin:0; color:#1a73e8;">📁 Proyecto Spring Boot Generado:</h4>
          <div style="display:flex; gap:6px;">
            <button id="copy-project" style="
              background:#4285f4;color:white;padding:6px 12px;border:none;border-radius:4px;
              cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;
            ">📋 Copiar Código</button>
            <button id="download-project" style="
              background:#fbbc05;color:white;padding:6px 12px;border:none;border-radius:4px;
              cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;
            ">📦 Descargar ZIP</button>
          </div>
        </div>
        
        <div id="file-explorer" style="
          background:#f8f9fa; border:1px solid #e8eaed; border-radius:8px; 
          margin-bottom:12px; max-height:200px; overflow-y:auto;
        ">
          <div style="background:#e8f0fe; padding:8px 12px; font-size:12px; color:#1a73e8; font-weight:500;">
            📂 Estructura del Proyecto
          </div>
          <div id="file-tree" style="padding:8px 12px; font-family:'Courier New', monospace; font-size:12px;"></div>
        </div>
        
        <div id="code-editor" style="
          border:1px solid #e8eaed; border-radius:8px; overflow:hidden;
          background:#f8f9fa; max-height:400px; overflow-y:auto;
        ">
          <div style="background:#e8f0fe; padding:8px 12px; font-size:12px; color:#1a73e8; display:flex; justify-content:space-between; align-items:center;">
            <span id="current-file">pom.xml</span>
            <div>
              <button id="prev-file" style="background:none; border:none; cursor:pointer; color:#5f6368; padding:4px;">◀</button>
              <button id="next-file" style="background:none; border:none; cursor:pointer; color:#5f6368; padding:4px;">▶</button>
            </div>
          </div>
          <pre id="code-preview" style="
            margin:0; padding:16px; font-family:'Courier New', monospace; 
            font-size:13px; line-height:1.4; white-space:pre-wrap; 
            background:#f8f9fa; min-height:200px; overflow-x:auto;
          "></pre>
        </div>
      </div>

      <!-- CONTENEDOR PARA SOLO CÓDIGO -->
      <div id="code-only-container" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h4 style="margin:0; color:#1a73e8;">💻 Código Generado:</h4>
          <div style="display:flex; gap:6px;">
            <button id="copy-code-only" style="
              background:#4285f4;color:white;padding:6px 12px;border:none;border-radius:4px;
              cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;
            ">📋 Copiar Código</button>
            <button id="download-code-only" style="
              background:#fbbc05;color:white;padding:6px 12px;border:none;border-radius:4px;
              cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;
            ">📄 Descargar Archivo</button>
          </div>
        </div>
        <div style="border:1px solid #e8eaed; border-radius:8px; overflow:hidden; background:#f8f9fa;">
          <div style="background:#e8f0fe; padding:8px 12px; font-size:12px; color:#1a73e8;">
            <span id="code-only-filename">GeneratedCode.java</span>
          </div>
          <pre id="code-only-preview" style="
            margin:0; padding:16px; font-family:'Courier New', monospace; 
            font-size:13px; line-height:1.4; white-space:pre-wrap; 
            background:#f8f9fa; min-height:300px; max-height:500px; overflow-y:auto; overflow-x:auto;
          "></pre>
        </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Elementos del DOM
    const promptInput = modal.querySelector('#gemini-prompt');
    const imageInput = modal.querySelector('#gemini-image');
    const generateBtn = modal.querySelector('#generate-project-btn');
    const statusDiv = modal.querySelector('#gemini-status');
    const projectContainer = modal.querySelector('#project-container');
    const codeOnlyContainer = modal.querySelector('#code-only-container');
    const codePreview = modal.querySelector('#code-preview');
    const codeOnlyPreview = modal.querySelector('#code-only-preview');
    const fileTree = modal.querySelector('#file-tree');
    const currentFileSpan = modal.querySelector('#current-file');
    const prevFileBtn = modal.querySelector('#prev-file');
    const nextFileBtn = modal.querySelector('#next-file');
    const copyBtn = modal.querySelector('#copy-project');
    const downloadBtn = modal.querySelector('#download-project');
    const copyCodeOnlyBtn = modal.querySelector('#copy-code-only');
    const downloadCodeOnlyBtn = modal.querySelector('#download-code-only');
    const imagePreview = modal.querySelector('#image-preview');
    const projectTypeSelect = modal.querySelector('#project-type');
    const databaseTypeSelect = modal.querySelector('#database-type');
    const generationModeRadios = modal.querySelectorAll('input[name="generation-mode"]');

    let generatedProject = null;
    let generatedCode = null;
    let currentFileIndex = 0;

    // Configurar eventos
    setTimeout(() => promptInput.focus(), 100);
    
    modal.querySelector('#close-modal').onclick = () => document.body.removeChild(overlay);
    overlay.addEventListener('click', (e) => { 
      if(e.target === overlay) document.body.removeChild(overlay); 
    });

    // Evento para cambiar modo de generación
    generationModeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        projectContainer.style.display = 'none';
        codeOnlyContainer.style.display = 'none';
      });
    });

    imageInput.addEventListener('change', async () => {
      imagePreview.innerHTML = "";
      if(imageInput.files.length > 0){
        const file = imageInput.files[0];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "200px";
        img.style.maxHeight = "150px";
        img.style.border = "1px solid #dadce0";
        img.style.borderRadius = "6px";
        img.style.marginTop = "8px";
        
        const analysisText = document.createElement("div");
        analysisText.innerHTML = "<em>🔍 Analizando diagrama...</em>";
        analysisText.style.fontSize = "12px";
        analysisText.style.color = "#5f6368";
        analysisText.style.marginTop = "8px";
        
        imagePreview.appendChild(img);
        imagePreview.appendChild(analysisText);

        // Analizar imagen con Gemini
        const analysis = await analyzeImageWithGemini(file);
        analysisText.innerHTML = `<strong>📋 Análisis del Diagrama:</strong><br>${analysis.replace(/\n/g, '<br>')}`;
        
        // Combinar con prompt existente
        if (promptInput.value) {
          promptInput.value += `\n\nAnálisis del diagrama: ${analysis}`;
        } else {
          promptInput.value = `Basado en este diagrama: ${analysis}`;
        }
      }
    });

    generateBtn.onclick = async () => {
      const prompt = promptInput.value.trim();
      if (!prompt) {
        showStatus("⚠️ Por favor, describe tu sistema o sube un diagrama.", "error");
        return;
      }

      const generationMode = document.querySelector('input[name="generation-mode"]:checked').value;
      const projectType = projectTypeSelect.value;
      const databaseType = databaseTypeSelect.value;
      
      let imageContext = "";
      if(imageInput.files.length > 0) {
        imageContext = `\n\nCONTEXTO VISUAL: Se ha proporcionado un diagrama/imagen que debe ser considerado como referencia principal.`;
      }

      let finalPrompt = "";
      
      if (generationMode === "spring-boot") {
        finalPrompt = `
Eres un experto arquitecto Spring Boot. Genera una aplicación completa basada en: "${prompt}"

REQUISITOS TÉCNICOS:
- Tipo de proyecto: ${projectType}
- Base de datos: ${databaseType}
- Java 17 o superior
- Spring Boot 3.x
- Arquitectura en capas: Controller -> Service -> Repository -> Entity
- Incluir dependencias Maven/Gradle apropiadas
- Implementar mejores prácticas y patrones de diseño

${imageContext}

GENERA LA SIGUIENTE ESTRUCTURA COMPLETA:

1. ARCHIVO DE CONFIGURACIÓN (pom.xml)
2. ENTIDADES JPA con annotations (@Entity, @Id, @GeneratedValue, relaciones)
3. REPOSITORIOS Spring Data JPA (interfaces que extienden JpaRepository)
4. SERVICIOS con lógica de negocio (@Service, transacciones)
5. CONTROLADORES REST (@RestController, @GetMapping, @PostMapping, etc.)
6. CLASE MAIN (@SpringBootApplication)
7. CONFIGURACIÓN DE BASE DE DATOS (application.properties)

FORMATO DE RESPUESTA - DEBES RESPONDER EXCLUSIVAMENTE CON UN JSON VÁLIDO:
{
  "projectName": "NombreDelProyecto",
  "files": {
    "pom.xml": "contenido completo...",
    "src/main/java/com/example/app/Application.java": "código...",
    "src/main/java/com/example/app/entity/Entidad.java": "código...",
    "src/main/java/com/example/app/repository/EntidadRepository.java": "código...",
    "src/main/java/com/example/app/service/EntidadService.java": "código...",
    "src/main/java/com/example/app/controller/EntidadController.java": "código...",
    "src/main/resources/application.properties": "configuración..."
  }
}

IMPORTANTE: No incluyas ningún texto adicional, solo el JSON válido.
        `;
      } else {
        finalPrompt = `
Eres un experto desarrollador. Genera código específico basado en: "${prompt}"

REQUISITOS:
- Lenguaje: Java/Spring Boot
- Base de datos: ${databaseType}
- Incluir todas las clases necesarias
- Código limpio y bien documentado
- Seguir mejores prácticas

${imageContext}

Genera el código completo que se necesite. Responde solo con el código, sin explicaciones adicionales.
        `;
      }

      showStatus("⏳ Generando...", "info");
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span>⏳</span> Generando...';
      projectContainer.style.display = "none";
      codeOnlyContainer.style.display = "none";

      try {
        const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: finalPrompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 4000,
              topP: 0.8,
              topK: 40
            }
          })
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        
        const data = await res.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          const responseText = data.candidates[0].content.parts[0].text;
          
          if (generationMode === "spring-boot") {
            processSpringBootResponse(responseText);
          } else {
            processCodeOnlyResponse(responseText);
          }
        } else {
          throw new Error("Formato de respuesta inesperado de la API");
        }
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        showStatus(`❌ Error: ${error.message}`, "error");
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span>🚀</span> Generar';
      }
    };

    function processSpringBootResponse(responseText) {
      try {
        // Intentar extraer JSON de diferentes formas
        let jsonText = responseText;
        
        // Intentar encontrar JSON entre ```
        const codeBlockMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
        if (codeBlockMatch) {
          jsonText = codeBlockMatch[1];
        } 
        // Intentar encontrar JSON entre {}
        else {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonText = jsonMatch[0];
          }
        }

        // Limpiar el texto JSON
        jsonText = jsonText.trim();
        
        // Parsear el JSON
        generatedProject = JSON.parse(jsonText);
        
        // Validar estructura básica
        if (!generatedProject.files || typeof generatedProject.files !== 'object') {
          throw new Error("Estructura JSON inválida: falta propiedad 'files'");
        }

        displayGeneratedProject(generatedProject);
        showStatus("✅ Proyecto Spring Boot generado exitosamente!", "success");
        
      } catch (parseError) {
        console.error("Error procesando respuesta:", parseError);
        console.log("Respuesta recibida:", responseText);
        
        // Fallback: mostrar como código simple
        generatedCode = responseText;
        showCodeOnlyResponse(responseText, "Respuesta del AI (Formato no JSON)");
        showStatus("⚠️ Se recibió respuesta pero en formato diferente al esperado", "warning");
      }
    }

    function processCodeOnlyResponse(responseText) {
      generatedCode = responseText;
      showCodeOnlyResponse(responseText, "GeneratedCode.java");
      showStatus("✅ Código generado exitosamente!", "success");
    }

    function showCodeOnlyResponse(code, filename) {
      const filenameSpan = document.querySelector('#code-only-filename');
      const codePreview = document.querySelector('#code-only-preview');
      
      filenameSpan.textContent = filename;
      codePreview.textContent = code;
      codeOnlyContainer.style.display = 'block';
    }

    function showStatus(message, type) {
      statusDiv.textContent = message;
      statusDiv.style.background = 
        type === "error" ? "#fce8e6" : 
        type === "success" ? "#e6f4ea" : 
        type === "warning" ? "#fef7e0" : "#f8f9fa";
      statusDiv.style.color = 
        type === "error" ? "#ea4335" : 
        type === "success" ? "#34a853" : 
        type === "warning" ? "#f29900" : "#5f6368";
    }

    function displayGeneratedProject(project) {
      // Mostrar árbol de archivos
      fileTree.innerHTML = '';
      Object.keys(project.files).forEach((filePath, index) => {
        const fileDiv = document.createElement('div');
        fileDiv.style.padding = '4px 8px';
        fileDiv.style.cursor = 'pointer';
        fileDiv.style.fontSize = '11px';
        fileDiv.style.borderRadius = '4px';
        fileDiv.style.margin = '2px 0';
        fileDiv.onclick = () => showFileContent(filePath, index);
        fileDiv.textContent = `📄 ${filePath}`;
        fileTree.appendChild(fileDiv);
      });

      // Mostrar primer archivo
      const firstFile = Object.keys(project.files)[0];
      showFileContent(firstFile, 0);
      
      projectContainer.style.display = 'block';
    }

    function showFileContent(filePath, index) {
      currentFileIndex = index;
      currentFileSpan.textContent = filePath;
      const content = generatedProject.files[filePath];
      
      // Mostrar contenido sin resaltado para evitar errores
      codePreview.textContent = content;
    }

    prevFileBtn.onclick = () => {
      if (!generatedProject || !generatedProject.files) return;
      const files = Object.keys(generatedProject.files);
      currentFileIndex = (currentFileIndex - 1 + files.length) % files.length;
      showFileContent(files[currentFileIndex], currentFileIndex);
    };

    nextFileBtn.onclick = () => {
      if (!generatedProject || !generatedProject.files) return;
      const files = Object.keys(generatedProject.files);
      currentFileIndex = (currentFileIndex + 1) % files.length;
      showFileContent(files[currentFileIndex], currentFileIndex);
    };

    copyBtn.onclick = () => {
      if (!generatedProject || !generatedProject.files) return;
      const files = Object.keys(generatedProject.files);
      const currentContent = generatedProject.files[files[currentFileIndex]];
      navigator.clipboard.writeText(currentContent).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ Copiado!';
        setTimeout(() => copyBtn.innerHTML = originalText, 2000);
      });
    };

    copyCodeOnlyBtn.onclick = () => {
      if (!generatedCode) return;
      navigator.clipboard.writeText(generatedCode).then(() => {
        const originalText = copyCodeOnlyBtn.innerHTML;
        copyCodeOnlyBtn.innerHTML = '✅ Copiado!';
        setTimeout(() => copyCodeOnlyBtn.innerHTML = originalText, 2000);
      });
    };

    downloadBtn.onclick = async () => {
      if (typeof JSZip === "undefined") {
        alert("JSZip no está cargado. No se puede descargar el proyecto.");
        return;
      }

      if (!generatedProject || !generatedProject.files) {
        showStatus("❌ No hay proyecto generado para descargar", "error");
        return;
      }

      try {
        const zip = new JSZip();
        const projectName = generatedProject.projectName || "SpringBootProject";

        // Agregar todos los archivos al ZIP
        Object.keys(generatedProject.files).forEach(filePath => {
          zip.file(filePath, generatedProject.files[filePath]);
        });

        // Agregar imagen si existe
        if (imageInput.files.length > 0) {
          const file = imageInput.files[0];
          const data = await file.arrayBuffer();
          zip.file(`diagramas/${file.name}`, data);
        }

        const blob = await zip.generateAsync({ type: "blob" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${projectName}.zip`;
        a.click();
        showStatus("📦 Proyecto descargado exitosamente!", "success");
      } catch (error) {
        showStatus("❌ Error generando ZIP: " + error.message, "error");
      }
    };

    downloadCodeOnlyBtn.onclick = () => {
      if (!generatedCode) {
        showStatus("❌ No hay código generado para descargar", "error");
        return;
      }
      
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'generated-code.java';
      a.click();
      showStatus("📄 Código descargado exitosamente!", "success");
    };

    promptInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') generateBtn.click();
    });
  }
};

module.exports = addClassDiagramPalette;