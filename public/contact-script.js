const buttonSend = document.getElementById("send-message");
buttonSend.addEventListener("click", (event)=> {
    
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;    
    
    if(nome == "" || email == "" || message == ""){
        event.preventDefault()
        swal({
            title: "Ops!",
            text: "Verifique os campos novamente",
            icon: "error",
            buttons: {
                confirm : {text:'OK',className:'sweet-confirm'},                
            }
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
            window.location = __dirname + "/contact";
        });
    }
})