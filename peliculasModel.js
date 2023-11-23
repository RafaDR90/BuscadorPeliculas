const apiKey = '44fc4d93';
const apiUrl = 'http://www.omdbapi.com/';

// Término de búsqueda, en este caso "star" en el título
const searchTerm = 'star';

// Número de página (cada página generalmente tiene 10 resultados)
const pageNumber = 2; // Puedes cambiar este número para obtener diferentes páginas

// Formar la URL completa de la solicitud con el parámetro de la página
const fullUrl = `${apiUrl}?apikey=${apiKey}&s=${searchTerm}&page=${pageNumber}`;

// Hacer la solicitud usando fetch()
fetch(fullUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí tienes los datos en formato JSON para la siguiente página
  })
  .catch(error => console.error('Error al obtener datos:', error));
