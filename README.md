# Sistema de Gestión de Clientes

Aplicación web para registrar y consultar clientes. Es la versión web del módulo de clientes de un sistema de manejo de inventarios, basada en el modelo `Customers` de la base Northwind.

## Tecnologías

- Vite (plantilla Vanilla)
- HTML5 semántico
- CSS3 (variables, Flexbox y Grid)
- JavaScript ES6+ con módulos
- localStorage para guardar los datos en el navegador

## Funcionalidades actuales

- Formulario de registro con 6 campos: empresa, contacto, cargo, ciudad, país y teléfono.
- Validación en JavaScript con mensajes visibles bajo cada campo.
- Detección de empresas duplicadas.
- Listado de clientes en tarjetas, con el más reciente primero.
- Contador de clientes registrados en la barra superior.
- Los datos se conservan al recargar la página (localStorage).
- Diseño responsivo: dos columnas en pantallas anchas y una columna en móviles.

## Estructura de carpetas

```
index.html                       Página principal
package.json                     Dependencias y scripts
public/favicon.svg               Icono del sitio
src/main.js                      Punto de entrada: carga datos, maneja el formulario y dibuja la vista
src/storage/clientesStorage.js   Guardar y cargar clientes en localStorage
src/utils/validaciones.js        Reglas de validación (funciones puras)
src/ui/formulario.js             Lectura del formulario y mensajes de error y éxito
src/ui/render.js                 Tarjetas de clientes y contador
src/styles/main.css              Estilos: variables, Flexbox y Grid
```

## Requisitos

- Node.js 18 o superior

## Cómo ejecutar

```bash
npm install        # instala las dependencias
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera la versión de producción en dist/
npm run preview    # sirve la versión de producción
```

## Próximas mejoras

- Edición y eliminación de clientes.
- Búsqueda y filtros.
- Carga de datos de ejemplo.

## Autor

Jahaziel Barajas Avila
