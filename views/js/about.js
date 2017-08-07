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
function googleTranslateElementInit() {
          new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
        }
        



            // Script to open and close sidebar
            function w3_open() {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("myOverlay").style.display = "block";
            }
             
            function w3_close() {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("myOverlay").style.display = "none";
            }
            // Accordion 
            function myAccFunc() {
                var x = document.getElementById("demoAcc");
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                }
                else {
                    x.className = x.className.replace(" w3-show", "");
                }
            }

            // Click on the "Jeans" link on page load to open the accordion for demo purposes
            document.getElementById("myBtn").click();


            
            function adjustPaddingOfBody(){
                var w = window.innerWidth;
                var h = window.innerHeight;  
                
                if (w < 800) {
                    document.body.setAttribute('style', "background-image: url(images/skyline.jpg); background-repeat: no-repeat; background-size: cover; min-height: 100vh;padding-left: 0px")
                } else if (w > 800) {
                    document.body.setAttribute('style', "background-image: url(images/skyline.jpg); background-repeat: no-repeat; background-size: cover; min-height: 100vh;padding-left: 250px")
                }
            }
            
            window.onresize = adjustPaddingOfBody
            adjustPaddingOfBody()