var arrayStats = {
    'rating': [], 
    'id': [],
    'votes': [],
    'portada':[],
    'recaudacion':[]
  };
function imprimePeliculas(datos,card,main,cardInfo){
    var funciona;
    arrayStats = {
        'rating': [], 
        'id': [],
        'votes': [],
        'portada':[],
        'recaudacion':[]
      };
    
    var spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    for(let i=0;i<datos.Search.length;i++){
        (function (index) {
        var cloneCard=card.cloneNode(true);
        cloneCard.id=null;
        var img = cloneCard.querySelector('.containerImg img');
        var h3 = cloneCard.querySelector('h3');
        funciona=verificarEnlaceImagen(datos.Search[i].Poster)
        .then((funciona)=>{
            if(funciona){
                img.src=datos.Search[i].Poster
            }else{
                img.src='./img/alternativa.png'
            }
        })
        .finally(()=>{
            spinner.style.display='none';
        })
        
        h3.innerHTML=datos.Search[i].Title
        
        cloneCard.style.visibility='visible';
        main.appendChild(cloneCard);
        extraerDatosPelicula(datos,datos.Search[i].imdbID)
        .then(data=>{
            
            arrayStats['rating'].push(data.imdbRating);
            arrayStats['id'].push(data.Title);
            arrayStats['votes'].push(data.imdbVotes);
            arrayStats['portada'].push(data.Poster);
            arrayStats['recaudacion'].push(data.BoxOffice)
        })
        
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
                    funciona=verificarEnlaceImagen(data.Poster)
                    .then((funciona)=>{
                        if(funciona){
                            imagenInfo.src=datos.Search[i].Poster
                        }else{
                            imagenInfo.src='./img/alternativa.png'
                        }
                    })
                    
                })
                main.appendChild(clonedCardInfo);
                document.addEventListener('click',(e)=>{
                    
                    if (!clonedCardInfo.contains(e.target)) {
                        clonedCardInfo.remove();
                    }
                })
    
            }
            
        })
    })(i);
    }
    
    
    

}

function verificarEnlaceImagen(enlace) {
    return new Promise((resolve, reject) => {
        var imagen = new Image();

        imagen.onload = function () {
            resolve(true);
        };

        imagen.onerror = function () {
            resolve(false);
        };

        imagen.src = enlace;
    });
}

function mostrarInforme(e){
    var informeClon=document.getElementById('informeClon')
    if(!informeClon){
        var informe=document.querySelector('.informe');
        var informeClon=informe.cloneNode(true);
        informeClon.id='informeClon';
        var main=document.querySelector('main')
        
        var clasificacionIMG=informeClon.querySelectorAll('.clasificacionIMG')
        var clasificacionTittle=informeClon.querySelectorAll('.clasificacionTittle')
        var clasificacionAmount=informeClon.querySelectorAll('.clasificacionPoints')

        var votadasIMG=informeClon.querySelectorAll('.votesIMG')
        var votadasTittle=informeClon.querySelectorAll('.votesTittle')
        var votadasAmount=informeClon.querySelectorAll('.votesAmount')

        var recaudacionIMG=informeClon.querySelectorAll('.recaudacionIMG')
        var recaudacionTittle=informeClon.querySelectorAll('.recaudacionTittle')
        var recaudacionAmount=informeClon.querySelectorAll('.recaudacionPoints')

        
        console.log(arrayStats)
        var peliculas=[]
        for(let i=0;i<arrayStats.id.length;i++){
            var id=arrayStats.id[i];
            var rating=parseFloat(arrayStats.rating[i])
            if(arrayStats.recaudacion[i]!='N/A' && arrayStats.recaudacion[i]!=undefined){
                var recaudacion=parseFloat(arrayStats.recaudacion[i].replace(/[^\d]/g, ''))
            }else{
                recaudacion=0;
            }
            var portada=arrayStats.portada[i]
            var votes=parseInt(arrayStats.votes[i].replace(',', ''))
            peliculas.push({
                id: id,
                rating: rating,
                recaudacion: recaudacion,
                portada: portada,
                votes: votes,
            })
        }
        console.log(peliculas)

        const peliculasFiltradas = peliculas.filter((pelicula) => !isNaN(pelicula.rating));
        const peliculasFiltradasVotes = peliculas.filter((pelicula) => !isNaN(pelicula.votes));
        const PeliculasFiltoRecaudacion=peliculas.filter((pelicula) => !isNaN(pelicula.recaudacion));
        
        var topVotos=peliculasFiltradasVotes.sort((a, b) => b.votes - a.votes).slice(0, 5);
        var topClasificacion= peliculasFiltradas.sort((a, b) => b.rating - a.rating).slice(0, 5);
        var topRecaudacion= PeliculasFiltoRecaudacion.sort((a, b) => b.recaudacion - a.recaudacion).slice(0, 5);
        
        for(let i=0;i<topClasificacion.length;i++){
            clasificacionIMG[i].src=topClasificacion[i].portada
            clasificacionTittle[i].innerHTML=topClasificacion[i].id
            clasificacionAmount[i].innerHTML=topClasificacion[i].rating
            votadasIMG[i].src=topVotos[i].portada
            votadasTittle[i].innerHTML=topVotos[i].id;
            votadasAmount[i].innerHTML=topVotos[i].votes;
            
            if(topRecaudacion[i].recaudacion!=0){
                recaudacionIMG[i].src=topRecaudacion[i].portada;
                recaudacionTittle[i].innerHTML=topRecaudacion[i].id;
                recaudacionAmount[i].innerHTML=topRecaudacion[i].recaudacion;
            }
            
        }
        var botonClose=informeClon.querySelector('button');
        botonClose.addEventListener('click',()=>{
            informeClon.remove();
        })
        main.appendChild(informeClon);
    }
}