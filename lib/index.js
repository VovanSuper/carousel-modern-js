export class CarouselModern {
  /** @type {HTMLElement} containerEl */ containerEl;
  slides = [];

  constructor(containerOrSelector) {
    this.containerEl = containerOrSelector instanceof HTMLElement ? containerOrSelector : document.querySelector(containerOrSelector);
  }

  getSlides() {
    try {
      this.slides = this.containerEl.childNodes;
      return this.slides;
    } catch (e) {
      console.log(e);
    }
  }

  createViewPortWrapper() {
    const tmpFragment = document.createDocumentFragment();
    const wrapper = document.createElement('div');
    wrapper.className = 'carouse-wrapper';
    tmpFragment.appendChild(wrapper);
    tmpFragment.firstChild.append(this.slides);

    this.containerEl.replaceChildren(tmpFragment);
  }
}
