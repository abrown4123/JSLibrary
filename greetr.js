(function(global, $){
    let Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    let supportedLangs = ['en', 'es'];

    let greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    let formalGreeting = {
        en: 'Greetings',
        es: 'Saludos'
    };

    let logMessages = {
        en: 'En logged in',
        es: 'Es logged in'
    };

    Greetr.prototype = {
        fullname: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid langauge";
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },

        greet: function(formal) {
            var msg;

            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }
            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname())
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not found';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            let msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            
            return this;
        }
    };

    Greetr.init = function(firstName, lastName, language) {
        let self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

})(window, jQuery);