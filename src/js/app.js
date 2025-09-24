addEventListener('DOMContentLoaded', function(){
navegacionFija()
createGaleria()
highlihgtLink()
navAnimation()
})

function navegacionFija(){
    const header = document.querySelector('.header')
    const festival = document.querySelector('.sobre-festival')

    document.addEventListener('scroll', function(){
        if(festival.getBoundingClientRect().bottom < 0){
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
    })
}

function createGaleria(){
    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++){
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;
    galeria.appendChild(imagen)

    imagen.onclick = function(){
        showImage(i)
    }

}    

function showImage(i){
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;
    
    //hacer el modal
const modal = document.createElement('DIV')
modal.classList.add('modal')
modal.appendChild(imagen)

//boton para cerrar el modal

const closeModalBtn = document.createElement('BUTTON')
closeModalBtn.textContent = 'X'
closeModalBtn.classList.add('btn-close')
closeModalBtn.onclick = closeModal

//agreagar al html

const body = document.querySelector('body')
body.appendChild(modal)
body.classList.add('overflow-hidden')
modal.appendChild(closeModalBtn)

//cerrar modal
modal.onclick = closeModal

}
}

function closeModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
}

function highlihgtLink(){
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

         let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') ===  '#' + actual){
                link.classList.add('active')
            }
        })
    })
}

function navAnimation(){
    const link = document.querySelectorAll('.navegacion-principal a')

    link.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const scrollAnimate = e.target.getAttribute('href')
            const section = document.querySelector(scrollAnimate)
            section.scrollIntoView({ behavior: 'smooth'})
        } )
    }
    )
}
