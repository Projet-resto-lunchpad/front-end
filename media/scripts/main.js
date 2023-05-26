
const api = {
    root: '.',
    uri: {
        categs: '/categories'
    },
    mocks: {
        categs: [
            {'id': 10, 'name': 'Cocktails', 'img': ''},
            {'id': 20, 'name': 'Sans alcool', 'img': ''},
            {'id': 30, 'name': 'Bières pression', 'img': ''},
            {'id': 40, 'name': 'Bières bouteille', 'img': ''},
            {'id': 50, 'name': 'Vins', 'img': ''},
            {'id': 60, 'name': 'Entrées (hors salades)', 'img': ''},
            {'id': 70, 'name': 'Salades', 'img': ''},
            {'id': 80, 'name': 'Plats froids', 'img': ''},
            {'id': 90, 'name': 'Plats chauds', 'img': ''},
            {'id': 95, 'name': 'Desserts et cafés', 'img': ''}
        ]
    },
    call: async function(route, method = 'GET', data = {}){
        if(api.uri[route]) {
            const o = {
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if(method in ['POST', 'PUT']) {
                o.body = JSON.stringify(data);
            }
            const r = await fetch(api.root+api.uri[route], o);
            return r.json();
        } else {
            throw new Error('Unknown route "'+route+'"');
        }
    },
    mock: async function(route, method = 'GET', data = {}){

        if(api.uri[route] && api.mocks[route]) {
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    resolve(api.mocks[route]);
                }, 500);
            });
        } else {
            throw new Error('Unknown route "'+route+'"');
        }
    }
};

const tpl = {
    get: function(shortid){
        const t = document.querySelector('#tpl_'+shortid);
        return t? t.content.cloneNode(true):null;
    }
};

const cart = [];

const changeTitle = function(t){
    document.querySelector('#currentcateg').innerText = ''+t;
};

const clearContent = function(){
    changeTitle('');
    document.querySelector('#caveat').innerHTML = '';
};

const loadCategories = function(){
    clearContent();
    changeTitle('Chargement...');
    api.mock('categs').then((categories) => {
        for(const categ of categories) {
            const t = tpl.get('category');
            if(t) {
                document.querySelector('#caveat').append(
                    formatCategory(t, categ)
                    );
            }
        }
        document.querySelectorAll('.category').forEach((e) => { e.addEventListener('click', () => {
            window.alert('hello');
        })});
        changeTitle('Menu');
    });
};
const loadCategory = function(){};

const formatCategory = function(template, category){
    console.log(category);
    if(category.img) {
        template.querySelector('.category').style.backgroundImage = category.img;
    }
    template.querySelector('.category').dataset.id = category.id;
    template.querySelector('.category header h3').innerText = category.name;
    return template;
};

const formatProduct = function(template, product) {

};

const manualCall = function(){};
const loadTableNum = function(){};
const changeTableNum = function(){};

const addToCart = function(){};
const changeCart = function(){};
const clearCart = function(){};
const updateTotal = function(){};

window.addEventListener('load', () => {
    loadCategories();
});
