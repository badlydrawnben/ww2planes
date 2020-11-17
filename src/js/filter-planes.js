window.alpine = {};
        window.alpine.filter = function() {
            return {
                country:'',
                planetype:'',
                location:'',
                filterNotification: '',
                currentCount: '',
                updateResultsCount: function() {
                    this.currentCount = [...document.querySelectorAll('.js-talk')]
                        .filter(talk => window.getComputedStyle(talk).display !== 'none')
                        .length;

                    this.filterNotification = this.currentCount ? `${this.currentCount} ${this.currentCount === 1 ? 'talk' : 'talks'} found.` : `No talks found. Try to change your filters!`;
                }
            }
        }