
const api = {
    uri: {},
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

const loadCategories = function(){};
const loadCategory = function(){};

const displayCategories = function(){};
const displayCategory = function(){};

const manualCall = function(){};
const loadTableNum = function(){};
const changeTableNum = function(){};

const addToCart = function(){};
const clearCart = function(){};

document.addEventListener('load', () => {

});
