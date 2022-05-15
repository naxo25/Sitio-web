this.load = false;

const toggleMenu = () => {
  const a = document.querySelector('.menuToggle');
  const b = document.querySelector('.navigation');
  a.classList.toggle('active');
  b.classList.toggle('active');
};

const preload = (image, url) => {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url);

  xhr.onloadend = (e) => {
    console.log('Cargar imagen en el DOM');
    image.style.background = `url(${url})`;
  };

  xhr.onprogress = (e) => console.log('Progreso: ' + e.loaded);

  xhr.onloadstart = (e) => console.log('Descargar imagen', url);

  xhr.send();
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
  header.map(link => {
    document.querySelector('.navigation').innerHTML += `
      <li>
        <a href='${link.to}'>${ link.name }</a>
      </li>
    `
  });

  /* document.querySelector('.navigation').innerHTML = items; */

  /* document.querySelector(".banner").style.background = `url('./images/fondos/vue.png')`; */

  let load;

  window.addEventListener('scroll', () => {
    const a = document.querySelector('header');
    a.classList.toggle('sticky', window.scrollY > 0);

    if (!load) {
      setTimeout(() => {
        loadAbout();
        loadPortafolio();
      }, 200);
      load = true;
    }
  });

  window.addEventListener('load', () => {
    console.log('La página ha terminado de cargarse!!');
    document.querySelector('.loader').style.opacity = '0';
    document.querySelector('#app').style.opacity = '1';

    /* preload(document.querySelector(".banner"), location.hostimages/fondos/vue.png') */
    preload(document.querySelector(".banner"), './images/fondos/vue.png');

    loadCss('https://fonts.googleapis.com/css?family=Poppins:300,500&amp;display=swap');
  });
});




const loadPortafolio = () => {
  portafolio.map(item => {
    document.querySelector('#Portafolio .conatainer').innerHTML += `<div class="serviceBox" style="--i:#fff">
      <div class="imgBox"'>
        <img loading="lazy" decoding="async" src="${item.img || noimg}">
        <!-- <img loading="lazy" decoding="async" id="1"> -->
      </div>

      <div class="content">
        <h2> ${item.Titulo} </h2>
        <p class="text">${item.parrafo}</p>
        <div class="icons">
          <a href="${item.links[0].link}" target="_blank">
            <img loading="lazy" decoding="async" src="./ico/link.svg" width="18">
          </a>
          <a v-if='item.links[1].link' href="${item.links[1].link}" target="_blank">
            <img loading="lazy" decoding="async" src="./ico/github.png" width="24">
          </a>
          <!-- $if (item.Titulo==="NaxChatApp") {
            <a href=https://github.com/naxo25/App-Chat-Quasar-VueJs-Firebase/raw/main/dist/Android/naxChat_Capacitor_1.5.2.apk target=_blank>
              <img loading="lazy" decoding="async" src="./ico/download.svg" width="20">
            </a>
          }-->
        </div>
      </div>
    </div>`
  })
};

const loadAbout = () => {
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

  icons.map(icon => {
    document.querySelector('#Redes .icon').innerHTML += `
      <div class=icon>
        <a href="${icon.href}" target="_blank">
          <img loading="lazy" decoding="async" src="./ico/${icon.ico}" width="25">
        </a>
      </div>
    `
  })
}