'use strict';

angular
    .module('myapp')
    .controller('LoginController', LoginController);

function LoginController($scope, LoginService, $sessionStorage) {
    this.save = function (user) {
        LoginService.getJWT({
                username: this.user.username,
                password: this.user.password
            })
            .then(result => {
                this.mes = 'Succses!';
                this.mesClass = 'is-success';
                $sessionStorage.username = this.user.username;
                $sessionStorage.loggedInUser = true;
                $sessionStorage.jwt = result.data.jwt;

            })
            .catch(e => {
                $sessionStorage.loggedInUser = false;
                $sessionStorage.jwt = false;
                $sessionStorage.username = false;
                if(e.status === 404) {
                    this.mes = 'Faild to login!';
                    this.mesClass = 'is-danger';
                } else {
                    this.mes = 'unknown error';
                    this.mesClass = 'is-warning';
                }
            });

    };

    this.logout = function () {
        LoginService.logOut();
    };
}
