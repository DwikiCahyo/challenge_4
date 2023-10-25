/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

/*
 * Contoh penggunaan DOM di dalam class
 * */
class App {
  constructor() {
    this.form = document.querySelector("#search-form");
    this.result = document.querySelector("#result");
    this.tanggal = document.getElementById("tanggal");
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      return this.filterCars(e);
    });
    this.loadData();
  }

  populateCars(cars) {
    return cars.map((car) => {
      return {
        ...car,
        availableAt: new Date(car.availableAt).getTime(),
      };
    });
  }

  async filterCars(e) {
    e.preventDefault();
    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    const body = await response.json();
    const bodyParse = this.populateCars(body);
    console.log(body);
    console.log(bodyParse);
    // const formData = new FormData(e.target);
    // const tanggal = new Date(formData.get("tanggal"));
    const tanggal = this.tanggal.value;
    console.log(tanggal);
    // const driver = formData.getAll("driver");
    // console.log(date, driver);
    //
    // const availableCars = body.filter((car) => car.availableAt === tanggal);
    // this.viewSearchResult(availableCars);
  }

  async loadData() {
    const data = await Binar.listCars();
    console.log(data);
  }

  viewSearchResult(cars) {
    let html = "";
    if (cars.length > 0) {
      for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        html += `<p>${car.type} - ${car.year}</p>`;
      }
    } else {
      html = "<p>Hasil Tidak ditemukan</p>";
    }

    this.result.innerHTML = html;
  }
}

const app = new App();

app.init();
