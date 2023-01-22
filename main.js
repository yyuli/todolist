// 유저가 값을 입력한다.
// + 버튼을 누르면 할 일이 추가된다.
// delete 버튼을 누르면 삭제된다.

// check 버튼을 누르면 밑줄이 그어진다.
// 1. check 버튼을 클릭하는 순간 true -> false
// 2. true 이면 끝난 걸로 간주하고 밑줄 긋기
// 3,. false 이면 안 끝난 것으로 간주하고 그대로

// 탭을 누르면 언더바가 이동한다.
// Done은 끝난 것만 Not Done은 진행중인 것
// 전체 탭 누르면 전체 아이템으로 돌아온다.


let taskInput = document.querySelector(".task-input");
let addButton = document.querySelector(".add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all"
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        addTask(); 
    }
    });

for(let i = 1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event);});
};


function addTask () {
    let task = {
        id: randomID(),
        taskContent: taskInput.value,
        isComplete:false,
    }
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render () {

    let list = [];
    if (mode === "all") {
        list = taskList
    }else if(mode ==="not-done" || mode ==="done") {
        list = filterList
    };

    let resultHTML = "";
    for (let i=0; i<list.length; i++) {
        if(list[i].isComplete) {
            resultHTML += `<div class="task">
            <div class="task-done">
                ${list[i].taskContent}
            </div>                   
            <div class= "button-border">
                <button onclick="toggleComplete('${list[i].id}')">
                    <i class="fas fa-undo-alt"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>`;
        }else {resultHTML += `<div class="task">
        <div class="task-ing">
            ${list[i].taskContent}
        </div>                   
        <div class= "button-border">
            <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-check"></i>
            </button>
            <button onclick="deleteTask('${list[i].id}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    </div>`;

        }

    }

    document.getElementById("task-board").innerHTML = resultHTML;

    console.log(taskList)
    console.log(list)
}


function toggleComplete (id) {
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render();
}

function deleteTask (id) {
    for (let i = 0; i<taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i,1)
        }
    }
    
    render();
}



function filter(event) {
    mode = event.target.id

    document.getElementById("under-line").style.width =
        event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    document.getElementById("under-line").style.left =
        event.target.offsetLeft + "px";

    // if(mode == "all") {
    //     render();
    filterList = [];
    if(mode === "not-done") {
        for (let i = 0; i<taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            };
        };
    }else if(mode === "done") {
        for (let i = 0; i<taskList.length; i++) {
            if(taskList[i].isComplete) {
                filterList.push(taskList[i]);
            };
        };
        
    }

    render();

};


function randomID () {
    return "_" + Math.random().toString(36).substr(2, 9);
};