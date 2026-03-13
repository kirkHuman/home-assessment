import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, 'https://www.palcofirst.com');
  }

  readonly selectors = {
    /** Visible main nav only (desktop nav; excludes hidden duplicate). */
    mainNav: 'nav[aria-label="Menu"]:visible',
    /** Services submenu (ul.sub-menu inside the Services list item). */
    servicesSubmenu: 'nav[aria-label="Menu"]:visible li:has(> a[href="https://www.palcofirst.com/services/"]) > ul.sub-menu',
    heading: 'h1:has-text("Redefining Self-Direction")',
    programsNav: 'nav a:has-text("Programs")',
    connectPortal: 'a:has-text("Connect Portal")',
    contactUs: 'a:has-text("Contact Us")',
    searchButton: 'button[aria-label="Search"], a:has-text("Search")',
    blogLink: 'a:has-text("Blog")',
  } as const;

  /** Expected base path for each Services dropdown item (from home). */
  static readonly servicesUrls: Record<string, string> = {
    FMS: '/services/fms/',
    'Support Broker': '/services/support-broker/',
    Palcare: '/services/palcare/',
    SDoH: '/services/sdoh/',
    'Wages Now': '/services/wages-now/',
  };

  async open() {
    await this.goto('/');
  }

  async getHeadingText() {
    return this.page.locator(this.selectors.heading).textContent();
  }

  async clickPrograms() {
    await this.page.locator(this.selectors.programsNav).first().click();
  }

  async clickConnectPortal() {
    await this.page.locator(this.selectors.connectPortal).first().click();
  }

  async clickContactUs() {
    await this.page.locator(this.selectors.contactUs).first().click();
  }

  /** Open Services dropdown (hover the visible nav trigger to reveal submenu). */
  async openServicesDropdown() {
    await this.page
      .locator(this.selectors.mainNav)
      .getByRole('link', { name: 'Services', exact: true })
      .hover();
  }

  /** Hover Services to open dropdown, then click the given service link. */
  async hoverServicesDropdownAndClick(linkText: string) {
    await this.openServicesDropdown();
    // SmartMenus keeps ul.sub-menu as display:none in headless mode even after
    // hover (show delay + no bounding box). force:true still requires a layout
    // box to scroll-into-view, so it fails. dispatchEvent('click') fires the DOM
    // click event directly on the node without needing visibility or position.
    const link = this.page
      .locator(this.selectors.servicesSubmenu)
      .locator(`a.elementor-sub-item:has-text("${linkText}")`);
    await link.dispatchEvent('click');
  }
}
