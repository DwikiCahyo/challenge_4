class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return ` <div class="card" style = "max-height: "250px">
    <img
       src="${this.image}"
      alt="${this.manufacture}"
       class="card-img-top "
       width = "100px"
       height ="200px"
     />
    <div class="card-body">
      <p class="card-text">${this.type}</p>
       <h5 class="card-title mt-3">${this.rentPerDay} / hari</h5>
       <p>
         ${this.description}
       </p>
       <div class="d-flex">
         <img src="images/fi_users.svg" width="20px" height="20px" />
         <p class="ms-2">${this.capacity}</p>
       </div>
       <div class="d-flex">
         <img
           src="images/fi_settings.svg"
           width="20px"
           height="20px"
         />
         <p class="ms-2">${this.transmission}</p>
       </div>
       <div class="d-flex">
         <img
           src="images/fi_calendar.svg"
           width="20px"
           height="20px"
         />
         <p class="ms-2">Tahun ${this.year}</p>
       </div>
       <button class="btn btn-success w-100">Pilih Mobil</button>
     </div>`;
  }
}
