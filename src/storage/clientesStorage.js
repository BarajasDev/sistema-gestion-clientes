// Persistencia de clientes en localStorage.
const CLAVE = 'gestion_clientes';

/**
 * Guarda el arreglo de clientes en localStorage.
 * @param {Array} clientes
 */
export function guardarClientes(clientes) {
  localStorage.setItem(CLAVE, JSON.stringify(clientes));
}

/**
 * Lee los clientes guardados; devuelve un arreglo vacío si no hay datos.
 * @returns {Array}
 */
export function cargarClientes() {
  return JSON.parse(localStorage.getItem(CLAVE)) ?? [];
}
