/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.setupVue();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', onDeviceReady false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //var credentials = localStorage.CredentialsAutoLogin;
        //this.loginAuto(credentials);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    // Auto-Login
    loginAuto: function(credentials) {
        //var credentials = localStorage.CredentialsAutoLogin;
        this.$http.post('https://laurentcazanove.com/api/login', credentials).then(function(response) {
            // Success
            window.location = "homepage.html";
        }, function(response) {
            // Failure
            this.loginError = response.body.data; //recuparation of JSON login error
        });
    },

    // Vue.js
    setupVue: function() {
        var vm = new Vue({
            // Tag associated with the vue component
            el: "#vue-index",

            // Variables
            data: {
                hideRegistration: true,
                credentials: {
                    username: '',
                    password: ''
                },
                registrationCredentials: {
                    username: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                loginError: {}, //error mesage for login
                registrationError: {} //error message for registration
            },

            // Methods
            methods: {
                showRegister: function() {
                    this.hideRegistration = false;
                },

                hideRegister: function() {
                    this.hideRegistration = true;
                },

                login: function() {
                    this.$http.post('https://laurentcazanove.com/api/login', this.credentials).then(function(response) {
                        // Success
                        this.loginError = {}; //raz login error message
                        localStorage.setItem("CredentialsAutoLogin", this.credentials);
                        window.location = "homepage.html";
                    }, function(response) {
                        // Failure
                        this.loginError = response.body.data; //recuparation of JSON login error
                    });
                },

                testFunc: function() {
                    console.log("Jai cassé le game");
                },

                register: function() {
                    this.$http.post('https://laurentcazanove.com/api/register', this.registrationCredentials).then(function(response) {
                        // Success
                        this.hideRegistration = true;
                    }, function(response) {
                        // Failure
                        this.registrationError = response.body.data; //recuperation of JSON registration error
                        console.log(response.body.data);
                    });
                }
            }
        });
    }
};

app.initialize();