document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('recheck');
    checkPageButton.addEventListener('click', function() {

        var bitcoinOpen = "https://api.coindesk.com/v1/bpi/historical/open.json";
        var bitcoinCurrent = "https://api.coindesk.com/v1/bpi/currentprice.json";    
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
    
        var answer = "Unknown";
        var reaction = "(Probably not though)";

        var noAnswers = ["That's not surprising at all", "I'm not even surprised", "Try another time", "It's a steep slope", "Only in your imagination", "Why would you think that?", "Never believe it would happen", "How did it even go up in the first place?", "Maybe in a parallel universe"];
        var yesAnswers = ["How?", "What in the world?", "Well that's a Surprise", "I'm genuinely amazed", "Well I'll be damned", "Looks like miracles do happen", "Should've bought some 9 years ago", "Am I dreaming?", "Are you sure this is correct?", "I hope this is a joke", "No way", "I don't believe it"];
    
        var pElement = document.getElementById('answer');
        var rElement = document.getElementById('reaction');
        if (current > open){
            answer = "Yes";
            reaction = yesAnswers[Math.floor(Math.random() * yesAnswers.length)];
            rElement.setAttribute("style", "font-weight: bold; color: #62ff62;")
            pElement.setAttribute("style", "font-weight: bold; color: #62ff62;")
        }else{
            answer = "No"
            reaction = noAnswers[Math.floor(Math.random() * noAnswers.length)];
            rElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
            pElement.setAttribute("style", "font-weight: bold; color: #ff0000;")
        }
    
        pElement.textContent = answer;
        rElement.textContent = reaction;
    
        var cElement = document.getElementById('cprice');
        cElement.textContent = "Current Exchange Rate (USD): $" + current;


    }, false);
  }, false);