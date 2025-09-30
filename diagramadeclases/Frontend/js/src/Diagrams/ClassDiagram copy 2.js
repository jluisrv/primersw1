// ==============================
// CONFIG GEMINI
// ==============================
const GEMINI_API_KEY = 'AIzaSyALBviExJtyUYPXvyIgolGByEDjoMVMxCM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// ==============================
// FUNCIÓN PRINCIPAL
// ==============================
const addClassDiagramPalette = function (sb, expand) {
  // ---------------------------------------
  // CELDAS REUTILIZABLES
  // ---------------------------------------
  const attributeField = new mxCell('+ nombre: tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute');
  attributeField.vertex = true;

  const methodField = new mxCell('+ metodo(param: tipo): tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method');
  methodField.vertex = true;

  const divider = new mxCell('', new mxGeometry(0, 0, 40, 8),
    'line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
  divider.vertex = true;

  function createClassNode(label, width = 160, height = 90) {
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
  // EJEMPLOS DE DIAGRAMAS
  // ---------------------------------------
  const exampleDiagrams = [
    sb.addEntry('Herencia (Ejemplo)', function () {
      const padre = createClassNode('Clase Padre');
      const hijo = createClassNode('Clase Hijo');
      hijo.geometry.x = 200; hijo.geometry.y = 120;

      const edge = new mxCell('', new mxGeometry(), 'endArrow=block;endFill=0;strokeWidth=2;html=1;');
      edge.edge = true; edge.source = hijo; edge.target = padre;

      return sb.createVertexTemplateFromCells([padre, hijo, edge], 360, 240, 'Herencia');
    }),
  ];

  sb.addPaletteFunctions('classDiagramExamples', 'Ejemplos de Diagramas de Clases', expand || false, exampleDiagrams);

  // ---------------------------------------
  // ELEMENTOS INDIVIDUALES
  // ---------------------------------------
  const individualElements = [
    sb.addEntry('Clase', function () {
      return sb.createVertexTemplateFromCells([createClassNode('Clase')], 160, 90, 'Clase');
    }),
  ];

  // =======================================
  // AGENTE INTELIGENTE GEMINI
  // =======================================
  if (typeof window !== 'undefined' && window.document) {
    const chatButton = document.createElement('button');
    chatButton.textContent = "🤖 Agente AI";
    chatButton.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      z-index: 10001; background: #1a73e8; color: white;
      border: none; padding: 12px 16px; border-radius: 50px;
      cursor: pointer; font-size: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.2s ease;
    `;
    
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

    individualElements.push(sb.addEntry('Agente Inteligente Gemini', function () {
      const agent = new mxCell('🤖 Agente Inteligente Gemini\n💡 Describe tu diagrama',
        new mxGeometry(0, 0, 240, 120),
        'shape=rectangle;rounded=1;fillColor=#e8f4f8;strokeColor=#1a73e8;strokeWidth=2;' +
        'align=center;verticalAlign=middle;fontSize=12;fontColor=#202124;fontStyle=1;' +
        'gradientColor=#d2e3fc;gradientDirection=north;shadow=1;html=1;spacing=4;spacingTop=6;'
      );
      agent.vertex = true;
      agent.clickHandler = showGeminiModal;
      return sb.createVertexTemplateFromCells([agent], 240, 120, 'Agente Inteligente Gemini');
    }));
  }

  sb.addPaletteFunctions('classDiagramElements', 'Elementos de Diagramas de Clases', expand || false, individualElements);

  // =======================================
  // MODAL Y CONEXIÓN GEMINI (MEJORADO)
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
      width:600px; max-width:90%; max-height:90vh; overflow-y:auto;
      box-shadow:0 8px 24px rgba(0,0,0,0.3);
      font-family:Roboto, Arial, sans-serif;
    `;

    modal.innerHTML = `
      <h3 style="margin-top:0; color:#1a73e8; display:flex; align-items:center; gap:8px;">
        <span>🤖</span> Agente AI - Gemini 2.0 Flash
      </h3>
      <p style="color:#5f6368; margin-top:0; font-size:14px;">
        Describe tu diagrama de clases y opcionalmente sube una imagen/icono para la clase.
      </p>

      <!-- Input de imagen -->
      <input type="file" id="gemini-image" accept="image/*" 
        style="margin-bottom:12px; padding:4px; width:100%; font-size:14px;" />

      <textarea id="gemini-prompt" placeholder="Ej: Sistema con clases Usuario, Producto, Pedido. Incluye métodos y atributos, genera código Java en 3 capas (Modelo, Servicio, Controlador)."
        style="width:100%; height:150px; margin-bottom:16px; padding:12px; font-size:14px; 
        border:1px solid #dadce0; border-radius:8px; resize:vertical;"></textarea>

      <div style="display:flex; gap:8px; justify-content:flex-end;">
        <button id="generate-diagram-btn" style="
          background:#1a73e8;color:white;padding:10px 20px;border:none;border-radius:6px;
          cursor:pointer;font-weight:500;display:flex;align-items:center;gap:6px;
        ">
          <span>⚡</span> Generar
        </button>
        <button id="close-modal" style="
          padding:10px 20px;border:1px solid #dadce0;background:white;
          border-radius:6px;cursor:pointer;color:#5f6368;
        ">Cerrar</button>
      </div>
      <div id="gemini-status" style="margin-top:16px;font-size:14px;color:#5f6368;"></div>
      <div id="preview-container" style="margin-top:16px; display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="margin:0; color:#1a73e8;">Vista previa:</h4>
          <button id="apply-diagram" style="
            background:#34a853;color:white;padding:6px 12px;border:none;border-radius:4px;
            cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;
          ">
            <span>✓</span> Aplicar
          </button>
        </div>
        <pre id="preview" style="
          margin-top:16px; font-family:monospace; background:#f8f9fa;
          padding:16px; border-radius:8px; max-height:300px; overflow:auto; 
          border:1px solid #e8eaed; white-space:pre-wrap; font-size:13px;
        "></pre>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const promptInput = modal.querySelector('#gemini-prompt');
    const imageInput = modal.querySelector('#gemini-image');
    const generateBtn = modal.querySelector('#generate-diagram-btn');
    const statusDiv = modal.querySelector('#gemini-status');
    const previewContainer = modal.querySelector('#preview-container');
    const preview = modal.querySelector('#preview');
    const applyBtn = modal.querySelector('#apply-diagram');

    setTimeout(() => promptInput.focus(), 100);

    modal.querySelector('#close-modal').onclick = () => {
      document.body.removeChild(overlay);
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });

    generateBtn.onclick = async () => {
      const prompt = promptInput.value.trim();
      if (!prompt) {
        statusDiv.textContent = "⚠️ Por favor, describe tu diagrama primero.";
        statusDiv.style.color = "#ea4335";
        return;
      }

      let imageInfo = "";
      if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        imageInfo = `\nIncluye esta imagen como referencia: ${file.name}`;
      }

      const finalPrompt = `
Eres un experto en UML y generación de código Java. 
Genera un diagrama de clases basado en: "${prompt}". 
Incluye atributos y métodos, relaciones de herencia, composición y agregación. 
Genera código Java en 3 capas (Modelo, Servicio, Controlador).
${imageInfo}
Responde solo con el código necesario, sin explicaciones.
      `;

      statusDiv.textContent = "⏳ Generando con Gemini...";
      statusDiv.style.color = "#5f6368";
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span>⏳</span> Generando...';
      previewContainer.style.display = "none";

      try {
        const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: finalPrompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 1000 }
          })
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();

        if (data.candidates?.[0]?.content?.[0]?.text) {
          const text = data.candidates[0].content[0].text;
          preview.textContent = text;
          previewContainer.style.display = "block";
          statusDiv.textContent = "✅ Diagrama generado con éxito.";
          statusDiv.style.color = "#34a853";

          applyBtn.onclick = () => {
            try {
              if (sb.graph) {
                const agentNode = new mxCell(text, new mxGeometry(50, 50, 280, 140),
                  'shape=rectangle;rounded=1;fillColor=#e8f4f8;strokeColor=#1a73e8;strokeWidth=2;' +
                  'align=center;verticalAlign=middle;fontSize=12;fontColor=#202124;fontStyle=1;' +
                  'gradientColor=#d2e3fc;gradientDirection=north;shadow=1;html=1;spacing=4;spacingTop=6;');
                agentNode.vertex = true;
                sb.graph.addCell(agentNode, sb.graph.getDefaultParent());
                document.body.removeChild(overlay);
              }
            } catch (e) {
              console.error("Error al aplicar el diagrama:", e);
              statusDiv.textContent = "❌ Error al aplicar el diagrama: " + e.message;
              statusDiv.style.color = "#ea4335";
            }
          };
        } else {
          throw new Error("Respuesta inesperada de Gemini API");
        }
      } catch (e) {
        console.error("Error llamando a Gemini API:", e);
        statusDiv.textContent = "❌ Error: " + e.message;
        statusDiv.style.color = "#ea4335";
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span>⚡</span> Generar';
      }
    };

    promptInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') generateBtn.click();
    });
  }
};

module.exports = addClassDiagramPalette;
