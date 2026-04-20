import { HomePage, setupHomePage } from "./pages/home.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = HomePage();
  setupHomePage();

});