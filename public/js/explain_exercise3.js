
let tmpStartPos = 0;
let tmpLen = 0;

let hintCnt = 0;

function GenDelete() {
  let selectResult = getSelectResult();
    if (selectResult.len == 0) {
        alert("Please select texts.");
        return;
    }

    let checkExercise = window.parent.document.getElementById('checkExercise');
    if (selectResult.text.indexOf('super(settings);', 0) < 0) {
      hintCnt += 1;
      if (hintCnt == 1) {
        alert('Check the selection again.');
        return;
      }
      else if (hintCnt == 2) {
        alert('Check the selection again. Look carefully the red highlighted line.');
        return;
      }
      else if (hintCnt == 3) {
        alert('The changed code is "super(settings);".');
        return;
      }
      else {
        selectResult.len = 16;
        selectResult.startPos = 0;
        selectResult.text = 'super(settings);';
        selectResult.lineNum = 15;
        alert('Check the correct answer.');

      }
    }
    else {
      alert("Correct!! The next button is activated.");
    }

    let table = document.getElementById("edit_scripts");
    let newRow = table.insertRow();
    newRow.id = selectResult.len + "/:" + selectResult.startPos + "/";

    let newATag = createDeleteButton(0);

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    let newCell5 = newRow.insertCell(4);
    let newCell6 = newRow.insertCell(5);

    newCell1.innerText = 'Delete';
    let preTag = document.createElement('pre');
    preTag.innerHTML = selectResult.text;
    newCell2.appendChild(preTag);
    newCell3.innerText = selectResult.lineNum;
    newCell6.appendChild(newATag);

    let currentPageNum = Number(window.parent.document.getElementById('current_page').innerText);
    checkExercise.value = currentPageNum;
    let nextButton = window.parent.document.getElementById('next_button');
    nextButton.style.color = "#393E46";
    nextButton.disabled = false;
}




let selectResult = new Object();

// Context Menu 생성
function handleCreateContextMenu_left(event){
  // 기본 Context Menu가 나오지 않게 차단
  event.preventDefault();
  
  // Context Menu Element 생성
  const ctxMenuId = 'dochi_context_menu';
  const ctxMenu = document.createElement('div');
  
  // Context Menu Element 옵션 설정
  ctxMenu.id = ctxMenuId;
  ctxMenu.className = 'custom-context-menu';
  
  // 위치 설정
  ctxMenu.style.top = event.pageY+'px';
  ctxMenu.style.left = event.pageX+'px';
  
  dragSelect();

  // 메뉴 목록 생성
  ctxMenu.appendChild(renderContextMenuList([
    {
      label: "Generate Delete",
      onClick: function(){
        GenController(0, 0);
      }
    },
    {
      label: "Generate Move",
      onClick: function(event){
        GenController(0, 2);
      }
    },
    {
      label: "Generate Update",
      onClick: function(event){
        GenController(0, 3);
      }
    }
  ]));
  
  // 이전 Element 삭제
  const prevCtxMenu = document.getElementById( ctxMenuId );
  if( prevCtxMenu ){
    prevCtxMenu.remove();
  }
  
  let selected = document.getSelection();
  // var selected = document.getSelection();
  if(selected.toString().length > 0) {
    highlightSelection(selected);
  }

  // Body에 Context Menu를 추가.
  document.body.appendChild( ctxMenu );
}

let storedSelectStartPos = 0;
let storedSelectLines = new Array();

