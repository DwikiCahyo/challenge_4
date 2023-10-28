class FilterResult {
  constructor(date, time, passengers, result) {
    this.date = date;
    this.time = time;
    this.passengers = passengers;
    this.result = result;
  }

  async loadData(e) {
    e.preventDefault();
    const date = this.date.value;
    const time = this.time.value;
    const passengers = this.passengers.value;

    //get all data
    const data = await Binar.listCars();

    //filter data
    const filterData = this.filterCar(data, date, time, passengers);
    console.log(filterData);

    Car.init(filterData);

    this.renderData();
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

  renderData() {
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
    Car.list.forEach((car) => {
      console.log(car);
      this.card = document.createElement("div");
      this.card.classList.add("col");
      this.card.innerHTML = car.render();
      colCard.appendChild(this.card);
    });
  }
}
