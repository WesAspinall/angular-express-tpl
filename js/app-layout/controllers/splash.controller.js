const SplashCtrl = function(StringService) {
    let vm = this;
    vm.str = '';
    vm.title = 'Do things to Strings';
    vm.instructions = 'Enter text: ';

    vm.getStr = getString;
    vm.activate = activate;
    vm.reverseIt = reverseIt;
    activate();

    function activate() {
        return reverseIt();
    }

    function reverseIt() {
        return StringService.reverseIt(vm.str);
    }

    function getString() {
        StringService.getString;
    }



};

SplashCtrl.$inject = ['StringService'];

export default SplashCtrl;