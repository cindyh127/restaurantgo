window.onload = function() {
    checkIfLoggedIn()
}

function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            //logged in code
            console.log("user signed in")
            console.log(user)
            var photoURL = user.photoURL
            document.getElementById('side-logo-image')
                .setAttribute('src', photoURL)
            // document.getElementById('google-signin')
            //     .setAttribute('style', 'display: none; visibility: hidden')
            // document.getElementById('signout')
            //     .setAttribute('style', 'display: inline-block; visibility: visible')
            var googleEmail = user.email
            document.getElementById('google-email')
                .innerHTML = 'Email: '+ googleEmail
            var googleDisplayName = user.displayName
            document.getElementById('google-displayName')
                .innerHTML = 'Name: '+googleDisplayName
            //  document.getElementById('text').innerHTML = 'You are signed in click Next to continue'

        }
        else {
            //signed out code 
            //console.log("user not signed in")
            // document.getElementById('google-signin')
            //     .setAttribute('style', 'display: inline-block; visibility: visible')
            // document.getElementById('signout')
            //     .setAttribute('style', 'display: none; visibility: hidden')

        }
    })

}



function signOut() {
    firebase.auth().signOut()
    document.getElementById('google-email')
            .innerHTML = ''
    document.getElementById('google-displayName')
            .innerHTML = ''
    document.getElementById('side-logo-image')
        .setAttribute('src', 'images/blank-profile-picture.jpg')

    checkIfLoggedIn()
}

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function(data) {
            console.log(data)
            var idToken = data.credential.idToken
            

            checkIfLoggedIn()
        })
        .catch(function(error) {
            console.log(error)
        })
}




var object = document.getElementById('debby')
object.addEventListener("mouseover", function(){
    object.style.opacity = 0.5
});