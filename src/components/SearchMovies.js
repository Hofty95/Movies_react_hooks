import React from 'react';
import { useState, useEffect } from 'react'


function SearchMovies(){

	// Credenciales de API
	const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=96668c18'; // Intenta poner cualquier cosa antes para probar

	const [state, setState] = useState({
		movies: [],
	});

	const [keyword, setkeyword] = useState('');
	useEffect(() => {
		if (keyword) {
			fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=96668c18`)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					setState(prevState => ({
						...prevState,
						movies: data.Search || [],
					}));
				})
				.catch(error => console.error(error));
		}
	}, [keyword]);
	const handleSearch = e => {
		e.preventDefault()

		setkeyword('')
	}

	return(
		<div className="container-fluid">
				{apiKey !== '' ? (
					<>
						<div className="row my-4">
							<div className="col-12 col-md-6">
								{/* Buscador */}
								<form method="GET" onSubmit={handleSearch}>
									<div className="form-group">
										<label htmlFor="">Buscar por título:</label>
										<input
											type="text"
											className="form-control"
											value={keyword}
											onChange={e => setkeyword(e.target.value)}
										/>
									</div>
								</form>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h2>Películas para la palabra:{keyword}</h2>
							</div>
							{/* Listado de películas */}
							{state.movies.length > 0 ? (
								state.movies.map((movie, i) => (
									<div className="col-lg-4 col-md-6 col-sm-12 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img
														className="img-fluid px-3 px-sm-4 mt-3 mb-4"
														src={movie.Poster}
														alt={movie.Title}
														style={{ width: '100%', height: '200px', objectFit: 'cover' }}
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="alert alert-warning text-center">No se encontraron películas</div>
							)}
						</div>
					</>
				) : (
					<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
				)}
			</div>
	)
}

export default SearchMovies;
