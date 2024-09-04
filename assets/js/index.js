$(document).ready(function () {
  $(".btnBuscar").on("click", function () {
    const heroNumber = $("#inputBuscar").val().trim();
    // Comprueba que el valor sea un número
    if (!$.isNumeric(heroNumber)) {
      alert("Por favor, ingrese un número válido");
      return;
    }
    //muestra la consulta a la API
    buscarSuperHero(heroNumber);
  });
});

function buscarSuperHero(heroNumber) {
  $.ajax({
    url: `https://www.superheroapi.com/api.php/39642114ae785e39748fdc55e2ea2764/${heroNumber}`,
    method: "GET",
    success: function (data) {
      console.log(data);
      if (data.response === "error") {
        alert(" NO existe SuperHero con ese número. Intenta con otro número.");
      } else {
        mostrarInfoSuperHero(data);
      }
    },
    error: function () {
      alert("Error en la consulta. Inténtalo nuevamente.");
    },
  });
}

console.log(data);
function mostrarInfoSuperHero(data) {
  const superheroContainer = $("#superheroContainer");

  const card = `
  <h3>SuperHero Encontrado</h3>
<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.image.url}" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title border-bottom pb-2">Nombre: ${data.name}</h5>
                <p class="card-text">
                    <h6>Conexiones: </h6><p>${data.connections["group-affiliation"]}</p>
                    <h6>Publicado por:</h6> ${data.biography.publisher}</h6>
                <p class="card-text border-bottom pb-2">
                    <h6>Ocupación:</h6> ${data.work.occupation}
                </p>
                <p class="card-text border-bottom pb-2">
                    <h6>Primera Aparición:</h6> ${data.biography["first-appearance"]}
                </p>
                <p class="card-text border-bottom pb-2">
                    <h6>Altura:</h6> ${data.appearance["height"][1]}<br>
                </p>
                <p class="card-text border-bottom pb-2">
                    <h6>Peso:</h6> ${data.appearance["weight"][1]}<br>
                </p>
                <p class="card-text border-bottom pb-2">
                    <h6>Alias:</h6> ${data.biography["aliases"]}<br>
                </p>
            </div>
        </div>
    </div>
</div>



  
    `;

  const chart = `
        <div class="col-md-6">
            <div id="chartContainer" style="height: 300px; width: 100%;"></div>
        </div>
    `;

  superheroContainer.html(card + chart);
  mostrarGrafico(data.powerstats);
}

function mostrarGrafico(powerstats) {
  const chart = new CanvasJS.Chart("chartContainer", {
    theme: "light",
    animationEnabled: true,
    title: {
      text: "Estadísticas del Superhéroe",
    },
    data: [
      {
        type: "pie",
        toolTipContent: "<b>{name}</b>: {y}", // Mostrar el valor entero en la tooltip
        indexLabel: "{name} - {y}", // Mostrar el valor entero en el label
        dataPoints: [
          { y: powerstats.intelligence, name: "Inteligencia" },
          { y: powerstats.strength, name: "Fuerza" },
          { y: powerstats.speed, name: "Velocidad" },
          { y: powerstats.durability, name: "Durabilidad" },
          { y: powerstats.power, name: "Poder" },
          { y: powerstats.combat, name: "Combate" },
        ],
      },
    ],
  });
  chart.render();
}
