import Home from "./views/Home.js";
import Records from "./views/Records.js";
import Settings from "./views/Settings.js";
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const app = document.getElementById('app');
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
  const routes = [
      { path: "/home", view: Home },
      { path: "/records", view: Records },
      { path: "/settings", view: Settings },
  ];

  //Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if(!match) {
        match = {
            route: routes[0],
            result : [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    app.innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {

   document.body.addEventListener("click", e =>  {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();

            navigateTo(e.target.href);
        }
    });
    router();

    const loginForm = document.querySelector("#login");
    const createForm = document.querySelector("#createAcc");

    //Hides create form after loginLink is clicked
    document.querySelector("#loginLink").addEventListener("click",e => {
        e.preventDefault();
        loginForm.classList.remove("form_hidden");
        createForm.classList.add("form_hidden");
    });

    //Hides login form after createAccLink is clicked
    document.querySelector("#createAccLink").addEventListener("click",e => {
        e.preventDefault();
        loginForm.classList.add("form_hidden");
        createForm.classList.remove("form_hidden");
    });

    //POST: user authentication
    $('#login').on('submit',e => {
        e.preventDefault();
        let Lemail = $('#LEmail');
        let Lpass = $('#LPass');

        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({Lemail: Lemail.val(), Lpass: Lpass.val()}),
            success: function(response) {
                let recordTbody = $('#recordsTable');
                navigateTo('/home');
                window.location.reload();

                //move to new action listener for records button
                recordTbody.html('');

                response.currentUserBP.forEach(function(currentUserBP, index){
                    recordTbody.append('\
                        <tr> \
                            <td id="data">' + currentUserBP.date + '</td>\
                            <td id="sys">' + currentUserBP.sys + '</td>\
                            <td id="dia">' +  currentUserBP.dia  + ' </td>\
                        </tr> \
                    ');
                });
            }
        });
    });

    //event to create a new account
    createForm.on('submit', e => {
        e.preventDefault();
        //create account user first name
        let Fname = $('#FName');
        //create account user last name
        const Lname = $('#LName');
        //create account email input
        const CEmail= $('#CEmail');
        //create account password input
        const CPass = $('#CPass');
        //create account re-enter password input
        const CRePass = $('#CRePass');

        $.ajax({
            url: '/createAcc',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                    {
                        Fname: Fname.val(),
                        Lname: Lname.val(),
                        CEmail: CEmail.val(),
                        CPass: CPass.val(),
                        CRePass: CRePass.val()
                    }
                ),
            success: function(response){
                navigateTo('/home');
                window.location.reload();
                console.log(response);
            }
        });
    });

    $('#home').on('submit', e =>{
        let sysPress = $('#sysPress').val();
        let diaPress = $('#diaPress').val();
        console.log(sysPress + ' ' + diaPress);
    });
});

