function prevExplain() {
    var currentPage = Number(document.getElementById('current_page').innerHTML);
    var totalPage = Number(document.getElementById('total_page').innerHTML);
    var explainWindow = document.getElementById('explain_window');

    if (currentPage == 1) {
        alert("This is the first page.");
        return;
    }
    else if (currentPage == totalPage) {
        var startButton = document.getElementById('start_button');
        startButton.disabled = true;
        startButton.className = "start_button";
    }
    explainWindow.src = ("/views/explain" + (currentPage - 1) + ".html");
    document.getElementById('current_page').innerHTML = currentPage - 1;
}

function nextExplain() {
    var currentPage = Number(document.getElementById('current_page').innerHTML);
    var totalPage = Number(document.getElementById('total_page').innerHTML);
    var explainWindow = document.getElementById('explain_window');

    if (currentPage == totalPage) {
        alert("This is the last page.");
        return;
    }
    else if (currentPage == (totalPage - 1)) {
        var startButton = document.getElementById('start_button');
        startButton.disabled = false;
        startButton.className = "move_buttons";
    }
    explainWindow.src = ("/views/explain" + (currentPage + 1) + ".html");
    document.getElementById('current_page').innerHTML = currentPage + 1;
}