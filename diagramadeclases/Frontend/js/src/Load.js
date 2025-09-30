/**
 * Función para abrir el guardado en localStorage
 * Muestra una lista de archivos guardados localmente y permite abrirlos o eliminarlos.
 */
function openLocalStorageSave(sb) {
  // Limpiamos el contenido del body para renderizar la ventana de guardado
  document.body.innerHTML = '';

  // Creamos un contenedor principal
  var div = document.createElement('div');
  div.style.fontFamily = 'Arial'; // Fuente por defecto

  // Si no hay archivos guardados en localStorage
  if (localStorage.length == 0) {
    // Mostramos mensaje "no hay archivos"
    window.parent.mxUtils.write(div, window.parent.mxResources.get('noFiles'));
  } else {
    // Creamos un array con las claves (nombres de archivos)
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }

    // Ordenamos las claves alfabéticamente, ignorando mayúsculas/minúsculas
    keys.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    // Iteramos sobre cada archivo guardado
    for (var i = 0; i < keys.length; i++) {
      var link = document.createElement('a'); // enlace para abrir
      link.style.fontDecoration = 'none';
      link.style.fontSize = '14pt';
      var key = keys[i]; // nombre del archivo
      window.parent.mxUtils.write(link, key); // texto del enlace
      link.setAttribute('href', 'javascript:void(0);'); // evita recarga de página
      div.appendChild(link);

      // Icono de eliminar archivo
      var img = document.createElement('span');
      img.className = 'geSprite geSprite-delete'; // clase con sprite de delete
      img.style.position = 'relative';
      img.style.cursor = 'pointer';
      img.style.display = 'inline-block';
      div.appendChild(img);

      window.parent.mxUtils.br(div); // salto de línea

      // Listener para eliminar archivo
      window.parent.mxEvent.addListener(img, 'click', (function (k) {
        return function () {
          if (window.parent.mxUtils.confirm(window.parent.mxResources.get('delete') + ' "' + k + '"?')) {
            localStorage.removeItem(k); // elimina del localStorage
            window.location.reload(); // recarga la ventana para actualizar la lista
          }
        };
      }(key)));

      // Listener para abrir archivo
      window.parent.mxEvent.addListener(link, 'click', (function (k) {
        return function () {
          try {
            window.parent.open(window.parent.location.href);
            window.parent.openFile.setData(localStorage.getItem(k), k); // carga el contenido en el editor
          } catch (e) {
            window.parent.mxUtils.alert(e.message); // alerta en caso de error
          }
        };
      }(key)));
    }
  }

  // Dos saltos de línea finales para separar del botón
  window.parent.mxUtils.br(div);
  window.parent.mxUtils.br(div);

  // Botón de cancelar
  var cancelBtn = window.parent.mxUtils.button(window.parent.mxResources.get('cancel'), function () {
    hideWindow(true); // cierra la ventana emergente
  });
  cancelBtn.className = 'geBtn';
  div.appendChild(cancelBtn);

  // Añadimos el div al body
  document.body.appendChild(div);
}

/**
 * Función para abrir guardado en el sistema de archivos
 * Permite seleccionar un archivo desde la computadora y cargarlo en el editor.
 */
function openFileSystemSave(sb) {
  document.body.innerHTML = ''; // limpiamos contenido
  var div = document.createElement('div');
  div.style.fontFamily = 'Arial';

  // Botón para elegir archivo
  var chooseBtn = window.parent.mxUtils.button('Choose File', function () {
    var uploader = document.createElement('input'); // input file
    uploader.type = 'file';
    document.body.appendChild(uploader);
    uploader.click(); // abre el explorador de archivos

    // Listener cuando el usuario selecciona un archivo
    uploader.addEventListener('change', function (event) {
      var files = uploader.files;
      var len = files.length;

      if (len) {
        var file = files[0]; // solo tomamos el primer archivo
        var fileName = files[0].name;
        var reader = new FileReader();
        reader.readAsBinaryString(file); // leemos como binario

        // Al terminar de leer
        reader.onloadend = function () {
          // Parseamos XML y cargamos el contenido en el editor
          window.parent.editorUi.editor.setGraphXml(window.parent.mxUtils.parseXml(reader.result).documentElement);
          sb.hideWindow(true); // cerramos ventana emergente
        };
      }
    }, false);

    // eliminamos el input temporal del DOM
    document.body.removeChild(uploader);
  });
  chooseBtn.className = 'geBtn';
  div.appendChild(chooseBtn);

  // Botón de cancelar
  var cancelBtn = window.parent.mxUtils.button(window.parent.mxResources.get('cancel'), function () {
    hideWindow(true);
  });
  cancelBtn.className = 'geBtn';
  div.appendChild(cancelBtn);

  // Añadimos todo al body
  document.body.appendChild(div);
}

/**
 * Función principal
 * Decide qué método de apertura/guardado usar según configuración.
 */
function main() {
  var sb = this; // referencia al objeto actual

  // Dependiendo de la configuración del Editor
  if (window.parent.Editor.useFileSystemSave) {
    openFileSystemSave(sb); // usar sistema de archivos
  } else if (window.parent.Editor.useLocalStorage) {
    openLocalStorageSave(sb); // usar localStorage
  } else {
    // Modo tradicional: abrir desde servidor vía formulario
    var editLink = document.getElementById('editLink');
    var openButton = document.getElementById('openButton');
    openButton.value = window.parent.mxResources.get(window.parent.openKey || 'open');
    var cancelButton = document.getElementById('cancelButton');
    cancelButton.value = window.parent.mxResources.get('cancel');
    var supportedText = document.getElementById('openSupported');
    supportedText.innerHTML = window.parent.mxResources.get('openSupported');
    var form = window.openForm || document.getElementById('openForm');

    form.setAttribute('action', window.parent.OPEN_URL); // URL de apertura en servidor
  }
}
  