function highlightSelection(selected) {
  // console.log(selected);
  let startNum, endNum, selectionStartNumber, selectionEndNumber;
  if (selected.anchorNode.parentElement.attributes.length == 2 && !(selected.anchorNode.parentElement.attributes[1].value.includes('#'))) {
    startNum = selected.anchorNode.parentElement.attributes[1].value;
  } else if (selected.anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes.length == 2 && !(selected.anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value.includes('#'))) {
    startNum = selected.anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value;
  }

  if (selected.focusNode.parentElement.attributes.length == 2 && !(selected.focusNode.parentElement.attributes[1].value.includes('#'))) {
    endNum = selected.focusNode.parentElement.attributes[1].value;
  } else if (selected.focusNode.parentElement.firstChild.parentNode.offsetParent.attributes.length == 2 && !(selected.focusNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value.includes('#'))) {
    endNum = selected.focusNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value;
  }

  startNum *= 1;
  endNum *= 1;

  if (startNum == 0) {
    selectionStartNumber = endNum;
    selectionEndNumber = startNum;
  } else if (endNum == 0) {
    selectionStartNumber = startNum;
    selectionEndNumber = endNum;
  } else {
    selectionStartNumber = (startNum < endNum) ? startNum : endNum;
    selectionEndNumber = (startNum > endNum) ? startNum : endNum;
  }

  // for (let i = 0; i < storedSelectLines.length; i++) {
  //   let tbody = document.getElementById('left').children[0].children[0].children[0].children[0];
  //   tbody.children[storedSelectStartPos + i].children[1].innerHTML = storedSelectLines[i];
  // }
  
  storedSelectLines = [];
  storedSelectStartPos = selectionStartNumber - 1;


  selected = selected.getRangeAt(0);
  // console.log(selected);
  let old = selected.cloneContents();

  if (selectionStartNumber != selectionEndNumber) {
    let safeRanges = getSafeRanges(selected);
    for (let i = 0; i < safeRanges.length; i++) {
      highlightRange(safeRanges[i]);
    }
    // let tbody = document.getElementById('left').children[0].children[0].children[0].children[0];
    // let oldChildren = old.children;
    
    // storedSelectLines.push(tbody.children[selectionStartNumber - 1].children[1].innerHTML);

    // let frontSpan = createHilightedSpan(oldChildren[0].cells[0].innerHTML);
    // let frontInnerHTML = tbody.children[selectionStartNumber - 1].children[1].innerHTML;
    // let frontSelectStart = frontInnerHTML.lastIndexOf(oldChildren[0].cells[0].innerHTML);
    // frontInnerHTML = frontInnerHTML.slice(0, frontSelectStart) + frontSpan.innerHTML + frontInnerHTML.slice(frontSelectStart + oldChildren[0].cells[0].innerHTML.length);
    // tbody.children[selectionStartNumber - 1].children[1].innerHTML = frontInnerHTML;
    
    // for (let i = 1; i < oldChildren.length - 1; i++) {
    //   storedSelectLines.push(tbody.children[selectionStartNumber + i - 1].children[1].innerHTML);
    //   let span = createHilightedSpan(oldChildren[i].children[1].innerHTML);
    //   tbody.children[selectionStartNumber + i - 1].children[1].innerHTML = span.innerHTML;
    // }
    
    // storedSelectLines.push(tbody.children[selectionEndNumber - 1].children[1].innerHTML);
  
    // let backSpan = createHilightedSpan(oldChildren[oldChildren.length - 1].cells[1].innerHTML);
    // let backInnerHTML = tbody.children[selectionEndNumber - 1].children[1].innerHTML;
    // let backSelectStart = backInnerHTML.indexOf(oldChildren[oldChildren.length - 1].cells[1].innerHTML);
    // backInnerHTML = backInnerHTML.slice(0, backSelectStart) + backSpan.innerHTML + backInnerHTML.slice(backSelectStart + oldChildren[oldChildren.length - 1].cells[1].innerHTML.length);
    // tbody.children[selectionEndNumber - 1].children[1].innerHTML = backInnerHTML;
    // console.log(storedSelectLines);
  }
  else {
    let safeRanges = getSafeRanges(selected);
    for (let i = 0; i < safeRanges.length; i++) {
      highlightRange(safeRanges[i]);
    }
  }

}

function highlightRange(range) {
  let newNode = document.createElement("div");
  newNode.setAttribute(
     "style",
     "background-color: yellow; display: inline;"
  );
  range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
  let a = dangerous.commonAncestorContainer;
  // Starts -- Work inward from the start, selecting the largest safe range
  let s = new Array(0), rs = new Array(0);
  if (dangerous.startContainer != a)
    for(let i = dangerous.startContainer; i != a; i = i.parentNode) {
      s.push(i)
    }
  ;
  if (0 < s.length) for(let i = 0; i < s.length; i++) {
    let xs = document.createRange();
    if (i) {
        xs.setStartAfter(s[i-1]);
        xs.setEndAfter(s[i].lastChild);
    }
    else {
        xs.setStart(s[i], dangerous.startOffset);
        xs.setEndAfter(
            (s[i].nodeType == Node.TEXT_NODE)
            ? s[i] : s[i].lastChild
        );
    }
    rs.push(xs);
  }

  // Ends -- basically the same code reversed
  let e = new Array(0), re = new Array(0);
  if (dangerous.endContainer != a)
    for(let i = dangerous.endContainer; i != a; i = i.parentNode)
        e.push(i)
  ;
  if (0 < e.length) for(let i = 0; i < e.length; i++) {
    let xe = document.createRange();
    if (i) {
        xe.setStartBefore(e[i].firstChild);
        xe.setEndBefore(e[i-1]);
    }
    else {
        xe.setStartBefore(
            (e[i].nodeType == Node.TEXT_NODE)
            ? e[i] : e[i].firstChild
        );
        xe.setEnd(e[i], dangerous.endOffset);
    }
    re.unshift(xe);
  }

  // Middle -- the uncaptured middle
  
  let xm = document.createRange();
  if ((0 < s.length) && (0 < e.length)) {
    xm.setStartAfter(s[s.length - 1]);
    xm.setEndBefore(e[e.length - 1]);
  }
  else {
    return [dangerous];
  }

  // Concat
  rs.push(xm);
  response = rs.concat(re);    

  // Send to Console
  return response;
}


