import { ElementsType, getElements } from './utils.js';
import { ControlPanel } from './controlPanel.js';
import { CommentForm } from './commentForm.js';
import { Comments } from './comments.js';

enum Elements {
  controlPanel = 'controlPanel',
  commentForm = 'commentForm',
  comments = 'comments',
}

export class CommentBlock {
  private readonly _commentBlock: HTMLElement;
  private readonly _elements: ElementsType = {};

  private _controlPanel!: ControlPanel;
  private _comments!: Comments;

  private _sampleCommentBlock = `
    <div class="control_panel" data-element="${Elements.controlPanel}"></div>
    <div class="comment_form" data-element="${Elements.commentForm}"></div>
    <div data-element="${Elements.comments}"></div>
  `;

  constructor(commentBlock: HTMLElement) {
    this._commentBlock = commentBlock;

    this.introduce();
  }

  public introduce() {
    this._commentBlock.innerHTML = this._sampleCommentBlock;
    getElements(this._commentBlock, this._elements);

    if (!localStorage.getItem('comments')) localStorage.setItem('comments', '[]');
    localStorage.setItem('sort', 'relevance');
    if (!localStorage.getItem('favorite')) localStorage.setItem('favorite', '[]');
    localStorage.setItem('favoriteState', 'false');

    this._controlPanel = new ControlPanel(
      this._elements[Elements.controlPanel],
      this.updateComments,
      this.showFavoriteComments
    );
    new CommentForm(this._elements[Elements.commentForm], this.updateComments, this.updateCounter);
    this._comments = new Comments(this._elements[Elements.comments]);
  }

  updateCounter = () => {
    this._controlPanel.updateCounter();
  };

  updateComments = () => {
    this._comments.updateComments();
  };

  showFavoriteComments = () => {
    this._comments.showFavoriteComments();
  };
}
