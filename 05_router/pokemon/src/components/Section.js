import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Section() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const navigate = useNavigate();

  // Fetch Pokémon list and details from API
  const fetchPokemonDetails = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const pokemonDetails = await res.json();
          return {
            name: pokemon.name,
            image: pokemonDetails.sprites.front_default,
            id: pokemonDetails.id,
          };
        })
      );
      setPokemonData(detailedPokemons);
      setNextUrl(data.next);

      // Calculate the total number of pages based on the 'next' URL
      const totalPages = Math.ceil(data.count / 12);
      setTotalPages(totalPages);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails('https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0');
  }, []);

  const handlePokemonClick = async (pokemonId) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await res.json();
    setSelectedPokemon({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      stats: pokemon.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    });
    navigate(`/pokemon/${pokemonId}`);
  };

  // Page change handling
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const offset = (page - 1) * 12;  // Change offset for 12 items per page
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`);
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);
  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const paginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + 9);

    if (startPage > 1) {
      buttons.push(
        <button key="first" onClick={handleFirstPage} style={buttonStyle}>
          {'<<'}
        </button>
      );
      if (startPage > 2) buttons.push(<span key="dots-1">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            ...buttonStyle,
            backgroundColor: currentPage === i ? '#f2f2f2' : 'transparent',
          }}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push(<span key="dots-2">...</span>);
      buttons.push(
        <button key="last" onClick={handleLastPage} style={buttonStyle}>
          {'>>'}
        </button>
      );
    }

    return buttons;
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  if (loading && !pokemonData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '85vh',
        flexDirection: 'column',
      }}
    >
      {/* Section Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '1200px', // Limit the width of the Section
          width: '100%',
        }}
      >
        {/* Left Side - Pokémon List */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 4 items per row
            gap: '20px',
            maxHeight: '90vh',
            marginRight:'50px',
            //overflowY: 'auto',
          }}
        >
          {pokemonData.map((pokemon, index) => (
            <div
              key={index}
              onClick={() => handlePokemonClick(pokemon.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '150px',
                height: '200px',
                textAlign: 'center',
              }}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{pokemon.name}</span>
            </div>
          ))}
        </div>

        {/* Right Side - Pokémon Details */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFF9C4',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          {selectedPokemon ? (
            <div>
              <h2>{selectedPokemon.name}</h2>
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
              />
              <h3>Abilities</h3>
              <ul>
                {selectedPokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability}</li>
                ))}
              </ul>
              <h3>Stats</h3>
              <ul>
                {selectedPokemon.stats.map((stat, index) => (
                  <li key={index}>
                    {stat.name}: {stat.value}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>Select a Pokémon to see details</div>
          )}
        </div>
      </div>

      {/* Pagination Controls - Below the Pokémon List */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            ...buttonStyle,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          &lt;
        </button>

        {paginationButtons()}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            ...buttonStyle,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Section;
