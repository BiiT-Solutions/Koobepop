import { NavMock, PlatformMock} from "../../mocks"
import { HomePage } from "./home"

let homePage: HomePage = null

describe('Home page', () => {
  beforeEach(() => {
    homePage = new HomePage((<any>new NavMock), (<any>new PlatformMock));
    homePage.BOOK_HEIGHT = 2;
  })
  it("should check if homePage width is less than 3", () => {
    expect(homePage.BOOK_HEIGHT).toBeLessThan(3);
  })
})


















