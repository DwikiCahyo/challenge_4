class App {
  constructor() {
    this.form = document.querySelector("#search-form");
    this.submitButon = document.getElementById("submit-button");
    this.filterResult = new FilterResult(
      document.getElementById("tanggal"),
      document.getElementById("waktuJemput"),
      document.getElementById("penumpang"),
      document.querySelector("#result")
    );
  }

  init() {
    this.submitButon.addEventListener("click", (e) =>
      this.filterResult.loadData(e)
    );
  }
}
