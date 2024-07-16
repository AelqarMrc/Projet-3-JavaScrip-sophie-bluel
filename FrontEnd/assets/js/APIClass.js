import DOMClass from "./DOMClass.js"

export default class APIClass extends DOMClass {
    #works_endpoint = "http://localhost:5678/api/works"
    #categories_endpoint = "http://localhost:5678/api/categories"



    constructor(props) {
        super()
        props && Object.assign(this, props)
    }



    getWorks(param) {
        fetch(this.#works_endpoint)
            .then(response => response.json())
            .then(this.renderWorksCards,
                this.galleryModal
            )
            .catch(error => console.log(error));
    }

    getCategories(param) {
        fetch(this.#categories_endpoint)
            .then(response => response.json())
            .then(this.renderFilterGallery)
            .catch(error => console.log(error));

    }

    getFilter(param) {
        Promise.all([
            fetch(this.#works_endpoint),
            fetch(this.#categories_endpoint)
        ])
        .then(([worksRes, categoriesRes]) => Promise.all([worksRes.json(), categoriesRes.json()]))
        .then(([works, categories]) => {
            this.filterClickEvent()
        })
        .catch(error => console.log(error));
    }

    getLogged(param) {
        this.renderLogin()
        this.loginPage()

    }

    getModaleCard(param) {
        fetch(this.#works_endpoint)
            .then(response => response.json())
            .then(this.galleryModal, this.addPhotosModal)
            .catch(error => console.log(error));
    }
                
}
