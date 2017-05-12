var chatrate = 500;
var chatInterval;
var insertChat;

$(function(){
	manageBots();
	setUpSlider();
});


function setUpSlider(){
	var startValue = 5000 - window.chatrate;
	var slider = $('#slider').slider({ 
	    steps: 100,
	    animate:'true',
	    min:100,
	    max:5000,
	    value: startValue,
	    startValue: startValue,
	    change: function(e,ui){
	    	var newvalue = 5000 - ui.value;
	        clearTimeout(chatInterval);
	        chatInterval = setInterval(insertChat, newvalue);
	        console.log("set to " + newvalue + " milliseconds");
	    } 
	});
}

function manageBots(){
	
	var chats = 0;    
	insertChat = function insertChat(){
		addToChat();
		chats++;
	}
	
	chatInterval = setInterval(insertChat, window.chatrate);

    // CALCULATE  
    setInterval(function(){
		chats = chatsPerSecond(chats);
    },3000);
 
}

function chatsPerSecond(chats) {
	var chatsPerMinute = chats * 20;
	$("#chatsPerMinute").empty();
	$("#chatsPerMinute").append(chatsPerMinute + " msg/min");
	chats = 0;
	return chats;
	
}

function addToChat(){
	var $chatbox = $("#chatDisplay");
	var $chat;
	var user = randomUser();
	$chat = chatTemplate(user);
	$chatbox.append($chat);
    var divTop = document.getElementById("chatDisplay").scrollHeight;
    $chatbox.stop().animate({scrollTop: divTop }, 200, "swing");
    startVisualization(user);
}

function chatTemplate(user){
	var comment = randomComment();
	var template = '<div class="chat'
	if(user.number == "100"){
		template += " me";
	}
	template += '">'
		+ '<span class="icon" style="background-image:url(\'assets/avatars/'+user.number+'.jpg\');"></span>'
		+ '<span class="name">'+user.name+'</span>'
		+ comment + '</div>';
	return template;
}

function randomComment(){
	var random = Math.floor(Math.random() * 50) + 1;
	quotes = new Array;
	quotes[1] = "When is national pie day?";
	quotes[2] = "Some cereals give me gas..";
	quotes[3] = "Dancing on the table may be my favorite past time";
	quotes[4] = "I really like banannas";
	quotes[5] = "I have super powers";
	quotes[6] = "I like to be naked";
	quotes[7] = "I AM MAN! (WOMAN)";
	quotes[8] = "I am the king (queen) of cheese!";
	quotes[9] = "My hair hurts";
	quotes[10] = "It's those damn aliens";
	quotes[11] = "It's official.. I'm in love with HOT DOGS!";
	quotes[12] = "Polar bears sleep with penguins, everyone knows that";
	quotes[13] = "Why would I study if I can pretend to study?";
	quotes[14] = "Community College is easier than sleeping with a prostitute";
	quotes[15] = "IT'S A CHALLENGE!"
	quotes[16] = "I fear chipmunks..period";
	quotes[17] = "IT'S A CHALLENGE!"
	quotes[18] = "Fupas are almost as sexy as your mom";
	quotes[19] = "How dare you tempt me with those bolgarious schemes";
	quotes[20] = "IT'S A CHALLENGE!"
	quotes[21] = "I was born at a very young age.";
	quotes[22] = "I lost my necklace and dignity in the river.";
	quotes[23] = "Are you afraid of raccoons?";
	quotes[24] = "Ask me about allergy relief";
	quotes[25] = "I want to punch bees in the face";
	quotes[26] = "Why are you calling me while im pretending to be busy!";
	quotes[27] = "Yay! I'm taking a poop!";
	quotes[28] = "well hello there dingleberry";
	quotes[29] = "Hey, what happens in vegas stays in vegas!";
	quotes[30] = "Yes, I would love to sled down your stairs";
	quotes[31] = "Let's run through the sprinklers!";
	quotes[32] = "Hemroids are a pain in the butt..";
	quotes[33] = "genital herpes can be a hassle";
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
	quotes[46] = "If you eat too much cheese it can clog up your butt, be careful";
	quotes[47] = "If barbie is so popular, why do you have to buy her friends?";
	quotes[48] = "Running in place gets you nowhere, fast!";
	quotes[49] = "If you dance with me I promise to step on your feet.";
	quotes[50] = "Do you know what our state bird is?";
	return quotes[random];
}

function randomUser(){
	var random = Math.floor(Math.random() * 100) + 1;
	var bots = getBots();
	return {"name": bots[random], "number": random};
}

function getBots(){
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