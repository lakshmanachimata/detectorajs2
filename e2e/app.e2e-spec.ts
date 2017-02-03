import { BjdetectorPage } from './app.po';

describe('bjdetector App', function() {
  let page: BjdetectorPage;

  beforeEach(() => {
    page = new BjdetectorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
