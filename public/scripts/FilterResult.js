class FilterResult {
  constructor(date, time, passengers, result, content) {
    this.date = date;
    this.time = time;
    this.passengers = passengers;
    this.content = content;
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

  filterCar(data, date, time, passengers) {
    const listCar = [];
    data.forEach((car) => {
      if (
        car.availableAt.date === date &&
        car.availableAt.hour <= time &&
        car.capacity >= parseInt(passengers)
      ) {
        listCar.push(car);
      }
    });

    return listCar;
  }

  renderData() {
    Car.list.forEach((car) => {
      console.log(car);
      const card = document.createElement("div");
      card.classList.add("col");
      this.content.appendChild(card);
      card.innerHTML = car.render();
    });
  }
}
