import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDd8_jEZMjzp2qqu8IXil2rts_rv4hT-wQ",
    authDomain: "expensify-21ac1.firebaseapp.com",
    databaseURL: "https://expensify-21ac1.firebaseio.com",
    projectId: "expensify-21ac1",
    storageBucket: "expensify-21ac1.appspot.com",
    messagingSenderId: "1009860408087",
    appId: "1:1009860408087:web:a98972f6d2b7d99f7efd52"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref().set({
    name: 'Eric Lee',
    age: 24,
    isSingle: true,
    hasFriends: false,
    location: {
        city: 'Philadelphia',
        country: 'United States'
    }
})

// database.ref().set('This is my data.')
database.ref('age').set(27)
database.ref('location/city').set('Baton Rouge')

database.ref('attributes').set({
    height: 175,
    weight: 162
})

console.log('I made a request to change the data')