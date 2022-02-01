var btns = document.getElementsByClassName("bt");
var res = document.getElementById("res");

var op = "";


for(var i = 0; i < btns.length;i++)
{
    btns[i].onclick = function(event)
    {
        let array = null;
        if(event.path[0].innerText != "=" && event.path[0].innerText != "C" )
        res.innerText += event.path[0].innerText;
    if(event.path[0].innerText != "=" && event.path[0].innerText != "1"&& event.path[0].innerText != "0" && event.path[0].innerText != "C")
        op = event.path[0].innerText;
        if(event.path[0].innerText == "=")
        {
            array = res.innerText.split(op);
            if(op == "+")
            {
                let result = parseInt(array[0],2) + parseInt(array[1],2);
                res.innerText = result.toString(2);
            }
            if(op == "-")
            {
                let result = parseInt(array[0],2) - parseInt(array[1],2);
                res.innerText = result.toString(2);
            }
            if(op == "/")
            {
                let result = parseInt(array[0],2) / parseInt(array[1],2);
                res.innerText = result.toString(2);
            }
            if(op == "*")
            {
                let result = parseInt(array[0],2) * parseInt(array[1],2);
                res.innerText = result.toString(2);
            }
            if(op == "C")
            {
                res.innerText="";
            }
        }
    }
}