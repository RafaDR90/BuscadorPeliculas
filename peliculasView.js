function imprimePeliculas(datos,card,main){
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
        console.log(datos.Search[i])
        
        cloneCard.style.visibility='visible';
        main.appendChild(cloneCard);
    }
    

}