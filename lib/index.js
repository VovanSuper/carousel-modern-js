export const WrapperClassName = 'carousel-wrapper';
export const ContainerClassName = 'carousel-container';

export class CarouselModern {
  /** @type {number} */ currentIndex = 0;
  /** @type {HTMLElement} */ containerEl;
  /** @type {Array<HTMLDivElement>} */ slides = [];
  subscribers = [];

  #state = {
    currIndex: this.currentIndex,
    hasNext: false,
    hasPrev: false,
    isPlaying: false,
  };

  #notifyStateChange() {
    this.subscribers.forEach((sub) => sub(this.#state));
  }

  subscribeToSate(cb) {
    this.subscribers.push(cb);
  }

  #hasNext() {
    return this.#state.currIndex < this.slides.length - 1;
  }

  #hasPrev() {
    return this.#state.currIndex > 0;
  }

  setState(newState = {}) {
    this.#patchState({ ...newState });
    this.#patchState({ hasNext: this.#hasNext(), hasPrev: this.#hasPrev() });
    this.currentIndex = this.#state.currIndex;
    this.#notifyStateChange();
  }

  #patchState(newState = {}) {
    this.#state = {
      ...this.#state,
      ...newState,
    };
  }

  constructor(containerOrSelector, iniState = {}) {
    this.#patchState(iniState);
    this.containerEl =
      containerOrSelector instanceof HTMLElement
        ? containerOrSelector
        : document.querySelector(containerOrSelector);

    this.setSlides();
    this.createViewPortWrapper();
    // this.createBasicStyles();
    const onIndexUpdateLogger = () =>
      console.log(`[OnIndexUpdate]: this.currentIndex :: ${this.currentIndex}`);

    const setTranslateOnMove = () => {
      // const singleSlideLen =
    };

    this.subscribeToSate(onIndexUpdateLogger);
  }

  setSlides() {
    try {
      this.slides = getChildrenArray(this.containerEl);
    } catch (e) {
      console.log(e);
    }
  }

  createViewPortWrapper() {
    try {
      if (
        this.containerEl.hasChildNodes() &&
        this.containerEl.firstChild.className === WrapperClassName &&
        !!getChildrenArray(this.containerEl.firstChild).length
      ) {
        return;
      }
      const tempFragment = document.createDocumentFragment();
      tempFragment.append(...this.slides);

      const wrapperEl = document.createElement('div');
      wrapperEl.className = WrapperClassName;
      wrapperEl.append(tempFragment);
      this.containerEl.replaceChildren(wrapperEl);
    } catch (e) {
      console.error(e);
    }
  }

  createBasicStyles() {
    this.slides.forEach((slide) => {
      slide.style.maxWidth = '10rem';
      slide.style.maxHeight = '10rem';
    });
  }

  moveToIndex(index = 0) {
    // set carousel state to the argument index, changing translate props of slides elements accordingly
    const slidesLen = this.slides.length;

    const calculateIndex = () => {
      const modIndex = index % slidesLen;
      return modIndex >= 0 ? modIndex : modIndex + slidesLen;
    };

    const currIndex = calculateIndex();

    this.setState({ currIndex });
  }

  moveToNext() {
    this.moveToIndex(this.currentIndex + 1);
  }

  moveToPrev() {
    this.moveToIndex(this.currentIndex - 1);
  }

  setCurrentIndex(val) {
    if (val > this.slides.length) {
      this.currentIndex = 0;
    }
    if (val < 0) {
      this.currentIndex = this.slides.length - 1;
    }
    this.currentIndex = val;
  }
}

/**
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
export const getChildrenArray = (container) =>
  Array.from(container.childNodes).filter((el) => el.nodeType === 1);
