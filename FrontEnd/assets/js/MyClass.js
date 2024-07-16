import APIClass from "./APIClass.js"


export default class MyClass extends APIClass{
      
    constructor(props) {
        super()
        props && Object.assign(this,props)
        
        this.getWorks()
        this.getCategories()
        this.getFilter()
        this.getLogged()
        this.loginBehavior()
        this.getModaleCard()
        
    }


}
    

const myApp = new MyClass()