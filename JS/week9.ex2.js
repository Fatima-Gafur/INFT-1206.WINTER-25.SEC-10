console.log("hello")

function showoutput(){
    let name = document.querySelector("#fisrt-name"). value;
    document.querySelector("#output").textcontent = "Hello"+name;
    document.querySelector("#output").computedStyleMap.color ="red";


}
document.querySelector("#btn").addEventListener("click",showoutput);