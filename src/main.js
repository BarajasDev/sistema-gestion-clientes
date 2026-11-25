import './styles/main.css';
import { cargarClientes, guardarClientes } from './storage/clientesStorage.js';
import { validarCliente } from './utils/validaciones.js';
import {
  leerFormulario,
  mostrarErrores,
  limpiarErrores,
  limpiarErrorCampo,
  mostrarMensaje,
} from './ui/formulario.js';
import { renderizarClientes, actualizarContador } from './ui/render.js';

const form = document.getElementById('form-cliente');
const listaClientes = document.getElementById('lista-clientes');

let clientes = cargarClientes();

function actualizarVista() {
  renderizarClientes(listaClientes, clientes);
  actualizarContador(clientes.length);
}

function crearCliente(datos) {
  return {
    id: Date.now(),
    empresa: datos.empresa.trim(),
    contacto: datos.contacto.trim(),
    cargo: datos.cargo.trim(),
    ciudad: datos.ciudad.trim(),
    pais: datos.pais.trim(),
    telefono: datos.telefono.trim(),
    fechaRegistro: new Date().toLocaleDateString('es-MX'),
  };
}

function manejarSubmit(event) {
  event.preventDefault();
  limpiarErrores();

  const datos = leerFormulario(form);
  const { valido, errores } = validarCliente(datos, clientes);

  if (!valido) {
    mostrarErrores(errores);
    mostrarMensaje('Revisa los campos marcados.', 'error');
    return;
  }

  const nuevo = crearCliente(datos);
  clientes = [nuevo, ...clientes];
  guardarClientes(clientes);
  actualizarVista();

  form.reset();
  form.elements.empresa.focus();
  mostrarMensaje(`Cliente «${nuevo.empresa}» registrado correctamente.`, 'exito');
}

function manejarCambioCampo(event) {
  if (event.target.name) limpiarErrorCampo(event.target.name);
}

form.addEventListener('submit', manejarSubmit);
form.addEventListener('input', manejarCambioCampo);
form.addEventListener('change', manejarCambioCampo);

actualizarVista();
