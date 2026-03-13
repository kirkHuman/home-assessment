import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page, protected basePath = '') {}

  async goto(path = '') {
    const url = this.basePath ? `${this.basePath}${path}` : path || '/';
    await this.page.goto(url);
  }

  get title() {
    return this.page.title();
  }
}
