// Lectura del formulario y retroalimentación visual.
const CAMPOS = ['empresa', 'contacto', 'cargo', 'ciudad', 'pais', 'telefono'];
let temporizadorMensaje;

/**
 * Lee los valores del formulario.
 * @param {HTMLFormElement} form
 * @returns {Object}
 */
export function leerFormulario(form) {
  const datos = {};
  CAMPOS.forEach((campo) => {
    datos[campo] = form.elements[campo].value;
  });
  return datos;
}

/**
 * Muestra el error de cada campo y enfoca el primero inválido.
 * @param {Object} errores - { campo: mensaje }
 */
export function mostrarErrores(errores) {
  CAMPOS.forEach((campo) => {
    const mensaje = errores[campo];
    if (!mensaje) return;
    document.getElementById(`error-${campo}`).textContent = mensaje;
    const control = document.getElementById(campo);
    control.classList.add('invalido');
    control.setAttribute('aria-invalid', 'true');
  });
  const primero = CAMPOS.find((campo) => errores[campo]);
  if (primero) document.getElementById(primero).focus();
}

/** Quita todos los errores del formulario. */
export function limpiarErrores() {
  CAMPOS.forEach(limpiarErrorCampo);
}

/**
 * Quita el error de un solo campo.
 * @param {string} nombre
 */
export function limpiarErrorCampo(nombre) {
  const error = document.getElementById(`error-${nombre}`);
  const control = document.getElementById(nombre);
  if (!error || !control) return;
  error.textContent = '';
  control.classList.remove('invalido');
  control.removeAttribute('aria-invalid');
}

/**
 * Muestra un mensaje general. Los de éxito se ocultan solos a los 3 s.
 * @param {string} texto
 * @param {'exito'|'error'} tipo
 */
export function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById('mensaje-general');
  clearTimeout(temporizadorMensaje);
  mensaje.textContent = texto;
  mensaje.className = `mensaje-general ${tipo}`;
  mensaje.hidden = false;
  if (tipo === 'exito') {
    temporizadorMensaje = setTimeout(() => {
      mensaje.hidden = true;
    }, 3000);
  }
}
