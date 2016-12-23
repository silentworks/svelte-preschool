function applyComputations ( state, newState, oldState ) {
	if ( ( 'question' in newState && typeof state.question === 'object' || state.question !== oldState.question ) || ( 'totalTries' in newState && typeof state.totalTries === 'object' || state.totalTries !== oldState.totalTries ) ) {
		state.tries = newState.tries = template$1.computed.tries( state.question, state.totalTries );
	}
	
	if ( ( 'question' in newState && typeof state.question === 'object' || state.question !== oldState.question ) || ( 'totalTries' in newState && typeof state.totalTries === 'object' || state.totalTries !== oldState.totalTries ) ) {
		state.triesLeft = newState.triesLeft = template$1.computed.triesLeft( state.question, state.totalTries );
	}
}

var template$1 = (function () {
    var animations = [
        'zoomIn','flipInY',
        'fadeIn','bounceIn',
        'flipInX','lightSpeedIn'
    ];

    var randomAnimation  = function () { return animations[Math.floor(Math.random() * animations.length)]; };

    return {
        helpers: {
            correctAnswer: function correctAnswer(question, answer, totalTries) {
                if (question.tries >= totalTries && question.answer == answer) {
                    return 'question__option-item-answer';
                }
                return '';
            }
        },
        onrender: function onrender() {
            var this$1 = this;

            this.observe('question', function (newV, oldV) {
                if (oldV !== newV) {
                    this$1.set({animation: randomAnimation()});
                }
            });
        },
        methods: {
            answer: function answer(option) {
                var question = this.get('question');
                if (question.tries >= this.get('totalTries')) { return; }
                this.fire("answer", {option: option});
            }
        },
        computed: {
            tries: function (question, totalTries) { 
                return question.tries >= totalTries;
            },
            triesLeft: function (question, totalTries) {
                if (question.tries === undefined) {
                    question.tries = 0;
                }
                return (totalTries - question.tries)
            }
        },
        data: function data() {
            return {
                animation: randomAnimation()
            }
        }
    }
}());

