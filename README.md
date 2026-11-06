# MdC Profes · versión web instalable (iPhone y Android)

App web (PWA) con los accesos de la Zona Profesorado del IES Miguel de Cervantes. Es la versión para iPhone de la app Android `mdc-profes`.

- Incluye los 22 accesos, favoritos, buscador, enlaces propios, ocultar y restaurar, compartir e importar listas, y la foto del horario con zoom.
- Funciona sin conexión y tiene modo oscuro.
- Los datos de cada profesor (enlaces, favoritos y horario) se guardan **solo en su dispositivo**. Esta web no recoge ni envía nada.

## Instalación en iPhone
1. Abre la dirección de la web en **Safari**.
2. Pulsa **Compartir** y elige **Añadir a pantalla de inicio** › **Añadir**.
3. Abre la app desde el icono nuevo. Añade el horario y los enlaces desde ahí: en iPhone, Safari y el icono guardan los datos por separado.

## Mantenimiento
- Los accesos del centro están al principio de `app.js`, en `DEFAULTS`. No cambies los `id`: sirven para recordar favoritos y ocultos.
- Al publicar cambios, sube la versión en `sw.js` (`VERSION`) y en `app.js`. Así cada dispositivo muestra el aviso «Hay una versión nueva · Actualizar».
- Publicación: GitHub Pages desde la rama `main`, carpeta raíz.
