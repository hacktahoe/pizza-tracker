/*
    Written by: Donald Harriman
    @ https://github.com/donharriman
    On behalf of Code for America: Hack Tahoe Brigade
 */

function Enum(constantsList) {
    for (var i in constantsList) {
        this[constantsList[i]] = i;
    }
}


//  contacts
let front_counter = {
    name: 'Aly B.',
    dept: 'Front Counter',
    email: 'trpa@trpa.org',
    phone: '775 123-4567'
};

let planner = {
    name: 'Jen S.',
    dept: 'Current Planning',
    email: 'trpa@trpa.org',
    phone: '775 123-4567'
};

let fees_admin = {
    name: 'Linda A.',
    dept: 'Fees Administration',
    email: 'trpa@trpa.org',
    phone: '775 123-4567'
};


const eState = new Enum(['RECEIVED', 'ASSIGNED', 'REVIEW',
    'CONDITIONAL', 'APPROVAL', 'INSPECTION', 'DONE']);


let messages = [];
messages[eState.RECEIVED] = 'The application has been received by TRPA and will be assigned to a planner for review.';
messages[eState.ASSIGNED] = 'The application has been assigned to a planner. You will be notified by email if additional information is needed.';
messages[eState.REVIEW] = 'The application was determined to be complete and is currently under review.';
messages[eState.CONDITIONAL] = 'The proposed project has been approved and a conditional permit has been issued. You are required to complete all "prior to acknowledgment" conditions. Once these conditions are completed, you will need to schedule an appointment to finalize your permit.';
messages[eState.APPROVAL] = 'Your project has been approved! You may now install temporary, construction BMPs on your project site. Once BMPs are in place, please contact Matt Miller, TRPA Compliance Inspector, to schedule an initial site inspection. Please be advised no construction, excavation, or demolition  may occur pior to an initial site inspection.';
messages[eState.INSPECTION] = 'Congratulations, the project passed final inspection! Thank you for doing your part to protect Lake Tahoe.';
messages[eState.DONE] = 'The project is complete. Any applicable refundable fees have been returned.';

let status = [];
status[eState.RECEIVED] = 'Application received.';
status[eState.ASSIGNED] = 'Assigned to a Planner.';
status[eState.REVIEW] = 'In review.';
status[eState.CONDITIONAL] = 'Conditional Permit Issued.';
status[eState.APPROVAL] = 'Final Permit Approval.';
status[eState.INSPECTION] = 'Final Inspection.';
status[eState.DONE] = 'Complete.';

let contact = [];
contact[eState.RECEIVED] = front_counter;
contact[eState.ASSIGNED] = planner;
contact[eState.REVIEW] = planner;
contact[eState.CONDITIONAL] = planner;
contact[eState.APPROVAL] = planner;
contact[eState.INSPECTION] = fees_admin;
contact[eState.DONE] = planner;


function buildProject() {
    let states = [];
    for (let ix=eState.RECEIVED; ix <= eState.DONE; ++ix) {
        let state = {};
        state.status = status[ix];
        state.message = messages[ix];
        state.contact = contact[ix];
        // console.log(state);
        states[ix] = state;
    }
    return states;
}

let project = buildProject();
console.log(project);

let projects = [];
projects[0] = buildProject();
console.log(projects[0][0].message);
projects[1] = buildProject();
projects[2] = buildProject();

let alertProj = projects[1];
alertProj[eState.ASSIGNED].alert = {
    message: 'Application is Incomplete.',
    todo: 'Please submit a traffic study. Your application will be marked as incomplete until this item is received.',
};

alertProj[eState.APPROVAL].alert = {
    message: 'Plan revision has been submitted.',
    todo: 'Please refer to file number ERSP2016-xx.',
};

//console.log(alertProj[eState.ASSIGNED]);
//console.log(alertProj[eState.APPROVAL]);

let withdrawnProj = projects[2];
alertProj[eState.REVIEW].message = 'Project Withdrawn.';
