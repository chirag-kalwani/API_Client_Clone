// All Buttons and Switches
let get = document.getElementById('get');
let post = document.getElementById('post');
let json = document.getElementById('json');
let customP = document.getElementById('customP');
let add = document.getElementById('add'); // add parameters
let addP = 0; // variable for No. of parameters
let submit = document.getElementById('submit');
// All Parameter Boxes
let url = document.getElementById('url');
let paraKey = document.getElementsByClassName('paraKey');
let paraVal = document.getElementsByClassName('paraVal');
let jsonBox = document.getElementById('jsonBox');

url.value = 'https://jsonplaceholder.typicode.com/posts';
// Response Box
let response = document.getElementById('response');

// Copy Text Related Things Are Here
document.getElementById('copy').addEventListener(("click"), () => {
    window.navigator.clipboard.writeText(response.value).then(r => console.log(r));
    document.getElementById('copyAlert').style.display = 'block';
    setTimeout(() => {
        document.getElementById('copyAlert').style.display = 'none';
    }, 2000);
});

// GET, Post, Json, customP Swithes Related Things are here
get.addEventListener('click', () => {
    post.checked = !post.checked;
});
post.addEventListener('click', () => {
    get.checked = !get.checked;
});
json.addEventListener('click', () => {
    setTimeout(jsonOn, 1);
});

function jsonOn() {
    if (!json.checked) {
        json.checked = !json.checked;
        setTimeout(customOn, 1);
    }
    customP.checked = !customP.checked;
    for (let i = 0; i < paraKey.length; i++) {
        paraKey[i].disabled = true;
    }
    for (let i = 0; i < paraVal.length; i++) {
        paraVal[i].disabled = true;
    }
    add.disabled = true;
    jsonBox.disabled = false;
}

customP.addEventListener('click', () => {
    setTimeout(customOn, 1);
});

function customOn() {
    if (!customP.checked) {
        customP.checked = !customP.checked;
        setTimeout(jsonOn, 1);
    }
    json.checked = !json.checked;
    for (let i = 0; i < paraKey.length; i++) {
        paraKey[i].disabled = false;
    }
    for (let i = 0; i < paraVal.length; i++) {
        paraVal[i].disabled = false;
    }
    add.disabled = false;
    jsonBox.disabled = true;
}

// New Parameters add and remove related Things
let newParams = document.getElementById('newParams');
add.addEventListener('click', () => {
    let html = `
       <form class="d-flex justify-content-between h5 my-3" style="flex-wrap: wrap">
            <label class="form-label my-2" for="paraKey${addP + 2}">Parameter ${addP + 2}</label>
            <div class="col-md-4">
                <input type="text" class="form-control paraKey" id="paraKey${addP + 2}" placeholder="Enter Parameter ${addP + 2} key">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control paraVal" id="paraVal${addP + 2}" placeholder="Enter Parameter ${addP + 2} value">
            </div>
           <button type="button" onclick='remove(${addP})' class="btn btn-primary" style="width: 50px">-</button>
       </form>`;
    addP++;
    let vari = document.createElement('div');
    vari.innerHTML = html;
    newParams.appendChild(vari.firstElementChild);
});

function remove(child) {
    let newParams = document.getElementById('newParams');
    newParams.children[child].remove();
    for (let i = 0; i < newParams.children.length; i++) {
        if (i >= child) {
            newParams.children[i].firstElementChild.innerHTML = `Parameter ${i + 2}`;
            newParams.children[i].firstElementChild.setAttribute('for', `paraKey${i + 2}`);
            newParams.children[i].children[1].firstElementChild.id = `paraKey${i + 2}`;
            newParams.children[i].children[1].firstElementChild.setAttribute('placeholder', `Enter Parameter ${i + 2} key`)
            newParams.children[i].children[2].firstElementChild.id = `paraVal${i + 2}`;
            newParams.children[i].children[2].firstElementChild.setAttribute('placeholder', `Enter Parameter ${i + 2} Value`)
            newParams.children[i].children[3].setAttribute('onClick', `remove(${i})`);
        }
    }
    addP--;
}


// Now Fetch Data
submit.addEventListener('click', () => {
    submit.disabled = true;
    response.value = "Loading Data...";
    // Fetch All The values
    let ur = url.value;
    let method = get.checked ? 'GET' : 'POST';
    let content_type = json.checked ? 'JSON' : 'Custom Parameters';

    let data = {};
    if (content_type === 'Custom Parameters') {
        for (let i = 1; i <= addP + 1; i++) {
            let key = document.getElementById(`paraKey${i}`).value;
            data[key] = document.getElementById(`paraVal${i}`).value;
        }
        data = JSON.stringify(data);
    } else
        data = jsonBox.value;

    if (method === 'POST') {
        fetch(ur, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.json()).then(res => {
            response.value = JSON.stringify(res, undefined, 4);
            response.setAttribute('rows', "25");
            submit.disabled = false;
        }).catch(() => {
            submit.disabled = false;
        });
    } else {
        // Default method is GET in fetch API
        fetch(ur).then(response => response.json()).then(res => {
            response.value = JSON.stringify(res, undefined, 4);
            response.setAttribute('rows', "25");
            submit.disabled = false;
        }).catch(() => {
            submit.disabled = false;
        });
    }
});







