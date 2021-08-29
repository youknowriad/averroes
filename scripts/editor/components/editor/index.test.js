const rewire = require("rewire")
const index = rewire("./index")
const Editor = index.__get__("Editor")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new Editor()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onChange", () => {
    let inst

    beforeEach(() => {
        inst = new Editor()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onChange("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onChange("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onChange("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onChange(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
