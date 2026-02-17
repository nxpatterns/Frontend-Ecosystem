(function(){

    var arr = [];

    for (var i in this ) {

        var t = typeof this[i];
        var e = this[i];

        arr.push(e);

        var length = this[i].length || 0;

        if (length > 1) {
            for (var j = 0; j < length; j++) {
                console.log(this[i]);
            }
        }




    }



}())
