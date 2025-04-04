
    console.log("hello");

    function showCalculations(){
        let number1= document.querySelector("#N1").value;
        let number2 = document.querySelector("#N2").value;
        let result= number1*number2;
        
        document.querySelector("#output").textContent="the multiplication "+   number1+"    " +"and" +"   "+  number2+"   "+ " is" +"   "+  result;
    
    }
    document.querySelector('#btn').addEventListener("click" , showCalculations);
    
