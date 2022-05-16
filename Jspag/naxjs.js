this.load = false;

const toggleMenu = () => {
  const a = document.querySelector('.menuToggle');
  const b = document.querySelector('.navigation');
  a.classList.toggle('active');
  b.classList.toggle('active');
};

const preload = (image, url) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.responseType = "blob";

    xhr.onloadend = (e) => {
      console.log('Cargar imagen en el DOM');
      resolve(xhr.response)
      if (xhr.status === 200) {resolve(xhr.response)}
      else {reject("Loading error:" + xhr.statusText)}
      /* image.style.background = `url(${url})`; */
    };

    xhr.onprogress = (e) => console.log('Progreso: ' + e.loaded);

    xhr.onloadstart = (e) => console.log('Descargar imagen', url);

    xhr.send();
  })
};

/* const preload = (image, url) => { */
/*   fetch(url).then(request => request.blob()).then((event) => { */
/*     console.log(event.size); */
/*     console.log(event.slice()); */
/*     image.decoding = "async"; */
/*     image.style.background = `url(${url})`; */
/*   }) */
/* }; */

const loadCss = (src) => new Promise((resolve, reject) => {
  const link = document.createElement('link');
  link.href = src;
  link.rel = 'stylesheet';
  link.onload = resolve;
  link.onerror = reject;
  document.head.appendChild(link);
});

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOMContentLoaded');

/* const InitiallyHiddenElement = document.querySelector('.serviceBox') */
/* console.log(InitiallyHiddenElement.getAttribute('nax-for')) */

  /* items = []; */

  initialLoad();

  let load;

  window.addEventListener('scroll', () => {
    const a = document.querySelector('header');
    a.classList.toggle('sticky', window.scrollY > 0);

    if (!load) {
      setTimeout(() => {
        postLoad();
      }, 200);
      load = true;
    }
  });
});


  window.addEventListener('load', () => {
    console.log('La página ha terminado de cargarse!!');
    document.querySelector('.loader').style.opacity = '0';
    document.querySelector('#app').style.opacity = '1';

    /* preload(document.querySelector(".banner"), location.hostimages/fondos/vue.png') */
    preload(document.querySelector(".banner"), './images/fondos/vue.png').then(blob => { 
        console.log(URL.createObjectURL(blob))
        document.querySelector(".banner").style.background = `url(${URL.createObjectURL(blob)})`
    });
    /* document.querySelector(".banner").style.background = 'url(./images/fondos/vue.png)'; */

    loadCss('https://fonts.googleapis.com/css?family=Poppins:300,500&amp;display=swap');
  });

const initialLoad = () => {
  header.map(link => {
    document.querySelector('.navigation').innerHTML += `
      <li>
        <a href='${link.to}'>${ link.name }</a>
      </li>
    `
  });

  document.querySelector('#About').innerHTML += `
    <div class="row">
      <div class="col50">
        <h2 class="titleText"><span>A</span>cerca de mí</h2>
        <br>
        <div class="text">
          <p>
            ${desc_presentacion[0]}<br><br>
          </p>
          <p>
            ${desc_presentacion[1]}<br><br>
          </p>
        </div>
      </div>
      <div class="col50">
        <div class="imgBox">
          <img loading='lazy' src="./images/about.png" width="600" height="300">
        </div>
      </div>
    </div>
  `;
};

const postLoad = () => {
  portafolio.map(item => {
    document.querySelector('#Portafolio .conatainer').innerHTML += `<div class="serviceBox" style="--i:#fff">
      <div class="imgBox"'>
        <img loading="lazy" decoding="async" src="${item.img || noimg}" with='auto' height='auto'>
        <!-- <img loading="lazy" decoding="async" id="1" with='auto' height='auto'> -->
      </div>

      <div class="content">
        <h2> ${item.Titulo} </h2>
        <p class="text">${item.parrafo}</p>
        <div class="icons">
          ${item.links[0] ? `<a href="${item.links[0].link}" target="_blank">
            <img loading="lazy" decoding="async" src="./ico/link.svg" width="18" height="18">
          </a>` : '' }
          ${item.links[1] ? `<a href="${item.links[1].link}" target="_blank">
            <img loading="lazy" decoding="async" src="./ico/github.svg" width="20" height="20">
          </a>` : '' }
          ${item.links[2] ? `<a href="${item.links[2].link}" target="_blank">
            <img loading="lazy" decoding="async" src="./ico/download.svg" width="20" height="20">
          </a>` : '' }
        </div>
      </div>
    </div>`
  });

  icons.map(icon => {
    document.querySelector('#Redes .icon').innerHTML += `
      <div class=icon>
        <a href="${icon.href}" target="_blank">
          <img loading="lazy" decoding="async" src="./ico/${icon.ico}" width="25" height='25'>
        </a>
      </div>
    `
  })
};