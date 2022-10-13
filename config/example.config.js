import axios from 'axios';

// Your API key goes here!
var GIT_KEY = 'GIT_KEY_GOES_HERE';
var CAMPUS_CODE = 'CAMPUS_CODE_GOES_HERE';

axios.defaults.headers.common['Authorization'] = GIT_KEY;


var URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/' + CAMPUS_CODE;

export { URL };
