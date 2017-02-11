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
    vue: null,

    // Application Constructor
    initialize: function() {
        this.setupVue();
        this.bindEvents();
    },

    bindEvents: function() {
        var vue = this.vue;
        document.addEventListener("deviceready", function() {
            if(localStorage.getItem("usernameAutoLogin") != null) {
                vue.login({
                    username: localStorage.getItem("usernameAutoLogin"),
                    password: localStorage.getItem("passwordAutoLogin")
                });
            } else {
                console.log("going to login page");
            }
        },true);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    // Vue.js
    setupVue: function() {
        this.vue = new Vue({
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

                login: function(credentials) {
                    this.$http.post('https://laurentcazanove.com/api/login', credentials).then(function(response) {
                        // Success
                        this.loginError = {}; //raz login error message
                        
                        localStorage.setItem("usernameAutoLogin", credentials.username);
                        localStorage.setItem("passwordAutoLogin", credentials.password);
                        localStorage.setItem("userToken", response.body.data.api_token);
                        localStorage.setItem("userId", response.body.data.id);
                        
                        window.location = "homepage.html";
                    }, function(response) {
                        // Failure
                        this.loginError = response.body.data; //recuparation of JSON login error
                    });
                },

                register: function(credentials) {
                    this.$http.post('https://laurentcazanove.com/api/register', credentials).then(function(response) {
                        // Success
                        this.hideRegistration = true;
                    }, function(response) {
                        // Failure
                        this.registrationError = response.body.data; //recuperation of JSON registration error
                    });
                }
            }
        });
    },
};

app.initialize();