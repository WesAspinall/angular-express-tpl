import angular from 'angular';
import SplashCtrl from './controllers/splash.controller.js';
import StringService from './services/StringService.service.js';

angular
	.module('app.layout', [])
	.controller('SplashCtrl', SplashCtrl)
    .service('StringService', StringService)
;