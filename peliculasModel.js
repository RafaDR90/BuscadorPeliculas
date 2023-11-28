
function extraerPeliculas(datos,nombrePelicula,numeroPagina){
  const apiKey = '44fc4d93';
  const apiUrl = 'https://www.omdbapi.com/';

  const fullUrl = `${apiUrl}?apikey=${apiKey}&s=${nombrePelicula}&page=${numeroPagina}`;

  return fetch(fullUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener datos:', error);
      throw error;
    });
}

function extraerDatosPelicula(datos,id){
  const apiKey = '44fc4d93';
  const apiUrl = 'https://www.omdbapi.com/';

  const fullUrl = `${apiUrl}?apikey=${apiKey}&i=${id}`;

  return fetch(fullUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener datos:', error);
      throw error;
    });
}