// function storeLocations(latitude,longitude){
//     console.log(key)
//     var database = firebase.database()
//     var user = firebase.auth().currentUser
//     var userId = user.uid
//     var displayName = user.displayName
    
//     // var restaurantVotesRef = database.ref('/restaurants/' + key +'/votes' + userId)
//     var restaurantVotesRef = database.ref('/locations')
//                                      .child(key)
//                                      .child('/votes')
//                                      .child(userId)
//     restaurantVotesRef.set(displayName)
//                       .then(function(){
//                           window.location.reload()
//                       })
//                       .catch(function(err){
//                           console.log(err)
//                       })
// }