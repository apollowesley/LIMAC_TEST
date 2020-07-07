function login() {
    var apigClient = apigClientFactory.newClient({
        apiKey: 'ENSAzeCfFR2CDnufjgul06UMuOLi9s0R3c3hgB1A',
        region: 'us-west-1'
    });
    var body = {
        "username": document.getElementById('username').textContent || document.getElementById('username').innerText || document.getElementById('username').value,
        "password": document.getElementById('password').textContent || document.getElementById('password').innerText || document.getElementById('password').value
    }
    console.log(body);
    apigClient.loginPost({}, body, {})
        .then(function (result) {
            response = JSON.parse(result.data.body);
            if (response.result == "success") {
                userConfig = require('./session.json');
                userConfig.username = document.getElementById('username').value;
                const fs = require('fs');
                fs.writeFileSync("session.json", JSON.stringify(userConfig));
                const ipcRenderer = require('electron').ipcRenderer
                ipcRenderer.send('loginSuccess', "success");
            } else {
                //pass
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                document.getElementById('username').style.borderColor = "red";
                document.getElementById('password').style.borderColor = "red";
            }
        }).catch(function (result) {
            console.log(result);
        });
}

function loggedIn() {
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send('loginSuccess', "success");
}

function signup() {
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send('startSignUp', "start");
}