import { ElementsType, getElements, sortBy } from './utils.js';
import { Comment, CommentType } from './comment.js';

export class Comments {
  private readonly _comments: HTMLElement;
  private readonly _elements: ElementsType = {};
  private _commentContain: CommentType[];

  constructor(comments: HTMLElement) {
    this._comments = comments;
    this._commentContain = JSON.parse(localStorage.getItem('comments') as string);

    this.introduce();
  }

  introduce() {
    if (!this._commentContain) return;

    const parentComments = this._commentContain.filter((item) => !item.parent);
    this.renderComments(sortBy(parentComments)!);
    this.loadingAnimation();
  }

  private loadingAnimation() {
    document.addEventListener('DOMContentLoaded', () =>
      this._comments.classList.add('load_animation')
    );
  }

  updateComments = () => {
    this._commentContain = JSON.parse(localStorage.getItem('comments') as string);
    localStorage.setItem('favoriteState', 'false');
    this.introduce();
  };

  showFavoriteComments = () => {
    const isFavoriteState = localStorage.getItem('favoriteState') === 'true';

    if (isFavoriteState) {
      const favoriteComments: CommentType[] = JSON.parse(
        localStorage.getItem('favorite') as string
      );

      this.renderComments(favoriteComments);
    } else {
      this._commentContain = JSON.parse(localStorage.getItem('comments') as string);
    }
  };

  private renderComments(comments: CommentType[]) {
    this._comments.innerHTML = comments
      .map((comment) => `<div data-element="${comment.uuid}"></div>`)
      .join('');
    getElements(this._comments, this._elements);

    Object.entries(this._elements).forEach(([id, element]) => {
      new Comment(
        element,
        id,
        this.updateComments,
        this.patchCommentData,
        this.showFavoriteComments
      );
    });
  }

  patchCommentData = (data: CommentType) => {
    this._commentContain = JSON.parse(localStorage.getItem('comments') as string);
    const patchedData = this._commentContain.map((comment) =>
      comment.uuid === data.uuid ? data : comment
    );
    localStorage.setItem('comments', JSON.stringify(patchedData));
  };
}