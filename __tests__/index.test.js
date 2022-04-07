import {
  CarouselModern,
  ContainerClassName,
  getChildrenArray,
  WrapperClassName,
} from '../lib/index.js';
import { setupTestCarousel, createTestStyles } from './helpers/utils.js';

describe('All tests', () => {
  const querySelectorStr = '#carousel';
  /** @type {CarouselModern} */ let carousel;
  beforeEach(() => {
    document.body.innerHTML = setupTestCarousel();
    carousel = new CarouselModern(querySelectorStr);
  });

  describe('creation', () => {
    test('CarouselModule should be instantiated from querySelector', () => {
      expect(carousel).toBeInstanceOf(CarouselModern);
    });
    test('CarouselModule should be instantiated from html element', () => {
      const containerEl = document.querySelector(querySelectorStr);
      const carousel = new CarouselModern(containerEl);
      expect(carousel).toBeInstanceOf(CarouselModern);
    });
  });

  describe('carousel logic', () => {
    test('CarouselModule should find all slides', () => {
      const slides = carousel.slides;
      expect(slides).toBeTruthy();
      expect(slides).toBeInstanceOf(Array);
      expect(carousel.slides).toBeInstanceOf(Array);
    });

    test('carousel has wrapper created', () => {
      const wrapperEl = carousel.containerEl.querySelector(`.${WrapperClassName}`);

      expect(wrapperEl).toBeInstanceOf(HTMLDivElement);
      expect(wrapperEl.classList).toContain(WrapperClassName);

      const slidesEls = getChildrenArray(wrapperEl);
      expect(slidesEls).toHaveLength(9);
    });

    test('carousel slides elements', () => {
      const newCarouselContainer = carousel.containerEl.cloneNode(true);

      expect(newCarouselContainer).toBeInstanceOf(HTMLDivElement);
      expect(getChildrenArray(newCarouselContainer.firstChild)).toBeArrayOfSize(9);

      getChildrenArray(carousel.containerEl.firstChild)
        .map((/** @type {HTMLElement} slide */ slide) => slide.className)
        .forEach((className) => expect(className).toContain('slide'));

      getChildrenArray(carousel.containerEl.firstChild)
        .map((slide) => slide.firstChild)
        .map((imgEl) => imgEl.className)
        .forEach((className, i) =>
          expect(className).toEqualCaseInsensitive(`slide-img-${i + 1}`)
        );
    });

    test('moveToIndex() should set index', () => {
      expect(carousel.currentIndex).toBe(0);

      carousel.moveToIndex(5);
      expect(carousel.currentIndex).toEqual(5);
    });

    test('subscriber invoked on carousel action', () => {
      const mockSub = jest.fn((args) => args);
      carousel.subscribeToSate(mockSub);
      carousel.moveToNext();
      carousel.moveToNext();
      expect(mockSub).toBeCalledTimes(2);
      expect(mockSub).toReturn();
      expect(mockSub).toReturnTimes(2);
    });

    test('index should update on moveToNext / moveToPrev', () => {
      //initially index should be '0';
      expect(carousel.currentIndex).toEqual(0);

      // move to next
      carousel.moveToNext();
      expect(carousel.currentIndex).toEqual(1);

      // move to next once more
      carousel.moveToNext();
      expect(carousel.currentIndex).toEqual(2);

      // now, move back
      carousel.moveToPrev();
      expect(carousel.currentIndex).toEqual(1);

      // now, move back once more
      carousel.moveToPrev();
      expect(carousel.currentIndex).toEqual(0);

      // now, move back once more
      carousel.moveToPrev();
      expect(carousel.currentIndex).toEqual(8);
    });
  });

  describe('UI / styling', () => {
    /** @type {HTMLDivElement} */ let wrapperEl;
    let acceptedStylesheet;
    let firstStylesSet;

    beforeEach(() => {
      document.adoptedStyleSheets = [
        ...createTestStyles(`#carousel`, `.${WrapperClassName}`, `.slide`),
      ];
      wrapperEl = carousel.containerEl.querySelector(`.${WrapperClassName}`);
      acceptedStylesheet = document.adoptedStyleSheets;
      firstStylesSet = acceptedStylesheet[0];
    });

    //-- adopted styles --//
    test('accordion wrapper has adopted styles applied', () => {
      const slidesEls = wrapperEl.querySelectorAll('.slide');
      const carouselContainerRules = firstStylesSet.cssRules[0];

      const { selectorText } = carouselContainerRules;
      const { width, height, overflow, 'box-sizing': Bsz } = carouselContainerRules.style; // #carousel;
      expect(slidesEls.item(0)).toBeInstanceOf(HTMLDivElement);
      expect(slidesEls).toHaveLength(9);
      expect(carouselContainerRules.length).not.toEqual(0);
      expect(height).toEqual('500px');
      expect(width).toEqual('500px');
      expect(overflow).toEqual('hidden');
      expect(Bsz).toEqual('border-box');
      expect(selectorText).toEqual(querySelectorStr);
    });

    test('slide has test styles applied', () => {
      const slidesRules = firstStylesSet.cssRules[2];
      const { float, height, 'background-size': BgSize } = slidesRules.style; // #carousel;
      const { selectorText } = slidesRules;

      expect(selectorText).toBe('.slide');
      expect(float).toEqual('left');
      expect(height).toEqual('100%');
      expect(BgSize).toEqual('cover');
    });
    //-- adopted styles end --//

    //-- translate styles --//
    test('should apply translate transform to carousel wrapper on moveToNext', () => {
      carousel.moveToNext();
      const { transform, transition, translate } = wrapperEl.style;

      expect(translate).toContain('500px');
    });
    //-- translate styles end--//
  });
});
