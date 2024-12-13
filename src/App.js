import React, { useState } from "react";

function App() {
  // Estado para las películas y las películas vistas
  const [movies, setMovies] = useState([
    { id: 1, name: "Joker", image: "https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
    { id: 2, name: "El Padrino", image: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
    { id: 3, name: "The Dark Knight", image: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { id: 4, name: "Mi Amigo Alexis", image: "https://pics.filmaffinity.com/Mi_amigo_Alexis-325550212-large.jpg"},
    { id: 5, name: "Avengers: Endgame", image: "https://image.tmdb.org/t/p/w200/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
    { id: 6, name: "Jojo Rabbit", image: "https://image.tmdb.org/t/p/w200/7GsM4mtM0worCtIVeiQt28HieeN.jpg" },
  ]);

  // UseState de cada requisito
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [newMovieName, setNewMovieName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Función para agregar una nueva película
  const addMovie = () => {
    if (newMovieName.trim() !== "") {
      setMovies([...movies, { id: movies.length + 1, name: newMovieName, image: null }]);
      setNewMovieName("");
    }
  };

  // Función para eliminar una película
  const deleteMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  // Función para marcar una película como vista
  const markAsWatched = (index) => {
    const watchedMovie = movies[index];
    
    // Añadir la película a la lista de películas vistas si no está ya en la lista
    if (!watchedMovies.find(movie => movie.id === watchedMovie.id)) {
      setWatchedMovies([...watchedMovies, watchedMovie]); 
    }
  };


  // Función para mover una película hacia arriba en el ranking
  const moveUp = (index) => {
    if (index === 0) return;
    const newMovies = [...movies];
    [newMovies[index - 1], newMovies[index]] = [newMovies[index], newMovies[index - 1]];
    setMovies(newMovies);
  };

  // Función para mover una película hacia abajo en el ranking
  const moveDown = (index) => {
    if (index === movies.length - 1) return;
    const newMovies = [...movies];
    [newMovies[index + 1], newMovies[index]] = [newMovies[index], newMovies[index + 1]];
    setMovies(newMovies);
  };

  // Función para editar el nombre de una película
  const editMovieName = (index) => {
    setEditingIndex(index);
  };

  // Función para guardar el nombre editado
  const saveMovieName = (index, newName) => {
    const updatedMovies = movies.map((movie, i) => 
      i === index ? { ...movie, name: newName } : movie
    );
    setMovies(updatedMovies);
    setEditingIndex(null);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Ranking de películas:</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map((movie, index) => (
          <li key={movie.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            {movie.image ? (
              <img src={movie.image} alt={movie.name} style={{ width: "50px", height: "75px", marginRight: "10px" }} />
            ) : (
              <div style={{ width: "50px", height: "75px", backgroundColor: "#ccc", marginRight: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                No Image
              </div>
            )}
            {editingIndex === index ? (
              <input
                type="text"
                value={movie.name}
                onChange={(e) => saveMovieName(index, e.target.value)}
              />
            ) : (
              <span>{index + 1}. {movie.name}</span>
            )}
            <button onClick={() => editMovieName(index)}>Edit</button>
            <button onClick={() => moveUp(index)}>Up</button>
            <button onClick={() => moveDown(index)}>Down</button>
            <button onClick={() => markAsWatched(index)}>Watched</button>
            <button onClick={() => deleteMovie(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Agregar otra película al Ranking</h2>
      <input
        type="text"
        value={newMovieName}
        onChange={(e) => setNewMovieName(e.target.value)}
        placeholder="Nombre de la película"
      />
      <button onClick={addMovie}>Add Movie</button>

      <h3>Películas vistas:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {watchedMovies.map((movie, index) => (
          <li key={movie.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            {movie.image ? (
              <img src={movie.image} alt={movie.name} style={{ width: "50px", height: "75px", marginRight: "10px" }} />
            ) : (
              <div style={{ width: "50px", height: "75px", backgroundColor: "#ccc", marginRight: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                No Image
              </div>
            )}
            <span>{index +1 }. {movie.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
