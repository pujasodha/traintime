
$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBxahx6LXIv87lnf7w0O58oyiypbmpJDV8",
        authDomain: "train-time-ae82d.firebaseapp.com",
        databaseURL: "https://train-time-ae82d.firebaseio.com",
        projectId: "train-time-ae82d",
        storageBucket: "train-time-ae82d.appspot.com",
        messagingSenderId: "580048241136"
    };
    firebase.initializeApp(config);

    var database = firebase.database()


    //On Submit Click event 
    $("#submit").on("click", function () {
        event.preventDefault();

        var nameInput = $("#trainName").val().trim()
        var destinationInput = $("#trainDestination").val().trim()
        var timeInput = $("#trainTime").val().trim()
        var freqInput = $("#trainFreq").val().trim()

        if (nameInput === '') {
            alert("Please Enter Train Name")
            return false
        }
        if (destinationInput === '') {
            alert("Please Enter Destination Name")
            return false
        }
        if (timeInput === '') {
            alert("Please Enter First Train Time")
            return false
        }
        if (freqInput === '') {
            alert("Please Enter the Frequency")
            return false
        }

        var newTrain = {
            name: nameInput,
            destination: destinationInput,
            time: timeInput,
            frequency: freqInput
        }

        database.ref().push(newTrain)

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        // Clears text box 
        $("#trainName").val("");
        $("#trainDestination").val("");
        $("#trainTime").val("");
        $("#trainFreq").val("");


    })
    //button to clear page
   

        database.ref().on("child_added", function (childSnapshot, prevChildKey) {
            console.log(childSnapshot.val())

            var trainName = childSnapshot.val().name
            console.log(trainName)
            var trainDestination = childSnapshot.val().destination
            console.log(trainDestination)
            var trainTime = childSnapshot.val().time
            console.log(trainTime)
            var trainFreq = childSnapshot.val().frequency
            console.log(trainFreq)


            

            
            var trainConverted = moment(trainTime, "hh:mm a").subtract("1, years")
            
            var difference = moment().diff(moment(trainConverted), "minutes")
            var currentTime = moment()
            var remainder = difference % trainFreq
            var minutesUntil = trainFreq - remainder
            var nextTrain = moment().add(minutesUntil, "minutes").format("hh:mm")


            $("#trains").append(
                "<tr><td>" + trainName +
                "</td><td>" + trainDestination +
                "</td><td>" + trainFreq +
                "</td><td>" + trainTime +
                "</td><td>" + minutesUntil + "</td></tr>");
            return false
        })
    })






























       