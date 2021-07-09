body = document.querySelector("body");
html = document.querySelector("html");
header = document.querySelector("header");
btnMenu = document.querySelector(".nav__burger");

window.onload = function () {
  pagescroll();
};

// мобильное меню
nav = document.querySelector(".nav");
btnMenu.addEventListener("click", togglenav);
document.querySelector(".nav__menu").onclick = closenav;
function closenav() {
  header.classList.remove("nav-open");
  btnMenu.style.marginRight = "0";
  showscroll();
}
function togglenav() {
  header.classList.toggle("nav-open");
  if (header.classList.contains("nav-open")) {
    btnMenu.style.marginRight = window.innerWidth - html.offsetWidth + "px";
    hidescroll();
  } else {
    showscroll();
    btnMenu.style.marginRight = "0";
  }
}
// мобильное меню

// отключить прокрутку
function hidescroll() {
  body.style.paddingRight = window.innerWidth - html.offsetWidth + "px";
  body.style.overflow = "hidden";
}

function showscroll() {
  body.style.paddingRight = 0;
  body.style.overflow = "visible";
}

let scrolid = 0;
function togglescroll() {
  if (scrolid == 0) {
    body.style.paddingRight = window.innerWidth - html.offsetWidth + "px";
    body.style.overflow = "hidden";
    scrolid = 1;
  } else {
    body.style.paddingRight = 0;
    body.style.overflow = "visible";
    scrolid = 0;
  }
}

// отключить прокрутку

// Появление меню при прокрутке
function pagescroll() {
  header.classList.add("fixed-header"); //меняем хедер со статика на фиксед только после загрузки страници
  let pscroll = 0;
  window.addEventListener("scroll", function () {
    if ((pscroll < pageYOffset) & (pageYOffset > header.offsetHeight)) {
      header.style.transform = "translateY(-100%)"; //прячем хедер при прокрутке вниз
    } else {
      header.style.transform = "none"; //показываем хедер при прокрутке вверх
    }
    pscroll = pageYOffset;
  });
}

//Появление меню при прокрутке

//отправка формы
// let form = document.querySelectorAll('.order-form');

// const modal = document.getElementById("modal");

// function ajaxform(evt) {
//   gtag('event', 'submit', {
//     'event_category': 'Form'
//   });
//   evt.preventDefault();
//   let formstatus = this.querySelector('.formstatus');
//   formstatus.innerHTML = '<class="load-form">Соедиенеие ...';

//   let formData = {
//     desc: this.querySelector('input[name="description"]').value,
//     name: this.querySelector('input[name="name"]').value,

//     phone: this.querySelector('input[name="phone"]').value

//   };
//   console.log(formData);
//   let request = new XMLHttpRequest();

//   request.addEventListener('load', function () {

//     formstatus.innerHTML = 'Ваша заявка успешно отправлена, ожидайте звонка';

//   });

//   request.open('POST', '/mail.php', true);
//   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//   request.send('name=' + encodeURIComponent(formData.name) + '&phone=' + encodeURIComponent(formData.phone) + '&desc=' + encodeURIComponent(formData.desc));

// };

// for (i = 0; i < form.length; i++) {
//   form[i].addEventListener('submit', ajaxform);
// }
//отправка формы

// accordion

// function accordionInit (parent) {
//   window.addEventListener("load", function () {
//     const accordion = document.querySelector(parent);
//     if(accordion){
//       const items = accordion.querySelectorAll(".accordion__item");
//       const titles = accordion.querySelectorAll(".accordion__item .accordion__title");
//       console.log('2');
//       for (let i = 0; i < items.length; i++) {

//         titles[i].addEventListener('click', function(){

//           if(this.classList.contains('is-active__js')){
//             return '';
//           }
//               for (let i = 0; i < titles.length; i++) {
//                 titles[i].classList.remove('is-active__js');
//               }

//                  this.classList.add('is-active__js');
//         });
//       }
//     }
//   });
// }
//   accordionInit('.accordion-health')

// accordion

//dropdown

// function dropdown() {
//   const drop = document.querySelector(".dropdown__activator");
//   drop.addEventListener("click", function () {
//     drop.classList.toggle("dropdown_open");
//   });
// }

// try {
//   dropdown();
// } catch (e) {
//   console.log(e);
// }
//dropdown

// toggle min-img
function fullQuality(item) {
  const priority = item.dataset.priority || 0;
  setTimeout(function () {
    const webp = item.querySelector(".webp-img");
    const noWebp = item.querySelector(".nowebp-img");
    const fullWebp = webp.dataset.img;
    const fullNoWebp = noWebp.dataset.img;
    webp.srcset = fullWebp;
    noWebp.src = fullNoWebp;
  }, 1 + 300 * priority);
}
function toggleMinImg() {
  const pictures = document.querySelectorAll(".toggle-img--js");
  for (let i = 0; i < pictures.length; i++) {
    const pic = pictures[i];
    fullQuality(pic);
  }
}
toggleMinImg();
// toggle min-img
