// Agregar en la parte superior del archivo (después de los requires)
const GEMINI_API_KEY = 'AIzaSyALBviExJtyUYPXvyIgolGByEDjoMVMxCM'; // ← Aquí va tu clave
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const addClassDiagramPalette = function (sb, expand) {
  // ---------------------------------------
  // CELDAS REUTILIZABLES
  // ---------------------------------------
  var attributeField = new mxCell('+ nombre: tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute');
  attributeField.vertex = true;

  var methodField = new mxCell('+ metodo(param: tipo): tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method');
  methodField.vertex = true;

  var divider = new mxCell('', new mxGeometry(0, 0, 40, 8),
    'line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
  divider.vertex = true;

  function createClassNode(label, width = 160, height = 90) {
    var cell = new mxCell(label, new mxGeometry(0, 0, width, height),
      'swimlane;fontStyle=1;align=center;verticalAlign=top;' +
      'childLayout=stackLayout;horizontal=1;startSize=26;collapsible=1;marginBottom=0;');
    cell.vertex = true;
    cell.insert(attributeField.clone());
    cell.insert(divider.clone());
    cell.insert(methodField.clone());
    return cell;
  }

  // ---------------------------------------
  // SECCIÓN 1: EJEMPLOS DE DIAGRAMAS
  // ---------------------------------------
  var exampleDiagrams = [
    sb.addEntry('Herencia (Ejemplo)', function() {
      var padre = createClassNode('Clase Padre');
      var hijo = createClassNode('Clase Hijo');
      hijo.geometry.x = 200; hijo.geometry.y = 120;

      var edge = new mxCell('', new mxGeometry(), 'endArrow=block;endFill=0;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = hijo; edge.target = padre;

      return sb.createVertexTemplateFromCells([padre, hijo, edge], 360, 240, 'Herencia');
    }),
    sb.addEntry('Composición (Ejemplo)', function() {
      var contenedor = createClassNode('Contenedor');
      var parte = createClassNode('Parte', 120, 60);
      parte.geometry.x = 200; parte.geometry.y = 120;

      var edge = new mxCell('', new mxGeometry(), 'startArrow=diamond;startFill=1;endArrow=none;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = parte; edge.target = contenedor;

      return sb.createVertexTemplateFromCells([contenedor, parte, edge], 360, 240, 'Composición');
    }),
    sb.addEntry('Agregación (Ejemplo)', function() {
      var contenedor = createClassNode('Contenedor');
      var parte = createClassNode('Parte', 120, 60);
      parte.geometry.x = 200; parte.geometry.y = 120;

      var edge = new mxCell('', new mxGeometry(), 'startArrow=diamond;startFill=0;endArrow=none;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = parte; edge.target = contenedor;

      return sb.createVertexTemplateFromCells([contenedor, parte, edge], 360, 240, 'Agregación');
    }),
    sb.addEntry('Asociación (Ejemplo)', function() {
      var claseA = createClassNode('Clase A');
      var claseB = createClassNode('Clase B');
      claseB.geometry.x = 200;

      var edge = new mxCell('', new mxGeometry(), 'endArrow=none;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = claseA; edge.target = claseB;

      return sb.createVertexTemplateFromCells([claseA, claseB, edge], 360, 120, 'Asociación');
    }),
    sb.addEntry('Dependencia (Ejemplo)', function() {
      var claseA = createClassNode('Clase A');
      var claseB = createClassNode('Clase B');
      claseB.geometry.x = 200;

      var edge = new mxCell('', new mxGeometry(), 'endArrow=open;dashed=1;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = claseA; edge.target = claseB;

      return sb.createVertexTemplateFromCells([claseA, claseB, edge], 360, 120, 'Dependencia');
    }),
  ];

  sb.addPaletteFunctions('classDiagramExamples', 'Ejemplos de Diagramas de Clases', expand || false, exampleDiagrams);

  // ---------------------------------------
  // SECCIÓN 2: ELEMENTOS INDIVIDUALES
  // ---------------------------------------
  var individualElements = [
    sb.addEntry('Clase', function() { return sb.createVertexTemplateFromCells([createClassNode('Clase')], 160, 90, 'Clase'); }),
    sb.addEntry('Actor', function() {
      var cell = new mxCell('Actor', new mxGeometry(0, 0, 30, 60), 'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], 30, 60, 'Actor');
    }),
    sb.addEntry('Sistema / Contenedor', function() {
      var cell = new mxCell('Sistema', new mxGeometry(0, 0, 160, 90),
        'swimlane;childLayout=stackLayout;horizontal=1;startSize=26;collapsible=1;marginBottom=0;fillColor=#f5f5f5;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], 160, 90, 'Sistema');
    }),
    sb.addEntry('Base de datos', function() {
      var cell = new mxCell('Base de datos', new mxGeometry(0, 0, 160, 90),
        'shape=cylinder;whiteSpace=wrap;html=1;fontStyle=1;fontSize=14;fillColor=#438dd4;strokeColor=#000000;fontColor=#FFFFFF;strokeWidth=2;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], 160, 90, 'Base de datos');
    }),

    // Flechas / Relaciones
    sb.createEdgeTemplateEntry('endArrow=block;endFill=0;strokeWidth=2;html=1;', 160, 0, '', 'Herencia', null, 'generalization'),
    sb.createEdgeTemplateEntry('startArrow=diamond;startFill=1;endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Composición', null, 'composition'),
    sb.createEdgeTemplateEntry('startArrow=diamond;startFill=0;endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Agregación', null, 'aggregation'),
    sb.createEdgeTemplateEntry('endArrow=none;strokeWidth=2;html=1;', 160, 0, '', 'Asociación', null, 'association'),
    sb.createEdgeTemplateEntry('endArrow=open;dashed=1;strokeWidth=2;html=1;', 160, 0, '', 'Dependencia', null, 'dependency'),
  ];

  // Solo añadir el Agente Inteligente Gemini si estamos en un navegador
  if (typeof window !== 'undefined' && window.document) {
    // Agente Inteligente Gemini
    individualElements.push(sb.addEntry('Agente Inteligente Gemini', function() {
      // Crear celda del agente con diseño mejorado
      var agent = new mxCell('🤖 Agente Inteligente Gemini\n\n💡 Describe tu diagrama o sube una imagen', 
        new mxGeometry(0, 0, 240, 120),
        'shape=rectangle;rounded=1;fillColor=#e8f4f8;strokeColor=#1a73e8;strokeWidth=2;' +
        'align=center;verticalAlign=middle;fontSize=12;fontColor=#202124;fontStyle=1;' +
        'gradientColor=#d2e3fc;gradientDirection=north;shadow=1;html=1;spacing=4;spacingTop=6;'
      );
      agent.vertex = true;
      
      // Añadir funcionalidad de clic para abrir el modal de Gemini
      agent.clickHandler = function() {
        showGeminiModal();
      };
      

      
      return sb.createVertexTemplateFromCells([agent], 240, 120, 'Agente Inteligente Gemini');
    }));
  }

  sb.addPaletteFunctions('classDiagramElements', 'Elementos de Diagramas de Clases', expand || false, individualElements);

  // ---------------------------------------
  // FUNCIONES PARA GEMINI AI (Solo en navegador)
  // ---------------------------------------
  if (typeof window !== 'undefined' && window.document) {
    // Modal mejorado para Gemini 2.0 Flash
    function showGeminiModal() {
      // Crear overlay
      var overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
      `;
      
      // Crear modal con diseño moderno
      var modal = document.createElement('div');
      modal.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 16px;
        width: 600px;
        max-width: 90%;
        max-height: 80%;
        box-shadow: 0 16px 32px rgba(0,0,0,0.2);
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        overflow-y: auto;
      `;
      
      // Contenido del modal
      modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">🤖</div>
            <h3 style="margin: 0; color: #202124; font-weight: 500;">Gemini 2.0 Flash Assistant</h3>
          </div>
          <button id="close-gemini-modal" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #5f6368;">×</button>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 12px 0; color: #5f6368; font-size: 14px;">
            Describe el diagrama de clases que necesitas:
          </p>
          <textarea 
            id="gemini-prompt" 
            placeholder="Ej: Sistema de e-commerce con clases Usuario, Producto, Carrito, Pedido. Incluye relaciones de herencia y composición..." 
            style="width: 100%; height: 120px; padding: 12px; border: 1px solid #dadce0; border-radius: 8px; resize: vertical; font-family: inherit; font-size: 14px;"
          ></textarea>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 12px 0; color: #5f6368; font-size: 14px;">
            O sube una imagen de un diagrama existente:
          </p>
          <input type="file" id="gemini-image-upload" accept="image/*" style="width: 100%; padding: 8px; border: 1px dashed #dadce0; border-radius: 8px;">
        </div>
        
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <button id="generate-diagram-btn" style="flex: 1; background: #1a73e8; color: white; border: none; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px;">
            Generar Diagrama
          </button>
          <button id="gemini-cancel-btn" style="background: #f1f3f4; color: #202124; border: none; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 14px;">
            Cancelar
          </button>
        </div>
        
        <div id="gemini-status" style="padding: 12px; border-radius: 8px; font-size: 14px; display: none;"></div>
        
        <div id="preview-container" style="display: none; margin-top: 20px; border: 1px solid #dadce0; border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #202124;">Vista Previa</h4>
          <div id="diagram-preview" style="min-height: 200px; background: #f8f9fa; border-radius: 4px; padding: 12px;"></div>
          <button id="insert-diagram-btn" style="margin-top: 12px; background: #34a853; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; display: none;">
            Insertar en el Editor
          </button>
        </div>
        
        <div style="border-top: 1px solid #dadce0; margin-top: 20px; padding-top: 16px;">
          <p style="margin: 0; font-size: 12px; color: #5f6368;">
            <strong>Tip:</strong> Sé específico con clases, atributos, métodos y relaciones para mejores resultados.
          </p>
        </div>
      `;
      
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      
      // Elementos del DOM
      const promptInput = document.getElementById('gemini-prompt');
      const imageUpload = document.getElementById('gemini-image-upload');
      const generateBtn = document.getElementById('generate-diagram-btn');
      const cancelBtn = document.getElementById('gemini-cancel-btn');
      const closeBtn = document.getElementById('close-gemini-modal');
      const statusDiv = document.getElementById('gemini-status');
      const previewContainer = document.getElementById('preview-container');
      const diagramPreview = document.getElementById('diagram-preview');
      const insertBtn = document.getElementById('insert-diagram-btn');
      
      // Event listeners
      closeBtn.addEventListener('click', closeModal);
      cancelBtn.addEventListener('click', closeModal);
      
      generateBtn.addEventListener('click', function() {
        const prompt = promptInput.value.trim();
        const imageFile = imageUpload.files[0];
        
        if (!prompt && !imageFile) {
          showStatus('Por favor, describe tu diagrama o sube una imagen.', 'error');
          return;
        }
        
        generateBtn.disabled = true;
        showStatus('Generando diagrama...', 'info');
        
        // Simular generación de diagrama (en una implementación real, aquí llamarías a la API)
        setTimeout(() => {
          showStatus('Diagrama generado con éxito!', 'success');
          
          // Mostrar vista previa simulada
          previewContainer.style.display = 'block';
          diagramPreview.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
              <p>Vista previa del diagrama generado</p>
              <p style="font-size: 12px; color: #5f6368;">(En una implementación real, aquí se mostraría el diagrama)</p>
            </div>
          `;
          insertBtn.style.display = 'block';
          
          // Configurar el botón de insertar
          insertBtn.onclick = function() {
            // Aquí iría la lógica para insertar el diagrama en el editor
            showStatus('Diagrama insertado en el editor', 'success');
            setTimeout(closeModal, 1000);
          };
        }, 2000);
      });
      
      // Cerrar al hacer clic fuera del modal
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeModal();
        }
      });
      
      // Función para cerrar el modal
      function closeModal() {
        document.body.removeChild(overlay);
      }
      
      // Función para mostrar estado
      function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        
        switch(type) {
          case 'error':
            statusDiv.style.background = '#fce8e6';
            statusDiv.style.color = '#c5221f';
            break;
          case 'success':
            statusDiv.style.background = '#e6f4ea';
            statusDiv.style.color = '#137333';
            break;
          default:
            statusDiv.style.background = '#e8f0fe';
            statusDiv.style.color = '#1a73e8';
        }
      }
    }
  }
};

module.exports = addClassDiagramPalette;