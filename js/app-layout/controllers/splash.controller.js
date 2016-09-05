let SplashCtrl = function($state) {
  
  console.log('I am using my splash controller.');

  let vm = this;

  vm.title = 'If you see this message, Angular is set up properly';
};

SplashCtrl.$inject = ['$state'];

export default SplashCtrl;