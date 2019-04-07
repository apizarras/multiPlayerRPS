var config = {
    apiKey: "AIzaSyDW61gf1GPLF38_yiAWcChjfzEZdRNYmbc",
    authDomain: "rockpaperscissors-16010.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-16010.firebaseio.com",
    projectId: "rockpaperscissors-16010",
    storageBucket: "rockpaperscissors-16010.appspot.com",
    messagingSenderId: "489505694498"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  const connections = database.ref("/connections");

    const connected = database.ref(".info/connected");

connected.on("value", function(snapshot) {
    if(snapshot.val()) {
        const con = connections.push(true);

        con.onDisconnect().remove();
    }
});
console.log("num of connections " + connections);

connections.on("value", function(snapshot) {
    $("#numPlayers").text(snapshot.numChildren());
    let numConnections = snapshot.numChildren();
    console.log(numConnections);
});

//determine if there are two players
    //if only one player, then message to wait for player2
    //if 2 players allow game to begin
    //if more than 2 players, don't allow game play, display msg

  //on button click grab value
  $(".image").on("click", function(event) {
      event.preventDefault();
        let playerSelection = $(this).attr("value");
        console.log(playerSelection);
        database.ref().set({
            playerChoice: playerSelection
        })
    });

  //compare the two values to see who won, use if else statement to determine winner

  //push chat input to firebase
  $("#submit").on("click",function(event){
    event.preventDefault();
      const chatData = $("#chat-input").val();
      console.log(chatData);
      database.ref().push({
        chat: chatData
      });
        //display chat to output div
      const chatLine = $("<p>" + chatData + "</p>")
      $("#chat-output").append(chatLine);
      console.log("made it this far");
          })

