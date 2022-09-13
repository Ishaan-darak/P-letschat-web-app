var firebaseConfig = {
      apiKey: "AIzaSyBaB_s2IiB_pn5bAEThoVeRY3MqASQUmyQ",
      authDomain: "kwitter-new-65472.firebaseapp.com",
      databaseURL: "https://kwitter-new-65472-default-rtdb.firebaseio.com",
      projectId: "kwitter-new-65472",
      storageBucket: "kwitter-new-65472.appspot.com",
      messagingSenderId: "590952001423",
      appId: "1:590952001423:web:2831cf16b1aacec05fe5fa"
    };

    firebase.initializeApp(firebaseConfig);

    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name1=message_data['name'];
like=message_data['like'];
message=message_data['message'];

name_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'> </h4>";
message_tag="<h4 class='message_h4'>"+message+"</h4>"
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)' >";
span_tag="<span class='glyphicon glyphicon-thumbs-up' > Like: "+like+"</span> </button> <hr> ";
row=name_tag+message_tag+like_button+span_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value=""
}

function updatelike(message_id)
{
console.log("clicked on like button=" +message_id);
button_id=message_id;
likes=document.getElementById(button_id).value
updated_likes=Number(likes)+1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
      like:updated_likes
});

}

function logOut(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
