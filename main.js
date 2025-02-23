const grid = document.getElementById("container");
const colorMenu = document.getElementById("colorMenu");
const colorOptions = document.querySelectorAll(".color-option");
let columnas = 100;
let seEstaDibujando = false;
let colorPrincipal = "black";

function createGrid() {
	grid.innerHTML = "";
	const tamanioCelda = window.innerWidth / columnas;
	const filas = Math.floor(window.innerHeight / tamanioCelda);

	grid.style.gridTemplateRows = `repeat(${filas}, ${tamanioCelda}px)`;

	for (let i = 0; i < columnas * filas; i++) {
		const celda = document.createElement("div");
		celda.classList.add("celda");

		// Activar/desactivar celda al hacer clic izquierdo
		celda.addEventListener("mousedown", (event) => {
			if (event.button === 0) {
				toggleCell(celda);
				seEstaDibujando = true;
			}
		});

		// Pintar arrastrando
		celda.addEventListener("mouseover", () => {
			if (seEstaDibujando) toggleCell(celda);
		});

		// Mostrar el menú de color al hacer clic derecho
		celda.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			showColorMenu(event.pageX, event.pageY);
		});

		grid.appendChild(celda);
	}
}

// Alterna el color de la celda
function toggleCell(celda) {
	if (celda.classList.contains("active")) {
		celda.classList.remove("active");
		celda.style.backgroundColor = "white";
	} else {
		celda.classList.add("active");
		celda.style.backgroundColor = colorPrincipal;
	}
}

// Muestra el menú de color en la posición del cursor
function showColorMenu(x, y) {
	colorMenu.style.display = "block";
	colorMenu.style.left = `${x}px`;
	colorMenu.style.top = `${y}px`;

	// Ocultar el menú si se mueve fuera de el
	setTimeout(() => {
		document.addEventListener("mousemove", hideColorMenu);
	}, 200);
}

// Oculta el menú cuando el cursor se mueve fuera
function hideColorMenu(event) {
	if (!colorMenu.contains(event.target)) {
		colorMenu.style.display = "none";
		document.removeEventListener("mousemove", hideColorMenu);
	}
}

// Selecciona un color y lo establece como el color predeterminado
colorOptions.forEach((option) => {
	option.addEventListener("click", (event) => {
		colorPrincipal = event.target.style.backgroundColor;
		colorMenu.style.display = "none";
	});
});

// Dejar de pintar al soltar el botón del mouse
document.addEventListener("mouseup", () => {
	seEstaDibujando = false;
});

createGrid();

window.addEventListener("resize", createGrid);
