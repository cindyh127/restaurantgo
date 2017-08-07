function checkIfLoggedIn() {
    var database = firebase.database()

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User signed in')
            console.log(user)
            document.getElementById('sharelocationbutton')
            .setAttribute('style','display: inline-block; visibility: visible') 

            var userId = user.uid
            var displayName = user.displayName

            var userRef = database.ref('/loggedInUsers').child(userId)
                //.child(displayName)
            userRef.set({
                displayName: displayName,
            })

            var login = document.getElementById('login-button')
            login.innerHTML = "Log Out"
            login.setAttribute('onclick', '{signOut()}')

            var photoURL = user.photoURL
            document.getElementById('google-small-pic')
                .setAttribute('src', photoURL)

        }
        else {
            var login = document.getElementById('login-button')
            login.innerHTML = "Log In"
            login.setAttribute('onclick', '{signInWithGoogle()}')
            document.getElementById('sharelocationbutton')
            .setAttribute('style','display: none; visibility: hidden')
        }
    })

}

window.onload = function() {
    checkIfLoggedIn()
}


function signOut() {

    var database = firebase.database()
    var user = firebase.auth().currentUser
    var userId = user.uid

    database.ref('/loggedInUsers')
        .child(userId)
        .remove()
        
        .then(function(res) {
            console.log('sign out function has been run')
            firebase.auth().signOut()
            document.getElementById('google-small-pic')
                .setAttribute('src', 'images/blank-profile-picture.png')

            checkIfLoggedIn()
        })
        .catch(function(err) {
            console.log(err)
        })
        
    database.ref('/locations')
        .child(userId)
        .remove()
        
        .then(function(res) {
            console.log('sign out function has been run')
            firebase.auth().signOut()
            document.getElementById('google-small-pic')
                .setAttribute('src', 'images/blank-profile-picture.png')

            checkIfLoggedIn()
        })
        .catch(function(err) {
            console.log(err)
        })
}

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider


    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function(data) {
            console.log(data)
                //var photoURL = data.additionalUserInfo.profile.picture

            //var idToken = data.credential.idToken

            // document.getElementById('google-pic')
            //         .setAttribute('src', photoURL)

            checkIfLoggedIn()
        })
        .catch(function(error) {
            console.log(error)
        })
}


function shareLocation(latitude, longitude) {

    var user = firebase.auth().currentUser
    if (user) {
        var userId = user.uid
        var displayName = user.displayName

        var database = firebase.database()
        var userLocationsRef = database.ref('/locations').child(userId)
            //.child(displayName)
        userLocationsRef.set({
            lat: latitude,
            lon: longitude,
            displayName: displayName,
        })

        .then(function(res) {
                console.log(res)
                getUserLocations()
            })
            .catch(function(error) {
                console.log(error)
            })


    }
    
    
}
