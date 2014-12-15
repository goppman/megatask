var Megatask = function () {
  function Megatask () {
    this.tasks =[];
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
      return '<li class="list-group-item">'+ task.name + '</li>'


    };

    var addTask = function (taskName, taskCompleted) {
      taskCompleted = !!taskCompleted;
      var newTask = {
        name: taskName,
        completed: taskCompleted
      };
      self.tasks.push(newTask);
      $('#tasks').append('<li class="list-group-item">' + taskName +'</li>');
      saveTasks();
    };

    var saveTasks = function() {
      if (supportsStorage() && localStorage.tasks){
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

    loadTasks();

  }

  return Megatask;
}();

var megatask = new Megatask();
