class FilterResult {
  constructor(date, time, passengers, result) {
    this.date = date;
    this.time = time;
    this.passengers = passengers;
    this.result = result;
  }

  async load() {
    const data = await Binar.listCars();
    Car.init(data);
  }

  resultData(e) {
    e.preventDefault();
    const date = this.date.value;
    const time = this.time.value;
    const passengers = this.passengers.value;

    //get all data
    const cars = Car.list;
    console.log(cars);

    //filter data
    const filterData = this.filterCar(cars, date, time, passengers);
    console.log(filterData);

    this.clearData();

    this.renderData(filterData);
  }

  filterCar(data, inputDate, inputTime, inputPassengers) {
    const listCar = [];

    data.forEach((car) => {
      const { date, hour } = car.availableAt;
      if (
        date === inputDate &&
        hour <= inputTime &&
        car.capacity >= parseInt(inputPassengers)
      ) {
        listCar.push(car);
      }
    });

    return listCar;
  }

  renderData(filteredData) {
    const colCard = document.createElement("div");
    colCard.classList.add(
      "row",
      "row-cols-1",
      "row-cols-sm-4",
      "gx-0",
      "gy-3",
      "gx-sm-3",
      "gy-sm-3"
    );
    const container = document.querySelector("#container-card");
    console.log(container);

    container.appendChild(colCard);
    filteredData.forEach((car) => {
      console.log(car);
      this.card = document.createElement("div");
      this.card.classList.add("col");
      this.card.innerHTML = car.render();
      colCard.appendChild(this.card);
    });
  }

  clearData() {
    let containerChild =
      document.querySelector("#container-card").firstElementChild;
    while (containerChild) {
      containerChild.remove();
      containerChild =
        document.querySelector("#container-card").firstElementChild;
    }
  }
}
