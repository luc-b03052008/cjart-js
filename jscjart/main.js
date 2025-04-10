
function getpokemonapi(){
    let pokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=4" + random)
    .then( function(response){
      return response.json();
    }).then
    ( function (realdata){
        speedChart.src = realdata.results.name = "bulbasaur";
    })
}



document.addEventListener("DOMContentLoaded", function () {
    const speedChart = new Chart(document.getElementById("speedChart"), {
        type: "bar",
        data: {
            labels: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
            datasets: [
                {
                    label: "Speed",
                    data: [100, 65, 45, 43],
                    backgroundColor: ["#FFCE56", "#FF6384", "#4BC0C0", "#36A2EB"],
                },
            ],
        },
    });

    function getpokemonapi1(){
        let pokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=5" + random)
        .then( function(response){
          return response.json();
        }).then
        (function(realdata){
            donutChart.scr = realdata.results.name = "ivysaur";
        })
    }

    const donutChart = new Chart(document.getElementById("donutChart"), {
        type: "doughnut",
        data: {
            labels: ["Fire", "Water", "Grass", "Electric"],
            datasets: [
                {
                    label: "Types",
                    data: [25, 25, 25, 25],
                    backgroundColor: ["#FF5733", "#36A2EB", "#4CAF50", "#FFD700"],
                },
            ],
        },
    });

    function getpokemonapi2(){
        let pokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=7" + random)
        .then( function(response){
          return response.json();
        }).then
        (function(realdata){
            typeChart.src = realdata.results.name = "squirtle";
        })
    }

    const typeChart = new Chart(document.getElementById("typeChart"), {
        type: "pie",
        data: {
            labels: ["Attack", "Defense", "Speed"],
            datasets: [
                {
                    label: "Stats",
                    data: [50, 30, 20],
                    backgroundColor: ["#FF5733", "#36A2EB", "#FF9B17"],
                },
            ],
        },
    });
});


    

fetchPokemonByType = function (){
  
}


