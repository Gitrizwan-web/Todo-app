var firebaseConfig = {
    apiKey: "AIzaSyBzbruIdmdL6Vak-HBYPYTjyK-JVO_s9z8",
    authDomain: "todo--app-b9845.firebaseapp.com",
    databaseURL: "https://todo--app-b9845-default-rtdb.firebaseio.com",
    projectId: "todo--app-b9845",
    storageBucket: "todo--app-b9845.appspot.com",
    messagingSenderId: "14886839378",
    appId: "1:14886839378:web:36a0602d2f6cd1e991ab8b",
    measurementId: "G-YR95TYFSQL"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var tasksRef = database.ref('tasks');
document.getElementById('addTaskForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasksRef.push({
            text: taskText,
            completed: false
        });
        taskInput.value = ''; 
    }
});
document.getElementById('deleteAllBtn').addEventListener('click', function () {
    tasksRef.remove();
});
tasksRef.on('value', function (snapshot) {
    var todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; 
    snapshot.forEach(function (childSnapshot) {
        var task = childSnapshot.val();
        var taskId = childSnapshot.key;
        var li = document.createElement('li');
        li.className = 'list-group-item';
        if (task.completed) {
            li.classList.add('completed');
        }
        var taskText = document.createElement('span');
        taskText.innerText = task.text;
        taskText.className = 'task-text';
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-secondary btn-sm';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', function () {
            var newTaskText = prompt('Enter the new task text:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                tasksRef.child(taskId).update({
                    text: newTaskText.trim()
                });
            }
        })
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', function () {
            tasksRef.child(taskId).remove();
        });
        li.appendChild(taskText);
        var buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        li.appendChild(buttonsDiv);
        todoList.appendChild(li);
    });
});