var addedCss$1 = false;
function addCss$1 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      \n.question__heading[svelte-1145037430], [svelte-1145037430] .question__heading {\n    font-size: 3.5rem;\n    padding: 20px;\n    text-align: center;\n}\n.question__image[svelte-1145037430], [svelte-1145037430] .question__image {\n    display: block;\n    height: 300px;\n    width: auto;\n    margin: 40px auto;\n}\n\n.question__option-item[svelte-1145037430], [svelte-1145037430] .question__option-item {\n    width: 43%;\n    margin: 2%;\n    font-size: 2.5rem;\n    padding: 10px;\n    display: inline-block;\n    float: left;\n\n    border: 5px solid #e1f5c4;\n    border-radius: 30%/90%;\n    text-align: center;\n    text-transform: lowercase;\n    cursor: pointer;\n    transition: box-shadow 0.5s, background-color 0.5s;\n}\n.question__option-item[svelte-1145037430]:hover, [svelte-1145037430] .question__option-item:hover {\n    animation: pulse 1s infinite;\n    box-shadow: 0 3px 1px 1px rgba(0,0,0,0.2);\n    background-color: #e1f5c4;\n}\n.question__next[svelte-1145037430], [svelte-1145037430] .question__next {\n    background-color: #e1f5c4;\n    border: 5px solid #add86d;\n    border-radius: 30%/90%;\n    color: #000;\n    text-align: center;\n    text-transform: lowercase;\n    cursor: pointer;\n    font-size: 1.5rem;\n    padding: 10px;\n    width: 160px;\n    margin: 40px auto;\n    display: block;\n}\n.question__tries-left[svelte-1145037430], [svelte-1145037430] .question__tries-left {\n    text-align: center;\n}\n.question__option-item-answer[svelte-1145037430], [svelte-1145037430] .question__option-item-answer {\n    box-shadow: 0 3px 1px 1px rgba(0,0,0,0.2);\n    background-color: #79cc00;\n}\n.question__explanation[svelte-1145037430], [svelte-1145037430] .question__explanation {\n    font-size: 1.9rem;\n    text-align: center;\n}\n";
	document.head.appendChild( style );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-1145037430', '' );
	div.className = "question bounceInUp";
	
	var p = document.createElement( 'p' );
	p.className = "question__heading";
	
	div.appendChild( p );
	var text = document.createTextNode( root.question.question );
	p.appendChild( text );
	div.appendChild( document.createTextNode( "\n    " ) );
	
	var img = document.createElement( 'img' );
	img.className = "question__image";
	img.style.cssText = "animation: " + ( root.animation ) + " 1.5s";
	img.src = root.question.resource.url;
	
	div.appendChild( img );
	div.appendChild( document.createTextNode( "\n    " ) );
	
	var ul = document.createElement( 'ul' );
	ul.className = "question__option-list no-bullet clearfix";
	
	div.appendChild( ul );
	var eachBlock_anchor = document.createComment( "#each question.options" );
	ul.appendChild( eachBlock_anchor );
	
	var eachBlock_value = root.question.options;
	var eachBlock_iterations = [];
	
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	div.appendChild( document.createTextNode( "\n    \n    " ) );
	var ifBlock_anchor = document.createComment( "#if tries" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.tries ) { return renderIfBlock_0$1; }
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			text.data = root.question.question;
			
			img.style.cssText = "animation: " + ( root.animation ) + " 1.5s";
			img.src = root.question.resource.url;
			
			var eachBlock_value = root.question.options;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},

		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_0$1 ( root, component ) {
	var p = document.createElement( 'p' );
	p.className = "question__explanation";
	
	var text = document.createTextNode( root.question.explanation );
	p.appendChild( text );
	var text1 = document.createTextNode( "\n    " );
	
	var button = document.createElement( 'button' );
	button.className = "question__next";
	
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.fire( "next", { question: root.question });
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	button.__svelte = {
		root: root
	};
	
	button.appendChild( document.createTextNode( "Next" ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( p, anchor );
			target.insertBefore( text1, anchor );
			target.insertBefore( button, anchor );
		},

		update: function ( changed, root ) {
			text.data = root.question.explanation;
			
			button.__svelte.root = root;
		},

		teardown: function ( detach ) {
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				p.parentNode.removeChild( p );
				text1.parentNode.removeChild( text1 );
				button.parentNode.removeChild( button );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, option, option__index, component ) {
	var li = document.createElement( 'li' );
	li.className = "question__option-item " + ( template$1.helpers.correctAnswer(root.question, option, root.totalTries) );
	
	function clickHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, option__index = this.__svelte.option__index, option = eachBlock_value[option__index];
		
		component.answer(option);
	}
	
	li.addEventListener( 'click', clickHandler, false );
	
	li.__svelte = {
		eachBlock_value: eachBlock_value,
		option__index: option__index
	};
	
	var text = document.createTextNode( option );
	li.appendChild( text );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( li, anchor );
		},

		update: function ( changed, root, eachBlock_value, option, option__index ) {
			var option = eachBlock_value[option__index];
			
			li.className = "question__option-item " + ( template$1.helpers.correctAnswer(root.question, option, root.totalTries) );
			
			li.__svelte.eachBlock_value = eachBlock_value;
			li.__svelte.option__index = option__index;
			
			text.data = option;
		},

		teardown: function ( detach ) {
			li.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				li.parentNode.removeChild( li );
			}
		}
	};
}

function Question ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template$1.data(), options.data );
applyComputations( state, state, {} );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		applyComputations( state, newState, oldState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss$1 ) { addCss$1(); }
	
	var mainFragment = renderMainFragment$1( state, this );
	if ( options.target ) { this._mount( options.target ); }
	
	if ( options.root ) {
		options.root.__renderHooks.push({ fn: template$1.onrender, context: this });
	} else {
		template$1.onrender.call( this );
	}
}

Question.prototype = template$1.methods;

