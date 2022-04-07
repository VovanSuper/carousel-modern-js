export const setupTestCarousel = () => `
<div id="carousel" class="carousel-container">
  <div class="slide slide-1"><img src="assets/1.jpeg" alt="Slide-1" class="slide-img-1" /></div>
  <div class="slide slide-2"><img src="assets/2.jpeg" alt="Slide-2" class="slide-img-2" /></div>
  <div class="slide slide-3"><img src="assets/3.jpeg" alt="Slide-3" class="slide-img-3" /></div>
  <div class="slide slide-4"><img src="assets/4.jpeg" alt="Slide-4" class="slide-img-4" /></div>
  <div class="slide slide-5"><img src="assets/5.jpeg" alt="Slide-5" class="slide-img-5" /></div>
  <div class="slide slide-6"><img src="assets/6.jpeg" alt="Slide-6" class="slide-img-6" /></div>
  <div class="slide slide-7"><img src="assets/7.jpeg" alt="Slide-7" class="slide-img-7" /></div>
  <div class="slide slide-8"><img src="assets/8.jpeg" alt="Slide-8" class="slide-img-8" /></div>
  <div class="slide slide-9"><img src="assets/9.jpeg" alt="Slide-9" class="slide-img-9" /></div>
</div>
`;

export const createTestStyles = (
  sliderSelector,
  sliderWrapperSelector,
  SingleSlideSelector
) => {
  const style = new CSSStyleSheet(); // CSSOM stylesheet
  style.insertRule(
    `
    ${sliderSelector} {
      display: block;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      width: 500px;
      height: 500px;
    }`,
    0
  );
  style.insertRule(
    `
    ${sliderWrapperSelector} {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: nowrap;
      transition: 1.5s ease-in-out .1s;
      box-sizing: border-box; 
      transform: translate3d(0, 0, 0);
      transition-timing-function: cubic-bezier(.7, 0, .3, 1);
    }
`,
    1
  );
  style.insertRule(
    `
    ${SingleSlideSelector} {
      background-size: cover;
      background-position: center top;
      height: 100%;
      float: left;
    }
  `,
    2
  );

  return [style];
};

export const arrowLeft = `
  <svg width="46" height="75" viewBox="0 0 46 75" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <path d="M40.8611 74.9998C39.6657 74.9998 38.468 74.5794 37.5568 73.7298L1.90045 40.5693C0.0755014 38.8724 0.0755014 36.1255 1.90045 34.4285L37.5568 1.27249C39.3817 -0.424489 42.3381 -0.424489 44.163 1.27249C45.988 2.96947 45.988 5.71853 44.163 7.41331L11.8063 37.4989L44.163 67.5845C45.988 69.2815 45.988 72.0328 44.163 73.7298C43.2517 74.5772 42.0564 74.9998 40.8611 74.9998Z" fill="#F0F0F0" fill-opacity="0.5"/>
    <path d="M38.2387 72.9983L38.2378 72.9975L2.58146 39.8371L2.58141 39.837C1.18185 38.5356 1.18185 36.4623 2.58141 35.1608L38.2377 2.00481C39.6788 0.664739 42.0409 0.664739 43.4821 2.00481C44.8819 3.30649 44.8812 5.38166 43.4825 6.68055L43.4821 6.68097L11.1254 36.7666L10.3377 37.4989L11.1254 38.2313L43.4821 68.3169C44.8816 69.6183 44.8816 71.696 43.4821 72.9975C42.7708 73.6588 41.825 73.9998 40.8611 73.9998C39.8954 73.9998 38.9484 73.66 38.2387 72.9983Z" stroke="#575757" stroke-opacity="0.75" stroke-width="2"/>
  </svg>
`;

export const resetCarousel = (
  /** @type {import('../../lib/index').CarouselModern} */ carousel
) => {
  setupTestCarousel();
};
