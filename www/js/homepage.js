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
        Vue.component('modal', {
            template: '#modal-template'
        });
        this.setupVue();
        this.bindEvents();
    },

    bindEvents: function() {
        var vue = this.vue;
        document.addEventListener("deviceready", function() {
            if(localStorage.getItem("userToken") != null) {
                vue.getMyfriends();
            } else {
                console.log("failed to list friends");
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
            el: "#vue-homepage",

            // Variables
            data: {
                menu : false,
                addUsername: null,
                friendList: {},
                showModalDelete: false,
                userToDelete: null,
                addError: null, //error mesage for adding friend

            },

            mounted:function(){
                this.getMyfriends() //method1 will execute at pageload
            },

            // Methods
            methods: {
                deleteFriend:function(username){
                  var url = 'https://laurentcazanove.com/api/users/' + localStorage.getItem("userId") + '/friends' 
                      + '?api_token=' + localStorage.getItem("userToken")
                      + '&username=' + username ; 
                  this.$http.delete(url).then(function(response){
                        this.getMyfriends();
                       //console.log("User "+localStorage.getItem("userId")+" a supprimé l'ami " + username);
                  }, function(response){
                       console.log("Error : delete friend");
                  });
                },

                enableDeleteModal: function(user){
                    this.userToDelete = user;
                    this.showModalDelete = true;
                },

                disableDeleteModal: function(confirmed){
                    if(confirmed){
                        this.deleteFriend(this.userToDelete.username);
                    }

                    this.showModalDelete = false;
                },

                toggleFavorite: function(friend) {
                    var favorite = friend.favorite ? 0 : 1;
                    var url = 'https://laurentcazanove.com/api/users/' + localStorage.getItem("userId") + '/friends' 
                      + '?api_token=' + localStorage.getItem("userToken")
                      + '&username=' + friend.username
                      + '&favorite=' + favorite;
                    this.$http.put(url).then(function(response) {
                        this.getMyfriends();
                    }, function (response) {
                        // failure
                        console.log("failed to favorite " + friend.username);
                    })
                },
                
                showMenu:function(){
                    this.menu = true;
                },

                hideMenu:function(){
                    this.menu = false;
                },

                addFriendFromUsername: function() {
                    var url = 'https://laurentcazanove.com/api/users/' + localStorage.getItem("userId") + '/friends' 
                        + '?username=' + this.addUsername 
                        + '&api_token=' + localStorage.getItem("userToken");
                    this.$http.post(url).then(function(response) {
                        // Success
                        this.addError = null; //raz login error message
                        this.addUsername = null;
                        this.getMyfriends();
                    }, function(response) {
                        // Failure
                        this.addError = response.body.data.username[0]
                    });
                },

                getMyfriends: function() {
                    var url = 'https://laurentcazanove.com/api/users/' + localStorage.getItem("userId") + '/friends' 
                        + '?api_token=' + localStorage.getItem("userToken");
                    this.$http.get(url).then(function(response) {
                        // Success
                        this.friendList = response.body.data;
                    }, function(response) {
                        // Failure
                        console.log("failed get my friends");
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
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userToken");
                    window.location = "index.html";
                }
            }
        });
    }
};

app.initialize();