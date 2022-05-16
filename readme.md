## Nacholabraweb

Mi sitio web hecho con configuraciones propias desde cero usando javascript y css propio, scripts que hice en python para minificar el código. La idea es ir incorporando lo que se me ocurra (imageresizer, tests, eslint, precaching, etc).

https://nacholabraweb.000webhostapp.com/


## Setup

``` bash
yarn # install dependencies
yarn dev # serve with servor hot reload at localhost:8080
yarn build # build for production with python minification
```

# Historial

Para poder tener listo lo más rapido posible el DOM realize las siguientes configuraciones.

### Carga de imágenes sin bloquear el DOM

La carga de imágenes solo se reenderiza luego de descargarse completamente.

	const preload = (image, url) => {
	  var xhr = new XMLHttpRequest();
	  xhr.open('get', url);

	  xhr.onloadend = (e) => {
	    console.log('Imagen descargada en el DOM');
	    image.style.background = `url(${url})`;
	  };

	  xhr.onprogress = (e) => console.log('Progreso: ' + e.loaded);

	  xhr.onloadstart = (e) => console.log('Iniciando descarga de', url);

	  xhr.send();
	};

### Precarga de imágenes

	function preloadImgs(image, url) {
	  fetch(url).then(request => request.blob()).then(() => {
	    image.src = url;
	  });
	}

* https://deployando.net/2020/01/21/precargar-imagenes-javascript/
* https://www.smashingmagazine.com/2021/04/humble-img-element-core-web-vitals/

### Colas de css criticos

Uso de preload y prefetch para cargar recursos sin bloquear el dom.

	<link rel="preload" href="./style/cards.css" as="style">
	<link rel="stylesheet" type="text/css" href="./style/cards.css">

### Carga de Javascript diferido

Archivos pesados se cargan a través de promesas.

	new Promise((resolve, reject) => {
	  const script = document.createElement('script');
	  script.src = 'https://vue.global.prod.min.js';
	  script.onload = resolve;
	  script.onerror = reject;
	  document.head.appendChild(script);
	});

https://web.dev/defer-non-critical-css/


### Herramientas usadas
* VueJs
* Servor para servidor estático.
* https://pagespeed.web.dev/ para métricas de rendimiento.

### Recursos
* https://imageresizer.com/ para reducir tamaño de imágenes.
* https://loading.io/css/ logos.


### Requisitos para build 📋
* Python


## Github 📌

Uso de [GIT](https://git-scm.com/) para control de versiones.
Puedes ver los comandos que uso [aquí](https://nacholabraweb.000webhostapp.com/Tutoriales#/Github).


## Licencia 📄

Desarrollado por Ignacio Labra