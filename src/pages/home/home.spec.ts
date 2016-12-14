


//import { Todea } from "./home"
//import { NavController } from "ionic-angular";
//import { HomePage } from "./home.ts"
import { NavMock, PlatformMock} from "../../mocks"
import { Todea } from "./todea"
//import "../../polyfills.ts"

//let homePage = new HomePage((<any>new NavMock), (<any>new PlatformMock));
let todea = new Todea("Cristian", 10);

describe('Home page: ', () => {
  //   beforeEach(()=>{
  //     homePage = new HomePage((<any>new NavMock), (<any>new PlatformMock));
  //     homePage.BOOK_HEIGHT = 1
  // })

  // it('should check things', () => {
  //   expect(homePage.BOOK_HEIGHT).toBeLessThan(2)
  // })

  it('asd', () => {
    expect(todea.getAge()).toEqual(10);
  })
})

















