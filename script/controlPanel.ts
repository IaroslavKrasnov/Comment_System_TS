import { CommentType } from './comment.js';
import { ElementsType, getElements } from './utils.js';

enum Elements {
  commentsFilter = 'commentsFilter',
  counter = 'counter',
  selectButton = 'selectButton',
  selectDropdown = 'selectDropdown',
  favoriteFilter = 'favoriteFilter',
}

export class ControlPanel {
  private readonly _controlPanel: HTMLElement;
  private readonly _elements: ElementsType = {};
  private _selectData = [
    { key: 'date', value: 'По дате' },
    { key: 'rating', value: 'По количеству оценок' },
    { key: 'relevance', value: 'По актуальности' },
    { key: 'replies', value: 'По количеству ответов' },
  ];

  private readonly _updateComments: () => void;
  private readonly _showFavoriteComments: () => void;

  private _sampleControlPanel = `
    <button class="comments_btn active" data-element="${Elements.commentsFilter}">
      Комментарии <span data-element="${Elements.counter}"></span>
    </button>
    <div class="btn_wrapper">
      <div class="select">
        <button class="select_btn" data-element="${Elements.selectButton}">
          <span>По актуальности</span> <img src="./images/arrow_up.svg" alt="arrow up"/>
        </button>
        <ul class="select_dropdown hide"
        data-element="${Elements.selectDropdown}">
          ${this._selectData
            .map(
              (item) =>
                `<li value="${item.key}"><img src="./images/checkbox.svg" alt="checkbox"/> ${item.value}</li>`
            )
            .join('')}
        </ul>
      </div>
      <button class="favorite_btn" data-element="${Elements.favoriteFilter}">
        <span>Избранное</span> <img src="./images/favorite_heart.svg" alt="favorite heart"/>
      </button>
    </div>
  `;

  constructor(
    controlPanel: HTMLElement,
    updateComments: () => void,
    showFavoriteComments: () => void
  ) {
    this._controlPanel = controlPanel;

    this._updateComments = updateComments;
    this._showFavoriteComments = showFavoriteComments;
    this.introduce();
  }

  introduce() {
    this._controlPanel.innerHTML = this._sampleControlPanel;
    getElements(this._controlPanel, this._elements);
    this.updateCounter();
    this.addListeners();

    const defaultSort = localStorage.getItem('sort');
    const defaultListItem = this._elements[Elements.selectDropdown].querySelector(
      `li[value="${defaultSort}"] img`
    ) as HTMLImageElement;

    if (defaultListItem) {
      defaultListItem.style.visibility = 'visible';
    }
  }

  updateCounter() {
    const counter = this._elements[Elements.counter] as HTMLElement;
    const commentsCounter = JSON.parse(localStorage.getItem('comments') as string).filter(
      (item: CommentType) => !item.parent
    ).length;

    counter.innerHTML = `(${commentsCounter})`;
  }

  onSelectButton = () => {
    const button = this._elements[Elements.selectButton] as HTMLButtonElement;
    const icon = button.lastElementChild as HTMLPictureElement;
    const dropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;

    icon.classList.toggle('rotate');
    dropdown.classList.toggle('hide');
  };

  onSelectDropdown = (event: MouseEvent) => {
    const button = this._elements[Elements.selectButton] as HTMLButtonElement;
    const dropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;

    if (event.target instanceof HTMLElement) {
      const listItem = event.target.closest('li');

      if (listItem) {
        const favoriteFilter = this._elements[Elements.favoriteFilter] as HTMLButtonElement;
        const commentsFilter = this._elements[Elements.commentsFilter] as HTMLButtonElement;
        commentsFilter.classList.add('active');
        favoriteFilter.classList.remove('active');

        const sortType = listItem.getAttribute('value') as string;
        const sortTypeLabel = this._selectData.find((item) => item.key === sortType);

        localStorage.setItem('sort', sortType);
        button.innerHTML = `<span>${sortTypeLabel?.value}</span> <img src="./images/arrow_up.svg" alt="arrow up"/>`;

        const ListItems = dropdown.querySelectorAll('li');
        ListItems.forEach((item) => {
          const checkMark = item.querySelector('img') as HTMLImageElement;
          checkMark.style.visibility = 'hidden';
        });

        const checkMark = listItem.querySelector('img') as HTMLImageElement;
        checkMark.style.visibility = 'visible';
      }
    }

    dropdown.classList.toggle('hide');
    this._updateComments();
  };

  addListeners() {
    const selectButton = this._elements[Elements.selectButton] as HTMLButtonElement;
    const selectDropdown = this._elements[Elements.selectDropdown] as HTMLUListElement;
    const favoriteFilter = this._elements[Elements.favoriteFilter] as HTMLButtonElement;
    const commentsFilter = this._elements[Elements.commentsFilter] as HTMLButtonElement;

    selectButton.addEventListener('click', this.onSelectButton);
    selectDropdown.addEventListener('click', this.onSelectDropdown);

    favoriteFilter.addEventListener('click', () => {
      favoriteFilter.classList.add('active');
      commentsFilter.classList.remove('active');

      localStorage.setItem('favoriteState', 'true');
      this._showFavoriteComments();
    });

    commentsFilter.addEventListener('click', () => {
      commentsFilter.classList.add('active');
      favoriteFilter.classList.remove('active');
      this._updateComments();
    });
  }
}