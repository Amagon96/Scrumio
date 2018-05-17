module.exports = {

	'facebookAuth' : {
		'clientID' 		: '7690307781021090', // your App ID
		'clientSecret' 	: '4c471b33d8a197842f775a54cd53e125', // your App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '376816420199-bpct7fb1jl03f4e6gvr4hvhsgfkf4ugq.apps.googleusercontent.com',
		'clientSecret' 	: 'vJjKZ6do1P9PJ-U2a_IlQwYn',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

}
