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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    // Vue.js
    setupVue: function() {
        var vm = new Vue({
            // Tag associated with the vue component
            el: "#vue-instance",

            // Variables
            data: {
                hideRegistration: true,
                credentials: {
                    username: 'Tangiers',
                    password: 'k4t1ndu92'
                }
            },

            // Computed properties
            computed: {
                registrationIsHidden: function () {
                  return this.hideRegistration;
                }
            },

            // Methods
            methods: {
                showRegister: function() {
                    this.hideRegistration = false;
                    console.log("show. hideRegistration=" + this.hideRegistration)
                },

                hideRegister: function() {
                    this.hideRegistration = true;
                    console.log("hide. hideRegistration=" + this.hideRegistration)
                },

                login: function() {
                    this.$http.post('https://laurentcazanove.com/api/login', this.credentials).then(function(response) {
                        // Success
                        console.log(response.json());
                    }, function(response) {
                        // Failure
                        console.log(response.body.data.username);
                        if (response.status == 422) {
                            console.log("Le code d'erreur est 422");
                        }
                    });
                }
            }
        });
    }
};

app.initialize();