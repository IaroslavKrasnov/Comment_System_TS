import { Main } from './main.js';

class App {
  basis = document.getElementById('app') as HTMLElement;
  main = new Main(this.basis);

  constructor() {
    this.introduce();
  }

  private introduce() {
    this.main.introduce();
  }
}

new App();