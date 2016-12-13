//import { TestingPage } from "./test"
import { NavController } from "ionic-angular";
import { NavMock, Todea } from "../../mocks"



let todea = new Todea("Cristian", 10);


// let navCtrl: NavController = <any> new NavMock();

// let test = new TestingPage(<any> new NavMock());



describe('Dummy test:', () => {
  // it("Should be defined", () => {
  //   expect(test.isTrue()).toBeDefined();
  // });
  it('asd', () =>{
    expect(todea.getAge()).toEqual(10);
  })
});