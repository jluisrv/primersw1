/**
 * Agrega la paleta de diagramas de clases al sidebar.
 * Contiene elementos reutilizables para diagramas UML de clases,
 * incluyendo atributos, métodos, clases, actores, sistemas, relaciones,
 * y flechas de herencia, asociación, composición y dependencia.
 * Además, puede integrarse con Gemini para recomendaciones de manera opcional.
 */

const addClassDiagramPalette = function (sb, expand) {

  // ---------------------------------------
  // CELDAS REUTILIZABLES
  // ---------------------------------------

  // Atributo genérico de clase
  var attributeField = new mxCell('+ nombre: tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;' +
    'points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute');
  attributeField.vertex = true;

  // Método genérico de clase
  var methodField = new mxCell('+ metodo(param: tipo): tipo', new mxGeometry(0, 0, 100, 26),
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;' +
    'spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;' +
    'points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method');
  methodField.vertex = true;

  // Separador horizontal
  var divider = new mxCell('', new mxGeometry(0, 0, 40, 8),
    'line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;' +
    'spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
  divider.vertex = true;

  var dt = 'uml static class ';

  // ---------------------------------------
  // FUNCIONES DE LA PALETA
  // ---------------------------------------
  var fns = [

    // Clase genérica
    sb.addEntry(dt + 'class', function () {
      var cell = new mxCell('Clase', new mxGeometry(0, 0, 160, 90),
        'swimlane;fontStyle=1;align=center;verticalAlign=top;' +
        'childLayout=stackLayout;horizontal=1;startSize=26;collapsible=1;marginBottom=0;');
      cell.vertex = true;
      cell.insert(attributeField.clone());
      cell.insert(divider.clone());
      cell.insert(methodField.clone());
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Clase');
    }),

    // Actor
    sb.addEntry('Actor', function () {
      var cell = new mxCell('Actor', new mxGeometry(0, 0, 30, 60),
        'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Actor');
    }),

    // Sistema o contenedor
    sb.addEntry('Sistema / Contenedor', function () {
      var cell = new mxCell('Sistema', new mxGeometry(0, 0, 160, 90),
        'swimlane;childLayout=stackLayout;horizontal=1;startSize=26;collapsible=1;marginBottom=0;fillColor=#f5f5f5;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Sistema');
    }),

    // Base de datos
    sb.addEntry('Base de datos', function () {
      var cell = new mxCell('Base de datos', new mxGeometry(0, 0, 160, 90),
        'shape=cylinder;whiteSpace=wrap;html=1;fontStyle=1;fontSize=14;' +
        'fillColor=#438dd4;strokeColor=#000000;fontColor=#FFFFFF;strokeWidth=2;');
      cell.vertex = true;
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Base de datos');
    }),

    // Relaciones / Flechas UML
    sb.createEdgeTemplateEntry('endArrow=block;endFill=0;html=1;strokeWidth=2;', 160, 0, '', 'Herencia', null, 'uml generalization'),
    sb.createEdgeTemplateEntry('endArrow=none;html=1;strokeWidth=2;', 160, 0, '', 'Asociación', null, 'uml association'),
    sb.createEdgeTemplateEntry('startArrow=diamond;startFill=1;endArrow=none;html=1;strokeWidth=2;', 160, 0, '', 'Composición', null, 'uml composition'),
    sb.createEdgeTemplateEntry('startArrow=diamond;startFill=0;endArrow=none;html=1;strokeWidth=2;', 160, 0, '', 'Agregación', null, 'uml aggregation'),
    sb.createEdgeTemplateEntry('endArrow=open;dashed=1;html=1;strokeWidth=2;', 160, 0, '', 'Dependencia', null, 'uml dependency')
  ];

  // ---------------------------------------
  // AGREGAR PALETA AL SIDEBAR
  // ---------------------------------------
  sb.addPaletteFunctions('classDiagram', 'Diagrama de Clases', expand || false, fns);

  // ---------------------------------------
  // GEMINI OPCIONAL
  // ---------------------------------------
  try {
    const gemini = require('gemini-api');
    if (process.env.GEMINI_API_KEY) {
      const client = new gemini.Client({ apiKey: process.env.GEMINI_API_KEY });
      async function obtenerRecomendaciones(tema) {
        try {
          const resp = await client.recommend({ input: tema, maxResults: 3 });
          console.log('Recomendaciones de Gemini:', resp);
          return resp;
        } catch (e) {
          console.warn('Gemini fallo:', e.message);
        }
      }
      // Ejemplo de llamada
      obtenerRecomendaciones("diagramas de clases UML");
    } else {
      console.log('Gemini no configurado: falta API Key en .env');
    }
  } catch (e) {
    console.log('Gemini no instalado, continuando con la paleta normalmente.');
  }
};

module.exports = addClassDiagramPalette;
