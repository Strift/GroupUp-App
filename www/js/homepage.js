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
        this.vue = new Vue({
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
                    }
                ],
                friendList: {},
                userToken: ''
            },

            // Methods
            methods: {
                deleteFriend:function(username){
                    var userId = 15
                  var url = 'https://laurentcazanove.com/api/friends/' + userId + '?username=' + username + '?api_token=VHCkHJUrFEPHiyr6CnHa2enY3gdHMxN9gwUKJrxoTvfwwku6Um1sdxDMyyQ2'; 

                  this.$http.delete(url).then(function(response){
                       console.log("User "+userId+" a supprimé l'ami " + username);
                  }, function(response){
                       console.log("Error : delete friend");
                  });
            },
                getFriends:function(){
                    var userId = 15;
                    var url = 'https://laurentcazanove.com/api/friends/' + userId;
                    
                    var param = { api_token: "VHCkHJUrFEPHiyr6CnHa2enY3gdHMxN9gwUKJrxoTvfwwku6Um1sdxDMyyQ2" };

                    this.$http.get("https://laurentcazanove.com/api/friends/15?api_token=VHCkHJUrFEPHiyr6CnHa2enY3gdHMxN9gwUKJrxoTvfwwku6Um1sdxDMyyQ2").then(function(response){
                        //Success
                        console.log("Success");
                        }, function(response){
                        //Failure

                            });
                },
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
                },
                toAccount:function(){
                    window.location = "account.html";
                },
                toAbout:function(){
                    window.location = "about.html";
                },
                disconnet: function() {
                    localStorage.removeItem("usernameAutoLogin");
                    localStorage.removeItem("passwordAutoLogin");
                    window.location = "index.html";
                }
            }
        });
    }
};

app.initialize();