$(function() {
    function init() {
        setListeners();
        setOscillator();
    }

    function setListeners() {
        $(".toggleFlip").unbind("click");
        $(".toggleFlip").on("click", function() {
            $pageType = $(this).data("pagetype");
            getBackContent($pageType);
            $(".back").toggleClass($pageType);
            $(".flipper").toggleClass("flip");
        });
    }

    function setOscillator() {
        setInterval(sendTweet, 30000);
        setInterval(addPoll, 60000);
        setInterval(addChat, 2000);
    }

    function sendTweet() {
        var comment1 = randomComment();
        var comment2 = randomComment();
        var comment3 = randomComment();
        var comment = comment1 + ". " + comment2 + ". " + comment3;
        var user = randomUser();
        var userName = user.name;
        $tweet = '<div class="toggleFlip chatItem tweet" data-pagetype="twitter">' + 
        '<div class="twitterIcon"></div>@'+userName + ": " + comment + 
        '</div>';
        $("#chatReceiver").append($tweet);
        scrollToBottom();
    }

    function addChat() {
        $random = randomFromTo(500, 5000);
        setTimeout(function() {
            var comment1 = randomComment();
            var comment2 = randomComment();
            var comment3 = randomComment();
            var comment = comment1 + ". " + comment2 + ". " + comment3;
            var user = randomUser();
            var userName = user.name;
            $chat = '<div class="chatItem chat">' + 
            '<img class="userIcon" src="img/avatars/' + user.number + '.jpg" alt="0" width="" height="" /> '+ 
            userName + ": " + comment + '</div>';
            $("#chatReceiver").append($chat);
            scrollToBottom();
        }, $random);
    }

    function addPoll() {
        $poll = '<div class="toggleFlip chatItem poll" data-pagetype="poll">' + 
                'OMG POLL OR WHATEVER' + 
                '</div>';
        $("#chatReceiver").append($poll);
        scrollToBottom();
    }
    var $sticky = false;

    function checkSticky() {
        $tweet = $(".chatItem.tweet:last");
        if ($tweet.length > 0 && $tweet.hasClass("sticky") != true) {
            $tweetOffset = $tweet.offset();
            $offsetTop = $tweetOffset.top;
/*             console.log($offsetTop); */
            if ($offsetTop < 0) {
                $(".chatItem.tweet").removeClass("sticky");
                $tweet.addClass("sticky");
            }
        }
    }

    function scrollToBottom() {
        var elem = document.getElementById('chatContainer');
        elem.scrollTop = elem.scrollHeight;
        checkSticky();
        setListeners();
    }

    function randomFromTo(from, to) {
        var randomNumber = Math.floor(Math.random() * to) + from;
        return randomNumber;
    }
    init();
    
    
    function getBackContent(pageType) {
      $(".back").empty();
      if(pageType == "twitter"){
        $(".chatItem.tweet").clone().removeClass("sticky").appendTo(".back");
      } else if(pageType == "poll") {
        $(".back").append('<div class="toggleFlip chatItem" data-pagetype="poll">THIS IS A POLL, CLICK TO COME BACK</div>');
      } else {
        return "Cannot determine page type";
      }
    }

    function randomComment() {
        var random = Math.floor(Math.random() * 50) + 1;
        quotes = new Array;
        quotes[1] = "When is national pie day?";
        quotes[2] = "Some cereals give me the shakes..";
        quotes[3] = "Dancing on the table may be my favorite past time";
        quotes[4] = "I really like banannas";
        quotes[5] = "I have super powers";
        quotes[6] = "I like to be naked";
        quotes[7] = "I AM A GROWN MAN";
        quotes[8] = "I am the king and qeen of cheese!";
        quotes[9] = "My hair hurts";
        quotes[10] = "It's those damn aliens";
        quotes[11] = "It's official.. I'm in love with HOT DOGS!";
        quotes[12] = "Polar bears sleep with pillows, everyone knows that";
        quotes[13] = "Why would I study if I can pretend to study?";
        quotes[14] = "Community College is easier than sleeping with your eyes closed";
        quotes[15] = "IT'S A CHALLENGE!"
        quotes[16] = "I fear chipmunks..period";
        quotes[17] = "IT'S A RIDICULOUS ASSUMPTION!"
        quotes[18] = "Fupas are almost as light as a feather";
        quotes[19] = "How dare you tempt me with those bolgarious schemes";
        quotes[20] = "IT'S A CHALLENGE!"
        quotes[21] = "I was born at a very young age.";
        quotes[22] = "I lost my necklace and dignity in the river.";
        quotes[23] = "Are you afraid of raccoons?";
        quotes[24] = "Ask me about allergy relief";
        quotes[25] = "I want to punch bees in the face";
        quotes[26] = "Why are you calling me while im pretending to be busy!";
        quotes[27] = "Yay! I'm taking a class on rainwater!";
        quotes[28] = "well hello there my sweet";
        quotes[29] = "Hey, what happens in reno stays in reno!";
        quotes[30] = "Yes, I would love to sled down your stairs";
        quotes[31] = "Let's run through the sprinklers!";
        quotes[32] = "I've always wanted to be a unicorn..";
        quotes[33] = "Garden gnomes can be a hassle";
        quotes[34] = "RUMSPRINGA!";
        quotes[35] = "I hate when I have gum stuck in my hair";
        quotes[36] = "Stand away, you smell like boiled cabbage";
        quotes[37] = "Adventure time!";
        quotes[38] = "Quick find the source of the lights!";
        quotes[39] = "How dare you question my authority?";
        quotes[40] = "Chitty Chitty bang bang!";
        quotes[41] = "I'll go to the movies with you if you wait outside.";
        quotes[42] = "Stand back, your hair makes me nervous";
        quotes[43] = "I have never had this much fun since my last flash dance festival";
        quotes[44] = "Your dog needs to stop licking my feet";
        quotes[45] = "My name is (your name), but you can call me tomorrow";
        quotes[46] = "If you eat too much cheese it can clog up your sink, be careful";
        quotes[47] = "If barbie is so popular, why do you have to buy her friends?";
        quotes[48] = "Running in place gets you nowhere, fast!";
        quotes[49] = "If you dance with me I promise to step on your feet.";
        quotes[50] = "Do you know what our state bird is?";
        return quotes[random];
    }

    function randomUser() {
        var random = Math.floor(Math.random() * 100) + 1;
        var bots = getBots();
        return {
            "name": bots[random],
            "number": random
        };
    }

    function getBots() {
        bots = new Array;
        bots[0] = "TESSAREX";
        bots[1] = "Mary";
        bots[2] = "Olivia";
        bots[3] = "Isabella";
        bots[4] = "Mia";
        bots[5] = "Ava";
        bots[6] = "Lily";
        bots[7] = "Zoe";
        bots[8] = "Emily";
        bots[9] = "Chloe";
        bots[10] = "Layla";
        bots[11] = "Madison";
        bots[12] = "Madelyn";
        bots[13] = "Abigail";
        bots[14] = "Aubrey";
        bots[15] = "Charlotte";
        bots[16] = "Amelia";
        bots[17] = "Ella";
        bots[18] = "Kaylee";
        bots[19] = "Avery";
        bots[20] = "Aaliyah";
        bots[21] = "Hailey";
        bots[22] = "Hannah";
        bots[23] = "Addison";
        bots[24] = "Riley";
        bots[25] = "Harper";
        bots[26] = "Aria";
        bots[27] = "Arianna";
        bots[28] = "Mackenzie";
        bots[29] = "Lila";
        bots[30] = "Evelyn";
        bots[31] = "Adalyn";
        bots[32] = "Grace";
        bots[33] = "Brooklyn";
        bots[34] = "Ellie";
        bots[35] = "Anna";
        bots[36] = "Kaitlyn";
        bots[37] = "Isabelle";
        bots[38] = "Sophie";
        bots[39] = "Scarlett";
        bots[40] = "Natalie";
        bots[41] = "Leah";
        bots[42] = "Sarah";
        bots[43] = "Nora";
        bots[44] = "Mila";
        bots[45] = "Elizabeth";
        bots[46] = "Lillian";
        bots[47] = "Kylie";
        bots[48] = "Audrey";
        bots[49] = "Lucy";
        bots[50] = "Jackson";
        bots[51] = "Aiden";
        bots[52] = "Liam";
        bots[53] = "Lucas";
        bots[54] = "Noah";
        bots[55] = "Mason";
        bots[56] = "Jayden";
        bots[57] = "Ethan";
        bots[58] = "Jacob";
        bots[59] = "Jack";
        bots[60] = "Caden";
        bots[61] = "Logan";
        bots[62] = "Benjamin";
        bots[63] = "Michael";
        bots[64] = "Caleb";
        bots[65] = "Ryan";
        bots[66] = "Alexander";
        bots[67] = "Elijah";
        bots[68] = "James";
        bots[69] = "William";
        bots[70] = "Oliver";
        bots[71] = "Connor";
        bots[72] = "Matthew";
        bots[73] = "Daniel";
        bots[74] = "Luke";
        bots[75] = "Brayden";
        bots[76] = "Jayce";
        bots[77] = "Henry";
        bots[78] = "Carter";
        bots[79] = "Dylan";
        bots[80] = "Gabriel";
        bots[81] = "Joshua";
        bots[82] = "Nicholas";
        bots[83] = "Isaac";
        bots[84] = "Owen";
        bots[85] = "Nathan";
        bots[86] = "Grayson";
        bots[87] = "Eli";
        bots[88] = "Landon";
        bots[89] = "Andrew";
        bots[90] = "Max";
        bots[91] = "Samuel";
        bots[92] = "Gavin";
        bots[93] = "Wyatt";
        bots[94] = "Christian";
        bots[95] = "Hunter";
        bots[96] = "Cameron";
        bots[97] = "Evan";
        bots[98] = "Charlie";
        bots[99] = "David";
        bots[100] = "Daniel";
        return bots;
    }
});