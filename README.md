# Instrucciones de la prueba
Esta es una prueba que permite interactuar con un visor de información geográfica.

## Configuración inicial

### Instalación y ejecución

Debe tener instalado npm o yarn en su equipo local, para la instalación de paquetes y ejecución del proyecto. Clone el proyecto en su equipo e ingrese por línea de comandos al directorio del proyecto.

### 1.1. Clone el repositorio:

```
$ git clone https://gitlab.com/pingresogeo/pruebaingreso.git
```

### 1.2. Instalación de paquetes:
Ejecute la siguiente sentencia para instalar las dependencias del proyecto:

    npm install

### 1.3. Ejecución:
Ejecute la siguiente instrucción:

    npm start

La instrucción iniciará el proyecto en su entorno local y se abrirá en el navegador.

## 2. Instrucciones de la prueba:

##El mapa debe visualizar el municipio de REPELON 

    2.1 El mapa debe estar centrado en el municipio de Repelón.

    2.2 Se debe cambiar el mapa base a otro distinto al predeterminado.
    
    2.3 El mapa debe ocupar el 100% de la pantalla.

    2.4 Agregar el minimap al mapa.

    2.5 Incluir otro plugin adicional de Leaflet para mejorar la funcionalidad del visor.

    2.6 Colocar un marker en el centro del municipio de Repelón.

    2.7 Se debe conectar al servidor de mapas con la siguiente URL:
https://gesstorservices.com/geoserver/web donde el authkey='24218beb-1da6-4f89-9a76-b7c404a5af5b'
    
    2.8 Cargar las siguientes capas en el geovisor:
        repelon:lc_terreno
        repelon:cc_sectorrural

    2.9 Al darle click a la capa de lc_terreno  se debe RESALTAR EL TERRENO y mostrar UN MODAL del predio (se debe permitir mover en el mapa) con los siguientes atributos:

    1. etiqueta
    2. area_terreno

    2.10 Crear una herramienta de impresión de PDF que permita imprimir lo que se ve en la pantalla

3. Refactorizar y depurar el codigo para que se pueda reutilizar en otros proyectos aplicando buenas practicas de programación. Comentar el codigo para que sea mas facil de entender.

4. El proyecto debe ser responsive.

## 5. Despliegue:

### 5.1. Compilación del proyecto
Para desplegar el proyecto, ejecute la siguiente instrucción:
    
    npm run build

5.2 Deseable: Despliegue del proyecto en un servidor.

### 6. Resultado esperado
6.1  Repositorio del codigo fuente con el visor funcional.
6.2  Imagen resumen del resultado.
6.3  Despliegue del proyecto



