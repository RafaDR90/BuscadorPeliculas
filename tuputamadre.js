function extraerDatosPelicula(datos,nombrePelicula,id){
    const apiKey = '44fc4d93';
    const apiUrl = 'http://www.omdbapi.com/';
  
    const fullUrl = `${apiUrl}?apikey=${apiKey}&i=${id}`;
  
    return fetch(fullUrl)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error('Error al obtener datos:', error);
        throw error;
      });
  }
  window.onload=()=>{
    var datos;
    extraerPeliculas(datos,'star',1)
    
  }