'use strict';
console.log('hello from index.js');

const url = "http://localhost:3000/api/";

const app = new Vue({
    el: '#form',
    data: {
      errors: [],
      distance: null,
      speed_1: null,
      speed_2: null
    },
    methods:{
      checkForm: function (e) {
        console.log('checking form');
        console.log(this.speed_1);
        this.errors = [];
  
        if (!this.distance) {
          this.errors.push('Etäisyys puuttuu.');
        }
        if (!this.speed_1) {
          this.errors.push('Nopeus 1 puuttuu.');
        }
        if (!this.speed_2) {
          this.errors.push('Nopeus 2 puuttuu.');
        }
  
        e.preventDefault();

        let data = {    'distance' : this.distance, 
                        'speed_1' : this.speed_1, 
                        'speed_2' : this.speed_2 
                };

        postData(url, data)
        .then(data => {
            console.log(data);
        });
      }
    }
});
// Example POST method implementation:
async function postData( url = '', data = {} ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}