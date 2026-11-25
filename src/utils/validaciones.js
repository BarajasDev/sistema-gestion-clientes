// Reglas de validación del cliente. Funciones puras: no tocan el DOM.
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const LETRAS_CIUDAD = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.]+$/;
const FORMATO_TELEFONO = /^\+?[\d\s\-()]+$/;

const CARGOS = [
  'Propietario',
  'Gerente general',
  'Gerente de ventas',
  'Representante de ventas',
  'Agente de compras',
  'Gerente de marketing',
  'Gerente de contabilidad',
  'Asistente de ventas',
];

const PAISES = [
  'México',
  'Argentina',
  'Colombia',
  'Chile',
  'España',
  'Estados Unidos',
  'Venezuela',
  'Perú',
];

function validarEmpresa(valor, clientesExistentes) {
  const empresa = valor.trim();
  if (empresa === '') return 'La empresa es obligatoria.';
  if (empresa.length < 2 || empresa.length > 60) {
    return 'La empresa debe tener entre 2 y 60 caracteres.';
  }
  const duplicada = clientesExistentes.some(
    (c) => c.empresa.trim().toLowerCase() === empresa.toLowerCase()
  );
  if (duplicada) return 'Ya existe un cliente registrado con esta empresa.';
  return '';
}

function validarContacto(valor) {
  const contacto = valor.trim();
  if (contacto === '') return 'El contacto es obligatorio.';
  if (!SOLO_LETRAS.test(contacto) || contacto.length < 3) {
    return 'El contacto debe tener al menos 3 letras y solo letras y espacios.';
  }
  return '';
}

function validarCiudad(valor) {
  const ciudad = valor.trim();
  if (ciudad === '') return 'La ciudad es obligatoria.';
  if (!LETRAS_CIUDAD.test(ciudad) || ciudad.length < 2) {
    return 'La ciudad debe tener al menos 2 caracteres y solo letras, espacios o puntos.';
  }
  return '';
}

function validarTelefono(valor) {
  const telefono = valor.trim();
  if (telefono === '') return 'El teléfono es obligatorio.';
  if (!FORMATO_TELEFONO.test(telefono) || telefono.lastIndexOf('+') > 0) {
    return 'El teléfono solo admite dígitos, espacios, guiones, paréntesis y un + inicial.';
  }
  const digitos = telefono.replace(/\D/g, '').length;
  if (digitos < 10 || digitos > 15) {
    return 'El teléfono debe tener entre 10 y 15 dígitos.';
  }
  return '';
}

function validarCargo(valor) {
  if (valor.trim() === '') return 'Selecciona un cargo.';
  if (!CARGOS.includes(valor.trim())) return 'El cargo seleccionado no es válido.';
  return '';
}

function validarPais(valor) {
  if (valor.trim() === '') return 'Selecciona un país.';
  if (!PAISES.includes(valor.trim())) return 'El país seleccionado no es válido.';
  return '';
}

/**
 * Valida los datos de un cliente.
 * @param {Object} datos - Valores del formulario.
 * @param {Array} clientesExistentes - Clientes ya registrados.
 * @returns {{ valido: boolean, errores: Object }}
 */
export function validarCliente(datos, clientesExistentes = []) {
  const resultados = {
    empresa: validarEmpresa(datos.empresa ?? '', clientesExistentes),
    contacto: validarContacto(datos.contacto ?? ''),
    cargo: validarCargo(datos.cargo ?? ''),
    ciudad: validarCiudad(datos.ciudad ?? ''),
    pais: validarPais(datos.pais ?? ''),
    telefono: validarTelefono(datos.telefono ?? ''),
  };

  const errores = {};
  for (const campo in resultados) {
    if (resultados[campo]) errores[campo] = resultados[campo];
  }
  return { valido: Object.keys(errores).length === 0, errores };
}
