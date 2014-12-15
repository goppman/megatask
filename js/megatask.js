var Megatask = function () {
  function Megatask () {
    this.tasks =[];
    this.counter=0;
    var self = this;

    var supportsStorage = function () {
      try {
        return 'localStorage' in window && window['localStorage'] != null;
      }catch(e){
        return false;
      }
    };

    var loadTasks = function () {
      if (supportsStorage() && localStorage.tasks) {
       self.tasks=JSON.parse(localStorage.tasks);
       for (i=0; i < self.tasks.length; i++) {
         var taskToAppend = self.tasks[i];
         $('#tasks').append(createListItem(taskToAppend));

       }
      }
    };

    var createListItem = function (task) {
      var deleteButton, editButton, buttonGroup, label;
      label = '<label> '+ task.name + '</label>';
      deleteButton = '<button  class="btn btn-sm btn-danger" ><i class=" fa fa-trash-o fa-lg"></i></button>';
      editButton = '<button class="btn btn-sm btn-success">edit</button>';
      buttonGroup = '<div class="btn-group" >' + deleteButton +
      editButton + '</div>';
      return '<li class="list-group-item" id="task_' + task.id + '"><div class="task">'+
      label + buttonGroup +'</div></li>';


    };

    var addTask = function (taskName, taskCompleted) {
      taskCompleted = !!taskCompleted;
      self.counter++;
      var newTask = {
        id: self.counter,
        name: taskName,
        completed: taskCompleted
      };
      self.tasks.push(newTask);
      $('#tasks').append(createListItem(newTask));
      saveTasks();
    };

    var saveTasks = function() {
      if (supportsStorage() ){
        localStorage.tasks = JSON.stringify(self.tasks);
      }
    };

    $('#new_task').submit(function (ev) {
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
      //this.elements.task_name.value
    });
    $('#tasks').on('click','button.btn-danger', function(){
      var listItem = $(this).closest('li');
      var id = listItem.attr('id');
      id = id.substring(id.lastIndexOf('_')+1)
      for(var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString()===id) {
          self.tasks.splice(i, 1);
        }
      }
      listItem.remove();
      saveTasks();

    })

    loadTasks();

  }

  return Megatask;
}();

var megatask = new Megatask();
