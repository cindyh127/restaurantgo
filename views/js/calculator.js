function splitPrice(){
    var total = document.getElementById("price").value
    var people = document.getElementById("people").value
    var number = Number(total.replace(/[^0-9\.]+/g,""))

    var individualPrice = number/people

    var element = document.getElementById('firstpay')
    element.innerHTML = 'Each person should pay $' + individualPrice + '. Enjoy!'

    
}