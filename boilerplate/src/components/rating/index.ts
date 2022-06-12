import { html, LitElement, css, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";

const star = svg`<path d="M49.9 18.1c-.6-1.9-2.8-2.2-2.8-2.2l-13.1-2L28 2s-1-2-3-2-3 2-3 2l-5.9 11.9-13.1 2s-2.2.3-2.8 2.2c-.6 1.9 1 3.5 1 3.5l9.6 9.4-2.5 13s-.4 2.2 1.2 3.4c1.6 1.2 3.6.2 3.6.2L25 41.8l12.1 5.9s2 1 3.6-.2 1.2-3.4 1.2-3.4l-2.5-13 9.6-9.4c-.1-.1 1.5-1.7.9-3.6z"/>`;
const defaultActive = css`#ffd500`;
const defaultInactive = css`#cacaca`;
@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @state()
  rating = 0;

  static styles = css`
    svg {
      width: 70px;
      height: 70px;
    }

    button {
      all: unset;
      fill: var(--star-active, ${defaultActive});
    }

    .container:hover > button {
      fill: ${defaultActive};
    }

    .container > button:hover ~ button {
      fill: ${defaultInactive};
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

  private _onClick(value: number) {
    this.rating = value;
  }

  render() {
    return html`<div class="container">
        ${map(range(1, 6), (starNumber) => {
          return html`<button
            @click=${() => this._onClick(starNumber)}
            style="--star-active: ${this.rating >= starNumber
              ? defaultActive
              : defaultInactive}"
          >
            <span class="visually-hidden"> Rate ${starNumber} out of 5 </span>
            <svg
              viewBox="0 0 50 49"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              ${star}
            </svg>
          </button>`;
        })}
      </div>
      <p>You've rated: ${this.rating} / 5</p>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "case-rating": CaseRating;
  }
}
