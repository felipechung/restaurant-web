
const toggleButton = document.getElementsByClassName("toggle-button")[0]
const navbarLinks = document.getElementsByClassName("navbar-links")[0]
const buttonSend = document.getElementById("send-message");
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");


tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active')
        target.classList.add('active');
    })
})


toggleButton.addEventListener("click", ()=> {
    navbarLinks.classList.toggle("active")
})

buttonSend.addEventListener("click", ()=> {

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;    
    
    if(nome == "" || email == "" || message == ""){
        swal({
            title: "Ops!",
            text: "Verifique os campos novamente",
            icon: "error",
            buttons: {
                confirm : {text:'OK',className:'sweet-confirm'},                
            },
        })
    } else {
        swal({
            title: "Obrigado!",
            text: "Mensagem enviada com sucesso!",
            icon: "success",
            buttons: {
                confirm : {text:'OK',className:'sweet-confirm'},                
            },
        }).then(function() {
            window.location = "http://localhost:3000/contact";
        });
    }
})

