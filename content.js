function check(){
    var bitcoinOpen = "https://api.coindesk.com/v1/bpi/historical/open.json";
    var bitcoinCurrent = "https://api.coindesk.com/v1/bpi/currentprice.json";

    var s;

    var open;
    var current;

    $.ajax({url: bitcoinOpen, dataType: 'json', async: false, success:function(data) {
        var i = 0;
        for (var key in data.bpi) {
            if (i == Object.keys(data.bpi).length - 1 && data.bpi.hasOwnProperty(key)) {           
                open = data.bpi[key];
                open = open.replace(",", "");
            }
            ++i;
        }
    }});
    
    $.ajax({url: bitcoinCurrent, dataType: 'json', async: false, success:function(data) {
        current = data.bpi.USD.rate;
        current = current.replace(",", "");
    }});

    var answer;

    var pElement = document.getElementById('answer');
    if (current > open){
        answer = "Yes";
        pElement.setAttribute("style", "font-weight: bold; color: #00ff00;")
    }else{
        answer = "No"
        pElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
    }

    pElement.textContent = answer;

    var cElement = document.getElementById('cprice');
    cElement.textContent = "Current exchange to USD: $" + current;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('recheck');
    checkPageButton.addEventListener('click', function() {

        check();
     
    }, false);
  }, false);
