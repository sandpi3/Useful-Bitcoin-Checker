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

    if (current > open){
        answer = "Yes";
    }else{
        answer = "No"
    }

    var pElement = document.getElementById('answer');
    pElement.textContent = answer;

    var cElement = document.getElementById('cprice');
    cElement.textContent = current;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('recheck');
    checkPageButton.addEventListener('click', function() {

        check();
     
    }, false);
  }, false);