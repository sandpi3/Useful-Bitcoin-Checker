function check(){
    var bitcoinOpen = "https://api.coindesk.com/v1/bpi/historical/open.json";
    var bitcoinCurrent = "https://api.coindesk.com/v1/bpi/currentprice.json";
    var suggestionData = "https://python-mchacks-btc-backend.firebaseio.com/data/.json"

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

    
    $.ajax({url: suggestionData, dataType: 'json', async: false, success:function(data) {
           suggest = data.key.idea;
           suggest = suggest.replace(",", "");
           growthrate = data.key.growth;
           growthrate = growthrate.replace(",", "")
           reactiontext = data.key.reaction;
           reactiontext = reactiontext.replace(",", "")
    }});
    
    
    var answer;
    var reaction;


    var pElement = document.getElementById('answer');
    var rElement = document.getElementById('reaction');
    var cConversion = document.getElementById('cconversion');
    if (suggest == "Buy"){
        answer = "Yes";
        reaction = "(Well that's a Surprise)";
        rElement.setAttribute("style", "font-weight: bold; color: #00ff00;")
        pElement.setAttribute("style", "font-weight: bold; color: #00ff00;")
    }else if (suggest == "Sell"){
        answer = "No"
        reaction = "(That's not surprising at all)";
        rElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
        pElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
    } else {
        
    }

    pElement.textContent = suggest;
    rElement.textContent = reactiontext;

    var cElement = document.getElementById('cprice');
    cElement.textContent = "Current 5 Day Growth: " + growthrate;
    cConversion.textContent = "Current Exchange to USD: $" + current;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('recheck');
    checkPageButton.addEventListener('click', function() {

        check();
     
    }, false);
  }, false);
