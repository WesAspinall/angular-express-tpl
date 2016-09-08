const StringService = function() {
    this.reverseIt = reverseIt;
    this.getString = getString;

    function reverseIt(data) {
        return data.split('').reverse().join('').toUpperCase();
    }


    function getString(data) {
        return data;
    }

};

StringService.$inject = [];

export default StringService;