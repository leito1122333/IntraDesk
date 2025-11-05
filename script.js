// helper seguro para abrir URLs externas sin exponer window.opener
function openSafe(url) {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.referrerPolicy = 'no-referrer';
    // agregamos al DOM para asegurar compatibilidad y activamos el click
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    // fallback
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Submenús tipo acordeón
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenuId = btn.getAttribute('data-toggle');
      const submenu = document.getElementById(submenuId);
      document.querySelectorAll('.submenu').forEach(menu => {
        if (menu !== submenu) menu.classList.remove('open');
      });
      submenu.classList.toggle('open');
    });
  });

  // Botón Documentación (bloque reemplazado — pestañas modernas)
document.getElementById('btn-documentacion').addEventListener('click', () => {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div style="padding:20px;text-align:center;">
      <h2 style="color:#e066ff;">📘 Documentación</h2>
      <div class="tabs">
        <button class="tab-btn active" data-tab="1.1">Resolución 1.1</button>
        <button class="tab-btn" data-tab="1.2">Duplicado 1.2</button>
        <button class="tab-btn" data-tab="1.3">No contacto 1.3</button>
        <button class="tab-btn" data-tab="1.4">Brindar información 1.4</button>
        <button class="tab-btn" data-tab="1.5">Solicitud de espera 1.5</button>
      </div>
      <div id="tab-container"></div>
    </div>
  `;

  // Cargar la pestaña por defecto
  loadFormDoc('1.1');
  activarPestañas();
});

function activarPestañas() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadFormDoc(btn.getAttribute('data-tab'));
    });
  });
}

function loadFormDoc(tipo) {
  const container = document.getElementById('tab-container');

  if (!container) return;

  if (tipo === '1.1') {
    container.innerHTML = `
      <div class="form-container">
        <h3 style="color:#e066ff;text-align:center;">Resolución 1.1</h3>

        <label>Asunto:</label>
        <select id="asunto">
          <option>Seleccione una opcion...</option>
          <option>Solicitud resuelta</option>
          <option>Solicitud rechazada</option>
          <option>Fuera de alcance</option>
          <option>Informativo</option>
        </select>

        <label>Hola,</label>
        <input type="text" id="nombreSolicitante" placeholder="Nombre del solicitante">

        <label>Nos complace informarle que hemos culminado su solicitud con los siguientes datos.<br></label>
        
        <label><br>Numero del ticket:</label>
        <input type="text" id="numCaso" placeholder="Número del caso">

        <label>Estado:</label>
        <input type="text" id="estadoAuto" placeholder="Estado automático" readonly>

        <label>Descripción de la solicitud:</label>
        <input type="text" id="descripcionSolic" placeholder="Descripción de la solicitud">

        <label>Diagnóstico:</label>
        <input type="text" id="diagnostico" placeholder="Diagnóstico...">

        <label>Acciones realizadas:</label>
        <input type="text" id="accionesRealizadas" placeholder="Acciones realizadas...">

        <label><br>Evidencias:</label>

        <label><br><br></label>
        <select id="firmaResolucion">
        <br><option>Seleccione una opción...</option>
        <option>Juan Marquez</option><option>Juan Rodriguez</option><option>Helber Bejarano</option>
          <option>Ingrid Tejero</option><option>Andres Avila</option><option>Sergio Gil</option>
          <option>Jhon Rivas</option><option>Stiven Avila</option><option>Mairon Ortiz</option>
          <option>Leonardo Mendoza</option><option>Sebastian Ramirez</option><option>David Botero</option>
          <option>Leonardo Gonzalez</option><option>Valeria Pardo</option><option>David Legro</option>
          <option>Paula Mariño</option>
        </select>

        <label><b>Service Desk.</b></label>

        <div style="text-align:center;margin-top:10px;">
          <button class="btn-clear" onclick="limpiarFormularioDoc()">Limpiar formulario</button>
          <button class="btn-copy" onclick="copiarFormularioDoc()">Copiar al portapapeles</button>
        </div>
      </div>
    `;

    // enlazar comportamiento del select -> estado automático
    const asunto = document.getElementById('asunto');
    const estadoAuto = document.getElementById('estadoAuto');
    if (asunto && estadoAuto) {
      asunto.addEventListener('change', () => {
        const v = asunto.value;
        if (v === 'Solicitud resuelta') estadoAuto.value = 'Solucionado con éxito';
        else if (v === 'Solicitud rechazada' || v === 'Fuera de alcance') estadoAuto.value = 'Denegado';
        else if (v === 'Informativo') estadoAuto.value = 'Cancelado';
      });
      // disparar al cargar
      asunto.dispatchEvent(new Event('change'));
    }

  } else if (tipo === '1.2') {
    container.innerHTML = `
      <div class="form-container">
        <h3 style="color:#e066ff;text-align:center;">Duplicado 1.2</h3>

        <label>Hola,</label>
        <input type="text" id="personaDuplicado" placeholder="Nombre de la persona afectada">
        <label>Te informamos que el ticket:</label>
        <input type="text" id="ticketDuplicado" placeholder="Ticket actual">
        <label>ha sido cerrado, ya que corresponde a un duplicado del ticket:</label>
        <input type="text" id="ticketAnterior" placeholder="Ticket anterior">
        <label>La solicitud será gestionada a través del ticket anterior.</label>
 

       <Br><Br>
        <label><br></label>
        <select id="firmaDuplicado">
          <option>Seleccione una opción...</option>
          <option>Juan Marquez</option><option>Juan Rodriguez</option><option>Helber Bejarano</option>
          <option>Ingrid Tejero</option><option>Andres Avila</option><option>Sergio Gil</option>
          <option>Jhon Rivas</option><option>Stiven Avila</option><option>Mairon Ortiz</option>
          <option>Leonardo Mendoza</option><option>Sebastian Ramirez</option><option>David Botero</option>
          <option>Leonardo Gonzalez</option><option>Valeria Pardo</option><option>David Legro</option>
          <option>Paula Mariño</option>
        </select>

        <label><b>Service Desk.</b></label>

        <div style="text-align:center;margin-top:10px;">
          <button class="btn-clear" onclick="limpiarFormularioDoc()">Limpiar formulario</button>
          <button class="btn-copy" onclick="copiarFormularioDoc()">Copiar al portapapeles</button>
        </div>
      </div>
    `;
  } else if (tipo === '1.3') {
    container.innerHTML = `
      <div class="form-container">
        <h3 style="color:#e066ff;text-align:center;">No contacto 1.3</h3>

        
<label>Me pongo en contacto contigo en relación a la incidencia:</label>
  <input type="text" id="numCaso" placeholder="Número del caso"><br><br>

  <label>que reportaste el día</label>
  <input type="date" id="fechaCaso"><br><br>

  <label>
    en nuestra herramienta SMAX. Lamentablemente, a pesar de nuestros intentos, no hemos logrado establecer comunicación a través de los canales de atención que nos proporcionaste.
    <br><br>
    Dado que la comunicación es fundamental para garantizar una resolución efectiva y oportuna de las incidencias, y ante la falta de respuesta después de varios intentos, hemos tomado la decisión de cerrar este ticket.
    <br><br>
    Muchas gracias, si tienes algún tipo de consulta puedes contactarte por nuestros canales de comunicación, SMAX y WhatsApp 3112909194
    <br><br>
    Gracias por su atención y colaboración!<br>
    ¡Juntos construimos la mejor Experiencia!<br><br>
    ¡Saludos!
  </label><br><br>

           <br><br><br>
       <label><br></label> 
        <select id="firmaNoContacto">
          <option>Seleccione una opción...</option>
          <option>Juan Marquez</option><option>Juan Rodriguez</option><option>Helber Bejarano</option>
          <option>Ingrid Tejero</option><option>Andres Avila</option><option>Sergio Gil</option>
          <option>Jhon Rivas</option><option>Stiven Avila</option><option>Mairon Ortiz</option>
          <option>Leonardo Mendoza</option><option>Sebastian Ramirez</option><option>David Botero</option>
          <option>Leonardo Gonzalez</option><option>Valeria Pardo</option><option>David Legro</option>
          <option>Paula Mariño</option>
        </select>

        <label><b>Service Desk.</b></label>

        <div style="text-align:center;margin-top:10px;">
          <button class="btn-clear" onclick="limpiarFormularioDoc()">Limpiar formulario</button>
          <button class="btn-copy" onclick="copiarFormularioDoc()">Copiar al portapapeles</button>
        </div>
      </div>
    `;
  } else if (tipo === '1.4') {
    container.innerHTML = `
      <div class="form-container">
        <h3 style="color:#e066ff;text-align:center;">Brindar información 1.4</h3>

        <label>Hola,</label>
        <input type="text" id="nombreInfo" placeholder="Nombre del creador del caso">

        <label>Queremos informarte que estamos trabajando activamente en la resolución de tu solicitud.<br></label>
         <br><br>
         
        <label><Br>Estado actual:</label>
        <input type="text" id="estadoInfo" placeholder="Estado del caso">
        <br><br>

        <label><br>Si tienes alguna pregunta o inquietud, no dudes en comunicarte con nosotros.</label>
         <br><br>
        <label><br></label>
        <select id="firmaInfo">
          <option>Seleccione una opción...</option>
          <option>Juan Marquez</option><option>Juan Rodriguez</option><option>Helber Bejarano</option>
          <option>Ingrid Tejero</option><option>Andres Avila</option><option>Sergio Gil</option>
          <option>Jhon Rivas</option><option>Stiven Avila</option><option>Mairon Ortiz</option>
          <option>Leonardo Mendoza</option><option>Sebastian Ramirez</option><option>David Botero</option>
          <option>Leonardo Gonzalez</option><option>Valeria Pardo</option><option>David Legro</option>
          <option>Paula Mariño</option>
        </select>

        <label><b>Service Desk.</b></label>

        <div style="text-align:center;margin-top:10px;">
          <button class="btn-clear" onclick="limpiarFormularioDoc()">Limpiar formulario</button>
          <button class="btn-copy" onclick="copiarFormularioDoc()">Copiar al portapapeles</button>
        </div>
      </div>
    `;
  } else if (tipo === '1.5') {
    container.innerHTML = `
      <div class="form-container">
        <h3 style="color:#e066ff;text-align:center;">Solicitud en espera 1.5</h3>

        <label>¡Hola!<br></label>
        <label><br> Se solicita espera debido a </label>

        <input type="text" id="personaSoporte" placeholder="Descripcion de la espera">
         
        <label><br></label>
        <select id="firmaSoporte">
         <option>Seleccione una opción...</option> 
         <option>Juan Marquez</option><option>Juan Rodriguez</option><option>Helber Bejarano</option>
          <option>Ingrid Tejero</option><option>Andres Avila</option><option>Sergio Gil</option>
          <option>Jhon Rivas</option><option>Stiven Avila</option><option>Mairon Ortiz</option>
          <option>Leonardo Mendoza</option><option>Sebastian Ramirez</option><option>David Botero</option>
          <option>Leonardo Gonzalez</option><option>Valeria Pardo</option><option>David Legro</option>
          <option>Paula Mariño</option>
        </select>

        <label><b>Service Desk.</b></label>

        <div style="text-align:center;margin-top:10px;">
          <button class="btn-clear" onclick="limpiarFormularioDoc()">Limpiar formulario</button>
          <button class="btn-copy" onclick="copiarFormularioDoc()">Copiar al portapapeles</button>
        </div>
      </div>
    `;
  }
}

// Limpiar formulario (genérico para la sección documentación)
function limpiarFormularioDoc() {
  const panel = document.querySelector('#tab-container .form-container');
  if (!panel) return;
  panel.querySelectorAll('input').forEach(i => i.value = '');
  panel.querySelectorAll('textarea').forEach(t => t.value = '');
  panel.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
}

// Copiar formulario (genérico para la sección documentación)
function copiarFormularioDoc() {
  const panel = document.querySelector('#tab-container .form-container');
  if (!panel) return;
  let texto = '';
  panel.querySelectorAll('label, input, textarea, select').forEach(el => {
    if (el.tagName.toLowerCase() === 'label') {
      // etiqueta; la usamos como índice si viene antes del input
      texto += `${el.innerText} `;
    } else {
      // campo con valor
      if (el.value !== undefined) texto += `${el.value}\n`;
    }
  });
  navigator.clipboard.writeText(texto.trim()).then(() => alert('Contenido copiado al portapapeles ✅'));
}

  // Formularios externos
  function loadForm(type) {
    const main = document.getElementById('mainContent');
    let formURL = '';
    switch (type) {
      case 'citas':
        formURL = 'https://apps.powerapps.com/play/e/default-10a76712-94f6-46a2-9155-31bd8b76f937/a/2cdf352c-a757-4878-993e-a7fc01327f0e?tenantId=10a76712-94f6-46a2-9155-31bd8b76f937&hint=b1ff724c-7990-435d-b8c8-9da4824251c3&sourcetime=1753381314174';
        break;
      case 'soporte':
        formURL = 'https://forms.office.com/pages/responsepage.aspx?id=EmenEPaUokaRVTG9i3b5N3i-zTGtckJAh6E7aMR8tWFUOTJaS09NWUE4QzJHQVdQMFg3UVNHOUxPSS4u&route=shorturl';
        break;
      case 'buzon':
        formURL = 'https://forms.office.com/pages/responsepage.aspx?id=TU_FORMULARIO_BUZON';
        break;
    }

    if (formURL) {
      main.innerHTML = `
        <div style="text-align:center; padding:15px; background:#330033; color:#e066ff; font-weight:600;">
          ${type === 'citas' ? '🧪 Citas a laboratorio' : type === 'soporte' ? '📅Registrar turno' : '📬 Buzón de sugerencias'}
        </div>
        <iframe sandbox="allow-forms allow-scripts" referrerpolicy="no-referrer" src="${formURL}" allowfullscreen></iframe>
    `;
  }
}

// Botones externos que abren apps
document.querySelectorAll('[data-external]').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-external');
    openSafe(url);
  });
});

// Ajuste responsivo para iframes
window.addEventListener('resize', () => {
  document.querySelectorAll('iframe').forEach(f => {
    f.style.height = window.innerHeight - 150 + 'px';
  });
});

// Inicializar altura de iframes al cargar
window.dispatchEvent(new Event('resize'));
