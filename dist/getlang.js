(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.getlang = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint no-constant-condition: 0 */
const franc = require('franc-min');
const iso6393 = require('iso-639-3');

function stripTags(input, allowed) {
  // Making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	allowed = ((String(allowed || '')).toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

	let before = input;
	let after = input;
  // Recursively remove tags to ensure that the returned string doesn't contain forbidden tags after previous passes (e.g. '<<bait/>switch/>')
	while (true) {
		before = after;
		after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});

    // Return once no more tags are removed
		if (before === after) {
			return after;
		}
	}
}

module.exports = function (toot) {
	toot = stripTags(toot.toString()
	.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''));

  // Lang = ISO6391
	let lang = '';

  // Longer is better, like my *
	while (toot.length < 10) {
		toot += ' ' + toot;
	}

	const langISO6393 = franc(toot);

	try {
		if (langISO6393 === 'cmn') {
			lang = 'zh-CN'; // Mandarin detected -> chinese ISO 639-1
		} else {
			iso6393.forEach(language => {
				if (language.iso6393 === langISO6393) {
					lang = language.iso6391;
				}
			});
		}

		return lang;
	} catch (err) {
		return err;
	}
};

},{"franc-min":5,"iso-639-3":6}],2:[function(require,module,exports){
'use strict';

module.exports = collapse;

/* collapse(' \t\nbar \nbaz\t'); // ' bar baz ' */
function collapse(value) {
  return String(value).replace(/\s+/g, ' ');
}

},{}],3:[function(require,module,exports){
module.exports={
  "Latin": {
    "spa": " de|os |de | la|la | y | a |es |ón |ión|rec|ere|der| co|e l|el |en |ien|cho|ent|ech|ció|aci|o a|a p| el|a l|al |as |e d| en|na |ona|s d|da |nte| to|ad |ene|con| pr| su|tod| se|ho |los| pe|per|ers| lo|o d| ti|cia|n d|cio| es|ida|res|a t|tie|ion|rso|te |do | in|son| re| li|to |dad|tad|e s|est|pro|que|men| po|a e|oda|nci| qu| un|ue |ne |n e|s y|lib|su | na|s e|nac|ia |e e|tra| pa|or |ado|a d|nes|ra |se |ual|a c|er |por|com|nal|rta|a s|ber| o |one|s p|dos|rá |sta|les|des|ibe|ser|era|ar |ert|ter| di|ale|l d|nto|hos|del|ica|a a|s n|n c|oci|imi|io |o e|re |y l|e c|ant|cci| as|las|par|ame| cu|ici|ara|enc|s t|ndi| so|o s|mie|tos|una|bre|dic|cla|s l|e a|l p|pre|ntr|o t|ial|y a|nid|n p|a y|man|omo|so |n l| al|ali|s a|no | ig|s s|e p|nta|uma|ten|gua|ade|y e|soc|mo | fu|igu|o p|n t|hum|d d|ran|ria|y d|ada|tiv|l e|cas| ca|vid|l t|s c|ido|das|dis|s i| hu|s o|nad|fun| ma|rac|nda|eli|sar|und| ac|uni|mbr|a u|die|e i|qui|a i| ha|lar| tr|odo|ca |tic|o y|cti|lid|ori|ndo|ari| me|ta |ind|esa|cua|un |ier|tal|esp|seg|ele|ons|ito|ont|iva|s h|d y|nos|ist|rse| le|cie|ide|edi|ecc|ios|l m|r e|med|tor|sti|n a|rim|uie|ple|tri|ibr|sus|lo |ect|pen|y c|an |e h|n s|ern|tar|l y|egu|gur|ura|int|ond|mat|l r|r a|isf|ote",
    "eng": " th|the| an|he |nd |and|ion| of|of |tio| to|to |on | in|al |ati|igh|ght|rig| ri|or |ent|as |ed |is |ll |in | be|e r|ne |one|ver|all|s t|eve|t t| fr|s a| ha| re|ty |ery| or|d t| pr|ht | co| ev|e h|e a|ng |ts |his|ing|be |yon| sh|ce |ree|fre|ryo|n t|her|men|nat|sha|pro|nal|y a|has|es |for| hi|hal|f t|n a|n o|nt | pe|s o| fo|d i|nce|er |ons|res|e s|ect|ity|ly |l b|ry |e e|ers|e i|an |e o| de|cti|dom|edo|eed|hts|ter|ona|re | no| wh| a | un|d f| as|ny |l a|e p|ere| en| na| wi|nit|nte|d a|any|ted| di|ns |sta|th |per|ith|e t|st |e c|y t|om |soc| ar|ch |t o|d o|nti|s e|equ|ve |oci|man| fu|ote|oth|ess| al| ac|wit|ial| ma|uni| se|rea| so| on|lit|int|r t|y o|enc|thi|ual|t a| eq|tat|qua|ive| st|ali|e w|l o|are|f h|con|te |led| is|und|cia|e f|le | la|y i|uma|by | by|hum|f a|ic | hu|ave|ge |r a| wo|o a|ms |com| me|eas|s d|tec| li|n e|en |rat|tit|ple|whe|ate|o t|s r|t f|rot| ch|cie|dis|age|ary|o o|anc|eli|no | fa| su|son|inc|at |nda|hou|wor|t i|nde|rom|oms| ot|g t|eme|tle|iti|gni|s w|itl|duc|d w|whi|act|hic|aw |law| he|ich|min|imi|ort|o s|se |e b|ntr|tra|edu|oun|tan|e d|nst|l p|d n|ld |nta|s i|ble|n p| pu|n s| at|ily|rth|tho|ful|ssi|der|o e|cat|uca|unt|ien| ed|o p|h a|era|ind|pen|sec|n w|omm|r s",
    "por": "os |de | de| a | e |o d|to |ão | di|ent|da |ito|em | co|eit|as |dir|es |ire|rei| se|ção|ade|a p|dad|e d|s d|men|nte|do |s e| pr| pe|dos| to| da|a a|o e| o |o a|ess|con|tod|que| qu|te |e a| do|al |res|ida|m d| in| ou|er |sso| na| re| po|a s| li|uma|cia|ar |pro|e e|a d| te|açã|a t| es| su|ou |ue |s p|tos|a e|des|ra |com|no |ame|ia |e p|tem|nto| pa|is |est|tra|ões|na |s o|oda|das|ser|soa|s n|pes|o p|s a|o s|e o| em| as| à |o o|ais|ber|ado|oa |o t|e s|man|sua|ua | no| os|a c|ter|çõe|erd|lib|rda|s s|nci|ibe|e n|ica|odo|so |nal|ntr|s t|hum|ura| ao|ona|ual| so|or |ma |sta|o c|a n|pre|ara|era|ons|e t|r a|par|o à| hu|ind|por|cio|ria|m a|s c| um|a l|gua|ran| en|ndi|o i|e c|raç|ion|nid|aci|ano|soc|e r|oci| ac|und|sen|nos|nsi|rec|ime|ali|int|um |per|nac| al|m o|r p| fu|ndo|ont|açõ| ig|igu|fun|nta| ma|uni|cçã|ere| ex|a i| me|ese|rio|l d|a o|s h|pel|ada|pri|ide|am |m p|pod|s f|ém |a f|io |ode|ca |ita|lid|tiv|e f|vid|r e|esp|nda|omo|e l|naç|o r|ant|a q|tad|lic|iva| fa|ver|s l|ial|cla|ngu|ing| ca|mo |der| vi|eli|ist|ta |se |ati|ios|ido|r o|eci|dis| un|e i|r d|ecç|o q|s i|qua|ênc|a m|seu|sti|nin|uer|rar|cas|aos|ens|gué|ias|sid|uém|tur|dam|sse|ao |ela|l e|for|tec|ote| pl|ena| tr|m c|tro| ni|ico|rot",
    "ind": "an |ang| da|ng | pe|ak | ke| me|ata| se|dan|kan| di| be|hak|ber|per|ran|nga|yan|eng| ya| ha|asa|gan|men|ara|nya|n p|n d|n k|a d|tan| at|at |ora|ala|san| ba|ap |erh|n b|rha|ya | ma|g b|a s|pen|eba|as |aan|uk |ntu| or|eti|tas|aka|tia|ban|set| un|n s|ter|n y| te|k m|tuk|bas|iap|lam|beb|am | de|k a|keb|n m|i d|unt|ama|dal|ah |ika|dak|ebe|p o|sa |pun|mem|n h|end|den|ra |ela|ri |nda| sa|di |ma |a m|n t|k d|n a|ngg|tau|man|gar|eri|asi| ti|un |al |ada|um |a p|lak|ari|au | ne|neg|a b|ngs|ta |ole|leh|ert|ers|ida|k h|ana|gsa|dar|uka|tid|bat|sia|era|eh |dap|ila|dil|h d|atu|sam|ia |i m| in|lan|aha|uan|tu |ai |t d|a a|g d|har|sem|na |apa|ser|ena|kat|uat|erb|erl|mas|rta|ega|ung|nan|emp|n u|kum|l d|g s| hu|ka |ent|pat|mba|aga|nta|adi| su|eni|uku|n i|huk|ind|ar |rga|i s|aku|ndi|sua|ni |rus|han|si |car|nny| la|in |u d|ik |ua |lah|rik|usi|emb|ann|mer|ian|gga|lai|min|a u|lua|ema|emu|arg|dun|dip|a t|mat|aya|rbu|aru|erk|rka|ini|eka|a k|rak|kes|yat|iba|nas|rma|ern|ese|s p|nus| pu|anu|ina| ta|mel|mua|kel|k s|us |ndu|nak|da |sya|das|pem|lin|ut |yar|ami|upu|seo|aik|eor|iny|aup|tak|ipe|ing|tin| an|dik|uar|ili|g t|rse|sar|ant|g p|a n|aks|ain| ja|t p| um|g m|dir|ksa|umu|kep|mum|i k|eca|rat|m p|h p|aba|ses|m m",
    "fra": " de|es |de |ion|nt |et |tio| et|ent| la|la |e d|on |ne |oit|e l|le | le|s d|e p|t d|ati|roi| dr|dro|it | à | co|té |ns |te |e s|men|re | to|con| l’|tou|que| qu|les| so|des|son| pe|ons| un|s l|s e| pr|ue | pa|e c|t l|ts |onn| au|e a|eme|e e| li|ont|ant|out|ute|t à|res|ers| sa|ce | a |tre|per|a d|cti|er |lib|ité| en|ux | re|en |rso|à l| ou| in|lle|un |nat|ou |nne|n d|une| d’| se|par|nte|us |ur |s s|ans|dan|a p|r l|pro|its|és |t p|ire|e t|s p|sa | dé|ond|é d|a l|nce|ert|aux|omm|nal|me | na| fo|iqu| ce|rté|ect|ale|ber|t a|s a| da|mme|ibe|san|e r| po|com|al |s c|qui|our|t e| ne|e n|ous|r d|ali|ter| di|fon|e o|au | ch|air|ui |ell| es|lit|s n|iss|éra|tes|soc|aut|oci|êtr|ien|int|du |est|été|tra|pou| pl|rat|ar |ran|rai|s o|ona|ain|cla|éga|anc|rs |eur|pri|n c|e m|s t|à u| do|ure|bre|ut | êt|age| ét|nsi|sur|ein|sen|ser|ndi|ens|ess|ntr|ir | ma|cia|n p|st |a c| du|l e| su|bli|ge |rés| ré|e q|ass|nda|peu|ée |l’a| te|a s|tat|il |tés|ais|u d|ine|ind|é e|qu’| ac|s i|n t|t c|n a|l’h|t q|soi|t s|cun|rit| ég|oir|’en|nta|hom| on|n e| mo|ie |ign|rel|nna|t i|l n| tr|ill|ple|s é|l’e|rec|a r|ote|sse|uni|idé|ive|s u|t ê|ins|act| fa|n s| vi|gal| as|lig|ssa|pré|leu|e f|lic|dis|ver| nu|ten|ssi|rot|tec|s m|abl",
    "deu": "en |er |der| un|nd |und|ein|ung|cht| de|ich|sch|ng | ge|ie |che|ech| di|die|rec|gen|ine|eit| re|ch | da|n d|ver|hen| zu|t d| au|ht | ha|lic|it |ten|rei| be|in | ve| in| ei|nde|auf|den|ede|zu |n s|uf |fre|ne |ter|es | je|jed|n u| an|sei|and| fr|run|at | se|e u|das|hei|s r|hte|hat|nsc|nge|r h|as |ens| al|ere|lle|t a| we|n g|rde|nte|ese|men| od|ode|ner|g d|all|t u|ers|te |nen| so|d d|n a|ben|lei| gr| vo|wer|e a|ege|ion| st|ige|le |cha| me|haf|aft|n j|ren| er|erk|ent|bei| si|eih|ihe|kei|erd|tig|n i|on |lun|r d|len|gem|ies|gru|tli|unt|chu|ern|ges|end|e s|ft |st |ist|tio|ati| gl|sta|gun|mit|sen|n n| na|n z|ite| wi|r g|eic|e e|ei |lie|r s|n w|gle|mei|de |uch|em |chl|nat|rch|t w|des|n e|hre|ale|spr|d f|ach|sse|r e| sc|urc|r m|nie|e f|fen|e g|e d| ni|dur|dar|int| du|geh|ied|t s| mi|alt|her|hab|f g|sic|ste|taa|aat|he |ang|ruc|hli|tz |eme|abe|h a|n v|nun|geg|arf|rf |ehe|pru| is|erf|e m|ans|ndl|e b|tun|n o|d g|n r|r v|wie|ber|r a|arb|bes|t i|h d|r w|r b| ih|d s|igk|gke|nsp|dig|ema|ell|eru|n f|ins|rbe|ffe|esc|igu|ger|str|ken|e v|gew|han|ind|rt | ar|ieß|n h|rn |man|r i|hut|utz|d a|ls |ebe|von|lte|r o|rli|etz|tra|aus|det|hul|e i|one|nne|isc|son|sel|et |ohn|t g|sam| fa|rst|rkl|ser|iem|g v|t z|err",
    "jav": "ng |an |ang| ka|ing|kan| sa|ak |lan| la|hak| ha| pa| ma|ngg|ara|sa |abe|ne | in|n k|ant| ng|tan|nin| an|nga|ata|en |ran| ba|man|ban|ane|hi |n u|ong|ra |nth|ake|ke |thi| da|won|uwo|ung|ngs| uw|asa|gsa|ben|sab|ana|aka|beb|a k|g p|nan|nda|adi|at |awa|san|ni |dan|g k|pan|eba| be|e k|g s|ani|bas| pr|dha|aya|gan|ya |wa |di |mar|n s| wa|ta |a s|g u| na|e h|arb|a n|a b|a l|n n| ut|yan|n p|asi|g d|han|ah |g n| tu| um|as |wen|dak|rbe|dar| di|ggo|sar|mat|k h|a a|iya| un|und|eni|kab|be |art|ka |uma|ora|n b|ala|n m|ngk|rta|i h| or|gar|yat|kar|al |a m|n i|na |g b|ega|pra|ina|kak|g a|a p|tum|nya|kal|ger|gge| ta|kat|i k|ena|oni|kas| pe|dad|aga|g m|duw|k k|uta|uwe| si| ne|adh|pa |n a|go |and|i l| ke|nun|nal|ngu|uju|apa|a d|t m|i p|min|iba|er | li|anu|sak|per|ama|gay|war|pad|ggu|ha |ind|taw|ras|n l|ali|eng|awi|a u| bi|we |bad|ndu|uwa|awe|bak|ase|eh | me|neg|pri| ku|ron|ih |g t|bis|iji|i t|e p| pi|aba|isa|mba|ini|a w|g l|ika|n t|ebu|ndh|ar |sin|lak|ur |mra|men|ku | we|e s|a i|liy| ik|ayo|rib|ngl|ami|arg|nas|yom|wae|ut |kon|ae |rap|aku| te|dil|tin|rga|jud|umu| as|rak|bed|k b|il |kap|h k|jin|k a| nd|e d|i s| lu|i w|eka|mum|um |uha|ate| mi|k p|gon|eda| ti|but|n d|r k|ona|uto|tow|wat|gka|si |umr|k l|oma",
    "vie": "ng |̣c |́c | qu| th|à |nh | ng|̣i | nh|và| va|̀n |uyê| ph| ca|quy|ền|yề|̀i | ch|̀nh| tr| cu|ngư|i n|gươ|ườ|́t |ời| gi|ác| co|̣t |ó |c t|ự |n t|cá|ông| kh|ượ|ợc| tư| đư|iệ|đươ|ìn|́i | ha|có|i đ|gia| đê|pha| mo|ọi|mọ|như|n n|củ| ba|̣n |̉a |ủa|n c|̀u |̃ng|ân |ều|ất| bi|tự|hôn| vi|g t| la|n đ|đề|nhâ| ti|t c| đô|ên |bả|hiê|u c| tô|do |hân| do|ch |́ q|̀ t| na|́n |ay | hi|àn|̣ d|ới|há| đi|hay|g n| mô|ốc|uố|n v|ội|hữ|thư|́p |quô| ho|̣p |nà|ào|̀ng|̉n |ị |́ch|ôn |̀o |khô|c h|i c|c đ| hô|i v|tro| đa|́ng|mộ|i t|ột|g v|ia |̣ng|ản|ướ|ữn|̉ng|h t|hư |ện|n b|ộc|ả |là|c c|g c| đo|̉ c|n h|hà|hộ| bâ|ã |̀y | vơ|̣ t|̉i |iế| cô|t t|g đ|ức|iên| vê|viê|vớ|h v|ớc|ực|ật|tha|̉m |ron|ong|áp|g b|hươ| sư|a c|sự|̉o |ảo|h c|ể |o v|uậ|a m|ế |iá|̀ c|cho|qua|hạ|ục| mi|̀ n|phâ|c q|côn|o c|á |i h|ại| hơ|̃ h| cư|n l|bị| lu|bấ|cả|ín|h đ| xa|độ|g h|c n|c p|thu|ải|ệ | hư|́ c|o n| nư|ốn|́o |áo|xã|oà|y t|hả|tộ|̣ c| tâ|thô| du|m v|mì|ho |hứ|ệc|́ t|hợ|án|n p|cũ|ũn|iể|ối|tiê|ề |hấ|ợp|hoa|y đ|chi|o h|ở |ày|̉ t|đó|c l|về|̀ đ|i b|kha|c b| đâ|luâ|ai |̉ n|đố|ết|hự|tri|p q|nươ|dụ|hí|g q|yên|họ|́nh| ta| bă|c g|n g|thê|o t|c v|am |c m|an ",
    "ita": " di|to | de|ion| in|la |e d|di |ne | e |zio|re |le |ni |ell|one|lla|rit|a d|o d|del|itt|iri|dir| co|ti |ess|ent| al|azi|tto|te |i d|i i|ere|tà | pr|ndi|e l|ale|o a|ind|e e|e i|gni|nte|con|i e|li |a s| un|men|ogn| ne|uo | og|idu|e a|ivi|duo|vid| es|tti| ha|div| li|a p|no |all|pro|za |ato|per|sse|ser| so|i s| la| su|e p| pe|ibe|na |a l| il|ber|e n|il |ali|lib|ha |che|in |o s|e s| qu|o e|ia |e c| ri|nza|ta |nto|he |oni|o i| o |sta|o c|nel| a |o p|naz|e o|so | po|o h|gli|i u|ond|i c|ers|ame|i p|lle|un |era|ri |ver|ro |el |una|a c| ch|ert|ua |i a|ssi|rtà|a e|ei |dis|ant| l |tat|a a|ona|ual| le|ità|are|ter| ad|nit| da|pri|dei|à e|cia| st| si|nal|est|tut|ist|com|uni| ed|ono| na|sua|al |si |anz| pa| re|raz|gua|ita|res|der|soc|man|o o|ad |i o|ese|que|enz|ed | se|io |ett|on | tu|dic|à d|sia|i r|rso|oci|rio|ari|qua|ial|pre|ich|rat|ien|tra|ani|uma|se |ll |eri|a n|o n| um|do |ara|a t|zza|er |tri|att|ico|pos|sci|i l|son|nda|par|e u|fon| fo|nti|uzi|str|utt|ati|sen|int|nes|iar| i |hia|n c|sti|chi|ann|ra | eg|egu|isp|bil|ont|a r| no|rop| me|opr|ost| ma|ues|ica|sso|tal|cie|sun|lit|ore|ina|ite|tan| ra|non|gio|d a|e r|dev|i m|l i|ezz|izi| cu|nno|rà |a i|tta|ria|lia|cos|ssu|dal|l p| as|ass|opo|ve |eve",
    "tur": " ve| ha|ve |ler|lar|ir |in |hak| he|her|bir|er |an |arı|eri|ya | bi|ak |r h|eti|ın |iye|yet| ka|ası|ını| ol|tle|eya|kkı|ara|akk|etl|sın|esi|na |de |ek | ta|nda|ini| bu|ile|rın|rin|vey|ne |kla|e h|ine|ır |ere|ama|dır|n h| sa|ına|sin|e k|le | ge|mas|ınd|nın|ı v| va|lan|lma|erk|rke|nma|tin|rle| te|nin|akl|a v|da | de|let|ill|e m|ard|en |riy|aya|nı | hü| şa|e b|k v|kın|k h| me|mil|san| il|si |rdı|e d|dan|hür|var|ana|e a|kes|et |mes|şah|dir| mi|ret|rri| se|ola|ürr|irl|bu |mak| ma|mek|n e|kı |n v|n i|lik|lle| ed| hi|n b|a h| ba|nsa| iş|eli|kar| iç|ı h|ala|li |ulu|rak|evl|e i|ni |re |r ş|eme|etm|e t|ik |e s|a b|iş |n k|hai|nde|aiz| eş|izd|un |olm|hiç|zdi|ar |unm|ma | gö|ilm|lme|im |n t|tir|dil|mal|e g|i v| ko|lun|e e|mel|ket|ık |n s|ele|la |el |r v|ede|şit|ili|eşi|yla|a i| an|anı| et|rı |ahs| ya|sı |edi|siy|t v|i b|se |içi|çin|bul|ame| da|miş|may|tim|a k|tme|r b|ins|yan|nla|mle| di|eye|ger|ye |uğu|erd|din|ser| mü|mem|vle| ke|nam|ind|len|eke|es | ki|n m|it | in| ku|rşı|a s|arş| ay|eml|lek|oru|rme|kor|rde|i m| so|tür|al |lam|eni|nun| uy|ken|hsı|i i|a d|ri |dev|ün |a m|r a|mey|cak|ıyl|maz|e v|ece|ade|iç |şma|mse|te |tün|ims|kim|e y|şı |end|k g|ndi|alı| ce|lem|öğr|ütü|k i|r t| öğ|büt|anl| bü",
    "pol": " pr|nie| i |ie |pra| po|ani|raw|ia |nia|wie|go | do|ch |ego|iek|owi| ni|ści|ci |a p|do |awo| cz|ośc|ych| ma|ek |rze| na|prz| w |wo |ej | za|noś|czł|zło|eni|wa | je|łow|i p|wol|oln| lu|rod| ka| wo|lno|wsz|y c|ma |ny |każ|ażd|o d|stw|owa|dy |żdy| wy|rzy|sta|ecz| sw|dzi|i w|e p|czn|twa|na |zys|ów |szy|ub |lub|a w|est|kie|k m|wan| sp|ają| ws|e w|pow|pos|nyc|rac|spo|ać |a i|cze|sze|neg|yst|jak| ja|o p|pod|acj|ne |ńst|aro|mi | z |i i|nar| ko|obo|awa| ro|i n|jąc|zec|zne|zan|dow| ró|iej|zy |zen|nic|ony|aw |i z|czy|no |nej|o s|rów|odn|cy |ówn|odz|o w|o z|jeg|edn|o o|aki|mie|ien|kol| in|zie|bez|ami|eńs|owo|dno| ob| or| st|a s|ni |orz|o u|ym |stę|tęp|łec|jed|i k| os|w c|lwi|ez |olw|ołe|poł|cji|y w|o n|wia| be|któ|a j|zna|zyn|owe|wob|ka |wyc|owy|ji | od|aln|inn|jes|icz|h p|i s|się|a o|ją |ost|kra|st |sza|swo|war|cza|roz|y s|raz|nik|ara|ora|lud|i o|a z|zes| kr|ran|ows|ech|w p|dów|ą p|pop|a n|tki|stk|gan|zon|raj|e o|iec|i l| si|że |eka| kt| de|em |tór|ię |wni|lni|ejs|ini|odo|dni|ełn|kow|peł|a d|ron|dek|pie|udz|bod|nan|h i|dst|ieg|taw|z p|z w|zeń|god|iu |ano|lar| to|y z|a k|ale|kla|trz|zaw|ich|e i|ier|iko|dzy|chn|w z|by |ków|adz|ekl|ywa|ju |och|kor|sob|ocz|oso|u p|du |tyc|tan|ędz| mi|e s| ta|ki ",
    "gax": "aa |an |uu | ka|ni |aan|umm|ii |mma|maa| wa|ti |nam| fi|ta |tti| na|saa|fi | mi|rga|i k|a n| qa|dha|iyy|oot|in |mir|irg|raa|qab|a i|a k|kan|akk|isa|chu|amu|a f|huu|aba|kka| ta|kam|a a| is|amn|ami|att|ach|mni|yaa| bi|yuu|yyu|ee |wal|miy|waa|ga |ata|aat|tii|oo |a e|moo| ni| ee|ba | ak|ota|a h|i q| ga| dh|daa|haa|a m|ama|yoo|a b|i a|ka |kaa| hi|sum|aas|arg|man| hu| uu|u n| yo| ar| ke| ha|ees| ba|uf |i i|taa|uuf|iin|ada|a w|i f|ani|rra|na |isu| ad|i w|a u|nya|irr|da |hun|hin|ess| ho| ma|i m|und|i b|bar|ana|een|mu |is |bu |f m| ir| sa|u a|add|aad| la|i d|n h|eeg|i h|sa |hoj|abu| ya|kee|al |udh|ook|goo|ala|ira|nda|itt|gac|as |n k|mum|see|rgo|uum|ra |n t|n i|ara|muu|ums|mat|nii|sii|ssa|a d|a q| da|haw|a g|yya|asu|eef|u h|tum|biy| mo|a t|ati|eny|gam|abs|awa|roo|uma|n b|n m|u y|a s|sat|baa|gar|n a|mmo|nis| qo|nna| ku|eer| to|kko|bil|ili|lis|bir|otu|tee|ya |msa|aaf|suu|n d|jii|n w|okk|rka|gaa|ald|un |rum| ye|ame| fu|mee|yer|ero|amm|era|kun|i y|oti|tok|ant|ali|nni| am|lda|lii|n u|lee|ura|lab|aal|tan|laa|i g|ila|ddu|aru|u m|oji|gum|han|ega| se|ffa|dar|faa|ark|n y|hii|qix|gal|ndi| qi|asa|art|ef |uud| bu|jir| ji|arb|n g|chi|tam|u b|dda|bat|di |kar|lam|a l| go|bsi|sad|oka|a j|egu|u t|bee|u f|uun",
    "swh": "a k|wa |na | ya| ku|ya | na| wa|a m| ha|i y|a h|a n|ana|ki |aki|kwa| kw|hak| ka| ma|la |a w|tu |li |a u|ni |i k|a a|ila| ki|ali|a y|ati|za |ili|ifa| mt|ke | an|kil|kat|mtu|ake|ote|te |ka |ika|ma |we |a s|yo |fa |i n|ata|e k|ama|zi |amb|u a|ia |u w| yo|azi|kut|ina|i z|asi| za|o y|uhu|yak|au |ish|mba|e a|u k|hur|ha |tik|wat| au|uru| bi|sha|mu |ara|u n| as|hi | hi|ru |aif|tai|cha|ayo|a b|hal| uh| ch|yot|i h| zi|awa|chi|atu|e n|ngi|u y|mat|shi|ani|eri| am|uli|ele|sa |ja |e y|a t|oja|o k|nch|i a|a j| nc|ima| sh|ami| ta|end|any|moj|i w|ari|ham|uta|ii |iki|ra |ada|wan|wak|nay|ye |uwa| la|ti |eza|o h|iri|iwa|kuw|iwe| wo|fan| sa|she|bu |kan|ao |jam|wen|lim|i m|her|uto|ria| ja| ni|kam|di | hu|zo |a l|da |kaz|ahi|amu|wot|o w|si |dha|bin|ing|adh|a z|bil|e w|nya|kup|har|ri |ang|aka|sta|aji|ne |kus|e m|zim|ini|ind|lin|kul|agu|kuf|ita|bar|o n|uu |iyo|u h|nad|maa|mwe|ine|gin|nye|nde|dam|ta | nd|ndi|rik|asa| ba|rif|uni|nga|hii|lez|bo |azo|uzi|mbo|sil|ush|tah|wam|ibu|uba|imu| ye|esh| ut|taa|aar|wez|i s|e b| si|ala|dhi|eng|aza|tak|hir|saw|izo|kos|tok|oka|yan|a c|wal|del|i b|pat| um|ndo|zwa|mam|a i|guz|ais|eli|mai|laz|ian|aba|man|ten|zin|ba |nda|oa |u m|uku|ufu| mw|liw|aha|ndw|kuh|ua |upa| el|umi|sia",
    "sun": "an |na |eun| ka|ng | sa|ana|ang| di|ak | ha|nga|hak|un |ung|keu|anu| ba| an|nu |a b| bo| je|a h|ata|asa|jeu|ina| ng|ara|nan|awa|gan|ah |sa |a k| na|n k|kan|aha|a p|a s|ga |ban| ma|a n|ing|oga|bog|sar| pa| ku|man|a a|ha |san|ae |bae|din|g s|aga|sah|ra |tan|n s| pe|ala| si|kat|ma |per| ti|aya|sin| at| pi| te|n a|aan|lah|pan|gar|n n|u d|ta |eu |ari|kum|ngs|a m|n b|n d|ran|a d|gsa|wa |taw|k h|ama|ku |ike|n p|eba|bas| ja|al |a t|ika|at |beb|kab|pik|asi|atu|nda|una|a j|nag|e b|n h|en |g k|oh |aba|ila|rta|aku|boh|ngg|abe|art|ar |n j|di |ima|um |ola|geu|usa|aca|sak|adi|k a|udu|teu|car|tin| me| ay|h k| po|eh |u s|aka|rim|ti |sac|k n|ngt|jen|awe|ent|u a|uma|teh|law|ur |h s|dan|bar|uku|gaw|aru|ate|iba|dil|pol|aja|ieu|ere|jal|nar| hu|n t|nya|pa |are|upa|mas|ake|ut |wan| ge|kal|nus| so|ngk|ya |yan|huk| du|tun| mi|mpa|isa|lan|ura|u m|uan|ern|ena|nte|rup|tay|n m| ke|ka |han|und|us |h b|kud|ula|tut| tu| ie|hna|kaw|u k|lak|gam|mna|umn|g d| nu|yun|ri |ayu|wat| wa|eri|g n|a u|i m|u p| ta|du |dit|umu|k k|ren|mba|rik|gta| be|ali|h p|h a|eus|u n|alm|il | da|sas|ami|min|lma|ngu|nas|yat|rak|amp|mer|k j|sab|mum| ra|rua|ame|ua |ter|sal|ksa|men|kas|nge|k d|ona| bi|bis|sio|ion|nal|taa| de|uh |gal|dip|we |bad",
    "ron": " de|și | și|re | în|are|te |de |ea |ul |rep|le |ept|dre|e d| dr|ie |în |e a|ate|ptu| sa|tul| pr|or |e p| pe|la |e s|ori| la| co|lor| or|ii |rea|ce |au |tat|ați| a | ca|ent| fi|ale|ă a|a s| ar|ers|per|ice| li|uri|a d|al | re|e c|ric|nă |i s|e o|ei |tur| să|lib|con|men|ibe|ber|rso|să |tăț|sau| ac|ilo|pri|ăți|i a|i l|car|l l|ter| in|ție|că |soa|oan|ții|lă |tea|ri |a p| al|ril|e ș|ană|in |nal|pre|i î|uni|ui |se |e f|ere|i d|e î|ita| un|ert|ile|tă |a o| se|i ș|pen|ia |ele|fie|i c|a l|ace|nte|ntr|eni| că|ală| ni|ire|ă d|pro|est|a c| cu| nu|n c|lui|eri|ona| as|sal|ând|naț|ecu|i p|rin|inț| su|ră |e n| om|ici|nu |i n|oat|ări|l d| to|tor| di| na|iun| po|oci|tre|ni |ste|soc|ega|i o|gal| so| tr|ă p|a a|n m|sta|va |ă î|fi |res|rec|ulu|nic|din|sa |cla|nd | mo| ce| au|ara|lit|int|i e|ces|uie|at |rar|rel|iei|ons|e e|leg|nit|ă f| îm|a î|act|e l|ru |u d|nta|a f|ial|ra |ă c| eg|ță | fa|i f|rtă|tru|tar|ți |ă ș|ion|ntu|dep|ame|i i|reb|ect|ali|l c|eme|nde|n a|ite|ebu|bui|ât |ili|toa|dec| o |pli|văț|nt |e r|u c|ța |t î|l ș|cu |rta|cia|ane|țio|ca |ită|poa|cți|împ|bil|r ș| st|omu|ăță|țiu|rie|uma|mân| ma|ani|nța|cur|era|u a|tra|oar| ex|t s|iil|ta |rit|rot|mod|tri|riv|od |lic|rii|eze|man|înv|ne |nvă|a ș|cti",
    "hau": "da | da|in |a k|ya |an |a d|a a| ya| ko| wa| a |sa |na | ha|a s|ta |kin|wan|wa | ta| ba|a y|a h|n d|n a|iya|ko |a t|ma |ar | na|yan|ba | sa|asa| za| ma|a w|hak|ata| ka|ama|akk|i d|a m| mu|su |owa|a z|iki|a b|nci| ƙa| ci| sh|ai |kow|anc|nsa|a ƙ|a c| su|shi|ka | ku| ga|ci |ne |ani|e d|uma|‘ya|cik|kum|uwa|ana| du| ‘y|ɗan|ali|i k| yi|ada|ƙas|aka|kki|utu|n y|a n|hi | ra|mut| do| ad|tar| ɗa|nda| ab|man|a g|nan|ars|and|cin|ane|i a|yi |n k|min|sam|ke |a i|ins|yin|ki |nin|aɗa|ann|ni |tum|za |e m|ami|dam|kan|yar|en |um |n h|oka|duk|mi | ja|ewa|abi|kam|i y|dai|mat|nna|waɗ|n s|ash|ga |kok|oki|re |am |ida|sar|awa|mas|abu|uni|n j|una|ra |i b| ƙu|dun|a ‘|cew|a r|aba|ƙun|ce |e s|a ɗ|san|she|ara|li |kko|ari|n w|m n|buw|aik|u d|kar| ai|niy| ne|hal|rin|bub|zam|omi| la|rsa|ubu|han|are|aya|a l|i m|zai|ban|o n|add|n m|i s| fa|bin|r d|ake|n ‘|uns|sas|tsa|dom| ce|ans| hu|me |kiy|ƙar| am|ɗin| an|ika|jam|i w|wat|n t|yya|ame|n ƙ|abb|bay|har|din|hen|dok|yak|n b|nce|ray|gan|fa |on | ki|aid| ts|rsu| al|aye| id|n r|u k|ili|nsu|bba|aur|kka|ayu|ant|aci|dan|ukk|ayi|tun|aga|fan|unc| lo|o d|lok|sha|un |lin|kac|aɗi|fi |gam|i i|yuw|sun|aif|aja| ir|yay|imi|war| iy|riy|ace|nta|uka|o a|bat|mar|bi |sak|n i| ak|tab|afi|sab",
    "fuv": "de | e |e n|nde| ha|la |e e| ka|akk| nd| wa|ina|al |hak|na | in|ndi|kke|ɗo |di |ii |ade|aad|um |ko |i h|ala| mu| ne|lla|mum|ji |wal| jo| fo|all|eɗɗ| le|neɗ|e h|kal| ko|taa|re | ng|aaw|e k|aa |jog|e w|ley|ee |ke |laa|e m|eed|e l|nnd|aag|ɗɗo|ol | ta|o k|gu |kee|le |waa|ond|gal|a j|ogi|am |eji|dee|m e|ti |nga|e d|ɗe |awa|ɓe | wo|gii|eej|ede|gol|aan| re| go|i e|agu|e t|ann|fot|eyd|oti|ɗee|pot| po|maa|naa|oto|ydi| he|i n|ni |taw|enn|een|dim|to |a i|e f|e j|goo|a k|der| fa| aa|ele| de|o n|dir| ba|er |ngu|oot|ndo|i k|ota|ima| sa|won|ay |ka |a n|oor|a f|ngo|tee| ja|i f| to|o f|e ɓ|i w|wa |ren|a e|nan|kam|hay|ma |eyɗ|o t|awi|yɗe|ore|o e|too|and|fof|i m|a w|ñaa|e y|hee| do|eel|ira|nka|aak|e g|e s|l e|of |aar| ɓe|dii| la|ani|e p|tin|a t| te| na|e i| so|o w|ral|e r|are|ooj|awo|woo|gaa| ma|u m|kaa|faw| ña|dow| mo|oo | ya|aam|nge|nng| yi|und| ho|en |i l|so | mb| li|o i|e a| nj| o |ude|e b|o h|igg|ɗi |lig|nda|ita|baa| di|iin| fe|iti|aaɗ|ama|inn|haa|iiɗ|a h| no|tii|den|tal| tu|tuu|yan|l n|yim|do |non|imɓ|bel| je|ine| hu|njo|ugn|guu|no | da|edd|uug|mii|nee|jey|a d|ano| ke|lit|lli|go |je |ank|tde|amt|ent|eɗe|ɓam| ɓa|mɓe|y g|aga|alt|ɗɗa|ind|wit| su|nna| ɗe|ree|ŋde|i a|m t|aŋd|l h|jaŋ|ago|ow |ete| ɗu",
    "bos": " pr| i |je |rav| na|pra|na |da |ma |ima| sv|a s|nje|a p| da| po|anj|a i|vo |va |ko |ja | u |ako|o i|no | za|e s|ju |avo| im|ti |sva|ava|i p|o n|li |ili|i s|van|ost| ko|vak|ih |ne |a u| sl|nja|koj| dr| ne|jed| bi|i d|ije|stv|u s|lob|im |slo| il|bod|obo| ra|sti|pri| je| su|vje|om |a d|se |e i| ob|a n|i i| se|dru|enj| os|voj|cij|e p|a b|su |o d|uje|u p|raz|i n|a o| od|lo |u o|ova|u i|edn|i u| nj|ovo|jen|lju|ni |oje|nos|a k|ran|dje|iti|o p|aci|žav|a j|i o|e o|pre|pro|bra|nih|ji | ka|e d|jeg|og |sta| tr|tre|bud|u n|drž|u z|rža|bit|svo|ija|elj|reb|e b|mij|jem|avn|pos| bu|ka |aju| iz|ba |ve |rod|de |aro|e u|iva|a z|em |šti|ilo|eni|lje|ći |red|bil|jel|jer| ni|odn|m i|du |tva|nar|gov| sa|oji| do|tu |vim|u d| st|o k|e n|a t|za |nim| dj| sm|ući|ičn|dna|i m|oda|vno|eba|ist|nac|e k|čno|nak|ave|tiv|eđu|nov|olj|sno|ani|aln|an |nom|i b|stu|nst|eno|oj |osn|a r|ovj|nap|smi|nog|čov|oja|nju|ara|nu |dno|ans|ovi|jan|edi|m s| kr|h p|tup| op| čo|iko|jek|tvo| vj| mi|tel|vu |obr|živ|tit|o o|una|odu| mo| ov|kri|ego|din|rug|nik|rad|pod|nji|sam|sto|lja|dst|rim|ite|riv| te|m n|vol|i v|e t|vni|akv|itu|g p| ta|ašt|zaš|svi|ao |te |o s|ak |mje|a č|odr|udu|kla|i t|avi|tno|nič| vr|nic|dni|u u|ina| de|oba|od |jih|st ",
    "hrv": " pr| i |je |rav|pra|ma | na|ima| sv|na |ti |a p|nje| po|a s|anj|a i|vo |ko |da |vat|va |no | za|i s|o i|ja |avo| u | im|sva|i p| bi|e s|ju |tko|o n|li |ili|van|ava| sl|ih |ne |ost| dr|ije| ne|jed|slo| ra|u s|lob|obo| os|bod| da| ko|ova|nja|koj|i d|atk|iti| il|stv|pri|om |im | je| ob| su| ka|i i|i n|e i|vje|i u|se |dru|bit|voj|ati|i o|ćen|a o|o p|a b|a n|ući| se|enj|sti|a u|edn|dje|lo |ćav| mo|raz|u p| od|ran|ni |rod|a k|su |aro|drć|svo|ako|u i|rća|a j|mij|ji |nih|eni|e n|e o| nj|pre|pos|ćiv|oje|eno|e p|nar|oda|nim|ovo|aju|ra |ći |og |nov|iva|a d|nos|bra|bil|i b|avn|a z|jen|e d|ve |ora|tva|jel|sta|mor|u o|cij|pro|ovi|za |jer|ka |sno|ilo|jem|red|em |lju|osn|oji| iz|aci| do|lje|i m| ni|odn|nom|jeg| dj|vno|vim|elj|u z|o d|rad|o o|m i|du |uje| sa|nit|e b| st|oj |tit|a ć|dno|e u|o s|u d|eću|ani|dna|nak|nst|stu| sm|e k|u u|an |gov|nju|juć|aln|m s|tu |a r|ćov|jan|u n|o k|ist|ću |te |tvo|ans|šti|nu |ara|nap|m p|nić|olj|bud| bu|edi|ovj|i v|pod|sam|obr|tel| mi|ina|zaš|e m|ašt| vj|ona|nji|jek| ta|duć|ija| ćo|tup|h p|oja|smi|ada| op|oso|una|sob|odu|dni|rug|udu|ao |di |avi|tno|jim|itu|itk|će |odr|ave|meć|nog|din|svi| ći|kak|kla|rim|akv|elo|štv|ite|vol|jet|opć|pot|tan|ak |nic|nac|uće| sk| me|ven",
    "nld": "en |de |an | de|van| va| en| he|ing|cht|der|ng |n d|n v|et |een| ge|ech|n e|ver|rec|nde| ee| re| be|ede|er |e v|gen|den|het|ten| te| in| op|n i| ve|lij| zi|ere|eli|zij|ijk|te |oor|ht |ens|n o|and|t o|ijn|ied|ke | on|eid|op | vo|jn |id |ond|in |sch| vr|aar|n z|aan| ie|rde|rij|men|ren|ord|hei|hte| we|eft|n g|ft |n w|or |n h|eef|vri|wor| me|hee|al |t r|of |le | of|ati|g v|e b|eni| aa|lle| wo|n a|e o|nd |r h|voo| al|ege|n t|erk| da| na|t h|sta|jke|at |nat|nge|e e|end| st|om |e g|tie|n b|ste|die|e r|erw|wel|e s|r d| om|ij |dig|t e|ige|ter|ie |gel|re |jhe|t d| za|e m|ers|ijh|nig|zal|nie|d v|ns |d e|e w|e n|est|ele|bes| do|g e|che|vol|ge |eze|e d|ig |gin|dat|hap|cha|eke| di|ona|e a|lke|nst|ard| gr|tel|min| to|waa|len|elk|lin|eme|jk |n s|del|str|han|eve|gro|ich|ven|doo| wa|t v|it |ove|rin|aat|n n|wet|uit|ijd|ze | zo|ion| ov|dez|gem|met|tio|bbe|ach| ni|hed|st |all|ies|per|heb|ebb|e i|toe|es |taa|n m|nte|ien|el |nin|ale|ben|daa|sti| ma|mee|kin|pen|e h|wer|ont|iet|tig|g o|s e| er|igd|ete|ang|lan|nsc|ema|man|t g|is |beg|her|esc|bij|d o|ron|tin|nal|eer|p v|edi|erm|ite|t w|t a| hu|rwi|wij|ijs|r e|weg|js |rmi|naa|t b|app|rwe| bi|t z|ker|ame|eri|ken| an|ar | la|tre|ger|rdi|tan|eit|gde|g i|d z|oep",
    "srp": " pr| i |rav|pra| na|na |ma | po|je | sv|da |a p|ima|ja |a i|vo |nje|va |ko |anj|ti |i p| u |ako|a s| da|avo|i s|ju |ost| za|sva|o i|vak| im|e s|o n|ava| sl|nja| ko|no |ne |li |om | ne|ili| dr|u s|slo|koj|a n|obo|ih |lob|bod|im |sti|stv|a o| bi| il| ra|pri|a u|og | je|jed|e p|enj|ni |van|u p|nos|a d|iti|a k|edn|i u|pro|o d|ova| su|ran|cij|i i|sta|se | os|e i|dru| ob|i o|rod|aju|ove| de|i n| ka|aci|e o| ni| od|ovo|i d|ve | se|eni|voj|ija|su |u i|žav|avn|uje| st|red|m i|dna|a b|odi|ara|drž|ji |nov|lju|e b|rža|tva|što|u o|oja| ov|a j|odn|u u|jan|poš|jen| nj|nim|ka |ošt|du |raz|a z| iz|sno|o p|vu |u n|u d|šti|osn|e d|pre|u z|de |ave|nih|bit|aro|oji|bez|tu |gov|lje|ičn| sa|lja|svo|lo |za |vno|e n|eđu| tr|nar| me|vim|čno|oda|ani|đen|nac|nak|an |to |tre|ašt| kr|stu|nog|o k|m s|tit|aln|nom|oj |pos|e u|reb| vr|olj|dno|iko|ku |me |nik| do|ika|e k|jeg|nst|tav|em |i m|sme|o s|dni|bra|nju|šen|ovi|tan|te |avi|vol| li|zaš|ilo|rug|var|kao|ao |riv|tup|st |živ|ans|eno|čov|štv|kla|vre|bud|ena| ve|ver|odu|međ|oju|ušt| bu|kom|kri|pod|ruš|m n|i b|ba |a t|ugi|edi| mo|la |u v|kak| sm|ego|akv|o j|rad|dst|jav|del|tvo| op|nu |por|vlj|avl|m p|od |jem|oje| čo|a r|sam|i v|ere|pot|o o|šte|rem|vek|svi| on|rot|e r",
    "ckb": " he| û |ên | bi| ma|in |na | di|maf|an |ku | de| ku| ji|xwe|her| xw|iya|ya |kes|kir|rin|iri| ne|ji |bi |yên|afê|e b|de |tin|e h|iyê|ke |es |ye | we|er |di |we |ê d|i b| be|erk|ina| na| an|î û|yê |eye|î y|kî |rke|nê |diy|ete|eke|ber|hem|hey| li| ci|wek|li |n d|fê | bê| te|ne |yî | se|net|rî |tew|yek|sti|af | ki|re |yan|n b|kar|hev|e k|aza|n û|wî | ew|i h|n k|û b|î b| mi| az|dan| wî|ekî|î a|a m|zad|e d|mir|bin|est|ara|iro|nav|ser|a w|adi|rov|n h|anê|tê |ewe|be |ewl|ev |mû | ya|tî |ta |emû| yê|ast|wle| tê|n m| bo|wey|s m|bo | tu|n j|ras| da| me|din|î d|ê h|n n|n w|ing|st | ke| ge|în |ar | pê|iye|îna|bat|r k|ema|cih|ê b|wed|û m|dî |û a|vak|ê t|ekh|par| ye|vî |civ|n e|ana|î h|ê k|khe|geh|nge|ûna|fên|ane|av |î m|bik|eyê|eyî|e û| re|man|erb|a x|vê |ê m|iva|e n|hî |bûn|kê | pa|erî|jî |end| ta|ela|nên|n x|a k|ika|f û|f h|î n|ari|mî |a s|e j|eza|tên|nek| ni|ra |ehî|tiy|n a|bes|rbe|û h|rwe|zan| a |erw|ov |inê|ama|ek |nîn|bê |ovî|ike|a n| ra|riy|i d|anî|û d|e e|etê|ê x|yet|aye|ê j|tem|e t|erd|i n|eta|ibe|a g|u d|xeb|atê|i m|tu | wi|dew|mal|let|nda|ewa| ên|awa|e m|a d|mam|han|u h|a b|pêş|ere| ba|lat|ist| za|bib|uke|tuk|are|asî|rti|arî|i a|hîn| hî|edi|nûn|anû|qan| qa| hi| şe|ine|n l|mên|ûn |e a",
    "yor": "ti | ní|ó̩ | è̩|ní | lá|̩n |o̩n|é̩ |wo̩|àn | e̩|kan|an |tí | tí|tó̩| kò|ò̩ |̩tó| àw| àt|è̩ |è̩t|e̩n|bí |àti|lát|áti| gb|lè̩|s̩e| ló| ó |àwo|gbo|̩nì|n l| a | tó|í è|ra | s̩|n t|ò̩k|sí |tó |̩ka|kò̩|ìyà|o̩ | sí|ílè|orí|ni |yàn|dè |̩‐è|ì k|̩ à|èdè| or|ún |ríl|è̩‐|í à|jé̩|‐èd|àbí|̩ò̩|ò̩ò|tàb|nì |í ó|n à| tà|̩ l|jo̩| ti|̩e |̩ t| wo|nìy|í ì|ó n| jé| sì|ló |kò |n è|wó̩| bá|n n|sì | fú|̩ s|í a|rè̩|fún| pé| òm|̩ni|gbà| kí| èn|ènì|in |òmì|ìí |ba |nir|pé |ira|mìn|ìni|n o|ràn|ìgb| ìg|bá |e̩ | rè|̩ n|kí |n e|un |gba|̩ p|í ò|nú | o̩|nín|gbé|yé | ka|ínú|a k|fi | fi|mo̩|bé̩|o̩d|dò̩|̩dò|ó s|i l|̩ o|̩ ì|wà |í i|i ì|hun|bò |i ò|dá |bo̩|o̩m|̩mo|̩wó|bo |áà |̩ k|ó j|ló̩|àgb|ohu| oh| bí| ò̩|bà |ara|yìí|ogb|írà|n s|ú ì| ìb|pò̩|í k| lè|bog|i t|à t|óò |yóò|kó̩|gé̩|à l|ó̩n|rú |lè | yó|̩ ò|̩ e|a w|̩ y|ò̩r|̩ f| wà|ò l|í t|ó b|i n|ó̩w|̩gb|yí |í w|ìké|̩ a|láà|wùj|àbò|i è|ùjo|fin|é̩n|n k|í e|i j|ú à| ìk|òfi| òf| ar|i s|mìí|ìír| mì| ir|rin|náà| ná|jú |̩ b| yì|ó t|̩é̩| i |̩ m|fé̩|kàn|rí |ú è|à n|wù |s̩é|é à| mú| èt|áyé|í g|̩kó|̩dá|è̩d|àwù|è̩k| ìd|irú|í o|i o|i à|láì|í n|ípa| kú|níp| ìm|a l|ké̩|bé |i g|de |ábé|ìn |báy|̩è̩|ígb|wò̩|níg|mú |láb| àà|n f|è̩s|̩ w|ùn |i a|ayé|èyí| èy|mó̩|á è| ni|n b| wó|je̩| ìj|gbá|ò̩n|ó̩g",
    "uzn": "lar|ish|an |ga |ar | va| bi|da |va |ir | hu|iga|sh |uqu|shi|bir|quq|huq|gan| bo| ha|ini|ng |a e|r b| ta|lis|ni |ing|lik|ida|oʻl|ili|ari|nin|on |ins| in|adi|nso|son|iy | oʻ|lan| ma|dir|hi |kin|har|i b|ash| yo|boʻ| mu|dan|uqi|ila|ega|qla|r i|qig|oʻz| eg|kla|a b|qil|erk|ki | er|oli|nli|at | ol|gad|lga|rki|oki|i h|a o| qa|yok|lig|osh|igi|ib |las|n b|atl|n m| ba|ara| qi|ri | sh|iya|ala|lat|in |ham|bil|a t|a y|bos|r h|siy|n o|yat|inl|ik |a q|cha|a h| et|eti|nis|a s|til|ani|h h|i v|mas|tla|osi|asi| qo|ʻli|ati|i m|rni|im |uql|arn|ris|qar|a i|gi | da|n h|ha |sha|i t|mla|rch| xa|i o|li |hun|bar|lin|ʻz |arc|rla| bu|a m|a a| as|mum| be| tu|aro|r v|ikl|lib|taʼ|h v|tga|tib|un |lla|mda| ke|shg| to|n q|sid|n e|mat|amd|shu|hga| te|tas|ali|umk|oya|hla|ola|aml|iro|ill|tis|iri|rga|mki|irl| ya|xal|dam| de|gin|eng|rda|tar|ush|rak|ayo| eʼ| so|ten|alq| sa|ur | is|imo|r t| ki|mil| mi|era|zar|hqa|aza|k b| si|nda|hda|kat|ak |oʻr|n v|a k|or |rat|ada|ʻlg|miy|tni|i q|shq|oda|shl|bu |dav|nid|y t|ch |asl|sos|ilg|aso|n t|atn|sin|am |ti |as |ana|rin|siz|yot|lim|uni|nga|lak|n i|a u|qon|i a|h k|vla|avl|ami|dek| ja|ema|a d|na | em|ekl|gʻi|si |i e|ino| ka|uch|bor|ker| ch|lma|liy|a v|ʼti|lli|aka|muh|rig|ech|i y|uri|ror",
    "zlm": "an |ang| ke| se|ng | da|dan|ada|ara| pe|ak | be|ran|ber| me|ah |nya|hak|per|n s|ata|ala|ya |a s|kan|asa|n k|lah| di|da |aan|gan|nga|dal| ma|n d|erh|eba|rha|a p| ha|kep|pad|yan| ya|ap |ama| ba|nda| te|ra |tia|man|eng|a b|a d|ora|men|n p|ter|iap|san|epa| or|pen|eti| ad| at|a a|n a|set|tan|h b|tau|sia|n t|apa|dak|pa |sa |au |ta |ela|bas|at | sa|n b|beb|n m|keb|h d|p o|end|ega|aka|a k|am |sam|gar|ana|leh|lam|ole| un|neg|k k|ban|g a|di |n y|eh |a m|eri|aha|han| ti|a t|ma |any|uan|seb|ebe|ngs|atu|mas|bag|car|mem|ing|ian| ne|kes|i d|gsa|ia |ika|mat|agi|ert| de| la|emb|und|nan|asi|emu|ers|epe|na |anu|gi |ung|erk|n h|ngg|tu |ind|pem|i m|g b|kla| in|iha|pun|i s|erl|akl|era|as |dap|eca|sec|al |k m|bar|nus|usi|lan|tin|si |awa|nny| su|bol|sas| as|ini|rta|rat|ena|sem|aya|ni |den|g m|g t|kem|i k|adi|ai |ti | ap| ta|in | he| bo|had|uka|tar| an|hen|ann|ain|ka |rka|ri |ema|k h|n i|g s|dia|dun|ira|rsa|elu|nta|a n|mel|iad|uk |mpu|ua |har|kat|aga|lai|enu|ses|emp|ntu|k d|ent|un |mba|rma|jua|uat|k a|mar|rak|h m|ila|lua|i a|aja|ker|dil|g d|uma|rli|lin|esi|sua|nak|ndu|l d| pu|t d|erm|ser|ar |ese|ati|tuk|rga|i p|dar|esa|bah| ol|ari|ngk|ant|sek|gam|raa|mbe|ida|sat|iri|kea|i b|saa|dir|g u|erj|tik|unt|eka|rja",
    "ibo": "a n|e n|ke | na|na | ọ | bụ| n |nwe|ere|ọ b|re |nye| nk|ya |la | nw| ik| ma|ye |e ọ|ike|a o|nke|a m|ụ n| ya|a ọ|ma |bụl|ụla| on| a |e i|kik|iki|ka |ony|ta |bụ |kwa| nd|a i|i n|di |a a|wa |wer|do | mm|dụ |e a|ha | ga|any| ob|ndi| ok|he |e m|e o|a e|ọ n|ite|rụ |hi |mma|ga‐|wu |ara| dị|aka|che|oke|we |o n| ih|n o|adụ|mad|obo|bod|a g|odo| ka| ez|te |hị |be |ụta|dị | an|zi | oh|a‐e|akw|gba|i m|me | ak|u n|nya|ihe|ala|ohe|ghi|ri | ọz|her|ra |weg| nt| iw| mb|ba |pụt| si|ro |oro|iwu|chi|a‐a|rị |ụ i|ụ ọ| eb|iri|ebe|ụrụ|zọ | in|a y|ezi|e ị|kpa|le |ile|ịrị|n e|kpe|mba| ha|bi |sit|e e|inw|nil|asị| en|mak|a u| ni|apụ|chị|i i|ghị|i ọ|i o|si | e |ide|o i|e y|ụ m|a s|u o|kwu|ozu|yer|ru |enw|ụ o|ọzọ|gid|hụ |n a|ahụ|nkw|sor|egh|edo|a ụ|tar|n i|toz|ị o|pa |i a| me|ime|uru|kwe| mk|tu |ama|eny|uso|de | im|ọ d|osi|hed|a d| kw|mkp|wet| ọr| ọn|obi|ọrụ| ịk| to|gas| ch|ịch|nha|ọnọ|nọd| nc| al|n ụ|ị m| us|nọ |u ọ|nch| o |eta|n u| ot|otu|sir|sịr| nh|a k|ali|o m| ag| gb|e s|ọta|nwa|ị n|lit|ega|ji |ọdụ|e k|ban|e g|ị k|esi|agb|eme|hu |ikp|zu |pe |nta|na‐|chọ|u a|a b|uch|n ọ|onw|ram|kwụ|ekọ|i e| nọ| ug|ọch|u m|gwu|a h|zụz|ugw|meg|ị e|nat|e h|dịg|o y|kpu|pụr|cha|zụ |hịc|ich| ng|ach| og|wap|wan|ịgh|uwa| di| nn|i ị",
    "ceb": "sa | sa|ng |ang| ka|an | pa|ga | ma|nga|pag| ng|a p|on |kat|a k|ug |od | ug|g m| an|ana|n s|ay |ung|ata|ngo|a m|atu|ala|san|ag |tun|g s|g k|god|d s|a s|ong|mga| mg|g p|n u|yon|a a|pan|ing|usa|tan|tag|una|aga|mat|ali|g u|han|nan| us|man|y k|ina|non|kin| na|syo|lan|a b|asa|nay|n n|a i|awa| ta|taw|gaw|nsa|a n|nas| o |ban|agp|isa|dun|was|iya| gi|asy|adu|ini|bis| ad|ili|o s| bi|g a|nah|nag|a t| ki|lin|lay|ahi|sam|al |wal| di|nal|asu| ba|ano|agt| wa|ama|yan|a u| iy|kan|him|n k|gan|ags|n a|kag| un|ya |kas|gpa|g t| su|aha|wha|agk|awh|gka|a g|kal|l n|gla|gsa|sud|gal|imo|ud |d u|ran|uka|ig |aka|aba|ika|g d|ara|ipo|ngl|g n|uns|n o|kau|i s|y s|og |uta|d n|li | si|gik|g i|mta|ot |iin| la| og|o a|ayo|ok |awo|aki|kab|aho|n m|hat|o p|gpi|a w|apa|lip|ip | hu| ga|a h|uba|na | ti|bal|gon|la |ati|wo |ad |hin|sal|gba|buh| bu| ub|uha|agb|hon|ma |nin|uga|t n|ihi| pi|may| pu|mak|ni | ni|d a|pin|abu|agh|ahu|uma|as |dil|say| in|at |ins|lak|hun|ila|mo |s s|sak|amt|o u|pod|ngp|tin|a d|but|ura|lam|aod|t s|bah|ami|aug|mal|sos|os |k s| il|tra| at|gta|bat|aan|ulo|iha|ha |n p| al|g b|lih|kar|lao|agi|amb|mah|ho |sya|ona|aya|ngb|in |inu|a l| hi|mag|iko|it |agl|mbo|oon|tar|o n|til|ghi|rab|y p| re|yal|aw |nab|osy|dan",
    "tgl": "ng |ang| pa|an |sa | sa|at | ka| ng| ma|ala|g p|apa| na|ata|pag|pan| an| at|ay |ara|ga |a p|tan|g m|mga| mg|n n|pat| ba|n a|aya|na |ama|g k|awa|kar|a k|lan|rap|gka|nga|n s|g n|aha|g b|a a| ta|agk|gan|tao|asa|aka|yan|ao |a m|may|man|kal|ing|a s|nan|aga| la|ban|ali|g a|ana|y m|kat|san|kan|g i|ong|pam|mag|a n|o a|baw|isa|wat| y |lay|g s|y k|in |ila|t t| ay|aan|o y|kas|ina|t n|ag |t p|wal|una|yon| o | it|nag|lal|tay|pin|ili|ans|ito|nsa|lah|kak|any|a i|nta|nya|to |hay|gal|mam|aba|ran|ant|agt|on |t s|agp| wa| ga|gaw|han|kap|o m|lip|ya |as |g t|hat|y n|ngk|ung|no |g l|gpa|wa |lag|gta|t m|kai|yaa|sal|ari|lin|a l|pap|ahi| is| di|ita| pi|pun|agi|ipi|mak|a b|y s|bat|yag|ags|o n|aki|tat|pah|la |gay|hin| si|di |i n|sas|iti|a t|t k|mal|ais|s n|t a|al |ipu|ika|lit|gin| ip|ano|gsa|alo|nin|uma|hal|ira|ap |ani|od |i a|gga|y p|par|tas|ig |sap|ihi|nah|ini| bu|ngi|syo|o s|nap|o p|a g| ha|uka|a h|aru|a o|mah|iba|asy|li |usa|g e|uha|ipa|mba|lam|kin|kil|duk|n o|iga| da|dai|aig|igd|gdi|pil|dig|pak| tu|d n|sam|nas|nak|ba |ad |lim|sin|buh|ri |lab|it |tag|g g|lun|ain|and|nda|pas|kab|aho|lig|nar|ula| ed|edu| ib|git|ma |mas|agb|ami|agg|gi |sar|i m|siy|g w|api|pul|iya|amb|nil|agl|sta|uli|ino|abu|aun|ayu| al|iyo",
    "hun": " sz| a |en | va|és | és|min|ek | mi| jo|jog|ind|an |nek|sze|ság| az|gy |sza|nde|ala|az |den|a v|val|ele| el|oga|mél|egy| eg|n a|ga |zab| me|zem|emé|aba|int|van|bad|tel|tet| te|ak |tás|ény|t a| ne|gye|ély|tt |n s|ben|ség|zet|lam|meg|nak|ni | se|ete|sen|agy|let|lyn|s a|yne|ra |z e|et | al|mel|kin|k j|eté|ok |tek| ki|vag|re |n m|oz |hoz|ez |s s|ett|gok|ogy| kö|mbe|es |em |nem|ely| le|ell|emb|hog|k a|atá|köz|nt | ho|yen|hez|el |z a|len|dsá|ásá|tés|ads|k m| ál| em|a s|nte|a m|szt|a t|áll|ás |y a|ogo|sem|a h|enk|nye|ese|nki|ágo|t s|lap|ame|ber|ló |k é|nyi|ban|mén|s e|i m|t m| vé|lla|ly |ébe|lat|ág |ami|on |mze|n v|emz|fel|a n|lő |a a|eki|eri|yes| cs|lle|tat|elő|nd |i é|ég |ésé|lis|yil|vet|át |kül|ért| ke|éte|rés|l a|het|szo|art|alá| ny|tar|koz| am|a j|ész|enl|elé|ól |s k|tár|s é|éle|s t|lem|sít|ges|ott| fe|n k|tko|zás|t é|kel|ja | ha|aló|zés|nlő|ése|ot |ri |lek|más|tő |vel|i j|se |ehe|tes|eve|ssá|tot|t k|olg|eze|i v|áza|leh|n e|ül |tte|os |ti |atk|zto|e a|tos|ány|ána|zte|fej|del|árs|k k|kor|ége|szá|t n| bi|zat|véd|nev|elm|éde|zer|téb|biz|rra|ife|izt|ere|at |ll |k e|ny |sel| né|ába|lt |ai |sül|ház|kif|t e| ar|leg|d a|is |i e|arr|t t|áso|it |ető|al | má|t v| bá|bár|a é|esü|lye|m l| es|nyo",
    "azj": " və|və |ər |lar| hə|in |ir | ol| hü| bi|hüq|üqu|quq|na |lər|də |hər| şə|bir|an |lik| tə|r b|mal|lma|ası|ini|r h|əxs|şəx|ən |arı|qla|a m|dir|aq |uqu|ali| ma|una|ilə|ın |yət| ya|ara|ikd|əri|ar |əsi|əti|r ş|rin|yyə|n h| az|dən|nin|ərə|tin|iyy|mək|zad| mü|sin| mə|ni |nda|ət |ndə|aza|rın|ün |ını|ə a|i v|nın|olu|qun| qa| et|ilm|lıq|ə y|ək |lmə|lə |kdi|ind|ına|olm|lun|mas|xs |sın|ə b| in|n m|q v|nə |əmi|n t|ya |da | bə|tmə|dlı|adl|bər| on|əya|ə h|sı |nun|maq|dan|inə|etm|un |ə v|rlə|n b|si |raq| va|ə m|n a|ınd|rı |anı| öz|əra|nma|n i|ama|a b|irl|ala|li |ins|bil|ik | al| di|ığı|ə d|lət|il |ələ|ə i|ıq |nı |nla|dil|müd|n v|ə e|unm|alı| sə|xsi|ə o|uq |uql|nsa|ətl| də|ili|üda|asi| he|ola|san|əni|məs| da|lan| bu|tər|həm|dır|kil|iş |u v| ki|min|eyn|mi |yin| ha|sos|heç|bu |eç | ed|kim|lığ|alq|xal| as|sia|osi|r v|q h|rə |yan|i s| əs|daf|afi| iş|ı h|fiə| ta|ə q|ıql|a q|yar|sas|lı |ill|mil|əsa|liy|tlə|siy|a h|məz|tün|ə t| is|ist|iyi| so|n ə|al |ifa|ina|lıd|ı o|ıdı|əmə|ır |ədə|ial| mi|əyi|miy|çün|n e|iya|edi| cə| bü|büt|ütü|xil|üçü|mən|adə|t v|a v|axi|dax|r a|onu| üç|seç| nə| se|man|ril|sil|əz |iə |öz |ılı|aya|qan|i t|şər|təm|ulm|rəf|məh| xa|ğın| dö| ni|sti|ild|amə|qu |nam|n o|n d|var|ad |zam|tam|təh",
    "ces": " pr| a |ní | ne|prá|ráv|ost| sv| po|na |ch |ho | na|nos|o n| ro|ání|ti |vo |neb|ávo|má |bo |ebo| má|kaž| ka|ou |ažd| za| je|dý |svo|ždý| př|a s| st|sti|á p| v |obo|vob| sp|bod| zá|ých|pro|rod|ván|ení|né |ý m|ého| by| ná|spo|ně |o p|mi |í a|ter|roz|ová|to | ja| li|áro|nár|by |jak|a p|a z|ny | vš|kte|i a|lid|ím |o v|í p|u p|mu |at | vy|odn| so| ma|a v| kt|í n|zák|li |oli|ví |kla|tní|pod|stá|en |do |t s|mí |je |em |áva| do|byl| se|být|í s|rov| k |čin| ve|ýt |í b|it |dní|vše|pol|o s| bý|tví|nýc|stn|nou|ejn|sou|ran|ci |vol|se |nes|a n|pří|eho|ným|tát|va |ním|mez|ají|i s|stv|ké |ích|ečn|žen|e s|vé |ova|své|ým |kol|du |u s|jeh|kon|ave|ech|eré|nu | ze|i v|o d|í v|hra|ids|m p|ému|ole|y s| i |maj|o z| to|aby|sta| ab|m a|pra| ta|chn| ni|že |ovn|ako|néh|len|dsk|rac|lad|chr| že|vat| os|sob|aké|i p|smí|esm|st |i n|m n|a m|lně|lní|při|bez|dy |áln|ens|zem|t v|čen|leč|kdo|ými| ji|oci|i k| s |í m|jí | či|áv |ste|och| oc|vou|ákl| vz|rav|odu|nez|inn|ský|nit|ivo|a j|u k|iál| me|ezi|ské|ven|stu|u a|tej|oln|slu|zen|í z|y b|oko|zac|níc|jin|ky |a o|řís|obe|u v|tak|věd|oje| vý|ikd|h n| od|čno|oso|ciá|h p| de|a t|ům |soc|jíc|odů|něn|adn|tup|dů |děl|jno|kéh|por|ože|hov|aci|nem|é v|rok|i j|u o|od |ího|vin|odi",
    "run": "ra |we |wa | mu|e a|se | n |a k|ira|ntu|tu | ku| um|ko |a i|mu |iri|mun|hir|ye |unt|ing|ash|ere|shi|a n|umu|zwa| bi|gu |ege|a a|za |teg|ama|e k|go |uba|aba|ngo|ora|o a|ish| ba| ar|ung|a m| we|e n|na |sho|ese|nga| ab|e m|mwe|ugu| kw|ndi| gu|ate|kwi|wes|riz|ger|u w| at|di |gih|iza|n u|ngi|ban|yo |ka |e b|a b| am| ca|ara|e i|obo|hob|ri |u b|can|nke|ro |bor| in|bah|ahi|ezw|a u|gir|ke |igi|iki|iwe|rez|ihu|hug|aku|ari|ang|a g|ank|ose|u n|o n|rwa|kan| ak|nta|and|ngu| vy|aka|n i|ran| nt| ub|kun|ata|i n|kur|ana|e u| ko|gin|nye|re | ka|any|ta |uko|amw|iye| zi|ga |ite| ib|aha| ng|era|o b|ako|o i| bu|o k|o u|o z| ig|o m|ho |mak|sha| as| iv|ivy|n a|i b|izw|o y| uk|ubu|aga|ba |kir|vyi|aho| is|nya|gan|uri| it| im|u m|kub|rik|hin|guk|ene|bat|nge|jwe|imi| y |vyo|imw|ani|kug|u a|ina|gek|ham|i i|e c|ze |ush|e y|uru|bur|amb|ibi|agi|uza|zi |eye|u g|gus|i a| nk|no |abi|ha |rah|ber|eme|ras|ura|kiz|ne |tun|ron| zu|ma |gen|wo |zub|w i|kor|zin|wub|ind| gi|y i|ugi|je |iro|mbe| mw|bak| ma|ryo|eka|mat| ic|onk|a z| bo|ika|eko|ihe|ukw|wir|bwa| ry| ha|bwo| ag|umw|yiw|tse| ya|he |eng| ki|nka|bir|ant|aro|gis|ury|twa| yo|bik|rek|ni | ah| bw|uro|mw |tan|i y|nde|ejw| no|zam|puz|ku |y a|a c|bih|ya |mur|utu|eny|uki|bos",
    "plt": "ny |na |ana| ny|y f|a n|sy |aha|ra |a a| fa|n n|y n|a m|an | fi|tra|any| ma|han|nan|ara|y a| am|ka |in |y m|ami|olo| ts|lon|min| mi| sy| na|a t| ol|fan| ha|a i|man|iza| iz|ina|ona|y h|aka|o a|ian|a h|reh|etr|a s|het|on |a f|ire|fah|tsy|mba| ar| hi|zan|ay |ndr|y o|ira|y t| an|ehe|o h|afa|y i|ren|ran| zo|ena|amb|dia|ala|amp|zo |ika| di|tan|y s|y z| az|ia |m p|rin|jo |n j| jo| dr|zy |ry |a d|ao |and|dre|haf|nen|mpi|rah| ka|eo |n d| ir|ho |am |rai|fa |elo|ene|oan|omb| ta| pi| ho|ava|azo|dra|itr|iny|ant|tsi|zon|asa|tsa| to|ari|ha |a k|van|n i|fia|ray| fo|mbe|ony|sa |isy|azy|o f|lal|ly |ova|lom| vo|nat|fir|sam|oto|zay|mis|ham|bel| ra|a r|ban|kan|iha|nin|a e|ary|ito| he| re| no|ita|voa|nam|fit|iar| ko|tok|isa|fot|no |otr|mah|aly|har|y v|y r| sa|o n|ain|kam|aza|n o|oka|ial|ila|ano|atr|oa | la|y l|eri|y d|ata|hev|sia|pia|its|reo| ao|pan|anj|aro|tov|nja|o s|fam|pir| as|ty |nto|oko|y k|sir|air|tin|hia|ais|mit|ba | it| eo|o t|mpa|kon|a z|a v|ity|ton|rak|era|ani|ive|mik|ati|tot|vy |hit|hoa|aho|ank|ame|ver|vah|tao|o m|ino|dy |dri|oni|ori| mo|hah|nao|koa|ato|end|n t| za|eha|nga|jak|bar|lah|mia|lna|aln|va | mb|lan| pa|aov|ama|eve|za |dro|ria|to |nar|izy|ifa|adi|via|aja| va|ind|n k|idi|fiv|rov|vel",
    "qug": "una|ta | ka|na |ka |ash|cha|a k|ari|ish|kun|kta|ana|pak|hka|shk|apa|mi |ach|hay|akt|shp|man|ak | ch| ha|rin|ata|tak|lla|ita|ami|ama|aku|har| pa|pas|ayñ|yñi|ina| ma| ru|uku|sh |hpa|run|all|kuy|aka|an | tu|tuk|yta|chi|chu|a c|ñit|in |nak|a h|nka|ris|tap|kan| ki|ayt|pi | sh|pa |i k|a p|nap|kam|kaw|pay|nam|ayp|aws|iri|wsa|a s|ank|nta|uy |a t|hin|a m|ay | li|ant|lia|kay|nat|a r|shi|iak|lak|uya| wa|yuy|say|kis|y r|ypa|hun|a a| yu|n t|tam| ti|yay|n k| ya|a w|hpi|lli| al|api|yku|un |ipa|a i|iku|ayk|shu| sa|ush|pir|ich|kat|hu |huk| il|ill|kas|a y|rik|yac|a l| ku|kac|hik|tan|wan|ypi|ink|ika| ni|ila|ima|i c|yll|ayl| wi|mac|nis| ta|i y|kus|tin|n s|i p|yan|llu|la |iks|tik|kpi| pi|awa|may|lan|li | ri|kll|yas|kin|kak|aya|ksi|k h|aym|war|ura| ay|lat|ukt|i t|iya|ull|mas|sha|kir|uch|h k|nch|akp|uma|pip|han|kik|iki|riy|aki| ii|i s|n p|h m|kar|nal|y h|tac| su|nac|mak|n m|nki|k a|mam|iwa|k t|k k|i m|yma| ña|wil|asi|nmi|kap|pal|sam|pam|k i|k l|i i|pan|sum|i w| hu|his| mu|iia|mun|k m|u t|pik|was|ik |ma |hat|k r|akl|huc| im|mal|uyk|imi|n y|anc|y k|a n|iñi| iñ|wak|unk|yka| mi|iña|a u|has|ywa| ak|llp|ian|ha |tar|rmi|i a|arm|las|ati|pur|sak|ayw|hap|yar|uti|si |iyt|uri|kim| ar|san|h p|akk|iy |wat|wpa|y i|u k",
    "mad": "an |eng|ban|ng | sa| ka|dha| ba|ren|ak |ang| se| ha|hak| dh|na | pa|se |adh|a s|aba|n s|ara|ngg|are|ha |aga|sa | or|ore|asa|sar|ana| ma|aan|a k|ale|gi | ag|gad|a b|n o|n k|eba|ala|ra |gan| ke|dhu|ota|aja|bas|n b|ka |man|tab|dhi|beb|sab|ama|ako|abb|at |ggu|nga| ta|pan|wi |huw|uwi|eka|ata|a d|san| ot|agi|lak|hal|ba |bba|i h|ong|em |kab|g a|lem|a o| pe| na|ane|par|ngs|nge|gar|a a|tan|gsa|a p|ran|i s|k h|n p|uy |guy|ken|n a|al |ada| ga|apa|pon|e d| e |nek| an|g s|ta |kaa|on |kal|a m|ssa|ona|abe|kat| la|a e|e e|sal|ate|jan|ri |nan|lab|asi|sad|i p|e a|lan|aka|a h|ari| bi|ena|si |daj| ng|ton|e k|har|oss|gen|i k|g k|car|ase|ano|era|kon| be|nya|n d|nag|bad|ar |epo| da|mas| kl| al|n t|mat|nos|n n|ela|g e|a n|k k|uwa|adi|pad|ggi|uan|i d|ne | so|hi |sae|oan|wan|as |le |gap|ter|yat|om |kla|k a|e b|ina|ah |k s|koa|i a|ega|neg|n h|m p|aha| as| ja|abi|ma |kas|bi | mo|aon| di|one| ep|per|aya|e s|nto|te |bat|epa|nda|n e| ca|int|pam|di |ann| ra|aen|k d|amp|a t|nta|and|e p|rga|pen|yar|mpo|ste|dra|ok |oko|ila|g p|k b|i b|set|to |isa|nao|nna|n m|ett| a |bis|hid|bin|i m|nas| ho|kar|t s| po|dil| to|aju|ika|kom|arg|ant|raj|a l|das|tto|ost|mos|lae|ga |rek|idh|tad|hig|en |rny|arn|ndh|eta|adu| dr|jat|jua|gam",
    "nya": "ndi|ali|a k|a m| ku| nd|wa |na |nth| mu| al|yen|thu|se |ra |nse|hu |di |a n|la | pa|mun| wa|nga|unt| la|a u|u a|e a|ons|za | ma| lo|iye|ace|ce |a l|idw|ang| ka|kha|liy|ens|li |ala|ira|ene|pa |i n|we |e m|ana|dwa|era|hal|ulu|lo |ko |dzi| ci|yo |o w|iko|ga |a p|chi| mo|lu |o l|o m|oyo|ufu| um|moy|zik| an|ner|and|umo|ena| uf|dan|iri|ful|a a|ka |to |hit|nch| nc|a c|ito|fun|dwe| da|kuk|wac| dz|e l|a z|ape|kap|u w|e k|ere|ti |lir| za|pen|tha|aye|kut|mu |ro |ofu|ing|lid| zo|amu|o c|i m|mal|kwa|mwa|o a|eza|i p|o n|so |i d|lin|nso| mw|iro|zo | a |ati| li|i l|a d|ri |edw|kul|una|uti|lan|a b|iki|i c|alo|i k| ca|lam|o k|dza|ung|o z|mul|ulo|uni|gan|ant|nzi| na|nkh|e n|san|oli|wir|tsa|u k|ome|ca |gwi|unz|lon|dip|ipo|yan|gwe|pon|akh|uli|aku|mer|ngw|cit| po| ko|kir|mba|ukh|tsi|bun|iya|ope|kup|bvo|han| bu|pan|ame|vom|ama| ya|siy| am|rez|u n|zid|men|osa|ao |pez|i a| kw| on|u o|lac|ezo|aka|nda|hun|u d|ank|diz|ina|its|adz| kh|ne |nik|e p|o o|ku |phu|eka| un|eze|mol|ma | ad|pat|oma|ets|wez|kwe|kho|ya |izo|sa |o p|kus|oci|khu|okh|ans|awi|izi|zi |ndu|iza|no |say| si|i u|aik|jir|ats|ogw|du |mak|ukw|nji|mai|ja |sam|ika|aph|sid|isa|amb|ula|osi|haw|u m| zi|oye|lok|win|lal|ani| ba|si | yo|e o|opa|ha |map|emb",
    "zyb": "bou|aeu|enz|nz |eng|iz |ih |uz |uq |oux|ing| bo| di| ca|z g|dih|ux |ngh|cae|gen|euq|z c|you|ng |ung|ngz|ij | gi| mi|miz|aen| ge|z d| ci|gya| yi| de|ouj|uj | gu|cin|ngj|ien|mbo|dae| mb|zli| se|gij|j g|ang|ouz|z y|j d|nae| cu| ba| da|h g|oz |yin|de |z b|nzl|li |nj |euz|x m| cw|iq | yo|gz |q g|yau|inh|vun|x b|h c| ga|ix |cwy|wyo| ro|rox|oxn|vei|nda|i c| nd|z m|gh |j b|wz | si| gy|hoz|unz|xna|cun|gue| li|ei |z h|yen|bau|can|inz|q c|dan| hi|gj |uh |yie| vu|faz|hin| bi|uek|goz|zci|nh |aej|ya |ej | fa|gun|ciz|au | go| ae|h m|ngq|den|gva|ouq|nq |z s|q d|ekg|q s| do|h d|kgy|eix| wn|ci |az |hu |nhy| ha|j c|u d|j n|z l|auj|gai|gjs|lij|eve|h s|sen|sin|sev|ou |sou|aiq|q y|h y|jso|bin|nei| la|en |ouh|din|uen|enj|enh|i b|z r|awz|q n|vih|j y|anj|bwn|sei|z n| ne|ozc|hye|j s|i d|awj|liz|g g|bae|wng|g b|eiq|bie|enq|zda| ya|n d|h f|x d|gak|hix|z v|h b|oen|anh|u c|in |i g|ghc|zsi|hci|siz|anz|ghg|ez |dun|cou| du|ngg|ngd|j m|cuz| ho|law|eiz|g c| dw|aw |g d|izy|hgy|ak |nde|min|dei|gda|ujc|wn |env|auy|iuz|ai |wnj|a d|hen|ozg|nzg|ek |g y|gzd|gzs|yaw|e c|yuz|daw|giz|jhu|ujh| co|nvi|guh|coz| ve| he|i m|sae|aih|x l|iet|iuj|dwg|iqg|qgy|gih|yai| na| fu|uyu|zbi|zdi|q b|cie|inj|zge|wnh|jsi|uzl| bu| le|eij|izc|aq ",
    "kin": "ra | ku| mu|se |a k|ntu|nga|tu |umu|ye |li | um|mun|unt|a n|ira| n |ere|wa |we | gu|mu |ko |a b|e n|o k|e a|a u|a a|u b|e k|ose|uli|aba|ro | ab|gom|e b|ba |ugu| ag|omb|ang| ib|eng|mba|o a|gu | ub|ama| by| bu|za |ihu|ga |e u|o b| ba|kwi|hug|ash|ren|yo |ndi|e i| ka| ak| cy|iye| bi|ora|re |gih|igi|ban|ubu| nt| kw|di |gan|a g|a m|aka|nta|aga| am|a i|ku |iro|i m|ta |ka |ago|byo|ali|and|ibi|na |uba|ili| bw|sha|cya|u m|yan|o n| ig|ese|no |obo|ana|ish|kan|sho| we|era|ya |aci|wes|ura|i a|uko|e m|n a|o i|kub|uru|hob|ber|ran|bor| im|ure|u w|wo |cir|gac|ani|bur|u a|o m|ush| no|e y| y |rwa|eke|nge|ara|wiy|uga|zo |ne |ho |bwa|yos|anz|aha|ind|mwe|teg|ege|are|ze |n i|rag|ane|u n|ge |mo |u k|bul| uk|bwo|bye|iza|age|ngo|u g|gir|ger|zir|kug|ite|bah| al| ki|uha|go |mul|ugo|n u|tan|guh|y i| ry|gar|bih|iki|atu|ha |mbe|bat|o g|akw|iby|imi|kim|ate|abo|e c|aho|o u|eye|tur|kir| ni|je |bo |ata|u u| ng|shy|a s|gek| ru|iko| bo|bos|i i| gi|nir|i n|gus|eza|nzi|i b|kur| ya|o r|ung|rez|ugi|ngi|nya| se|mat|eko|o y| in|uki| as|any|bis|ako|gaz|imw|rer|bak|ige|mug|ing|byi|kor|eme|nu | at|bit| ik|hin|ire|kar|shi|yem|yam| yi|gen|tse|ets|ihe|hak|ubi|key|rek|icy| na|bag|yer| ic|eze|awe|but|irw| ur|fit|ruk|ubw|rya|uka|afi",
    "zul": "nge|oku|lo | ng|a n|ung|nga|le |lun| no|elo|wa |la |e n|ele|ntu|gel|tu |we |ngo| um|e u|thi|uth|ke |hi |lek|ni |ezi| ku|ma |nom|o n|pha|gok|nke|onk|a u|nel|ulu|oma|o e|o l|kwe|unt|ang|lul|kul| uk|a k|eni|uku|hla| ne| wo|mun| lo|kel|ama|ath|umu|ho |ela|lwa|won|zwe|ban|elw|ule|a i| un|ana|une|lok|ing|elu|wen|aka|tho|aba| kw|gan|ko |ala|enz|o y|khe|akh|thu|u u|na |enk|kho|a e|zin|gen|i n|kun|alu|mal|lel|e k|nku|e a|eko| na|kat|lan|he |hak| ez|o a|kwa|o o|ayo|okw|kut|kub|lwe| em|yo |nzi|ane|obu| ok|eth|het|ise|so |ile|nok| ba|ben|eki|nye|ike|i k|isi| is|aph|esi|nhl|mph| ab|fan|e i|isa| ye|nen|ini|ga |zi |fut| fu|uba|ukh|ka |ant|uhl|hol|ba |and|do |kuk|abe|za |nda| ya|e w|kil|the| im|eke|a a|olo|sa |olu|ith|kuh|o u|ye |nis| in|ekh|e e| ak|i w|any|khu|eng|eli|yok|ne |no |ume|ndl|iph|amb|emp| ko|i i| le|isw|zo |a o|emi|uny|mel|eka|mth|uph|ndo|vik| yo|hlo|alo|kuf|yen|enh|o w|nay|lin|hul|ezw|ind|eze|ebe|kan|kuz|phe|kug|nez|ake|nya|wez|wam|seb|ufa|bo |din|ahl|azw|fun|yez|und|a l|li |bus|ale|ula|kuq|ola|izi|ink|i e|da |nan|ase|phi|ano|nem|hel|a y|hut|kis|kup|swa|han|ili|mbi|kuv|o k|kek|omp|pho|kol|i u|oko|izw|lon|e l| el|uke|kus|kom|ulo|zis|hun|nje|lak|u n|huk|sek|ham| ol|ani|o i|ubu|mba| am",
    "swe": " oc|och|ch |er |ing|för|tt |ar |en |ätt|nde| fö|rät|ill|et |and| rä| en| ti| de|til|het|ll |de |om |var|lig|gen| fr|ell|ska|nin|ng |ter| ha|as | in|ka |att|lle|der|sam| i |und|lla|ghe|fri|all|ens|ete|na |ler| at|ör |den| el|av | av| so|igh|r h|nva|ga |r r|env|la |tig|nsk|iga|har|t a|som|tti| ut|ion|t t|a s|nge|ns |a f|r s|män|a o| sk| si|rna|isk|an | st|är |ra | vi| al|t f| sa|a r|ati| är| me| be|n s| an|tio|nna|lan|ern|t e|med| va|ig |äns| åt|sta|ta |nat| un|kli|ten| gr|vis|äll| la|one|han|änd|t s|stä|t i|ner|ans|gru| ge|ver| må| li|lik|ihe|ers|rih|r a| re|må |sni|n f|t o| mä| na|r e|ri |ad |ent|kla|det| vä|run|rkl|da |h r|upp|dra|rin|igt|dig|n e|erk|kap|tta|ed |d f|ran|e s|tan|uta|nom|lar|gt |s f| på| om|kte|lin|r u|vid|g o|änn|erv|ika|ari|a i|lag|rvi|id |r o|s s|vil|r m|örk|ot |ndl|str|els|ro |a m|mot| mo|i o|på |r d|on |del|isn|sky|e m|ras| hä|r f|i s|a n|nad|n o|gan|tni|era|ärd|a d|täl|ber|nga|r i|enn|nd |n a| up|sin|dd |örs|je |itt|kal|n m|amt|n i|kil|lse|ski|nas|end|s e| så|inn|tat|per|t v|arj|e f|l a|rel|t b|int|tet|g a|öra|l v|kyd|ydd|rje| fa|bet|se |t l|lit|sa |när|häl|l s|ndr|nis|yck|h a|llm|lke|h f|arb|lmä|nda|bar|ckl|v s|rän|gar|tra|re |ege|r g|ara|ess|d e|vär|mt |ap ",
    "lin": "na | na| ya|ya |a m| mo|a b|to | ko| bo|li |o n| li|i n| pe|i y|a y|a n|ngo|ki | ba| ma|kok|pe |la |a l|zal|oki|ali|nso|oto|ala|ons|so |mot|a k|nyo|eng|kol|go |nge| ny|yon|o e|ang|eko|te |o y|oko|olo|ma |iko|a e|e m|e b|lik|ko |o a|ako|ong| ye|mak|ye |isa| ek|si |lo |aza|sal|ama| te|bat|o p|oyo|e n| az|a p|ani|sen|o m|ela|ta |amb|i k|ban|ni | es|yo |mi |mba|osa| oy|aka|lis|i p|eli|a t|mok|i m|ba |mbo| to| mi|isi|bok|lon|ato|ing|o b| nd|ota|bot| ez|ge |nga|eza|o t|nde|ka |bo |gel|kan|e k|lam|sa |ese|koz| po|den|ga |oba|omb|oli|yan|kop|bon|mos|e e|kob|oka|kos|bik|lin|po |e a| lo| bi|kot|’te|ngi|sam| ’t|omi|e y|ti |i b| el|elo|som|lok|esa|gom|ate|kam|i t|ika|a s|ata|kat|ati|wa |ope|oza|iki|i e| ka|bom|tal|o l|bek|zwa|oke|pes| se|bos|o o|ola|bak|lak|mis|omo|oso|nza| at|nda|bal|ndi|mu |mob|osu|e t|asi|bis|ase|i l|ele|sus|usu|su |ozw|and|mol|tel|lib|mbi|ami| nz|ne |ene|kel|aye|emb|yeb|nis|gi |obo|le |kum|mal|wan|a ’|pon| ep|baz|tan|sem|nya|e l| ta|gis|opo|ana|ina|tin|obe| ti|san| ak|mab|bol|oku|u y|mat|oti|bas|ote|mib|ebi|a o|da |bi | mb|lel|tey|ibe|eta|boy|umb|e p|eni|za |be |mbe|bwa|ike|se | et|ibo|eba|ale|yok|kom| en|i a|mik|ben|i o| so|gob|bu |son|sol|sik|ime|eso|abo| as|kon|eya|mel",
    "som": " ka|ay |ka |an |uu |oo |da |yo |aha| iy|ada|aan|iyo|a i| wa| in|sha| ah| u |a a| qo|ama| la|hay|ga |ma |aad| dh| xa|ah |qof|in | da|a d|aa |iya|a s|a w| si| oo|isa|yah|eey|xaq|ku | le|lee| ku|u l|la |taa| ma|q u|dha|y i|ta |aq |eya|sta|ast|a k|of |ha |u x|kas|wux| wu|doo|sa |ara|wax|uxu| am|xuu|inu|nuu|a x|iis|ala|a q|ro |maa|o a| qa|nay|o i| sh| aa|kal|loo| lo|le |a u| xo| xu|o x|f k| ba|ana|o d| uu|iga|a l|yad|dii|yaa|si |a m|gu |ale|u d|ash|ima|adk|do |aas| ca|o m|lag|san|dka|xor|adi|add| so|o k| is|lo | mi|aqa|na | fa|soo|baa| he|kar|mid|dad|rka|had|iin|a o|aro|ado|aar|u k|qaa| ha|ad |nta|o h|har|axa|quu| sa|n k| ay|mad|u s| ga|eed|aga|dda|hii|aal|haa|n l|daa|xuq|o q|o s|uqu|uuq|aya|i k|hel|id |n i| ee|nka| ho|ina|waa|dan|nim|elo|agu|ihi|naa|mar|ark|saa|riy|rri|qda|uqd| bu|ax |a h|o w|ya |ays|gga|ee |ank| no|n s|oon|u h|n a|ab |haq|iri|o l| gu|uur|lka|laa|u a|ida|int|lad|aam|ood|ofk|dhi|dah|orr|eli| xi|ysa|arc|rci|to |yih|ool|kii|h q|a f| ug|ayn|asa| ge|sho|n x|siy|ido|a g|gel|ami|hoo|i a|jee|n q|agg|al | di| ta|e u|o u| ji|goo|a c|sag|alk|aba|sig| mu|caa|aqo|u q|ooc|oob|bar|ii |ra |a b|ago|xir|aaq| ci|dal|oba|mo |iir|hor|fal|qan| du|dar|ari|uma|d k|ban|y d|qar|ugu| ya|xay|a j",
    "hms": "ang|gd |ngd|ib | na|nan|ex |id | ji|ad |eb |nl |b n|d n| li|ud |jid| le|leb| ga|ot |anl|aot|d g|l l|b l| me|ob |x n|gs |ngs|mex|nd |d d| ne|jan|ul | ni|nja| nj| gu| zh|lib|l n|ong| gh|gao|b j|b g|nb |l g|end|gan| ad| je|jex|ngb|gb |han|el | sh| da|ub |d j|d l|t n| nh|nha|b m|is |d z|x g| ya|oul|l j| wu|she|il |nex| ch|b y|d s|gue|gho|uel|wud|d y| gi|d b|hob|nis|s g| zi| yo|lie|es |nx |it |aob|gia|ies| de|eib|you| ba| hu|ian|zib|d m|s j|oud|b d|chu|ol |ut | do|t j|nen|hud|at |s n|hen|iad|ab |enl| go|dao| mi|t g|zha|b z|enb|x j| ze|eit|hei|d c|nt |b s| se|al | xi|inl|hao| re| fa|d h|gua|yad|ren| ho|anb|gx |ngx|ix |nib|x z|and|b h|b w|fal| xa|d x|t l|x m|don|gou|bao|ant|s z|had|d p|yan|anx|l d|zhe|hib| pu|ox | du|hui|sen|uib|uan|lil|dan|s m| di| we|gha|xin|b x|od |zhi|pud| ju| ng|oub|xan| ge|t z|hub|t h|hol|t m|jil|hea|x l| ma|eud|jul|enx|l z|l s|b a| lo| he|nga|d r|zen| yi|did|hon|zho|gt |heb|ngt|os |d a|s l|aos| si|dei|dud|b b|geu|wei|d w|x c|x b|d k|dou|l h|lou| bi|x a|x d|b c| sa|s a| bo|eut|blo| bl|nia|lol|t w|bad|aod| qi|ax |deb| ja|eab| nd|x s|can|pao| pa|gl |ngl|che|sat|s y|l m|t s|b f|heu|s w| to|lia| ca|aox|unb|ghu|ux | cu|d f|inb|iel| pi|jib|t p|x x|zei|eul|l t|l y|min|dad",
    "hnj": "it | zh| ni|ab |at | sh|ang|nit|os | do|uat|ox |ax |nx |ol |ob | nd|t d|x n|nf |zhi|as | ta|tab|ef |if |d n|ad | mu| cu|uax|cua|mua|b n|uf |ib |s d|dos|id |enx|nb |hit| lo|f n|t l|ngd|gd |us |inf|ux |ed | go|she|b d|b z|t n| ho|x z| yi|aob|l n|ong|t z| zi|ix |nda|d z|ut |yao|uab|enb| de|dol|f g| dr|zhe| yo| le|euf|x d|inx|nen|das| ne|dro|gb |ngb|d s| ge|hox|f z|uef|s n|len|b g| ua|ud |nd |gox| na|il | du|x j|oux|f y|f h|ndo|x c|han|of |zha|uad|s z| da| ny| ja| gu|heu| ji|ik | bu|shi|lob|od | ya|gf |t g|hai|ged|ngf|b h|you| hu|ex |bua|out|nil|hen|rou|yin|zhu|ous|nya|enf|f d|is | re|b c|lol|nad|dou|af | xa| id|t s| ha|uk |jai|xan|sha|b y|hua|aib|s s|d d| la| qi|ren|x l|hue|l m|x g|ot | xi| ba| zo| kh| dl|jua| ju|aod|zif|ait|bao| di| ga|x y| nz|b s|x s|xin| li|aof|b b|ngx|gx |eb |b l|x t|x m|hed| be|dax|b t|s t|hef|las|d j|gua| pi|t y|f b|d l|l d|nzh| ib|hif|t h|dus|t r|hou|f l|hun|und|s l|el |aik|d y|aos|f t| mo| bi|hab|ngt|gai| za|uas|x h|gt | zu|ros|aid|zos| gh|end|pin|k n|k z| ao|iao|s b|dex|x b|due|ak |d g| fu|s x|deu|s y|mol|x i|f s|hik| hl| bo|l b|eut|lb |uaf|zho|d b| lb|s m|lan|al |b k|t b| ch|d p|x x|f x|ub |t c|d m| ro| nt|d h|et |uak|aox|gon|tua|yua|t t|zis|deb|d t| we|shu",
    "ilo": "ti |iti|an |nga|ga | ng| pa| it|en | ka| ke| ma|ana| a | ti|pan|ken|agi|ang|a n|a k|aya|gan|n a|int|lin|ali|n t|a m|dag|git|a a|i p|teg|a p| na|nte|man|awa|kal|da |ng |ega|ada|way|nag|n i| da|na |i k|sa |n k|ysa|n n|no |a i|al |add|aba| me|i a|eys|nna|dda|ngg|mey| sa|pag|ann|ya |gal| ba|mai| tu|gga|kad|i s|yan|ung|nak|tun|wen|aan|nan|aka| ad|enn| ag|asa| we|yaw|i n|wan|nno|ata| ta|l m|i t|ami|a t| si|ong|apa|kas|li |i m|ina| an|aki|ay |n d|ala|gpa|a s|g k|ara|et |n p|at |ili|eng|mak|ika|ama|dad|nai|g i|ipa|in | aw|toy|oy |ao |yon|ag |on |aen|ta |ani|ily|bab|tao|ket|lya|sin|aik| ki|bal|oma|agp|ngi|a d|y n|iwa|o k|kin|naa|uma|daa|o t|gil|bae|i i|g a|mil| am| um|aga|kab|pad|ram|ags|syo|ar |ida|yto|i b|gim|sab|ino|n w| wa| de|a b|nia|dey|n m|o n|min|nom|asi|tan|aar|eg |agt|san|pap|eyt|iam|i e|saa|sal|pam|bag|nat|ak |sap|ed |gsa|lak|t n|ari|i u| gi|o p|nay|kan|t k|sia|aw |g n|day|i l|kit|uka|lan|i d|aib|pak|imo|y a|ias|mon|ma | li|den|i g|to |dum|sta|apu|o i|ubo|ged|lub|agb|pul|bia|i w|ita|asy|mid|umi|abi|akd|kar|kap|kai| ar|gin|kni| id|ban|bas|ad |bon|agk|nib|o m|ibi|ing|ran|kda|din|abs|iba|akn|nnu|t i|isu|o a|aip|as |inn|sar| la|maa|nto|amm|idi|g t|ulo|lal|bsa|waw|kip|w k|ura|d n|y i"
  },
  "Cyrillic": {
    "rus": " пр| и |рав|ств| на|пра|го |ени|ове|во | ка|ани|ть | в | по| об|ия |сво| св|лов|на | че|ело|о н| со|ост|чел|ие |ого|ет |ния|ест|аво|ый |ажд| им|ние|век| не|льн|ли |ова|име|ать|при|т п|и п|каж|или|обо| ра|ых |жды| до|дый|воб|ек |бод|ва |й ч|его|ся |и с|ии |аци|еет|но |мее|и и|лен|ой |тва|ных|то | ил|к и|енн| бы|ию | за|ми |тво|и н|о п|ван|о с|сто|аль| вс|ом |о в|ьно|их |ног|и в|нов|ако|про|ий |сти|и о|пол|олж|дол|ое |бра|я в| ос|ным|жен|раз|ти |нос|я и| во|тор|все| ег|ей |тел|не |и р|ред|ель|тве|оди| ко|общ|о и| де|има|а и|чес|ним|сно|как| ли|щес|вле|ься|нны|аст|тьс|нно|осу|е д| от|пре|шен|а с|бще|осн|одн|быт|сов|ыть|лжн|ран|нию|иче|ак |ым |ват|что|сту|чен|е в| ст|рес|оль| ни|ном|род|ля |нар|вен|ду |оже|ны |е и| то|вер|а о|зов|м и|нац|ден|рин|туп|ежд|стр| чт|я п|она|дос|х и|й и|тоя|есп|лич|бес|обр|ото|о б|ьны|ь в|нии|е м|ую | мо|ем | ме|аро| ре|ава|кот|ав | вы|ам |жно|ста|ая |под|и к|ное| к | та| го|гос|суд|еоб|я н|ен |и д|мож|еск|ели|авн|ве |ече|уще|печ|дно|о д|ход|ка | дл|для|ово|ате|льс|ю и|в к|нен|ции|ной|уда|вов| бе|оро|нст|ами|циа|кон|сем|е о|вно| эт|азо|х п|ни |жде|м п|ког|от |дст|вны|сть|ые |о о|пос|сре|тра|ейс|так|и б|дов|му |я к|нал|дру| др|кой|тер|ь п|арс|изн|соц|еди|олн",
    "ukr": "на | пр| і |пра|рав| на|ня |ння| за|ого| по|ти |го |люд| лю|во | ко| ма|льн|юди|их |о н| не|аво|анн|дин| св|сво|ожн|кож|енн|пов|жна| до|ати|ина|ає |а л| бу|аці|не |ува|обо| ос| як|має| ви|них|аль|або|є п| та|ні |ть |ови|бо | ві| аб|ере|і п|а м|вин|без|при|іль|ног|о п|ми |та |ом |ою |бод|ста|воб| бе|до |ва |ті | об|о в|ост| в | що|ий |ся |і с| сп|инн|від|ств|и п|ван|нов|нан|кон| у |ват|она|ії |но |дно|ій |езп|пер| де|ути|ьно|ист|під|сті|бут| мо|и і|ідн|ако|нні|ід |тис|що |род|і в|а з|ава| пе|му |і н|а п|соб|ої |а в|спр|ів |ний|яко|ду |вно|і д|ну |аро|и с| ін|ля |рів|у в| рі|и д|нар|нен|ова|ому|лен|нац|ним|ися|чи |ав |і р|ном| ро|нос|ві |вни|овн| її|ові|мож|віл|у п| пі| су|її |одн| вс|ово|ють|іст|сть|і з| ст|буд| ра|чен|про|роз|івн|оду|а о|ьни|ни |о с|сно|зна|рац|им |о д|ими|я і|ції|х п|дер|чин| со|а с|ерж|и з|и в|е п|ди |заб|осо|у с|е б|сі |тер|ніх|я н|і б|кла|спі|в і| ні|о з|ржа|сту|їх |а н|нна|так|я п|зпе| од|абе|для|ту |і м|печ| дл|же |ки |віт|ніс|гал|ага|е м|ами|зах|рим|ї о|тан|ког|рес|удь| ре|то |ков|тор|ара|сві|тва|а б|оже|соц|оці|ціа|осн|роб|дь‐|ь‐я|‐як|і і|заг|ахи|хис|піл|цій|х в|лив|осв|іал|руч|ь п|інш|в я|ги |аги| ді|ком|ини|а і|оди|нал|тво|кої|всі|я в|ною|об |о у|о о|і о",
    "bos": " пр| и |рав| на|пра|на |да |ма |има| св|а с|а п| да|а и| по|је |во |ко |ва | у |ако|но |о и|е с| за| им|аво|ти |ава|сва|и п|ли |о н|или|и с|их |вак| ко|ост|а у| сл|не |вањ| др|ње | не|кој|ња | би|ије|и д|им |ств|у с|јед|бод|сло|лоб|обо| ил|при| је|ање| ра|а д| об| су|е и|вје|се |ом |и и|сти| се|ју |дру|а б| ос|циј|вој|е п|а н|раз|су |у п|ања|о д|ује|а о|у и| од|и у|ло |ова|дје|жав|оје|а к|ни |ово|едн|ити|аци|у о|о п|нос|и о|бра| ка|шти|а ј|них|е о|пре|про|ржа| бу|буд|тре| тр|ог |држ|бит|е д|у з|ја |ста|авн|ија|е б|миј|и н|реб|сво|ђи |а з|ве |бил|ред|род|аро|ило|ива|ту |пос| ње| из|е у|ају|ба |ка |ем |ени|де |јер|у д|одн|њег|ду |гов|вим|јел|тва|за | до|еђу|ним| са|нар|а т| ни|о к|оји|м и| см| ст|еба|ода|ран|у н|дна|ичн|уђи|ист|вно|алн|и м| дј|нак|нац|сно|нст|тив|ани|ено|е к|е н|аве|ан |чно|и б|ном|сту|нов|ови|чов|нап|ног|м с|ој |ну |а р|еди|овј|оја|сми|осн|анс|ара|дно|х п|под|сам|обр|о о|руг|тво|ји | мо|его|тит|ашт|заш| кр|тељ|ико|уна|ник|рад|оду|туп|жив| ми|јек|кри| ов| вј| чо|ву |г п| оп|међ|њу |рив|нич|ина|одр|е т|уду| те|мје|ење|сви|а ч|у у|ниц|дни| та|и т|тно|ите|и в|дст|акв|те |ао | вр|ра |вољ|рим|ак |иту|ави|кла|вни|амо| он|ада|ере|ена|сто|кон|ст |она|иво|оби|оба|едс|как|љу ",
    "srp": " пр| и |рав|пра| на|на | по|ма | св|да |има|а п|а и|во |ко |ва |ти |и п| у |ако| да|а с|аво|и с|ост| за|о и|сва| им|вак|ава|је |е с| сл| ко|о н|ња |но |не | не|ом |ли | др|или|у с|сло|обо|кој|их |лоб|бод|им |а н|ју | ил|ств| би|сти|а о|при|а у| ра|јед|ог | је|е п|ње |ни |у п|а д|едн|ити|а к|нос|и у|о д|про| су|ање|ова|е и|вањ|и и|циј| ос|се |дру|ста|ају|ања|и о| об|род|ове| ка| де|е о|аци|ја |ово| ни| од|и д| се|ве |ује|ени|ија|авн|жав| ст|у и|м и|дна|су |ред|и н|оја|е б|ара|што|нов|ржа|вој|држ|тва|оди|у о|а б|одн|пош|ошт|ним|а ј|ка |ран|у у| ов|аро|е д|сно|ења|у з|раз| из|осн|а з|о п|аве|пре|де |бит|них|шти|ву |у д|ду |ту | тр|нар| са|гов|за |без|оји|у н|вно|ичн|еђу|ло |ан |чно|ји |нак|ода| ме|вим|то |сво|ани|нац| ње|ник|њег|тит|ој |ме |ном|м с|е у|о к|ку | до|ика|ико|е к|пос|ашт|тре|алн|ног| вр|реб|нст| кр|сту|дно|ем |вар|е н|рив|туп|жив|те |чов|ст |ови|дни|ао |сме|бра|ави| ли|као|вољ|ило|о с|штв|и м|заш|њу |руг|тав|анс|ено|пор|кри|и б|оду|а р|ла | чо|а т|руш|ушт| бу|буд|ављ|уги|м п|ком|оје|вер| ве|под|и в|међ|его|вре|акв|еди|тво| см|од |дел|ена|рад|ба | мо|ну |о ј|дст|кла| оп|как|сам|ере|рим|вич|ива|о о| он|вни|тер|збе|х п|ниц|еба|е р|у в|ист|век|рем|сви|бил|ште|езб|јућ|њен|гла",
    "uzn": "лар|ан |га |ар | ва| би|да |ва |ир | ҳу|ига|уқу|бир|ҳуқ|қуқ|ган| ҳа|ини|нг |р б|иш | та|ни |инг|лик|а э|ида|или|лиш|нин|ари|иши| ин|ади|он |инс|нсо|сон|ий |лан|дир| ма|кин|и б|ши |ҳар| бў|бўл| му|дан|уқи|ила|қла|р и|қиг|эга| эг| ўз|ки |эрк|қил|а б|оли|кла| эр|гад|лга|нли| ол|рки|и ҳ| ёк|ёки| қа|иб |иги|лиг|н б|н м| қи| ба|ара|атл|ри | бо|лат|бил|ин |ҳам|а т|лаш|р ҳ|ала| эт|инл|ик |бош|ниш|ш ҳ|мас|и в|эти|тил|тла|а ҳ|и м|а қ|уқл|қар|ани|арн|рни|им |ат |оси|ўли|ги | да|а и|н ҳ|риш|и т|мла|ли | ха|а м|ият| бу|рла|а а|рча|бар|аси|ўз |арч|ати|лин|ча |либ|мум| ас|аро|а о|ун |таъ| бе| ту|икл|р в|тга|тиб| ке|н э|ш в|мда|амд|али|н қ|мат|шга| те|сид|лла|иро| шу| қо|дам|а ш|ирл|илл|хал|рга| де|ири|тиш|умк|ола|амл|мки|тен|гин|ур |а ў|рак|а ё|имо| эъ|алқ| са|енг|тар|рда|ода| ша|шқа|ўлг|кат|сий|ак |н о|зар|и қ|ор | ми|нда|н в| си|аза|ера|а к|тни|р т|мил| ки|к б|ана|ам |ошқ|рин|сос|ас | со|сиз|асо|нид|асл|н ў|н т|илг|бу |й т|ти |син|дав|шла|на |лим|қон|и а|лак|эма|муҳ|ъти|си |бор|аш |и э|ака|нга|а в|дек|уни|екл|ино|ами| жа|риг|а д| эм|вла|лма|кер| то|лли|авл| ка|ят |н и|аъл|чун|анл|учу| уч|и с|аёт| иш|а у|тда|мия|а с|ра |ўзи|оий|ай |диг|эът|сла|ага|ник|р д|ция| ни|и ў|ада|рор|лад|сит|кда|икд|ким",
    "azj": " вә|вә |әр |лар| һә|ин |ир | ол| һү| би|һүг|үгу|гуг|на |ләр|дә |һәр| шә|бир|ан | тә|лик|р б|мал|лма|асы|ини|р һ|шәх|ән |әхс|ары|гла|дир|а м|али|угу|аг | ма|ын |илә|уна|јәт| ја|икд|ара|ар |әри|әси|рин|әти|р ш|нин|дән|јјә|н һ| аз|ни |әрә| мә|зад|мәк|ијј| мү|син|тин|үн |олу|и в|ндә|гун|рын|аза|нда|ә а|әт |ыны|нын|лыг|илм| га| ет|ә ј|кди|әк |лә |лмә|олм|ына|инд|лун| ин|мас|хс |сын|ә б|г в|н м|адл|ја |тмә|н т|әми|нә |длы|да | бә|нун|бәр|сы | он|әја|ә һ|маг|дан|ун |етм|инә|н а|рлә|си | ва|ә в|раг|н б|ә м|ама|ры |н и|әра|нма|ынд|инс| өз|аны|ала| ал|ик |ә д|ләт|ирл|ил | ди|бил|ығы|ли |а б|әлә|дил|ә е|унм|алы|мүд| сә|ны |ә и|н в|ыг |нла|үда|аси|или| дә|нса|сан|угл|уг |әтл|ә о|хси| һе|ола|кил|ејн|тәр|јин| бу|ми |мәс|дыр|һәм| да|мин|иш | һа| ки|у в|лан|әни| ас|хал|бу |лығ|р в| ед|јан|рә |һеч|алг| та|еч |и с|ы һ|сиа|оси|сос|фиә|г һ|афи|ким|даф| әс|ә г| иш|н ә|ији|ыгл|әмә|ы о|әдә|әса| со|а г|лыд|илл|мил|а һ|ыды|сас|лы |ист| ис|ифа|мәз|ыр |јар|тлә|лиј|түн|ина|ә т|сиј|ал |рил| бү|иә |бүт| үч|үтү|өз |ону| ми|ија| нә|адә|ман|үчү|чүн|сеч|ылы|т в| се|иал|дах|сил|еди|н е|әји|ахи|хил| ҹә|миј|мән|р а|әз |а в|илд|и һ|тәһ|әһс|ы в|һси|вар|шәр|абә|гу |раб|аја|з һ|амә|там|ғын|ад |уғу|н д|мәһ|тәм| ни|и т| ха",
    "koi": "ны |ӧн | бы|да | пр|пра|рав| мо|лӧн| да|быд|лӧ |орт|мор|ӧм |аво|ӧй | ве|ыд | не|нӧй|ыс |ын |сӧ |тӧм|сь |во |эз |льн|ьнӧ|тны|д м| ас|ыны|м п| по|сьӧ| и |то |бы | ӧт| эм| кы|аль|тлӧ|н э| от|вер|эм | кӧ|ртл|ӧ в| ко|воэ|ств|ерм|тшӧ| до|ола|ылӧ|вол|ас |ӧдн|кыт|ісь|ето|нет|тво|ліс|кӧр|ӧс | се|ы с|шӧм|а с|та |злӧ| ме| ол|аци|ӧ к|ӧ д|мед| вы|вны|а в|на |з в| на|ӧ б|лас|ӧрт| во| вӧ| сі|лан|рмӧ|дбы|едб|ыдӧ|оз |ась| оз| сы|ытш|олӧ|оэз|тир|с о| чу|ы а|оти|ция|ись|ӧтл| эт|рты| го|ы п|ы б|кол|тыс|сет| сь|рті|кӧт|о с|н б|дз |н н| мы| ке|кер|тӧн|тӧг|ӧтн|ис |а д|мӧ |ост|ӧ м| со|онд|нац|дӧс|итӧ|ест|выл| ви|сис|эта| уд|суд|нӧ |удж|ӧг |пон|ы н|н п|мӧд|а п|орй|ӧны|ӧмӧ|н м|ть |сыл|ана|ті |нда|рны|сси|рре|укӧ|з к|чук|йын|рез| эз|ысл|ӧр |ьӧр|с с|с д|рт |с в|езл|кин|осу|эзл|й о|отс| тӧ|ы д| ло| об|овн|лӧт|асс|кӧд|с м|ӧ о|нал|быт|она|ӧт |слӧ|скӧ|кон|тӧд|ытӧ|дны|а м|ы м|нек|ы к|ӧ н|асл|дор|ӧ п| де| за|а о| ов|сть|тра| дз|ь к|ӧтч|н к| ст|аса|етӧ|ьны|мӧл|умӧ|сьн| ум|ерн|код| пы|тла|оль|иал|а к|н о| сэ|а н|ь м|кыд|циа|са | ли|а б|езӧ|й д| чт|ськ|эсӧ|ион|еск|ӧ с|оци|что|ан |соц|йӧ |мӧс|тко|зын|нӧя|вес|енн| мӧ|ӧтк|ӧсь|тӧ |рлӧ|ӧя |оля|рйӧ|ӧмы|гос|тсӧ|зак|рст|з д|дек|ннё|уда|пыр|еки|ако|озь| а |исӧ|поз|дар|арс|ы ч",
    "bel": " і | пр|пра|ава| на|на | па|рав|ны |ць |або| аб|ва |ацы|аве|ае | ча|ння|анн|льн| ма| св|сва|ала|не |чал|лав|ня |ай |ых | як|га |век|е п| ад|а н| не|пры|ага| ко|а п| за|кож|ожн|ы ч|бод|дна|жны|ваб|цца|ца | ў |а а|ек |мае|і п|нне|ных|асц|а с|пав|бо |ам |ста| са| вы|ван|ьна| да|ара|дзе|одн|го |наг|він|аць|оўн|цыя|мі |то | ра|і а|тва| ас|ств|лен|аві|ад |і с|енн|і н|аль|най|аво|рац|аро|ці |сці|пад|ама| бы| яг|яго|к м|іх |рым|ым |энн|што|і і|род| та|нан| дз|ні |я а|гэт|нас|ана| гэ|інн|а б|ыць|да |ыі |оў |чын| шт|а ў|цыі|які|дзя|а і|агу|я п|ным|нац| у | ўс|ыя |ьны|оль|нар|ўна|х п|і д|ў і| гр|амі|ымі|ах | ус|адз| ні|эта|ля |воў|ыма|рад|ы п|зна|чэн|нен|аба| ка|ўле|іна|быц|ход| ін|о п| ст|ера|уль|аў |асн|сам|рам|ры | су|нал|ду |ь с|чы |кла|аны|жна|і р|пер|і з|ь у|маю|ако|ыцц|яко|для|ую |гра|ука|е і|нае|адс|і ў|кац|ўны|а з| дл|яўл|а р|аюч|ючы|оду| пе| ро|ы і|вы |і м|аса|е м|аду|х н|ода|адн|нні|кі | шл|але|раз|ада|х і|авя|нав|алі|раб|ы ў|нна|мад|роў|кан|зе |дст|жыц|ані|нст|зяр|ржа|зак|дзі|люб|аюц|бар|ім |ены|бес|тан|м п|дук|е а|гул|я ў| дэ|ве |жав|ацц|ахо|заб|а в|авы|ган|о н|ваг|я і|чна|я я|сац|так|од |ярж|соб|м н|се |чац|ніч|ыял|яль|цця|ь п|о с|вол|дэк| бе|ну |ога| рэ|рас|буд|а т|асо|сно|ейн",
    "bul": " на|на | пр|то | и |рав|да |пра| да|а с|ств|ва |та |а п|ите|но |во |ени|а н|е н| за|о и|ото|ван|не | вс|те |ки | не|о н|ове| по|а и|ава|чов|ни |ане|ия | чо|аво|ие | св|е п|а д| об|век|ест|сво| им|има|ост|и д|и ч|ани|или|все|ли |тво|и с|ние|вот|а в|ват|ма | ра|и п|и н| в |ек |сек|еки|а о| ил|е и|при| се|ова|ето|ата|воб|обо|бод|аци|ат |пре|оди|к и| бъ| съ|раз| ос|ред| ка|а б|о д|се | ко|бъд|лно|ния|о п| от|ъде|о в|за |ята| е | тр|и и|о с|тел|и в|нит|е с|ран| де|от |общ|де |ка |бра|ен |ява|ция|про|алн|и о|ият|ст |нов| до|его|как|ато| из|нег|а т|ден|а к|щес|а р|тря|а ч|ряб|о о|вен|ябв|бва|дър|гов|нац|ено|тве|ърж|е д|нос|ржа|а з|вит|зи |акв|лен| та|ежд|и з|род|е о|обр|нот| ни| с |т с|нар|о т|она|ез |йст|кат|иче| бе|жав|е т|е в|тва|зак|аро|кой|осн| ли|ува|авн|ейс|сно|рес|пол|нен|вни|без|ри |стр| ст|сто|под|чки|вид|ган|си |ди |и к|нст| те|а е|вси|еоб| дъ|сич|ичк|едв|жен|ник|ода|т н|о р|ака|ели|одн|елн|лич| че|чес|бще| ре|и м| ср|сре|и р|са |лни| си|дви|ичн|жда| къ|оет|ира|я н|дей| ме|еди|дру|ход|еме|кри|че |дос|ста|гра| то|ой |тъп|въз|ико|и у|нет| со|ави|той|елс|меж|чит|ита|що |ъм |азо|зов|нич|нал|дно| мо|ине|а у|тно|таз|кон|лит|ан |клю|люч|пос|тви|а м|й н|т и|изв|рез|ази|ра |оят|нео|чре",
    "kaz": "ен |не | құ|тар|ұқы| ба| қа|ға |ада|дам|құқ|ық | бо| ад|ықт|қта|ына|ар | жә|ың |ылы|әне|жән| не|мен|лық|на |р а|де | жа|ін |а қ|ары|ан | әр|қыл|ара|ала| ме|н қ|еме|уға|ның| де|асы|ам |іне|тан|лы |нды|да |әр |ығы|ста|еке| өз|ын |ған|анд|мес| бі| қо|ды |ің |бас|бол|етт|ып |н б|ілі|қық|нде|ері|е қ|алы|нем|се |бір|лар|есе|ы б|тын|а ж| ке|тиі|ост|ге |бар| ти|е б| ар|дық|сы |інд|е а|аты| та| бе|ы т|ік |олы|нда|ғын|ры |иіс|ғы | те|бос|луы|алу|сын|рын|еті|іс |рде|қығ|е ж|рін|дар|іні|н ж|тті|қар|н к|ім | ер|егі|ыры|ыны| са|рға|ген|ынд|аны|уын|ы м|лға|ана|нің|тер|уы |ей |тік|ке |сқа|қа |мыс|тық|м б|ард| от|е н|е т|мны|өзі|нан|гіз|еге| на|ы ә|аза|ң қ|лан|нег|асқ|кін|амн|кет|рал|айд|луғ|аса|ті |рды|і б|а б|ру | же|р м|ді |тта|мет|лік|тыр|ама|жас|н н|лып| мү|дай|өз |ігі| ал|ауд|дей|зін|бер|р б|уда|кел|біл|і т|қор|тең|лге| жү|ден|ы а|елі|дер|ы ж|а т|рқы|рлы|арқ| тү|қам|еле|а о|е ө|тін|ір |ең |уге|е м|лде|ау |ауы|ркі|н а|ы е|оны|н т|рыл|түр|ция|гін| то| ха|жағ|оға|осы|зде| ос|ікт|кті|а д|ұлт|лтт|тты|лім|ғда| ау| да|хал|тте|лма| ұл|амд|құр|ірі|қат|тал|орғ|зі |елг|сіз|ағы| ел|ң б|ыс | ас|імд|оты| әл|н е|ағд|қты|шін|ерк|е д|ек |ені|кім|ылм|шіл|аға|сты|лер|гі |атт|кен| кө|ым‐| кұ|кұқ|ра |рік|н ә| еш"
  },
  "Arabic": {
    "arb": " ال|ية | في|الح|في | وا|وال| أو|ة ا|أو |الم|الت|لحق|حق |لى |كل |ان |ة و|الأ| لك|لكل|ن ا|ها |ق ف|ات |مة |ون |أن |ما |اء |ته |و ا|الع|ي ا|شخص|ي أ| أن|الإ|م ا|حري| عل|ة ل|من |الا|حقو|على|قوق|ت ا|أي |رد | شخ| لل| أي|ق ا|لا |فرد|رية| ول| من|د ا| كا| إل|خص |وق |ا ا|ة أ|ا ي|ل ف|ه ا|نسا|جتم|ن ي|امة|كان|دة | حق|ام |الق|ة م| فر|اية|سان|ل ش|ين |ن ت|إنس|ا ل| لا|ذا |هذا|ن أ|لة |ي ح| دو|ه ل|لك |ترا|لتع|اً |له |إلى| عن|ى ا|ه و|ع ا|ماع|د أ|اسي| حر|ة ع|مع |الد|نون| با|لحر|لعا|ن و|، و|يات|ي ت|الج| هذ|ير |بال|دول|لإن|عية|الف|ص ا| وي|الو|لأس| إن|أسا|ساس|ماي|حما|رام|سية|انو|مل |ي و|عام|ا و|تما| مت|ة ت|علي|ع ب|ك ا| له|ة ف|قان|ى أ|ول |هم |الب|ة ب|ساو|لقا|الر|لجم|ا ك|تمت|ليه|لتم|لمت|انت| قد|اد |ه أ| يج|ريا|ق و|ل ا|ا ب|ال |يه |اعي|لدو|ل و|لإع|لمي|لمج|لأم|تع |دم |تسا|عمل|اته|لاد|رة |اة |غير|قدم|وز |جوز|يجو|عال|لان|متع|مان|فيه|اجت|م و|يد |تعل|ن ل|ر ا| يع| كل|مم |مجت|تمع|دون| مع|تمي|ذلك|كرا|يها| مس|ميع|إعل|علا| تم| عا|ملا|اعا|لاج|ني |ليم|متس|ييز|يم |اعت|الش| تع|ميي|عن |تنا| بح|لما|ي ي|يز |ود |أمم|لات|أسر|شتر|تي | جم|ه ع|ر و|ي إ|تحد|حدة| أس|عة |ي م|ة، |معي|ن م|لمس|م ب|اق |جمي|لي |مية|الض|الس|لضم|ضما|لفر| وس|لحم|امل|ق م|را |ا ح|نت | تن|يته| أم|إلي|واج|د و|لتي| مر|مرا|متح| ذل| وأ| تح|ا ف| به| وم| بم|وية|ولي|لزو",
    "urd": "ور | او|اور|کے | کے| کی|یں | کا|کی | حق|ے ک|کا | کو|یا |نے |سے | اس|ئے |کو |میں| ہے| می|ے ا| کر| ان|وں | ہو|اس |ر ا|شخص|ی ا| شخ| سے| جا|حق |خص |ہر |ام |ے م|ں ک|ہیں| یا|سی | آز|آزا|زاد|ادی|ائے|ا ح|ص ک|ہ ا|ہے |جائ|ت ک|ر ش|کہ |م ک| پر|ی ک|پر |ان |ا ج|۔ہر|س ک|دی |ہے۔|ق ہ|ی ح|ں ا|و ا|ر م|ار |حقو|قوق|ن ک|ری |کسی|ے گ|ی ج| مع| ہی|وق |سان|نی |ر ک|کرن|ی ت| حا| جو|تی |ئی | نہ| کہ|ل ک|اپن|جو |نسا|انس|ہ ک|ے ب|نہ |ہو | مل| اپ|یت |می |ے ہ|رنے|ے ل|ل ہ|ا ا| کس|رے |ی ش| ای|وہ |۔ ا|اصل|نہی|صل |ی م|یں۔|حاص|معا|د ک|انہ|ایس|ی ب|ی ہ|ملک|ق ک|ات | تع|دہ |قوم| قو|ے، |ر ہ|ا م|یہ | دو| من| بن| گا|اشر|کیا|ں م|عاش|وام| عا|اد |قوا|ی س|بر |اقو|انی| جس| لئ|لئے|دار|ر ب|ائی| وہ|ے۔ہ|مل |ے ج|علا|یوں| یہ|ے ح|ہ م|و ت|جس |ا ہ|کر |ر ن|لیم|انو| قا| و |ے۔ | اق|یم |ریق|لک |گی |ی آ|دوس| گی|وئی|ر پ|، ا|نیا|تعل| مس|ر ع|ی، |یر |لاق|خلا| رک|ین | با|ن ا|ی ن|ے پ|پنے|وری|ا س| سک| دی|ون |گا۔|م ا|انے|علی|یاد|قان|نون|س م|اف |رکھ| اع| پو| شا|وسر|ق ح|سب | بر|رتی| بی|اری| بھ|رائ| مم|ر س|یسے|ومی|دگی|ندگ| مر| پی| چا|و گ|نا |ے خ|ہ و|ادا| ہر|ا پ|تما|پور|مام|ے ع|ائد| عل|بھی|ھی |عام| مت| مق|من |د ا| ام|ونک| خل|نکہ|لاف|اعل|کوئ|اں |ریع|ذری| ذر|بنی| لی|و ک|دان|ں، |ے ی|ا ک| مح|، م|ت ا|ال |پنی|ے س|ر آ|ر ح|دیو|غیر| طر|ہوں|ی پ|ِ م|کرے| سا|اسے|رہ |برا",
    "fas": " و | حق| با|که |ند | که| در|در |رد | دا|دار|از | از|هر | هر|یت |ر ک|حق |د ه|ای |د و|ان | را|ین |ود |یا | یا|را |ارد|ی و|کس | کس| بر| آز|باش|ه ب|آزا|د ک| خو|ه ا|د ب|زاد| اس|ار | آن|ق د|شد |حقو|قوق|ی ب|وق |ده |ه د|ید |ی ک|و ا|ور |ر م|رای|اشد|خود|ادی|تما|ری | اج|ام |دی |اید|س ح|است|ر ا|و م| ان|د ا|نه | بی|با | هم| نم|مای| تا|د، |ی ا|انه|ات |ون |ایت|ا ب|ست | کن|برا|انو| بش| مو|این| مر|اسا| مل|وان|ر ب|جتم| شو| اع|ن ا|ورد| می| ای|آن | به|و آ|ملل|ا م|ماع|نی |ت ا|، ا|ت و|ئی |عی |ائی|اجت|و ب|های|ن م|ی ی|بشر|کند|شود| من| زن|ن و|ی، |بای|ی ر| مس|مل |مور|ز آ|توا|دان|اری|علا|گرد|یگر|کار| گر| بد|ن ب|ت ب|ت م|ی م| مق|د آ|شور|یه |اعی| عم|ر خ|ن ح| کش|رند|مین| اح|ن ت|ی د| مت|ه م|د ش| حم|و د|دیگ|لام|کشو|هٔ |ه و|انی|لی |ت ک| مج|ق م|میت| کا| شد|اه |نون| آم|اد |ادا|اعل|د م|ق و|ا ک|می |ی ح|لل |نجا| مح|ساس|یده| قا|بعی|قان|ر ش|مقا|ا د|هد |وی |نوا|گی |ساو|ر ت|بر |اً |نمی|اسی|اده|او | او| دی| هی|هیچ|ه‌ا|‌ها|یر |خوا|د ت|همه|ا ه|تی |حما|دگی|بین|ع ا|سان|ر و|شده|ومی| عق| بع|ز ح|شر |مند| شر|ٔمی|أم|تأ|انت|اند|اوی|مسا|ردد|بهر| بم|ارن|یتو|ل م|ران|و ه|ر د|م م|رار|عقی|سی |و ت|زش | بو|ا ا|ی ن|موم|جا |عمو|رفت|عیت| فر|ندگ|واه|زند|م و|نما|ه ح|ا ر|دیه|جام|مرد|ت، |د ر|مام| تم|ملی|نند|الم|طور|ی ت|تخا|ا ت|امی|امل|دد | شخ|شخص",
    "zlm": " دا|ان |دان| بر| او|ن س| ڤر|له |كن |ن ك|ن ا|دال|ن د|رڠ |يڠ |حق | يڠ|ارا| كڤ|أن |تيا|ڤد |ورڠ|ڠن |ياڤ| تر|اله|ولي|ن ڤ|اور|كڤد|برح|رحق|ين |اڤ |را | ات|ليه|ستي|ه ب|يه |اتا| ست| عد|عدا|ن ب|تاو|ن ت|يبس|ڤ ا|او |بيب|سي | كب|ه د|ن م| سو| من| حق| سا|لم |ق ك|اسا|الم|ن ي| تي| اي|سام|رن |ن، | ما|اتو|باڬ|بسن|سن |نڬا|ڬار|اين| مم|د س| با|كبي|ي د|ڠ ع|چار| سب|ڽ س|اڬي|د ڤ|ندق|سبا|اڽ | د | ڤم|نسي|قله|يند|ڬي |ام |تن |وان|تا |اون|ي ا| نڬ|هن | بو|ا ڤ|أنس|بول| كس| سم| سچ|ڠ ب|سچا|مأن|ا ب|ا س|بڠس| ڤڠ|دڠن|سيا|اسي|ساس| مأ| دڠ| اس|بار|هند|مان|ارڠ|رتا|دقل|تي |ت د| هن|ڤرل|نڽ |ات |ادي|ق م|، ك|تره|رها|هاد| ڤو|ادڤ| لا|ي م|ڤا |يكن|اول|ڤون|، د|ون |ڠسا|٢ د|اي |ق٢ |تو |وق |دڤ |يأن|وين|ن ه|ن٢ |ا د|وڠن|نتو|اكن|وا |ندو|وات|ه م|ي س|ڠ٢ | مڠ| ان|حق٢|يك |اد |مڤو|رات|اس |مرا|برس|ائن| مل| سس|ماس| كو|ري | بي|سوا|ڠ ت|ا، |، ت|ياد|امر|سمو|ڠ م|ڤرا|لوا|ڤري|دوڠ|ي ك|ل د|تار|ريك|تيك|ارك|ونت|لين| سر|رلي|سرت|وند|واس|رسا|ڤمب|ترم|، س|اڬا|يري|رأن| در|ا ا|دير| بڠ|ي ڤ|لائ|سوس|ڠ س|توق|سأن|ورو|جوا|هار|اڤا|وكن| ڤن|٢ ب|موا| كم|ارأ|نن |ندڠ|ا٢ | كأ|دڠ٢|و ك|كرج|وه |ا م|ڤرك|تها|اجر|جرن|ي، |شته| سڤ| به|ندي|ق ا|ڠڬو|بها|ڤ٢ | مر|سات|راس|بوا|ه ا|ا ك|د ك| ڤل|ن ح|لاج|هڽ |ڠ ا|مبي|ينڠ|بس | اڤ|ملا|كور|وار|م ڤ|سسي|نتي|تيڠ| دل|سال|وبو|منو|ڤول|مول|ڠ د|نتا|انت|ال ",
    "skr": "تے |اں | تے|دے |دی |وں | دا| حق| کو|ے ا|کوں| دے|دا | دی|یاں| کی|ے ۔|یں |ہر | ۔ |کیت|ہے | وچ| ہے|وچ | ان| شخ|شخص|ادی|ال | حا|اصل|حق |حاص|ے م|خص |صل |ں د| نا|یا | ای|اتے|ق ح|ل ہ|ے و|ں ک| ات|ہیں|سی | مل|نال|زاد|ازا|ی ت| از|قوق|ار |ا ح|حقو| او|ص ک| ۔ہ|۔ہر|ر ش|دیا|ے ج|وق |ندے| کر|یند| یا|نہ | جو|کہی|ئے |ی د|سان|نسا|وند|ی ا|یتے|انس|ا ا|ملک|ے ح|و ڄ|ے ک|ڻ د| وی|یسی|ے ب|ا و| ہو|ں ا|ئی |ندی|تی |آپڻ|وڻ |ر ک|ن ۔| نہ|انہ|جو | کن| آپ| جی|اون|ویس|ی ن| تھ| کہ|ان |ری |ڻے | ڄئ| ہر|ے ن|دہ |ام |ں م|ے ہ|تھی|ں و|۔ ا|ں ت|ی ۔|کنو|ی ح|ی ک|نوں|رے |ہاں| بچ|ون |ے ت|کو | من|ی ہ|اری|ور |نہا|ہکو|یتا|نی |یاد|ت د|ن د| ون|وام|ی م|قوا|تا |ڄئے|پڻے| ہک|می | قو|ق ت|ے د|لے |اف |ل ک|ل ت| تع|چ ا|ین |خلا|اے |علا| سا|جیا|ئو |کرڻ|ی و|انی|ہو |دار| و |ی ج| اق|ن ا|یت |ارے|ے س|لک |ق د|ہوو| ڋو|ر ت| اے|ے خ| چا| خل|لاف|قنو|نون|پور|ڻ ک| پو|ایہ|بچئ|چئو|ات |الا|ونڄ|وری|این| وس| لو|و ا|ہ د| رک|یب |سیب|وسی|یر |ا ک|قوم|ریا|ں آ| جا|رکھ|مل |کاں|رڻ |اد |او |عزت| قن|ب د|وئی|ے ع| عز| ۔ک| مع|اقو|ایں|م م|زت |ڻی |یوڻ|ر ہ| سم|ں س|لوک| جھ| سی|جھی|ت ت|ل ا|اوڻ|کوئ|ں ج|ہی |حدہ|تعل|ے ذ|وے |تحد|متح|لا |ا ت|کار| اع|ے ر| مت|ر ا|ا م|ھین|ھیو|یہو| مط| سڱ|ی س|ڄے |نڄے|سڱد|لیم|علی|ے ق| ذر|م ت| کھ|ن ک| کم|ہ ا|سار|ائد|ائی|د ا| ہن|ہن |ی، |و ک|ں ب|ھیا|ذری|ں پ|لی "
  },
  "Devanagari": {
    "hin": "के |प्र|और | और| के|ों | का|कार| प्|का | को|या |ं क|ति |ार |को | है|िका|ने |है |्रत|धिक| अध|अधि|की |ा क| कि| की| सम|ें |व्य|्ति|क्त|से | व्|ा अ|्यक|में|मान|ि क| स्| मे|सी |न्त| हो|े क|ता |यक्|क्ष|ै ।|िक |त्य| कर|्य | या|भी | वि|रत्|र स|ी स| जा|स्व|रों|्ये|ेक |येक|त्र|िया|ा ज|क व|र ह|ित |्रा|किस| अन|ा स|िसी|ा ह|ना | से| पर|र क| सा|देश|गा | । | अप|्त्|े स|समा|ान |ी क|्त |वार| ।प|ा प| रा|षा |न क|।प्|ष्ट|था |अन्| मा|्षा|्वा|ारो|तन्|वतन|ट्र|्वत|प्त|ाप्|्ट्|राष|ाष्| इस|े अ| उस| सं|राप|कि |त ह|हो |ं औ|ार्|ा ।|किय|े प| दे| भी|करन|री |जाए|ी प| न |र अ|क स|अपन|े व|ाओं|्तर|ओं | नि|सभी|रा | तथ|तथा|िवा|यों|पर | ऐस|रता|ारा|्री|सम्| द्|ीय |िए |व क|सके|द्व|होग| सभ|ं म|माज|रने|िक्|्या|ा व|र प| जि|ो स|र उ|रक्|े म|पूर| लि|ाएग| भा|इस |त क|ाव |स्थ|पने|ा औ|द्ध|श्य|र्व| घो|घोष|रूप|भाव|ाने|कृत|ो प|े ल|लिए|शिक|ूर्| उन|। इ|ं स|य क|्ध |दी |ी र|र्य|णा |एगा|न्य|रीय|ेश |रति|े ब| रू|ूप |परा|्र |तर्| पा| सु|जिस|तिक|सार|जो |ेशो| शि|ानव|ी अ|चित|े औ| पू|ियो|ा उ|म क|ी भ|शों| बु|म्म|स्त|िश्|्रो|्म |ो क| यह|र द|नव |चार|दिय|े य|र्ण|राध|ोगा|ले |नून|ानू|ोषण|षणा|विश| जन|ारी|परि|गी |वाह|साम|ाना|रका| जो|ाज |ी ज|ध क|बन्|ताओ|ंकि|ूंक|ास |कर |चूं|ी व|य ह|ा ग|य स|न स|त र|कोई|ुक्|ोई | ।क|ं न|हित|निय|याद|ादी|्मा|्था|ामा|ाह |ी म|े ज",
    "mar": "्या|या |त्य|याच|चा | व |ण्य|प्र|कार|ाचा| प्|धिक|िका| अध|अधि|च्य|ार |आहे| आह|ा अ|हे | स्|्रत|्ये|ा क|स्व| कर|्वा|ता |ास |ा स|ा व|त्र| त्|वा |ांच|यां|िक |मान| या|्य | का| अस|रत्|ष्ट|र्य|येक|ल्य|र आ|ाहि|क्ष| को|ामा|कोण| सं|ाच्|ात |ा न| रा|ंत्|ून |ेका| सा|राष|ाष्|चे |्ट्|ट्र|तंत| मा|ने |किं| कि|व्य|वात|े स|करण|ंवा|िंव|ये |क्त| सम|ा प|ना | मि|कास|ातं|्र्|र्व|समा|मिळ| जा|े प|व स|यास|ोणत|रण्|काम|ीय |ा आ| दे|े क|ांन|हि |रां| व्|्यक|ा म|िळण|ही | पा|्षण|ार्|ान |े अ| आप| वि|ळण्|ाही|ची |े व|्रा|मा |ली |ंच्|ारा|ा द| आण| नि|णे |द्ध| नय|ला |ा ह|नये| सर|सर्|्री|बंध|ी प|आपल|ले |ील |माज| हो|्त |त क|ाचे|्व |षण |ंना|लेल|ी अ|देश|आणि|णि |ध्य| शि|ी स|े ज|शिक|रीय|ानव|पाह|हिज|िजे|जे |क स|यक्|न क|व त|ा ज|यात|पल्|न्य|वी |स्थ|ज्य| ज्|े आ|रक्|त स|िक्|ंबं|संब| के|क व|केल|असल|य अ|य क|त व|ीत |णत्|त्व|ाने| उप|्वत|भाव|े त|करत|याह|रता|िष्|व म|कां|साम|रति|सार|ंचा|र व|क आ|याय|ासा|साठ|ाठी|्ती|ठी |ेण्|र्थ|ीने|े य|जाह|ोणा|संर|ायद|च्छ|स स|ंरक|तील|ी व|त आ|ी आ|ंधा|ेशा|ित | अश|हीर| हक|हक्|क्क|य व|शा |व आ|तीन|ण म|ूर्|ेल्|द्य|ेले|ांत|ा य|ा ब|ी म|ंचे|याव|देण|कृत|ारण|ेत |िवा|वस्|स्त|ाची|नवी| अर|थवा|अथव|ा त| अथ|अर्|ती |पूर|इतर|र्ण|ी क|यत्| इत| शा|रका|तिष|ण स|तिक|्रक|्ध |रणा| आल|ेल |ाजि| न्|धात|रून|श्र|असे|ष्ठ|ुक्|ेश |तो |जिक|े म",
    "mai": "ाक |प्र|कार|िका|धिक|ार | आʼ|आʼ |्रत|ेँ |क अ|्यक|िक |्ति| अध|व्य|अधि|क स| प्| व्|क्त|केँ|यक्|तिक|हि | स्|न्त|क व|मे |बाक| सम|मान|त्य|क्ष|छैक| छै|ेक |स्व|रत्|त्र| अप|्ये|ष्ट|येक|र छ|सँ |ित |ैक।| एह| वि|वा | जा|्त्|िके|ति |ट्र|ाष्| हो|्ट्|राष| अन| रा| सा|्य |अपन| कर|कोन|।प्|्वत|क आ|तन्|अछि| अछ|वतन| को|था | वा|ताक| पर|ार्|एहि|नहि|पन |ा आ|रता|समा| मा|्री|नो | नह|्षा|देश|क प| दे| का| कए|रक | नि| सं|न्य|ि क|ोनो|छि |्त |ारक|्वा|ा स|ान्|ल ज|तथा| तथ|ान |करब|ँ क| आ |र आ|ीय |ता |क ह|वार| जे|्या|िवा|जाए|ना |ओर |ानव|ा प|ँ अ|अन्|ारण|माज|स्थ|घोष| आओ|्तर| एक|साम|र्व|आओर|धार|त क|परि|रीय|्रस|कएल|ामा|्रा|रण |ँ स| सभ|द्ध|स्त|एबा|पूर|ʼ स|ा अ| घो|षा |ाहि|ʼ अ|क।प|यक |नक |रक्|रबा|चित|िक्|क ज|ोषण|कर |र प|ेतु|हेत|शिक|एल |सम्| उप|ाधि|एहन|हन |त अ|तु |ूर्|षणा| हे|िमे| अव|ेल |सभ |े स|ि ज|निर| शि|िर्|रति|होए|अनु|र अ|जाह|क क|हो |्ध |रूप|वक |च्छ|प्त|ँ ए| सक|भाव|क उ|ाप्|सभक|त आ|ि आ|र्ण|त स|्रक|एत।|र्य|त ह|जिक| जन|ाजि|चार|ण स|ैक |रा |ि स|ारा|री |िश्|वाध|ा व|ाएत|न अ| ओ |हु |कान|जे |न व|िसँ|रसं|विव|कृत|ि घ|क ब| भा|उद्|ोएत| उद|राप|ʼ प|श्य|न प|्ण |य आ|द्व| द्|िष्| सह|ि द|धक | बी|ेश | पू|षाक|नवा|ास |ामे|ए स|जेँ| कि|कि |क ल| भे|पर |यता| रू|ओ व|ाके| पए|केओ|ेओ |पएब|राज| अथ|अथव|थवा|त्त|विश|्थि|य प|ा क|न क|वास|रिव|क र| दो|सार",
    "bho": " के|के |ार |े क|कार|धिक|िका|ओर |आओर| आओ| अध|अधि|े स|ा क|े अ| हो| सं|र क|र स|ें | मे|में|िक | कर|ा स|र ह| से|से |रा |मान| सम|न क|क्ष|े ब|नो | चा|वे |ता |चाह|ष्ट| रा|ति |्रा|खे |राष|ाष्|प्र| सा| का|ट्र|े आ| प्| सक| मा|्ट्| स्|होख| बा|करे|ि क|ौनो|त क|था |कौन|पन | जा| कौ|रे |ाति|ला | ओक|ेला|तथा|आपन|्त | आप|कर |हवे|र म| हव| तथ|सबह|र आ|ोखे| ह।|िर |े ओ|केल|सके|हे | और|ही |तिर|त्र|जा |ना |बहि|।सब|े च| खा|े म| पर|खात|ान |र ब|न स|ावे| लो|षा |ाहे|ी क|ओकर|ा आ|माज|ित |े ज|ल ज|मिल|संग|्षा|ं क| सब|ा प|और |रक्|वे।|िं |े ह|ंत्|ाज |स्व|हिं|नइख|कान|ो स| जे|समा|क स|लोग|करा|क्त|्रत|ला।| नइ|े। |ानव|िया|हु |इखे|्र |रता|्वत|ानू|े न|ाम |नून|ाही|वतं|पर |ी स| ओ |े उ|े व|्री|रीय|स्थ|तंत|दी |ीय |े त|र अ|र प|्य |साम|बा।| आद|ून |। स|व्य|ा।स|सभे|भे |या | दे|ा म|े ख| वि| सु|केह|प्त|योग|ु क|ोग |े द|चार|ादी|ाप्| दो| या|राप|ल ह|पूर| मि|तिक|खल |यता|्ति| बि|ए क|आदि|दिम| ही|हि |मी | नि|र न| इ |ेहु|नवा|ा ह|री |ले | पा|ाधि| सह| उप|्या| जर|षण | सभ|िमी|देश|े प|म क|जे |ाव | अप|शिक|ाजि|जाद|जिक|े भ|क आ|्तर|िक्|ि म|ेकर|ुक्|वाध|गठन| व्|निय|ठन |।के|ामा|रो | जी|य क|न म|े ल|न ह|ास |ेश | शा|घोष|ंगठ|िल | घो|्षण| पू|े र|ंरक|संर|उपय|पयो|हो |बा |ी ब|्म |सब |दोस|ा। | आज|साथ| शि|आजा| भी| उच|ने |चित| अं|र व|ज क|न आ| ले|नि |ार्|कि |याह|्थि",
    "nep": "को | र |कार|प्र|ार |ने |िका|क्त|धिक|्यक| गर|व्य|्रत| प्|अधि|्ति| अध| व्|यक्|मा |िक |त्य|ाई |लाई|न्त|मान| सम|त्र|गर्|र्न|क व| वा|्ने|वा | स्|रत्|र स|्ये|तिल|येक|ेक |छ ।|ो स|ा स|हरू| वि|क्ष|्त्|िला| । |स्व|हुन|ति | हु|ले | रा| मा|ष्ट|समा|वतन|तन्| छ |र छ| सं|्ट्|ट्र|ाष्|ो अ|राष|्वत|ुने|नेछ|हरु|ान |ता |े अ|्र | का|िने|ाको|गरि|े छ|ना | अन| नि|रता|नै | सा|ित |तिक|क स|र र|रू |ा अ|था |स्त|कुन|ा र|ुनै| छै|्त |छैन|ा प|ार्|वार|ा व| पर|तथा| तथ|का |्या|एको|रु |्षा|माज|रक्|परि|द्ध|। प| ला|सको|ामा| यस|ाहर|ेछ |धार|्रा|ो प|नि |देश|भाव|िवा|्य |र ह|र व|र म|सबै|न अ|े र|न स|रको|अन्|ताक|ंरक|संर|्वा| त्|सम्|री |ो व|ा भ|रहर| कु|्रि|त र|रिन|श्य|पनि|ै व|यस्|ारा|ानव| शि|ा त|लाग|रा |शिक| सब|ाउन|िक्|्न |ारक|ा न|रिय|्यस|द्व|रति|चार| सह|्षण| सु|ारम|ुक्|ुद्|साम|षा |ैन | अप| भए|बाट|ुन | उप|ान्|ो आ|्तर|िय |कान|ि र|रूक|द्द|र प|ाव |ो ल|तो | पन|ैन।| आव|ा ग|।प्|बै |ूर्|िएक|र त|निज|त्प| भे|जिक|ेछ।|िको|्तो|वाह|त स|ाट | अर|ाजि|्ध | उस|रमा|ात्|र्य|नको|ाय |जको|ित्|ागि| अभ|न ग|गि |ा म| आध|स्थ| पा|ारह|घोष|त्व|यता|ा क|र्द| मत|विध| सक|सार|परा|युक|राध| घो|णको|अपर|े स|ारी|।कु| दि| जन|भेद|रिव|उसक|क र|र अ|ि स|ानु|ो ह|रुद| छ।|ूको|रका|नमा| भन|र्म|हित|पूर|न्य|क अ|ा ब|ो भ|राज|अनु|ोषण|षणा|य र| मन| बि|्धा| दे|निर|ताह|र उ|यस |उने|रण |विक"
  }
}

},{}],4:[function(require,module,exports){
// This file is generated by `build.js`.
module.exports = {
  cmn: /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/g,
  Latin: /[A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]/g,
  Cyrillic: /[\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69D\uA69F]/g,
  Arabic: /[\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u065F\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B2\u08E4-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC]|\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]/g,
  ben: /[\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB]/g,
  Devanagari: /[\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FB]/g,
  jpn: /[\u3041-\u3096\u309D-\u309F]|\uD82C\uDC01|\uD83C\uDE00|[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82C\uDC00/g,
  kor: /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,
  tel: /[\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F]/g,
  tam: /[\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA]/g,
  guj: /[\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1]/g,
  kan: /[\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2]/g,
  mal: /[\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D79-\u0D7F]/g,
  mya: /[\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F]/g,
  ori: /[\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77]/g,
  pan: /[\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75]/g,
  amh: /[\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]/g,
  tha: /[\u0E01-\u0E3A\u0E40-\u0E5B]/g,
  sin: /[\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4]|\uD804[\uDDE1-\uDDF4]/g,
  ell: /[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45]/g
};

},{}],5:[function(require,module,exports){
// This file is generated by `build.js`
'use strict';

/* Load `trigram-utils`. */
var utilities = require('trigram-utils');

/* Load `expressions` (regular expressions matching
 * scripts). */
var expressions = require('./expressions.js');

/* Load `data` (trigram information per language,
 * per script). */
var data = require('./data.json');

/* Expose `detectAll` on `detect`. */
detect.all = detectAll;

/* Expose `detect`. */
module.exports = detect;

/* Maximum sample length. */
var MAX_LENGTH = 2048;

/* Minimum sample length. */
var MIN_LENGTH = 10;

/* The maximum distance to add when a given trigram does
 * not exist in a trigram dictionary. */
var MAX_DIFFERENCE = 300;

/* Construct trigram dictionaries. */
(function () {
  var languages;
  var name;
  var trigrams;
  var model;
  var script;
  var weight;

  for (script in data) {
    languages = data[script];

    for (name in languages) {
      model = languages[name].split('|');

      weight = model.length;

      trigrams = {};

      while (weight--) {
        trigrams[model[weight]] = weight;
      }

      languages[name] = trigrams;
    }
  }
})();

/**
 * Get the most probable language for the given value.
 *
 * @param {string} value - The value to test.
 * @param {Object} options - Configuration.
 * @return {string} The most probable language.
 */
function detect(value, options) {
  return detectAll(value, options)[0][0];
}

/**
 * Get a list of probable languages the given value is
 * written in.
 *
 * @param {string} value - The value to test.
 * @param {Object} options - Configuration.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function detectAll(value, options) {
  var settings = options || {};
  var minLength = MIN_LENGTH;
  var script;

  if (settings.minLength !== null && settings.minLength !== undefined) {
    minLength = settings.minLength;
  }

  if (!value || value.length < minLength) {
    return und();
  }

  value = value.substr(0, MAX_LENGTH);

  /* Get the script which characters occur the most
   * in `value`. */
  script = getTopScript(value, expressions);

  /* One languages exists for the most-used script.
   *
   * If no matches occured, such as a digit only string,
   * exit with `und`. */
  if (!(script[0] in data)) {
    return script[1] === 0 ? und() : singleLanguageTuples(script[0]);
  }

  /* Get all distances for a given script, and
   * normalize the distance values. */
  return normalize(value, getDistances(
    utilities.asTuples(value), data[script[0]], settings
  ));
}

/**
 * Normalize the difference for each tuple in
 * `distances`.
 *
 * @param {string} value - Value to normalize.
 * @param {Array.<Array.<string, number>>} distances
 *   - List of distances.
 * @return {Array.<Array.<string, number>>} - Normalized
 *   distances.
 */
function normalize(value, distances) {
  var min = distances[0][1];
  var max = (value.length * MAX_DIFFERENCE) - min;
  var index = -1;
  var length = distances.length;

  while (++index < length) {
    distances[index][1] = 1 - ((distances[index][1] - min) / max) || 0;
  }

  return distances;
}

/**
 * From `scripts`, get the most occurring expression for
 * `value`.
 *
 * @param {string} value - Value to check.
 * @param {Object.<RegExp>} scripts - Top-Scripts.
 * @return {Array} Top script and its
 *   occurrence percentage.
 */
function getTopScript(value, scripts) {
  var topCount = -1;
  var topScript;
  var script;
  var count;

  for (script in scripts) {
    count = getOccurrence(value, scripts[script]);

    if (count > topCount) {
      topCount = count;
      topScript = script;
    }
  }

  return [topScript, topCount];
}

/**
 * Get the occurrence ratio of `expression` for `value`.
 *
 * @param {string} value - Value to check.
 * @param {RegExp} expression - Code-point expression.
 * @return {number} Float between 0 and 1.
 */
function getOccurrence(value, expression) {
  var count = value.match(expression);

  return (count ? count.length : 0) / value.length || 0;
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and multiple trigram dictionaries.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<Object>} languages - multiple
 *   trigrams to test against.
 * @param {Object} options - Configuration.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function getDistances(trigrams, languages, options) {
  var distances = [];
  var whitelist = options.whitelist || [];
  var blacklist = options.blacklist || [];
  var language;

  languages = filterLanguages(languages, whitelist, blacklist);

  for (language in languages) {
    distances.push([
      language,
      getDistance(trigrams, languages[language])
    ]);
  }

  return distances.length ? distances.sort(sort) : und();
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and a language dictionary.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<number>} model - Object
 *   containing weighted trigrams.
 * @return {number} - The distance between the two.
 */
function getDistance(trigrams, model) {
  var distance = 0;
  var index = -1;
  var length = trigrams.length;
  var trigram;
  var difference;

  while (++index < length) {
    trigram = trigrams[index];

    if (trigram[0] in model) {
      difference = trigram[1] - model[trigram[0]] - 1;

      if (difference < 0) {
        difference = -difference;
      }
    } else {
      difference = MAX_DIFFERENCE;
    }

    distance += difference;
  }

  return distance;
}

/**
 * Filter `languages` by removing languages in
 * `blacklist`, or including languages in `whitelist`.
 *
 * @param {Object.<Object>} languages - Languages
 *   to filter
 * @param {Array.<string>} whitelist - Whitelisted
 *   languages; if non-empty, only included languages
 *   are kept.
 * @param {Array.<string>} blacklist - Blacklisted
 *   languages; included languages are ignored.
 * @return {Object.<Object>} - Filtered array of
 *   languages.
 */
function filterLanguages(languages, whitelist, blacklist) {
  var filteredLanguages;
  var language;

  if (whitelist.length === 0 && blacklist.length === 0) {
    return languages;
  }

  filteredLanguages = {};

  for (language in languages) {
    if (
      (
        whitelist.length === 0 ||
        whitelist.indexOf(language) !== -1
      ) &&
      blacklist.indexOf(language) === -1
    ) {
      filteredLanguages[language] = languages[language];
    }
  }

  return filteredLanguages;
}

/* Create a single `und` tuple. */
function und() {
  return singleLanguageTuples('und');
}

/* Create a single tuple as a list of tuples from a given
 * language code. */
function singleLanguageTuples(language) {
  return [[language, 1]];
}

/* Deep regular sort on the number at `1` in both objects. */
function sort(a, b) {
  return a[1] - b[1];
}

},{"./data.json":3,"./expressions.js":4,"trigram-utils":8}],6:[function(require,module,exports){
module.exports=[
  {
    "name": "Ghotuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "aaa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alumu-Tesu",
    "type": "living",
    "scope": "individual",
    "iso6393": "aab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ari",
    "type": "living",
    "scope": "individual",
    "iso6393": "aac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amal",
    "type": "living",
    "scope": "individual",
    "iso6393": "aad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arbëreshë Albanian",
    "type": "living",
    "scope": "individual",
    "iso6393": "aae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aranadan",
    "type": "living",
    "scope": "individual",
    "iso6393": "aaf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambrak",
    "type": "living",
    "scope": "individual",
    "iso6393": "aag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abu' Arapesh",
    "type": "living",
    "scope": "individual",
    "iso6393": "aah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arifama-Miniafia",
    "type": "living",
    "scope": "individual",
    "iso6393": "aai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ankave",
    "type": "living",
    "scope": "individual",
    "iso6393": "aak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afade",
    "type": "living",
    "scope": "individual",
    "iso6393": "aal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anambé",
    "type": "living",
    "scope": "individual",
    "iso6393": "aan",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Algerian Saharan Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "aao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pará Arára",
    "type": "living",
    "scope": "individual",
    "iso6393": "aap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Abnaki",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aaq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afar",
    "type": "living",
    "scope": "individual",
    "iso6393": "aar",
    "iso6392B": "aar",
    "iso6392T": "aar",
    "iso6391": "aa"
  },
  {
    "name": "Aasáx",
    "type": "living",
    "scope": "individual",
    "iso6393": "aas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arvanitika Albanian",
    "type": "living",
    "scope": "individual",
    "iso6393": "aat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abau",
    "type": "living",
    "scope": "individual",
    "iso6393": "aau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Solong",
    "type": "living",
    "scope": "individual",
    "iso6393": "aaw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandobo Atas",
    "type": "living",
    "scope": "individual",
    "iso6393": "aax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amarasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "aaz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abé",
    "type": "living",
    "scope": "individual",
    "iso6393": "aba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bankon",
    "type": "living",
    "scope": "individual",
    "iso6393": "abb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambala Ayta",
    "type": "living",
    "scope": "individual",
    "iso6393": "abc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manide",
    "type": "living",
    "scope": "individual",
    "iso6393": "abd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Abnaki",
    "type": "living",
    "scope": "individual",
    "iso6393": "abe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abai Sungai",
    "type": "living",
    "scope": "individual",
    "iso6393": "abf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "abg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tajiki Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "abh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abidji",
    "type": "living",
    "scope": "individual",
    "iso6393": "abi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Bea",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "abj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abkhazian",
    "type": "living",
    "scope": "individual",
    "iso6393": "abk",
    "iso6392B": "abk",
    "iso6392T": "abk",
    "iso6391": "ab"
  },
  {
    "name": "Lampung Nyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "abl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abanyom",
    "type": "living",
    "scope": "individual",
    "iso6393": "abm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abua",
    "type": "living",
    "scope": "individual",
    "iso6393": "abn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abon",
    "type": "living",
    "scope": "individual",
    "iso6393": "abo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abellen Ayta",
    "type": "living",
    "scope": "individual",
    "iso6393": "abp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abaza",
    "type": "living",
    "scope": "individual",
    "iso6393": "abq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abron",
    "type": "living",
    "scope": "individual",
    "iso6393": "abr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambonese Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "abs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambulas",
    "type": "living",
    "scope": "individual",
    "iso6393": "abt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abure",
    "type": "living",
    "scope": "individual",
    "iso6393": "abu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baharna Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "abv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pal",
    "type": "living",
    "scope": "individual",
    "iso6393": "abw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inabaknon",
    "type": "living",
    "scope": "individual",
    "iso6393": "abx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aneme Wake",
    "type": "living",
    "scope": "individual",
    "iso6393": "aby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abui",
    "type": "living",
    "scope": "individual",
    "iso6393": "abz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achagua",
    "type": "living",
    "scope": "individual",
    "iso6393": "aca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Áncá",
    "type": "living",
    "scope": "individual",
    "iso6393": "acb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gikyode",
    "type": "living",
    "scope": "individual",
    "iso6393": "acd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "ace",
    "iso6392B": "ace",
    "iso6392T": "ace",
    "iso6391": null
  },
  {
    "name": "Saint Lucian Creole French",
    "type": "living",
    "scope": "individual",
    "iso6393": "acf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Acoli",
    "type": "living",
    "scope": "individual",
    "iso6393": "ach",
    "iso6392B": "ach",
    "iso6392T": "ach",
    "iso6391": null
  },
  {
    "name": "Aka-Cari",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Kora",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ack",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akar-Bale",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "acl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mesopotamian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "acm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achang",
    "type": "living",
    "scope": "individual",
    "iso6393": "acn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Acipa",
    "type": "living",
    "scope": "individual",
    "iso6393": "acp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ta'izzi-Adeni Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "acq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achi",
    "type": "living",
    "scope": "individual",
    "iso6393": "acr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Acroá",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "acs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achterhoeks",
    "type": "living",
    "scope": "individual",
    "iso6393": "act",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achuar-Shiwiar",
    "type": "living",
    "scope": "individual",
    "iso6393": "acu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Achumawi",
    "type": "living",
    "scope": "individual",
    "iso6393": "acv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hijazi Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "acw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omani Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "acx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cypriot Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "acy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Acheron",
    "type": "living",
    "scope": "individual",
    "iso6393": "acz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adangme",
    "type": "living",
    "scope": "individual",
    "iso6393": "ada",
    "iso6392B": "ada",
    "iso6392T": "ada",
    "iso6391": null
  },
  {
    "name": "Adabe",
    "type": "living",
    "scope": "individual",
    "iso6393": "adb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzodinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "add",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adele",
    "type": "living",
    "scope": "individual",
    "iso6393": "ade",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhofari Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "adf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andegerebinha",
    "type": "living",
    "scope": "individual",
    "iso6393": "adg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adhola",
    "type": "living",
    "scope": "individual",
    "iso6393": "adh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adi",
    "type": "living",
    "scope": "individual",
    "iso6393": "adi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adioukrou",
    "type": "living",
    "scope": "individual",
    "iso6393": "adj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galo",
    "type": "living",
    "scope": "individual",
    "iso6393": "adl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adang",
    "type": "living",
    "scope": "individual",
    "iso6393": "adn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ado",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adangbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "adq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adonara",
    "type": "living",
    "scope": "individual",
    "iso6393": "adr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adamorobe Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ads",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adnyamathanha",
    "type": "living",
    "scope": "individual",
    "iso6393": "adt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aduge",
    "type": "living",
    "scope": "individual",
    "iso6393": "adu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amundava",
    "type": "living",
    "scope": "individual",
    "iso6393": "adw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amdo Tibetan",
    "type": "living",
    "scope": "individual",
    "iso6393": "adx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adyghe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ady",
    "iso6392B": "ady",
    "iso6392T": "ady",
    "iso6391": null
  },
  {
    "name": "Adzera",
    "type": "living",
    "scope": "individual",
    "iso6393": "adz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Areba",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tunisian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "aeb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Saidi Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "aec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Argentine Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "aed",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northeast Pashai",
    "type": "living",
    "scope": "individual",
    "iso6393": "aee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haeke",
    "type": "living",
    "scope": "individual",
    "iso6393": "aek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambele",
    "type": "living",
    "scope": "individual",
    "iso6393": "ael",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arem",
    "type": "living",
    "scope": "individual",
    "iso6393": "aem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Armenian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "aen",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aer",
    "type": "living",
    "scope": "individual",
    "iso6393": "aeq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Arrernte",
    "type": "living",
    "scope": "individual",
    "iso6393": "aer",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alsea",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akeu",
    "type": "living",
    "scope": "individual",
    "iso6393": "aeu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambakich",
    "type": "living",
    "scope": "individual",
    "iso6393": "aew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amele",
    "type": "living",
    "scope": "individual",
    "iso6393": "aey",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aeka",
    "type": "living",
    "scope": "individual",
    "iso6393": "aez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gulf Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "afb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andai",
    "type": "living",
    "scope": "individual",
    "iso6393": "afd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Putukwam",
    "type": "living",
    "scope": "individual",
    "iso6393": "afe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afghan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "afg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afrihili",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "afh",
    "iso6392B": "afh",
    "iso6392T": "afh",
    "iso6391": null
  },
  {
    "name": "Akrukay",
    "type": "living",
    "scope": "individual",
    "iso6393": "afi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nanubae",
    "type": "living",
    "scope": "individual",
    "iso6393": "afk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Defaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "afn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eloyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "afo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tapei",
    "type": "living",
    "scope": "individual",
    "iso6393": "afp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afrikaans",
    "type": "living",
    "scope": "individual",
    "iso6393": "afr",
    "iso6392B": "afr",
    "iso6392T": "afr",
    "iso6391": "af"
  },
  {
    "name": "Afro-Seminole Creole",
    "type": "living",
    "scope": "individual",
    "iso6393": "afs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Afitti",
    "type": "living",
    "scope": "individual",
    "iso6393": "aft",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "afu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obokuitai",
    "type": "living",
    "scope": "individual",
    "iso6393": "afz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aguano",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Legbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "agb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agatu",
    "type": "living",
    "scope": "individual",
    "iso6393": "agc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agarabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "agd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angal",
    "type": "living",
    "scope": "individual",
    "iso6393": "age",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arguni",
    "type": "living",
    "scope": "individual",
    "iso6393": "agf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angor",
    "type": "living",
    "scope": "individual",
    "iso6393": "agg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngelima",
    "type": "living",
    "scope": "individual",
    "iso6393": "agh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agariya",
    "type": "living",
    "scope": "individual",
    "iso6393": "agi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Argobba",
    "type": "living",
    "scope": "individual",
    "iso6393": "agj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isarog Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "agk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fembe",
    "type": "living",
    "scope": "individual",
    "iso6393": "agl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angaataha",
    "type": "living",
    "scope": "individual",
    "iso6393": "agm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agutaynen",
    "type": "living",
    "scope": "individual",
    "iso6393": "agn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tainae",
    "type": "living",
    "scope": "individual",
    "iso6393": "ago",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aghem",
    "type": "living",
    "scope": "individual",
    "iso6393": "agq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aguaruna",
    "type": "living",
    "scope": "individual",
    "iso6393": "agr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Esimbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ags",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Cagayan Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "agt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aguacateco",
    "type": "living",
    "scope": "individual",
    "iso6393": "agu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Remontado Dumagat",
    "type": "living",
    "scope": "individual",
    "iso6393": "agv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "agw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aghul",
    "type": "living",
    "scope": "individual",
    "iso6393": "agx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Alta",
    "type": "living",
    "scope": "individual",
    "iso6393": "agy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mt. Iriga Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "agz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ahanta",
    "type": "living",
    "scope": "individual",
    "iso6393": "aha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Axamb",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Qimant",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aghu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiagbamrin Aizi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akha",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mobumrin Aizi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Àhàn",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ahom",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aproumu Aizi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ahirani",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ashe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ahs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ahtena",
    "type": "living",
    "scope": "individual",
    "iso6393": "aht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arosi",
    "type": "living",
    "scope": "individual",
    "iso6393": "aia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ainu (China)",
    "type": "living",
    "scope": "individual",
    "iso6393": "aib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ainbai",
    "type": "living",
    "scope": "individual",
    "iso6393": "aic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alngith",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amara",
    "type": "living",
    "scope": "individual",
    "iso6393": "aie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agi",
    "type": "living",
    "scope": "individual",
    "iso6393": "aif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Antigua and Barbuda Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "aig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ai-Cham",
    "type": "living",
    "scope": "individual",
    "iso6393": "aih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Assyrian Neo-Aramaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "aii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lishanid Noshan",
    "type": "living",
    "scope": "individual",
    "iso6393": "aij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ake",
    "type": "living",
    "scope": "individual",
    "iso6393": "aik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aimele",
    "type": "living",
    "scope": "individual",
    "iso6393": "ail",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aimol",
    "type": "living",
    "scope": "individual",
    "iso6393": "aim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ainu (Japan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ain",
    "iso6392B": "ain",
    "iso6392T": "ain",
    "iso6391": null
  },
  {
    "name": "Aiton",
    "type": "living",
    "scope": "individual",
    "iso6393": "aio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burumakok",
    "type": "living",
    "scope": "individual",
    "iso6393": "aip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aimaq",
    "type": "living",
    "scope": "individual",
    "iso6393": "aiq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Airoran",
    "type": "living",
    "scope": "individual",
    "iso6393": "air",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nataoran Amis",
    "type": "living",
    "scope": "individual",
    "iso6393": "ais",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arikem",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ait",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aari",
    "type": "living",
    "scope": "individual",
    "iso6393": "aiw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aighon",
    "type": "living",
    "scope": "individual",
    "iso6393": "aix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ali",
    "type": "living",
    "scope": "individual",
    "iso6393": "aiy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aja (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "aja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aja (Benin)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ajg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ajië",
    "type": "living",
    "scope": "individual",
    "iso6393": "aji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andajin",
    "type": "living",
    "scope": "individual",
    "iso6393": "ajn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Levantine Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ajp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Tunisian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ajt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Moroccan Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "aju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ajawa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ajw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amri Karbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ajz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akan",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "aka",
    "iso6392B": "aka",
    "iso6392T": "aka",
    "iso6391": "ak"
  },
  {
    "name": "Batak Angkola",
    "type": "living",
    "scope": "individual",
    "iso6393": "akb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpur",
    "type": "living",
    "scope": "individual",
    "iso6393": "akc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ukpet-Ehom",
    "type": "living",
    "scope": "individual",
    "iso6393": "akd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akawaio",
    "type": "living",
    "scope": "individual",
    "iso6393": "ake",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "akf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anakalangu",
    "type": "living",
    "scope": "individual",
    "iso6393": "akg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angal Heneng",
    "type": "living",
    "scope": "individual",
    "iso6393": "akh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aiome",
    "type": "living",
    "scope": "individual",
    "iso6393": "aki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Jeru",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "akj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akkadian",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "akk",
    "iso6392B": "akk",
    "iso6392T": "akk",
    "iso6391": null
  },
  {
    "name": "Aklanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "akl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Bo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "akm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akurio",
    "type": "living",
    "scope": "individual",
    "iso6393": "ako",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siwu",
    "type": "living",
    "scope": "individual",
    "iso6393": "akp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ak",
    "type": "living",
    "scope": "individual",
    "iso6393": "akq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Araki",
    "type": "living",
    "scope": "individual",
    "iso6393": "akr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akaselem",
    "type": "living",
    "scope": "individual",
    "iso6393": "aks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akolet",
    "type": "living",
    "scope": "individual",
    "iso6393": "akt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akum",
    "type": "living",
    "scope": "individual",
    "iso6393": "aku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akhvakh",
    "type": "living",
    "scope": "individual",
    "iso6393": "akv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "akw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Kede",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "akx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aka-Kol",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alabama",
    "type": "living",
    "scope": "individual",
    "iso6393": "akz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alago",
    "type": "living",
    "scope": "individual",
    "iso6393": "ala",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Qawasqar",
    "type": "living",
    "scope": "individual",
    "iso6393": "alc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alladian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ald",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aleut",
    "type": "living",
    "scope": "individual",
    "iso6393": "ale",
    "iso6392B": "ale",
    "iso6392T": "ale",
    "iso6391": null
  },
  {
    "name": "Alege",
    "type": "living",
    "scope": "individual",
    "iso6393": "alf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "alh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amaimon",
    "type": "living",
    "scope": "individual",
    "iso6393": "ali",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alangan",
    "type": "living",
    "scope": "individual",
    "iso6393": "alj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alak",
    "type": "living",
    "scope": "individual",
    "iso6393": "alk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Allar",
    "type": "living",
    "scope": "individual",
    "iso6393": "all",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amblong",
    "type": "living",
    "scope": "individual",
    "iso6393": "alm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gheg Albanian",
    "type": "living",
    "scope": "individual",
    "iso6393": "aln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Larike-Wakasihu",
    "type": "living",
    "scope": "individual",
    "iso6393": "alo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alune",
    "type": "living",
    "scope": "individual",
    "iso6393": "alp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Algonquin",
    "type": "living",
    "scope": "individual",
    "iso6393": "alq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alutor",
    "type": "living",
    "scope": "individual",
    "iso6393": "alr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tosk Albanian",
    "type": "living",
    "scope": "individual",
    "iso6393": "als",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Altai",
    "type": "living",
    "scope": "individual",
    "iso6393": "alt",
    "iso6392B": "alt",
    "iso6392T": "alt",
    "iso6391": null
  },
  {
    "name": "'Are'are",
    "type": "living",
    "scope": "individual",
    "iso6393": "alu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alaba-K’abeena",
    "type": "living",
    "scope": "individual",
    "iso6393": "alw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amol",
    "type": "living",
    "scope": "individual",
    "iso6393": "alx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alyawarr",
    "type": "living",
    "scope": "individual",
    "iso6393": "aly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alur",
    "type": "living",
    "scope": "individual",
    "iso6393": "alz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amanayé",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ama",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambo",
    "type": "living",
    "scope": "individual",
    "iso6393": "amb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amahuaca",
    "type": "living",
    "scope": "individual",
    "iso6393": "amc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yanesha'",
    "type": "living",
    "scope": "individual",
    "iso6393": "ame",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hamer-Banna",
    "type": "living",
    "scope": "individual",
    "iso6393": "amf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amurdak",
    "type": "living",
    "scope": "individual",
    "iso6393": "amg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amharic",
    "type": "living",
    "scope": "individual",
    "iso6393": "amh",
    "iso6392B": "amh",
    "iso6392T": "amh",
    "iso6391": "am"
  },
  {
    "name": "Amis",
    "type": "living",
    "scope": "individual",
    "iso6393": "ami",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amdang",
    "type": "living",
    "scope": "individual",
    "iso6393": "amj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambai",
    "type": "living",
    "scope": "individual",
    "iso6393": "amk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "War-Jaintia",
    "type": "living",
    "scope": "individual",
    "iso6393": "aml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ama (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "amm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amanab",
    "type": "living",
    "scope": "individual",
    "iso6393": "amn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amo",
    "type": "living",
    "scope": "individual",
    "iso6393": "amo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alamblak",
    "type": "living",
    "scope": "individual",
    "iso6393": "amp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amahai",
    "type": "living",
    "scope": "individual",
    "iso6393": "amq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amarakaeri",
    "type": "living",
    "scope": "individual",
    "iso6393": "amr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Amami-Oshima",
    "type": "living",
    "scope": "individual",
    "iso6393": "ams",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amto",
    "type": "living",
    "scope": "individual",
    "iso6393": "amt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guerrero Amuzgo",
    "type": "living",
    "scope": "individual",
    "iso6393": "amu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambelau",
    "type": "living",
    "scope": "individual",
    "iso6393": "amv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Neo-Aramaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "amw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anmatyerre",
    "type": "living",
    "scope": "individual",
    "iso6393": "amx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ami",
    "type": "living",
    "scope": "individual",
    "iso6393": "amy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atampaya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "amz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andaqui",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ana",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andoa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "anb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngas",
    "type": "living",
    "scope": "individual",
    "iso6393": "anc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ansus",
    "type": "living",
    "scope": "individual",
    "iso6393": "and",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Xârâcùù",
    "type": "living",
    "scope": "individual",
    "iso6393": "ane",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Animere",
    "type": "living",
    "scope": "individual",
    "iso6393": "anf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old English (ca. 450-1100)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ang",
    "iso6392B": "ang",
    "iso6392T": "ang",
    "iso6391": null
  },
  {
    "name": "Nend",
    "type": "living",
    "scope": "individual",
    "iso6393": "anh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ani",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anor",
    "type": "living",
    "scope": "individual",
    "iso6393": "anj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Goemai",
    "type": "living",
    "scope": "individual",
    "iso6393": "ank",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anu-Hkongso Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "anl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anal",
    "type": "living",
    "scope": "individual",
    "iso6393": "anm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ann",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andoque",
    "type": "living",
    "scope": "individual",
    "iso6393": "ano",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angika",
    "type": "living",
    "scope": "individual",
    "iso6393": "anp",
    "iso6392B": "anp",
    "iso6392T": "anp",
    "iso6391": null
  },
  {
    "name": "Jarawa (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "anq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andh",
    "type": "living",
    "scope": "individual",
    "iso6393": "anr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anserma",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ans",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Antakarinya",
    "type": "living",
    "scope": "individual",
    "iso6393": "ant",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anuak",
    "type": "living",
    "scope": "individual",
    "iso6393": "anu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Denya",
    "type": "living",
    "scope": "individual",
    "iso6393": "anv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anaang",
    "type": "living",
    "scope": "individual",
    "iso6393": "anw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andra-Hus",
    "type": "living",
    "scope": "individual",
    "iso6393": "anx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anyin",
    "type": "living",
    "scope": "individual",
    "iso6393": "any",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anem",
    "type": "living",
    "scope": "individual",
    "iso6393": "anz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angolar",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abom",
    "type": "living",
    "scope": "individual",
    "iso6393": "aob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pemon",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andarum",
    "type": "living",
    "scope": "individual",
    "iso6393": "aod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angal Enen",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bragat",
    "type": "living",
    "scope": "individual",
    "iso6393": "aof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angoram",
    "type": "living",
    "scope": "individual",
    "iso6393": "aog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arma",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aoh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anindilyakwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mufian",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arhö",
    "type": "living",
    "scope": "individual",
    "iso6393": "aok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alor",
    "type": "living",
    "scope": "individual",
    "iso6393": "aol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ömie",
    "type": "living",
    "scope": "individual",
    "iso6393": "aom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bumbita Arapesh",
    "type": "living",
    "scope": "individual",
    "iso6393": "aon",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aore",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Taikat",
    "type": "living",
    "scope": "individual",
    "iso6393": "aos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atong (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "aot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "A'ou",
    "type": "living",
    "scope": "individual",
    "iso6393": "aou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atorada",
    "type": "living",
    "scope": "individual",
    "iso6393": "aox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uab Meto",
    "type": "living",
    "scope": "individual",
    "iso6393": "aoz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sa'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "apb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Levantine Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "apc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sudanese Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "apd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukiyip",
    "type": "living",
    "scope": "individual",
    "iso6393": "ape",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pahanan Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "apf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ampanang",
    "type": "living",
    "scope": "individual",
    "iso6393": "apg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Athpariya",
    "type": "living",
    "scope": "individual",
    "iso6393": "aph",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apiaká",
    "type": "living",
    "scope": "individual",
    "iso6393": "api",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jicarilla Apache",
    "type": "living",
    "scope": "individual",
    "iso6393": "apj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kiowa Apache",
    "type": "living",
    "scope": "individual",
    "iso6393": "apk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lipan Apache",
    "type": "living",
    "scope": "individual",
    "iso6393": "apl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mescalero-Chiricahua Apache",
    "type": "living",
    "scope": "individual",
    "iso6393": "apm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apinayé",
    "type": "living",
    "scope": "individual",
    "iso6393": "apn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ambul",
    "type": "living",
    "scope": "individual",
    "iso6393": "apo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apma",
    "type": "living",
    "scope": "individual",
    "iso6393": "app",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "A-Pucikwar",
    "type": "living",
    "scope": "individual",
    "iso6393": "apq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arop-Lokep",
    "type": "living",
    "scope": "individual",
    "iso6393": "apr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arop-Sissano",
    "type": "living",
    "scope": "individual",
    "iso6393": "aps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apatani",
    "type": "living",
    "scope": "individual",
    "iso6393": "apt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apurinã",
    "type": "living",
    "scope": "individual",
    "iso6393": "apu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alapmunte",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "apv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Apache",
    "type": "living",
    "scope": "individual",
    "iso6393": "apw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aputai",
    "type": "living",
    "scope": "individual",
    "iso6393": "apx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apalaí",
    "type": "living",
    "scope": "individual",
    "iso6393": "apy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Safeyoka",
    "type": "living",
    "scope": "individual",
    "iso6393": "apz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Archi",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ampari Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arigidi",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atohwaim",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Alta",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atakapa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aqp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arhâ",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angaité",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akuntsu",
    "type": "living",
    "scope": "individual",
    "iso6393": "aqz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arabic",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "ara",
    "iso6392B": "ara",
    "iso6392T": "ara",
    "iso6391": "ar"
  },
  {
    "name": "Standard Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "arb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Official Aramaic (700-300 BCE)",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "arc",
    "iso6392B": "arc",
    "iso6392T": "arc",
    "iso6391": null
  },
  {
    "name": "Arabana",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ard",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Arrarnta",
    "type": "living",
    "scope": "individual",
    "iso6393": "are",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aragonese",
    "type": "living",
    "scope": "individual",
    "iso6393": "arg",
    "iso6392B": "arg",
    "iso6392T": "arg",
    "iso6391": "an"
  },
  {
    "name": "Arhuaco",
    "type": "living",
    "scope": "individual",
    "iso6393": "arh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arikara",
    "type": "living",
    "scope": "individual",
    "iso6393": "ari",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arapaso",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "arj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arikapú",
    "type": "living",
    "scope": "individual",
    "iso6393": "ark",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arabela",
    "type": "living",
    "scope": "individual",
    "iso6393": "arl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapudungun",
    "type": "living",
    "scope": "individual",
    "iso6393": "arn",
    "iso6392B": "arn",
    "iso6392T": "arn",
    "iso6391": null
  },
  {
    "name": "Araona",
    "type": "living",
    "scope": "individual",
    "iso6393": "aro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arapaho",
    "type": "living",
    "scope": "individual",
    "iso6393": "arp",
    "iso6392B": "arp",
    "iso6392T": "arp",
    "iso6391": null
  },
  {
    "name": "Algerian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "arq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karo (Brazil)",
    "type": "living",
    "scope": "individual",
    "iso6393": "arr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Najdi Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ars",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aruá (Amazonas State)",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arbore",
    "type": "living",
    "scope": "individual",
    "iso6393": "arv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arawak",
    "type": "living",
    "scope": "individual",
    "iso6393": "arw",
    "iso6392B": "arw",
    "iso6392T": "arw",
    "iso6391": null
  },
  {
    "name": "Aruá (Rodonia State)",
    "type": "living",
    "scope": "individual",
    "iso6393": "arx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moroccan Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ary",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Egyptian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "arz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asu (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "asa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Assiniboine",
    "type": "living",
    "scope": "individual",
    "iso6393": "asb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Casuarina Coast Asmat",
    "type": "living",
    "scope": "individual",
    "iso6393": "asc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asas",
    "type": "living",
    "scope": "individual",
    "iso6393": "asd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "American Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ase",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Australian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "asf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cishingini",
    "type": "living",
    "scope": "individual",
    "iso6393": "asg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abishira",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ash",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buruwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "asi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sari",
    "type": "living",
    "scope": "individual",
    "iso6393": "asj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ashkun",
    "type": "living",
    "scope": "individual",
    "iso6393": "ask",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asilulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "asl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Assamese",
    "type": "living",
    "scope": "individual",
    "iso6393": "asm",
    "iso6392B": "asm",
    "iso6392T": "asm",
    "iso6391": "as"
  },
  {
    "name": "Xingú Asuriní",
    "type": "living",
    "scope": "individual",
    "iso6393": "asn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dano",
    "type": "living",
    "scope": "individual",
    "iso6393": "aso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Algerian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "asp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Austrian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "asq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "asr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ipulo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ass",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asturian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ast",
    "iso6392B": "ast",
    "iso6392T": "ast",
    "iso6391": null
  },
  {
    "name": "Tocantins Asurini",
    "type": "living",
    "scope": "individual",
    "iso6393": "asu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "asv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Australian Aborigines Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "asw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muratayak",
    "type": "living",
    "scope": "individual",
    "iso6393": "asx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaosakor Asmat",
    "type": "living",
    "scope": "individual",
    "iso6393": "asy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "As",
    "type": "living",
    "scope": "individual",
    "iso6393": "asz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pele-Ata",
    "type": "living",
    "scope": "individual",
    "iso6393": "ata",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zaiwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "atb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atsahuaca",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "atc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ata Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "atd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atemble",
    "type": "living",
    "scope": "individual",
    "iso6393": "ate",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ivbie North-Okpela-Arhe",
    "type": "living",
    "scope": "individual",
    "iso6393": "atg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Attié",
    "type": "living",
    "scope": "individual",
    "iso6393": "ati",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atikamekw",
    "type": "living",
    "scope": "individual",
    "iso6393": "atj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ati",
    "type": "living",
    "scope": "individual",
    "iso6393": "atk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mt. Iraya Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "atl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ata",
    "type": "living",
    "scope": "individual",
    "iso6393": "atm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ashtiani",
    "type": "living",
    "scope": "individual",
    "iso6393": "atn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atong (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ato",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pudtol Atta",
    "type": "living",
    "scope": "individual",
    "iso6393": "atp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aralle-Tabulahan",
    "type": "living",
    "scope": "individual",
    "iso6393": "atq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Waimiri-Atroari",
    "type": "living",
    "scope": "individual",
    "iso6393": "atr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gros Ventre",
    "type": "living",
    "scope": "individual",
    "iso6393": "ats",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pamplona Atta",
    "type": "living",
    "scope": "individual",
    "iso6393": "att",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Reel",
    "type": "living",
    "scope": "individual",
    "iso6393": "atu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Altai",
    "type": "living",
    "scope": "individual",
    "iso6393": "atv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atsugewi",
    "type": "living",
    "scope": "individual",
    "iso6393": "atw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arutani",
    "type": "living",
    "scope": "individual",
    "iso6393": "atx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aneityum",
    "type": "living",
    "scope": "individual",
    "iso6393": "aty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arta",
    "type": "living",
    "scope": "individual",
    "iso6393": "atz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asumboa",
    "type": "living",
    "scope": "individual",
    "iso6393": "aua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alugu",
    "type": "living",
    "scope": "individual",
    "iso6393": "aub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Waorani",
    "type": "living",
    "scope": "individual",
    "iso6393": "auc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anuta",
    "type": "living",
    "scope": "individual",
    "iso6393": "aud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aguna",
    "type": "living",
    "scope": "individual",
    "iso6393": "aug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aushi",
    "type": "living",
    "scope": "individual",
    "iso6393": "auh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anuki",
    "type": "living",
    "scope": "individual",
    "iso6393": "aui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awjilah",
    "type": "living",
    "scope": "individual",
    "iso6393": "auj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Heyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "auk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aulua",
    "type": "living",
    "scope": "individual",
    "iso6393": "aul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asu (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "aum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Molmo One",
    "type": "living",
    "scope": "individual",
    "iso6393": "aun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Auyokawa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "auo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makayam",
    "type": "living",
    "scope": "individual",
    "iso6393": "aup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anus",
    "type": "living",
    "scope": "individual",
    "iso6393": "auq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aruek",
    "type": "living",
    "scope": "individual",
    "iso6393": "aur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Austral",
    "type": "living",
    "scope": "individual",
    "iso6393": "aut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Auye",
    "type": "living",
    "scope": "individual",
    "iso6393": "auu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "auw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aurá",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "aux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awiyaana",
    "type": "living",
    "scope": "individual",
    "iso6393": "auy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uzbeki Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "auz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Avaric",
    "type": "living",
    "scope": "individual",
    "iso6393": "ava",
    "iso6392B": "ava",
    "iso6392T": "ava",
    "iso6391": "av"
  },
  {
    "name": "Avau",
    "type": "living",
    "scope": "individual",
    "iso6393": "avb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alviri-Vidari",
    "type": "living",
    "scope": "individual",
    "iso6393": "avd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Avestan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "ave",
    "iso6392B": "ave",
    "iso6392T": "ave",
    "iso6391": "ae"
  },
  {
    "name": "Avikam",
    "type": "living",
    "scope": "individual",
    "iso6393": "avi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kotava",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "avk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Egyptian Bedawi Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "avl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angkamuthi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "avm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Avatime",
    "type": "living",
    "scope": "individual",
    "iso6393": "avn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agavotaguerra",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "avo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aushiri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "avs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Au",
    "type": "living",
    "scope": "individual",
    "iso6393": "avt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Avokaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "avu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Avá-Canoeiro",
    "type": "living",
    "scope": "individual",
    "iso6393": "avv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awadhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "awa",
    "iso6392B": "awa",
    "iso6392T": "awa",
    "iso6391": null
  },
  {
    "name": "Awa (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "awb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cicipu",
    "type": "living",
    "scope": "individual",
    "iso6393": "awc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awetí",
    "type": "living",
    "scope": "individual",
    "iso6393": "awe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anguthimri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "awg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awbono",
    "type": "living",
    "scope": "individual",
    "iso6393": "awh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aekyom",
    "type": "living",
    "scope": "individual",
    "iso6393": "awi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awabakal",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "awk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arawum",
    "type": "living",
    "scope": "individual",
    "iso6393": "awm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awngi",
    "type": "living",
    "scope": "individual",
    "iso6393": "awn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awak",
    "type": "living",
    "scope": "individual",
    "iso6393": "awo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awera",
    "type": "living",
    "scope": "individual",
    "iso6393": "awr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Awyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "aws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Araweté",
    "type": "living",
    "scope": "individual",
    "iso6393": "awt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Awyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "awu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jair Awyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "awv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awun",
    "type": "living",
    "scope": "individual",
    "iso6393": "aww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awara",
    "type": "living",
    "scope": "individual",
    "iso6393": "awx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Edera Awyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "awy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abipon",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "axb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayerrerenge",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "axe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mato Grosso Arára",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "axg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaka (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "axk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lower Southern Aranda",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "axl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Armenian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "axm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Xârâgurè",
    "type": "living",
    "scope": "individual",
    "iso6393": "axx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awar",
    "type": "living",
    "scope": "individual",
    "iso6393": "aya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayizo Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Aymara",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayabadhu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ayd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayere",
    "type": "living",
    "scope": "individual",
    "iso6393": "aye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ginyanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hadrami Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leyigha",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akuku",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Libyan Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aymara",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "aym",
    "iso6392B": "aym",
    "iso6392T": "aym",
    "iso6391": "ay"
  },
  {
    "name": "Sanaani Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayoreo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Mesopotamian Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayi (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Aymara",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sorsogon Ayta",
    "type": "living",
    "scope": "individual",
    "iso6393": "ays",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Magbukun Ayta",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tayabas Ayta",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ayy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mai Brat",
    "type": "living",
    "scope": "individual",
    "iso6393": "ayz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Azha",
    "type": "living",
    "scope": "individual",
    "iso6393": "aza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Azerbaijani",
    "type": "living",
    "scope": "individual",
    "iso6393": "azb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Durango Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "azd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Azerbaijani",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "aze",
    "iso6392B": "aze",
    "iso6392T": "aze",
    "iso6391": "az"
  },
  {
    "name": "San Pedro Amuzgos Amuzgo",
    "type": "living",
    "scope": "individual",
    "iso6393": "azg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Azerbaijani",
    "type": "living",
    "scope": "individual",
    "iso6393": "azj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ipalapa Amuzgo",
    "type": "living",
    "scope": "individual",
    "iso6393": "azm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Durango Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "azn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awing",
    "type": "living",
    "scope": "individual",
    "iso6393": "azo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Faire Atta",
    "type": "living",
    "scope": "individual",
    "iso6393": "azt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Highland Puebla Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "azz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babatana",
    "type": "living",
    "scope": "individual",
    "iso6393": "baa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bainouk-Gunyuño",
    "type": "living",
    "scope": "individual",
    "iso6393": "bab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badui",
    "type": "living",
    "scope": "individual",
    "iso6393": "bac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baré",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nubaca",
    "type": "living",
    "scope": "individual",
    "iso6393": "baf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tuki",
    "type": "living",
    "scope": "individual",
    "iso6393": "bag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahamas Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "bah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barakai",
    "type": "living",
    "scope": "individual",
    "iso6393": "baj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bashkir",
    "type": "living",
    "scope": "individual",
    "iso6393": "bak",
    "iso6392B": "bak",
    "iso6392T": "bak",
    "iso6391": "ba"
  },
  {
    "name": "Baluchi",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "bal",
    "iso6392B": "bal",
    "iso6392T": "bal",
    "iso6391": null
  },
  {
    "name": "Bambara",
    "type": "living",
    "scope": "individual",
    "iso6393": "bam",
    "iso6392B": "bam",
    "iso6392T": "bam",
    "iso6391": "bm"
  },
  {
    "name": "Balinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "ban",
    "iso6392B": "ban",
    "iso6392T": "ban",
    "iso6391": null
  },
  {
    "name": "Waimaha",
    "type": "living",
    "scope": "individual",
    "iso6393": "bao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bantawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bavarian",
    "type": "living",
    "scope": "individual",
    "iso6393": "bar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basa (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bas",
    "iso6392B": "bas",
    "iso6392T": "bas",
    "iso6391": null
  },
  {
    "name": "Bada (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bambili-Bambui",
    "type": "living",
    "scope": "individual",
    "iso6393": "baw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batuley",
    "type": "living",
    "scope": "individual",
    "iso6393": "bay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baatonum",
    "type": "living",
    "scope": "individual",
    "iso6393": "bba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Toba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bau",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baibai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barama",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bugan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barombi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghomálá'",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babanki",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bats",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babango",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uneapa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Bobo Madaré",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Central Banda",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamali",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Girawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakpinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mburku",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kulung (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karnai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bubia",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Befang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babalia Creole Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "bbz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Bai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bainouk-Samik",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Balochi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Babar",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamenyam",
    "type": "living",
    "scope": "individual",
    "iso6393": "bce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Pokur",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bariai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baoulé",
    "type": "living",
    "scope": "individual",
    "iso6393": "bci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bardi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bunaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bck",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bannoni",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bali (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaluli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bali (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bench",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babine",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kohumono",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bendi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awad Bing",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shoo-Minda-Nye",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bana",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bacama",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bainouk-Gunyaamolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bcz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bayot",
    "type": "living",
    "scope": "individual",
    "iso6393": "bda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basap",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emberá-Baudó",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bunama",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bade",
    "type": "living",
    "scope": "individual",
    "iso6393": "bde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biage",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonggi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baka (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Budukh",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indonesian Bajau",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buduma",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baldemu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morom",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bende",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahnar",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Coast Bajau",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burunge",
    "type": "living",
    "scope": "individual",
    "iso6393": "bds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bokoto",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oroko",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bodo Parja",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baham",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Budong-Budong",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bandjalang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badeshi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bdz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beaver",
    "type": "living",
    "scope": "individual",
    "iso6393": "bea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bebele",
    "type": "living",
    "scope": "individual",
    "iso6393": "beb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iceve-Maci",
    "type": "living",
    "scope": "individual",
    "iso6393": "bec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bedoanas",
    "type": "living",
    "scope": "individual",
    "iso6393": "bed",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Byangsi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Benabena",
    "type": "living",
    "scope": "individual",
    "iso6393": "bef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belait",
    "type": "living",
    "scope": "individual",
    "iso6393": "beg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biali",
    "type": "living",
    "scope": "individual",
    "iso6393": "beh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bekati'",
    "type": "living",
    "scope": "individual",
    "iso6393": "bei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beja",
    "type": "living",
    "scope": "individual",
    "iso6393": "bej",
    "iso6392B": "bej",
    "iso6392T": "bej",
    "iso6391": null
  },
  {
    "name": "Bebeli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belarusian",
    "type": "living",
    "scope": "individual",
    "iso6393": "bel",
    "iso6392B": "bel",
    "iso6392T": "bel",
    "iso6391": "be"
  },
  {
    "name": "Bemba (Zambia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bem",
    "iso6392B": "bem",
    "iso6392T": "bem",
    "iso6391": null
  },
  {
    "name": "Bengali",
    "type": "living",
    "scope": "individual",
    "iso6393": "ben",
    "iso6392B": "ben",
    "iso6392T": "ben",
    "iso6391": "bn"
  },
  {
    "name": "Beami",
    "type": "living",
    "scope": "individual",
    "iso6393": "beo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Besoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beembe",
    "type": "living",
    "scope": "individual",
    "iso6393": "beq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Besme",
    "type": "living",
    "scope": "individual",
    "iso6393": "bes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guiberoua Béte",
    "type": "living",
    "scope": "individual",
    "iso6393": "bet",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Blagar",
    "type": "living",
    "scope": "individual",
    "iso6393": "beu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daloa Bété",
    "type": "living",
    "scope": "individual",
    "iso6393": "bev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Betawi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jur Modo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beli (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bey",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bena (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pauri Bareli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panyi Bai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bafut",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Betaf",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bofi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bff",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busang Kayan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Blafe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "British Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bafanji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ban Khor Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda-Ndélé",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mmen",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bunak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malba Birifor",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bazigar",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Bai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balti",
    "type": "living",
    "scope": "individual",
    "iso6393": "bft",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gahri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bondo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bantayanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagheli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mahasu Pahari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bfz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwamhi-Wuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bobongko",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haryanvi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rathwi Bareli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bauria",
    "type": "living",
    "scope": "individual",
    "iso6393": "bge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangandu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bugun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Giangan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangolan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bit",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bo (Laos)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Balochi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Koga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Balochi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bawm Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tagabawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bughotu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbongno",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Warkay-Bipim",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhatri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balkan Gagauz Turkish",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Benggoi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banggai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bgz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bharia",
    "type": "living",
    "scope": "individual",
    "iso6393": "bha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhili",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhadrawahi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Odiai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Binandere",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukharic",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhilali",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahing",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bimin",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bathari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bohtan Neo-Aramaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhojpuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bho",
    "iso6392B": "bho",
    "iso6392T": "bho",
    "iso6391": null
  },
  {
    "name": "Bima",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tukang Besi South",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bara Malagasy",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buwal",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhattiyali",
    "type": "living",
    "scope": "individual",
    "iso6393": "bht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhunjia",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahau",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhalay",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhele",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bada (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bhz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badimaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "bia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bissa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bikaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "bic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bidiyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bepour",
    "type": "living",
    "scope": "individual",
    "iso6393": "bie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biafada",
    "type": "living",
    "scope": "individual",
    "iso6393": "bif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biangai",
    "type": "living",
    "scope": "individual",
    "iso6393": "big",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vaghat-Ya-Bijim-Legeri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bikol",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "bik",
    "iso6392B": "bik",
    "iso6392T": "bik",
    "iso6391": null
  },
  {
    "name": "Bile",
    "type": "living",
    "scope": "individual",
    "iso6393": "bil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bimoba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bini",
    "type": "living",
    "scope": "individual",
    "iso6393": "bin",
    "iso6392B": "bin",
    "iso6392T": "bin",
    "iso6391": null
  },
  {
    "name": "Nai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bila",
    "type": "living",
    "scope": "individual",
    "iso6393": "bip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bipi",
    "type": "living",
    "scope": "individual",
    "iso6393": "biq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bisorio",
    "type": "living",
    "scope": "individual",
    "iso6393": "bir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bislama",
    "type": "living",
    "scope": "individual",
    "iso6393": "bis",
    "iso6392B": "bis",
    "iso6392T": "bis",
    "iso6391": "bi"
  },
  {
    "name": "Berinomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biete",
    "type": "living",
    "scope": "individual",
    "iso6393": "biu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Birifor",
    "type": "living",
    "scope": "individual",
    "iso6393": "biv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kol (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "biw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bijori",
    "type": "living",
    "scope": "individual",
    "iso6393": "bix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birhor",
    "type": "living",
    "scope": "individual",
    "iso6393": "biy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baloi",
    "type": "living",
    "scope": "individual",
    "iso6393": "biz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Budza",
    "type": "living",
    "scope": "individual",
    "iso6393": "bja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banggarla",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bjb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bariji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biao-Jiao Mien",
    "type": "living",
    "scope": "individual",
    "iso6393": "bje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barzani Jewish Neo-Aramaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bidyogo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahinemo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanauji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barok",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bulu (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bajelani",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banjar",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mid-Southern Banda",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fanamaket",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Binumarien",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bajan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balanta-Ganja",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busuu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bedjond",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakwé",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banao Itneg",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bayali",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bjy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baruga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bjz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kyak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baka (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Binukid",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beeke",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buraka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakoko",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baki",
    "type": "living",
    "scope": "individual",
    "iso6393": "bki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pande",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brokskat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berik",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kom (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukitan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwa'",
    "type": "living",
    "scope": "individual",
    "iso6393": "bko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boko (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakairí",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakumpai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Sorsoganon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boloki",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buhid",
    "type": "living",
    "scope": "individual",
    "iso6393": "bku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bekwarra",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bekwel",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baikeno",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bokyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bungku",
    "type": "living",
    "scope": "individual",
    "iso6393": "bkz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siksika",
    "type": "living",
    "scope": "individual",
    "iso6393": "bla",
    "iso6392B": "bla",
    "iso6392T": "bla",
    "iso6391": null
  },
  {
    "name": "Bilua",
    "type": "living",
    "scope": "individual",
    "iso6393": "blb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bella Coola",
    "type": "living",
    "scope": "individual",
    "iso6393": "blc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolango",
    "type": "living",
    "scope": "individual",
    "iso6393": "bld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balanta-Kentohe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ble",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buol",
    "type": "living",
    "scope": "individual",
    "iso6393": "blf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balau",
    "type": "living",
    "scope": "individual",
    "iso6393": "blg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuwaa",
    "type": "living",
    "scope": "individual",
    "iso6393": "blh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolia",
    "type": "living",
    "scope": "individual",
    "iso6393": "bli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolongan",
    "type": "living",
    "scope": "individual",
    "iso6393": "blj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pa'o Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "blk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biloxi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beli (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "blm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Catanduanes Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "bln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anii",
    "type": "living",
    "scope": "individual",
    "iso6393": "blo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Blablanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "blp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baluan-Pam",
    "type": "living",
    "scope": "individual",
    "iso6393": "blq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Blang",
    "type": "living",
    "scope": "individual",
    "iso6393": "blr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balaesang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tai Dam",
    "type": "living",
    "scope": "individual",
    "iso6393": "blt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "blv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balangao",
    "type": "living",
    "scope": "individual",
    "iso6393": "blw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mag-Indi Ayta",
    "type": "living",
    "scope": "individual",
    "iso6393": "blx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Notre",
    "type": "living",
    "scope": "individual",
    "iso6393": "bly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balantak",
    "type": "living",
    "scope": "individual",
    "iso6393": "blz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lame",
    "type": "living",
    "scope": "individual",
    "iso6393": "bma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bembe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biem",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Manduri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limassa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bom",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kein",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagirmi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bote-Majhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghayavi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bomboli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Betsimisaraka Malagasy",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bina (Papua New Guinea)",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bambalang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bulgebi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bomu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muinane",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilma Kanuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biao Mon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Somba-Siawari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bum",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bomwali",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baimak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baramu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonerate",
    "type": "living",
    "scope": "individual",
    "iso6393": "bna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bookan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bontok",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "bnc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bintauna",
    "type": "living",
    "scope": "individual",
    "iso6393": "bne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masiwang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Benga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Tawbuid",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bierebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bunun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bantoanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bola",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bantik",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Butmas-Tur",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bundeli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bentong",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonerif",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bisis",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangubangu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bintulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beezen",
    "type": "living",
    "scope": "individual",
    "iso6393": "bnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bora",
    "type": "living",
    "scope": "individual",
    "iso6393": "boa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aweer",
    "type": "living",
    "scope": "individual",
    "iso6393": "bob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tibetan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bod",
    "iso6392B": "tib",
    "iso6392T": "bod",
    "iso6391": "bo"
  },
  {
    "name": "Mundabli",
    "type": "living",
    "scope": "individual",
    "iso6393": "boe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamako Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boma",
    "type": "living",
    "scope": "individual",
    "iso6393": "boh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barbareño",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "boi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anjam",
    "type": "living",
    "scope": "individual",
    "iso6393": "boj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonjo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bole",
    "type": "living",
    "scope": "individual",
    "iso6393": "bol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berom",
    "type": "living",
    "scope": "individual",
    "iso6393": "bom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bine",
    "type": "living",
    "scope": "individual",
    "iso6393": "bon",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiemacèwè Bozo",
    "type": "living",
    "scope": "individual",
    "iso6393": "boo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonkiman",
    "type": "living",
    "scope": "individual",
    "iso6393": "bop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bogaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "boq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Borôro",
    "type": "living",
    "scope": "individual",
    "iso6393": "bor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bosnian",
    "type": "living",
    "scope": "individual",
    "iso6393": "bos",
    "iso6392B": "bos",
    "iso6392T": "bos",
    "iso6391": "bs"
  },
  {
    "name": "Bongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bondei",
    "type": "living",
    "scope": "individual",
    "iso6393": "bou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tuwuli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rema",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "box",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bodo (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "boy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiéyaxo Bozo",
    "type": "living",
    "scope": "individual",
    "iso6393": "boz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daakaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barbacoas",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bpb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda-Banda",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonggo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Botlikh",
    "type": "living",
    "scope": "individual",
    "iso6393": "bph",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagupi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Binji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orowe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Broome Pearling Lugger Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biyom",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzao Min",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaure",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koronadal Blaan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sarangani Blaan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barrow Point",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bpt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bongu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bian Marind",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bo (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palya Bareli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bishnupriya",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bpz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tchumbuli",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagusa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boko (Benin)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bung",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Kaloum",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bqf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bago-Kusuntu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baima",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakhtiari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bandial",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda-Mbrès",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilakura",
    "type": "living",
    "scope": "individual",
    "iso6393": "bql",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wumboko",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bulgarian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biritai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burusu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bosngun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamukumbit",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boguru",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koro Wachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buru (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baangi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bengkala Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bqz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Braj",
    "type": "living",
    "scope": "individual",
    "iso6393": "bra",
    "iso6392B": "bra",
    "iso6392T": "bra",
    "iso6391": null
  },
  {
    "name": "Lave",
    "type": "living",
    "scope": "individual",
    "iso6393": "brb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berbice Creole Dutch",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "brc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baraamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "brd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Breton",
    "type": "living",
    "scope": "individual",
    "iso6393": "bre",
    "iso6392B": "bre",
    "iso6392T": "bre",
    "iso6391": "br"
  },
  {
    "name": "Bera",
    "type": "living",
    "scope": "individual",
    "iso6393": "brf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baure",
    "type": "living",
    "scope": "individual",
    "iso6393": "brg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brahui",
    "type": "living",
    "scope": "individual",
    "iso6393": "brh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mokpwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bieria",
    "type": "living",
    "scope": "individual",
    "iso6393": "brj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birked",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "brk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "brl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barambu",
    "type": "living",
    "scope": "individual",
    "iso6393": "brm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boruca",
    "type": "living",
    "scope": "individual",
    "iso6393": "brn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brokkat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barapasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "brp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Breri",
    "type": "living",
    "scope": "individual",
    "iso6393": "brq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birao",
    "type": "living",
    "scope": "individual",
    "iso6393": "brr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baras",
    "type": "living",
    "scope": "individual",
    "iso6393": "brs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bitare",
    "type": "living",
    "scope": "individual",
    "iso6393": "brt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Bru",
    "type": "living",
    "scope": "individual",
    "iso6393": "bru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Bru",
    "type": "living",
    "scope": "individual",
    "iso6393": "brv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bellari",
    "type": "living",
    "scope": "individual",
    "iso6393": "brw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bodo (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "brx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burui",
    "type": "living",
    "scope": "individual",
    "iso6393": "bry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilbil",
    "type": "living",
    "scope": "individual",
    "iso6393": "brz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abinomn",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brunei Bisaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bassari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wushi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bauchi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bashkardi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kati",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bassossi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangwinji",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burushaski",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basa-Gumna",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busami",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barasana-Eduria",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buso",
    "type": "living",
    "scope": "individual",
    "iso6393": "bso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Sitemu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bassa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bassa-Kontagora",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akoose",
    "type": "living",
    "scope": "individual",
    "iso6393": "bss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basketo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bst",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bahonsuai",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baga Sobané",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bsv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baiso",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yangkam",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sabah Bisaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "bsy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bata",
    "type": "living",
    "scope": "individual",
    "iso6393": "bta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bati (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "btc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Dairi",
    "type": "living",
    "scope": "individual",
    "iso6393": "btd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamo-Ningi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bte",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birgit",
    "type": "living",
    "scope": "individual",
    "iso6393": "btf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gagnoa Bété",
    "type": "living",
    "scope": "individual",
    "iso6393": "btg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biatah Bidayuh",
    "type": "living",
    "scope": "individual",
    "iso6393": "bth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burate",
    "type": "living",
    "scope": "individual",
    "iso6393": "bti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bacanese Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "btj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Mandailing",
    "type": "living",
    "scope": "individual",
    "iso6393": "btm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ratagnon",
    "type": "living",
    "scope": "individual",
    "iso6393": "btn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rinconada Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "bto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Budibud",
    "type": "living",
    "scope": "individual",
    "iso6393": "btp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batek",
    "type": "living",
    "scope": "individual",
    "iso6393": "btq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baetora",
    "type": "living",
    "scope": "individual",
    "iso6393": "btr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Simalungun",
    "type": "living",
    "scope": "individual",
    "iso6393": "bts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bete-Bendi",
    "type": "living",
    "scope": "individual",
    "iso6393": "btt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batu",
    "type": "living",
    "scope": "individual",
    "iso6393": "btu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bateri",
    "type": "living",
    "scope": "individual",
    "iso6393": "btv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Butuanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "btw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Karo",
    "type": "living",
    "scope": "individual",
    "iso6393": "btx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bobot",
    "type": "living",
    "scope": "individual",
    "iso6393": "bty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak Alas-Kluet",
    "type": "living",
    "scope": "individual",
    "iso6393": "btz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buriat",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "bua",
    "iso6392B": "bua",
    "iso6392T": "bua",
    "iso6391": null
  },
  {
    "name": "Bua",
    "type": "living",
    "scope": "individual",
    "iso6393": "bub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bushi",
    "type": "living",
    "scope": "individual",
    "iso6393": "buc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ntcham",
    "type": "living",
    "scope": "individual",
    "iso6393": "bud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beothuk",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bushoong",
    "type": "living",
    "scope": "individual",
    "iso6393": "buf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buginese",
    "type": "living",
    "scope": "individual",
    "iso6393": "bug",
    "iso6392B": "bug",
    "iso6392T": "bug",
    "iso6391": null
  },
  {
    "name": "Younuo Bunu",
    "type": "living",
    "scope": "individual",
    "iso6393": "buh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bongili",
    "type": "living",
    "scope": "individual",
    "iso6393": "bui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basa-Gurmana",
    "type": "living",
    "scope": "individual",
    "iso6393": "buj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bugawac",
    "type": "living",
    "scope": "individual",
    "iso6393": "buk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bulgarian",
    "type": "living",
    "scope": "individual",
    "iso6393": "bul",
    "iso6392B": "bul",
    "iso6392T": "bul",
    "iso6391": "bg"
  },
  {
    "name": "Bulu (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sherbro",
    "type": "living",
    "scope": "individual",
    "iso6393": "bun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Terei",
    "type": "living",
    "scope": "individual",
    "iso6393": "buo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brem",
    "type": "living",
    "scope": "individual",
    "iso6393": "buq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bokobaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "bus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bungain",
    "type": "living",
    "scope": "individual",
    "iso6393": "but",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Budu",
    "type": "living",
    "scope": "individual",
    "iso6393": "buu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bun",
    "type": "living",
    "scope": "individual",
    "iso6393": "buv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bubi",
    "type": "living",
    "scope": "individual",
    "iso6393": "buw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boghom",
    "type": "living",
    "scope": "individual",
    "iso6393": "bux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bullom So",
    "type": "living",
    "scope": "individual",
    "iso6393": "buy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukwen",
    "type": "living",
    "scope": "individual",
    "iso6393": "buz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barein",
    "type": "living",
    "scope": "individual",
    "iso6393": "bva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bube",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baelelea",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baeggu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berau Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "bve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boor",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonkeng",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bure",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belanda Viri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolivian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bamunka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buna",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolgo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bumang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burarra",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bati (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukit Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baniva",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bvv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boga",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dibole",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baybayanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bauzi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bvz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwatoo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namosi-Naitasiri-Serua",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwile",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwaidoka",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwe Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boselewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bishuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baniwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Láá Láá Bwamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bauwaki",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwela",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biwat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wunai Bunu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boro (Ethiopia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandobo Bawah",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Bobo Madaré",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bura-Pabir",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bomboma",
    "type": "living",
    "scope": "individual",
    "iso6393": "bws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bafaw-Balong",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buli (Ghana)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "bww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bu-Nao Bunu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cwi Bwamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bwisi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bwz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tairaha",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belanda Bor",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Molengue",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pela",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Birale",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilur",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangala",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buhutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pirlatapa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bxi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bayungu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bukusu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jalkunan",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongolia Buriat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burduna",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barikanchi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bebil",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beele",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Russia Buriat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Busam",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "China Buriat",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berakou",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bankagooma",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Binahari",
    "type": "living",
    "scope": "individual",
    "iso6393": "bxz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bikya",
    "type": "living",
    "scope": "individual",
    "iso6393": "byb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ubaghara",
    "type": "living",
    "scope": "individual",
    "iso6393": "byc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Benyadu'",
    "type": "living",
    "scope": "individual",
    "iso6393": "byd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pouye",
    "type": "living",
    "scope": "individual",
    "iso6393": "bye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bete",
    "type": "living",
    "scope": "individual",
    "iso6393": "byf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baygo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "byg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhujel",
    "type": "living",
    "scope": "individual",
    "iso6393": "byh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "byi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bina (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "byj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biao",
    "type": "living",
    "scope": "individual",
    "iso6393": "byk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bayono",
    "type": "living",
    "scope": "individual",
    "iso6393": "byl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bidyara",
    "type": "living",
    "scope": "individual",
    "iso6393": "bym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilin",
    "type": "living",
    "scope": "individual",
    "iso6393": "byn",
    "iso6392B": "byn",
    "iso6392T": "byn",
    "iso6391": null
  },
  {
    "name": "Biyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "byo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bumaji",
    "type": "living",
    "scope": "individual",
    "iso6393": "byp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basay",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "byq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baruya",
    "type": "living",
    "scope": "individual",
    "iso6393": "byr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burak",
    "type": "living",
    "scope": "individual",
    "iso6393": "bys",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Berti",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "byt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Medumba",
    "type": "living",
    "scope": "individual",
    "iso6393": "byv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belhariya",
    "type": "living",
    "scope": "individual",
    "iso6393": "byw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Qaqet",
    "type": "living",
    "scope": "individual",
    "iso6393": "byx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banaro",
    "type": "living",
    "scope": "individual",
    "iso6393": "byz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "bza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andio",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Betsimisaraka Malagasy",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bribri",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jenaama Bozo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bze",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boikin",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Babuza",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapos Buang",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Belize Kriol English",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nicaragua Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boano (Sulawesi)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolondo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Boano (Maluku)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bozaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kemberano",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buli (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "bzr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brazilian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brithenig",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "bzt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burmeso",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naami",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basa (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kɛlɛngaxo Bozo",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obanliku",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Evant",
    "type": "living",
    "scope": "individual",
    "iso6393": "bzz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chortí",
    "type": "living",
    "scope": "individual",
    "iso6393": "caa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garifuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "cab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chuj",
    "type": "living",
    "scope": "individual",
    "iso6393": "cac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caddo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cad",
    "iso6392B": "cad",
    "iso6392T": "cad",
    "iso6391": null
  },
  {
    "name": "Lehar",
    "type": "living",
    "scope": "individual",
    "iso6393": "cae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Carrier",
    "type": "living",
    "scope": "individual",
    "iso6393": "caf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nivaclé",
    "type": "living",
    "scope": "individual",
    "iso6393": "cag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cahuarano",
    "type": "living",
    "scope": "individual",
    "iso6393": "cah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chané",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "caj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaqchikel",
    "type": "living",
    "scope": "individual",
    "iso6393": "cak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carolinian",
    "type": "living",
    "scope": "individual",
    "iso6393": "cal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cemuhî",
    "type": "living",
    "scope": "individual",
    "iso6393": "cam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chambri",
    "type": "living",
    "scope": "individual",
    "iso6393": "can",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chácobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chipaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "cap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Car Nicobarese",
    "type": "living",
    "scope": "individual",
    "iso6393": "caq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galibi Carib",
    "type": "living",
    "scope": "individual",
    "iso6393": "car",
    "iso6392B": "car",
    "iso6392T": "car",
    "iso6391": null
  },
  {
    "name": "Tsimané",
    "type": "living",
    "scope": "individual",
    "iso6393": "cas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Catalan",
    "type": "living",
    "scope": "individual",
    "iso6393": "cat",
    "iso6392B": "cat",
    "iso6392T": "cat",
    "iso6391": "ca"
  },
  {
    "name": "Cavineña",
    "type": "living",
    "scope": "individual",
    "iso6393": "cav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Callawalla",
    "type": "living",
    "scope": "individual",
    "iso6393": "caw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiquitano",
    "type": "living",
    "scope": "individual",
    "iso6393": "cax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cayuga",
    "type": "living",
    "scope": "individual",
    "iso6393": "cay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Canichana",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "caz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cabiyarí",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carapana",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carijona",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chimila",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ede Cabe",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chavacano",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bualkhaw Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyahkur",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Izora",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tsucuba",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cashibo-Cacataibo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cashinahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chayahuita",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Candoshi-Shapra",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cacua",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinabalian",
    "type": "living",
    "scope": "individual",
    "iso6393": "cbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carabayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cauca",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chamicuro",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cafundo Creole",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chopi",
    "type": "living",
    "scope": "individual",
    "iso6393": "cce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Samba Daka",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atsam",
    "type": "living",
    "scope": "individual",
    "iso6393": "cch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kasanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cutchi-Swahili",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malaccan Creole Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Comaltepec Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chakma",
    "type": "living",
    "scope": "individual",
    "iso6393": "ccp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cacaopera",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ccr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Choni",
    "type": "living",
    "scope": "individual",
    "iso6393": "cda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chenchu",
    "type": "living",
    "scope": "individual",
    "iso6393": "cde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiru",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chamari",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chambeali",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chodri",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Churahi",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chepang",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chaudangsi",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Min Dong Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cinda-Regi-Tiyal",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chadian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "cds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chadong",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koda",
    "type": "living",
    "scope": "individual",
    "iso6393": "cdz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lower Chehalis",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cebuano",
    "type": "living",
    "scope": "individual",
    "iso6393": "ceb",
    "iso6392B": "ceb",
    "iso6392T": "ceb",
    "iso6391": null
  },
  {
    "name": "Chamacoco",
    "type": "living",
    "scope": "individual",
    "iso6393": "ceg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Khumi Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cen",
    "type": "living",
    "scope": "individual",
    "iso6393": "cen",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Czech",
    "type": "living",
    "scope": "individual",
    "iso6393": "ces",
    "iso6392B": "cze",
    "iso6392T": "ces",
    "iso6391": "cs"
  },
  {
    "name": "Centúúm",
    "type": "living",
    "scope": "individual",
    "iso6393": "cet",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dijim-Bwilim",
    "type": "living",
    "scope": "individual",
    "iso6393": "cfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cara",
    "type": "living",
    "scope": "individual",
    "iso6393": "cfd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Como Karim",
    "type": "living",
    "scope": "individual",
    "iso6393": "cfg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Falam Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cfm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Changriwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "cga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kagayanen",
    "type": "living",
    "scope": "individual",
    "iso6393": "cgc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiga",
    "type": "living",
    "scope": "individual",
    "iso6393": "cgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chocangacakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "cgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chamorro",
    "type": "living",
    "scope": "individual",
    "iso6393": "cha",
    "iso6392B": "cha",
    "iso6392T": "cha",
    "iso6391": "ch"
  },
  {
    "name": "Chibcha",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "chb",
    "iso6392B": "chb",
    "iso6392T": "chb",
    "iso6391": null
  },
  {
    "name": "Catawba",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "chc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Highland Oaxaca Chontal",
    "type": "living",
    "scope": "individual",
    "iso6393": "chd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chechen",
    "type": "living",
    "scope": "individual",
    "iso6393": "che",
    "iso6392B": "che",
    "iso6392T": "che",
    "iso6391": "ce"
  },
  {
    "name": "Tabasco Chontal",
    "type": "living",
    "scope": "individual",
    "iso6393": "chf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chagatai",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "chg",
    "iso6392B": "chg",
    "iso6392T": "chg",
    "iso6391": null
  },
  {
    "name": "Chinook",
    "type": "living",
    "scope": "individual",
    "iso6393": "chh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ojitlán Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "chj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chuukese",
    "type": "living",
    "scope": "individual",
    "iso6393": "chk",
    "iso6392B": "chk",
    "iso6392T": "chk",
    "iso6391": null
  },
  {
    "name": "Cahuilla",
    "type": "living",
    "scope": "individual",
    "iso6393": "chl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mari (Russia)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "chm",
    "iso6392B": "chm",
    "iso6392T": "chm",
    "iso6391": null
  },
  {
    "name": "Chinook jargon",
    "type": "living",
    "scope": "individual",
    "iso6393": "chn",
    "iso6392B": "chn",
    "iso6392T": "chn",
    "iso6391": null
  },
  {
    "name": "Choctaw",
    "type": "living",
    "scope": "individual",
    "iso6393": "cho",
    "iso6392B": "cho",
    "iso6392T": "cho",
    "iso6391": null
  },
  {
    "name": "Chipewyan",
    "type": "living",
    "scope": "individual",
    "iso6393": "chp",
    "iso6392B": "chp",
    "iso6392T": "chp",
    "iso6391": null
  },
  {
    "name": "Quiotepec Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "chq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cherokee",
    "type": "living",
    "scope": "individual",
    "iso6393": "chr",
    "iso6392B": "chr",
    "iso6392T": "chr",
    "iso6391": null
  },
  {
    "name": "Cholón",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Church Slavic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "chu",
    "iso6392B": "chu",
    "iso6392T": "chu",
    "iso6391": "cu"
  },
  {
    "name": "Chuvash",
    "type": "living",
    "scope": "individual",
    "iso6393": "chv",
    "iso6392B": "chv",
    "iso6392T": "chv",
    "iso6391": "cv"
  },
  {
    "name": "Chuwabu",
    "type": "living",
    "scope": "individual",
    "iso6393": "chw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chantyal",
    "type": "living",
    "scope": "individual",
    "iso6393": "chx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cheyenne",
    "type": "living",
    "scope": "individual",
    "iso6393": "chy",
    "iso6392B": "chy",
    "iso6392T": "chy",
    "iso6391": null
  },
  {
    "name": "Ozumacín Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "chz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cia-Cia",
    "type": "living",
    "scope": "individual",
    "iso6393": "cia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ci Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "cib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chickasaw",
    "type": "living",
    "scope": "individual",
    "iso6393": "cic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chimariko",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cineni",
    "type": "living",
    "scope": "individual",
    "iso6393": "cie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chinali",
    "type": "living",
    "scope": "individual",
    "iso6393": "cih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chitkuli Kinnauri",
    "type": "living",
    "scope": "individual",
    "iso6393": "cik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cimbrian",
    "type": "living",
    "scope": "individual",
    "iso6393": "cim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cinta Larga",
    "type": "living",
    "scope": "individual",
    "iso6393": "cin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiapanec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "cir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chippewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ciw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chaima",
    "type": "living",
    "scope": "individual",
    "iso6393": "ciy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Cham",
    "type": "living",
    "scope": "individual",
    "iso6393": "cja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chru",
    "type": "living",
    "scope": "individual",
    "iso6393": "cje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Upper Chehalis",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cjh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chamalal",
    "type": "living",
    "scope": "individual",
    "iso6393": "cji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chokwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Cham",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chenapian",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ashéninka Pajonal",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cabécar",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shor",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chuave",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jinyu Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "cjy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Kurdish",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chak",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cibak",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaang Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anufo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kajakse",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kairak",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chukot",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koasati",
    "type": "living",
    "scope": "individual",
    "iso6393": "cku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kavalan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caka",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cakfem-Mushere",
    "type": "living",
    "scope": "individual",
    "iso6393": "cky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cakchiquel-Quiché Mixed Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ckz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ron",
    "type": "living",
    "scope": "individual",
    "iso6393": "cla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chilcotin",
    "type": "living",
    "scope": "individual",
    "iso6393": "clc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chaldean Neo-Aramaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "cld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lealao Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chilisso",
    "type": "living",
    "scope": "individual",
    "iso6393": "clh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chakali",
    "type": "living",
    "scope": "individual",
    "iso6393": "cli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laitu Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "clj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idu-Mishmi",
    "type": "living",
    "scope": "individual",
    "iso6393": "clk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chala",
    "type": "living",
    "scope": "individual",
    "iso6393": "cll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Clallam",
    "type": "living",
    "scope": "individual",
    "iso6393": "clm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lowland Oaxaca Chontal",
    "type": "living",
    "scope": "individual",
    "iso6393": "clo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lautu Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "clt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caluyanun",
    "type": "living",
    "scope": "individual",
    "iso6393": "clu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chulym",
    "type": "living",
    "scope": "individual",
    "iso6393": "clw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Highland Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "cly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maa",
    "type": "living",
    "scope": "individual",
    "iso6393": "cma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cerma",
    "type": "living",
    "scope": "individual",
    "iso6393": "cme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Classical Mongolian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "cmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emberá-Chamí",
    "type": "living",
    "scope": "individual",
    "iso6393": "cmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Campalagian",
    "type": "living",
    "scope": "individual",
    "iso6393": "cml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Michigamea",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandarin Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "cmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Mnong",
    "type": "living",
    "scope": "individual",
    "iso6393": "cmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mro-Khimi Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Messapic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "cms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Camtho",
    "type": "living",
    "scope": "individual",
    "iso6393": "cmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Changthang",
    "type": "living",
    "scope": "individual",
    "iso6393": "cna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chinbon Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Côông",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Qiang",
    "type": "living",
    "scope": "individual",
    "iso6393": "cng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hakha Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asháninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "cni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khumi Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lalana Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Con",
    "type": "living",
    "scope": "individual",
    "iso6393": "cno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Asmat",
    "type": "living",
    "scope": "individual",
    "iso6393": "cns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tepetotutla Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chenoua",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngawn Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Cornish",
    "type": "historical",
    "scope": "individual",
    "iso6393": "cnx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cocos Islands Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "coa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chicomuceltec",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cocopa",
    "type": "living",
    "scope": "individual",
    "iso6393": "coc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cocama-Cocamilla",
    "type": "living",
    "scope": "individual",
    "iso6393": "cod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koreguaje",
    "type": "living",
    "scope": "individual",
    "iso6393": "coe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Colorado",
    "type": "living",
    "scope": "individual",
    "iso6393": "cof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chong",
    "type": "living",
    "scope": "individual",
    "iso6393": "cog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chonyi-Dzihana-Kauma",
    "type": "living",
    "scope": "individual",
    "iso6393": "coh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cochimi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "coj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa Teresa Cora",
    "type": "living",
    "scope": "individual",
    "iso6393": "cok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Columbia-Wenatchi",
    "type": "living",
    "scope": "individual",
    "iso6393": "col",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Comanche",
    "type": "living",
    "scope": "individual",
    "iso6393": "com",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cofán",
    "type": "living",
    "scope": "individual",
    "iso6393": "con",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Comox",
    "type": "living",
    "scope": "individual",
    "iso6393": "coo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coptic",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cop",
    "iso6392B": "cop",
    "iso6392T": "cop",
    "iso6391": null
  },
  {
    "name": "Coquille",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "coq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cornish",
    "type": "living",
    "scope": "individual",
    "iso6393": "cor",
    "iso6392B": "cor",
    "iso6392T": "cor",
    "iso6391": "kw"
  },
  {
    "name": "Corsican",
    "type": "living",
    "scope": "individual",
    "iso6393": "cos",
    "iso6392B": "cos",
    "iso6392T": "cos",
    "iso6391": "co"
  },
  {
    "name": "Caquinte",
    "type": "living",
    "scope": "individual",
    "iso6393": "cot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wamey",
    "type": "living",
    "scope": "individual",
    "iso6393": "cou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cao Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "cov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cowlitz",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nanti",
    "type": "living",
    "scope": "individual",
    "iso6393": "cox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chochotec",
    "type": "living",
    "scope": "individual",
    "iso6393": "coz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palantla Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ucayali-Yurúa Ashéninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ajyíninka Apurucayali",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cappadocian Greek",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cpg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chinese Pidgin English",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cherepon",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpeego",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Capiznon",
    "type": "living",
    "scope": "individual",
    "iso6393": "cps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pichis Ashéninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pu-Xian Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Ucayali Ashéninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "cpy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chuanqiandian Cluster Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "cqd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chara",
    "type": "living",
    "scope": "individual",
    "iso6393": "cra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Island Carib",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "crb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lonwolwol",
    "type": "living",
    "scope": "individual",
    "iso6393": "crc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coeur d'Alene",
    "type": "living",
    "scope": "individual",
    "iso6393": "crd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cree",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "cre",
    "iso6392B": "cre",
    "iso6392T": "cre",
    "iso6391": "cr"
  },
  {
    "name": "Caramanta",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "crf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Michif",
    "type": "living",
    "scope": "individual",
    "iso6393": "crg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Crimean Tatar",
    "type": "living",
    "scope": "individual",
    "iso6393": "crh",
    "iso6392B": "crh",
    "iso6392T": "crh",
    "iso6391": null
  },
  {
    "name": "Sãotomense",
    "type": "living",
    "scope": "individual",
    "iso6393": "cri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern East Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "crj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Plains Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "crk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern East Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "crl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moose Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "crm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "El Nayar Cora",
    "type": "living",
    "scope": "individual",
    "iso6393": "crn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Crow",
    "type": "living",
    "scope": "individual",
    "iso6393": "cro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iyo'wujwa Chorote",
    "type": "living",
    "scope": "individual",
    "iso6393": "crq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carolina Algonquian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "crr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Seselwa Creole French",
    "type": "living",
    "scope": "individual",
    "iso6393": "crs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iyojwa'ja Chorote",
    "type": "living",
    "scope": "individual",
    "iso6393": "crt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chaura",
    "type": "living",
    "scope": "individual",
    "iso6393": "crv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chrau",
    "type": "living",
    "scope": "individual",
    "iso6393": "crw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Carrier",
    "type": "living",
    "scope": "individual",
    "iso6393": "crx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cori",
    "type": "living",
    "scope": "individual",
    "iso6393": "cry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cruzeño",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "crz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiltepec Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "csa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kashubian",
    "type": "living",
    "scope": "individual",
    "iso6393": "csb",
    "iso6392B": "csb",
    "iso6392T": "csb",
    "iso6391": null
  },
  {
    "name": "Catalan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiangmai Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Czech Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "cse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cuba Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chilean Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asho Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "csh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coast Miwok",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "csi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Songlai Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "csj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jola-Kasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "csk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chinese Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Sierra Miwok",
    "type": "living",
    "scope": "individual",
    "iso6393": "csm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Colombian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sochiapam Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Croatia Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Costa Rican Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "csr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Ohlone",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "css",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Ohlone",
    "type": "living",
    "scope": "individual",
    "iso6393": "cst",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sumtu Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "csv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Swampy Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "csw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siyin Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "csy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coos",
    "type": "living",
    "scope": "individual",
    "iso6393": "csz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tataltepec Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "cta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chetco",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tedim Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tepinapa Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cte",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chittagonian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Thaiphum Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "cth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tlacoatzintepec Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chitimacha",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ctm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chhintange",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emberá-Catío",
    "type": "living",
    "scope": "individual",
    "iso6393": "cto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Highland Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Catanduanes Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "cts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wayanad Chetti",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chol",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zacatepec Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "ctz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cua",
    "type": "living",
    "scope": "individual",
    "iso6393": "cua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cubeo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Usila Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cung",
    "type": "living",
    "scope": "individual",
    "iso6393": "cug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chuka",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cuiba",
    "type": "living",
    "scope": "individual",
    "iso6393": "cui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mashco Piro",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Blas Kuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Culina",
    "type": "living",
    "scope": "individual",
    "iso6393": "cul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cumanagoto",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cuo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cupeño",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cun",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chhulung",
    "type": "living",
    "scope": "individual",
    "iso6393": "cur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teutila Cuicatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tai Ya",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cuvok",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chukwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "cuw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tepeuxila Cuicatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chug",
    "type": "living",
    "scope": "individual",
    "iso6393": "cvg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Valle Nacional Chinantec",
    "type": "living",
    "scope": "individual",
    "iso6393": "cvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maindo",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Woods Cree",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwere",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chewong",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuwaataay",
    "type": "living",
    "scope": "individual",
    "iso6393": "cwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nopala Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "cya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cayubaba",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "cyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Welsh",
    "type": "living",
    "scope": "individual",
    "iso6393": "cym",
    "iso6392B": "wel",
    "iso6392T": "cym",
    "iso6391": "cy"
  },
  {
    "name": "Cuyonon",
    "type": "living",
    "scope": "individual",
    "iso6393": "cyo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huizhou Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "czh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Knaanic",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "czk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zenzontepec Chatino",
    "type": "living",
    "scope": "individual",
    "iso6393": "czn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Min Zhong Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "czo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zotung Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "czt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dangaléat",
    "type": "living",
    "scope": "individual",
    "iso6393": "daa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dambi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marik",
    "type": "living",
    "scope": "individual",
    "iso6393": "dad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duupa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dagbani",
    "type": "living",
    "scope": "individual",
    "iso6393": "dag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwahatike",
    "type": "living",
    "scope": "individual",
    "iso6393": "dah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Day",
    "type": "living",
    "scope": "individual",
    "iso6393": "dai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dar Fur Daju",
    "type": "living",
    "scope": "individual",
    "iso6393": "daj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dakota",
    "type": "living",
    "scope": "individual",
    "iso6393": "dak",
    "iso6392B": "dak",
    "iso6392T": "dak",
    "iso6391": null
  },
  {
    "name": "Dahalo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Damakawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Danish",
    "type": "living",
    "scope": "individual",
    "iso6393": "dan",
    "iso6392B": "dan",
    "iso6392T": "dan",
    "iso6391": "da"
  },
  {
    "name": "Daai Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "dao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dandami Maria",
    "type": "living",
    "scope": "individual",
    "iso6393": "daq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dargwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dar",
    "iso6392B": "dar",
    "iso6392T": "dar",
    "iso6391": null
  },
  {
    "name": "Daho-Doo",
    "type": "living",
    "scope": "individual",
    "iso6393": "das",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dar Sila Daju",
    "type": "living",
    "scope": "individual",
    "iso6393": "dau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Taita",
    "type": "living",
    "scope": "individual",
    "iso6393": "dav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Davawenyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "daw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dayi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dao",
    "type": "living",
    "scope": "individual",
    "iso6393": "daz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangime",
    "type": "living",
    "scope": "individual",
    "iso6393": "dba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Deno",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dadiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dabe",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Edopi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dogul Dom Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ida'an",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyirbal",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duguri",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duriankere",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dulbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daba",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dabarre",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ben Tey Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bondum Dom Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dungu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bankan Tey Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dibiyaso",
    "type": "living",
    "scope": "individual",
    "iso6393": "dby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Deccan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Negerhollands",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dcr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dadi Dadi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dongotono",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doondo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fataluku",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Goodenough",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dendi (Benin)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dido",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhudhuroa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ddr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Donno So Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dawera-Daweloor",
    "type": "living",
    "scope": "individual",
    "iso6393": "ddw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dagik",
    "type": "living",
    "scope": "individual",
    "iso6393": "dec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dedua",
    "type": "living",
    "scope": "individual",
    "iso6393": "ded",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dewoin",
    "type": "living",
    "scope": "individual",
    "iso6393": "dee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dezfuli",
    "type": "living",
    "scope": "individual",
    "iso6393": "def",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Degema",
    "type": "living",
    "scope": "individual",
    "iso6393": "deg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dehwari",
    "type": "living",
    "scope": "individual",
    "iso6393": "deh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Demisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dek",
    "type": "living",
    "scope": "individual",
    "iso6393": "dek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Delaware",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "del",
    "iso6392B": "del",
    "iso6392T": "del",
    "iso6391": null
  },
  {
    "name": "Dem",
    "type": "living",
    "scope": "individual",
    "iso6393": "dem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Slave (Athapascan)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "den",
    "iso6392B": "den",
    "iso6392T": "den",
    "iso6391": null
  },
  {
    "name": "Pidgin Delaware",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dendi (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "deq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Deori",
    "type": "living",
    "scope": "individual",
    "iso6393": "der",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Desano",
    "type": "living",
    "scope": "individual",
    "iso6393": "des",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "German",
    "type": "living",
    "scope": "individual",
    "iso6393": "deu",
    "iso6392B": "ger",
    "iso6392T": "deu",
    "iso6391": "de"
  },
  {
    "name": "Domung",
    "type": "living",
    "scope": "individual",
    "iso6393": "dev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dengese",
    "type": "living",
    "scope": "individual",
    "iso6393": "dez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Dagaare",
    "type": "living",
    "scope": "individual",
    "iso6393": "dga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bunoge Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Casiguran Dumagat Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dagaari Dioula",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Degenan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doga",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dghwede",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Dagara",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dagba",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andaandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dagoman",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dogri (individual language)",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dogrib",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgr",
    "iso6392B": "dgr",
    "iso6392T": "dgr",
    "iso6391": null
  },
  {
    "name": "Dogoso",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndra'ngith",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dgt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Degaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daungwurrung",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dgw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doghoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daga",
    "type": "living",
    "scope": "individual",
    "iso6393": "dgz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhundari",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhangu-Djangu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhimal",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhalandji",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zemba",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhanki",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhodia",
    "type": "living",
    "scope": "individual",
    "iso6393": "dho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhargari",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhaiso",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhurga",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dhu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dehu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhanwar (Nepal)",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhungaloo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dhx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dia",
    "type": "living",
    "scope": "individual",
    "iso6393": "dia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Central Dinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakota Dida",
    "type": "living",
    "scope": "individual",
    "iso6393": "dic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Didinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "did",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dieri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Digo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumiai",
    "type": "living",
    "scope": "individual",
    "iso6393": "dih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dimbong",
    "type": "living",
    "scope": "individual",
    "iso6393": "dii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dai",
    "type": "living",
    "scope": "individual",
    "iso6393": "dij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Dinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dilling",
    "type": "living",
    "scope": "individual",
    "iso6393": "dil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dime",
    "type": "living",
    "scope": "individual",
    "iso6393": "dim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dinka",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "din",
    "iso6392B": "din",
    "iso6392T": "din",
    "iso6391": null
  },
  {
    "name": "Dibo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northeastern Dinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dimli (individual language)",
    "type": "living",
    "scope": "individual",
    "iso6393": "diq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dirim",
    "type": "living",
    "scope": "individual",
    "iso6393": "dir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dimasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dirari",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Diriku",
    "type": "living",
    "scope": "individual",
    "iso6393": "diu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhivehi",
    "type": "living",
    "scope": "individual",
    "iso6393": "div",
    "iso6392B": "div",
    "iso6392T": "div",
    "iso6391": "dv"
  },
  {
    "name": "Northwestern Dinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "diw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dixon Reef",
    "type": "living",
    "scope": "individual",
    "iso6393": "dix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Diuwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "diy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ding",
    "type": "living",
    "scope": "individual",
    "iso6393": "diz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djadjawurrung",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djinba",
    "type": "living",
    "scope": "individual",
    "iso6393": "djb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dar Daju Daju",
    "type": "living",
    "scope": "individual",
    "iso6393": "djc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djamindjung",
    "type": "living",
    "scope": "individual",
    "iso6393": "djd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zarma",
    "type": "living",
    "scope": "individual",
    "iso6393": "dje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djangun",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "djf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djinang",
    "type": "living",
    "scope": "individual",
    "iso6393": "dji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djeebbana",
    "type": "living",
    "scope": "individual",
    "iso6393": "djj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Maroon Creole",
    "type": "living",
    "scope": "individual",
    "iso6393": "djk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamsay Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "djm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djauan",
    "type": "living",
    "scope": "individual",
    "iso6393": "djn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jangkang",
    "type": "living",
    "scope": "individual",
    "iso6393": "djo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djambarrpuyngu",
    "type": "living",
    "scope": "individual",
    "iso6393": "djr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kapriman",
    "type": "living",
    "scope": "individual",
    "iso6393": "dju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djawi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "djw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dakpakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "dka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dakka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuijau",
    "type": "living",
    "scope": "individual",
    "iso6393": "dkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southeastern Dinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mazagway",
    "type": "living",
    "scope": "individual",
    "iso6393": "dkx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dolgan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dlg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dahalik",
    "type": "living",
    "scope": "individual",
    "iso6393": "dlk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dalmatian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dlm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Darlong",
    "type": "living",
    "scope": "individual",
    "iso6393": "dln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duma",
    "type": "living",
    "scope": "individual",
    "iso6393": "dma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mombo Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gavak",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Madhi Madhi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dugwor",
    "type": "living",
    "scope": "individual",
    "iso6393": "dme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Upper Kinabatangan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Domaaki",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dameli",
    "type": "living",
    "scope": "individual",
    "iso6393": "dml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dama",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kemedzung",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Damar",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dampelas",
    "type": "living",
    "scope": "individual",
    "iso6393": "dms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dubu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dumpas",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mudburra",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dema",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Demta",
    "type": "living",
    "scope": "individual",
    "iso6393": "dmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Upper Grand Valley Dani",
    "type": "living",
    "scope": "individual",
    "iso6393": "dna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daonda",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndendeule",
    "type": "living",
    "scope": "individual",
    "iso6393": "dne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dungan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lower Grand Valley Dani",
    "type": "living",
    "scope": "individual",
    "iso6393": "dni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dengka",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzùùngoo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Danaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mid Grand Valley Dani",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Danau",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Danu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Dani",
    "type": "living",
    "scope": "individual",
    "iso6393": "dnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dení",
    "type": "living",
    "scope": "individual",
    "iso6393": "dny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dom",
    "type": "living",
    "scope": "individual",
    "iso6393": "doa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dobu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Dong",
    "type": "living",
    "scope": "individual",
    "iso6393": "doc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doe",
    "type": "living",
    "scope": "individual",
    "iso6393": "doe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Domu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dong",
    "type": "living",
    "scope": "individual",
    "iso6393": "doh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dogri (macrolanguage)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "doi",
    "iso6392B": "doi",
    "iso6392T": "doi",
    "iso6391": null
  },
  {
    "name": "Dondo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doso",
    "type": "living",
    "scope": "individual",
    "iso6393": "dol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Toura (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "don",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "doo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lukpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dominican Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "doq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dori'o",
    "type": "living",
    "scope": "individual",
    "iso6393": "dor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dogosé",
    "type": "living",
    "scope": "individual",
    "iso6393": "dos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dass",
    "type": "living",
    "scope": "individual",
    "iso6393": "dot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dombe",
    "type": "living",
    "scope": "individual",
    "iso6393": "dov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doyayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bussa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dompo",
    "type": "living",
    "scope": "individual",
    "iso6393": "doy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dorze",
    "type": "living",
    "scope": "individual",
    "iso6393": "doz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papar",
    "type": "living",
    "scope": "individual",
    "iso6393": "dpp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dair",
    "type": "living",
    "scope": "individual",
    "iso6393": "drb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minderico",
    "type": "living",
    "scope": "individual",
    "iso6393": "drc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Darmiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "drd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dolpo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rungus",
    "type": "living",
    "scope": "individual",
    "iso6393": "drg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "C'lela",
    "type": "living",
    "scope": "individual",
    "iso6393": "dri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paakantyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "drl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Damar",
    "type": "living",
    "scope": "individual",
    "iso6393": "drn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daro-Matu Melanau",
    "type": "living",
    "scope": "individual",
    "iso6393": "dro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dura",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "drq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dororo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "drr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gedeo",
    "type": "living",
    "scope": "individual",
    "iso6393": "drs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Drents",
    "type": "living",
    "scope": "individual",
    "iso6393": "drt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rukai",
    "type": "living",
    "scope": "individual",
    "iso6393": "dru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Darai",
    "type": "living",
    "scope": "individual",
    "iso6393": "dry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lower Sorbian",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsb",
    "iso6392B": "dsb",
    "iso6392T": "dsb",
    "iso6391": null
  },
  {
    "name": "Dutch Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "dse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daasanach",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Disa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Danish Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dusner",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Desiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "dso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tadaksahak",
    "type": "living",
    "scope": "individual",
    "iso6393": "dsq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daur",
    "type": "living",
    "scope": "individual",
    "iso6393": "dta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Labuk-Kinabatangan Kadazan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ditidaht",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adithinngithigh",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ana Tinga Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tene Kan Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tomo Kan Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daatsʼíin",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tommo So Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kadazan Dusun",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lotud",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Toro So Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Toro Tegu Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tebul Ure Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dtu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dotyali",
    "type": "living",
    "scope": "individual",
    "iso6393": "dty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duala",
    "type": "living",
    "scope": "individual",
    "iso6393": "dua",
    "iso6392B": "dua",
    "iso6392T": "dua",
    "iso6391": null
  },
  {
    "name": "Dubli",
    "type": "living",
    "scope": "individual",
    "iso6393": "dub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duna",
    "type": "living",
    "scope": "individual",
    "iso6393": "duc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hun-Saare",
    "type": "living",
    "scope": "individual",
    "iso6393": "dud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Umiray Dumaget Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "due",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dumbea",
    "type": "living",
    "scope": "individual",
    "iso6393": "duf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duruma",
    "type": "living",
    "scope": "individual",
    "iso6393": "dug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dungra Bhil",
    "type": "living",
    "scope": "individual",
    "iso6393": "duh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dumun",
    "type": "living",
    "scope": "individual",
    "iso6393": "dui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uyajitaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "duk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alabat Island Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "dul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Dutch (ca. 1050-1350)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "dum",
    "iso6392B": "dum",
    "iso6392T": "dum",
    "iso6391": null
  },
  {
    "name": "Dusun Deyah",
    "type": "living",
    "scope": "individual",
    "iso6393": "dun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dupaninan Agta",
    "type": "living",
    "scope": "individual",
    "iso6393": "duo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duano",
    "type": "living",
    "scope": "individual",
    "iso6393": "dup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dusun Malang",
    "type": "living",
    "scope": "individual",
    "iso6393": "duq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dii",
    "type": "living",
    "scope": "individual",
    "iso6393": "dur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dumi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Drung",
    "type": "living",
    "scope": "individual",
    "iso6393": "duu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duvle",
    "type": "living",
    "scope": "individual",
    "iso6393": "duv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dusun Witu",
    "type": "living",
    "scope": "individual",
    "iso6393": "duw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duungooma",
    "type": "living",
    "scope": "individual",
    "iso6393": "dux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dicamay Agta",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "duy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duli-Gey",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "duz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duau",
    "type": "living",
    "scope": "individual",
    "iso6393": "dva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Diri",
    "type": "living",
    "scope": "individual",
    "iso6393": "dwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dawro",
    "type": "living",
    "scope": "individual",
    "iso6393": "dwr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dutton World Speedwords",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "dws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhuwal",
    "type": "living",
    "scope": "individual",
    "iso6393": "dwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dawawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "dww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhuwaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "dwy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyan",
    "type": "living",
    "scope": "individual",
    "iso6393": "dya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyaberdyaber",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyugun",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dyd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Villa Viciosa Agta",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dyg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djimini Senoufo",
    "type": "living",
    "scope": "individual",
    "iso6393": "dyi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yanda Dom Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "dym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyangadi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dyn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jola-Fonyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "dyo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dyula",
    "type": "living",
    "scope": "individual",
    "iso6393": "dyu",
    "iso6392B": "dyu",
    "iso6392T": "dyu",
    "iso6391": null
  },
  {
    "name": "Dyaabugay",
    "type": "living",
    "scope": "individual",
    "iso6393": "dyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tunzu",
    "type": "living",
    "scope": "individual",
    "iso6393": "dza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djiwarli",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "dze",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dazaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "dzg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzalakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "dzl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzando",
    "type": "living",
    "scope": "individual",
    "iso6393": "dzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dzongkha",
    "type": "living",
    "scope": "individual",
    "iso6393": "dzo",
    "iso6392B": "dzo",
    "iso6392T": "dzo",
    "iso6391": "dz"
  },
  {
    "name": "Karenggapa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "eaa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ebughu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ebg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Bontok",
    "type": "living",
    "scope": "individual",
    "iso6393": "ebk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teke-Ebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ebo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ebrié",
    "type": "living",
    "scope": "individual",
    "iso6393": "ebr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Embu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ebu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eteocretan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "ecr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ecuadorian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ecs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eteocypriot",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "ecy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "E",
    "type": "living",
    "scope": "individual",
    "iso6393": "eee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Efai",
    "type": "living",
    "scope": "individual",
    "iso6393": "efa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Efe",
    "type": "living",
    "scope": "individual",
    "iso6393": "efe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Efik",
    "type": "living",
    "scope": "individual",
    "iso6393": "efi",
    "iso6392B": "efi",
    "iso6392T": "efi",
    "iso6391": null
  },
  {
    "name": "Ega",
    "type": "living",
    "scope": "individual",
    "iso6393": "ega",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emilian",
    "type": "living",
    "scope": "individual",
    "iso6393": "egl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eggon",
    "type": "living",
    "scope": "individual",
    "iso6393": "ego",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Egyptian (Ancient)",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "egy",
    "iso6392B": "egy",
    "iso6392T": "egy",
    "iso6391": null
  },
  {
    "name": "Ehueun",
    "type": "living",
    "scope": "individual",
    "iso6393": "ehu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eipomek",
    "type": "living",
    "scope": "individual",
    "iso6393": "eip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eitiep",
    "type": "living",
    "scope": "individual",
    "iso6393": "eit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Askopan",
    "type": "living",
    "scope": "individual",
    "iso6393": "eiv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ejamat",
    "type": "living",
    "scope": "individual",
    "iso6393": "eja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ekajuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "eka",
    "iso6392B": "eka",
    "iso6392T": "eka",
    "iso6391": null
  },
  {
    "name": "Eastern Karnic",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ekc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ekit",
    "type": "living",
    "scope": "individual",
    "iso6393": "eke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ekari",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eki",
    "type": "living",
    "scope": "individual",
    "iso6393": "eki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Standard Estonian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kol (Bangladesh)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elip",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koti",
    "type": "living",
    "scope": "individual",
    "iso6393": "eko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ekpeye",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yace",
    "type": "living",
    "scope": "individual",
    "iso6393": "ekr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Kayah",
    "type": "living",
    "scope": "individual",
    "iso6393": "eky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elepi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ele",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "El Hugeirat",
    "type": "living",
    "scope": "individual",
    "iso6393": "elh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nding",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "eli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elkei",
    "type": "living",
    "scope": "individual",
    "iso6393": "elk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Modern Greek (1453-)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ell",
    "iso6392B": "gre",
    "iso6392T": "ell",
    "iso6391": "el"
  },
  {
    "name": "Eleme",
    "type": "living",
    "scope": "individual",
    "iso6393": "elm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "El Molo",
    "type": "living",
    "scope": "individual",
    "iso6393": "elo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elu",
    "type": "living",
    "scope": "individual",
    "iso6393": "elu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elamite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "elx",
    "iso6392B": "elx",
    "iso6392T": "elx",
    "iso6391": null
  },
  {
    "name": "Emai-Iuleha-Ora",
    "type": "living",
    "scope": "individual",
    "iso6393": "ema",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Embaloh",
    "type": "living",
    "scope": "individual",
    "iso6393": "emb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emerillon",
    "type": "living",
    "scope": "individual",
    "iso6393": "eme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Meohang",
    "type": "living",
    "scope": "individual",
    "iso6393": "emg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mussau-Emira",
    "type": "living",
    "scope": "individual",
    "iso6393": "emi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Maninkakan",
    "type": "living",
    "scope": "individual",
    "iso6393": "emk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamulique",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "emm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eman",
    "type": "living",
    "scope": "individual",
    "iso6393": "emn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Emberá",
    "type": "living",
    "scope": "individual",
    "iso6393": "emp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pacific Gulf Yupik",
    "type": "living",
    "scope": "individual",
    "iso6393": "ems",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Muria",
    "type": "living",
    "scope": "individual",
    "iso6393": "emu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emplawas",
    "type": "living",
    "scope": "individual",
    "iso6393": "emw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Erromintxela",
    "type": "living",
    "scope": "individual",
    "iso6393": "emx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Epigraphic Mayan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "emy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apali",
    "type": "living",
    "scope": "individual",
    "iso6393": "ena",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Markweeta",
    "type": "living",
    "scope": "individual",
    "iso6393": "enb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "En",
    "type": "living",
    "scope": "individual",
    "iso6393": "enc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ende",
    "type": "living",
    "scope": "individual",
    "iso6393": "end",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Forest Enets",
    "type": "living",
    "scope": "individual",
    "iso6393": "enf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "English",
    "type": "living",
    "scope": "individual",
    "iso6393": "eng",
    "iso6392B": "eng",
    "iso6392T": "eng",
    "iso6391": "en"
  },
  {
    "name": "Tundra Enets",
    "type": "living",
    "scope": "individual",
    "iso6393": "enh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enlhet",
    "type": "living",
    "scope": "individual",
    "iso6393": "enl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle English (1100-1500)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "enm",
    "iso6392B": "enm",
    "iso6392T": "enm",
    "iso6391": null
  },
  {
    "name": "Engenni",
    "type": "living",
    "scope": "individual",
    "iso6393": "enn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enggano",
    "type": "living",
    "scope": "individual",
    "iso6393": "eno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enga",
    "type": "living",
    "scope": "individual",
    "iso6393": "enq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emumu",
    "type": "living",
    "scope": "individual",
    "iso6393": "enr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enu",
    "type": "living",
    "scope": "individual",
    "iso6393": "enu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enwan (Edu State)",
    "type": "living",
    "scope": "individual",
    "iso6393": "env",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enwan (Akwa Ibom State)",
    "type": "living",
    "scope": "individual",
    "iso6393": "enw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enxet",
    "type": "living",
    "scope": "individual",
    "iso6393": "enx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beti (Côte d'Ivoire)",
    "type": "living",
    "scope": "individual",
    "iso6393": "eot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Epie",
    "type": "living",
    "scope": "individual",
    "iso6393": "epi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Esperanto",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "epo",
    "iso6392B": "epo",
    "iso6392T": "epo",
    "iso6391": "eo"
  },
  {
    "name": "Eravallan",
    "type": "living",
    "scope": "individual",
    "iso6393": "era",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sie",
    "type": "living",
    "scope": "individual",
    "iso6393": "erg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eruwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "erh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ogea",
    "type": "living",
    "scope": "individual",
    "iso6393": "eri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Efate",
    "type": "living",
    "scope": "individual",
    "iso6393": "erk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Horpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ero",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Erre",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "err",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ersu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ers",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eritai",
    "type": "living",
    "scope": "individual",
    "iso6393": "ert",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Erokwanas",
    "type": "living",
    "scope": "individual",
    "iso6393": "erw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ese Ejja",
    "type": "living",
    "scope": "individual",
    "iso6393": "ese",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aheri Gondi",
    "type": "living",
    "scope": "individual",
    "iso6393": "esg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eshtehardi",
    "type": "living",
    "scope": "individual",
    "iso6393": "esh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Alaskan Inupiatun",
    "type": "living",
    "scope": "individual",
    "iso6393": "esi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwest Alaska Inupiatun",
    "type": "living",
    "scope": "individual",
    "iso6393": "esk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Egypt Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "esl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Esuma",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "esm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Salvadoran Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "esn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Estonian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "eso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Esselen",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "esq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Siberian Yupik",
    "type": "living",
    "scope": "individual",
    "iso6393": "ess",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Estonian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "est",
    "iso6392B": "est",
    "iso6392T": "est",
    "iso6391": "et"
  },
  {
    "name": "Central Yupik",
    "type": "living",
    "scope": "individual",
    "iso6393": "esu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eskayan",
    "type": "living",
    "scope": "individual",
    "iso6393": "esy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Etebi",
    "type": "living",
    "scope": "individual",
    "iso6393": "etb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Etchemin",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "etc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ethiopian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "eth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eton (Vanuatu)",
    "type": "living",
    "scope": "individual",
    "iso6393": "etn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eton (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "eto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Edolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "etr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yekhee",
    "type": "living",
    "scope": "individual",
    "iso6393": "ets",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Etruscan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "ett",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ejagham",
    "type": "living",
    "scope": "individual",
    "iso6393": "etu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eten",
    "type": "living",
    "scope": "individual",
    "iso6393": "etx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Semimi",
    "type": "living",
    "scope": "individual",
    "iso6393": "etz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Basque",
    "type": "living",
    "scope": "individual",
    "iso6393": "eus",
    "iso6392B": "baq",
    "iso6392T": "eus",
    "iso6391": "eu"
  },
  {
    "name": "Even",
    "type": "living",
    "scope": "individual",
    "iso6393": "eve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uvbie",
    "type": "living",
    "scope": "individual",
    "iso6393": "evh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Evenki",
    "type": "living",
    "scope": "individual",
    "iso6393": "evn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ewe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ewe",
    "iso6392B": "ewe",
    "iso6392T": "ewe",
    "iso6391": "ee"
  },
  {
    "name": "Ewondo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ewo",
    "iso6392B": "ewo",
    "iso6392T": "ewo",
    "iso6391": null
  },
  {
    "name": "Extremaduran",
    "type": "living",
    "scope": "individual",
    "iso6393": "ext",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eyak",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "eya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keiyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "eyo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ezaa",
    "type": "living",
    "scope": "individual",
    "iso6393": "eza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uzekwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "eze",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fasu",
    "type": "living",
    "scope": "individual",
    "iso6393": "faa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fa d'Ambu",
    "type": "living",
    "scope": "individual",
    "iso6393": "fab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wagi",
    "type": "living",
    "scope": "individual",
    "iso6393": "fad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fagani",
    "type": "living",
    "scope": "individual",
    "iso6393": "faf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Finongan",
    "type": "living",
    "scope": "individual",
    "iso6393": "fag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baissa Fali",
    "type": "living",
    "scope": "individual",
    "iso6393": "fah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Faiwol",
    "type": "living",
    "scope": "individual",
    "iso6393": "fai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Faita",
    "type": "living",
    "scope": "individual",
    "iso6393": "faj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fang (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "fak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Fali",
    "type": "living",
    "scope": "individual",
    "iso6393": "fal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fam",
    "type": "living",
    "scope": "individual",
    "iso6393": "fam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fang (Equatorial Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "fan",
    "iso6392B": "fan",
    "iso6392T": "fan",
    "iso6391": null
  },
  {
    "name": "Faroese",
    "type": "living",
    "scope": "individual",
    "iso6393": "fao",
    "iso6392B": "fao",
    "iso6392T": "fao",
    "iso6391": "fo"
  },
  {
    "name": "Palor",
    "type": "living",
    "scope": "individual",
    "iso6393": "fap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fataleka",
    "type": "living",
    "scope": "individual",
    "iso6393": "far",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Persian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "fas",
    "iso6392B": "per",
    "iso6392T": "fas",
    "iso6391": "fa"
  },
  {
    "name": "Fanti",
    "type": "living",
    "scope": "individual",
    "iso6393": "fat",
    "iso6392B": "fat",
    "iso6392T": "fat",
    "iso6391": null
  },
  {
    "name": "Fayu",
    "type": "living",
    "scope": "individual",
    "iso6393": "fau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fala",
    "type": "living",
    "scope": "individual",
    "iso6393": "fax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Fars",
    "type": "living",
    "scope": "individual",
    "iso6393": "fay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwestern Fars",
    "type": "living",
    "scope": "individual",
    "iso6393": "faz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Albay Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "fbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Quebec Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "fcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Feroge",
    "type": "living",
    "scope": "individual",
    "iso6393": "fer",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Foia Foia",
    "type": "living",
    "scope": "individual",
    "iso6393": "ffi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maasina Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "ffm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fongoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "fgr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nobiin",
    "type": "living",
    "scope": "individual",
    "iso6393": "fia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fyer",
    "type": "living",
    "scope": "individual",
    "iso6393": "fie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fijian",
    "type": "living",
    "scope": "individual",
    "iso6393": "fij",
    "iso6392B": "fij",
    "iso6392T": "fij",
    "iso6391": "fj"
  },
  {
    "name": "Filipino",
    "type": "living",
    "scope": "individual",
    "iso6393": "fil",
    "iso6392B": "fil",
    "iso6392T": "fil",
    "iso6391": null
  },
  {
    "name": "Finnish",
    "type": "living",
    "scope": "individual",
    "iso6393": "fin",
    "iso6392B": "fin",
    "iso6392T": "fin",
    "iso6391": "fi"
  },
  {
    "name": "Fipa",
    "type": "living",
    "scope": "individual",
    "iso6393": "fip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Firan",
    "type": "living",
    "scope": "individual",
    "iso6393": "fir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tornedalen Finnish",
    "type": "living",
    "scope": "individual",
    "iso6393": "fit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fiwaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "fiw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kirya-Konzəl",
    "type": "living",
    "scope": "individual",
    "iso6393": "fkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kven Finnish",
    "type": "living",
    "scope": "individual",
    "iso6393": "fkv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalispel-Pend d'Oreille",
    "type": "living",
    "scope": "individual",
    "iso6393": "fla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Foau",
    "type": "living",
    "scope": "individual",
    "iso6393": "flh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fali",
    "type": "living",
    "scope": "individual",
    "iso6393": "fli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Fali",
    "type": "living",
    "scope": "individual",
    "iso6393": "fll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Flinders Island",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "fln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fuliiru",
    "type": "living",
    "scope": "individual",
    "iso6393": "flr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Flaaitaal",
    "type": "living",
    "scope": "individual",
    "iso6393": "fly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fe'fe'",
    "type": "living",
    "scope": "individual",
    "iso6393": "fmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Far Western Muria",
    "type": "living",
    "scope": "individual",
    "iso6393": "fmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fanbak",
    "type": "living",
    "scope": "individual",
    "iso6393": "fnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fanagalo",
    "type": "living",
    "scope": "individual",
    "iso6393": "fng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fania",
    "type": "living",
    "scope": "individual",
    "iso6393": "fni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Foodo",
    "type": "living",
    "scope": "individual",
    "iso6393": "fod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Foi",
    "type": "living",
    "scope": "individual",
    "iso6393": "foi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Foma",
    "type": "living",
    "scope": "individual",
    "iso6393": "fom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fon",
    "type": "living",
    "scope": "individual",
    "iso6393": "fon",
    "iso6392B": "fon",
    "iso6392T": "fon",
    "iso6391": null
  },
  {
    "name": "Fore",
    "type": "living",
    "scope": "individual",
    "iso6393": "for",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siraya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "fos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fernando Po Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "fpe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fas",
    "type": "living",
    "scope": "individual",
    "iso6393": "fqs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "French",
    "type": "living",
    "scope": "individual",
    "iso6393": "fra",
    "iso6392B": "fre",
    "iso6392T": "fra",
    "iso6391": "fr"
  },
  {
    "name": "Cajun French",
    "type": "living",
    "scope": "individual",
    "iso6393": "frc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fordata",
    "type": "living",
    "scope": "individual",
    "iso6393": "frd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Frankish",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "frk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle French (ca. 1400-1600)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "frm",
    "iso6392B": "frm",
    "iso6392T": "frm",
    "iso6391": null
  },
  {
    "name": "Old French (842-ca. 1400)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "fro",
    "iso6392B": "fro",
    "iso6392T": "fro",
    "iso6391": null
  },
  {
    "name": "Arpitan",
    "type": "living",
    "scope": "individual",
    "iso6393": "frp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Forak",
    "type": "living",
    "scope": "individual",
    "iso6393": "frq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Frisian",
    "type": "living",
    "scope": "individual",
    "iso6393": "frr",
    "iso6392B": "frr",
    "iso6392T": "frr",
    "iso6391": null
  },
  {
    "name": "Eastern Frisian",
    "type": "living",
    "scope": "individual",
    "iso6393": "frs",
    "iso6392B": "frs",
    "iso6392T": "frs",
    "iso6391": null
  },
  {
    "name": "Fortsenal",
    "type": "living",
    "scope": "individual",
    "iso6393": "frt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Frisian",
    "type": "living",
    "scope": "individual",
    "iso6393": "fry",
    "iso6392B": "fry",
    "iso6392T": "fry",
    "iso6391": "fy"
  },
  {
    "name": "Finnish Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "fse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "French Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "fsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Finland-Swedish Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "fss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adamawa Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pulaar",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Futuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "fud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Borgu Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pular",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Niger Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagirmi Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ko",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fulah",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "ful",
    "iso6392B": "ful",
    "iso6392T": "ful",
    "iso6391": "ff"
  },
  {
    "name": "Fum",
    "type": "living",
    "scope": "individual",
    "iso6393": "fum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fulniô",
    "type": "living",
    "scope": "individual",
    "iso6393": "fun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central-Eastern Niger Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Friulian",
    "type": "living",
    "scope": "individual",
    "iso6393": "fur",
    "iso6392B": "fur",
    "iso6392T": "fur",
    "iso6391": null
  },
  {
    "name": "Futuna-Aniwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "fut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Furu",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nigerian Fulfulde",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fuyug",
    "type": "living",
    "scope": "individual",
    "iso6393": "fuy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fur",
    "type": "living",
    "scope": "individual",
    "iso6393": "fvr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fwâi",
    "type": "living",
    "scope": "individual",
    "iso6393": "fwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "fwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ga",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaa",
    "iso6392B": "gaa",
    "iso6392T": "gaa",
    "iso6391": null
  },
  {
    "name": "Gabri",
    "type": "living",
    "scope": "individual",
    "iso6393": "gab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mixed Great Andamanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "gac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gaddang",
    "type": "living",
    "scope": "individual",
    "iso6393": "gad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guarequena",
    "type": "living",
    "scope": "individual",
    "iso6393": "gae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gende",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gagauz",
    "type": "living",
    "scope": "individual",
    "iso6393": "gag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alekano",
    "type": "living",
    "scope": "individual",
    "iso6393": "gah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Borei",
    "type": "living",
    "scope": "individual",
    "iso6393": "gai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gadsup",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamkonora",
    "type": "living",
    "scope": "individual",
    "iso6393": "gak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galolen",
    "type": "living",
    "scope": "individual",
    "iso6393": "gal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kandawo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gan Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "gan",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gants",
    "type": "living",
    "scope": "individual",
    "iso6393": "gao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gal",
    "type": "living",
    "scope": "individual",
    "iso6393": "gap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gata'",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galeya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adiwasi Garasia",
    "type": "living",
    "scope": "individual",
    "iso6393": "gas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kenati",
    "type": "living",
    "scope": "individual",
    "iso6393": "gat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mudhili Gadaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "gau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nobonob",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Borana-Arsi-Guji Oromo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gay",
    "iso6392B": "gay",
    "iso6392T": "gay",
    "iso6391": null
  },
  {
    "name": "West Central Oromo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gaz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbaya (Central African Republic)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "gba",
    "iso6392B": "gba",
    "iso6392T": "gba",
    "iso6391": null
  },
  {
    "name": "Kaytetye",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karadjeri",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niksek",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gaikundi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbanziri",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Defi Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galela",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bodo Gadaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gaddi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamit",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garhwali",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mo'da",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Grebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbaya-Bossangoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbaya-Bozoum",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbagyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbesi Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gagadu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbanu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gabi-Gabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Xwla Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbari",
    "type": "living",
    "scope": "individual",
    "iso6393": "gby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zoroastrian Dari",
    "type": "living",
    "scope": "individual",
    "iso6393": "gbz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mali",
    "type": "living",
    "scope": "individual",
    "iso6393": "gcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganggalida",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galice",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guadeloupean Creole French",
    "type": "living",
    "scope": "individual",
    "iso6393": "gcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Grenadian Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "gcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gaina",
    "type": "living",
    "scope": "individual",
    "iso6393": "gcn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guianese Creole French",
    "type": "living",
    "scope": "individual",
    "iso6393": "gcr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Colonia Tovar German",
    "type": "living",
    "scope": "individual",
    "iso6393": "gct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gade Lohar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pottangi Ollar Gadaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gugu Badhun",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gdc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gedaged",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gude",
    "type": "living",
    "scope": "individual",
    "iso6393": "gde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guduf-Gava",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ga'dang",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gadjerawang",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gundi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurdjar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gadang",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dirasha",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laal",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Umanakaina",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghodoberi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mehri",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wipi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghandruk Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kungardutyi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gudu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Godwari",
    "type": "living",
    "scope": "individual",
    "iso6393": "gdx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geruma",
    "type": "living",
    "scope": "individual",
    "iso6393": "gea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kire",
    "type": "living",
    "scope": "individual",
    "iso6393": "geb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gboloo Grebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gade",
    "type": "living",
    "scope": "individual",
    "iso6393": "ged",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gengle",
    "type": "living",
    "scope": "individual",
    "iso6393": "geg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hutterite German",
    "type": "living",
    "scope": "individual",
    "iso6393": "geh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gebe",
    "type": "living",
    "scope": "individual",
    "iso6393": "gei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gen",
    "type": "living",
    "scope": "individual",
    "iso6393": "gej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ywom",
    "type": "living",
    "scope": "individual",
    "iso6393": "gek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "ut-Ma'in",
    "type": "living",
    "scope": "individual",
    "iso6393": "gel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geme",
    "type": "living",
    "scope": "individual",
    "iso6393": "geq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geser-Gorom",
    "type": "living",
    "scope": "individual",
    "iso6393": "ges",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eviya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gera",
    "type": "living",
    "scope": "individual",
    "iso6393": "gew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garre",
    "type": "living",
    "scope": "individual",
    "iso6393": "gex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Enya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gey",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geez",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "gez",
    "iso6392B": "gez",
    "iso6392T": "gez",
    "iso6391": null
  },
  {
    "name": "Patpatar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gfk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gafat",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gft",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gao",
    "type": "living",
    "scope": "individual",
    "iso6393": "gga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbii",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gugadj",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ggd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guragone",
    "type": "living",
    "scope": "individual",
    "iso6393": "gge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurgula",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kungarakany",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ggk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganglau",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gitua",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gagu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gogodala",
    "type": "living",
    "scope": "individual",
    "iso6393": "ggw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghadamès",
    "type": "living",
    "scope": "individual",
    "iso6393": "gha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hiberno-Scottish Gaelic",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ghc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Ghale",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Ghale",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geko Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghulfan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghanongga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghomara",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghera",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guhu-Samane",
    "type": "living",
    "scope": "individual",
    "iso6393": "ghs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuke",
    "type": "living",
    "scope": "individual",
    "iso6393": "ght",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kitja",
    "type": "living",
    "scope": "individual",
    "iso6393": "gia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gibanawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gail",
    "type": "living",
    "scope": "individual",
    "iso6393": "gic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gidar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Goaria",
    "type": "living",
    "scope": "individual",
    "iso6393": "gig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Githabul",
    "type": "living",
    "scope": "individual",
    "iso6393": "gih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gilbertese",
    "type": "living",
    "scope": "individual",
    "iso6393": "gil",
    "iso6392B": "gil",
    "iso6392T": "gil",
    "iso6391": null
  },
  {
    "name": "Gimi (Eastern Highlands)",
    "type": "living",
    "scope": "individual",
    "iso6393": "gim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hinukh",
    "type": "living",
    "scope": "individual",
    "iso6393": "gin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gimi (West New Britain)",
    "type": "living",
    "scope": "individual",
    "iso6393": "gip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Green Gelao",
    "type": "living",
    "scope": "individual",
    "iso6393": "giq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Red Gelao",
    "type": "living",
    "scope": "individual",
    "iso6393": "gir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Giziga",
    "type": "living",
    "scope": "individual",
    "iso6393": "gis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gitxsan",
    "type": "living",
    "scope": "individual",
    "iso6393": "git",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mulao",
    "type": "living",
    "scope": "individual",
    "iso6393": "giu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "White Gelao",
    "type": "living",
    "scope": "individual",
    "iso6393": "giw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gilima",
    "type": "living",
    "scope": "individual",
    "iso6393": "gix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Giyug",
    "type": "living",
    "scope": "individual",
    "iso6393": "giy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Giziga",
    "type": "living",
    "scope": "individual",
    "iso6393": "giz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geji",
    "type": "living",
    "scope": "individual",
    "iso6393": "gji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kachi Koli",
    "type": "living",
    "scope": "individual",
    "iso6393": "gjk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gunditjmara",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gjm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gonja",
    "type": "living",
    "scope": "individual",
    "iso6393": "gjn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurindji Kriol",
    "type": "living",
    "scope": "individual",
    "iso6393": "gjr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gujari",
    "type": "living",
    "scope": "individual",
    "iso6393": "gju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndai",
    "type": "living",
    "scope": "individual",
    "iso6393": "gke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gokana",
    "type": "living",
    "scope": "individual",
    "iso6393": "gkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kok-Nar",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guinea Kpelle",
    "type": "living",
    "scope": "individual",
    "iso6393": "gkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "ǂUngkue",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Scottish Gaelic",
    "type": "living",
    "scope": "individual",
    "iso6393": "gla",
    "iso6392B": "gla",
    "iso6392T": "gla",
    "iso6391": "gd"
  },
  {
    "name": "Bon Gula",
    "type": "living",
    "scope": "individual",
    "iso6393": "glc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nanai",
    "type": "living",
    "scope": "individual",
    "iso6393": "gld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irish",
    "type": "living",
    "scope": "individual",
    "iso6393": "gle",
    "iso6392B": "gle",
    "iso6392T": "gle",
    "iso6391": "ga"
  },
  {
    "name": "Galician",
    "type": "living",
    "scope": "individual",
    "iso6393": "glg",
    "iso6392B": "glg",
    "iso6392T": "glg",
    "iso6391": "gl"
  },
  {
    "name": "Northwest Pashai",
    "type": "living",
    "scope": "individual",
    "iso6393": "glh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guliguli",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gula Iro",
    "type": "living",
    "scope": "individual",
    "iso6393": "glj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gilaki",
    "type": "living",
    "scope": "individual",
    "iso6393": "glk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garlali",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Galambu",
    "type": "living",
    "scope": "individual",
    "iso6393": "glo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Glaro-Twabo",
    "type": "living",
    "scope": "individual",
    "iso6393": "glr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gula (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "glu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manx",
    "type": "living",
    "scope": "individual",
    "iso6393": "glv",
    "iso6392B": "glv",
    "iso6392T": "glv",
    "iso6391": "gv"
  },
  {
    "name": "Glavda",
    "type": "living",
    "scope": "individual",
    "iso6393": "glw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gule",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gambera",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gula'alaa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mághdì",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Magɨyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle High German (ca. 1050-1500)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "gmh",
    "iso6392B": "gmh",
    "iso6392T": "gmh",
    "iso6391": null
  },
  {
    "name": "Middle Low German",
    "type": "historical",
    "scope": "individual",
    "iso6393": "gml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbaya-Mbodomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gimnime",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gumalu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Magoma",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mycenaean Greek",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "gmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mgbolizhia",
    "type": "living",
    "scope": "individual",
    "iso6393": "gmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaansa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gangte",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guanche",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gnc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zulgo-Gemzek",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganang",
    "type": "living",
    "scope": "individual",
    "iso6393": "gne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngangam",
    "type": "living",
    "scope": "individual",
    "iso6393": "gng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lere",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gooniyandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "//Gana",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gangulu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ginuman",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gumatj",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Gondi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gana",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gureng Gureng",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guntai",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gnau",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Bolivian Guaraní",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganzi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guro",
    "type": "living",
    "scope": "individual",
    "iso6393": "goa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Playero",
    "type": "living",
    "scope": "individual",
    "iso6393": "gob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gorakor",
    "type": "living",
    "scope": "individual",
    "iso6393": "goc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Godié",
    "type": "living",
    "scope": "individual",
    "iso6393": "god",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gongduk",
    "type": "living",
    "scope": "individual",
    "iso6393": "goe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gofa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gogo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old High German (ca. 750-1050)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "goh",
    "iso6392B": "goh",
    "iso6392T": "goh",
    "iso6391": null
  },
  {
    "name": "Gobasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "goi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gowlan",
    "type": "living",
    "scope": "individual",
    "iso6393": "goj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gowli",
    "type": "living",
    "scope": "individual",
    "iso6393": "gok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gola",
    "type": "living",
    "scope": "individual",
    "iso6393": "gol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Goan Konkani",
    "type": "living",
    "scope": "individual",
    "iso6393": "gom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gondi",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "gon",
    "iso6392B": "gon",
    "iso6392T": "gon",
    "iso6391": null
  },
  {
    "name": "Gone Dau",
    "type": "living",
    "scope": "individual",
    "iso6393": "goo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yeretuar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gorap",
    "type": "living",
    "scope": "individual",
    "iso6393": "goq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gorontalo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gor",
    "iso6392B": "gor",
    "iso6392T": "gor",
    "iso6391": null
  },
  {
    "name": "Gronings",
    "type": "living",
    "scope": "individual",
    "iso6393": "gos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gothic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "got",
    "iso6392B": "got",
    "iso6392T": "got",
    "iso6391": null
  },
  {
    "name": "Gavar",
    "type": "living",
    "scope": "individual",
    "iso6393": "gou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gorowa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gobu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Goundo",
    "type": "living",
    "scope": "individual",
    "iso6393": "goy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gozarkhani",
    "type": "living",
    "scope": "individual",
    "iso6393": "goz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gupa-Abawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghanaian Pidgin English",
    "type": "living",
    "scope": "individual",
    "iso6393": "gpe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Taiap",
    "type": "living",
    "scope": "individual",
    "iso6393": "gpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ga'anda",
    "type": "living",
    "scope": "individual",
    "iso6393": "gqa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guiqiong",
    "type": "living",
    "scope": "individual",
    "iso6393": "gqi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guana (Brazil)",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gor",
    "type": "living",
    "scope": "individual",
    "iso6393": "gqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Qau",
    "type": "living",
    "scope": "individual",
    "iso6393": "gqu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rajput Garasia",
    "type": "living",
    "scope": "individual",
    "iso6393": "gra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Grebo",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "grb",
    "iso6392B": "grb",
    "iso6392T": "grb",
    "iso6391": null
  },
  {
    "name": "Ancient Greek (to 1453)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "grc",
    "iso6392B": "grc",
    "iso6392T": "grc",
    "iso6391": null
  },
  {
    "name": "Guruntum-Mbaaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "grd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Madi",
    "type": "living",
    "scope": "individual",
    "iso6393": "grg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbiri-Niragu",
    "type": "living",
    "scope": "individual",
    "iso6393": "grh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghari",
    "type": "living",
    "scope": "individual",
    "iso6393": "gri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Grebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "grj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kota Marudu Talantang",
    "type": "living",
    "scope": "individual",
    "iso6393": "grm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guarani",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "grn",
    "iso6392B": "grn",
    "iso6392T": "grn",
    "iso6391": "gn"
  },
  {
    "name": "Groma",
    "type": "living",
    "scope": "individual",
    "iso6393": "gro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gorovu",
    "type": "living",
    "scope": "individual",
    "iso6393": "grq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Taznatit",
    "type": "living",
    "scope": "individual",
    "iso6393": "grr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gresi",
    "type": "living",
    "scope": "individual",
    "iso6393": "grs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garo",
    "type": "living",
    "scope": "individual",
    "iso6393": "grt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kistane",
    "type": "living",
    "scope": "individual",
    "iso6393": "gru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Grebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "grv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gweda",
    "type": "living",
    "scope": "individual",
    "iso6393": "grw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guriaso",
    "type": "living",
    "scope": "individual",
    "iso6393": "grx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barclayville Grebo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guramalum",
    "type": "living",
    "scope": "individual",
    "iso6393": "grz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ghanaian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "German Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gusilay",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guatemalan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nema",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwest Gbaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wasembo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Greek Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Swiss German",
    "type": "living",
    "scope": "individual",
    "iso6393": "gsw",
    "iso6392B": "gsw",
    "iso6392T": "gsw",
    "iso6391": null
  },
  {
    "name": "Guató",
    "type": "living",
    "scope": "individual",
    "iso6393": "gta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aghu-Tharnggala",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gtu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shiki",
    "type": "living",
    "scope": "individual",
    "iso6393": "gua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guajajára",
    "type": "living",
    "scope": "individual",
    "iso6393": "gub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wayuu",
    "type": "living",
    "scope": "individual",
    "iso6393": "guc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yocoboué Dida",
    "type": "living",
    "scope": "individual",
    "iso6393": "gud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurinji",
    "type": "living",
    "scope": "individual",
    "iso6393": "gue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gupapuyngu",
    "type": "living",
    "scope": "individual",
    "iso6393": "guf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paraguayan Guaraní",
    "type": "living",
    "scope": "individual",
    "iso6393": "gug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guahibo",
    "type": "living",
    "scope": "individual",
    "iso6393": "guh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Bolivian Guaraní",
    "type": "living",
    "scope": "individual",
    "iso6393": "gui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gujarati",
    "type": "living",
    "scope": "individual",
    "iso6393": "guj",
    "iso6392B": "guj",
    "iso6392T": "guj",
    "iso6391": "gu"
  },
  {
    "name": "Gumuz",
    "type": "living",
    "scope": "individual",
    "iso6393": "guk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sea Island Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "gul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guambiano",
    "type": "living",
    "scope": "individual",
    "iso6393": "gum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbyá Guaraní",
    "type": "living",
    "scope": "individual",
    "iso6393": "gun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guayabero",
    "type": "living",
    "scope": "individual",
    "iso6393": "guo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gunwinggu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aché",
    "type": "living",
    "scope": "individual",
    "iso6393": "guq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Farefare",
    "type": "living",
    "scope": "individual",
    "iso6393": "gur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guinean Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "gus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maléku Jaíka",
    "type": "living",
    "scope": "individual",
    "iso6393": "gut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yanomamö",
    "type": "living",
    "scope": "individual",
    "iso6393": "guu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gun",
    "type": "living",
    "scope": "individual",
    "iso6393": "guw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gourmanchéma",
    "type": "living",
    "scope": "individual",
    "iso6393": "gux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gusii",
    "type": "living",
    "scope": "individual",
    "iso6393": "guz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guana (Paraguay)",
    "type": "living",
    "scope": "individual",
    "iso6393": "gva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guanano",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duwet",
    "type": "living",
    "scope": "individual",
    "iso6393": "gve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Golin",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guajá",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gulay",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurmana",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuku-Yalanji",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gavião Do Jiparaná",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pará Gavião",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurung",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gumawana",
    "type": "living",
    "scope": "individual",
    "iso6393": "gvs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guyani",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gvy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbato",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalami",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gawwada",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gweno",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gowro",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moo",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwichʼin",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwi",
    "iso6392B": "gwi",
    "iso6392T": "gwi",
    "iso6391": null
  },
  {
    "name": "/Gwi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awngthim",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwandara",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwere",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gawar-Bati",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guwamu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwini",
    "type": "living",
    "scope": "individual",
    "iso6393": "gww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gua",
    "type": "living",
    "scope": "individual",
    "iso6393": "gwx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wè Southern",
    "type": "living",
    "scope": "individual",
    "iso6393": "gxx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwest Gbaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "gya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Garus",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayardild",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gyem",
    "type": "living",
    "scope": "individual",
    "iso6393": "gye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gungabula",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gyf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbayi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gyele",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gayil",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngäbere",
    "type": "living",
    "scope": "individual",
    "iso6393": "gym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guyanese Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guarayu",
    "type": "living",
    "scope": "individual",
    "iso6393": "gyr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gunya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "gyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganza",
    "type": "living",
    "scope": "individual",
    "iso6393": "gza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gazi",
    "type": "living",
    "scope": "individual",
    "iso6393": "gzi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gane",
    "type": "living",
    "scope": "individual",
    "iso6393": "gzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Han",
    "type": "living",
    "scope": "individual",
    "iso6393": "haa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hanoi Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gurani",
    "type": "living",
    "scope": "individual",
    "iso6393": "hac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hatam",
    "type": "living",
    "scope": "individual",
    "iso6393": "had",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Oromo",
    "type": "living",
    "scope": "individual",
    "iso6393": "hae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haiphong Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "haf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "hag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hahon",
    "type": "living",
    "scope": "individual",
    "iso6393": "hah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haida",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "hai",
    "iso6392B": "hai",
    "iso6392T": "hai",
    "iso6391": null
  },
  {
    "name": "Hajong",
    "type": "living",
    "scope": "individual",
    "iso6393": "haj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hakka Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "hak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halang",
    "type": "living",
    "scope": "individual",
    "iso6393": "hal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ham",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hangaza",
    "type": "living",
    "scope": "individual",
    "iso6393": "han",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hakö",
    "type": "living",
    "scope": "individual",
    "iso6393": "hao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hupla",
    "type": "living",
    "scope": "individual",
    "iso6393": "hap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ha",
    "type": "living",
    "scope": "individual",
    "iso6393": "haq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Harari",
    "type": "living",
    "scope": "individual",
    "iso6393": "har",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haisla",
    "type": "living",
    "scope": "individual",
    "iso6393": "has",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haitian",
    "type": "living",
    "scope": "individual",
    "iso6393": "hat",
    "iso6392B": "hat",
    "iso6392T": "hat",
    "iso6391": "ht"
  },
  {
    "name": "Hausa",
    "type": "living",
    "scope": "individual",
    "iso6393": "hau",
    "iso6392B": "hau",
    "iso6392T": "hau",
    "iso6391": "ha"
  },
  {
    "name": "Havu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hawaiian",
    "type": "living",
    "scope": "individual",
    "iso6393": "haw",
    "iso6392B": "haw",
    "iso6392T": "haw",
    "iso6391": null
  },
  {
    "name": "Southern Haida",
    "type": "living",
    "scope": "individual",
    "iso6393": "hax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haya",
    "type": "living",
    "scope": "individual",
    "iso6393": "hay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hazaragi",
    "type": "living",
    "scope": "individual",
    "iso6393": "haz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "hba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huba",
    "type": "living",
    "scope": "individual",
    "iso6393": "hbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Heiban",
    "type": "living",
    "scope": "individual",
    "iso6393": "hbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ancient Hebrew",
    "type": "historical",
    "scope": "individual",
    "iso6393": "hbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Serbo-Croatian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "hbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": "sh"
  },
  {
    "name": "Habu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Andaman Creole Hindi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huichol",
    "type": "living",
    "scope": "individual",
    "iso6393": "hch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Haida",
    "type": "living",
    "scope": "individual",
    "iso6393": "hdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Honduras Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hadiyya",
    "type": "living",
    "scope": "individual",
    "iso6393": "hdy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Qiandong Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "hea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hebrew",
    "type": "living",
    "scope": "individual",
    "iso6393": "heb",
    "iso6392B": "heb",
    "iso6392T": "heb",
    "iso6391": "he"
  },
  {
    "name": "Herdé",
    "type": "living",
    "scope": "individual",
    "iso6393": "hed",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Helong",
    "type": "living",
    "scope": "individual",
    "iso6393": "heg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hehe",
    "type": "living",
    "scope": "individual",
    "iso6393": "heh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Heiltsuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "hei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hemba",
    "type": "living",
    "scope": "individual",
    "iso6393": "hem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Herero",
    "type": "living",
    "scope": "individual",
    "iso6393": "her",
    "iso6392B": "her",
    "iso6392T": "her",
    "iso6391": "hz"
  },
  {
    "name": "Hai//om",
    "type": "living",
    "scope": "individual",
    "iso6393": "hgm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haigwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "hgw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hoia Hoia",
    "type": "living",
    "scope": "individual",
    "iso6393": "hhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kerak",
    "type": "living",
    "scope": "individual",
    "iso6393": "hhr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hoyahoya",
    "type": "living",
    "scope": "individual",
    "iso6393": "hhy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamang",
    "type": "living",
    "scope": "individual",
    "iso6393": "hia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hibito",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hidatsa",
    "type": "living",
    "scope": "individual",
    "iso6393": "hid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Fiji Hindi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "hig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pamosu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hinduri",
    "type": "living",
    "scope": "individual",
    "iso6393": "hii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hijuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "hij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Seit-Kaitetu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hiligaynon",
    "type": "living",
    "scope": "individual",
    "iso6393": "hil",
    "iso6392B": "hil",
    "iso6392T": "hil",
    "iso6391": null
  },
  {
    "name": "Hindi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hin",
    "iso6392B": "hin",
    "iso6392T": "hin",
    "iso6391": "hi"
  },
  {
    "name": "Tsoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "hio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Himarimã",
    "type": "living",
    "scope": "individual",
    "iso6393": "hir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hittite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "hit",
    "iso6392B": "hit",
    "iso6392T": "hit",
    "iso6391": null
  },
  {
    "name": "Hiw",
    "type": "living",
    "scope": "individual",
    "iso6393": "hiw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hixkaryána",
    "type": "living",
    "scope": "individual",
    "iso6393": "hix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haji",
    "type": "living",
    "scope": "individual",
    "iso6393": "hji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kahe",
    "type": "living",
    "scope": "individual",
    "iso6393": "hka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hunde",
    "type": "living",
    "scope": "individual",
    "iso6393": "hke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hunjara-Kaina Ke",
    "type": "living",
    "scope": "individual",
    "iso6393": "hkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hong Kong Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halia",
    "type": "living",
    "scope": "individual",
    "iso6393": "hla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hlb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halang Doan",
    "type": "living",
    "scope": "individual",
    "iso6393": "hld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hlersu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matu Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "hlt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hieroglyphic Luwian",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "hlu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Mashan Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Humburi Senni Songhay",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Huishui Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Large Flowery Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Huishui Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong Don",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Guiyang Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Huishui Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Huishui Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ge",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maek",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luopohe Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Mashan Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "hmn",
    "iso6392B": "hmn",
    "iso6392T": "hmn",
    "iso6391": null
  },
  {
    "name": "Hiri Motu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmo",
    "iso6392B": "hmo",
    "iso6392T": "hmo",
    "iso6391": "ho"
  },
  {
    "name": "Northern Mashan Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Qiandong Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmar",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Qiandong Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "hms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hamtai",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hamap",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong Dô",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Mashan Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Guiyang Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong Shua",
    "type": "living",
    "scope": "individual",
    "iso6393": "hmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mina (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "hna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Hindko",
    "type": "living",
    "scope": "individual",
    "iso6393": "hnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chhattisgarhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "//Ani",
    "type": "living",
    "scope": "individual",
    "iso6393": "hnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hani",
    "type": "living",
    "scope": "individual",
    "iso6393": "hni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong Njua",
    "type": "living",
    "scope": "individual",
    "iso6393": "hnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hanunoo",
    "type": "living",
    "scope": "individual",
    "iso6393": "hnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Hindko",
    "type": "living",
    "scope": "individual",
    "iso6393": "hno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caribbean Hindustani",
    "type": "living",
    "scope": "individual",
    "iso6393": "hns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hung",
    "type": "living",
    "scope": "individual",
    "iso6393": "hnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hoava",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mari (Madang Province)",
    "type": "living",
    "scope": "individual",
    "iso6393": "hob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ho",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Holma",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Horom",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hobyót",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Holikachuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hadothi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Holu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Homa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Holoholo",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hopi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Horo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ho Chi Minh City Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hote",
    "type": "living",
    "scope": "individual",
    "iso6393": "hot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hovongan",
    "type": "living",
    "scope": "individual",
    "iso6393": "hov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Honi",
    "type": "living",
    "scope": "individual",
    "iso6393": "how",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Holiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hozo",
    "type": "living",
    "scope": "individual",
    "iso6393": "hoz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hpon",
    "type": "living",
    "scope": "individual",
    "iso6393": "hpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hawai'i Sign Language (HSL)",
    "type": "living",
    "scope": "individual",
    "iso6393": "hps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hrangkhol",
    "type": "living",
    "scope": "individual",
    "iso6393": "hra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niwer Mil",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hre",
    "type": "living",
    "scope": "individual",
    "iso6393": "hre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haruku",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Horned Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haroi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nhirrpi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "hrp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hértevin",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hruso",
    "type": "living",
    "scope": "individual",
    "iso6393": "hru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Croatian",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrv",
    "iso6392B": "hrv",
    "iso6392T": "hrv",
    "iso6391": "hr"
  },
  {
    "name": "Warwar Feni",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hunsrik",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Harzani",
    "type": "living",
    "scope": "individual",
    "iso6393": "hrz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Upper Sorbian",
    "type": "living",
    "scope": "individual",
    "iso6393": "hsb",
    "iso6392B": "hsb",
    "iso6392T": "hsb",
    "iso6391": null
  },
  {
    "name": "Hungarian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hsh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hausa Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Xiang Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "hsn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Harsusi",
    "type": "living",
    "scope": "individual",
    "iso6393": "hss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hoti",
    "type": "living",
    "scope": "individual",
    "iso6393": "hti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minica Huitoto",
    "type": "living",
    "scope": "individual",
    "iso6393": "hto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hadza",
    "type": "living",
    "scope": "individual",
    "iso6393": "hts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hitu",
    "type": "living",
    "scope": "individual",
    "iso6393": "htu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Hittite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "htx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huambisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "hub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "=/Hua",
    "type": "living",
    "scope": "individual",
    "iso6393": "huc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huaulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Francisco Del Mar Huave",
    "type": "living",
    "scope": "individual",
    "iso6393": "hue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Humene",
    "type": "living",
    "scope": "individual",
    "iso6393": "huf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huachipaeri",
    "type": "living",
    "scope": "individual",
    "iso6393": "hug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huilliche",
    "type": "living",
    "scope": "individual",
    "iso6393": "huh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huli",
    "type": "living",
    "scope": "individual",
    "iso6393": "hui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Guiyang Hmong",
    "type": "living",
    "scope": "individual",
    "iso6393": "huj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hulung",
    "type": "living",
    "scope": "individual",
    "iso6393": "huk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hula",
    "type": "living",
    "scope": "individual",
    "iso6393": "hul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hungana",
    "type": "living",
    "scope": "individual",
    "iso6393": "hum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hungarian",
    "type": "living",
    "scope": "individual",
    "iso6393": "hun",
    "iso6392B": "hun",
    "iso6392T": "hun",
    "iso6391": "hu"
  },
  {
    "name": "Hu",
    "type": "living",
    "scope": "individual",
    "iso6393": "huo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hupa",
    "type": "living",
    "scope": "individual",
    "iso6393": "hup",
    "iso6392B": "hup",
    "iso6392T": "hup",
    "iso6391": null
  },
  {
    "name": "Tsat",
    "type": "living",
    "scope": "individual",
    "iso6393": "huq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halkomelem",
    "type": "living",
    "scope": "individual",
    "iso6393": "hur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huastec",
    "type": "living",
    "scope": "individual",
    "iso6393": "hus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Humla",
    "type": "living",
    "scope": "individual",
    "iso6393": "hut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murui Huitoto",
    "type": "living",
    "scope": "individual",
    "iso6393": "huu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Mateo Del Mar Huave",
    "type": "living",
    "scope": "individual",
    "iso6393": "huv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hukumina",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "huw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nüpode Huitoto",
    "type": "living",
    "scope": "individual",
    "iso6393": "hux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hulaulá",
    "type": "living",
    "scope": "individual",
    "iso6393": "huy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hunzib",
    "type": "living",
    "scope": "individual",
    "iso6393": "huz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haitian Vodoun Culture Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "hvc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Dionisio Del Mar Huave",
    "type": "living",
    "scope": "individual",
    "iso6393": "hve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Haveke",
    "type": "living",
    "scope": "individual",
    "iso6393": "hvk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sabu",
    "type": "living",
    "scope": "individual",
    "iso6393": "hvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa María Del Mar Huave",
    "type": "living",
    "scope": "individual",
    "iso6393": "hvv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wané",
    "type": "living",
    "scope": "individual",
    "iso6393": "hwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hawai'i Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "hwc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hwana",
    "type": "living",
    "scope": "individual",
    "iso6393": "hwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hya",
    "type": "living",
    "scope": "individual",
    "iso6393": "hya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Armenian",
    "type": "living",
    "scope": "individual",
    "iso6393": "hye",
    "iso6392B": "arm",
    "iso6392T": "hye",
    "iso6391": "hy"
  },
  {
    "name": "Iaai",
    "type": "living",
    "scope": "individual",
    "iso6393": "iai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iatmul",
    "type": "living",
    "scope": "individual",
    "iso6393": "ian",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Purari",
    "type": "living",
    "scope": "individual",
    "iso6393": "iar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iban",
    "type": "living",
    "scope": "individual",
    "iso6393": "iba",
    "iso6392B": "iba",
    "iso6392T": "iba",
    "iso6391": null
  },
  {
    "name": "Ibibio",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iwaidja",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akpes",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibanag",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibaloi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agoi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibino",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibo",
    "iso6392B": "ibo",
    "iso6392T": "ibo",
    "iso6391": "ig"
  },
  {
    "name": "Ibuoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ibu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibani",
    "type": "living",
    "scope": "individual",
    "iso6393": "iby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ede Ica",
    "type": "living",
    "scope": "individual",
    "iso6393": "ica",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Etkywan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ich",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Icelandic Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "icl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Islander Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "icr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idakho-Isukha-Tiriki",
    "type": "living",
    "scope": "individual",
    "iso6393": "ida",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indo-Portuguese",
    "type": "living",
    "scope": "individual",
    "iso6393": "idb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idon",
    "type": "living",
    "scope": "individual",
    "iso6393": "idc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ede Idaca",
    "type": "living",
    "scope": "individual",
    "iso6393": "idd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idere",
    "type": "living",
    "scope": "individual",
    "iso6393": "ide",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idi",
    "type": "living",
    "scope": "individual",
    "iso6393": "idi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ido",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "ido",
    "iso6392B": "ido",
    "iso6392T": "ido",
    "iso6391": "io"
  },
  {
    "name": "Indri",
    "type": "living",
    "scope": "individual",
    "iso6393": "idr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idesa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ids",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idaté",
    "type": "living",
    "scope": "individual",
    "iso6393": "idt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Idoma",
    "type": "living",
    "scope": "individual",
    "iso6393": "idu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amganad Ifugao",
    "type": "living",
    "scope": "individual",
    "iso6393": "ifa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Batad Ifugao",
    "type": "living",
    "scope": "individual",
    "iso6393": "ifb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ifè",
    "type": "living",
    "scope": "individual",
    "iso6393": "ife",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ifo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "iff",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tuwali Ifugao",
    "type": "living",
    "scope": "individual",
    "iso6393": "ifk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teke-Fuumu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ifm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mayoyao Ifugao",
    "type": "living",
    "scope": "individual",
    "iso6393": "ifu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keley-I Kallahan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ify",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ebira",
    "type": "living",
    "scope": "individual",
    "iso6393": "igb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igede",
    "type": "living",
    "scope": "individual",
    "iso6393": "ige",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igana",
    "type": "living",
    "scope": "individual",
    "iso6393": "igg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igala",
    "type": "living",
    "scope": "individual",
    "iso6393": "igl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanggape",
    "type": "living",
    "scope": "individual",
    "iso6393": "igm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ignaciano",
    "type": "living",
    "scope": "individual",
    "iso6393": "ign",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isebe",
    "type": "living",
    "scope": "individual",
    "iso6393": "igo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Interglossa",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "igs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Igwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "igw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iha Based Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "ihb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ihievbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ihi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iha",
    "type": "living",
    "scope": "individual",
    "iso6393": "ihp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bidhawal",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ihw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sichuan Yi",
    "type": "living",
    "scope": "individual",
    "iso6393": "iii",
    "iso6392B": "iii",
    "iso6392T": "iii",
    "iso6391": "ii"
  },
  {
    "name": "Thiin",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "iin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Izon",
    "type": "living",
    "scope": "individual",
    "iso6393": "ijc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Biseni",
    "type": "living",
    "scope": "individual",
    "iso6393": "ije",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ede Ije",
    "type": "living",
    "scope": "individual",
    "iso6393": "ijj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalabari",
    "type": "living",
    "scope": "individual",
    "iso6393": "ijn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southeast Ijo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ijs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Canadian Inuktitut",
    "type": "living",
    "scope": "individual",
    "iso6393": "ike",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iko",
    "type": "living",
    "scope": "individual",
    "iso6393": "iki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ika",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olulumo-Ikom",
    "type": "living",
    "scope": "individual",
    "iso6393": "iko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikpeshi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikaranggal",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ikr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inuit Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "iks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inuinnaqtun",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inuktitut",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "iku",
    "iso6392B": "iku",
    "iso6392T": "iku",
    "iso6391": "iu"
  },
  {
    "name": "Iku-Gora-Ankwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikwere",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ik",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikizu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ikz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ile Ape",
    "type": "living",
    "scope": "individual",
    "iso6393": "ila",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ila",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Interlingue",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "ile",
    "iso6392B": "ile",
    "iso6392T": "ile",
    "iso6391": "ie"
  },
  {
    "name": "Garig-Ilgar",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ilg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ili Turki",
    "type": "living",
    "scope": "individual",
    "iso6393": "ili",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ilongot",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iranun (Malaysia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iloko",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilo",
    "iso6392B": "ilo",
    "iso6392T": "ilo",
    "iso6391": null
  },
  {
    "name": " Iranun (Philippines)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "International Sign",
    "type": "living",
    "scope": "individual",
    "iso6393": "ils",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ili'uun",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ilue",
    "type": "living",
    "scope": "individual",
    "iso6393": "ilv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mala Malasar",
    "type": "living",
    "scope": "individual",
    "iso6393": "ima",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anamgura",
    "type": "living",
    "scope": "individual",
    "iso6393": "imi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miluk",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "iml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Imonda",
    "type": "living",
    "scope": "individual",
    "iso6393": "imn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Imbongu",
    "type": "living",
    "scope": "individual",
    "iso6393": "imo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Imroing",
    "type": "living",
    "scope": "individual",
    "iso6393": "imr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marsian",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "ims",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Milyan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "imy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Interlingua (International Auxiliary Language Association)",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "ina",
    "iso6392B": "ina",
    "iso6392T": "ina",
    "iso6391": "ia"
  },
  {
    "name": "Inga",
    "type": "living",
    "scope": "individual",
    "iso6393": "inb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indonesian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ind",
    "iso6392B": "ind",
    "iso6392T": "ind",
    "iso6391": "id"
  },
  {
    "name": "Degexit'an",
    "type": "living",
    "scope": "individual",
    "iso6393": "ing",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ingush",
    "type": "living",
    "scope": "individual",
    "iso6393": "inh",
    "iso6392B": "inh",
    "iso6392T": "inh",
    "iso6391": null
  },
  {
    "name": "Jungle Inga",
    "type": "living",
    "scope": "individual",
    "iso6393": "inj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indonesian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "inl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minaean",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "inm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isinai",
    "type": "living",
    "scope": "individual",
    "iso6393": "inn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inoke-Yate",
    "type": "living",
    "scope": "individual",
    "iso6393": "ino",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iñapari",
    "type": "living",
    "scope": "individual",
    "iso6393": "inp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ins",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Intha",
    "type": "living",
    "scope": "individual",
    "iso6393": "int",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ineseño",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "inz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inor",
    "type": "living",
    "scope": "individual",
    "iso6393": "ior",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tuma-Irumu",
    "type": "living",
    "scope": "individual",
    "iso6393": "iou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iowa-Oto",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "iow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ipili",
    "type": "living",
    "scope": "individual",
    "iso6393": "ipi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inupiaq",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "ipk",
    "iso6392B": "ipk",
    "iso6392T": "ipk",
    "iso6391": "ik"
  },
  {
    "name": "Ipiko",
    "type": "living",
    "scope": "individual",
    "iso6393": "ipo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iquito",
    "type": "living",
    "scope": "individual",
    "iso6393": "iqu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikwo",
    "type": "living",
    "scope": "individual",
    "iso6393": "iqw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iresim",
    "type": "living",
    "scope": "individual",
    "iso6393": "ire",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irarutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "irh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irigwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "iri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iraqw",
    "type": "living",
    "scope": "individual",
    "iso6393": "irk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irántxe",
    "type": "living",
    "scope": "individual",
    "iso6393": "irn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ir",
    "type": "living",
    "scope": "individual",
    "iso6393": "irr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irula",
    "type": "living",
    "scope": "individual",
    "iso6393": "iru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamberau",
    "type": "living",
    "scope": "individual",
    "iso6393": "irx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iraya",
    "type": "living",
    "scope": "individual",
    "iso6393": "iry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "isa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isconahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "isc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isnag",
    "type": "living",
    "scope": "individual",
    "iso6393": "isd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Italian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ise",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Irish Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "isg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Esan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ish",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkem-Nkum",
    "type": "living",
    "scope": "individual",
    "iso6393": "isi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ishkashimi",
    "type": "living",
    "scope": "individual",
    "iso6393": "isk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Icelandic",
    "type": "living",
    "scope": "individual",
    "iso6393": "isl",
    "iso6392B": "ice",
    "iso6392T": "isl",
    "iso6391": "is"
  },
  {
    "name": "Masimasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ism",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isanzu",
    "type": "living",
    "scope": "individual",
    "iso6393": "isn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isoko",
    "type": "living",
    "scope": "individual",
    "iso6393": "iso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Israeli Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "isr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Istriot",
    "type": "living",
    "scope": "individual",
    "iso6393": "ist",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isu (Menchum Division)",
    "type": "living",
    "scope": "individual",
    "iso6393": "isu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Italian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ita",
    "iso6392B": "ita",
    "iso6392T": "ita",
    "iso6391": "it"
  },
  {
    "name": "Binongan Itneg",
    "type": "living",
    "scope": "individual",
    "iso6393": "itb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Tidung",
    "type": "living",
    "scope": "individual",
    "iso6393": "itd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itene",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ite",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inlaod Itneg",
    "type": "living",
    "scope": "individual",
    "iso6393": "iti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Italian",
    "type": "living",
    "scope": "individual",
    "iso6393": "itk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itelmen",
    "type": "living",
    "scope": "individual",
    "iso6393": "itl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itu Mbon Uzo",
    "type": "living",
    "scope": "individual",
    "iso6393": "itm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itonama",
    "type": "living",
    "scope": "individual",
    "iso6393": "ito",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iteri",
    "type": "living",
    "scope": "individual",
    "iso6393": "itr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isekiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "its",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maeng Itneg",
    "type": "living",
    "scope": "individual",
    "iso6393": "itt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itawit",
    "type": "living",
    "scope": "individual",
    "iso6393": "itv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ito",
    "type": "living",
    "scope": "individual",
    "iso6393": "itw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itik",
    "type": "living",
    "scope": "individual",
    "iso6393": "itx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moyadan Itneg",
    "type": "living",
    "scope": "individual",
    "iso6393": "ity",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itzá",
    "type": "living",
    "scope": "individual",
    "iso6393": "itz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iu Mien",
    "type": "living",
    "scope": "individual",
    "iso6393": "ium",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ibatan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ivb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ivatan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ivv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "I-Wak",
    "type": "living",
    "scope": "individual",
    "iso6393": "iwk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iwam",
    "type": "living",
    "scope": "individual",
    "iso6393": "iwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iwur",
    "type": "living",
    "scope": "individual",
    "iso6393": "iwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sepik Iwam",
    "type": "living",
    "scope": "individual",
    "iso6393": "iws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ixcatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "ixc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ixil",
    "type": "living",
    "scope": "individual",
    "iso6393": "ixl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iyayu",
    "type": "living",
    "scope": "individual",
    "iso6393": "iya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mesaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "iyo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaka (Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "iyx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ingrian",
    "type": "living",
    "scope": "individual",
    "iso6393": "izh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Izere",
    "type": "living",
    "scope": "individual",
    "iso6393": "izr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Izii",
    "type": "living",
    "scope": "individual",
    "iso6393": "izz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamamadí",
    "type": "living",
    "scope": "individual",
    "iso6393": "jaa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hyam",
    "type": "living",
    "scope": "individual",
    "iso6393": "jab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Popti'",
    "type": "living",
    "scope": "individual",
    "iso6393": "jac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jahanka",
    "type": "living",
    "scope": "individual",
    "iso6393": "jad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yabem",
    "type": "living",
    "scope": "individual",
    "iso6393": "jae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jara",
    "type": "living",
    "scope": "individual",
    "iso6393": "jaf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jah Hut",
    "type": "living",
    "scope": "individual",
    "iso6393": "jah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zazao",
    "type": "living",
    "scope": "individual",
    "iso6393": "jaj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jakun",
    "type": "living",
    "scope": "individual",
    "iso6393": "jak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yalahatan",
    "type": "living",
    "scope": "individual",
    "iso6393": "jal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamaican Creole English",
    "type": "living",
    "scope": "individual",
    "iso6393": "jam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jandai",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jan",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yanyuwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "jao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaqay",
    "type": "living",
    "scope": "individual",
    "iso6393": "jaq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "New Caledonian Javanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "jas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jakati",
    "type": "living",
    "scope": "individual",
    "iso6393": "jat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaur",
    "type": "living",
    "scope": "individual",
    "iso6393": "jau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Javanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "jav",
    "iso6392B": "jav",
    "iso6392T": "jav",
    "iso6391": "jv"
  },
  {
    "name": "Jambi Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "jax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yan-nhangu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jawe",
    "type": "living",
    "scope": "individual",
    "iso6393": "jaz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Berber",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badjiri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Arandai",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Barikewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nafusi",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lojban",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "jbo",
    "iso6392B": "jbo",
    "iso6392T": "jbo",
    "iso6391": null
  },
  {
    "name": "Jofotek-Bromnya",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jabutí",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jukun Takum",
    "type": "living",
    "scope": "individual",
    "iso6393": "jbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yawijibaya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamaican Country Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krymchak",
    "type": "living",
    "scope": "individual",
    "iso6393": "jct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jad",
    "type": "living",
    "scope": "individual",
    "iso6393": "jda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jadgali",
    "type": "living",
    "scope": "individual",
    "iso6393": "jdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Tat",
    "type": "living",
    "scope": "individual",
    "iso6393": "jdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jebero",
    "type": "living",
    "scope": "individual",
    "iso6393": "jeb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jerung",
    "type": "living",
    "scope": "individual",
    "iso6393": "jee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jeng",
    "type": "living",
    "scope": "individual",
    "iso6393": "jeg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jeh",
    "type": "living",
    "scope": "individual",
    "iso6393": "jeh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yei",
    "type": "living",
    "scope": "individual",
    "iso6393": "jei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jeri Kuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "jek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yelmek",
    "type": "living",
    "scope": "individual",
    "iso6393": "jel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dza",
    "type": "living",
    "scope": "individual",
    "iso6393": "jen",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jere",
    "type": "living",
    "scope": "individual",
    "iso6393": "jer",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manem",
    "type": "living",
    "scope": "individual",
    "iso6393": "jet",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jonkor Bourmataguil",
    "type": "living",
    "scope": "individual",
    "iso6393": "jeu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngbee",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Georgian",
    "type": "living",
    "scope": "individual",
    "iso6393": "jge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gwak",
    "type": "living",
    "scope": "individual",
    "iso6393": "jgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngomba",
    "type": "living",
    "scope": "individual",
    "iso6393": "jgo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jehai",
    "type": "living",
    "scope": "individual",
    "iso6393": "jhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jhankot Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jhs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jina",
    "type": "living",
    "scope": "individual",
    "iso6393": "jia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jibu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tol",
    "type": "living",
    "scope": "individual",
    "iso6393": "jic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jilbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "jie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Djingili",
    "type": "living",
    "scope": "individual",
    "iso6393": "jig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "sTodsde",
    "type": "living",
    "scope": "individual",
    "iso6393": "jih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jiiddu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jilim",
    "type": "living",
    "scope": "individual",
    "iso6393": "jil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jimi (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "jim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jiamao",
    "type": "living",
    "scope": "individual",
    "iso6393": "jio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guanyinqiao",
    "type": "living",
    "scope": "individual",
    "iso6393": "jiq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jita",
    "type": "living",
    "scope": "individual",
    "iso6393": "jit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Youle Jinuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "jiu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shuar",
    "type": "living",
    "scope": "individual",
    "iso6393": "jiv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buyuan Jinuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "jiy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jejueo",
    "type": "living",
    "scope": "individual",
    "iso6393": "jje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bankal",
    "type": "living",
    "scope": "individual",
    "iso6393": "jjr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaera",
    "type": "living",
    "scope": "individual",
    "iso6393": "jka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mobwa Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "jkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kubo",
    "type": "living",
    "scope": "individual",
    "iso6393": "jko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paku Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "jkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koro (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "jkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Labir",
    "type": "living",
    "scope": "individual",
    "iso6393": "jku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngile",
    "type": "living",
    "scope": "individual",
    "iso6393": "jle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamaican Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dima",
    "type": "living",
    "scope": "individual",
    "iso6393": "jma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zumbun",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Machame",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yamdena",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jimi (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jumli",
    "type": "living",
    "scope": "individual",
    "iso6393": "jml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makuri Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamara",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mashi (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "jms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mouwase",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Juxtlahuaca Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "jmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jangshung",
    "type": "living",
    "scope": "individual",
    "iso6393": "jna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jandavra",
    "type": "living",
    "scope": "individual",
    "iso6393": "jnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yangman",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Janji",
    "type": "living",
    "scope": "individual",
    "iso6393": "jni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yemsa",
    "type": "living",
    "scope": "individual",
    "iso6393": "jnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rawat",
    "type": "living",
    "scope": "individual",
    "iso6393": "jnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jaunsari",
    "type": "living",
    "scope": "individual",
    "iso6393": "jns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Joba",
    "type": "living",
    "scope": "individual",
    "iso6393": "job",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wojenaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "jod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jogi",
    "type": "living",
    "scope": "individual",
    "iso6393": "jog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jorá",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jordanian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jowulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jewish Palestinian Aramaic",
    "type": "historical",
    "scope": "individual",
    "iso6393": "jpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Japanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "jpn",
    "iso6392B": "jpn",
    "iso6392T": "jpn",
    "iso6391": "ja"
  },
  {
    "name": "Judeo-Persian",
    "type": "living",
    "scope": "individual",
    "iso6393": "jpr",
    "iso6392B": "jpr",
    "iso6392T": "jpr",
    "iso6391": null
  },
  {
    "name": "Jaqaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "jqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jarai",
    "type": "living",
    "scope": "individual",
    "iso6393": "jra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Arabic",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "jrb",
    "iso6392B": "jrb",
    "iso6392T": "jrb",
    "iso6391": null
  },
  {
    "name": "Jiru",
    "type": "living",
    "scope": "individual",
    "iso6393": "jrr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jorto",
    "type": "living",
    "scope": "individual",
    "iso6393": "jrt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Japrería",
    "type": "living",
    "scope": "individual",
    "iso6393": "jru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Japanese Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Júma",
    "type": "living",
    "scope": "individual",
    "iso6393": "jua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wannu",
    "type": "living",
    "scope": "individual",
    "iso6393": "jub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jurchen",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "juc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Worodougou",
    "type": "living",
    "scope": "individual",
    "iso6393": "jud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hõne",
    "type": "living",
    "scope": "individual",
    "iso6393": "juh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngadjuri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wapan",
    "type": "living",
    "scope": "individual",
    "iso6393": "juk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jirel",
    "type": "living",
    "scope": "individual",
    "iso6393": "jul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jumjum",
    "type": "living",
    "scope": "individual",
    "iso6393": "jum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Juang",
    "type": "living",
    "scope": "individual",
    "iso6393": "jun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jiba",
    "type": "living",
    "scope": "individual",
    "iso6393": "juo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hupdë",
    "type": "living",
    "scope": "individual",
    "iso6393": "jup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jurúna",
    "type": "living",
    "scope": "individual",
    "iso6393": "jur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jumla Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "jus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jutish",
    "type": "historical",
    "scope": "individual",
    "iso6393": "jut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ju",
    "type": "living",
    "scope": "individual",
    "iso6393": "juu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wãpha",
    "type": "living",
    "scope": "individual",
    "iso6393": "juw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Juray",
    "type": "living",
    "scope": "individual",
    "iso6393": "juy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Javindo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "jvd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caribbean Javanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "jvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jwira-Pepesa",
    "type": "living",
    "scope": "individual",
    "iso6393": "jwi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jiarong",
    "type": "living",
    "scope": "individual",
    "iso6393": "jya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Judeo-Yemeni Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "jye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "jyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kara-Kalpak",
    "type": "living",
    "scope": "individual",
    "iso6393": "kaa",
    "iso6392B": "kaa",
    "iso6392T": "kaa",
    "iso6391": null
  },
  {
    "name": "Kabyle",
    "type": "living",
    "scope": "individual",
    "iso6393": "kab",
    "iso6392B": "kab",
    "iso6392T": "kab",
    "iso6391": null
  },
  {
    "name": "Kachin",
    "type": "living",
    "scope": "individual",
    "iso6393": "kac",
    "iso6392B": "kac",
    "iso6392T": "kac",
    "iso6391": null
  },
  {
    "name": "Adara",
    "type": "living",
    "scope": "individual",
    "iso6393": "kad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ketangalan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Katso",
    "type": "living",
    "scope": "individual",
    "iso6393": "kaf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kajaman",
    "type": "living",
    "scope": "individual",
    "iso6393": "kag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kara (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karekare",
    "type": "living",
    "scope": "individual",
    "iso6393": "kai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jju",
    "type": "living",
    "scope": "individual",
    "iso6393": "kaj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalanguya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalaallisut",
    "type": "living",
    "scope": "individual",
    "iso6393": "kal",
    "iso6392B": "kal",
    "iso6392T": "kal",
    "iso6391": "kl"
  },
  {
    "name": "Kamba (Kenya)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kam",
    "iso6392B": "kam",
    "iso6392T": "kam",
    "iso6391": null
  },
  {
    "name": "Kannada",
    "type": "living",
    "scope": "individual",
    "iso6393": "kan",
    "iso6392B": "kan",
    "iso6392T": "kan",
    "iso6391": "kn"
  },
  {
    "name": "Xaasongaxango",
    "type": "living",
    "scope": "individual",
    "iso6393": "kao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bezhta",
    "type": "living",
    "scope": "individual",
    "iso6393": "kap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Capanahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "kaq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kashmiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kas",
    "iso6392B": "kas",
    "iso6392T": "kas",
    "iso6391": "ks"
  },
  {
    "name": "Georgian",
    "type": "living",
    "scope": "individual",
    "iso6393": "kat",
    "iso6392B": "geo",
    "iso6392T": "kat",
    "iso6391": "ka"
  },
  {
    "name": "Kanuri",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kau",
    "iso6392B": "kau",
    "iso6392T": "kau",
    "iso6391": "kr"
  },
  {
    "name": "Katukína",
    "type": "living",
    "scope": "individual",
    "iso6393": "kav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kawi",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "kaw",
    "iso6392B": "kaw",
    "iso6392T": "kaw",
    "iso6391": null
  },
  {
    "name": "Kao",
    "type": "living",
    "scope": "individual",
    "iso6393": "kax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamayurá",
    "type": "living",
    "scope": "individual",
    "iso6393": "kay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kazakh",
    "type": "living",
    "scope": "individual",
    "iso6393": "kaz",
    "iso6392B": "kaz",
    "iso6392T": "kaz",
    "iso6391": "kk"
  },
  {
    "name": "Kalarko",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaxuiâna",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kadiwéu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabardian",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbd",
    "iso6392B": "kbd",
    "iso6392T": "kbd",
    "iso6391": null
  },
  {
    "name": "Kanju",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Camsá",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaptiau",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Grass Koiari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanembu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iwal",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kare (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keliko",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabiyè",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamano",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kafa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kande",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abadi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabutra",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dera (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaiep",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ap Ma",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manga Kanuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duhwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kbz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khanty",
    "type": "living",
    "scope": "individual",
    "iso6393": "kca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kawacha",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lubila",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngkâlmpw Kanum",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaivi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ukaan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tyap",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vono",
    "type": "living",
    "scope": "individual",
    "iso6393": "kch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamantan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kobiana",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kck",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kela (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gula (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nubi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinalakna",
    "type": "living",
    "scope": "individual",
    "iso6393": "kco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Katla",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koenoem",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaian",
    "type": "living",
    "scope": "individual",
    "iso6393": "kct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kami (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kete",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabwari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kachama-Ganjule",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korandje",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kcz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Worimi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yankunytjatjara",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makonde",
    "type": "living",
    "scope": "individual",
    "iso6393": "kde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamusi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Seba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tem",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumam",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karamojong",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Numèè",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tsikimba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kagoma",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaningdon-Nindem",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koch",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karaim",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuy",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kadaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koneraw",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kam",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keder",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwaja",
    "type": "living",
    "scope": "individual",
    "iso6393": "kdz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabuverdianu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kélé",
    "type": "living",
    "scope": "individual",
    "iso6393": "keb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keiga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kerewe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ked",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Keres",
    "type": "living",
    "scope": "individual",
    "iso6393": "kee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpessi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tese",
    "type": "living",
    "scope": "individual",
    "iso6393": "keg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keak",
    "type": "living",
    "scope": "individual",
    "iso6393": "keh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kei",
    "type": "living",
    "scope": "individual",
    "iso6393": "kei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kadar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kekchí",
    "type": "living",
    "scope": "individual",
    "iso6393": "kek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kela (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kemak",
    "type": "living",
    "scope": "individual",
    "iso6393": "kem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kenyang",
    "type": "living",
    "scope": "individual",
    "iso6393": "ken",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kakwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "keo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaikadi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamar",
    "type": "living",
    "scope": "individual",
    "iso6393": "keq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kera",
    "type": "living",
    "scope": "individual",
    "iso6393": "ker",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kugbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ket",
    "type": "living",
    "scope": "individual",
    "iso6393": "ket",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akebu",
    "type": "living",
    "scope": "individual",
    "iso6393": "keu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanikkaran",
    "type": "living",
    "scope": "individual",
    "iso6393": "kev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Kewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kukna",
    "type": "living",
    "scope": "individual",
    "iso6393": "kex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kupia",
    "type": "living",
    "scope": "individual",
    "iso6393": "key",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kukele",
    "type": "living",
    "scope": "individual",
    "iso6393": "kez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kodava",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwestern Kolami",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konda-Dora",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korra Koraga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kota (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kff",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kudiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurichiya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kannada Kurumba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kemiehua",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinnauri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kung",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khunsari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koro (Côte d'Ivoire)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korku",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kachhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bilaspuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanjari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kft",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Katkari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurmukar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kharam Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kullu Pahari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumaoni",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koromfé",
    "type": "living",
    "scope": "individual",
    "iso6393": "kfz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koyaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kawe",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kataang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komering",
    "type": "living",
    "scope": "individual",
    "iso6393": "kge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kube",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kusunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Selangor Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamale Kham",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaiwá",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunggari",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karipúna",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kgm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karingani",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaingang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abun",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumbainggar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Somyev",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kobol",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karas",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karon Dori",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kyerung",
    "type": "living",
    "scope": "individual",
    "iso6393": "kgy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kha",
    "iso6392B": "kha",
    "iso6392T": "kha",
    "iso6391": null
  },
  {
    "name": "Lü",
    "type": "living",
    "scope": "individual",
    "iso6393": "khb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tukang Besi North",
    "type": "living",
    "scope": "individual",
    "iso6393": "khc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bädi Kanum",
    "type": "living",
    "scope": "individual",
    "iso6393": "khd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korowai",
    "type": "living",
    "scope": "individual",
    "iso6393": "khe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khuen",
    "type": "living",
    "scope": "individual",
    "iso6393": "khf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khams Tibetan",
    "type": "living",
    "scope": "individual",
    "iso6393": "khg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kehu",
    "type": "living",
    "scope": "individual",
    "iso6393": "khh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuturmi",
    "type": "living",
    "scope": "individual",
    "iso6393": "khj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Halh Mongolian",
    "type": "living",
    "scope": "individual",
    "iso6393": "khk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lusi",
    "type": "living",
    "scope": "individual",
    "iso6393": "khl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Khmer",
    "type": "living",
    "scope": "individual",
    "iso6393": "khm",
    "iso6392B": "khm",
    "iso6392T": "khm",
    "iso6391": "km"
  },
  {
    "name": "Khandesi",
    "type": "living",
    "scope": "individual",
    "iso6393": "khn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khotanese",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "kho",
    "iso6392B": "kho",
    "iso6392T": "kho",
    "iso6391": null
  },
  {
    "name": "Kapori",
    "type": "living",
    "scope": "individual",
    "iso6393": "khp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koyra Chiini Songhay",
    "type": "living",
    "scope": "individual",
    "iso6393": "khq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kharia",
    "type": "living",
    "scope": "individual",
    "iso6393": "khr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kasua",
    "type": "living",
    "scope": "individual",
    "iso6393": "khs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khamti",
    "type": "living",
    "scope": "individual",
    "iso6393": "kht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkhumbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "khu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khvarshi",
    "type": "living",
    "scope": "individual",
    "iso6393": "khv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khowar",
    "type": "living",
    "scope": "individual",
    "iso6393": "khw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanu",
    "type": "living",
    "scope": "individual",
    "iso6393": "khx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kele (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "khy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keapara",
    "type": "living",
    "scope": "individual",
    "iso6393": "khz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kim",
    "type": "living",
    "scope": "individual",
    "iso6393": "kia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koalib",
    "type": "living",
    "scope": "individual",
    "iso6393": "kib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kickapoo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koshin",
    "type": "living",
    "scope": "individual",
    "iso6393": "kid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kibet",
    "type": "living",
    "scope": "individual",
    "iso6393": "kie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Parbate Kham",
    "type": "living",
    "scope": "individual",
    "iso6393": "kif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kimaama",
    "type": "living",
    "scope": "individual",
    "iso6393": "kig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kilmeri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kitsai",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kilivila",
    "type": "living",
    "scope": "individual",
    "iso6393": "kij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kikuyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kik",
    "iso6392B": "kik",
    "iso6392T": "kik",
    "iso6391": "ki"
  },
  {
    "name": "Kariya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karagas",
    "type": "living",
    "scope": "individual",
    "iso6393": "kim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinyarwanda",
    "type": "living",
    "scope": "individual",
    "iso6393": "kin",
    "iso6392B": "kin",
    "iso6392T": "kin",
    "iso6391": "rw"
  },
  {
    "name": "Kiowa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sheshi Kham",
    "type": "living",
    "scope": "individual",
    "iso6393": "kip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kosadle",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kirghiz",
    "type": "living",
    "scope": "individual",
    "iso6393": "kir",
    "iso6392B": "kir",
    "iso6392T": "kir",
    "iso6391": "ky"
  },
  {
    "name": "Kis",
    "type": "living",
    "scope": "individual",
    "iso6393": "kis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agob",
    "type": "living",
    "scope": "individual",
    "iso6393": "kit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kirmanjki (individual language)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kimbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northeast Kiwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khiamniungan Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kirikiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kisi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kiz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mlap",
    "type": "living",
    "scope": "individual",
    "iso6393": "kja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Q'anjob'al",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coastal Konjo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Kiwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kisar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khalaj",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khmu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khakas",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zabana",
    "type": "living",
    "scope": "individual",
    "iso6393": "kji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khinalugh",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Highland Konjo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Parbate Kham",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kháng",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunjen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Harijan Kinnauri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pwo Eastern Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Keres",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurudu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Kewa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phrae Pwo Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kashaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaikavian Literary Language",
    "type": "historical",
    "scope": "individual",
    "iso6393": "kjv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ramopa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Erave",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bumthangkha",
    "type": "living",
    "scope": "individual",
    "iso6393": "kjz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kakanda",
    "type": "living",
    "scope": "individual",
    "iso6393": "kka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwerisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Odoodee",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinuku",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kakabe",
    "type": "living",
    "scope": "individual",
    "iso6393": "kke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalaktang Monpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mabaka Valley Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khün",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kagulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kako",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kokota",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kosarek Yale",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kiong",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kon Keu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karko",
    "type": "living",
    "scope": "individual",
    "iso6393": "kko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gugubera",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaiku",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kir-Balar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Giiwo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tumi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kangean",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teke-Kukuya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kohin",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guguyimidjir",
    "type": "living",
    "scope": "individual",
    "iso6393": "kky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaska",
    "type": "living",
    "scope": "individual",
    "iso6393": "kkz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Klamath-Modoc",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kiliwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "klb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kolbila",
    "type": "living",
    "scope": "individual",
    "iso6393": "klc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gamilaraay",
    "type": "living",
    "scope": "individual",
    "iso6393": "kld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kulung (Nepal)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kendeje",
    "type": "living",
    "scope": "individual",
    "iso6393": "klf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tagakaulo",
    "type": "living",
    "scope": "individual",
    "iso6393": "klg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Weliki",
    "type": "living",
    "scope": "individual",
    "iso6393": "klh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalumpang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Turkic Khalaj",
    "type": "living",
    "scope": "individual",
    "iso6393": "klj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kono (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "klk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kagan Kalagan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Migum",
    "type": "living",
    "scope": "individual",
    "iso6393": "klm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalenjin",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kapya",
    "type": "living",
    "scope": "individual",
    "iso6393": "klo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "klp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rumu",
    "type": "living",
    "scope": "individual",
    "iso6393": "klq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khaling",
    "type": "living",
    "scope": "individual",
    "iso6393": "klr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalasha",
    "type": "living",
    "scope": "individual",
    "iso6393": "kls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukna",
    "type": "living",
    "scope": "individual",
    "iso6393": "klt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Klao",
    "type": "living",
    "scope": "individual",
    "iso6393": "klu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maskelynes",
    "type": "living",
    "scope": "individual",
    "iso6393": "klv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lindu",
    "type": "living",
    "scope": "individual",
    "iso6393": "klw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koluwawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "klx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalao",
    "type": "living",
    "scope": "individual",
    "iso6393": "kly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabola",
    "type": "living",
    "scope": "individual",
    "iso6393": "klz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konni",
    "type": "living",
    "scope": "individual",
    "iso6393": "kma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kimbundu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmb",
    "iso6392B": "kmb",
    "iso6392T": "kmb",
    "iso6391": null
  },
  {
    "name": "Southern Dong",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Majukayang Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bakole",
    "type": "living",
    "scope": "individual",
    "iso6393": "kme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kare (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kâte",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalam",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kami (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumarbhag Paharia",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limos Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tanudan Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kom (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awtuw",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwoma",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gimme",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwama",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Kurdish",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamasau",
    "type": "living",
    "scope": "individual",
    "iso6393": "kms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kemtuik",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanite",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karipúna Creole French",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komo (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Waboda",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koma",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khorasani Turkish",
    "type": "living",
    "scope": "individual",
    "iso6393": "kmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dera (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lubuagan Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "knb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Kanuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "knc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konda",
    "type": "living",
    "scope": "individual",
    "iso6393": "knd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kankanaey",
    "type": "living",
    "scope": "individual",
    "iso6393": "kne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mankanya",
    "type": "living",
    "scope": "individual",
    "iso6393": "knf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanufi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Kanjobal",
    "type": "living",
    "scope": "individual",
    "iso6393": "knj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuranko",
    "type": "living",
    "scope": "individual",
    "iso6393": "knk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keninjal",
    "type": "living",
    "scope": "individual",
    "iso6393": "knl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanamarí",
    "type": "living",
    "scope": "individual",
    "iso6393": "knm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konkani (individual language)",
    "type": "living",
    "scope": "individual",
    "iso6393": "knn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kono (Sierra Leone)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwanja",
    "type": "living",
    "scope": "individual",
    "iso6393": "knp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kintaq",
    "type": "living",
    "scope": "individual",
    "iso6393": "knq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaningra",
    "type": "living",
    "scope": "individual",
    "iso6393": "knr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kensiu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panoan Katukína",
    "type": "living",
    "scope": "individual",
    "iso6393": "knt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kono (Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "knu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tabo",
    "type": "living",
    "scope": "individual",
    "iso6393": "knv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kung-Ekoka",
    "type": "living",
    "scope": "individual",
    "iso6393": "knw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kendayan",
    "type": "living",
    "scope": "individual",
    "iso6393": "knx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanyok",
    "type": "living",
    "scope": "individual",
    "iso6393": "kny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalamsé",
    "type": "living",
    "scope": "individual",
    "iso6393": "knz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konomala",
    "type": "living",
    "scope": "individual",
    "iso6393": "koa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpati",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "koc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kodi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kacipo-Balesi",
    "type": "living",
    "scope": "individual",
    "iso6393": "koe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kubi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cogui",
    "type": "living",
    "scope": "individual",
    "iso6393": "kog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "koh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komi-Permyak",
    "type": "living",
    "scope": "individual",
    "iso6393": "koi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konkani (macrolanguage)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kok",
    "iso6392B": "kok",
    "iso6392T": "kok",
    "iso6391": null
  },
  {
    "name": "Kol (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komi",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kom",
    "iso6392B": "kom",
    "iso6392T": "kom",
    "iso6391": "kv"
  },
  {
    "name": "Kongo",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kon",
    "iso6392B": "kon",
    "iso6392T": "kon",
    "iso6391": "kg"
  },
  {
    "name": "Konzo",
    "type": "living",
    "scope": "individual",
    "iso6393": "koo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Waube",
    "type": "living",
    "scope": "individual",
    "iso6393": "kop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kota (Gabon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "koq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korean",
    "type": "living",
    "scope": "individual",
    "iso6393": "kor",
    "iso6392B": "kor",
    "iso6392T": "kor",
    "iso6391": "ko"
  },
  {
    "name": "Kosraean",
    "type": "living",
    "scope": "individual",
    "iso6393": "kos",
    "iso6392B": "kos",
    "iso6392T": "kos",
    "iso6391": null
  },
  {
    "name": "Lagwan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koke",
    "type": "living",
    "scope": "individual",
    "iso6393": "kou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kudu-Camo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kugama",
    "type": "living",
    "scope": "individual",
    "iso6393": "kow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koyukon",
    "type": "living",
    "scope": "individual",
    "iso6393": "koy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korak",
    "type": "living",
    "scope": "individual",
    "iso6393": "koz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kutto",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mullu Kurumba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Curripaco",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpelle",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kpe",
    "iso6392B": "kpe",
    "iso6392T": "kpe",
    "iso6391": null
  },
  {
    "name": "Komba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kapingamarangi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kplang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kph",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kofei",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karajá",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpala",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koho",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kepkiriwát",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikposo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korupun-Sela",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korafe-Yegha",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tehit",
    "type": "living",
    "scope": "individual",
    "iso6393": "kps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karata",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kafoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komi-Zyrian",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kobon",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mountain Koiali",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koryak",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kupsabiny",
    "type": "living",
    "scope": "individual",
    "iso6393": "kpz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mum",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kovai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Doromu-Koki",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koy Sanjaq Surat",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalagan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kakabai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khe",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kisankasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koitabu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koromira",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kotafon Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kyenele",
    "type": "living",
    "scope": "individual",
    "iso6393": "kql",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaonde",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Krahn",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kimré",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krenak",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kimaragang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Kissi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Klias River Kadazan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Seroa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kqu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okolod",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kandas",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mser",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koorete",
    "type": "living",
    "scope": "individual",
    "iso6393": "kqy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korana",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kqz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumhali",
    "type": "living",
    "scope": "individual",
    "iso6393": "kra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karkin",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "krb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karachay-Balkar",
    "type": "living",
    "scope": "individual",
    "iso6393": "krc",
    "iso6392B": "krc",
    "iso6392T": "krc",
    "iso6391": null
  },
  {
    "name": "Kairui-Midiki",
    "type": "living",
    "scope": "individual",
    "iso6393": "krd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panará",
    "type": "living",
    "scope": "individual",
    "iso6393": "kre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koro (Vanuatu)",
    "type": "living",
    "scope": "individual",
    "iso6393": "krf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurama",
    "type": "living",
    "scope": "individual",
    "iso6393": "krh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krio",
    "type": "living",
    "scope": "individual",
    "iso6393": "kri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinaray-A",
    "type": "living",
    "scope": "individual",
    "iso6393": "krj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kerek",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "krk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karelian",
    "type": "living",
    "scope": "individual",
    "iso6393": "krl",
    "iso6392B": "krl",
    "iso6392T": "krl",
    "iso6391": null
  },
  {
    "name": "Krim",
    "type": "living",
    "scope": "individual",
    "iso6393": "krm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sapo",
    "type": "living",
    "scope": "individual",
    "iso6393": "krn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korop",
    "type": "living",
    "scope": "individual",
    "iso6393": "krp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kru'ng 2",
    "type": "living",
    "scope": "individual",
    "iso6393": "krr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gbaya (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "krs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tumari Kanuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "krt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurukh",
    "type": "living",
    "scope": "individual",
    "iso6393": "kru",
    "iso6392B": "kru",
    "iso6392T": "kru",
    "iso6391": null
  },
  {
    "name": "Kavet",
    "type": "living",
    "scope": "individual",
    "iso6393": "krv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Krahn",
    "type": "living",
    "scope": "individual",
    "iso6393": "krw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karon",
    "type": "living",
    "scope": "individual",
    "iso6393": "krx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kryts",
    "type": "living",
    "scope": "individual",
    "iso6393": "kry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sota Kanum",
    "type": "living",
    "scope": "individual",
    "iso6393": "krz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shuwa-Zamani",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shambala",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuanua",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuni",
    "type": "living",
    "scope": "individual",
    "iso6393": "kse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bafia",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kusaghe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kölsch",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uare",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kansa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumalu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumba",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kasiguranin",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kofa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwaami",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Borong",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Kisi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Winyé",
    "type": "living",
    "scope": "individual",
    "iso6393": "kst",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khamyang",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kusu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "S'gaw Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kedang",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kharia Thar",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kodaku",
    "type": "living",
    "scope": "individual",
    "iso6393": "ksz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Katua",
    "type": "living",
    "scope": "individual",
    "iso6393": "kta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kambaata",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kholok",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kokata",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nubri",
    "type": "living",
    "scope": "individual",
    "iso6393": "kte",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwami",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalkutung",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ktg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Muyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Plapo Krumen",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaniet",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ktk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koroshi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurti",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karitiâna",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuot",
    "type": "living",
    "scope": "individual",
    "iso6393": "kto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaduo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Katabaga",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ktq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Muyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ketum",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kituba (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Katu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kato",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ktw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaxararí",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kango (Bas-Uélé District)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ju/'hoan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ktz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuanyama",
    "type": "living",
    "scope": "individual",
    "iso6393": "kua",
    "iso6392B": "kua",
    "iso6392T": "kua",
    "iso6391": "kj"
  },
  {
    "name": "Kutep",
    "type": "living",
    "scope": "individual",
    "iso6393": "kub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwinsu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "'Auhelawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuman (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Katu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kupa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kushi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuikúro-Kalapálo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuria",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kepo'",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kulere",
    "type": "living",
    "scope": "individual",
    "iso6393": "kul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumyk",
    "type": "living",
    "scope": "individual",
    "iso6393": "kum",
    "iso6392B": "kum",
    "iso6392T": "kum",
    "iso6391": null
  },
  {
    "name": "Kunama",
    "type": "living",
    "scope": "individual",
    "iso6393": "kun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kumukio",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunimaipa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karipuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kurdish",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "kur",
    "iso6392B": "kur",
    "iso6392T": "kur",
    "iso6391": "ku"
  },
  {
    "name": "Kusaal",
    "type": "living",
    "scope": "individual",
    "iso6393": "kus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kutenai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kut",
    "iso6392B": "kut",
    "iso6392T": "kut",
    "iso6391": null
  },
  {
    "name": "Upper Kuskokwim",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kur",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpagua",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kukatja",
    "type": "living",
    "scope": "individual",
    "iso6393": "kux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuuku-Ya'u",
    "type": "living",
    "scope": "individual",
    "iso6393": "kuy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunza",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kuz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bagvalal",
    "type": "living",
    "scope": "individual",
    "iso6393": "kva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kubu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kove",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kui (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalabakan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabalai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuni-Boazi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komodo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Psikye",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Korean Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayaw",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kendem",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Border Kuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dobel",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kompane",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Geba Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kerinci",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahta Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yinbaw Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kola",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wersing",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parkari Koli",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yintale Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tsakwambo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kvz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dâw",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Likwala",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwaio",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwerba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwara'ae",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sara Kaba Deme",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kowiai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Awa-Cuaiquer",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwakiutl",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kofyar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwambi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwangali",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwomtari",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kodia",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwer",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwese",
    "type": "living",
    "scope": "individual",
    "iso6393": "kws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwesten",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwakum",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sara Kaba Náà",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwinti",
    "type": "living",
    "scope": "individual",
    "iso6393": "kww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khirwar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Salvador Kongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kwy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwadi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kwz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kairiru",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krobu",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konso",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brunei",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manumanaw Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karo (Ethiopia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keningau Murut",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kulfa",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zayein Karen",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nepali Kurux",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Khmer",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanowit-Tanjong Melanau",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kanoé",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kxo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wadiyara Koli",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Smärky Kanum",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koro (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kangjia",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koiwat",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kui (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuvi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Likuba",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayong",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kerewo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kxz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Butbut Kalinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kyaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karey",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Krache",
    "type": "living",
    "scope": "individual",
    "iso6393": "kye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kouya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Keyagana",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karok",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kiput",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karao",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalapuya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpatili",
    "type": "living",
    "scope": "individual",
    "iso6393": "kym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Binukidnon",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kelon",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuruáya",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baram Kayan",
    "type": "living",
    "scope": "individual",
    "iso6393": "kys",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayagar",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Kayah",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayort",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kudmali",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rapoisi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kambaira",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayabí",
    "type": "living",
    "scope": "individual",
    "iso6393": "kyz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Karaboro",
    "type": "living",
    "scope": "individual",
    "iso6393": "kza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaibobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bondoukou Kulango",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kadai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kosena",
    "type": "living",
    "scope": "individual",
    "iso6393": "kze",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Da'a Kaili",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kikai",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kelabit",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kazukuru",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kzk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayeli",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kais",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kokola",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaningi",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaidipang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaike",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karang",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sugut Dusun",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayupulau",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Komyandaret",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karirí-Xocó",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "kzw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kamarian",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kango (Tshopo District)",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalabra",
    "type": "living",
    "scope": "individual",
    "iso6393": "kzz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Subanen",
    "type": "living",
    "scope": "individual",
    "iso6393": "laa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Linear A",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "lab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lacandon",
    "type": "living",
    "scope": "individual",
    "iso6393": "lac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ladino",
    "type": "living",
    "scope": "individual",
    "iso6393": "lad",
    "iso6392B": "lad",
    "iso6392T": "lad",
    "iso6391": null
  },
  {
    "name": "Pattani",
    "type": "living",
    "scope": "individual",
    "iso6393": "lae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lafofa",
    "type": "living",
    "scope": "individual",
    "iso6393": "laf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Langi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahnda",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "lah",
    "iso6392B": "lah",
    "iso6392T": "lah",
    "iso6391": null
  },
  {
    "name": "Lambya",
    "type": "living",
    "scope": "individual",
    "iso6393": "lai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lango (Uganda)",
    "type": "living",
    "scope": "individual",
    "iso6393": "laj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laka (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lalia",
    "type": "living",
    "scope": "individual",
    "iso6393": "lal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lam",
    "iso6392B": "lam",
    "iso6392T": "lam",
    "iso6391": null
  },
  {
    "name": "Laru",
    "type": "living",
    "scope": "individual",
    "iso6393": "lan",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lao",
    "type": "living",
    "scope": "individual",
    "iso6393": "lao",
    "iso6392B": "lao",
    "iso6392T": "lao",
    "iso6391": "lo"
  },
  {
    "name": "Laka (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lap",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Qabiao",
    "type": "living",
    "scope": "individual",
    "iso6393": "laq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Larteh",
    "type": "living",
    "scope": "individual",
    "iso6393": "lar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lama (Togo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "las",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latin",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "lat",
    "iso6392B": "lat",
    "iso6392T": "lat",
    "iso6391": "la"
  },
  {
    "name": "Laba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latvian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "lav",
    "iso6392B": "lav",
    "iso6392T": "lav",
    "iso6391": "lv"
  },
  {
    "name": "Lauje",
    "type": "living",
    "scope": "individual",
    "iso6393": "law",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lama Bai",
    "type": "living",
    "scope": "individual",
    "iso6393": "lay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aribwatsa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "laz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lui",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Label",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakkia",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lak",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tinani",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laopang",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "La'bi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ladakhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Bontok",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Libon Bikol",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lodhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamet",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laven",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wampar",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lohorung",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Libyan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Labu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lavatbura-Lamusong",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tolaki",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lawangan",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamu-Lamu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lardil",
    "type": "living",
    "scope": "individual",
    "iso6393": "lbz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Legenyem",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lola",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loncong",
    "type": "living",
    "scope": "individual",
    "iso6393": "lce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lubu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luchazi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lisela",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tungag",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Lawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luhu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lisabata-Nuniali",
    "type": "living",
    "scope": "individual",
    "iso6393": "lcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kla-Dan",
    "type": "living",
    "scope": "individual",
    "iso6393": "lda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dũya",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luri",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lenyima",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamja-Dengsa-Tola",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laari",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lemoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leelau",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kaan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Landoma",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Láadan",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "ldn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tso",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lufu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ldq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lega-Shabunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "lea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lala-Bisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "leb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leco",
    "type": "living",
    "scope": "individual",
    "iso6393": "lec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lendu",
    "type": "living",
    "scope": "individual",
    "iso6393": "led",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lyélé",
    "type": "living",
    "scope": "individual",
    "iso6393": "lee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lelemi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lenje",
    "type": "living",
    "scope": "individual",
    "iso6393": "leh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lemio",
    "type": "living",
    "scope": "individual",
    "iso6393": "lei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lengola",
    "type": "living",
    "scope": "individual",
    "iso6393": "lej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leipon",
    "type": "living",
    "scope": "individual",
    "iso6393": "lek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lele (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nomaande",
    "type": "living",
    "scope": "individual",
    "iso6393": "lem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lenca",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "len",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leti (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "leo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lepcha",
    "type": "living",
    "scope": "individual",
    "iso6393": "lep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lembena",
    "type": "living",
    "scope": "individual",
    "iso6393": "leq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lenkau",
    "type": "living",
    "scope": "individual",
    "iso6393": "ler",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lese",
    "type": "living",
    "scope": "individual",
    "iso6393": "les",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lesing-Gelimi",
    "type": "living",
    "scope": "individual",
    "iso6393": "let",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kara (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "leu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamma",
    "type": "living",
    "scope": "individual",
    "iso6393": "lev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ledo Kaili",
    "type": "living",
    "scope": "individual",
    "iso6393": "lew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luang",
    "type": "living",
    "scope": "individual",
    "iso6393": "lex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lemolang",
    "type": "living",
    "scope": "individual",
    "iso6393": "ley",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lezghian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lez",
    "iso6392B": "lez",
    "iso6392T": "lez",
    "iso6391": null
  },
  {
    "name": "Lefa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lingua Franca Nova",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "lfn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lungga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laghu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lugbara",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laghuu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lengilu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lingarak",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wala",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lega-Mwenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Opuuo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Logba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pahi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Longgu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ligenza",
    "type": "living",
    "scope": "individual",
    "iso6393": "lgz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laha (Viet Nam)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laha (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahu Shi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahul Lohar",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lhomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahanan",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lhokpu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mlahsö",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lhs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lo-Toga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lahu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lhu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West-Central Limba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Likum",
    "type": "living",
    "scope": "individual",
    "iso6393": "lib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hlai",
    "type": "living",
    "scope": "individual",
    "iso6393": "lic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyindrou",
    "type": "living",
    "scope": "individual",
    "iso6393": "lid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Likila",
    "type": "living",
    "scope": "individual",
    "iso6393": "lie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ligbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lihir",
    "type": "living",
    "scope": "individual",
    "iso6393": "lih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ligurian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lika",
    "type": "living",
    "scope": "individual",
    "iso6393": "lik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lillooet",
    "type": "living",
    "scope": "individual",
    "iso6393": "lil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limburgan",
    "type": "living",
    "scope": "individual",
    "iso6393": "lim",
    "iso6392B": "lim",
    "iso6392T": "lim",
    "iso6391": "li"
  },
  {
    "name": "Lingala",
    "type": "living",
    "scope": "individual",
    "iso6393": "lin",
    "iso6392B": "lin",
    "iso6392T": "lin",
    "iso6391": "ln"
  },
  {
    "name": "Liki",
    "type": "living",
    "scope": "individual",
    "iso6393": "lio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sekpele",
    "type": "living",
    "scope": "individual",
    "iso6393": "lip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Libido",
    "type": "living",
    "scope": "individual",
    "iso6393": "liq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Liberian English",
    "type": "living",
    "scope": "individual",
    "iso6393": "lir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lithuanian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lit",
    "iso6392B": "lit",
    "iso6392T": "lit",
    "iso6391": "lt"
  },
  {
    "name": "Logorik",
    "type": "living",
    "scope": "individual",
    "iso6393": "liu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Liv",
    "type": "living",
    "scope": "individual",
    "iso6393": "liv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Col",
    "type": "living",
    "scope": "individual",
    "iso6393": "liw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Liabuku",
    "type": "living",
    "scope": "individual",
    "iso6393": "lix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Banda-Bambari",
    "type": "living",
    "scope": "individual",
    "iso6393": "liy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Libinza",
    "type": "living",
    "scope": "individual",
    "iso6393": "liz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Golpa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rampi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laiyolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Li'o",
    "type": "living",
    "scope": "individual",
    "iso6393": "ljl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lampung Api",
    "type": "living",
    "scope": "individual",
    "iso6393": "ljp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yirandali",
    "type": "living",
    "scope": "individual",
    "iso6393": "ljw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yuru",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ljx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakalei",
    "type": "living",
    "scope": "individual",
    "iso6393": "lka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabras",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kucong",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakondê",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kenyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laki",
    "type": "living",
    "scope": "individual",
    "iso6393": "lki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Remun",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laeko-Libuat",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kalaamaya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakon",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Päri",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lakota",
    "type": "living",
    "scope": "individual",
    "iso6393": "lkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kungkari",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lokoya",
    "type": "living",
    "scope": "individual",
    "iso6393": "lky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lala-Roba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "llb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lele (Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "llc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ladin",
    "type": "living",
    "scope": "individual",
    "iso6393": "lld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lele (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hermit",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "llf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lole",
    "type": "living",
    "scope": "individual",
    "iso6393": "llg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "llh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teke-Laali",
    "type": "living",
    "scope": "individual",
    "iso6393": "lli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ladji Ladji",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "llj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lelak",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "llk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lilau",
    "type": "living",
    "scope": "individual",
    "iso6393": "lll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lasalimu",
    "type": "living",
    "scope": "individual",
    "iso6393": "llm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lele (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khlor",
    "type": "living",
    "scope": "individual",
    "iso6393": "llo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Efate",
    "type": "living",
    "scope": "individual",
    "iso6393": "llp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lolak",
    "type": "living",
    "scope": "individual",
    "iso6393": "llq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lithuanian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lau",
    "type": "living",
    "scope": "individual",
    "iso6393": "llu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lauan",
    "type": "living",
    "scope": "individual",
    "iso6393": "llx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Limba",
    "type": "living",
    "scope": "individual",
    "iso6393": "lma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Merei",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limilngan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lumun",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pévé",
    "type": "living",
    "scope": "individual",
    "iso6393": "lme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Lembata",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamogai",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lambichhong",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lombi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Lembata",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamkang",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hano",
    "type": "living",
    "scope": "individual",
    "iso6393": "lml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lambadi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lombard",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Limbum",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamatuka",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamalera",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamenu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lomaiviti",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lake Miwok",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laimbue",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamboya",
    "type": "living",
    "scope": "individual",
    "iso6393": "lmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lumbee",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Langbashe",
    "type": "living",
    "scope": "individual",
    "iso6393": "lna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbalanhu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lundayeh",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Langobardic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "lng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lanoh",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Daantanai'",
    "type": "living",
    "scope": "individual",
    "iso6393": "lni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leningitij",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Central Banda",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Langam",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lorediakarkar",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lango (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lamnso'",
    "type": "living",
    "scope": "individual",
    "iso6393": "lns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Longuda",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lanima",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lonzo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loloda",
    "type": "living",
    "scope": "individual",
    "iso6393": "loa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lobi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lob",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inonhan",
    "type": "living",
    "scope": "individual",
    "iso6393": "loc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Saluan",
    "type": "living",
    "scope": "individual",
    "iso6393": "loe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Logol",
    "type": "living",
    "scope": "individual",
    "iso6393": "lof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Logo",
    "type": "living",
    "scope": "individual",
    "iso6393": "log",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narim",
    "type": "living",
    "scope": "individual",
    "iso6393": "loh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loma (Côte d'Ivoire)",
    "type": "living",
    "scope": "individual",
    "iso6393": "loi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lou",
    "type": "living",
    "scope": "individual",
    "iso6393": "loj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loko",
    "type": "living",
    "scope": "individual",
    "iso6393": "lok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lol",
    "iso6392B": "lol",
    "iso6392T": "lol",
    "iso6391": null
  },
  {
    "name": "Loma (Liberia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malawi Lomwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "lon",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lombo",
    "type": "living",
    "scope": "individual",
    "iso6393": "loo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lopa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lobala",
    "type": "living",
    "scope": "individual",
    "iso6393": "loq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Téén",
    "type": "living",
    "scope": "individual",
    "iso6393": "lor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loniu",
    "type": "living",
    "scope": "individual",
    "iso6393": "los",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Otuho",
    "type": "living",
    "scope": "individual",
    "iso6393": "lot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Louisiana Creole",
    "type": "living",
    "scope": "individual",
    "iso6393": "lou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lopi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tampias Lobu",
    "type": "living",
    "scope": "individual",
    "iso6393": "low",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loun",
    "type": "living",
    "scope": "individual",
    "iso6393": "lox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loke",
    "type": "living",
    "scope": "individual",
    "iso6393": "loy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lozi",
    "type": "living",
    "scope": "individual",
    "iso6393": "loz",
    "iso6392B": "loz",
    "iso6392T": "loz",
    "iso6391": null
  },
  {
    "name": "Lelepa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lepki",
    "type": "living",
    "scope": "individual",
    "iso6393": "lpe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Long Phuri Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lipo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lopit",
    "type": "living",
    "scope": "individual",
    "iso6393": "lpx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rara Bakati'",
    "type": "living",
    "scope": "individual",
    "iso6393": "lra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Luri",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laurentian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laragia",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "lrg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Loarki",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lari",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marama",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lorang",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laro",
    "type": "living",
    "scope": "individual",
    "iso6393": "lro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Yamphu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Larantuka Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Larevat",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lemerig",
    "type": "living",
    "scope": "individual",
    "iso6393": "lrz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lasgerdi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lishana Deni",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lusengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lyons Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lish",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lashi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latvian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Saamia",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laos Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panamanian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aruop",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lasi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Trinidad and Tobago Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lst",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mauritian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "lsy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Late Middle Chinese",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ltc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latgalian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ltg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leti (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "lti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latundê",
    "type": "living",
    "scope": "individual",
    "iso6393": "ltn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tsotso",
    "type": "living",
    "scope": "individual",
    "iso6393": "lto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tachoni",
    "type": "living",
    "scope": "individual",
    "iso6393": "lts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Latu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ltu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luxembourgish",
    "type": "living",
    "scope": "individual",
    "iso6393": "ltz",
    "iso6392B": "ltz",
    "iso6392T": "ltz",
    "iso6391": "lb"
  },
  {
    "name": "Luba-Lulua",
    "type": "living",
    "scope": "individual",
    "iso6393": "lua",
    "iso6392B": "lua",
    "iso6392T": "lua",
    "iso6391": null
  },
  {
    "name": "Luba-Katanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lub",
    "iso6392B": "lub",
    "iso6392T": "lub",
    "iso6391": "lu"
  },
  {
    "name": "Aringa",
    "type": "living",
    "scope": "individual",
    "iso6393": "luc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ludian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luvale",
    "type": "living",
    "scope": "individual",
    "iso6393": "lue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laua",
    "type": "living",
    "scope": "individual",
    "iso6393": "luf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ganda",
    "type": "living",
    "scope": "individual",
    "iso6393": "lug",
    "iso6392B": "lug",
    "iso6392T": "lug",
    "iso6391": "lg"
  },
  {
    "name": "Luiseno",
    "type": "living",
    "scope": "individual",
    "iso6393": "lui",
    "iso6392B": "lui",
    "iso6392T": "lui",
    "iso6391": null
  },
  {
    "name": "Luna",
    "type": "living",
    "scope": "individual",
    "iso6393": "luj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lunanakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "luk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olu'bo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luimbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "lun",
    "iso6392B": "lun",
    "iso6392T": "lun",
    "iso6391": null
  },
  {
    "name": "Luo (Kenya and Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "luo",
    "iso6392B": "luo",
    "iso6392T": "luo",
    "iso6391": null
  },
  {
    "name": "Lumbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lucumi",
    "type": "living",
    "scope": "individual",
    "iso6393": "luq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laura",
    "type": "living",
    "scope": "individual",
    "iso6393": "lur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lushai",
    "type": "living",
    "scope": "individual",
    "iso6393": "lus",
    "iso6392B": "lus",
    "iso6392T": "lus",
    "iso6391": null
  },
  {
    "name": "Lushootseed",
    "type": "living",
    "scope": "individual",
    "iso6393": "lut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lumba-Yakkha",
    "type": "living",
    "scope": "individual",
    "iso6393": "luu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luwati",
    "type": "living",
    "scope": "individual",
    "iso6393": "luv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luo (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "luw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luyia",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "luy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Luri",
    "type": "living",
    "scope": "individual",
    "iso6393": "luz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maku'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "lva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lavukaleve",
    "type": "living",
    "scope": "individual",
    "iso6393": "lvk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Standard Latvian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lvs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Levuka",
    "type": "living",
    "scope": "individual",
    "iso6393": "lvu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lwalu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lewo Eleng",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "White Lachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Lawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laomian",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luwo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lewotobi",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lawu",
    "type": "living",
    "scope": "individual",
    "iso6393": "lwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lewo",
    "type": "living",
    "scope": "individual",
    "iso6393": "lww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Layakha",
    "type": "living",
    "scope": "individual",
    "iso6393": "lya",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lyngngam",
    "type": "living",
    "scope": "individual",
    "iso6393": "lyg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Luyana",
    "type": "living",
    "scope": "individual",
    "iso6393": "lyn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Literary Chinese",
    "type": "historical",
    "scope": "individual",
    "iso6393": "lzh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Litzlitz",
    "type": "living",
    "scope": "individual",
    "iso6393": "lzl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Leinong Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "lzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Laz",
    "type": "living",
    "scope": "individual",
    "iso6393": "lzz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Jerónimo Tecóatl Mazatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "maa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yutanduchi Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Madurese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mad",
    "iso6392B": "mad",
    "iso6392T": "mad",
    "iso6391": null
  },
  {
    "name": "Bo-Rukul",
    "type": "living",
    "scope": "individual",
    "iso6393": "mae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mafa",
    "type": "living",
    "scope": "individual",
    "iso6393": "maf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Magahi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mag",
    "iso6392B": "mag",
    "iso6392T": "mag",
    "iso6391": null
  },
  {
    "name": "Marshallese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mah",
    "iso6392B": "mah",
    "iso6392T": "mah",
    "iso6391": "mh"
  },
  {
    "name": "Maithili",
    "type": "living",
    "scope": "individual",
    "iso6393": "mai",
    "iso6392B": "mai",
    "iso6392T": "mai",
    "iso6391": null
  },
  {
    "name": "Jalapa De Díaz Mazatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "maj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makasar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mak",
    "iso6392B": "mak",
    "iso6392T": "mak",
    "iso6391": null
  },
  {
    "name": "Malayalam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mal",
    "iso6392B": "mal",
    "iso6392T": "mal",
    "iso6391": "ml"
  },
  {
    "name": "Mam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandingo",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "man",
    "iso6392B": "man",
    "iso6392T": "man",
    "iso6391": null
  },
  {
    "name": "Chiquihuitlán Mazatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "maq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marathi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mar",
    "iso6392B": "mar",
    "iso6392T": "mar",
    "iso6391": "mr"
  },
  {
    "name": "Masai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mas",
    "iso6392B": "mas",
    "iso6392T": "mas",
    "iso6391": null
  },
  {
    "name": "San Francisco Matlatzinca",
    "type": "living",
    "scope": "individual",
    "iso6393": "mat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huautla Mazatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mau",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sateré-Mawé",
    "type": "living",
    "scope": "individual",
    "iso6393": "mav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mampruli",
    "type": "living",
    "scope": "individual",
    "iso6393": "maw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Moluccan Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "max",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Mazahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "maz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Higaonon",
    "type": "living",
    "scope": "individual",
    "iso6393": "mba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Bukidnon Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macushi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dibabawon Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Molale",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Baba Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangseng",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ilianen Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nadëb",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malol",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maxakalí",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ombamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macaguán",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbo (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maisin",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukak Makú",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sarangani Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matigsalug Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbula-Bwazza",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbulungish",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maring",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mari (East Sepik Province)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Memoni",
    "type": "living",
    "scope": "individual",
    "iso6393": "mby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Amoltepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mbz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maca",
    "type": "living",
    "scope": "individual",
    "iso6393": "mca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Machiguenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bitur",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sharanahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Itundujia Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matsés",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapoyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maquiritari",
    "type": "living",
    "scope": "individual",
    "iso6393": "mch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mvanip",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "mck",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macaguaje",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malaccan Creole Portuguese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masana",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coatlán Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makaa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Menya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mambai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mengisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cameroon Mambila",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minanibai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mawa (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpiemo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Watut",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mawan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mcz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mada (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morigi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Male (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbum",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maba (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mde",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moksha",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdf",
    "iso6392B": "mdf",
    "iso6392T": "mdf",
    "iso6391": null
  },
  {
    "name": "Massalat",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maguindanaon",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamvu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangbetu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangbutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maltese Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mayogo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbati",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbala",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbole",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdr",
    "iso6392B": "mdr",
    "iso6392T": "mdr",
    "iso6391": null
  },
  {
    "name": "Maria (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mds",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbere",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mboko",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa Lucía Monteverde Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbosi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dizin",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Male (Ethiopia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Suruí Do Pará",
    "type": "living",
    "scope": "individual",
    "iso6393": "mdz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Menka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikobi",
    "type": "living",
    "scope": "individual",
    "iso6393": "meb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mara",
    "type": "living",
    "scope": "individual",
    "iso6393": "mec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Melpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "med",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mengen",
    "type": "living",
    "scope": "individual",
    "iso6393": "mee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Megam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Tlaxiaco Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "meh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Midob",
    "type": "living",
    "scope": "individual",
    "iso6393": "mei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Meyah",
    "type": "living",
    "scope": "individual",
    "iso6393": "mej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mekeo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Melanau",
    "type": "living",
    "scope": "individual",
    "iso6393": "mel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangala",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mende (Sierra Leone)",
    "type": "living",
    "scope": "individual",
    "iso6393": "men",
    "iso6392B": "men",
    "iso6392T": "men",
    "iso6391": null
  },
  {
    "name": "Kedah Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "meo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miriwung",
    "type": "living",
    "scope": "individual",
    "iso6393": "mep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Merey",
    "type": "living",
    "scope": "individual",
    "iso6393": "meq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Meru",
    "type": "living",
    "scope": "individual",
    "iso6393": "mer",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masmaje",
    "type": "living",
    "scope": "individual",
    "iso6393": "mes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mato",
    "type": "living",
    "scope": "individual",
    "iso6393": "met",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Motu",
    "type": "living",
    "scope": "individual",
    "iso6393": "meu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mano",
    "type": "living",
    "scope": "individual",
    "iso6393": "mev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mew",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hassaniyya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mey",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Menominee",
    "type": "living",
    "scope": "individual",
    "iso6393": "mez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pattani Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bangka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mendankwe-Nkwen",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morisyen",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naki",
    "type": "living",
    "scope": "individual",
    "iso6393": "mff",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mogofin",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matal",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wandala",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mefele",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Mofu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Putai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marghi South",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cross River Mbembe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makassar Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marithiel",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mexican Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mokerang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mft",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbwela",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandjak",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mulaha",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mfw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Melo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mayo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mabaan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mfz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Irish (900-1200)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "mga",
    "iso6392B": "mga",
    "iso6392T": "mga",
    "iso6391": null
  },
  {
    "name": "Mararit",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morokodo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moru",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mango",
    "type": "living",
    "scope": "individual",
    "iso6393": "mge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maklew",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpumpong",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makhuwa-Meetto",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lijili",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abureni",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mawes",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maleu-Kilenge",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mambae",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbangi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Meta'",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Magar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malila",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mambwe-Lungu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manda (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongol",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mailu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matumbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbunga",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbugwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mgz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manda (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mahongwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mocho",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbugu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Besisi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamaa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Margu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ma'di",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mogholi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mungaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mauwake",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makhuwa-Moniga",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mócheno",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mashi (Zambia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Balinese Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Mari",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Buru (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandahuaca",
    "type": "living",
    "scope": "individual",
    "iso6393": "mht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Digaro-Mishmi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbukushu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maru",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ma'anyan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mor (Mor Islands)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mhz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miami",
    "type": "living",
    "scope": "individual",
    "iso6393": "mia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atatláhuca Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mi'kmaq",
    "type": "living",
    "scope": "individual",
    "iso6393": "mic",
    "iso6392B": "mic",
    "iso6392T": "mic",
    "iso6391": null
  },
  {
    "name": "Mandaic",
    "type": "living",
    "scope": "individual",
    "iso6393": "mid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ocotepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mofu-Gudur",
    "type": "living",
    "scope": "individual",
    "iso6393": "mif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Miguel El Grande Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chayuco Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chigmecatitlán Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Abar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mikasuki",
    "type": "living",
    "scope": "individual",
    "iso6393": "mik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Peñoles Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Alacatlatzala Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minangkabau",
    "type": "living",
    "scope": "individual",
    "iso6393": "min",
    "iso6392B": "min",
    "iso6392T": "min",
    "iso6391": null
  },
  {
    "name": "Pinotepa Nacional Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Apasco-Apoala Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mískito",
    "type": "living",
    "scope": "individual",
    "iso6393": "miq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isthmus Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uncoded languages",
    "type": "special",
    "scope": "special",
    "iso6393": "mis",
    "iso6392B": "mis",
    "iso6392T": "mis",
    "iso6391": null
  },
  {
    "name": "Southern Puebla Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cacaloxtepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "miu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akoye",
    "type": "living",
    "scope": "individual",
    "iso6393": "miw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mixtepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayutla Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "miy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coatzospan Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "miz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makalero",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Juan Colorado Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwest Maidu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muskum",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mje",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mwera (Nyasa)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kim Mun",
    "type": "living",
    "scope": "individual",
    "iso6393": "mji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mawak",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matukar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandeali",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Medebur",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ma (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malankuravan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malapandaram",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malaryan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mjq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malavedan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miship",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sauria Paharia",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manna-Dora",
    "type": "living",
    "scope": "individual",
    "iso6393": "mju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mannan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Karbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mahali",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mahican",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mjy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Majhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mjz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbre",
    "type": "living",
    "scope": "individual",
    "iso6393": "mka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mal Paharia",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siliput",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macedonian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkd",
    "iso6392B": "mac",
    "iso6392T": "mkd",
    "iso6391": "mk"
  },
  {
    "name": "Mawchi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mak (China)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhatki",
    "type": "living",
    "scope": "individual",
    "iso6393": "mki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mokilese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Byep",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mokole",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moklen",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kupang Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mingang Doso",
    "type": "living",
    "scope": "individual",
    "iso6393": "mko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moikodi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bay Miwok",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mkq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malas",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Silacayoapan Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vamale",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konyanka Maninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mafea",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kituba (Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kinamiging Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Makian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mky",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makasae",
    "type": "living",
    "scope": "individual",
    "iso6393": "mkz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbule",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cao Lan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manambu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mal",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malagasy",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "mlg",
    "iso6392B": "mlg",
    "iso6392T": "mlg",
    "iso6391": "mg"
  },
  {
    "name": "Mape",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malimpung",
    "type": "living",
    "scope": "individual",
    "iso6393": "mli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miltu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ilwana",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malua Bay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mulam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malango",
    "type": "living",
    "scope": "individual",
    "iso6393": "mln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mlomp",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bargam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Maninkakan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vame",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masalit",
    "type": "living",
    "scope": "individual",
    "iso6393": "mls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maltese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlt",
    "iso6392B": "mlt",
    "iso6392T": "mlt",
    "iso6391": "mt"
  },
  {
    "name": "To'abaita",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Motlav",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moloko",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malfaxal",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malaynon",
    "type": "living",
    "scope": "individual",
    "iso6393": "mlz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mama",
    "type": "living",
    "scope": "individual",
    "iso6393": "mma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Momina",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Michoacán Mazahua",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maonan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mae",
    "type": "living",
    "scope": "individual",
    "iso6393": "mme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mundat",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Ambrym",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mehináku",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Majhwar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mukha-Dora",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Man Met",
    "type": "living",
    "scope": "individual",
    "iso6393": "mml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maii",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamanwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangga Buang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Siawi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musak",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Xiangxi Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malalamai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mmaala",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miriti",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Emae",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Madak",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Migaama",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mabaale",
    "type": "living",
    "scope": "individual",
    "iso6393": "mmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbula",
    "type": "living",
    "scope": "individual",
    "iso6393": "mna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muna",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manchu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnc",
    "iso6392B": "mnc",
    "iso6392T": "mnc",
    "iso6391": null
  },
  {
    "name": "Mondé",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mundani",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Mnong",
    "type": "living",
    "scope": "individual",
    "iso6393": "mng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mono (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manipuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "mni",
    "iso6392B": "mni",
    "iso6392T": "mni",
    "iso6391": null
  },
  {
    "name": "Munji",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandinka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tiale",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapena",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Mnong",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Min Bei Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minriq",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mono (USA)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mansi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mer",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rennell-Bellona",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mon",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manikion",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manyawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moni",
    "type": "living",
    "scope": "individual",
    "iso6393": "mnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mwan",
    "type": "living",
    "scope": "individual",
    "iso6393": "moa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mocoví",
    "type": "living",
    "scope": "individual",
    "iso6393": "moc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mobilian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Montagnais",
    "type": "living",
    "scope": "individual",
    "iso6393": "moe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongondow",
    "type": "living",
    "scope": "individual",
    "iso6393": "mog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mohawk",
    "type": "living",
    "scope": "individual",
    "iso6393": "moh",
    "iso6392B": "moh",
    "iso6392T": "moh",
    "iso6391": null
  },
  {
    "name": "Mboi",
    "type": "living",
    "scope": "individual",
    "iso6393": "moi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Monzombo",
    "type": "living",
    "scope": "individual",
    "iso6393": "moj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morori",
    "type": "living",
    "scope": "individual",
    "iso6393": "mok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangue",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongolian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "mon",
    "iso6392B": "mon",
    "iso6392T": "mon",
    "iso6391": "mn"
  },
  {
    "name": "Monom",
    "type": "living",
    "scope": "individual",
    "iso6393": "moo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mopán Maya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mor (Bomberai Peninsula)",
    "type": "living",
    "scope": "individual",
    "iso6393": "moq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moro",
    "type": "living",
    "scope": "individual",
    "iso6393": "mor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mossi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mos",
    "iso6392B": "mos",
    "iso6392T": "mos",
    "iso6391": null
  },
  {
    "name": "Barí",
    "type": "living",
    "scope": "individual",
    "iso6393": "mot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mogum",
    "type": "living",
    "scope": "individual",
    "iso6393": "mou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mohave",
    "type": "living",
    "scope": "individual",
    "iso6393": "mov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moi (Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Molima",
    "type": "living",
    "scope": "individual",
    "iso6393": "mox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shekkacho",
    "type": "living",
    "scope": "individual",
    "iso6393": "moy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mukulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "moz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpoto",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mullukmulluk",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangarayi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Machinere",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Majang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maung",
    "type": "living",
    "scope": "individual",
    "iso6393": "mph",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpade",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Martu Wangka",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbara (Chad)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Watut",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yosondúa Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mindiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Migabac",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matís",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vangunu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dadibi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makuráp",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mungkip",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapidian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Misima-Panaeati",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mapia",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mpz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maba (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbuko",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangole",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matepi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Momuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kota Bangun Kutai Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tlazoyaltepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mariri",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rajah Kabunsuwan Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbelime",
    "type": "living",
    "scope": "individual",
    "iso6393": "mql",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Marquesan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moronene",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Modole",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manipa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minokok",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mander",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Makian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mok",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandari",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mosimo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murupi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamuju",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manggarai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pano",
    "type": "living",
    "scope": "individual",
    "iso6393": "mqz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mlabri",
    "type": "living",
    "scope": "individual",
    "iso6393": "mra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marino",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maricopa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Magar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Martha's Vineyard Sign Language",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Elseng",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mising",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mara Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maori",
    "type": "living",
    "scope": "individual",
    "iso6393": "mri",
    "iso6392B": "mao",
    "iso6392T": "mri",
    "iso6391": "mi"
  },
  {
    "name": "Western Mari",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmwaveke",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mortlockese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Merlav",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cheke Holo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mru",
    "type": "living",
    "scope": "individual",
    "iso6393": "mro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morouas",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Marquesan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maria (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maragus",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marghi Central",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mono (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangareva",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maranao",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maremgi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mandaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mry",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marind",
    "type": "living",
    "scope": "individual",
    "iso6393": "mrz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malay (macrolanguage)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "msa",
    "iso6392B": "may",
    "iso6392T": "msa",
    "iso6391": "ms"
  },
  {
    "name": "Masbatenyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "msb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sankaran Maninka",
    "type": "living",
    "scope": "individual",
    "iso6393": "msc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yucatec Maya Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "msd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musey",
    "type": "living",
    "scope": "individual",
    "iso6393": "mse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mekwei",
    "type": "living",
    "scope": "individual",
    "iso6393": "msf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moraid",
    "type": "living",
    "scope": "individual",
    "iso6393": "msg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masikoro Malagasy",
    "type": "living",
    "scope": "individual",
    "iso6393": "msh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sabah Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "msi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ma (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "msj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mansaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "msk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Molof",
    "type": "living",
    "scope": "individual",
    "iso6393": "msl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Agusan Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "msm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Vurës",
    "type": "living",
    "scope": "individual",
    "iso6393": "msn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mombum",
    "type": "living",
    "scope": "individual",
    "iso6393": "mso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maritsauá",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "msp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Caac",
    "type": "living",
    "scope": "individual",
    "iso6393": "msq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mongolian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "msr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Masela",
    "type": "living",
    "scope": "individual",
    "iso6393": "mss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musom",
    "type": "living",
    "scope": "individual",
    "iso6393": "msu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maslam",
    "type": "living",
    "scope": "individual",
    "iso6393": "msv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mansoanka",
    "type": "living",
    "scope": "individual",
    "iso6393": "msw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moresada",
    "type": "living",
    "scope": "individual",
    "iso6393": "msx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aruamu",
    "type": "living",
    "scope": "individual",
    "iso6393": "msy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Momare",
    "type": "living",
    "scope": "individual",
    "iso6393": "msz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Cotabato Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mta",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anyin Morofo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Munit",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mualang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mono (Solomon Islands)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mte",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murik (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Una",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Munggui",
    "type": "living",
    "scope": "individual",
    "iso6393": "mth",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maiwa (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moskona",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbe'",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Montol",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mator",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mtm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matagalpa",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mtn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Totontepec Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wichí Lhamtés Nocten",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muong",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mewari",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yora",
    "type": "living",
    "scope": "individual",
    "iso6393": "mts",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mota",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tututepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Asaro'o",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Binukidnon",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tidaá Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mtx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mundang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mubi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ajumbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "muc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mednyj Aleut",
    "type": "living",
    "scope": "individual",
    "iso6393": "mud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Media Lengua",
    "type": "living",
    "scope": "individual",
    "iso6393": "mue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musgu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mündü",
    "type": "living",
    "scope": "individual",
    "iso6393": "muh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Musi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mabire",
    "type": "living",
    "scope": "individual",
    "iso6393": "muj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mugom",
    "type": "living",
    "scope": "individual",
    "iso6393": "muk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Multiple languages",
    "type": "special",
    "scope": "special",
    "iso6393": "mul",
    "iso6392B": "mul",
    "iso6392T": "mul",
    "iso6391": null
  },
  {
    "name": "Maiwala",
    "type": "living",
    "scope": "individual",
    "iso6393": "mum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyong",
    "type": "living",
    "scope": "individual",
    "iso6393": "muo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malvi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Xiangxi Miao",
    "type": "living",
    "scope": "individual",
    "iso6393": "muq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murle",
    "type": "living",
    "scope": "individual",
    "iso6393": "mur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Creek",
    "type": "living",
    "scope": "individual",
    "iso6393": "mus",
    "iso6392B": "mus",
    "iso6392T": "mus",
    "iso6391": null
  },
  {
    "name": "Western Muria",
    "type": "living",
    "scope": "individual",
    "iso6393": "mut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yaaku",
    "type": "living",
    "scope": "individual",
    "iso6393": "muu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muthuvan",
    "type": "living",
    "scope": "individual",
    "iso6393": "muv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bo-Ung",
    "type": "living",
    "scope": "individual",
    "iso6393": "mux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muyang",
    "type": "living",
    "scope": "individual",
    "iso6393": "muy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mursi",
    "type": "living",
    "scope": "individual",
    "iso6393": "muz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manam",
    "type": "living",
    "scope": "individual",
    "iso6393": "mva",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mattole",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mvb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamboru",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marwari (Pakistan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mve",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Peripheral Mongolian",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yucuañe Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mulgi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miyako",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mekmek",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbara (Australia)",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mvl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minaveha",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marovo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duri",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moere",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marau",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Massep",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mpotovoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marfa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tagal Murut",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Machinga",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Meoswar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Indus Kohistani",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mesqan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mvz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mwatebu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Juwal",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Are",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mwera (Chimwera)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murrinh-Patha",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aiklep",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mouk-Aria",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Labo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kita Maninkakan",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mirandese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwl",
    "iso6392B": "mwl",
    "iso6392T": "mwl",
    "iso6391": null
  },
  {
    "name": "Sar",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyamwanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Maewo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kala Lagaw Ya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mün Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marwari",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "mwr",
    "iso6392B": "mwr",
    "iso6392T": "mwr",
    "iso6391": null
  },
  {
    "name": "Mwimbi-Muthambi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mws",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moken",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mittu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mwu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mentawai",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hmong Daw",
    "type": "living",
    "scope": "individual",
    "iso6393": "mww",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mediak",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mosiro",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moingi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mwz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwest Oaxaca Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tezoatlán Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manyika",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Modang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mele-Fila",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malgbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbangala",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mvuba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mozarabic",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mxi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miju-Mishmi",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Monumbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maxi Gbe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Meramera",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moi (Indonesia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mbowe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tlahuitoltepec Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Juquila Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Murik (Malaysia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huitepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jamiltepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mada (Cameroon)",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Metlatónoc Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mahou",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southeastern Nochixtlán Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Masela",
    "type": "living",
    "scope": "individual",
    "iso6393": "mxz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Burmese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mya",
    "iso6392B": "bur",
    "iso6392T": "mya",
    "iso6391": "my"
  },
  {
    "name": "Mbay",
    "type": "living",
    "scope": "individual",
    "iso6393": "myb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mayeka",
    "type": "living",
    "scope": "individual",
    "iso6393": "myc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maramba",
    "type": "living",
    "scope": "individual",
    "iso6393": "myd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Myene",
    "type": "living",
    "scope": "individual",
    "iso6393": "mye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bambassi",
    "type": "living",
    "scope": "individual",
    "iso6393": "myf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manta",
    "type": "living",
    "scope": "individual",
    "iso6393": "myg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Makah",
    "type": "living",
    "scope": "individual",
    "iso6393": "myh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mina (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "myi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mangayat",
    "type": "living",
    "scope": "individual",
    "iso6393": "myj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mamara Senoufo",
    "type": "living",
    "scope": "individual",
    "iso6393": "myk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moma",
    "type": "living",
    "scope": "individual",
    "iso6393": "myl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Me'en",
    "type": "living",
    "scope": "individual",
    "iso6393": "mym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anfillo",
    "type": "living",
    "scope": "individual",
    "iso6393": "myo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pirahã",
    "type": "living",
    "scope": "individual",
    "iso6393": "myp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Muniche",
    "type": "living",
    "scope": "individual",
    "iso6393": "myr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mesmes",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mys",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mundurukú",
    "type": "living",
    "scope": "individual",
    "iso6393": "myu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Erzya",
    "type": "living",
    "scope": "individual",
    "iso6393": "myv",
    "iso6392B": "myv",
    "iso6392T": "myv",
    "iso6391": null
  },
  {
    "name": "Muyuw",
    "type": "living",
    "scope": "individual",
    "iso6393": "myw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Masaaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "myx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macuna",
    "type": "living",
    "scope": "individual",
    "iso6393": "myy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Classical Mandaic",
    "type": "historical",
    "scope": "individual",
    "iso6393": "myz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa María Zacatepec Mixtec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tumzabt",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Madagascar Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malimba",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "mze",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Monastic Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wichí Lhamtés Güisnay",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ixcatlán Mazatec",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manya",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nigeria Mambila",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mazatlán Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mumuye",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mazanderani",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Matipuhy",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "mzo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Movima",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mori Atas",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Marúbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Macanese",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mintil",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inapang",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manza",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Deg",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mawayana",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mozambican Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maiadomu",
    "type": "living",
    "scope": "individual",
    "iso6393": "mzz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namla",
    "type": "living",
    "scope": "individual",
    "iso6393": "naa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Nambikuára",
    "type": "living",
    "scope": "individual",
    "iso6393": "nab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narak",
    "type": "living",
    "scope": "individual",
    "iso6393": "nac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naka'ela",
    "type": "living",
    "scope": "individual",
    "iso6393": "nae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nabak",
    "type": "living",
    "scope": "individual",
    "iso6393": "naf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naga Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "nag",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nalu",
    "type": "living",
    "scope": "individual",
    "iso6393": "naj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nakanai",
    "type": "living",
    "scope": "individual",
    "iso6393": "nak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nalik",
    "type": "living",
    "scope": "individual",
    "iso6393": "nal",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngan'gityemerri",
    "type": "living",
    "scope": "individual",
    "iso6393": "nam",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Min Nan Chinese",
    "type": "living",
    "scope": "individual",
    "iso6393": "nan",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neapolitan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nap",
    "iso6392B": "nap",
    "iso6392T": "nap",
    "iso6391": null
  },
  {
    "name": "Khoekhoe",
    "type": "living",
    "scope": "individual",
    "iso6393": "naq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iguta",
    "type": "living",
    "scope": "individual",
    "iso6393": "nar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naasioi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ca̱hungwa̱rya̱",
    "type": "living",
    "scope": "individual",
    "iso6393": "nat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nauru",
    "type": "living",
    "scope": "individual",
    "iso6393": "nau",
    "iso6392B": "nau",
    "iso6392T": "nau",
    "iso6391": "na"
  },
  {
    "name": "Navajo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nav",
    "iso6392B": "nav",
    "iso6392T": "nav",
    "iso6391": "nv"
  },
  {
    "name": "Nawuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "naw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nakwi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narrinyeri",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coatepec Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "naz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyemba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nba",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndoe",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chang Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngbinda",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Konyak Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nagarchal",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngamo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mao Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngarinman",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nake",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Ndebele",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbl",
    "iso6392B": "nbl",
    "iso6392T": "nbl",
    "iso6391": "nr"
  },
  {
    "name": "Ngbaka Ma'bo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkukoli",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nnam",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nggem",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Numana-Nunku-Gbantu-Numbu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namibian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Na",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rongmei Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngamambo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Ngbandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nbw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ningera",
    "type": "living",
    "scope": "individual",
    "iso6393": "nby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Nicobarese",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ponam",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nachering",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yale",
    "type": "living",
    "scope": "individual",
    "iso6393": "nce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Notsi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nisga'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Huasteca Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Classical Nahuatl",
    "type": "historical",
    "scope": "individual",
    "iso6393": "nci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Puebla Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nakara",
    "type": "living",
    "scope": "individual",
    "iso6393": "nck",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Michoacán Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nambo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nauna",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sibe",
    "type": "living",
    "scope": "individual",
    "iso6393": "nco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndaktup",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ncane",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nicaraguan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chothe Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nct",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chumburung",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Puebla Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "ncx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Natchez",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ncz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "nda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kenswei Nsei",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndau",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nde-Nsele-Nta",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Ndebele",
    "type": "living",
    "scope": "individual",
    "iso6393": "nde",
    "iso6392B": "nde",
    "iso6392T": "nde",
    "iso6391": "nd"
  },
  {
    "name": "Nadruvian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ndf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndengereko",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndali",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Samba Leko",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndam",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngundi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndonga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndo",
    "iso6392B": "ndo",
    "iso6392T": "ndo",
    "iso6391": "ng"
  },
  {
    "name": "Ndo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndombe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndoola",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Low German",
    "type": "living",
    "scope": "individual",
    "iso6393": "nds",
    "iso6392B": "nds",
    "iso6392T": "nds",
    "iso6391": null
  },
  {
    "name": "Ndunga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dugun",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndut",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nduga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lutos",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndogo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ndz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Ngad'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "nea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Toura (Côte d'Ivoire)",
    "type": "living",
    "scope": "individual",
    "iso6393": "neb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nedebang",
    "type": "living",
    "scope": "individual",
    "iso6393": "nec",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nde-Gbite",
    "type": "living",
    "scope": "individual",
    "iso6393": "ned",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nêlêmwa-Nixumwak",
    "type": "living",
    "scope": "individual",
    "iso6393": "nee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nefamese",
    "type": "living",
    "scope": "individual",
    "iso6393": "nef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Negidal",
    "type": "living",
    "scope": "individual",
    "iso6393": "neg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyenkha",
    "type": "living",
    "scope": "individual",
    "iso6393": "neh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neo-Hittite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "nei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neko",
    "type": "living",
    "scope": "individual",
    "iso6393": "nej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neku",
    "type": "living",
    "scope": "individual",
    "iso6393": "nek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nemi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nengone",
    "type": "living",
    "scope": "individual",
    "iso6393": "nen",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ná-Meo",
    "type": "living",
    "scope": "individual",
    "iso6393": "neo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nepali (macrolanguage)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "nep",
    "iso6392B": "nep",
    "iso6392T": "nep",
    "iso6391": "ne"
  },
  {
    "name": "North Central Mixe",
    "type": "living",
    "scope": "individual",
    "iso6393": "neq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yahadian",
    "type": "living",
    "scope": "individual",
    "iso6393": "ner",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bhoti Kinnauri",
    "type": "living",
    "scope": "individual",
    "iso6393": "nes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nete",
    "type": "living",
    "scope": "individual",
    "iso6393": "net",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neo",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "neu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyaheun",
    "type": "living",
    "scope": "individual",
    "iso6393": "nev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Newari",
    "type": "living",
    "scope": "individual",
    "iso6393": "new",
    "iso6392B": "new",
    "iso6392T": "new",
    "iso6391": null
  },
  {
    "name": "Neme",
    "type": "living",
    "scope": "individual",
    "iso6393": "nex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Neyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ney",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nez Perce",
    "type": "living",
    "scope": "individual",
    "iso6393": "nez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dhao",
    "type": "living",
    "scope": "individual",
    "iso6393": "nfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ahwai",
    "type": "living",
    "scope": "individual",
    "iso6393": "nfd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ayiwo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nfl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nafaanra",
    "type": "living",
    "scope": "individual",
    "iso6393": "nfr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mfumte",
    "type": "living",
    "scope": "individual",
    "iso6393": "nfu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngbaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "nga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Ngbandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngombe (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngando (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngemba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngbaka Manza",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "N/u",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngizim",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngie",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dalabon",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lomwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngatik Men's Creole",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngwo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngoni",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngurimi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Engdewu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gvoko",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngeq",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Guerrero Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nagumi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ngv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngwaba",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nggwahyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tibea",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngungwel",
    "type": "living",
    "scope": "individual",
    "iso6393": "ngz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nhanda",
    "type": "living",
    "scope": "individual",
    "iso6393": "nha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Beng",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tabasco Nahuatl",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nhc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chiripá",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Huasteca Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nhuwala",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tetelcingo Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nahari",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zacatlán-Ahuacatlán-Tepetzintla Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isthmus-Cosoleacaque Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Morelos Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Takuu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isthmus-Pajapan Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Huaxcaleca Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naro",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ometepec Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Noone",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Temascaltepec Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Huasteca Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Isthmus-Mecayapan Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Oaxaca Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa María La Alta Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nhz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nias",
    "type": "living",
    "scope": "individual",
    "iso6393": "nia",
    "iso6392B": "nia",
    "iso6392T": "nia",
    "iso6391": null
  },
  {
    "name": "Nakame",
    "type": "living",
    "scope": "individual",
    "iso6393": "nib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngandi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niellim",
    "type": "living",
    "scope": "individual",
    "iso6393": "nie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nek",
    "type": "living",
    "scope": "individual",
    "iso6393": "nif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngalakan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyiha (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nii",
    "type": "living",
    "scope": "individual",
    "iso6393": "nii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngaju",
    "type": "living",
    "scope": "individual",
    "iso6393": "nij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Nicobarese",
    "type": "living",
    "scope": "individual",
    "iso6393": "nik",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nila",
    "type": "living",
    "scope": "individual",
    "iso6393": "nil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nilamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ninzo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nganasan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nandi",
    "type": "living",
    "scope": "individual",
    "iso6393": "niq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimboran",
    "type": "living",
    "scope": "individual",
    "iso6393": "nir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southeastern Kolami",
    "type": "living",
    "scope": "individual",
    "iso6393": "nit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niuean",
    "type": "living",
    "scope": "individual",
    "iso6393": "niu",
    "iso6392B": "niu",
    "iso6392T": "niu",
    "iso6391": null
  },
  {
    "name": "Gilyak",
    "type": "living",
    "scope": "individual",
    "iso6393": "niv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimo",
    "type": "living",
    "scope": "individual",
    "iso6393": "niw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Hema",
    "type": "living",
    "scope": "individual",
    "iso6393": "nix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngiti",
    "type": "living",
    "scope": "individual",
    "iso6393": "niy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ningil",
    "type": "living",
    "scope": "individual",
    "iso6393": "niz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nzanyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nja",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nocte Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "njb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndonde Hamba",
    "type": "living",
    "scope": "individual",
    "iso6393": "njd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lotha Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "njh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gudanji",
    "type": "living",
    "scope": "individual",
    "iso6393": "nji",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Njen",
    "type": "living",
    "scope": "individual",
    "iso6393": "njj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Njalgulgule",
    "type": "living",
    "scope": "individual",
    "iso6393": "njl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Angami Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "njm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Liangmai Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "njn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ao Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "njo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Njerep",
    "type": "living",
    "scope": "individual",
    "iso6393": "njr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nisa",
    "type": "living",
    "scope": "individual",
    "iso6393": "njs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndyuka-Trio Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "njt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngadjunmaya",
    "type": "living",
    "scope": "individual",
    "iso6393": "nju",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kunyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "njx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Njyem",
    "type": "living",
    "scope": "individual",
    "iso6393": "njy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyishi",
    "type": "living",
    "scope": "individual",
    "iso6393": "njz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkoya",
    "type": "living",
    "scope": "individual",
    "iso6393": "nka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khoibu Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkongho",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koireng",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duke",
    "type": "living",
    "scope": "individual",
    "iso6393": "nke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inpui Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nekgini",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khezha Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Thangal Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nakai",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nokuku",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namat",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkangala",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkonya",
    "type": "living",
    "scope": "individual",
    "iso6393": "nko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niuatoputapu",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkami",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukuoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Asmat",
    "type": "living",
    "scope": "individual",
    "iso6393": "nks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyika (Tanzania)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bouna Kulango",
    "type": "living",
    "scope": "individual",
    "iso6393": "nku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyika (Malawi and Zambia)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkutu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkoroo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nkari",
    "type": "living",
    "scope": "individual",
    "iso6393": "nkz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngombale",
    "type": "living",
    "scope": "individual",
    "iso6393": "nla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nalca",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dutch",
    "type": "living",
    "scope": "individual",
    "iso6393": "nld",
    "iso6392B": "dut",
    "iso6392T": "nld",
    "iso6391": "nl"
  },
  {
    "name": "East Nyala",
    "type": "living",
    "scope": "individual",
    "iso6393": "nle",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gela",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Grangali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nli",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ninia Yali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nihali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngul",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lao Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nchumbulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orizaba Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Walangama",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nlw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nahali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyamal",
    "type": "living",
    "scope": "individual",
    "iso6393": "nly",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nalögo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nlz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maram Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Big Nambas",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngam",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndumu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mzieme Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tangkhul Naga (India)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwasio",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Monsang Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyam",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngombe (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namakura",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndemli",
    "type": "living",
    "scope": "individual",
    "iso6393": "nml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Manangba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "!Xóõ",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moyon Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimanbur",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nmp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nambya",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimbari",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Letemboi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namonuito",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northeast Maidu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngamini",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nmv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimoa",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nama (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namuyi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nawdm",
    "type": "living",
    "scope": "individual",
    "iso6393": "nmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyangumarta",
    "type": "living",
    "scope": "individual",
    "iso6393": "nna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nande",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nancere",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "West Ambae",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngandyera",
    "type": "living",
    "scope": "individual",
    "iso6393": "nne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngaing",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maring Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nng",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngiemboon",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Nuaulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyangatom",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nankina",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Rengma Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namia",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngete",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norwegian Nynorsk",
    "type": "living",
    "scope": "individual",
    "iso6393": "nno",
    "iso6392B": "nno",
    "iso6392T": "nno",
    "iso6391": "nn"
  },
  {
    "name": "Wancho Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngindo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narungga",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ningye",
    "type": "living",
    "scope": "individual",
    "iso6393": "nns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nanticoke",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nnt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Dwang",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nugunu (Australia)",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nnv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Nuni",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyangga",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nda'nda'",
    "type": "living",
    "scope": "individual",
    "iso6393": "nnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Woun Meu",
    "type": "living",
    "scope": "individual",
    "iso6393": "noa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norwegian Bokmål",
    "type": "living",
    "scope": "individual",
    "iso6393": "nob",
    "iso6392B": "nob",
    "iso6392T": "nob",
    "iso6391": "nb"
  },
  {
    "name": "Nuk",
    "type": "living",
    "scope": "individual",
    "iso6393": "noc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Thai",
    "type": "living",
    "scope": "individual",
    "iso6393": "nod",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nimadi",
    "type": "living",
    "scope": "individual",
    "iso6393": "noe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nomane",
    "type": "living",
    "scope": "individual",
    "iso6393": "nof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nogai",
    "type": "living",
    "scope": "individual",
    "iso6393": "nog",
    "iso6392B": "nog",
    "iso6392T": "nog",
    "iso6391": null
  },
  {
    "name": "Nomu",
    "type": "living",
    "scope": "individual",
    "iso6393": "noh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Noiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "noi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nonuya",
    "type": "living",
    "scope": "individual",
    "iso6393": "noj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nooksack",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nomlaki",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nol",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nocamán",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Norse",
    "type": "historical",
    "scope": "individual",
    "iso6393": "non",
    "iso6392B": "non",
    "iso6392T": "non",
    "iso6391": null
  },
  {
    "name": "Numanggang",
    "type": "living",
    "scope": "individual",
    "iso6393": "nop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "noq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norwegian",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "nor",
    "iso6392B": "nor",
    "iso6392T": "nor",
    "iso6391": "no"
  },
  {
    "name": "Eastern Nisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nomatsiguenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "not",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ewage-Notu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nou",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Novial",
    "type": "constructed",
    "scope": "individual",
    "iso6393": "nov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyambo",
    "type": "living",
    "scope": "individual",
    "iso6393": "now",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Noy",
    "type": "living",
    "scope": "individual",
    "iso6393": "noy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nayi",
    "type": "living",
    "scope": "individual",
    "iso6393": "noz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nar Phu",
    "type": "living",
    "scope": "individual",
    "iso6393": "npa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nupbikha",
    "type": "living",
    "scope": "individual",
    "iso6393": "npb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ponyo-Gongwang Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "npg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phom Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nph",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nepali (individual language)",
    "type": "living",
    "scope": "individual",
    "iso6393": "npi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southeastern Puebla Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "npl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mondropolon",
    "type": "living",
    "scope": "individual",
    "iso6393": "npn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pochuri Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "npo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nipsan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Puimei Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "npu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Napu",
    "type": "living",
    "scope": "individual",
    "iso6393": "npy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Nago",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kura Ede Nago",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndom",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nen",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "N'Ko",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqo",
    "iso6392B": "nqo",
    "iso6392T": "nqo",
    "iso6391": null
  },
  {
    "name": "Kyan-Karyaw Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Akyaung Ari Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nqy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngom",
    "type": "living",
    "scope": "individual",
    "iso6393": "nra",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nara",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Noric",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "nrc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Rengma Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jèrriais",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narango",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chokri Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngarla",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngarluma",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narom",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norn",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nrn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "North Picene",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "nrp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norra",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nrr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Kalapuya",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nrt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narua",
    "type": "living",
    "scope": "individual",
    "iso6393": "nru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngurmbur",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nrx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lala",
    "type": "living",
    "scope": "individual",
    "iso6393": "nrz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sangtam Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nshi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Nisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nsenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nse",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwestern Nisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngasa",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngoshie",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nigerian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naskapi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Norwegian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sumi Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nehan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pedi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nso",
    "iso6392B": "nso",
    "iso6392T": "nso",
    "iso6391": null
  },
  {
    "name": "Nepalese Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Sierra Miwok",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maritime Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nali",
    "type": "living",
    "scope": "individual",
    "iso6393": "nss",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tase Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nst",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sierra Negra Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwestern Nisu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Navut",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nsongo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nasal",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nisenan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nsz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Tidung",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nathembo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nte",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngantangarra",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ntg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Natioro",
    "type": "living",
    "scope": "individual",
    "iso6393": "nti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngaanyatjarra",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ikoma-Nata-Isenye",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nateni",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ntomba",
    "type": "living",
    "scope": "individual",
    "iso6393": "nto",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Tepehuan",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Delo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Natügu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nottoway",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ntw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tangkhul Naga (Myanmar)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mantsi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Natanzi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ntz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yuanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukuini",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nuc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngala",
    "type": "living",
    "scope": "individual",
    "iso6393": "nud",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngundu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nusu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nungali",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nug",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndunda",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngumbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyole",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nuu-chah-nulth",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nusa Laut",
    "type": "living",
    "scope": "individual",
    "iso6393": "nul",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Niuafo'ou",
    "type": "living",
    "scope": "individual",
    "iso6393": "num",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anong",
    "type": "living",
    "scope": "individual",
    "iso6393": "nun",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nguôn",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nupe-Nupe-Tako",
    "type": "living",
    "scope": "individual",
    "iso6393": "nup",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukumanu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nukuria",
    "type": "living",
    "scope": "individual",
    "iso6393": "nur",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nuer",
    "type": "living",
    "scope": "individual",
    "iso6393": "nus",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nung (Viet Nam)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nut",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngbundu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Nuni",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nguluwan",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mehek",
    "type": "living",
    "scope": "individual",
    "iso6393": "nux",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nunggubuyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tlamacazapa Nahuatl",
    "type": "living",
    "scope": "individual",
    "iso6393": "nuz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nasarian",
    "type": "living",
    "scope": "individual",
    "iso6393": "nvh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Namiae",
    "type": "living",
    "scope": "individual",
    "iso6393": "nvm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyokon",
    "type": "living",
    "scope": "individual",
    "iso6393": "nvo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nawathinehena",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nwa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyabwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "nwb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Classical Newari",
    "type": "historical",
    "scope": "individual",
    "iso6393": "nwc",
    "iso6392B": "nwc",
    "iso6392T": "nwc",
    "iso6391": null
  },
  {
    "name": "Ngwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "nwe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngayawung",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nwg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwest Tanna",
    "type": "living",
    "scope": "individual",
    "iso6393": "nwi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyamusa-Molo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nwm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nauo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nwo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nawaru",
    "type": "living",
    "scope": "individual",
    "iso6393": "nwr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Newar",
    "type": "historical",
    "scope": "individual",
    "iso6393": "nwx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nottoway-Meherrin",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nwy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nauete",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngando (Democratic Republic of Congo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nage",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngad'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nindi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koki Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Nuaulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Numidian",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "nxm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ngawun",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nxn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ndambomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Naxi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ninggerum",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Narau",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nxu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nafri",
    "type": "living",
    "scope": "individual",
    "iso6393": "nxx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyanja",
    "type": "living",
    "scope": "individual",
    "iso6393": "nya",
    "iso6392B": "nya",
    "iso6392T": "nya",
    "iso6391": "ny"
  },
  {
    "name": "Nyangbo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyanga-li",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyore",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "nye",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Giryama",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyindu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyigina",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ama (Sudan)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyaneka",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyeu",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyamwezi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nym",
    "iso6392B": "nym",
    "iso6392T": "nym",
    "iso6391": null
  },
  {
    "name": "Nyankole",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyn",
    "iso6392B": "nyn",
    "iso6392T": "nyn",
    "iso6391": null
  },
  {
    "name": "Nyoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyo",
    "iso6392B": "nyo",
    "iso6392T": "nyo",
    "iso6391": null
  },
  {
    "name": "Nyang'i",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nyp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nayini",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyiha (Malawi)",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyunga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nys",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyawaygi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nyt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyungwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyulnyul",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nyv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyaw",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nganyaywana",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "nyx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nyakyusa-Ngonde",
    "type": "living",
    "scope": "individual",
    "iso6393": "nyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tigon Mbembe",
    "type": "living",
    "scope": "individual",
    "iso6393": "nza",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Njebi",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nzima",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzi",
    "iso6392B": "nzi",
    "iso6392T": "nzi",
    "iso6391": null
  },
  {
    "name": "Nzakara",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Zeme Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "New Zealand Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Teke-Nzikou",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nzakambay",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nanga Dama Dogon",
    "type": "living",
    "scope": "individual",
    "iso6393": "nzz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orok",
    "type": "living",
    "scope": "individual",
    "iso6393": "oaa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oroch",
    "type": "living",
    "scope": "individual",
    "iso6393": "oac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Aramaic (up to 700 BCE)",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "oar",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Avar",
    "type": "historical",
    "scope": "individual",
    "iso6393": "oav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obispeño",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "obi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Bontok",
    "type": "living",
    "scope": "individual",
    "iso6393": "obk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oblo",
    "type": "living",
    "scope": "individual",
    "iso6393": "obl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Moabite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "obm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obo Manobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "obo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Burmese",
    "type": "historical",
    "scope": "individual",
    "iso6393": "obr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Breton",
    "type": "historical",
    "scope": "individual",
    "iso6393": "obt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Obulom",
    "type": "living",
    "scope": "individual",
    "iso6393": "obu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ocaina",
    "type": "living",
    "scope": "individual",
    "iso6393": "oca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Chinese",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "och",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Occitan (post 1500)",
    "type": "living",
    "scope": "individual",
    "iso6393": "oci",
    "iso6392B": "oci",
    "iso6392T": "oci",
    "iso6391": "oc"
  },
  {
    "name": "Old Cornish",
    "type": "historical",
    "scope": "individual",
    "iso6393": "oco",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Atzingo Matlatzinca",
    "type": "living",
    "scope": "individual",
    "iso6393": "ocu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Odut",
    "type": "living",
    "scope": "individual",
    "iso6393": "oda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Od",
    "type": "living",
    "scope": "individual",
    "iso6393": "odk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Dutch",
    "type": "historical",
    "scope": "individual",
    "iso6393": "odt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Odual",
    "type": "living",
    "scope": "individual",
    "iso6393": "odu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ofo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ofo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Frisian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ofs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Efutop",
    "type": "living",
    "scope": "individual",
    "iso6393": "ofu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ogbia",
    "type": "living",
    "scope": "individual",
    "iso6393": "ogb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ogbah",
    "type": "living",
    "scope": "individual",
    "iso6393": "ogc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Georgian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "oge",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ogbogolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ogg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Khana",
    "type": "living",
    "scope": "individual",
    "iso6393": "ogo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ogbronuagum",
    "type": "living",
    "scope": "individual",
    "iso6393": "ogu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Hittite",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "oht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Hungarian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ohu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oirata",
    "type": "living",
    "scope": "individual",
    "iso6393": "oia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Inebu One",
    "type": "living",
    "scope": "individual",
    "iso6393": "oin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northwestern Ojibwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Ojibwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Ojibwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ojibwa",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "oji",
    "iso6392B": "oji",
    "iso6392T": "oji",
    "iso6391": "oj"
  },
  {
    "name": "Old Japanese",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ojp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Severn Ojibwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ontong Java",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Ojibwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ojw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okanagan",
    "type": "living",
    "scope": "individual",
    "iso6393": "oka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okobo",
    "type": "living",
    "scope": "individual",
    "iso6393": "okb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okodia",
    "type": "living",
    "scope": "individual",
    "iso6393": "okd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okpe (Southwestern Edo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "oke",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koko Babangk",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "okg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koresh-e Rostam",
    "type": "living",
    "scope": "individual",
    "iso6393": "okh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okiek",
    "type": "living",
    "scope": "individual",
    "iso6393": "oki",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oko-Juwoi",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "okj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kwamtim One",
    "type": "living",
    "scope": "individual",
    "iso6393": "okk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Kentish Sign Language",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "okl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Middle Korean (10th-16th cent.)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "okm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oki-No-Erabu",
    "type": "living",
    "scope": "individual",
    "iso6393": "okn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Korean (3rd-9th cent.)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "oko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kirike",
    "type": "living",
    "scope": "individual",
    "iso6393": "okr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oko-Eni-Osayen",
    "type": "living",
    "scope": "individual",
    "iso6393": "oks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oku",
    "type": "living",
    "scope": "individual",
    "iso6393": "oku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orokaiva",
    "type": "living",
    "scope": "individual",
    "iso6393": "okv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okpe (Northwestern Edo)",
    "type": "living",
    "scope": "individual",
    "iso6393": "okx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Walungge",
    "type": "living",
    "scope": "individual",
    "iso6393": "ola",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mochi",
    "type": "living",
    "scope": "individual",
    "iso6393": "old",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olekha",
    "type": "living",
    "scope": "individual",
    "iso6393": "ole",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olkol",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "olk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oloma",
    "type": "living",
    "scope": "individual",
    "iso6393": "olm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Livvi",
    "type": "living",
    "scope": "individual",
    "iso6393": "olo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olrat",
    "type": "living",
    "scope": "individual",
    "iso6393": "olr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Lithuanian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "olt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kuvale",
    "type": "living",
    "scope": "individual",
    "iso6393": "olu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omaha-Ponca",
    "type": "living",
    "scope": "individual",
    "iso6393": "oma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "East Ambae",
    "type": "living",
    "scope": "individual",
    "iso6393": "omb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mochica",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "omc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omagua",
    "type": "living",
    "scope": "individual",
    "iso6393": "omg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omi",
    "type": "living",
    "scope": "individual",
    "iso6393": "omi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omok",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "omk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ombo",
    "type": "living",
    "scope": "individual",
    "iso6393": "oml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Minoan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "omn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Utarmbung",
    "type": "living",
    "scope": "individual",
    "iso6393": "omo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Manipuri",
    "type": "historical",
    "scope": "individual",
    "iso6393": "omp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Marathi",
    "type": "historical",
    "scope": "individual",
    "iso6393": "omr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omotik",
    "type": "living",
    "scope": "individual",
    "iso6393": "omt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Omurano",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "omu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "South Tairora",
    "type": "living",
    "scope": "individual",
    "iso6393": "omw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Mon",
    "type": "historical",
    "scope": "individual",
    "iso6393": "omx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ona",
    "type": "living",
    "scope": "individual",
    "iso6393": "ona",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lingao",
    "type": "living",
    "scope": "individual",
    "iso6393": "onb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oneida",
    "type": "living",
    "scope": "individual",
    "iso6393": "one",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Olo",
    "type": "living",
    "scope": "individual",
    "iso6393": "ong",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Onin",
    "type": "living",
    "scope": "individual",
    "iso6393": "oni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Onjob",
    "type": "living",
    "scope": "individual",
    "iso6393": "onj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kabore One",
    "type": "living",
    "scope": "individual",
    "iso6393": "onk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Onobasulu",
    "type": "living",
    "scope": "individual",
    "iso6393": "onn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Onondaga",
    "type": "living",
    "scope": "individual",
    "iso6393": "ono",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sartang",
    "type": "living",
    "scope": "individual",
    "iso6393": "onp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern One",
    "type": "living",
    "scope": "individual",
    "iso6393": "onr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ono",
    "type": "living",
    "scope": "individual",
    "iso6393": "ons",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ontenu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ont",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Unua",
    "type": "living",
    "scope": "individual",
    "iso6393": "onu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Nubian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "onw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Onin Based Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "onx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tohono O'odham",
    "type": "living",
    "scope": "individual",
    "iso6393": "ood",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ong",
    "type": "living",
    "scope": "individual",
    "iso6393": "oog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Önge",
    "type": "living",
    "scope": "individual",
    "iso6393": "oon",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oorlams",
    "type": "living",
    "scope": "individual",
    "iso6393": "oor",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Ossetic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "oos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Okpamheri",
    "type": "living",
    "scope": "individual",
    "iso6393": "opa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kopkaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "opk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oksapmin",
    "type": "living",
    "scope": "individual",
    "iso6393": "opm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Opao",
    "type": "living",
    "scope": "individual",
    "iso6393": "opo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Opata",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "opt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ofayé",
    "type": "living",
    "scope": "individual",
    "iso6393": "opy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oroha",
    "type": "living",
    "scope": "individual",
    "iso6393": "ora",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orma",
    "type": "living",
    "scope": "individual",
    "iso6393": "orc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orejón",
    "type": "living",
    "scope": "individual",
    "iso6393": "ore",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oring",
    "type": "living",
    "scope": "individual",
    "iso6393": "org",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oroqen",
    "type": "living",
    "scope": "individual",
    "iso6393": "orh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oriya (macrolanguage)",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "ori",
    "iso6392B": "ori",
    "iso6392T": "ori",
    "iso6391": "or"
  },
  {
    "name": "Oromo",
    "type": "living",
    "scope": "macrolanguage",
    "iso6393": "orm",
    "iso6392B": "orm",
    "iso6392T": "orm",
    "iso6391": "om"
  },
  {
    "name": "Orang Kanaq",
    "type": "living",
    "scope": "individual",
    "iso6393": "orn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orokolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "oro",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oruma",
    "type": "living",
    "scope": "individual",
    "iso6393": "orr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Orang Seletar",
    "type": "living",
    "scope": "individual",
    "iso6393": "ors",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Adivasi Oriya",
    "type": "living",
    "scope": "individual",
    "iso6393": "ort",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ormuri",
    "type": "living",
    "scope": "individual",
    "iso6393": "oru",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Russian",
    "type": "historical",
    "scope": "individual",
    "iso6393": "orv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oro Win",
    "type": "living",
    "scope": "individual",
    "iso6393": "orw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oro",
    "type": "living",
    "scope": "individual",
    "iso6393": "orx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Odia",
    "type": "living",
    "scope": "individual",
    "iso6393": "ory",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ormu",
    "type": "living",
    "scope": "individual",
    "iso6393": "orz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Osage",
    "type": "living",
    "scope": "individual",
    "iso6393": "osa",
    "iso6392B": "osa",
    "iso6392T": "osa",
    "iso6391": null
  },
  {
    "name": "Oscan",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "osc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Osing",
    "type": "living",
    "scope": "individual",
    "iso6393": "osi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ososo",
    "type": "living",
    "scope": "individual",
    "iso6393": "oso",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Spanish",
    "type": "historical",
    "scope": "individual",
    "iso6393": "osp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ossetian",
    "type": "living",
    "scope": "individual",
    "iso6393": "oss",
    "iso6392B": "oss",
    "iso6392T": "oss",
    "iso6391": "os"
  },
  {
    "name": "Osatu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ost",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern One",
    "type": "living",
    "scope": "individual",
    "iso6393": "osu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Saxon",
    "type": "historical",
    "scope": "individual",
    "iso6393": "osx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ottoman Turkish (1500-1928)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "ota",
    "iso6392B": "ota",
    "iso6392T": "ota",
    "iso6391": null
  },
  {
    "name": "Old Tibetan",
    "type": "historical",
    "scope": "individual",
    "iso6393": "otb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ot Danum",
    "type": "living",
    "scope": "individual",
    "iso6393": "otd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mezquital Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ote",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oti",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "oti",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Turkish",
    "type": "historical",
    "scope": "individual",
    "iso6393": "otk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tilapa Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Highland Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tenango Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Querétaro Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Otoro",
    "type": "living",
    "scope": "individual",
    "iso6393": "otr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Estado de México Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ots",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Temoaya Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ott",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Otuke",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "otu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ottawa",
    "type": "living",
    "scope": "individual",
    "iso6393": "otw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Texcatepec Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Tamil",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "oty",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ixtenco Otomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "otz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tagargrent",
    "type": "living",
    "scope": "individual",
    "iso6393": "oua",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Glio-Oubi",
    "type": "living",
    "scope": "individual",
    "iso6393": "oub",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oune",
    "type": "living",
    "scope": "individual",
    "iso6393": "oue",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Uighur",
    "type": "historical",
    "scope": "individual",
    "iso6393": "oui",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ouma",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "oum",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Owiniga",
    "type": "living",
    "scope": "individual",
    "iso6393": "owi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Welsh",
    "type": "historical",
    "scope": "individual",
    "iso6393": "owl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oy",
    "type": "living",
    "scope": "individual",
    "iso6393": "oyb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oyda",
    "type": "living",
    "scope": "individual",
    "iso6393": "oyd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Wayampi",
    "type": "living",
    "scope": "individual",
    "iso6393": "oym",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oya'oya",
    "type": "living",
    "scope": "individual",
    "iso6393": "oyy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Koonzime",
    "type": "living",
    "scope": "individual",
    "iso6393": "ozm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parecís",
    "type": "living",
    "scope": "individual",
    "iso6393": "pab",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pacoh",
    "type": "living",
    "scope": "individual",
    "iso6393": "pac",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paumarí",
    "type": "living",
    "scope": "individual",
    "iso6393": "pad",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pagibete",
    "type": "living",
    "scope": "individual",
    "iso6393": "pae",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paranawát",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "paf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pangasinan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pag",
    "iso6392B": "pag",
    "iso6392T": "pag",
    "iso6391": null
  },
  {
    "name": "Tenharim",
    "type": "living",
    "scope": "individual",
    "iso6393": "pah",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pe",
    "type": "living",
    "scope": "individual",
    "iso6393": "pai",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parakanã",
    "type": "living",
    "scope": "individual",
    "iso6393": "pak",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pahlavi",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "pal",
    "iso6392B": "pal",
    "iso6392T": "pal",
    "iso6391": null
  },
  {
    "name": "Pampanga",
    "type": "living",
    "scope": "individual",
    "iso6393": "pam",
    "iso6392B": "pam",
    "iso6392T": "pam",
    "iso6391": null
  },
  {
    "name": "Panjabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pan",
    "iso6392B": "pan",
    "iso6392T": "pan",
    "iso6391": "pa"
  },
  {
    "name": "Northern Paiute",
    "type": "living",
    "scope": "individual",
    "iso6393": "pao",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papiamento",
    "type": "living",
    "scope": "individual",
    "iso6393": "pap",
    "iso6392B": "pap",
    "iso6392T": "pap",
    "iso6391": null
  },
  {
    "name": "Parya",
    "type": "living",
    "scope": "individual",
    "iso6393": "paq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panamint",
    "type": "living",
    "scope": "individual",
    "iso6393": "par",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papasena",
    "type": "living",
    "scope": "individual",
    "iso6393": "pas",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papitalai",
    "type": "living",
    "scope": "individual",
    "iso6393": "pat",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palauan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pau",
    "iso6392B": "pau",
    "iso6392T": "pau",
    "iso6391": null
  },
  {
    "name": "Pakaásnovos",
    "type": "living",
    "scope": "individual",
    "iso6393": "pav",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pawnee",
    "type": "living",
    "scope": "individual",
    "iso6393": "paw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pankararé",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pax",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pech",
    "type": "living",
    "scope": "individual",
    "iso6393": "pay",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pankararú",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "paz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Páez",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Patamona",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mezontla Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Coyotepec Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paraujano",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pbg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "E'ñapa Woromaipu",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parkwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mak (Nigeria)",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kpasam",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papel",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Badyara",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pangwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Pame",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Pashto",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Pashto",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pnar",
    "type": "living",
    "scope": "individual",
    "iso6393": "pbv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pyu (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "pby",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Santa Inés Ahuatempan Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pca",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pear",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bouyei",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Picard",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ruching Palaung",
    "type": "living",
    "scope": "individual",
    "iso6393": "pce",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paliyan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paniya",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pardhan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pch",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Duruwa",
    "type": "living",
    "scope": "individual",
    "iso6393": "pci",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parenga",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paite Chin",
    "type": "living",
    "scope": "individual",
    "iso6393": "pck",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pardhi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Nigerian Pidgin",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piti",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pacahuara",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pyapun",
    "type": "living",
    "scope": "individual",
    "iso6393": "pcw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Anam",
    "type": "living",
    "scope": "individual",
    "iso6393": "pda",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pennsylvania German",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pa Di",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Podena",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Padoe",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Plautdietsch",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kayan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pdu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Peranakan Indonesian",
    "type": "living",
    "scope": "individual",
    "iso6393": "pea",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Pomo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "peb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Mala (Papua New Guinea)",
    "type": "living",
    "scope": "individual",
    "iso6393": "ped",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Taje",
    "type": "living",
    "scope": "individual",
    "iso6393": "pee",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northeastern Pomo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pef",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pengo",
    "type": "living",
    "scope": "individual",
    "iso6393": "peg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bonan",
    "type": "living",
    "scope": "individual",
    "iso6393": "peh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Chichimeca-Jonaz",
    "type": "living",
    "scope": "individual",
    "iso6393": "pei",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Pomo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pej",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Penchal",
    "type": "living",
    "scope": "individual",
    "iso6393": "pek",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pekal",
    "type": "living",
    "scope": "individual",
    "iso6393": "pel",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phende",
    "type": "living",
    "scope": "individual",
    "iso6393": "pem",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Persian (ca. 600-400 B.C.)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "peo",
    "iso6392B": "peo",
    "iso6392T": "peo",
    "iso6391": null
  },
  {
    "name": "Kunja",
    "type": "living",
    "scope": "individual",
    "iso6393": "pep",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Pomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "peq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Iranian Persian",
    "type": "living",
    "scope": "individual",
    "iso6393": "pes",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pémono",
    "type": "living",
    "scope": "individual",
    "iso6393": "pev",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Petats",
    "type": "living",
    "scope": "individual",
    "iso6393": "pex",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Petjo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pey",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Eastern Penan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pez",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pááfang",
    "type": "living",
    "scope": "individual",
    "iso6393": "pfa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Peere",
    "type": "living",
    "scope": "individual",
    "iso6393": "pfe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pfaelzisch",
    "type": "living",
    "scope": "individual",
    "iso6393": "pfl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Sudanese Creole Arabic",
    "type": "living",
    "scope": "individual",
    "iso6393": "pga",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Gāndhārī",
    "type": "historical",
    "scope": "individual",
    "iso6393": "pgd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pangwali",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pagi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Rerep",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Primitive Irish",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "pgl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paelignian",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "pgn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pangseng",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgs",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pagu",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papua New Guinean Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "pgz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pa-Hng",
    "type": "living",
    "scope": "individual",
    "iso6393": "pha",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phudagi",
    "type": "living",
    "scope": "individual",
    "iso6393": "phd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phuong",
    "type": "living",
    "scope": "individual",
    "iso6393": "phg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phukha",
    "type": "living",
    "scope": "individual",
    "iso6393": "phh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phake",
    "type": "living",
    "scope": "individual",
    "iso6393": "phk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phalura",
    "type": "living",
    "scope": "individual",
    "iso6393": "phl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phimbi",
    "type": "living",
    "scope": "individual",
    "iso6393": "phm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phoenician",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "phn",
    "iso6392B": "phn",
    "iso6392T": "phn",
    "iso6391": null
  },
  {
    "name": "Phunoi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pho",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phana'",
    "type": "living",
    "scope": "individual",
    "iso6393": "phq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pahari-Potwari",
    "type": "living",
    "scope": "individual",
    "iso6393": "phr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phu Thai",
    "type": "living",
    "scope": "individual",
    "iso6393": "pht",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phuan",
    "type": "living",
    "scope": "individual",
    "iso6393": "phu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pahlavani",
    "type": "living",
    "scope": "individual",
    "iso6393": "phv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phangduwali",
    "type": "living",
    "scope": "individual",
    "iso6393": "phw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pima Bajo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pia",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yine",
    "type": "living",
    "scope": "individual",
    "iso6393": "pib",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pinji",
    "type": "living",
    "scope": "individual",
    "iso6393": "pic",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piaroa",
    "type": "living",
    "scope": "individual",
    "iso6393": "pid",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piro",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pie",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pingelapese",
    "type": "living",
    "scope": "individual",
    "iso6393": "pif",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pisabo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pig",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pitcairn-Norfolk",
    "type": "living",
    "scope": "individual",
    "iso6393": "pih",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pini",
    "type": "living",
    "scope": "individual",
    "iso6393": "pii",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pijao",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pij",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Yom",
    "type": "living",
    "scope": "individual",
    "iso6393": "pil",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Powhatan",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pim",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piame",
    "type": "living",
    "scope": "individual",
    "iso6393": "pin",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piapoco",
    "type": "living",
    "scope": "individual",
    "iso6393": "pio",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pero",
    "type": "living",
    "scope": "individual",
    "iso6393": "pip",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piratapuyo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pir",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pijin",
    "type": "living",
    "scope": "individual",
    "iso6393": "pis",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pitta Pitta",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pit",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pintupi-Luritja",
    "type": "living",
    "scope": "individual",
    "iso6393": "piu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pileni",
    "type": "living",
    "scope": "individual",
    "iso6393": "piv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pimbwe",
    "type": "living",
    "scope": "individual",
    "iso6393": "piw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piu",
    "type": "living",
    "scope": "individual",
    "iso6393": "pix",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piya-Kwonci",
    "type": "living",
    "scope": "individual",
    "iso6393": "piy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pije",
    "type": "living",
    "scope": "individual",
    "iso6393": "piz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pitjantjatjara",
    "type": "living",
    "scope": "individual",
    "iso6393": "pjt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ardhamāgadhī Prākrit",
    "type": "historical",
    "scope": "individual",
    "iso6393": "pka",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pokomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paekche",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pkc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pak-Tong",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pankhu",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pakanha",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pökoot",
    "type": "living",
    "scope": "individual",
    "iso6393": "pko",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pukapuka",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Attapady Kurumba",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pakistan Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "pks",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Maleng",
    "type": "living",
    "scope": "individual",
    "iso6393": "pkt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paku",
    "type": "living",
    "scope": "individual",
    "iso6393": "pku",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Miani",
    "type": "living",
    "scope": "individual",
    "iso6393": "pla",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Polonombauk",
    "type": "living",
    "scope": "individual",
    "iso6393": "plb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Central Palawano",
    "type": "living",
    "scope": "individual",
    "iso6393": "plc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Polari",
    "type": "living",
    "scope": "individual",
    "iso6393": "pld",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palu'e",
    "type": "living",
    "scope": "individual",
    "iso6393": "ple",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pilagá",
    "type": "living",
    "scope": "individual",
    "iso6393": "plg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paulohi",
    "type": "living",
    "scope": "individual",
    "iso6393": "plh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pali",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "pli",
    "iso6392B": "pli",
    "iso6392T": "pli",
    "iso6391": "pi"
  },
  {
    "name": "Polci",
    "type": "living",
    "scope": "individual",
    "iso6393": "plj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kohistani Shina",
    "type": "living",
    "scope": "individual",
    "iso6393": "plk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Shwe Palaung",
    "type": "living",
    "scope": "individual",
    "iso6393": "pll",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palenquero",
    "type": "living",
    "scope": "individual",
    "iso6393": "pln",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Oluta Popoluca",
    "type": "living",
    "scope": "individual",
    "iso6393": "plo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palpa",
    "type": "living",
    "scope": "individual",
    "iso6393": "plp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palaic",
    "type": "ancient",
    "scope": "individual",
    "iso6393": "plq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palaka Senoufo",
    "type": "living",
    "scope": "individual",
    "iso6393": "plr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Marcos Tlacoyalco Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pls",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Plateau Malagasy",
    "type": "living",
    "scope": "individual",
    "iso6393": "plt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Palikúr",
    "type": "living",
    "scope": "individual",
    "iso6393": "plu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southwest Palawano",
    "type": "living",
    "scope": "individual",
    "iso6393": "plv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Brooke's Point Palawano",
    "type": "living",
    "scope": "individual",
    "iso6393": "plw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Bolyu",
    "type": "living",
    "scope": "individual",
    "iso6393": "ply",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paluan",
    "type": "living",
    "scope": "individual",
    "iso6393": "plz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paama",
    "type": "living",
    "scope": "individual",
    "iso6393": "pma",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pambia",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pallanganmiddang",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pmd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pwaamei",
    "type": "living",
    "scope": "individual",
    "iso6393": "pme",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pamona",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Māhārāṣṭri Prākrit",
    "type": "historical",
    "scope": "individual",
    "iso6393": "pmh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Pumi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Pumi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pamlico",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pmk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lingua Franca",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pml",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pam",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pom",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Northern Pame",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paynamar",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Piemontese",
    "type": "living",
    "scope": "individual",
    "iso6393": "pms",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Tuamotuan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Plains Miwok",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Poumei Naga",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papuan Malay",
    "type": "living",
    "scope": "individual",
    "iso6393": "pmy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Southern Pame",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pmz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Punan Bah-Biau",
    "type": "living",
    "scope": "individual",
    "iso6393": "pna",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Panjabi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pannei",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Western Penan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pne",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pongu",
    "type": "living",
    "scope": "individual",
    "iso6393": "png",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Penrhyn",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Aoheng",
    "type": "living",
    "scope": "individual",
    "iso6393": "pni",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pinjarup",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pnj",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paunaka",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paleni",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Punan Batu 1",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pinai-Hagahai",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panobo",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pno",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pancana",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pana (Burkina Faso)",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panim",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnr",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ponosakan",
    "type": "living",
    "scope": "individual",
    "iso6393": "pns",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pontic",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Jiongnai Bunu",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pinigura",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnv",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Panytyima",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnw",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Phong-Kniang",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnx",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pinyin",
    "type": "living",
    "scope": "individual",
    "iso6393": "pny",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pana (Central African Republic)",
    "type": "living",
    "scope": "individual",
    "iso6393": "pnz",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Poqomam",
    "type": "living",
    "scope": "individual",
    "iso6393": "poc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Juan Atzingo Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "poe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Poke",
    "type": "living",
    "scope": "individual",
    "iso6393": "pof",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Potiguára",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pog",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Poqomchi'",
    "type": "living",
    "scope": "individual",
    "iso6393": "poh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Highland Popoluca",
    "type": "living",
    "scope": "individual",
    "iso6393": "poi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pokangá",
    "type": "living",
    "scope": "individual",
    "iso6393": "pok",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Polish",
    "type": "living",
    "scope": "individual",
    "iso6393": "pol",
    "iso6392B": "pol",
    "iso6392T": "pol",
    "iso6391": "pl"
  },
  {
    "name": "Southeastern Pomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pom",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pohnpeian",
    "type": "living",
    "scope": "individual",
    "iso6393": "pon",
    "iso6392B": "pon",
    "iso6392T": "pon",
    "iso6391": null
  },
  {
    "name": "Central Pomo",
    "type": "living",
    "scope": "individual",
    "iso6393": "poo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pwapwâ",
    "type": "living",
    "scope": "individual",
    "iso6393": "pop",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Texistepec Popoluca",
    "type": "living",
    "scope": "individual",
    "iso6393": "poq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Portuguese",
    "type": "living",
    "scope": "individual",
    "iso6393": "por",
    "iso6392B": "por",
    "iso6392T": "por",
    "iso6391": "pt"
  },
  {
    "name": "Sayula Popoluca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pos",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Potawatomi",
    "type": "living",
    "scope": "individual",
    "iso6393": "pot",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Upper Guinea Crioulo",
    "type": "living",
    "scope": "individual",
    "iso6393": "pov",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Felipe Otlaltepec Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pow",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Polabian",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "pox",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pogolo",
    "type": "living",
    "scope": "individual",
    "iso6393": "poy",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papi",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppe",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paipai",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppi",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Uma",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pipil",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papuma",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papapana",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Folopa",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppo",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pelende",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pei",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "San Luís Temalacayuca Popoloca",
    "type": "living",
    "scope": "individual",
    "iso6393": "pps",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pare",
    "type": "living",
    "scope": "individual",
    "iso6393": "ppt",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Papora",
    "type": "extinct",
    "scope": "individual",
    "iso6393": "ppu",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Pa'a",
    "type": "living",
    "scope": "individual",
    "iso6393": "pqa",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Malecite-Passamaquoddy",
    "type": "living",
    "scope": "individual",
    "iso6393": "pqm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Lua'",
    "type": "living",
    "scope": "individual",
    "iso6393": "prb",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parachi",
    "type": "living",
    "scope": "individual",
    "iso6393": "prc",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parsi-Dari",
    "type": "living",
    "scope": "individual",
    "iso6393": "prd",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Principense",
    "type": "living",
    "scope": "individual",
    "iso6393": "pre",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paranan",
    "type": "living",
    "scope": "individual",
    "iso6393": "prf",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Prussian",
    "type": "living",
    "scope": "individual",
    "iso6393": "prg",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Porohanon",
    "type": "living",
    "scope": "individual",
    "iso6393": "prh",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Paicî",
    "type": "living",
    "scope": "individual",
    "iso6393": "pri",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Parauk",
    "type": "living",
    "scope": "individual",
    "iso6393": "prk",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Peruvian Sign Language",
    "type": "living",
    "scope": "individual",
    "iso6393": "prl",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Kibiri",
    "type": "living",
    "scope": "individual",
    "iso6393": "prm",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Prasuni",
    "type": "living",
    "scope": "individual",
    "iso6393": "prn",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Old Provençal (to 1500)",
    "type": "historical",
    "scope": "individual",
    "iso6393": "pro",
    "iso6392B": "pro",
    "iso6392T": "pro",
    "iso6391": null
  },
  {
    "name": "Parsi",
    "type": "living",
    "scope": "individual",
    "iso6393": "prp",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
  },
  {
    "name": "Ashéninka Perené",
    "type": "living",
    "scope": "individual",
    "iso6393": "prq",
    "iso6392B": null,
    "iso6392T": null,
    "iso6391": null
