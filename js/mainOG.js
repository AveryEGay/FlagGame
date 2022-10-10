var randomValue = Math.floor((Math.random() * 250) + 1);
var incorrectGuessCount = 0
var skipGuessCount = 0
var correctGuessCount = 0
var hintCount = 0
var overallHintCount = 0
var correctName = "NOT DEFINED YET"
var incomingData = null

$(function() {
    $.get( "https://restcountries.com/v3.1/all", function(data) {
        incomingData = data

        console.log(incomingData)

        correctName = incomingData[randomValue].name.common;
        $("#image_to_load").attr("src", incomingData[randomValue].flags.png);
        console.log(incomingData[randomValue]);


      });
})

function TakeUserInput() {
    var countryGuess = String($('#userGuess').val());
    countryGuess = countryGuess.toLowerCase();
    correctName = String(correctName).toLowerCase();
    
    console.log(correctName)

    if (countryGuess === correctName) {
        $("#guess_result").html('CORRECT');
        $("#guess_result").css("background-color", "green");

        randomValue = Math.floor((Math.random() * 250) + 1);
        $("#image_to_load").attr("src", incomingData[randomValue].flags.png);
        correctName = incomingData[randomValue].name.common
        $("#guess_result").hide();

        correctGuessCount++;
        $("#correct").html(correctGuessCount);

        hintCount = 0

        $("#hint_text_insert").empty();

        $('#userGuess').val('');
        $("#showResultButton").hide();

    }
    else{
        $("#guess_result").html('INCORRECT');
        $("#guess_result").css("background-color", "red");
        $("#guess_result").show();

        incorrectGuessCount++;
        $("#incorrect").html(incorrectGuessCount);

    }

}

function GetHint(){
    var countrySubregion = incomingData[randomValue].subregion
    var countryRegion = incomingData[randomValue].region
    var countryCapitalCity = incomingData[randomValue].capital
    var countryAltSpelling = incomingData[randomValue].altSpellings[0]



    hintCount++;
    overallHintCount++;

    $("#hints").html(overallHintCount);

    if(hintCount === 1){
        $("#hint_text_insert").append('<h2>',"<b>Region:</b> " + countryRegion+ "<br>" + "<b>Subregion:</b> " + countrySubregion,'</h2>');
    }
    else if (hintCount === 2){
        $("#hint_text_insert").append('<h2>',"<b>Capital City:</b> " + countryCapitalCity,'</h2>');
    }
    else if (hintCount === 3){
        $("#hint_text_insert").append('<h2>',"<b>Abbreviation:</b> " + countryAltSpelling,'</h2>');
    }
    else{
        alert("Out of Hints!")
        $("#showResultButton").show();
    }


}

function SkipFlag(){
    randomValue = Math.floor((Math.random() * 250) + 1);
    $("#image_to_load").attr("src", incomingData[randomValue].flags.png);
    correctName = incomingData[randomValue].name.common
    $("#guess_result").hide();

    skipGuessCount++;
    $("#skip").html(skipGuessCount);

    hintCount = 0

    $("#hint_text_insert").empty();

    $('#userGuess').val('');

    $("#showResultButton").hide();

}

function GetResult(){
    $('#userGuess').val(correctName);
}