function createHilightedSpan(text) {
  // let span = `<span id="selection" style="background-color:'#0FF0F0`;
  let span = document.createElement('span');
  span.id = "selection";
  span.style.backgroundColor = '#0FF0F0';
  span.innerHTML = text;
  let div = document.createElement('div');
  div.appendChild(span);
  return div;
}




function handleCreateContextMenu_right(event){
  // 기본 Context Menu가 나오지 않게 차단
  event.preventDefault();
  
  // Context Menu Element 생성
  const ctxMenuId = 'dochi_context_menu';
  const ctxMenu = document.createElement('div');
  
  // Context Menu Element 옵션 설정
  ctxMenu.id = ctxMenuId;
  ctxMenu.className = 'custom-context-menu';
  
  // 위치 설정
  ctxMenu.style.top = event.pageY+'px';
  ctxMenu.style.left = event.pageX+'px';
  
  dragSelect();

  // 메뉴 목록 생성
  ctxMenu.appendChild(renderContextMenuList([
      {
      label: "Generate Insert",
        onClick: function(event){
          GenController(0, 1);
        }
      },
      {
      label: "Generate Move",
        onClick: function(event){
          GenController(0, 2);
        }
      },
      {
      label: "Generate Update",
        onClick: function(event){
          GenController(0, 3);
        }
      }
  ]));
  
  // 이전 Element 삭제
  const prevCtxMenu = document.getElementById( ctxMenuId );
  if( prevCtxMenu ){
    prevCtxMenu.remove();
  }
  
  // Body에 Context Menu를 추가.
  document.body.appendChild( ctxMenu );
}

function getSelectResult() {
  return selectResult;
}


function dragSelect() {
  let result = new Object();
  let selectionText = "";
  let startNum = "";
  let endNum = "";
  let selectionNumber = "";
  let startPos = 0;

  if (document.getSelection) {
    selectionText = document.getSelection();
    try {
      startPos = selectionText.getRangeAt(0).startOffset;
    }
    catch {
      alert('Pleas select texts again.');
      return;
    }
  } else if (document.selection) {
    selectionText = document.selection.createRange().text;
  }
  
  if (document.getSelection().anchorNode.parentElement.attributes.length == 2 && !(document.getSelection().anchorNode.parentElement.attributes[1].value.includes('#'))) {
    startNum = document.getSelection().anchorNode.parentElement.attributes[1].value;
  } else if (document.getSelection().anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes.length == 2 && !(document.getSelection().anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value.includes('#'))) {
    startNum = document.getSelection().anchorNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value;
  }

  if (document.getSelection().focusNode.parentElement.attributes.length == 2 && !(document.getSelection().focusNode.parentElement.attributes[1].value.includes('#'))) {
    endNum = document.getSelection().focusNode.parentElement.attributes[1].value;
  } else if (document.getSelection().focusNode.parentElement.firstChild.parentNode.offsetParent.attributes.length == 2 && !(document.getSelection().focusNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value.includes('#'))) {
    endNum = document.getSelection().focusNode.parentElement.firstChild.parentNode.offsetParent.attributes[1].value;
  }

  startNum *= 1;
  endNum *= 1;

  if (startNum == 0) {
    selectionNumber = endNum;
  } else if (endNum == 0) {
    selectionNumber = startNum;
  } else {
    selectionNumber = (startNum < endNum) ? startNum : endNum;
  }

  result.text = selectionText.toString();
  result.lineNum = selectionNumber;
  result.startPos = startPos;
  result.len = result.text.length;

  selectResult = result;
}




function move_inner() {
  let left = document.getElementById("left");
  let right = document.getElementById("right")

  left.scrollTo(0, 130);
  right.scrollTo(0, 130);
}

function init() {
    document.getElementById('left').addEventListener('contextmenu', handleCreateContextMenu_left, false);
    document.getElementById('right').addEventListener('contextmenu', handleCreateContextMenu_right, false);
    document.addEventListener('click', handleClearContextMenu, false);
}