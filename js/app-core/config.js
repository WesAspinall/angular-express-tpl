let config = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            templateUrl: 'templates/app-layout/layout.tpl.html'
        })
        .state('root.splash', {
            url: '/',
            controller: 'SplashCtrl as vm',
            templateUrl: 'templates/app-layout/splash.tpl.html'
        });
};

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default config;