Programacao = new Mongo.Collection("bandas2");

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
            var bandas = this.bandas;
            var valores = {}
            var total = 0;
            for(var i = 0; i < bandas.length; i++){
                var banda = bandas[0];
                var tags = banda.tags;
                for(var j = 0; j < tags.length; j++){
                    var tagName = tags[j].tag
                    var tagValue = tags[j].value

                    if (! (tagName in valores)){
                        valores[tagName] = 0
                    }
                    valores[tagName] +=tagValue
                    total += tagValue
                }
            }

           console.log("oi");
        }


    });

}
