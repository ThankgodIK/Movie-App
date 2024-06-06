const INPUT_FIELD = document.getElementById("text--input--field");
console.log(INPUT_FIELD);

const SEARCH_BTN = document.getElementById("search--btn");
console.log(SEARCH_BTN);

let MOVIE__INFO__CONTAINER = document.getElementById("movieInfoContainer");

const getMovieInfo = async (e) => {
  e.preventDefault();

  //the movie to search for
  const movieTitle = INPUT_FIELD.value.trim();
  console.log(movieTitle);

  MOVIE__INFO__CONTAINER.innerHTML = `<section class="flex justify-center items-center max-w-[600px] bg-white p-4 rounded-md">
  <div class="loader"></div>
  <h1 class="text-[2rem] font-bold bg-white p-2 rounded-md">Getting movie...</h1></section>`;

  try {
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=5d93e14&t=${movieTitle}`
    );
    const movieInfo = await data.json();
    console.log(movieInfo);
    //check if movie was not found
    if (movieInfo.Error) {
      MOVIE__INFO__CONTAINER.innerHTML = `<h1 class="text-[4rem] text-red-400 bg-white ">${movieInfo.Error}</h1>`;
      return;
    }
    //showing the actual movie we searched
    MOVIE__INFO__CONTAINER.innerHTML = `<section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] w-full justify-between bg-white p-4 rounded-md"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p>
              <strong class="mr-2">Year:</strong
              ><span class="text-gray-500">${movieInfo.Year}</span>
            </p>
            <p>
              <strong class="mr-2">Released:</strong
              ><span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong
              ><span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong
              ><span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong
              ><span class="text-gray-500">${movieInfo.Director}</span>
            </p>
            <p>
              <strong class="mr-2">Plots:</strong
              ><span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Awards:</strong
              ><span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          </div>

          <div>
            <img
              class="max-w-[600px] w-full rounded-md"
              src=${movieInfo.Poster}
              alt=""
            />
          </div>
        </section>`;
  } catch (error) {
    console.log(error);
  }
};

SEARCH_BTN.addEventListener("click", getMovieInfo);
