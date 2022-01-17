"use strict";
$(function () {
    var currentProgress = 0

    function random(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function raiseHead(by)
    {
        $("#head").css("top", "-=" + by);
        $("#neck").css("height", "+=" + by).css("top", "-=" + by);
        $("#progressCurrent").css("bottom", "+=" + by);
    }

    function lowerHead(by)
    {
        $("#otherHead").css("top", "+=" + by);
        $("#otherNeck").css("height", "+=" + by);
        $("#otherProgressCurrent").css("top", "+=" + by);
    }

    function getProgress()
    {
        var progress = 78 - parseInt($("#head").css("top"), 10);
        var progressP = (progress*100)/382;
        
        $("#progressCurrentValue").text(Math.round(progressP) + "%");

        return progressP;
    }

    function loading()
    {
        raiseHead(1);
        var progressP = getProgress();

        if(progressP > 3 && $("#progressCurrentValue:not(visible)").length > 0)
           $("#progressCurrentValue").show();

        if(progressP > 98 && $("#progressCurrentValue:visible").length > 0)
           $("#progressCurrentValue").hide();

        if(progressP < 100)
        {
            window.setTimeout(loading, random(10, 50));
        }
        else
        {
            $("#dialogAppears").fadeOut();

            window.setTimeout(function(){
                $("#dialogPet").fadeIn();

                $("#dialogPet").click(pet);
            }, 2000);
        }
    }

    function pet()
    {
        raiseHead(10);
        var progressP = getProgress();
        $("#progressCurrentValue:not(visible)").show();

        if($("#dialogPet").hasClass("startPetting"))
        {
            $("#dialogPet").removeClass("startPetting");
            $("#dialogPet").addClass("petMore");
        }
        else if($("#dialogPet").hasClass("petMore"))
        {
            $("#dialogPet").removeClass("petMore");
            $("#dialogPet").addClass("petSomeMore");
        }
        else if($("#dialogPet").hasClass("petSomeMore"))
        {
            $("#dialogPet").removeClass("petSomeMore");
            $("#dialogPet").addClass("petEvenMore");
        }
        else if($("#dialogPet").hasClass("petEvenMore"))
        {
            $("#dialogPet").removeClass("petEvenMore");
            $("#dialogPet").addClass("petTooMuch");
        }
        else if($("#dialogPet").hasClass("petTooMuch"))
        {
            $("#dialogPet").fadeOut();

            window.setTimeout(function(){
                $("#music").get(0).play();
                neverStop();
            });
        }
    }

    function neverStop()
    {
        raiseHead(5);
        getProgress();

        var currentPos = $("#head").offset()["top"];
        if(currentPos > -85)
        {
            window.setTimeout(neverStop, 50);
        }
        else
        {
            $("#otherHead").show();
            $("#otherHead img").css("transform", "rotate(180deg)");
            $("#otherHead").css("top", -85).css("left", "55%");

            $("#otherNeck").show();
            $("#otherNeck").css("top", -45).css("left", "55%");

            $("#otherProgressCurrent").show();
            $("#otherProgressCurrent").css("top", -45).css("left", "58%").css("transform", "rotate(180deg)");

            currentProgress = 1200;
            neverStopDown();
        }
    }

    function neverStopDown()
    {
        lowerHead(5);
        currentProgress += 5;
        $("#otherProgressCurrentValue").text(Math.round(currentProgress/10) + "%");

        if(currentProgress >= 1500 && $("#dialogProblem:visible").length == 0)
            $("#dialogProblem").fadeIn();

        window.setTimeout(neverStopDown, 50);
    }

    window.setTimeout(loading, 1500);
});
