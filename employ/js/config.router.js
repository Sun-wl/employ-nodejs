'use strict';
/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/auth/login');
                $stateProvider
                    .state('auth',{
                        abstract: true,
                        url:'/auth',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load([
                                        'js/controller/login.js',
                                        'js/service/eventService.js',
                                        'js/service/myService.js',
                                        'js/service/base64.js'
                                    ]);
                                }]
                        }
                    })
                    .state('auth.login',{
                        url:'/login',
                        templateUrl:'tpl/auth/login.html'
                    })

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/nav.js',
                                        'js/service/base64.js',
                                        'js/service/eventService.js',
                                        'js/service/myService.js',
                                        'js/filter/infoFilter.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.home', {
                        url: '/home',
                        templateUrl: 'tpl/home/home.html',
                        reload:true
                    })
                    .state('app.mStuInfo', {
                        url: '/mStuInfo',
                        template: '<div ui-view class="fade-in-up"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mStuInfo.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.mStuInfo.stuEmployInfo', {
                        url: '/stuEmployInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mStuInfo.stuEmployInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/manage/stuInfo/stuEmployInfo/stuEmployInfo.html',
                        reload:true
                    })
                    .state('app.mStuInfo.stuEmployInfo.updateStuInfo', {
                        url: '/updateStuInfo/:stuId',
                        templateUrl: 'tpl/manage/stuInfo/stuEmployInfo/updateStuInfo.html',
                        reload:true
                    })
                    .state('app.mStuInfo.addStuInfo', {
                        url: '/addStuInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mStuInfo.addStuInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/manage/stuInfo/addStuInfo/addStuInfo.html',
                        params: {id:null},
                        reload:true
                    })
                    .state('app.mEmployCount', {
                        url: '/mEmployCount',
                        template: '<div ui-view class="fade-in-up"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mEmployCount.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.mEmployCount.employDistbt', {
                        url: '/employDistbt',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mEmployCount.employDistbt.list', {
                        url: '/list',
                        templateUrl: 'tpl/manage/employCount/employDistbt/employDistbt.html',
                        reload:true
                    })
                    .state('app.mEmployCount.employRate', {
                        url: '/employRate',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mEmployCount.employRate.list', {
                        url: '/list',
                        templateUrl: 'tpl/manage/employCount/employRate/employRate.html',
                        reload:true
                    })

                    .state('app.sPersonalInfo', {
                        url: '/sPersonalInfo',
                        template: '<div ui-view class="fade-in-up"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/sPersonalInfo.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.sPersonalInfo.personalInfo', {
                        url: '/personalInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.sPersonalInfo.personalInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/sPersonalInfo/personalInfo/personalInfo.html',
                        reload:true
                    })
                    .state('app.sPersonalInfo.personalInfo.updateInfo', {
                        url: '/updateInfo',
                        templateUrl: 'tpl/sPersonalInfo/personalInfo/updateInfo.html',
                        reload:true
                    })
                    .state('app.sPersonalInfo.addInfo', {
                        url: '/addInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.sPersonalInfo.addInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/sPersonalInfo/addInfo/addInfo.html',
                        reload:true
                    })

                    .state('app.user', {
                        url: '/user',
                        template: '<div ui-view class="fade-in-up"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/user.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.user.passwordUpdate', {
                        url: '/passwordUpdate',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.user.passwordUpdate.list', {
                        url: '/list',
                        templateUrl: 'tpl/user/passwordUpdate/passwordUpdate.html',
                        reload:true
                    })
                    .state('app.user.managerDefend', {
                        url: '/managerDefend',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.user.managerDefend.list', {
                        url: '/list',
                        templateUrl: 'tpl/user/managerDefend/managerList.html',
                        reload:true
                    })
                    .state('app.user.managerDefend.add', {
                        url: '/add',
                        templateUrl: 'tpl/user/managerDefend/managerAdd.html',
                        reload:true
                    })

            }
        ]
    );