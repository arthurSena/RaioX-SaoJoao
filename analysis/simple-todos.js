Programacao = new Mongo.Collection("programacao");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Programacao.find({});
    }
  });

    Template.task.events({

        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
           console.log("oi");
        }


    });

}
