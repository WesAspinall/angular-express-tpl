let SplashCtrl = function($state) {
  
  console.log('I am using my splash controller.');

  let vm = this;

  vm.title = 'HELLO, WORLD.';
};

SplashCtrl.$inject = ['$state'];

export default SplashCtrl;