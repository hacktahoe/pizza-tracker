/*
Mock project status data for Hack Tahoe TRPA Project Tracker prototype

A 'project' consists of an array of 'state' objects.
'state' object has properties:
    status: string - project status
    message: string - brief explanation of project status
    contact: object
    alert: object - optional, for mocking project that needs applicant action
   
'contact' object properties:
    name: string
    dept: string
    email: string
    phone: string
};

'alert' object properties:
    message: string
    todo: string

*/



const eState = new Enum(['RECEIVED', 'ASSIGNED', 'REVIEW', 
          'CONDITIONAL', 'APPROVAL', 'INSPECTION', 'DONE']); 

//  create three mock projects
//  projects[0] proceeds through process with no problems
//  projects[1] hits snags in ASSIGNED and APPROVAL states 
//          (those states have alert properties)
//  projects[2] is withdrawn in REVIEW state.

let projects = createProjects();

function createProjects() {
    const status = setupStatus();
    const messages = setupMessages();
    const contacts = setupContacts();
    
    let projects = [];
    projects[0] = buildProject();
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

    return projects;

    function buildProject() {
        let states = [];
        for (let ix=eState.RECEIVED; ix <= eState.DONE; ++ix) {
            let state = {};
            state.status = status[ix];
            state.message = messages[ix];
            state.contact = contacts[ix];
    //       console.log(state);
            states[ix] = state;
        }
        return states;
    }
 
    // 
    function setupStatus() { 
        let status = [];
        status[eState.RECEIVED] = 'Application Received.';                          
        status[eState.ASSIGNED] = 'Planner Assigned.';
        status[eState.REVIEW] = 'In Review.';                          
        status[eState.CONDITIONAL] = 'Conditional Permit Issued.';                          
        status[eState.APPROVAL] = 'Final Permit Approval.';                          
        status[eState.INSPECTION] = 'Final Inspection.';                          
        status[eState.DONE] = 'Complete.'; 
        
        return status;     
    }                    
            
    // messages - brief explanation of current project status
    function setupMessages() {
        let messages = [];
        messages[eState.RECEIVED] = 'The application has been received by TRPA, and will be assigned to a planner for review.';
        messages[eState.ASSIGNED] = 'The application has been assigned to a planner. You will be notified by email if additional information is needed.';
        messages[eState.REVIEW] = 'The application was determined to be complete and is currently under review.';
        messages[eState.CONDITIONAL] = 'The proposed project has been approved and a conditional permit has been issued. You are required to complete all "prior to acknowledgment" conditions. Once these conditions are completed, you will need to schedule an appointment to finalize your permit.';
        messages[eState.APPROVAL] = 'Your project has been approved!<br>You may now install temporary, construction BMPs on your project site. Once BMPs are in place, please contact Matt Miller, TRPA Compliance Inspector, to schedule an initial site inspection. Please be advised no construction, excavation, or demolition  may occur pior to an initial site inspection.';
        messages[eState.INSPECTION] = 'Congratulations, the project passed final inspection!<br>Thank you for doing your part to protect Lake Tahoe.';
        messages[eState.DONE] = 'The project is complete.<br>Any applicable refundable fees have been returned.';
        
        return messages;
    }

    //  contacts
    function setupContacts() {
        const front_counter = {
            name: 'Aly B.',
            dept: 'Front Counter',
            email: 'trpa@trpa.org',
            phone: '775 123-4567'
        };

        const planner = {
            name: 'Jen S.',
            dept: 'Current Planning',
            email: 'trpa@trpa.org',
            phone: '775 123-4567'
        };

        const fees_admin = {
            name: 'Linda A.',
            dept: 'Fees Administration',
            email: 'trpa@trpa.org',
            phone: '775 123-4567'
        };

        let contacts = [];
        contacts[eState.RECEIVED] = front_counter;                          
        contacts[eState.ASSIGNED] = planner;                          
        contacts[eState.REVIEW] = planner;                          
        contacts[eState.CONDITIONAL] = planner;                          
        contacts[eState.APPROVAL] = planner;                          
        contacts[eState.INSPECTION] = fees_admin;                          
        contacts[eState.DONE] = planner;     
        
        return contacts;                     
    }

    
}

function Enum(constantsList) {
    for (var i in constantsList) {
        this[constantsList[i]] = i;
    }
}
