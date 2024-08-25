import { ElementsType, getElements } from './utils.js';
import { CommentBlock } from './commentBlock.js';

enum Elements {
  commentsBlock = 'commentsBlock',
}

export class Main {
  private readonly _basis: HTMLElement;
  private readonly _sections: ElementsType = {};
  private _sample = `
        <section class="commentsBlock" data-element="commentsBlock"></section>
      </div>
    </main>
  `;

  constructor(basis: HTMLElement) {
    this._basis = basis;
  }

  public introduce() {
    this._basis.innerHTML = this._sample;
    getElements(this._basis, this._sections);
    new CommentBlock(this._sections[Elements.commentsBlock]);
  }
}