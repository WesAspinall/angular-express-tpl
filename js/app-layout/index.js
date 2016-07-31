import angular from 'angular';
import SplashCtrl from './controllers/splash.controller.js';


angular
	.module('app.layout', [])
	.controller('SplashCtrl', SplashCtrl)
;