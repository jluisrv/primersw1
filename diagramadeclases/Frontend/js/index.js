// Se asegura que todo el código se ejecute cuando la ventana cargue completamente
window.addEventListener('load', () => {

  // -----------------------------------------
  // Importaciones y constantes iniciales
  // -----------------------------------------
  // Se importa la conexión socket y el objeto io
  const { io, socket } = require('./core/watch.js');
  // Se importa la clase principal de la UI del editor
  const EditorUi = require('./src/EditorUi.js');

  // Se obtienen los parámetros de la URL (room y username)
  const params = new URL(window.location).searchParams;
  const room = params.get('room');          // Sala actual
  const username = params.get('username');  // Nombre del usuario

  // Mensajes de aviso en caso de que no exista sala o usuario
  const RoomNotFound = 'Clave de la Sala';
  const UserNotFound = 'Codigo Unico del usuario';

  // -----------------------------------------
  // Inicialización del EditorUi
  // -----------------------------------------
  // Guardamos el init original para poder extenderlo
  const editorUiInit = EditorUi.prototype.init;
  EditorUi.prototype.init = function () {
    // Llamamos al init original
    editorUiInit.apply(this, arguments);

    // Activamos exportación por defecto
    this.actions.get('export').setEnabled(true);

    // Se habilita uso de almacenamiento local y sistema de guardado
    Editor.useLocalStorage = true;
    Editor.useFileSystemSave = true;

    // Si no se usa almacenamiento local, se validan acciones que dependen del backend
    if (!Editor.useLocalStorage) {
      mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
        const enabled = req.getStatus() != 404; // Habilita si la URL responde
        ['open','import','save','saveAs','export'].forEach(action => {
          this.actions.get(action).setEnabled(enabled || Graph.fileSupport);
        });
      }));
    }

    // -----------------------------------------
    // Acción: Nuevo diagrama
    // -----------------------------------------
    this.actions.addAction('new...', function () {
      if (window.confirm("¿Estás seguro de crear un nuevo diagrama?")) {
        // Se genera un diagrama vacío con configuración inicial
        EditorUi.prototype.editor.setGraphXml(
          mxUtils.parseXml(
            `<mxGraphModel dx="667" dy="662" grid="1" gridSize="10" guides="1" 
              tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" 
              pageWidth="826" pageHeight="1169" background="#ffffff">
                <root><mxCell id="0"/><mxCell id="1" parent="0"/></root>
            </mxGraphModel>`
          ).documentElement
        );
      }
    });

    // -----------------------------------------
    // Acción: Guardar diagrama
    // -----------------------------------------
    this.actions.addAction('save', function () {
      if (window.confirm('¿Estás seguro de guardar el diagrama?')) {
        // Se envía evento al servidor para guardar diagrama
        socket.emit('save_component', { room });
      }
    });

    // -----------------------------------------
    // Escucha de cambios en el gráfico
    // -----------------------------------------
    const graphChangeListener = EditorUi.prototype.editor.graphChangeListener;
    EditorUi.prototype.editor.graphChangeListener = function (sender, eventObject) {
      graphChangeListener.apply(this, arguments);

      // Si se detecta acción de puntero o tecla eliminar, se emite cambio al servidor
      if ((event && event.pointerType) || (event && ['Delete','Backspace'].includes(event.key))) {
        const xmlString = new XMLSerializer().serializeToString(EditorUi.prototype.editor.getGraphXml());
        socket.emit('draw_component', { room, xml: xmlString });
      }
    }

    // Centrar footer
    this.footerContainer.style.textAlign = 'center';

    // Validar parámetros de sala y usuario
    if (room && username) {
      socket.emit('login', { name: username, room });
    } else {
      const footerMessage = (room && !username) 
        ? UserNotFound
        : (!room && username)
          ? RoomNotFound
          : `${UserNotFound} y ${RoomNotFound}`;
      this.footerContainer.innerHTML = `<strong>AVISO: ${footerMessage} no encontrado. MODO SOLITARIO</strong>`;
    }
  };

  // -----------------------------------------
  // Extensión de clic en ítem de la barra lateral
  // -----------------------------------------
  const itemClickedOriginal = EditorUi.prototype.sidebar.prototype.itemClicked;
  EditorUi.prototype.sidebar.prototype.itemClicked = function(cells, ds, evt, elt){
    itemClickedOriginal.apply(this, arguments);
    // Emitir cambios al servidor cada vez que se hace clic en un elemento del sidebar
    const xmlString = new XMLSerializer().serializeToString(this.editorUi.editor.getGraphXml());
    socket.emit('draw_component', { room, xml: xmlString });
  }

  // -----------------------------------------
  // Carga de recursos y temas
  // -----------------------------------------
  mxResources.loadDefaultBundle = false;
  const bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

  mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
    // Parsear recursos de idioma
    mxResources.parse(xhr[0].getText());
    const themes = { [Graph.prototype.defaultThemeName]: xhr[1].getDocumentElement() };
    new EditorUi(new Editor(urlParams.chrome == '0', themes));

    // Agregar título para usuarios conectados
    const usersTitle = document.createElement('a');
    usersTitle.className = 'geTitle';
    usersTitle.style.paddingLeft = '7%';
    usersTitle.innerText = 'Usuarios Conectados';
    EditorUi.prototype.sidebarContainer.appendChild(usersTitle);

  }, function () {
    // Mensaje en caso de error cargando recursos
    document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
  });

  // -----------------------------------------
  // Función auxiliar para mostrar toast
  // -----------------------------------------
  function showToast(message, type = 'success') {
    const colors = {
      success: ['green-100','green-400','green-700','bx-check-circle'],
      error: ['red-100','red-400','red-700','bx-error-circle']
    }
    const [bg, border, text, icon] = colors[type];
    const container = document.createElement('div');
    container.className = `max-w-md mx-auto mt-4 flex items-center gap-3 bg-${bg} border border-${border} text-${text} px-4 py-3 rounded-lg shadow relative`;
    container.innerHTML = `<i class="bx ${icon} text-xl"></i>
      <span class="flex-1 text-sm">${message}</span>
      <button type="button" onclick="this.parentElement.remove()" class="text-${text} hover:text-${border}">
        <i class="bx bx-x text-lg"></i>
      </button>`;
    document.body.appendChild(container);
  }

  // -----------------------------------------
  // Eventos del cliente socket
  // -----------------------------------------
  socket.on('connect', () => {

    // Escuchar cambios de diagrama emitidos por otros
    socket.on('draw_component', (data) => {
      if (data.xml) {
        EditorUi.prototype.editor.setGraphXml(mxUtils.parseXml(data.xml).documentElement);
      }
    });

    // Cargar título de sala
    socket.on('load_room_title', (data) => {
      const title = document.createElement('a');
      title.className = 'geTitle';
      title.innerHTML = `<center style="margin-right:10%;"><strong>${data.title.trim().toUpperCase()}</strong></center>`;
      EditorUi.prototype.sidebarContainer.insertBefore(title, EditorUi.prototype.sidebarContainer.firstChild);
    });

    // Actualizar usuarios conectados
    socket.on('reload_users_room', (data) => {
      const container = EditorUi.prototype.sidebarContainer;

      data.users.forEach(user => {
        if (!document.getElementById(user.id)) {
          const client = document.createElement('div');
          client.className = 'geTitle';
          client.id = user.id;
          client.style.paddingLeft = '13%';
          client.innerHTML = `<i class="fa fa-user" style="margin-right:5%;"></i>${user.name}`;
          container.appendChild(client);
        }
      });

      // Bot: mensaje de bienvenida al último usuario
      const lastUser = data.users[data.users.length - 1];
      if (lastUser) {
        const botDiv = document.createElement('div');
        botDiv.className = 'geTitle';
        botDiv.style = 'padding-left:13%; color:#2563eb; font-style: italic;';
        botDiv.innerHTML = `<i class="bx bx-robot"></i> BOT: Bienvenido ${lastUser.name} a la sala!`;
        container.appendChild(botDiv);
      }
    });

    // Remover usuario desconectado
    socket.on('remove_user_room', (data) => {
      const element = document.getElementById(data.userToRemove.id);
      if (element) element.remove();
    });

    // Mostrar error de servidor
    socket.on('error_server', () => {
      EditorUi.prototype.footerContainer.innerHTML = '<strong>AVISO: Error al traer datos del Servidor. MODO SOLITARIO</strong>';
    });

    // Mostrar respuesta de guardado
    socket.on('save_response', (data) => {
      showToast(data.message, data.success ? 'success' : 'error');
    });
  });

});
