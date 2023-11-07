const monthCtx = document.getElementById('monthlySales').getContext('2d');
const deptCtx = document.getElementById('deptSales').getContext('2d');
const yearlyLabel = document.getElementById('yearlyTotal');
const bSalesOver5000 = document.getElementById('bSalesOver5000');
const bReset = document.getElementById('bReset');
bSalesOver5000.addEventListener('click', findOver5000);
bReset.addEventListener('click', resetMonthlySales);
const bAddSaleModal = document.getElementById('bAddSaleModal');

const monthSales = Array.of(6500, 3250, 4000);
const monthLabels = Array.of('Octubre', 'Noviembre', 'Diciembre');
const deptSales = Array.of(12, 9, 7, 3);
const deptLabels = Array.of('Cámara', 'Móvil', 'Portátil', 'Tablet');
const yearlyTotal = 0;

//Colecciones para mostrar en gráficos.
const monthlyLabelsSet = new Set();
const monthlySalesArray = [];


const monthlySalesChart = new Chart(monthCtx, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{
			label: 'Número de ventas',
			data: [],
			backgroundColor: [
				'rgba(238, 184, 104, 1)',
				'rgba(75, 166, 223, 1)',
				'rgba(239, 118, 122, 1)',
			],
			borderWidth: 0,
		}],
	},
	options: {
		scales: {
			yAxes: [{
				ticks: { beginAtZero: true },
			}],
		},
	},
});

const deptSalesChart = new Chart(deptCtx, {
	type: 'pie',
	data: {
		labels: deptLabels,
		datasets: [{
			label: 'Número de ventas',
			data: deptSales,
			backgroundColor: [
				'rgba(238, 184, 104, 1)',
				'rgba(75, 166, 223, 1)',
				'rgba(239, 118, 122, 1)',
				'rgba(40, 167, 69, 1)',
			],
			borderWidth: 0,
		}],
	},
	options: {},
});

const newAmount = document.getElementById('itemAmount');
const newMonth = document.getElementById('monthId');

function addYearlyTotal(a, b, c) {
	return a + b + c;
}

yearlyTotal = addYearlyTotal(...monthSales);
yearlyLabel.innerHTML = yearlyTotal + "€";

function findOver5000() {

	/*
	let position = -1;
	let quantity = monthSales.find((elem, index) => {
		let b = false;
		if (elem < 5000) {
			b = true;
			position = index;
		}
		return b;
	});
	*/
	let position = monthSales.findIndex((elem) => elem < 5000);
	alert("Cantidad: " + monthSales[position] + "  Posición: " + position);
}

function initMonthlyTotalSales() {
	yearlyLabel.innerHTML = `${monthSales.reduce((count, value) => count +
		value, 0)}€`;
}
initMonthlyTotalSales();

function resetMonthlySales() {
	monthSales.fill(0);
	monthlySalesChart.update();
	initMonthlyTotalSales();
}

function addSale() {
	try {
		if (monthlyLabelsSet.has(newMonth.value)) {
			throw {
				name: 'MonthError',
				message: 'El mes ya está incluido en la gráfica.',
			};
		}
		monthlySalesArray.push(Number.parseInt(newAmount.value));
		monthlyLabelsSet.add(newMonth.value);

		initMonthlyTotalSales();

		monthlySalesChart.data.datasets[0].data = monthlySalesArray;
		monthlySalesChart.data.labels = Array.from(monthlyLabelsSet);
		monthlySalesChart.update();
	} catch (error) {
		alert(error.message);
	} finally {
		cleanAddSaleForm();
	}
}
