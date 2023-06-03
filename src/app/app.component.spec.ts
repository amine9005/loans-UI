import { AppComponent } from "./app.component";

describe("App Component", () => {

    let fixture: AppComponent

    beforeEach(() => {
        fixture = new AppComponent()
    })

    test("should be created", () => {
        expect(fixture).toBeDefined()
    })

})
