var countries = require('../data/countries');
var cities = require('../data/cities');

var SPECIAL_CHARS = "\\u200B|[\\u2190-\\u21FF]|[\\u2300-\\u23FF]|[\\u2600-\\u27BF]|[\\u2B00-\\u2BFF]|[\\uFE00-\\uFE0F]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]";
var SPECIAL_CHARS_REG = RegExp("(" + SPECIAL_CHARS + ")+", "g");
var SEPARATORS = "[\\s,\\.\\+\\*\\?\\[\\]\\^\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-\\d\\/@#~&_;'\"%®ⓥ•｜\\\\]|[\\u4e00-\\u9faf]|[\\uff00-\\uffef]|[\\u3000-\\u30ff]";

function strToReg(str) {
	if(typeof str === 'undefined' || str === null || str.length == 0){return null;}
	
	str = str.replace(/\[&\]/gi, " (&|and|und) ");
	str = str.replace(/[\s-']+/gi, "(" + SEPARATORS + ")?");
	str = str.replace(/\[[aáâãäåàāă]\]/gi, "[aáâãäåàāă]");
	str = str.replace(/\[[eéêëěèēĕėę]\]/gi, "[eéêëěèēĕėę]");
	str = str.replace(/\[[iíîïìĩīĭįıįİ]\]/gi, "[iíîïìĩīĭįıįİ]");
	str = str.replace(/\[[yýÿŷ]\]/gi, "[yýÿŷ]");
	str = str.replace(/\[[oóôõöòōŏő]\]/gi, "[oóôõöòōŏő]");
	str = str.replace(/\[[uúûüùũūŭůű]\]/gi, "[uúûüùũūŭůű]");
	str = str.replace(/\[[cćĉċč]\]/gi, "[cćĉċč]");
	str = str.replace(/\[[dďđ]\]/gi, "[dďđ]");
	str = str.replace(/\[[gĝğġģ]\]/gi, "[gĝğġģ]");
	str = str.replace(/\[[lĺłŀľ]\]/gi, "[lĺłŀľ]");
	str = str.replace(/\[[rŕř]\]/gi, "[rŕř]");
	str = str.replace(/\[[sśŝşšș]\]/gi, "[sśŝşšș]");
	str = str.replace(/\[[tţťŧ]\]/gi, "[tţťŧ]");
	str = str.replace(/\[[zźżž]\]/gi, "[zźżž]");
	str = str.replace(/\[[nñňńņŉ]\]/gi, "[nñňńņŉ]");

	return str;
}

function processCSV(rows) {
	rows = rows.map(function(c){
		var options = c.string_match.split(/,(?=\D)/g);
		options = options.map(function(option){return strToReg(option.trim());});
		options = options.filter(function(option){return option !== null;});
		if(options.length > 0){
			c.string_match = RegExp("(?:^|" + SEPARATORS + ")(" + options.join('|') + ")(?=" + SEPARATORS + "|$)", "ig");
		}
		else{
			c.string_match = null
		}
		
		return c;
	});
	
	return rows;
}

function loadCoutries(){
	return processCSV(countries);
}

function loadCities(){
	return processCSV(cities);
}

function cleanFromSpecials(str) {
	str = str.replace(SPECIAL_CHARS_REG, " ");
	str = str.trim();
	return str;
}

module.exports.loadCoutries = loadCoutries;
module.exports.loadCities = loadCities;
module.exports.cleanFromSpecials = cleanFromSpecials;