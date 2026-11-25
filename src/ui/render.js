// Dibujo de tarjetas y contador en el DOM.

/**
 * Escapa caracteres especiales para insertar texto seguro en HTML.
 * @param {string} texto
 * @returns {string}
 */
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function crearTarjetaHTML(cliente) {
  return `
    <article class="tarjeta-cliente">
      <h3 class="tarjeta-titulo">${escaparHTML(cliente.empresa)}</h3>
      <p class="tarjeta-contacto">${escaparHTML(cliente.contacto)} · ${escaparHTML(cliente.cargo)}</p>
      <p class="tarjeta-ubicacion">
        ${escaparHTML(cliente.ciudad)}
        <span class="badge">${escaparHTML(cliente.pais)}</span>
      </p>
      <p class="tarjeta-telefono">Tel. ${escaparHTML(cliente.telefono)}</p>
      <p class="tarjeta-fecha">Registrado el ${escaparHTML(cliente.fechaRegistro)}</p>
    </article>
  `;
}

/**
 * Dibuja la lista de clientes dentro del contenedor.
 * @param {HTMLElement} contenedor
 * @param {Array} clientes
 */
export function renderizarClientes(contenedor, clientes) {
  if (clientes.length === 0) {
    contenedor.className = 'lista-clientes';
    contenedor.innerHTML =
      '<p class="vacio">Aún no hay clientes registrados. Usa el formulario para agregar el primero.</p>';
    return;
  }
  contenedor.className = 'lista-clientes grid-tarjetas';
  contenedor.innerHTML = clientes.map(crearTarjetaHTML).join('');
}

/**
 * Actualiza el contador del encabezado.
 * @param {number} total
 */
export function actualizarContador(total) {
  const contador = document.getElementById('contador');
  const palabra = total === 1 ? 'cliente registrado' : 'clientes registrados';
  contador.textContent = `${total} ${palabra}`;
}
