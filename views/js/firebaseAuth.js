var string = 'See their profile'
var contentString = string.link('https://food-project-debjanidas.c9users.io/profile')

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

var userLocationsArray = []

function getUserLocations() {
    var user = firebase.auth().currentUser
    if (user) {
        var database = firebase.database()
        var locationsRef = database.ref('/locations')
        

        locationsRef.once("value", function(snapshot) {
                // Gets everything under "Kd..", iterates each item there
                snapshot.forEach(function(childSnapshot) {
                    // "bobpost1", "bobpost2", etc
                    //var key = childSnapshot.key();
                    // Data underneath bobpost#
                    var childData = childSnapshot.val();
                    var lat = childData.lat
                    var lon = childData.lon
                    var displayName = childData.displayName
                    var userInfo = {
                        lat: lat,
                        lon: lon,
                        displayName: displayName
                    }
                    if(user.displayName !== displayName ) {
                        userLocationsArray.push(userInfo)
                     }
                    for (i = 0; i < userLocationsArray.length; i++) {
                            var latitude = userLocationsArray[i].lat
                            var longitude = userLocationsArray[i].lon
                            var userName = userLocationsArray[i].displayName
    
                            var pos_i = {
                                lat: latitude,
                                lng: longitude
                            }
                            
                        
                            var infowindow = new google.maps.InfoWindow({
                              content: contentString
                            });
                            
                            console.log(infowindow)
                            var marker_i = new google.maps.Marker({
                                position: pos_i,
                                title: userName,
                                map: map
                            })
                             marker_i.addListener('click', function() {
                              infowindow.open(map, marker_i);
                            });
                           
                        }
                    })
                    console.log(userLocationsArray)
                })
                .catch(function(error) {
                    console.log(error)
    
                })
    }
}
