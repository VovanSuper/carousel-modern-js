import { CarouselModern } from './index.js';

describe('All tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
  <div id="carousel" class="carousel-container">
  <div class="slide-1"><img src="assets/1.jpeg" alt="Slide-1" class="slide-img-1" /></div>
  <div class="slide-2"><img src="assets/2.jpeg" alt="Slide-2" class="slide-img-2" /></div>
  <div class="slide-3"><img src="assets/3.jpeg" alt="Slide-3" class="slide-img-3" /></div>
  <div class="slide-4"><img src="assets/4.jpeg" alt="Slide-4" class="slide-img-4" /></div>
  <div class="slide-5"><img src="assets/5.jpeg" alt="Slide-5" class="slide-img-5" /></div>
  <div class="slide-6"><img src="assets/6.jpeg" alt="Slide-6" class="slide-img-6" /></div>
  <div class="slide-7"><img src="assets/7.jpeg" alt="Slide-7" class="slide-img-7" /></div>
  <div class="slide-8"><img src="assets/8.jpeg" alt="Slide-8" class="slide-img-8" /></div>
  <div class="slide-9"><img src="assets/9.jpeg" alt="Slide-9" class="slide-img-9" /></div>
  </div>
  `;
  });

  describe('creation', () => {
    test('CarouselModule should be instantiated from querySelector', () => {
      const querySelectorStr = '#carousel';
      const carousel = new CarouselModern(querySelectorStr);
      expect(carousel).toBeInstanceOf(CarouselModern);
    });
    test('CarouselModule should be instantiated from html element', () => {
      const containerEl = document.querySelector('#carousel');
      const carousel = new CarouselModern(containerEl);
      expect(carousel).toBeInstanceOf(CarouselModern);
    });
  });

  describe('inner logic', () => {
    /** @type {CarouselModern} carousel */ let carousel;

    beforeEach(() => {
      const containerEl = document.querySelector('#carousel');
      carousel = new CarouselModern(containerEl);
    });

    test('CarouselModule should find all slides', () => {
      const slides = carousel.getSlides();
      expect(slides).toBeTruthy();
      expect(slides).toBeInstanceOf(NodeList);
      expect(carousel.slides).toBeInstanceOf(NodeList);
      console.log(carousel.slides)
    });
  });
});
