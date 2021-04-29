const routers = [
   {name: 'drag.html', url : './html/drag.html'} 
]

export default class Router {

    constructor() {
        this.init();
    }

    init() {
        const app = document.getElementById('router');

        let a = document.createElement('a');

        routers.forEach(e => {
            a.setAttribute('href', e.url);
            a.innerHTML = e.name;
            app.appendChild(a);
            
            })
    }


}

