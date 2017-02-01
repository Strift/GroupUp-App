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
            el: "#vue-homepage",

            // Variables
            data: {
                menu : false,
                friends: [
                    {
                        username: 'Laurent',
                        favorite: false
                    },
                    {
                        username: 'Paul',
                        favorite: true
                    },
                    {
                        username: 'Baboulino',
                        favorite: false
                    },
                    {
                        username: 'Baboulino',
                        favorite: false
                    },
                    {
                        username: 'Baboulino',
                        favorite: false
                    },
                    {
                        username: 'Baboulino',
                        favorite: false
                    },
                    {
                        username: 'Baboulino',
                        favorite: false
                    }
                ],
                friendList: {},
                userToken: ''
            },

            // Methods
            methods: {
                showMenu:function(){
                    this.menu = true;
                },
                hideMenu:function(){
                    this.menu = false;
                },
                addFriendFromUsername: function() {
                    alert('Goodbye');
                    this.$http.post('https://laurentcazanove.com/api/register', this.registrationCredentials).then(function(response) {
                        // Success
                        
                    }, function(response) {
                        // Failure
                        
                    });
                }
            }
        });
    }
};

app.initialize();