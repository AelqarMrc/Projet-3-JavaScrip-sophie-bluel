import APIClass from "./APIClass.js"


export default class MyClass extends APIClass{
    // Public field declarations
    // publicField = 0;
    // Public Static field declarations
    // static staticField = 0;
    // Private field declarations
    // #privateField = 0;
    // Private Static field declarations
    // static #privateStaticField = 0;
    
    
    
    constructor(props) {
        super()
        props && Object.assign(this,props)
        //console.log(this)
        
        this.getWorks()
        this.getCategories()
        this.getFilter()
        this.getLogged()
        this.test()
        this.getModaleCard()
        // this.addPhotosModal()
    }
    
    test = () => {
        document.addEventListener("DOMContentLoaded", function() {
            const token = localStorage.getItem('token')
            , edit = document.querySelector("#editLink")
            , editModeBar = document.querySelector("#editModeBar")
            , modal = document.querySelector("#modal1")
            , margin = document.querySelector("header")  
            
            
            
            if (token) {
                const loginButton = document.querySelector('.loginBtn');
                if (loginButton) {
                    loginButton.textContent = 'logout';
                    const filter = document.querySelector('.filterGallery');
                    filter.classList.add('hide');
                    editModeBar.classList.remove('hide');
                    margin.style.marginTop = '6.5em';
                    
                    loginButton.onclick = function() {
                        if (loginButton.textContent === 'login') {
                        }
                        localStorage.removeItem('token');
                        window.location.href = 'index.html';
                        loginButton.textContent = 'login';
                        
                        
                    }
                }
                edit.addEventListener('click', e =>  {
                    modal.classList.remove('hide');
                    
                    
                });
                
            }
            else {
                edit.classList.add('hide');
                
            }   
        });
    }


}
    

const myApp = new MyClass()