var template$2 = (function () {
    return {
        helpers: {
            userScore: function userScore(questions) {
                return questions.reduce(function (prev, next) {
                    return prev + next.points
                }, 0);
            },
            totalScore: function totalScore(questions, totalPoints) {
                return questions.length * totalPoints;
            }
        },
        data: function data() {
            return {
                totalPoints: 3
            }
        }
    }
}());

var addedCss$2 = false;
function addCss$2 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         \n.feedback[svelte-2939432482], [svelte-2939432482] .feedback {\n    text-align: center;\n}\n.feedback__heading[svelte-2939432482], [svelte-2939432482] .feedback__heading {\n    font-size: 3.5rem;\n    padding: 20px;\n    text-align: center;\n}\n";
	document.head.appendChild( style );

	addedCss$2 = true;
}

function renderMainFragment$2 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-2939432482', '' );
	div.className = "feedback";
	
	var h1 = document.createElement( 'h1' );
	h1.className = "feedback__heading";
	
	div.appendChild( h1 );
	h1.appendChild( document.createTextNode( "Feedback" ) );
	div.appendChild( document.createTextNode( "\n    " ) );
	
	var p = document.createElement( 'p' );
	
	div.appendChild( p );
	p.appendChild( document.createTextNode( "You have scored " ) );
	var text3 = document.createTextNode( template$2.helpers.userScore(root.questions) );
	p.appendChild( text3 );
	p.appendChild( document.createTextNode( " out of " ) );
	var text5 = document.createTextNode( template$2.helpers.totalScore(root.questions, root.totalPoints) );
	p.appendChild( text5 );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			text3.data = template$2.helpers.userScore(root.questions);
			
			text5.data = template$2.helpers.totalScore(root.questions, root.totalPoints);
		},

		teardown: function ( detach ) {
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function Feedback ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template$2.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss$2 ) { addCss$2(); }
	
	var mainFragment = renderMainFragment$2( state, this );
	if ( options.target ) { this._mount( options.target ); }
}

function randomQuestion(questions) {
    var filteredQuestions = questions.filter(function (question) {
        return question.points === undefined;
    });
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
}

function addTriesToQuestion(question) {
    if (question.tries === undefined) {
        question.tries = 0;
    }
    
    question.tries += 1;
    return question;
}

function addPointToQuestion(question) {
    var lookup = {1: 3, 2: 2, 3: 1};

    if (question.points === undefined) {
        question.points = 0;
    }

    question.points = lookup[question.tries] || 0;
    return question;
}

function resetQuestions(questions) {
    return questions.map(function (question) {
        return Object.assign({}, question, {
            points: undefined,
            tries: undefined
        });
    });
}

var template = (function () {
    return {
        methods: {
            checkAnswer: function checkAnswer(answer) {
                var question = this.get('question');
                addTriesToQuestion(question);

                if (answer === question.answer) {
                    addPointToQuestion(question);
                    question = randomQuestion(this.get('questions'));
                } 
                this.set({question: question});
            },
            onToNext: function onToNext(prevQuestion) {
                addPointToQuestion(prevQuestion);
                var question = randomQuestion(this.get('questions'));
                this.set({question: question});
            },
            reset: function reset() {
                var questions = resetQuestions(this.get('questions'));
                var question = randomQuestion(questions);
                this.set({questions: questions, question: question});
            }
        },
        data: function data() {
            return {
                question: {},
                questions: {}
            }
        },
        components: {
            Question: Question,
            Feedback: Feedback
        }
    }
}());

var addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            \n    .question-set[svelte-1357081310], [svelte-1357081310] .question-set {\n        margin-top: 20px;\n    }\n    .question__reset[svelte-1357081310], [svelte-1357081310] .question__reset {\n        background-color: #e1f5c4;\n        border: 5px solid #add86d;\n        border-radius: 30%/90%;\n        color: #000;\n        text-align: center;\n        text-transform: capitalize;\n        cursor: pointer;\n        font-size: 1.5rem;\n        padding: 10px;\n        width: 160px;\n        margin: 40px auto;\n        display: block;\n    }\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-1357081310', '' );
	div.className = "question-set";
	
	var ifBlock_anchor = document.createComment( "#if question" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.question ) { return renderIfBlock_0; }
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},

		teardown: function ( detach ) {
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var feedback_initialData = {
		totalPoints: 3,
		questions: root.questions
	};
	var feedback = new template.components.Feedback({
		target: null,
		root: component.root || component,
		data: feedback_initialData
	});
	
	var text = document.createTextNode( "\n        " );
	
	var button = document.createElement( 'button' );
	button.className = "question__reset";
	
	function clickHandler ( event ) {
		component.reset();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	button.appendChild( document.createTextNode( "Play Again" ) );

	return {
		mount: function ( target, anchor ) {
			feedback._mount( target, anchor );
			target.insertBefore( text, anchor );
			target.insertBefore( button, anchor );
		},

		update: function ( changed, root ) {
			var feedback_changes = {};
			
			if ( 'questions' in changed ) { feedback_changes.questions = root.questions; }
			
			if ( Object.keys( feedback_changes ).length ) { feedback.set( feedback_changes ); }
		},

		teardown: function ( detach ) {
			feedback.teardown( detach );
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				text.parentNode.removeChild( text );
				button.parentNode.removeChild( button );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var question_initialData = {
		totalTries: 3,
		question: root.question
	};
	var question = new template.components.Question({
		target: null,
		root: component.root || component,
		data: question_initialData
	});
	
	question.on( 'answer', function ( event ) {
		component.checkAnswer(event.option);
	});
	
	question.on( 'next', function ( event ) {
		component.onToNext(event.question);
	});

	return {
		mount: function ( target, anchor ) {
			question._mount( target, anchor );
		},

		update: function ( changed, root ) {
			var question_changes = {};
			
			if ( 'question' in changed ) { question_changes.question = root.question; }
			
			if ( Object.keys( question_changes ).length ) { question.set( question_changes ); }
		},

		teardown: function ( detach ) {
			question.teardown( detach );
		}
	};
}

function App ( options ) {
	var this$1 = this;

	options = options || {};

	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var this$1 = this;

		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
		
		while ( this.__renderHooks.length ) {
			var hook = this$1.__renderHooks.pop();
			hook.fn.call( hook.context );
		}
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss ) { addCss(); }
	this.__renderHooks = [];
	
	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) { this._mount( options.target ); }
	
	while ( this.__renderHooks.length ) {
		var hook = this$1.__renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

App.prototype = template.methods;

var questions = [
    {
        id: 1,
        question: 'What fruit is this?',
        resource: {
            type: 'image',
            url: 'assets/images/apple.png'
        },
        options: ['apple', 'peach', 'pear', 'orange'],
        answer: 'apple',
        explanation: 'This is an apple'
    },
    {
        id: 2,
        question: 'What shape is this?',
        resource: {
            type: 'image',
            url: 'assets/images/square.png'
        },
        options: ['square', 'triangle', 'circle', 'rectangle'],
        answer: 'square',
        explanation: 'A square is a shape with four sides of equal length'
    },
    {
        id: 3,
        question: 'Is this a letter or number?',
        resource: {
            type: 'image',
            url: 'assets/images/three.png'
        },
        options: ['letter', 'number'],
        answer: 'number',
        explanation: 'This is the number 3'
    },
    {
        id: 4,
        question: 'How many letters are in the alphabet?',
        resource: {
            type: 'image',
            url: 'assets/images/alphabet.png'
        },
        options: ['10', '12', '18', '26'],
        answer: '26',
        explanation: 'There are 26 letters in the english alphabet'
    },
    {
        id: 5,
        question: 'What Shape is this?',
        resource: {
            type: 'image',
            url: 'assets/images/triangle.png'
        },
        options: ['square', 'triangle', 'rectangle', 'circle'],
        answer: 'triangle',
        explanation: 'A triangle is a shape that has 3 sides'
    }
];

var question = randomQuestion(questions);

var app = new App({
    target: document.getElementById('app'),
    data: {
        questions: questions,
        question: question
    }
});
