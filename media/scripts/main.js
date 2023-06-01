
const api = {
    root: '.',
    uri: {
        categs: '/categories',
        products: '/category/{p}/products',
        tableget: '/table',
        tableset: '/table',
        manual: '/help'
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
        ],
        products: {
            '10': [
                {'id': 1001, 'name': 'Nuit blanche', 'img': '', 'price': 5.99}
            ]
        },
        tableget: { 'table': Math.ceil(20 * Math.random()) },
        tableset: { 'authorized': true },
        manual: { 'done': true }
    },
    call: async function(route, method = 'GET', data = {}, placeholders = {}){
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
            let u = api.uri[route];
            for(const p in placeholders) {
                u = u.replace('{'+p+'}', placeholders[p]);
            }
            const r = await fetch(api.root+u, o);
            return r.json();
        } else {
            throw new Error('Unknown route "'+route+'"');
        }
    },
    mock: async function(route, method = 'GET', data = {}, placeholders = {}){
        if(api.uri[route] && api.mocks[route]) {
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    console.log(api.mocks[route][placeholders['p']]);
                    resolve(('products' == route)? api.mocks[route][placeholders['p']]:api.mocks[route]);
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
            loadCategory(e.dataset.id, e.querySelector('header h3').innerText);
        })});
        changeTitle('Menu');
    });
};
const loadCategory = function(id, title){
    clearContent();
    changeTitle('Chargement...');
    api.mock('products', 'GET', {}, {p: id}).then((products) => {
        for(const product of products) {
            const t = tpl.get('product');
            if(t) {
                document.querySelector('#caveat').append(
                    formatProduct(t, product)
                    );
            }
        }
        changeTitle(title);
    });
};

const formatCategory = function(template, category){
    if(category.img) {
        template.querySelector('.category').style.backgroundImage = category.img;
    }
    template.querySelector('.category').dataset.id = category.id;
    template.querySelector('.category header h3').innerText = category.name;
    return template;
};

const formatProduct = function(template, product) {
    if(product.img) {
        template.querySelector('.product').style.backgroundImage = product.img;
    }
    template.querySelector('.product').dataset.id = product.id;
    template.querySelector('.product header h3').innerText = product.name;
    template.querySelector('.product footer span').innerText = product.price;
    return template;
};

const manualCall = function(){
    if(!document.getElementById('manualcall').classList.contains('called')) {
        document.getElementById('manualcall').classList.add('called');
        api.mock('manual', 'POST').then((res) => {
            showAlert('Nos équipières et équipiers ont été alerté-e-s !\n\nVous pouvez fermer cette boîte de dialogue sans soucis.');
        });
    }
};
const loadTableNum = function(){
    api.mock('tableget', 'GET').then((t) => {
        if(t.table) {
            document.getElementById('tableId').innerText = t.table;
        } else {
            document.getElementById('tableId').innerText = 'Erreur';
        }
    });
};
const changeTableNum = function(){
    
};

const addToCart = function(){};
const changeCart = function(){};
const clearCart = function(){};
const updateTotal = function(){};

const showAlert = function(txt) {
    window.alert(txt);
};

window.addEventListener('load', () => {
    document.getElementById('manualcall').addEventListener('click', manualCall);
    loadCategories();
});
