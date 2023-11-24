window.onload=()=>{
    var containerInfo=document.getElementById('containerInfo');
    var card=document.getElementById('originalCard');
    var buscar = document.getElementById('buscador');
    var main=document.querySelector('main')

        buscar.addEventListener('keyup', function(event) {
            main.innerHTML=''
            var datos;
            var valorInput = event.target.value;
            if (valorInput.length>=3){
                datos=extraerPeliculas(datos,valorInput,1)
                .then(data => {
                    datos=data;
                    imprimePeliculas(datos,card,main,containerInfo)
                    
                  })
                  .catch(error => {
                    console.error('Error en el controlador:', error);
                  });
            }
            
            
        });
}
