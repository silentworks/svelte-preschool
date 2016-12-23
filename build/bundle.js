var template$1 = (function () {
    let animations = [
        'zoomIn','flipInY',
        'fadeIn','bounceIn',
        'flipInX','lightSpeedIn'
    ];

    let randomAnimation  = () => animations[Math.floor(Math.random() * animations.length)];

    return {
        onrender() {
            this.observe('question', (newV, oldV) => {
                if (oldV !== newV) {
                    this.set({animation: randomAnimation()});
                }
            });
        },
        data() {
            return {
                animation: randomAnimation()
            }
        }
    }
}());

let addedCss$1 = false;
function addCss$1 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        \n.question__heading[svelte-3512586432], [svelte-3512586432] .question__heading {\n    font-size: 3.5rem;\n    padding: 20px;\n    text-align: center;\n}\n.question__image[svelte-3512586432], [svelte-3512586432] .question__image {\n    display: block;\n    height: 300px;\n    width: auto;\n    margin: 40px auto;\n}\n\n.question__option-item[svelte-3512586432], [svelte-3512586432] .question__option-item {\n    width: 43%;\n    margin: 2%;\n    font-size : 2.5rem;\n    padding: 10px;\n    display: inline-block;\n    float: left;\n\n    border: 5px solid #e1f5c4;\n    border-radius: 30%/90%;\n    text-align: center;\n    text-transform: lowercase;\n    cursor: pointer;\n    transition: box-shadow 0.5s, background-color 0.5s;\n}\n.question__option-item[svelte-3512586432]:hover, [svelte-3512586432] .question__option-item:hover {\n    animation: pulse 1s infinite;\n    box-shadow: 0 3px 1px 1px rgba(0,0,0,0.2);\n    background-color: #e1f5c4;\n}\n";
	document.head.appendChild( style );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-3512586432', '' );
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
	ul.className = "question__otpion-list no-bullet clearfix";
	
	div.appendChild( ul );
	var eachBlock_anchor = document.createComment( "#each question.options" );
	ul.appendChild( eachBlock_anchor );
	
	var eachBlock_value = root.question.options;
	var eachBlock_iterations = [];
	
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

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
		},

		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, option, option__index, component ) {
	var li = document.createElement( 'li' );
	li.className = "question__option-item";
	
	function clickHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, option__index = this.__svelte.option__index, option = eachBlock_value[option__index];
		
		component.fire( "checkAnswer", { option });
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

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
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
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
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

	if ( !addedCss$1 ) addCss$1();
	
	var mainFragment = renderMainFragment$1( state, this );
	if ( options.target ) this._mount( options.target );
	
	if ( options.root ) {
		options.root.__renderHooks.push({ fn: template$1.onrender, context: this });
	} else {
		template$1.onrender.call( this );
	}
}

var template$2 = (function () {
    return {
        helpers: {
            userScore(questions) {
                return questions.reduce((prev, next) => {
                    return prev + next.points
                }, 0);
            },
            totalScore(questions, totalPoints) {
                return questions.length * totalPoints;
            }
        },
        data() {
            return {
                totalPoints: 3
            }
        }
    }
}());

let addedCss$2 = false;
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
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
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
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
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

	if ( !addedCss$2 ) addCss$2();
	
	var mainFragment = renderMainFragment$2( state, this );
	if ( options.target ) this._mount( options.target );
}

function randomQuestion(questions) {
    let filteredQuestions = questions.filter((question) => {
        return !question.points;
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
    let lookup = {1: 3, 2: 2, 3: 1};

    if (question.points === undefined) {
        question.points = 0;
    }

    question.points = lookup[question.tries] || 0;
    return question;
}

let questions = [
    {
        id: 1,
        question: 'What fruit is this?',
        resource: {
            type: 'image',
            url: 'build/images/apple.png'
        },
        options: ['apple', 'peach', 'pear', 'orange'],
        answer: 'apple'
    },
    {
        id: 2,
        question: 'What shape is this?',
        resource: {
            type: 'image',
            url: 'build/images/square.png'
        },
        options: ['square', 'triangle', 'circle', 'rectangle'],
        answer: 'square'
    },
    {
        id: 3,
        question: 'Is this a letter or number?',
        resource: {
            type: 'image',
            url: 'build/images/three.png'
        },
        options: ['letter', 'number'],
        answer: 'number'
    },
    {
        id: 4,
        question: 'How many letters are in the alphabet?',
        resource: {
            type: 'image',
            url: 'build/images/alphabet.png'
        },
        options: ['10', '12', '18', '26'],
        answer: '26'
    },
    {
        id: 5,
        question: 'What Shape is this?',
        resource: {
            type: 'image',
            url: 'build/images/triangle.png'
        },
        options: ['square', 'triangle', 'rectangle', 'circle'],
        answer: 'triangle'
    }
];

var template = (function () {
    let question = randomQuestion(questions);

    return {
        methods: {
            checkAnswer(answer) {
                let currentQuestion = this.get('question');
                addTriesToQuestion(currentQuestion);

                if (answer === currentQuestion.answer) {
                    addPointToQuestion(currentQuestion);
                    let question = randomQuestion(this.get('questions'));
                    this.set({question});
                } 
            }
        },
        data() {
            return {
                question,
                questions
            }
        },
        components: {
            Question,
            Feedback
        }
    }
}());

let addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n    .question-set[svelte-3517069181], [svelte-3517069181] .question-set {\n        margin-top: 20px;\n    }\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-3517069181', '' );
	div.className = "question-set";
	
	var ifBlock_anchor = document.createComment( "#if question" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.question ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );

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
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},

		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( false );
			
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

	return {
		mount: function ( target, anchor ) {
			feedback._mount( target, anchor );
		},

		update: function ( changed, root ) {
			var feedback_changes = {};
			
			if ( 'questions' in changed ) feedback_changes.questions = root.questions;
			
			if ( Object.keys( feedback_changes ).length ) feedback.set( feedback_changes );
		},

		teardown: function ( detach ) {
			feedback.teardown( detach );
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var question_initialData = {
		question: root.question
	};
	var question = new template.components.Question({
		target: null,
		root: component.root || component,
		data: question_initialData
	});
	
	question.on( 'checkAnswer', function ( event ) {
		component.checkAnswer(event.option);
	});

	return {
		mount: function ( target, anchor ) {
			question._mount( target, anchor );
		},

		update: function ( changed, root ) {
			var question_changes = {};
			
			if ( 'question' in changed ) question_changes.question = root.question;
			
			if ( Object.keys( question_changes ).length ) question.set( question_changes );
		},

		teardown: function ( detach ) {
			question.teardown( detach );
		}
	};
}

function App ( options ) {
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
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
		
		while ( this.__renderHooks.length ) {
			var hook = this.__renderHooks.pop();
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
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
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

	if ( !addedCss ) addCss();
	this.__renderHooks = [];
	
	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) this._mount( options.target );
	
	while ( this.__renderHooks.length ) {
		var hook = this.__renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

App.prototype = template.methods;

const app = new App({
    target: document.getElementById('app')
});
