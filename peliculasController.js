window.onload=()=>{
    var containerInfo=document.getElementById('containerInfo');
    var card=document.getElementById('originalCard');
    var buscar = document.getElementById('buscador');
    var main=document.querySelector('main')
    var contador;
    var spinner = document.getElementById('spinner');
    spinner.style.display='none'
    var portada=document.getElementById('portada');
    var portadaClon=portada.cloneNode(true);
    var timeoutId=null
    
    main.appendChild(portadaClon);

        buscar.addEventListener('keyup', function(event) {
          window.scrollTo({
            top: 0,
            behavior: 'auto' 
          });
          
            contador=1;
            var cargando=false
            var datos;
            var valorInput = event.target.value;
            
            var button=document.getElementById('crearInforme')
            if (valorInput.length>=3){
              if(timeoutId){
                clearTimeout(timeoutId);
              }
              if(!button){
                creaButton('crearInforme','Crear informe');
              }
              var button=document.getElementById('crearInforme')
              button.addEventListener('click',mostrarInforme);
              main.innerHTML=''

              timeoutId = setTimeout(()=>{
                datos=extraerPeliculas(datos,valorInput,contador++)
                .then(data => {
                    datos=data;
                    imprimePeliculas(datos,card,main,containerInfo,true)
                    
                  })
                  .catch(error => {
                    console.error('Error en el controlador:', error);
                  });
              }, 1000);
                
                  
                    window.addEventListener('scroll', ()=>{
                      var datos;
                      if (document.body.scrollHeight - window.innerHeight <= window.scrollY+1 && !cargando) {
                        cargando=true;
                        valorInput = event.target.value;
                        if(valorInput.length>=3){
                          datos=extraerPeliculas(datos,valorInput,contador++)
                          .then(data => {
                            datos=data;
                            imprimePeliculas(datos,card,main,containerInfo,false)  
                          })
                          .catch(error => {
                            console.error('Error en el controlador:', error);
                          })
                          .finally(()=>{
                            cargando=false;
                          })
                        }
                        
                          
                      }
                    })   
            } else{
              main.innerHTML=''
              main.appendChild(portadaClon)
              if(button){
                button.remove()
              }
            }
        });
}

function creaButton(id,titulo){
  var nav=document.querySelector('nav');
  var button=document.createElement("button");
  button.textContent=titulo;
  button.id=id;
  nav.appendChild(button);

}
