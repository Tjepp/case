import { LitElement, html, svg, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const star = svg`<path d="M49.9 18.1c-.6-1.9-2.8-2.2-2.8-2.2l-13.1-2L28 2s-1-2-3-2-3 2-3 2l-5.9 11.9-13.1 2s-2.2.3-2.8 2.2c-.6 1.9 1 3.5 1 3.5l9.6 9.4-2.5 13s-.4 2.2 1.2 3.4c1.6 1.2 3.6.2 3.6.2L25 41.8l12.1 5.9s2 1 3.6-.2 1.2-3.4 1.2-3.4l-2.5-13 9.6-9.4c-.1-.1 1.5-1.7.9-3.6z"/>`;

@customElement("rating-star")
class RatingStar extends LitElement {
  @property({ type: Boolean })
  active = false;

  @property({ type: Number })
  value = 0;

  static styles = css`
    svg {
      width: 70px;
      height: 70px;
    }

    button {
      all: unset;
    }

    button:focus-visible {
      outline: 1px solid #006db7;
      box-shadow: 0 0 12px #006db7;
    }

    .visually-hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  `;

  private _starFocused() {
    const options = {
      detail: this.value,
      bubbles: true,
      composed: true,
    };

    if (!this.active)
      this.dispatchEvent(new CustomEvent("starFocused", options));
  }

  private _starClick() {
    const options = {
      detail: this.value,
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("starClick", options));
  }

  render() {
    const mainColor = this.active
      ? css`var(--star-active)`
      : css`var(--star-inactive)`;

    return html`<button
      @focus=${this._starFocused}
      @mouseover=${this._starFocused}
      @click=${this._starClick}
    >
      <span class="visually-hidden"> Rate ${this.value} out of 5 </span>
      <svg
        viewBox="0 0 50 49"
        fill="${mainColor}"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${star}
      </svg>
    </button>`;
  }
}

//Could use default color
//Doesnt know the total amount of stars and isnt localized
//Could have been a radio group with radiobuttons
