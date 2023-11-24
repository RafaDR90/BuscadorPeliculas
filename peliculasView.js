function imprimePeliculas(datos,card,main,cardInfo){
    for(let i=0;i<datos.Search.length;i++){
        var cloneCard=card.cloneNode(true);
        cloneCard.id=null;
        var img = cloneCard.querySelector('.containerImg img');
        var h3 = cloneCard.querySelector('h3');
        if(datos.Search[i].Poster!='N/A'){
            img.src=datos.Search[i].Poster
        }else{
            img.src='./img/alternativa.png'
        }
        h3.innerHTML=datos.Search[i].Title
        
        cloneCard.style.visibility='visible';
        main.appendChild(cloneCard);
        cloneCard.addEventListener('click',(event)=>{
            event.stopPropagation();
            var tieneHijoConClase = main.querySelector('.containerInfo') !== null;
            if(!tieneHijoConClase){
                clonedCardInfo=cardInfo.cloneNode(true);
                clonedCardInfo.id=null;
                var li=clonedCardInfo.querySelectorAll('li');
                var imagenInfo=clonedCardInfo.querySelector('img')
                var salir=clonedCardInfo.querySelector('button');
                salir.addEventListener('click',()=>{
                clonedCardInfo.remove();
                })
            
                extraerDatosPelicula(datos,datos.Search[i].imdbID)
                .then (data =>{
                    li[0].innerHTML='<b>Director: </b>'+data.Director;
                    li[1].innerHTML='<b>Actores: </b>'+data.Actors;
                    li[2].innerHTML='<b>Sinopsis: </b>'+data.Plot;
                    li[3].innerHTML='<b>Año: </b>'+data.Year;
                    imagenInfo.src=data.Poster;
            })
                main.appendChild(clonedCardInfo);
                document.addEventListener('click',(e)=>{
                    
                    if (!clonedCardInfo.contains(e.target)) {
                        clonedCardInfo.remove();
                    }
                })
    
            }
            main.appendChild(clonedCardInfo);
            document.addEventListener('click',(e)=>{
                
                if (!clonedCardInfo.contains(e.target)) {
                    clonedCardInfo.remove();
                }
            })
        })
    }
    

}