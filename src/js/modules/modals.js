const modals = () => {
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, destroy = false ) {
        const trigger =  document.querySelectorAll(triggerSelector),
                modal =  document.querySelector(modalSelector),
                close =  document.querySelector(closeSelector),
                windows = document.querySelectorAll('[data-modal]'),
                scroll = calcScroll();

            
        trigger.forEach(item =>{
            item.addEventListener('click', (event)=>{
                if(event.target){
                    event.preventDefault();
                }

                btnPressed = true;


                // Если переданно true то при клике кнопка вызова модалки удалиться 
                if(destroy) {
                    item.remove();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.classList.add('modal-open');
                document.body.style.marginRight = `${scroll}px`
            });
        });

      

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`
        });

        modal.addEventListener('click', (event) =>{
            // Если передать при клике false то модалка не будет зыкрываться при клике на подложку 
            if(event.target === modal && closeClickOverlay){

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `${scroll}px`
            }
        });
    }   
    function showModalTime(selector, time){
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            })
            if(!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.classList.add('modal-open');
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
           
        },time)
    };

    function calcScroll () {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove()

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)){
                document.querySelector(selector).click();
            }
        })
    }
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true , true);
    openByScroll('.fixed-gift');
    // showModalTime('.popup-consultation', 60000)
   
};
export default modals;