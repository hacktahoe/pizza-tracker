$("#alert-button").click(function() {
    $("#contact-info").hide();
    $("#alert-info").show();
    $("#tracker").removeClass("progress-bar-warning");
    $("#tracker").addClass("progress-bar-danger");
});
