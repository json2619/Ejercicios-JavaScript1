// Obtenemos los valores de los canvas donde iran nuestras graficas.
const monthCtx = document.getElementById("monthlySales").getContext("2d");
const deptCtx = document.getElementById("deptSales").getContext("2d");
const yearlyLabel = document.getElementById("yearlyTotal");

// Obtenemos el boton de ventas > 5000 para añadir el evento
const bSalesOver5000 = document.getElementById("bSalesOver5000");
bSalesOver5000.addEventListener("click", findOver5000);

// Obtenemos el boton de resetar para añadir el evento
const bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetMonthlySales);

// Aquí vamos a recoger los datos que le pasaremos a añadir venta
const newAmount = document.getElementById("itemAmount");
const newMonth = document.getElementById("monthId");
const newProduct = document.forms[0].inlineRadioOptions;

// aquí recogemos el botón añadir y le añadimos el evento para que añada la venta
const bAddSaleModal = document.getElementById("bAddSaleModal");
bAddSaleModal.addEventListener("click", addSale);

// aquí recogemos el botón eliminar y le añadimos un evento
const bRemoveSale = document.getElementById("bRemoveSale");
bRemoveSale.addEventListener("click", drawSelectMontlySales);

// Obtenemos los datos del botón remove del modal y le añadimos funcionalidad cuando hagamos click en el
const bRemoveSaleModal = document.getElementById("bRemoveSaleModal");
bRemoveSaleModal.addEventListener("click", selectedDatelySale);

// Variables de nuestro grafico de secciones
const deptLabels = Array.of("Cámara", "Móvil", "Portátil", "Tablet");
const deptSalesData = [0, 0, 0, 0];

// Colecciones para mostrar en gráficos.
const monthlySalesMap = new Map();

// Gráfico de Barras
const monthlySalesChart = new Chart(monthCtx, {
	type: "bar",
	data: {
		labels: [], // Aqui iran nuestros meses
		datasets: [
			{
				label: "Cámaras",
				data: [],
				backgroundColor: "rgba(238, 184, 104, 1)",
				borderWidth: 0,
			},
			{
				label: "Teléfonos",
				data: [],
				backgroundColor: "rgba(239, 118, 122, 1)",
				borderWidth: 0,
			},
			{
				label: "Portátiles",
				data: [],
				backgroundColor: "rgba(75, 166, 223, 1)",
				borderWidth: 0,
			},
			{
				label: "Tablets",
				data: [],
				backgroundColor: "rgba(40, 167, 69, 1)",
				borderWidth: 0,
			},
		],
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: { beginAtZero: true },
				},
			],
		},
	},
});

// Grafico de secciones
const deptSalesChart = new Chart(deptCtx, {
	type: "pie",
	data: {
		labels: deptLabels,
		datasets: [
			{
				label: "Número de ventas",
				data: deptSalesData,
				backgroundColor: [
					"rgba(238, 184, 104, 1)",
					"rgba(239, 118, 122, 1)",
					"rgba(75, 166, 223, 1)",
					"rgba(40, 167, 69, 1)",
				],
				borderWidth: 0,
			},
		],
	},
	options: {},
});

// Función para calcular el total de ventas.
function initMonthlyTotalSales() {
	// Inicializamos la variable totalSales y aquí vamos a guardar la suma de todas las ventas
	let totalSales = 0;

	// Recorremos el mapa para recoger los valores del mapa
	for (const amountData of monthlySalesMap.values()) {
		// Obtenemos la cantidad de los productos
		for (const amount of amountData.values()) {
			// Sumamos todas los datos que tengamos dentro de amountData
			totalSales += amount;
		}
	}

	// Ponemos nuestros ingresos en el html
	yearlyLabel.innerHTML = totalSales + "€";
}

// Inicializamos la función, para tener un valor incial.
initMonthlyTotalSales();

/* Ventas por encima de 5000 */
function findOver5000() {
	// Creamos un array para almacenar las ventas mayores a 5000
	let salesOver5000 = [];

	// recorremos el mapa de ventas mensuales
	for (const [month, monthlyData] of monthlySalesMap) {

		// obtenemos los datos mensuales y sumamos las cantidades
		for (const [nameProduct, amount] of monthlyData) {
			// Verificamos si el total es mayor a 5000
			if (amount > 5000) {
				// Agregamos la información al array
				salesOver5000.push({
					month: month,
					product: nameProduct,
					total: amount
				});
			}
		}

	}

	// Mostramos las ventas mayores a 5000
	let message = ""
	if (salesOver5000.length > 0) {
		for (const sale of salesOver5000) {
			message += `${sale.month}: ${sale.product}-${sale.total}€\n`;
		}
		alert(message);
	} else {
		alert("No hay ventas mayores a 5000.");
	}
}

// Función para añadir ventas
function addSale() {
	try {
		// obtenemos la cantidad de ventas en número, para ello le hacemos un parseInt
		let amount = Number.parseInt(newAmount.value);

		// Si el mes ya existe, lanza una excepción
		if (newMonth.value === "") throw new Error('No ha introducido ningún mes, por favor añádalo');

		// Si la cantidad es 0 o no se ha escrito nada, se lanzará una excepción
		if (newAmount.value === "" || amount < 0) throw new Error('La cantidad no es válida.');

		// Si no se ha marcado ningún producto, se lanzará un error
		if (newProduct.value === "") throw new Error('El producto no se ha marcado.');

		if (monthlySalesMap.has(newMonth.value)) {
			// Si el mes está en la colección, obtén el valor
			let currentMonthly = monthlySalesMap.get(newMonth.value);
			if (currentMonthly.has(newProduct.value)) {
				// Si el producto existe en la colección, suma la nueva cantidad al valor existente
				let currentAmountProd = currentMonthly.get(newProduct.value);
				currentMonthly.set(newProduct.value, currentAmountProd + amount);
			} else {
				// Si el producto no existe en la colección, añádelo con la cantidad indicada
				currentMonthly.set(newProduct.value, amount);
			}
		} else {
			// Si el mes no existe en la colección, crea una nueva colección para el mes
			let newMonthlySales = new Map();
			newMonthlySales.set(newProduct.value, amount);
			monthlySalesMap.set(newMonth.value, newMonthlySales);
		}

		// Recuento de los totales de las ventas
		initMonthlyTotalSales();
		// Actualiza las gráficas con los nuevos valores
		updateCharts();
	} catch (error) {
		alert(error.message);
	} finally {
		// Despues de añadir las ventas limpiamos el formulario
		cleanAddSaleForm();
	}
}

