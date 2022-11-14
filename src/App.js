import './App.scss';
import React, {useEffect, useState} from 'react';
import Species from './Species';

const API_URL = 'https://swapi.dev/api/films/2/';
const SPECIES_IMAGES = {
  droid:
    'https://static.wikia.nocookie.net/starwars/images/f/fb/Droid_Trio_TLJ_alt.png',
  human:
    'https://static.wikia.nocookie.net/starwars/images/3/3f/HumansInTheResistance-TROS.jpg',
  trandoshan:
    'https://static.wikia.nocookie.net/starwars/images/7/72/Bossk_full_body.png',
  wookie:
    'https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png',
  yoda: 'https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
};
const CM_TO_IN_CONVERSION_RATIO = 2.54;

function App() {
  const [speciesList, setSpeciesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(API_URL);
      const generalInfoJson = await data.json();
      let species = [];
      for (let i = 0; i < generalInfoJson.species.length; i++) {
        const specie = await fetch(generalInfoJson.species[i]);
        const speciesJson = await specie.json();
        let img = SPECIES_IMAGES.yoda;
        let nameLower = speciesJson.name.toLowerCase();
        switch (nameLower) {
          case "droid":
            img = SPECIES_IMAGES.droid;
            break;
          case "human":
            img = SPECIES_IMAGES.human;
            break;
          case "trandoshan":
            img = SPECIES_IMAGES.trandoshan;
            break;
          case "wookie":
            img = SPECIES_IMAGES.wookie;
            break;
          default:
            break;
        }
          species.push({
            key: i,
            name: speciesJson.name,
            classification: speciesJson.classification,
            designation: speciesJson.designation,
            height:
              Math.round(speciesJson.average_height / CM_TO_IN_CONVERSION_RATIO) +
              '″',
            numFilms: speciesJson.films.length,
            language: speciesJson.language,
            image: img,
          });
      }
      setSpeciesList(species);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Empire Strikes Back - Species Listing</h1>
      <div className="App-species">
        {speciesList &&
          speciesList.map(data => {
            return (
              <Species
                key={data.key}
                name={data.name}
                classification={data.classification}
                designation={data.designation}
                height={data.height}
                image={data.image}
                numFilms={data.numFilms}
                language={data.language}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
