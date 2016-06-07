$("#panel-title").html("<h3>" + projects[0][tracker].message + "</h3>");
$("#contact-name").html(projects[0][tracker].contact.name);
$("#contact-dept").html(projects[0][tracker].contact.dept);
$("#contact-phone").html(projects[0][tracker].contact.phone);
$("#contact-email").html(projects[0][tracker].contact.email);

/*
    Adjusts the permit tracker and display panel if an alert is triggered
 */
$("#alert-button").click(function() {
    $("#contact-info").hide();
    $("#alert-info").show();
    $("#info-panel").removeClass("panel-warning");
    $("#info-panel").addClass("panel-danger");
    $("#panel-title").html("<h1><strong>ALERT!</strong></h1>")
    $("#alert-name").html(projects[0][tracker].contact.name);
    $("#alert-dept").html(projects[0][tracker].contact.dept);
    $("#alert-phone").html(projects[0][tracker].contact.phone);
    $("#alert-email").html(projects[0][tracker].contact.email);
    $("#tracker").removeClass("progress-bar-warning");
    $("#tracker").addClass("progress-bar-danger");
});