function updateCharts() {
	// Reiniciamos los datos
	monthlySalesChart.data.labels = [];
	monthlySalesChart.data.datasets[0].data = [];
	monthlySalesChart.data.datasets[1].data = [];
	monthlySalesChart.data.datasets[2].data = [];
	monthlySalesChart.data.datasets[3].data = [];

	// Reiniciamos los datos de dlas secciones
	const deptSalesData = [0, 0, 0, 0];

	// Pasamos los meses a los labels
	monthlySalesChart.data.labels = Array.from(monthlySalesMap.keys());

	// Obtenemos los datos mensuales y actualizamos los arrays correspondientes
	Array.from(monthlySalesMap.values()).forEach((monthlyData) => {
		// Actualizamos los datos del gráfico de barras
		monthlySalesChart.data.datasets[0].data.push(monthlyData.get("camera") || 0);
		monthlySalesChart.data.datasets[1].data.push(monthlyData.get("phone") || 0);
		monthlySalesChart.data.datasets[2].data.push(monthlyData.get("laptop") || 0);
		monthlySalesChart.data.datasets[3].data.push(monthlyData.get("tablet") || 0);

		// Actualizamos los datos de las secciones
		deptSalesData[0] += monthlyData.get("camera") || 0;
		deptSalesData[1] += monthlyData.get("phone") || 0;
		deptSalesData[2] += monthlyData.get("laptop") || 0;
		deptSalesData[3] += monthlyData.get("tablet") || 0;
	});

	// Actualizamos el chart de barras
	monthlySalesChart.update();

	// Actualizamos el chart de pi
	deptSalesChart.data.datasets[0].data = deptSalesData;
	deptSalesChart.update();
}

// Función que deja vacío el formulario de añadir ventas
function cleanAddSaleForm() {
	newMonth.value = ""; // Dejamos el mes del formulario vacío
	newAmount.value = ""; // Dejamos la cantidad del formulario vacío
	newProduct.value = ""; // Dejamos el producto del formulario vacío
}

// Funcion para resetear nuestros graficos
function resetMonthlySales() {

	// Actualizamos todos los valores de nuestro gráfico de barras
	monthlySalesChart.data.labels = [];
	monthlySalesChart.data.datasets[0].data = []; // Valor Camaras
	monthlySalesChart.data.datasets[1].data = []; // Valor Telefonos
	monthlySalesChart.data.datasets[2].data = []; // Valor Portatiles
	monthlySalesChart.data.datasets[3].data = []; // Valor Tablets

	// Reseteamos los valores de nuestro grafico de secciones
	const deptSalesData = [0, 0, 0, 0];
	// eliminamos todos los valores que hay en el mapa
	monthlySalesMap.clear();
	// Actualizamos los gráficos
	monthlySalesChart.update();
	deptSalesChart.data.datasets[0].data = deptSalesData;
	deptSalesChart.update();
	// Actualizamos los ingresos
	initMonthlyTotalSales();
}

function drawSelectMontlySales() {
	// Seleccionamos el elemento usando el id
	let removeSales = $("#removeSales");

	// Eliminamos los option del select, para que estos no se dupliquen los option cada vez que le damos a Eliminar Venta
	removeSales.empty();

	/* Aquí vamos a recorrer los array de monthlySalesMap y monthlyData,
	en el cuál vamos a tener los datos del producto y de las ventas,
	usamos entries para recoger los pares clave-valor
	*/
	for (let [month, monthlyData] of monthlySalesMap) {
		for (let [product, value] of monthlyData) {
			let option = $("<option>").val(`${month},${product}`).text(`${month}: ${product} - ${value}€`);
			// Añadimos al select el option creado.
			removeSales.append(option);
		}
	}
}

// Función para eliminar la venta seleccionada
function selectedDatelySale() {
	// Obtenemos el elemento select
	let removeSales = document.getElementById("removeSales");

	// Obtenemos la clave seleccionada, que contiene la información del mes y producto
	let selectedKey = removeSales.value;

	// Dividimos la clave en año-mes y producto a eliminar
	let [selectedDate, selectedProduct] = selectedKey.split(',');

	// Obtenemos el mapa de ventas dependiendo del mes que recojamos del option
	let monthlyData = monthlySalesMap.get(selectedDate);

	// Verificamos si existe el mapa de ventas mensuales y el producto seleccionado
	if (monthlyData && monthlyData.has(selectedProduct)) {
		// Eliminamos la venta correspondiente al producto seleccionado
		monthlyData.delete(selectedProduct);

		//Vamos a eliminar la opción que hemos seleccionado
		removeSales.remove(removeSales.selectedIndex);

		// Actualizamos los datos de los gráficos
		updateCharts();
		//Vamos a actualizar el select con los datos restantes
		drawSelectMontlySales()
		// Actualizamos los ingresos totales
		initMonthlyTotalSales();
	} else {
		alert("No se han encontrado datos para esa entrada.");
	}

}
