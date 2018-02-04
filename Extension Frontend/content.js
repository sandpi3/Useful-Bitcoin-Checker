document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('recheck');
    checkPageButton.addEventListener('click', function() {

        var bitcoinCurrent = "https://api.coindesk.com/v1/bpi/currentprice.json";
        var suggestionData = "https://python-mchacks-btc-backend.firebaseio.com/data/.json"
        var current;
        var suggest;
        
        $.ajax({url: bitcoinCurrent, dataType: 'json', async: false, success:function(data) {
            current = data.bpi.USD.rate;
            current = current.replace(",", "");
        }});
        
        $.ajax({url: suggestionData, dataType: 'json', async: false, success:function(data) {
               suggest = data.key.idea;
               suggest = suggest.replace(",", "");
               growthrate = data.key.growth;
               growthrate = growthrate.replace(",", "")
        }});
        
        var reaction;

        var noAnswers = ["That's not surprising at all", "I'm not even surprised", "Try another time", "It's a steep slope", "How did it even go up in the first place?"];
        var yesAnswers = ["What in the world?", "Well that's a surprise", "I'm genuinely amazed", "Well I'll be damned", "Looks like miracles do happen", "Should've bought some 9 years ago", "Are you sure this is correct?"];
    
        var pElement = document.getElementById('answer');
        var rElement = document.getElementById('reaction');
        var cConversion = document.getElementById('cconversion');
        if (suggest == "Buy"){
            suggest = "Yes"
            reaction = yesAnswers[Math.floor(Math.random() * yesAnswers.length)];
            rElement.setAttribute("style", "font-weight: bold; color: #00ff00;")
            pElement.setAttribute("style", "font-weight: bold; color: #00ff00;")
        }else if (suggest == "Sell"){
            suggest = "No"
            reaction = noAnswers[Math.floor(Math.random() * noAnswers.length)];
            rElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
            pElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
        }else{
            suggest = "No"
            reaction = "Not even changing"
        }

        pElement.textContent = suggest;
        rElement.textContent = reaction;
    
        var cElement = document.getElementById('cprice');
        cElement.textContent = "Current 5 Day Growth: " + growthrate;
        cConversion.textContent = "Current Exchange to USD: $" + current;
     
    }, false);
  }, false);
