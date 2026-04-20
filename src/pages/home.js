import { next, prev, renderProduct } from "../utils/products.js";

export function HomePage() {
  return `
    <section class="home-page">

      <img id="prev-btn" class="btn btn-prev" src="../../assets/images/icons/left.svg" alt="Anterior" />

      <div class="content">
        <img id="content-img" alt="Conteudo" />

        <section class="hero-wrapper">
          <img
            src="../../assets/images/bg/portal.svg"
            alt="Portal"
            class="portal"
          >
          <section class="hero-section">
            <div id="hero-animation"></div>
          </section>
        </section>

        <img id="benefits-img" alt="Benefícios" />
      </div>

      <img id="next-btn" class="btn btn-next" src="../../assets/images/icons/right.svg" alt="Próximo" />
    </section>

    <section class="mobile-bottom">
      <img id="mobile-content-img" alt="Conteudo mobile" />
      <img id="mobile-benefits-img" alt="Benefícios mobile" />
    </section>
  `;
}

export function setupHomePage() {
  renderProduct();

  document.getElementById("next-btn")?.addEventListener("click", next);
  document.getElementById("prev-btn")?.addEventListener("click", prev);
}