'use strict';

angular
  .module('myapp')
  .controller('OwnToiletController', OwnToiletController);

function OwnToiletController($scope, $routeParams, CrudToiletService, ToiletService) {

    ToiletService.getToilet($routeParams.id)
        .then(value => {
            console.log(value);
            this.toilet = value.data;
        });

    this.save = function(){

        var obj = {
            toilet:{
                name: this.toilet.name,
                description: this.toilet.description,
                positions:[
                    { address: this.toilet.address }
                ]
            }
        };
        CrudToiletService.update(obj, $routeParams.id)
            .then(value => {
                this.mes = 'Update succsesfull';
                this.mesClass = 'is-success';
                console.log(value);
            })
            .catch(e => {
                if(e.status === 404) {
                    this.mes = 'Faild to update!';
                    this.mesClass = 'is-danger';
                } else {
                    this.mes = 'unknown error';
                    this.mesClass = 'is-warning';
                }
            });
    };
}
