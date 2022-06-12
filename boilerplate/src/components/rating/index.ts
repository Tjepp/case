import { html, LitElement, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import "./rating-star.ts";

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @state()
  rating = 0;

  @state()
  index = 0;

  static styles = css`
    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    rating-star {
      --star-inactive: #cacaca;
      --star-active: #ffd500;
    }
  `;

  private _focusHandler(e: CustomEvent) {
    if (!this.rating) this.index = e.detail;
  }

  private _unFocusHandler() {
    if (!this.rating) this.index = 0;
  }

  private _onClick(e: CustomEvent) {
    this.rating = e.detail;
  }

  render() {
    console.log("rendering");

    return html`<div class="container" @mouseout=${this._unFocusHandler}>
        ${map(
          range(1, 6),
          (i) =>
            html` ${this.index >= i
              ? html`<rating-star
                  value=${i}
                  active
                  @starFocused=${this._focusHandler}
                  @starClick=${this._onClick}
                />`
              : html`<rating-star
                  value=${i}
                  @starFocused=${this._focusHandler}
                  @starClick=${this._onClick}
                />`}`
        )}
      </div>
      <p>You've rated: ${this.rating} / 5</p>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "case-rating": CaseRating;
  }
}
