
const api = {
    uri: {
        'categs': '/categories'
    },
    call: async function(uri, method = 'GET', data = {}){
        const r = await fetch(uri, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return r.json();
    }
};

const tpl = {
    get: function(shortid){
        const t = document.querySelector('#tpl_'+shortid);
        return t? t.content.cloneNode(true):null;
    }
};

const changeTitle = function(){};
const clearContent = function(){
    changeTitle('');
    document.querySelector('#caveat').innerHTML = '';
};

const loadCategories = function(){
    clearContent();
    changeTitle('Chargement...');
    api.call(api.categs).then((categories) => {
        for(const categ in categories) {
            const t = tpl.get('category');
            if(t) {
                formatCategory(t, categ);
            }
        }
    });
};
const loadCategory = function(){};

const formatCategory = function(template, category){

};

const formatProduct = function(template, product) {
    
};

const manualCall = function(){};
const loadTableNum = function(){};
const changeTableNum = function(){};

const addToCart = function(){};
const changeCart = function(){};
const clearCart = function(){};

document.addEventListener('load', () => {

});
