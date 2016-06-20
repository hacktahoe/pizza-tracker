// Tracks the current stage of the permitting process
let tracker = 0;

/*

 */
progressMeter();
currentStatus();

/*
    Button action listeners
 */
$("#next-button").click(function () {

    switch (tracker) {
        case 0:
            $("#progress-bar").css("width", "15%");
            $("#progress-bar").text("15%");
            meterForward("#app-received", "#app-assigned");
            $("#back-button, #alert-button").show();
            break;
        case 1:
            $("#progress-bar").css("width", "30%");
            $("#progress-bar").text("30%");
            meterForward("#app-assigned", "#app-review");
            break;
        case 2:
            $("#progress-bar").css("width", "45%");
            $("#progress-bar").text("45%")
            meterForward("#app-review", "#permit-cond");
            $("#alert-button").hide();
            break;
        case 3:
            $("#progress-bar").css("width", "60%");
            $("#progress-bar").text("60%");
            meterForward("#permit-cond", "#permit-issued");
            $("#back-button, #alert-button").show();
            break;
        case 4:
            $("#progress-bar").css("width", "75%");
            $("#progress-bar").text("75%");
            meterForward("#permit-issued", "#permit-inspect");
            break;
        case 5:
            $("#progress-bar").css("width", "100%");
            $("#progress-bar").text("100%");
            meterForward("#permit-inspect", "#permit-complete");
            $("#next-button, #alert-button").hide();
            break;
    }

    tracker++;
    $("#progress-bar").removeClass("progress-bar-danger");

    if (tracker === 6) {
        $("#progress-bar").addClass("progress-bar-success");
        $("#permit-complete").removeClass("progress-bar-warning");
        $("#permit-complete").addClass("progress-bar-success");
    }

    currentStatus();
});

$("#back-button").click(function () {
    switch (tracker) {
        case 1:
            $("#progress-bar").css("width","2em");
            $("#progress-bar").text("0%");
            meterBack("#app-assigned", "#app-received");
            $("#back-button, #alert-button").hide();
            break;
        case 2:
            $("#progress-bar").css("width","15%");
            $("#progress-bar").text("15%");
            meterBack("#app-review", "#app-assigned");
            break;
        case 3:
            $("#progress-bar").css("width","30%");
            $("#progress-bar").text("30%");
            meterBack("#permit-cond", "#app-review");
            $("#back-button, #alert-button").show();
            break;
        case 4:
            $("#progress-bar").css("width","45%");
            $("#progress-bar").text("45%");
            $("#alert-button").hide();
            meterBack("#permit-issued", "#permit-cond");
            break;
        case 5:
            $("#progress-bar").css("width","60%");
            $("#progress-bar").text("60%");
            meterBack("#permit-inspect", "#permit-issued");
            break;
        case 6:
            $("#progress-bar").css("width","75%");
            $("#progress-bar").text("75%");
            meterBack("#permit-complete", "#permit-inspect");
            $("#next-button, #alert-button").show();

    }

    tracker--;
    $("#progress-bar").removeClass("progress-bar-danger");

    if (tracker === 5) {
        $("#progress-bar").removeClass("progress-bar-success");
    }

    currentStatus();
});

$("#alert-button").click(function() {
    $(".progress-bar").addClass("progress-bar-danger");
    $("#contact-info").hide();
    $("#alert-info").show();
    $("#tracker").removeClass("progress-bar-warning");
    $("#tracker").addClass("progress-bar-danger");
    $("#info-panel").removeClass("panel-warning");
    $("#info-panel").addClass("panel-danger");
    $("#panel-title").html("<h1><strong>ALERT!</strong></h1>")
    $("#alert-name").html(projects[0][tracker].contact.name);
    $("#alert-dept").html(projects[0][tracker].contact.dept);
    $("#alert-phone").html(projects[0][tracker].contact.phone);
    $("#alert-email").html(projects[0][tracker].contact.email);
});

/*
 Functions to populate status tracker elements
 */
function progressMeter() {
    $("#app-received").html("<p>" + projects[0][0].status + "</p>");
    $("#app-assigned").html("<p>" + projects[0][1].status + "</p>");
    $("#app-review").html("<p>" + projects[0][2].status + "</p>");
    $("#permit-cond").html("<p>" + projects[0][3].status + "</p>");
    $("#permit-issued").html("<p>" + projects[0][4].status + "</p>");
    $("#permit-inspect").html("<p>" + projects[0][5].status + "</p>");
    $("#permit-complete").html("<p>" + projects[0][6].status + "</p>");
}

function currentStatus() {
    $("#panel-title").html("<h3>" + projects[0][tracker].status + "</h3>");
    $("#panel-message").html("<h4>" + projects[0][tracker].message + "</h4>");
    $("#contact-name").html(projects[0][tracker].contact.name);
    $("#contact-dept").html(projects[0][tracker].contact.dept);
    $("#contact-phone").html(projects[0][tracker].contact.phone);
    $("#contact-email").html(projects[0][tracker].contact.email);
}

function meterForward(current, next) {
    $(current).removeClass("progress-bar-warning");
    $(current).addClass("progress-bar-success");
    $(next).removeClass("progress-bar-info");
    $(next).addClass("progress-bar-warning");
}

function meterBack(current, back) {
    $(current).removeClass("progress-bar-warning");
    $(current).addClass("progress-bar-info");
    $(back).removeClass("progress-bar-success");
    $(back).addClass("progress-bar-warning");
}