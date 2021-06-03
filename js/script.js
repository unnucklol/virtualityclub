function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });;

"use strict"
/* 
// Определение устройства просмотра страницы (Мобильное или ПК)

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    },
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}
// --------------------------------------------------------------------------------

// Бургер меню


const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    }) 
}

// --------------------------------------------------------------------------------


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
            });
            e.preventDefault();
        }
    }
}

// --------------------------------------------------------------------------------
*/
let questSwiper = new Swiper('.swiper-quest', {
    wrapperClass: 'swiper-quest__wrapper',
    slideClass: 'swiper-quest__slide',

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            centeredSlides: true,
            allowTouchMove: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 0,
            allowTouchMove: true,
        },
        993: {
            slidesPerView: 3,
            spaceBetween: 15,
            allowTouchMove: false,            
        }
    },

    direction: 'horizontal',
    // Включение параллакс
    parallax: true,
    

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observeParents: true, 

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    jbserveSlideChildren: true, 


    // Навигация
    // Буллеты, текущее положение, прогрессбар
    
})
// --------------------------------------------------------------------------------

// Функционал карточки квеста-------------------------------------------

//При наведении мышью / уход мышью с элемента
const cardItems = document.querySelectorAll('.card-quest');
if (cardItems.length > 0) {
    for (index = 0; index < cardItems.length; index++) {
        let card = cardItems[index];
        card.addEventListener('mouseenter', function(e) {
            card.classList.add('_mouseover');
        });
        card.addEventListener('mouseleave', function(e) {
            card.classList.remove('_mouseover');
            let btn = card.querySelector('.card-quest__btn-about');
            let infoText = card.querySelector('.card-quest__text');
            if (btn.classList.contains('_hidden')) {
                setTimeout(function() {
                    btn.style.display = 'block';
                    btn.classList.remove('_hidden');
                    infoText.style.display = "none";
                }, 500);
            }
        });
    }
}
// при нажании на кнопку "Описание"
const cardInfoBtn = document.querySelectorAll('.card-quest__btn-about');
if (cardInfoBtn.length > 0) {
    for (index = 0; index < cardInfoBtn.length; index++) {
        let infoBtn = cardInfoBtn[index];
        let card = infoBtn.closest('.card-quest');
        let infoText = card.querySelector('.card-quest__text');
        if (card && infoText) {
            infoBtn.addEventListener('click', function(e) {
                card.classList.add('_pressed');
                infoBtn.classList.add('_hidden');
                infoBtn.style.display = "none";
                infoText.style.display = "block";
            });
        }
    }
}
//--------------------------------------------------------------------------------------;

const spoilerArray = document.querySelectorAll('[data-spoilers]');
if (spoilerArray.length > 0) {
    const spoilersRegular = Array.from(spoilerArray).filter(function (item, index, self) {
        return !item.dataset.spoilers.split(',')[0];
    });

    if (spoilersRegular.length > 0) {
        initSpoilers(spoilersRegular);
    }

}

// Инициализация
function initSpoilers(spoilerArray) {
    spoilerArray.forEach(spoilersBlock => {
        spoilersBlock.classList.add('_init');
        initSpoilersBody(spoilersBlock);
        spoilersBlock.addEventListener('click', setSpoilerAction);
    })
}

// Работа с контентом
function initSpoilersBody(spoilersBlock) {
    const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
    if (spoilerTitles.length > 0) {
        spoilerTitles.forEach(spoilerTitle => {
            spoilerTitle.removeAttribute('tabindex');
            if (!spoilerTitle.classList.contains('_active')) {
                spoilerTitle.nextElementSibling.hidden = true;
            }
            else {
                spoilerTitle.setAttribute('tabindex', '-1');
                spoilerTitle.nextElementSibling.hidden = false;
            }
        });
    }
}

function setSpoilerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
        const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
        const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
        const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
        if (!spoilersBlock.querySelectorAll('._slide').length) {
            if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
                hideSpoilerBody(spoilersBlock);
            }
            spoilerTitle.classList.toggle('_active');
            _slideToggle(spoilerTitle.nextElementSibling, 500);
        }
        e.preventDefault();
    }
}

function hideSpoilerBody(spoilersBlock) {
    const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
    if (spoilerActiveTitle) {
        _slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
}

// Slide Toggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }

        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');

        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

// Popup скрипт--------------------------------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

// Та же самая цифра, которая в transition появления попапа
const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e) {
            if (screen.width > 992) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault();
            } else {
                e.preventDefault();
            }
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        
        // для случаев если есть попап в попапе (закрывает первый)
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        // --------------------------------------------------------
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}


function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        // для проверки, если открывается попап в попапе
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

// убирает скролл + добавляет паддинги фиксированным элементам (.lock-padding)
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page-wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {

        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            console.log(el);
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;        
    }, timeout);
    
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);

}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// Определяем метод для браузеров, которые не поддерживают их
(function () {
    //проверяем поддержку
    if (!Element.prototype.closest) {
        //реализуем данный метод
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        //определяем свойство(метод)
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
