(function(){
    window.addEventListener('load', init);
    
    function init(){
        document.querySelector('body').classList.remove('no-js');
        menuToggleCollapse();
        menuActive();
        validFormContact();
        txtAreaDynamicResize();
    }

    function validFormContact() {
        let form = document.querySelector('#contact');
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            let stt = false;
            let inputs = form.querySelectorAll('input:not([type=submit]), textarea');
            let email = [];
            Array.prototype.forEach.call(inputs, input => {
               
                input.addEventListener('input', ()=>{
                    if(input.value.trim().length != 0 && document.querySelector(`#error-${input.getAttribute('id')}`) != null) {
                        document.querySelector(`#error-${input.getAttribute('id')}`).remove();
                    }
                })
                                       
                if(input.value.trim().length < 1) {
                    if(document.querySelector(`#error-${input.getAttribute('id')}`) == null) {
                        let el  = document.createElement("span");
                        let err = document.createTextNode(`* The '${input.getAttribute('id')}' field is required`)
                        el.appendChild(err);
                        el.classList.add('form-error');
                        el.setAttribute('id', `error-${input.getAttribute('id')}`);
                        (input.parentNode).insertBefore(el,input.nextElementSibling);
                    } 
                } else {
                    email[input.getAttribute('id')] = input.value;
                    stt = true;
                };
            });

            if(stt) {
                alert(`
                    Contact form with data: 
                    Name: ${email['name']}
                    Email: ${email['email']}
                    Msg: ${email['msg']}
                    is validated and can be sent =D
                `);
                Array.prototype.forEach.call(inputs, input => {
                    input.value = '';
                })
            }                
        })
    }

    function menuToggleCollapse() {
        let btnMenu = document.querySelector('#btn-menu');
        let Menu = document.querySelector(btnMenu.dataset.target);
        btnMenu.addEventListener('click',()=>{
            changeIconMenu(Menu);
        });
    }

    function changeIconMenu(Menu) {
        let btnMenu = document.querySelector('#btn-menu');
        let stt = (btnMenu.getAttribute('aria-expanded') === "true") ? true : false;
        if(window.innerWidth < 480) {
            btnMenu.setAttribute('aria-expanded', !stt);    
            btnMenu.querySelector('img').src = (stt) ? './assets/img/icons/24px.svg' : './assets/img/icons/close-24px.svg'; 
            Menu.classList.toggle('open')
        };
                        
    }

    function menuActive() {
        let Menu = document.querySelector('#navbar')
        let MenuItems = Menu.querySelectorAll('li');
        Array.prototype.forEach.call(MenuItems, MenuItem => {
            MenuItem.addEventListener('click', (e) => {
                Menu.querySelector('li.active').classList.toggle('active');                        
                e.target.parentNode.classList.toggle('active');
                changeIconMenu(Menu);
            })
        });
    }

    function txtAreaDynamicResize () {
        let txtareas = document.querySelectorAll('textarea');
        Array.prototype.forEach.call(txtareas, txtarea => {
            let initScrollHeight = txtarea.scrollHeight;
            txtarea.addEventListener('input', () => {
                window.setTimeout(() => {
                    if(txtarea.scrollHeight > initScrollHeight) {
                        txtarea.style.height = txtarea.scrollHeight+'px';
                    }
                }, 0);        
            })
        });
    }
})()