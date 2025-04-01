
let typeChart;
let speedChart;


function createDonutChart(pokemonData) {
    const labels = pokemonData.map(p => p.name);
    const weights = pokemonData.map(p => p.weight);

    const dataDonut = {
        labels: labels,
        datasets: [{
            label: "Gewicht van Pokémon",
            data: weights,
            backgroundColor: [
                "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff",
                "#e67e22", "#1abc9c", "#8e44ad", "#2c3e50", "#f39c12"
            ]
        }]
    };

    const configDonut = {
        type: "doughnut",
        data: dataDonut,
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: "Pokémon Gewichten" }
            }
        }
    };

    const ctxDonut = document.getElementById("donutChart").getContext("2d");
    new Chart(ctxDonut, configDonut);
}


function createTypeChart(pokemonData) {
    const typeCounts = pokemonData.reduce((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(typeCounts);
    const counts = Object.values(typeCounts);

    const dataType = {
        labels: labels,
        datasets: [{
            label: "Aantal Pokémon per Type",
            data: counts,
            backgroundColor: ["#ff5733", "#33ff57", "#3357ff", "#f4d03f", "#8e44ad"]
        }]
    };

    const configType = {
        type: "bar",
        data: dataType,
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: "Pokémon Types" }
            }
        }
    };

    if (typeChart) typeChart.destroy();
    
    const ctxType = document.getElementById("typeChart").getContext("2d");
    typeChart = new Chart(ctxType, configType);
}


function createSpeedChart(pokemonData) {
    const labels = pokemonData.map(p => p.name);
    const speeds = pokemonData.map(p => p.speed);

    const dataSpeed = {
        labels: labels,
        datasets: [{
            label: "Snelheid van Pokémon",
            data: speeds,
            borderColor: "#ff6f61",
            backgroundColor: "rgba(255, 111, 97, 0.2)",
            borderWidth: 2,
            fill: true
        }]
    };

    const configSpeed = {
        type: "line",
        data: dataSpeed,
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: "Pokémon Snelheid" }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    };

    if (speedChart) speedChart.destroy(); 

    const ctxSpeed = document.getElementById("speedChart").getContext("2d");
    speedChart = new Chart(ctxSpeed, configSpeed);
}


async function fetchPokemonByType(type) {
    let pokemonData = [];

    if (type === "random") {
        for (let i = 0; i < 10; i++) {
            let randomId = Math.floor(Math.random() * 151) + 1;
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            let data = await response.json();
            pokemonData.push({ 
                name: data.name, 
                weight: data.weight, 
                type: data.types[0].type.name, 
                speed: data.stats.find(stat => stat.stat.name === "speed").base_stat 
            });
        }
    } else {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        let data = await response.json();
        let selectedPokemon = data.pokemon.slice(0, 10);
        
        for (let p of selectedPokemon) {
            let pokeResponse = await fetch(p.pokemon.url);
            let pokeData = await pokeResponse.json();
            pokemonData.push({ 
                name: pokeData.name, 
                weight: pokeData.weight, 
                type: type, 
                speed: pokeData.stats.find(stat => stat.stat.name === "speed").base_stat
            });
        }
    }

    createDonutChart(pokemonData);
    createTypeChart(pokemonData);
    createSpeedChart(pokemonData); 
}


fetchPokemonByType("random");
