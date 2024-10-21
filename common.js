function http(url, callback, params = null, type = "post", timeout = 10000) {
    //console.log(url, '->', params);
    let xhr = new XMLHttpRequest();
    try {
        xhr.timeout = timeout;
        let arr = [];
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                arr.push(key + "=" + params[key]);
            }
        }
        params = arr.join("&");
        if (type == "get") {
            xhr.open(type, url + "?" + params);
            xhr.send();
        } else {
            xhr.open(type, url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //console.log(url, '<-', xhr.responseText);
                    callback(xhr.responseText);
                } else {
                    //console.log(url, '<- status_code:', xhr.status);
                    callback("error");
                }
            }
            //console.log("http_ready_state:",xhr.readyState);
        }
    } catch (error) {
        console.log('http_send_catch_error');
        callback("error");
    }
}

function createTagToBody(name) {
    let _els = document.getElementsByTagName(name);
    var div;
    if (_els.length <= 0) {
        div = document.createElement(name);
    } else {
        div = _els[0];
    }
    return div;
}


function showLoading(text = 'Please wait') {
    let loading_el = "<div id='loading_view'>" +
        "<div class='loading_board'>" +
        "<div id='loading_text'></div>" +
        "<div class='loading'></div>" +
        "</div>" +
        "</div>";
    let div = createTagToBody("my_loading_tag");
    div.innerHTML = loading_el;
    document.body.appendChild(div);
    document.getElementById("loading_text").innerText = text;
    document.getElementById("loading_view").style.visibility = "visible";
}
function hideLoading() {
    document.getElementById("loading_view").style.visibility = "hidden";
}

function showSuccessTip(text = 'Set successfully', timeout = 1000) {
    let tip_el = "<div id='tip_view'>" +
        "<div class='tip_view_board'>" +
        "<div class='tip_ok_icon'>✔</div>" +
        "<div id='tip_view_text'>" + text + "</div>" +
        "</div>" +
        "</div>";
    let div = createTagToBody("my_tip_tag");
    div.innerHTML = tip_el;
    document.body.appendChild(div);
    document.getElementById("tip_view_text").innerText = text;
    document.getElementById("tip_view").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("tip_view").style.visibility = "hidden";
    }, timeout);
}

function showFailTip(text = 'Set failed', timeout = 2000) {
    let tip_el = "<div id='tip_view'>" +
        "<div class='tip_view_board'>" +
        "<div class='tip_error_icon'>✖</div>" +
        "<div id='tip_view_text'>" + text + "</div>" +
        "</div>" +
        "</div>";
    let div = createTagToBody("my_tip_tag");
    div.innerHTML = tip_el;
    document.body.appendChild(div);
    document.getElementById("tip_view_text").innerText = text;
    document.getElementById("tip_view").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("tip_view").style.visibility = "hidden";
    }, timeout);
}