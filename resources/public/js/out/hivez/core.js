// Compiled by ClojureScript 0.0-2371
goog.provide('hivez.core');
goog.require('cljs.core');
goog.require('secretary.core');
goog.require('cljs.core.async');
goog.require('cognitect.transit');
goog.require('secretary.core');
goog.require('goog.string');
goog.require('hivez.map');
goog.require('om.dom');
goog.require('goog.string');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('cljs.core.async');
goog.require('cognitect.transit');
goog.require('goog.events');
goog.require('goog.string.format');
goog.require('om.core');
goog.require('om.core');
goog.require('secretary.core');
goog.require('hivez.map');
goog.require('goog.events');
goog.require('cljs_http.client');
cljs.core.enable_console_print_BANG_.call(null);
hivez.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"orientation","orientation",623557579),null,new cljs.core.Keyword(null,"hives","hives",-1303225483),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"places","places",1043491706),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Angels Camp",new cljs.core.Keyword(null,"bounds","bounds",1691609455),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"northeast","northeast",-393120937),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),(0),new cljs.core.Keyword(null,"lng","lng",1667213918),(0)], null),new cljs.core.Keyword(null,"southwest","southwest",-212094911),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),(5),new cljs.core.Keyword(null,"lng","lng",1667213918),(5)], null)], null),new cljs.core.Keyword(null,"hives","hives",-1303225483),cljs.core.PersistentArrayMap.EMPTY], null)], null)], null));
hivez.core.db = cljs.core.atom.call(null,null);
hivez.core.orientation = (function orientation(){if((window.screen.height > window.screen.width))
{return "portrait";
} else
{return "landscape";
}
});
hivez.core.handleOrientation = (function handleOrientation(){return cljs.core.swap_BANG_.call(null,hivez.core.app_state,(function (p1__55750_SHARP_){return cljs.core.assoc.call(null,p1__55750_SHARP_,new cljs.core.Keyword(null,"orientation","orientation",623557579),hivez.core.orientation.call(null));
}));
});
hivez.core.display = (function display(show){if(cljs.core.truth_(show))
{return {};
} else
{return {"display": "none"};
}
});
hivez.core.display_fade_in = (function display_fade_in(show){if(cljs.core.truth_(show))
{return {"transition": "opacity .3s", "opacity": (1)};
} else
{return {"opacity": (0)};
}
});
hivez.core.pos_key = (function pos_key(lat_lng){return cljs.core.keyword.call(null,("lat="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lat_lng.lat())+"lng="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lat_lng.lng())));
});
hivez.core.fdate_now = (function fdate_now(){var d = (new Date());var date = d.getDate();var month = (d.getMonth() + (1));var year = d.getFullYear();return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(month)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(date)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(year));
});
/**
* @param {...*} var_args
*/
hivez.core.floormat = (function() { 
var floormat__delegate = function (args){return cljs.core.apply.call(null,goog.string.format,args);
};
var floormat = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return floormat__delegate.call(this,args);};
floormat.cljs$lang$maxFixedArity = 0;
floormat.cljs$lang$applyTo = (function (arglist__55751){
var args = cljs.core.seq(arglist__55751);
return floormat__delegate(args);
});
floormat.cljs$core$IFn$_invoke$arity$variadic = floormat__delegate;
return floormat;
})()
;
/**
* Euclidean distance between 2 points
*/
hivez.core.distance = (function distance(pos1,pos2){return Math.pow.call(null,(Math.pow.call(null,(new cljs.core.Keyword(null,"lat","lat",-580793929).cljs$core$IFn$_invoke$arity$1(pos1) - new cljs.core.Keyword(null,"lat","lat",-580793929).cljs$core$IFn$_invoke$arity$1(pos2)),(2)) + Math.pow.call(null,(new cljs.core.Keyword(null,"lng","lng",1667213918).cljs$core$IFn$_invoke$arity$1(pos1) - new cljs.core.Keyword(null,"lng","lng",1667213918).cljs$core$IFn$_invoke$arity$1(pos2)),(2))),0.5);
});
hivez.core.db_error = (function db_error(e){return console.error("An IndexedDB error has occured!",e);
});
hivez.core.db_new = (function db_new(cb){var version = (1);var request = indexedDB.open("hivez",version);request.onupgradeneeded = ((function (version,request){
return (function (e){cljs.core.reset_BANG_.call(null,hivez.core.db,e.target.result);
e.target.transaction.onerror = hivez.core.db_error;
return cljs.core.deref.call(null,hivez.core.db).createObjectStore("hive",{"keyPath": "key"});
});})(version,request))
;
request.onsuccess = ((function (version,request){
return (function (e){cljs.core.reset_BANG_.call(null,hivez.core.db,e.target.result);
return cb.call(null);
});})(version,request))
;
return request.onerror = hivez.core.db_error;
});
hivez.core.db_add_hive = (function db_add_hive(hive){var transaction = cljs.core.deref.call(null,hivez.core.db).transaction(["hive"],"readwrite");var store = transaction.objectStore("hive");var request = store.put(cljs.core.clj__GT_js.call(null,hive));return request.onerror = hivez.core.db_error;
});
hivez.core.db_delete_hive = (function db_delete_hive(key){var transaction = cljs.core.deref.call(null,hivez.core.db).transaction(["hive"],"readwrite");var store = transaction.objectStore("hive");var request = store.delete(cljs.core.name.call(null,key));return request.onerror = hivez.core.db_error;
});
hivez.core.db_get_all = (function db_get_all(cb){var transaction = cljs.core.deref.call(null,hivez.core.db).transaction(["hive"],"readonly");var store = transaction.objectStore("hive");var keyRange = IDBKeyRange.lowerBound((0));var cursorRequest = store.openCursor(keyRange);return cursorRequest.onsuccess = ((function (transaction,store,keyRange,cursorRequest){
return (function (e){var temp__4124__auto__ = e.target.result;if(cljs.core.truth_(temp__4124__auto__))
{var result = temp__4124__auto__;cljs.core.swap_BANG_.call(null,hivez.core.app_state,((function (result,temp__4124__auto__,transaction,store,keyRange,cursorRequest){
return (function (p1__55752_SHARP_){return cljs.core.assoc_in.call(null,p1__55752_SHARP_,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"places","places",1043491706),(0),new cljs.core.Keyword(null,"hives","hives",-1303225483),cljs.core.keyword.call(null,result.key)], null),cljs.core.js__GT_clj.call(null,result.value,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
});})(result,temp__4124__auto__,transaction,store,keyRange,cursorRequest))
);
return result.continue();
} else
{return cb.call(null);
}
});})(transaction,store,keyRange,cursorRequest))
;
});
hivez.core.new_hive = (function new_hive(pos){return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),hivez.core.pos_key.call(null,pos),new cljs.core.Keyword(null,"name","name",1843675177),"",new cljs.core.Keyword(null,"origin","origin",1037372088),hivez.core.fdate_now.call(null),new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),pos.lat(),new cljs.core.Keyword(null,"lng","lng",1667213918),pos.lng()], null),new cljs.core.Keyword(null,"notes","notes",-1039600523),""], null);
});
hivez.core.nearest = (function nearest(hive,hives){return cljs.core.apply.call(null,cljs.core.min_key,(function (p1__55753_SHARP_){return hivez.core.distance.call(null,new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(hive),new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__55753_SHARP_)));
}),cljs.core.seq.call(null,hives));
});
hivez.core.add_hive = (function add_hive(data,pos){var hive = hivez.core.new_hive.call(null,pos);om.core.transact_BANG_.call(null,data,new cljs.core.Keyword(null,"hives","hives",-1303225483),((function (hive){
return (function (p1__55754_SHARP_){return cljs.core.assoc.call(null,p1__55754_SHARP_,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(hive),hive);
});})(hive))
);
om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(hive));
return hivez.core.db_add_hive.call(null,hive);
});
hivez.core.activate_hive = (function activate_hive(data,key){return om.core.transact_BANG_.call(null,data,new cljs.core.Keyword(null,"active","active",1895962068),(function (p1__55755_SHARP_){if(cljs.core._EQ_.call(null,key,p1__55755_SHARP_))
{return null;
} else
{return key;
}
}));
});
hivez.core.delete_hive = (function delete_hive(data,key){if(cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,data))))
{var hive_55758 = key.call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,data)));om.core.transact_BANG_.call(null,data,new cljs.core.Keyword(null,"hives","hives",-1303225483),((function (hive_55758){
return (function (p1__55756_SHARP_){return cljs.core.dissoc.call(null,p1__55756_SHARP_,key);
});})(hive_55758))
);
om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"active","active",1895962068),cljs.core.first.call(null,hivez.core.nearest.call(null,hive_55758,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,data)))));
} else
{om.core.transact_BANG_.call(null,data,new cljs.core.Keyword(null,"hives","hives",-1303225483),(function (p1__55757_SHARP_){return cljs.core.dissoc.call(null,p1__55757_SHARP_,key);
}));
}
return hivez.core.db_delete_hive.call(null,key);
});
hivez.core.display_pos = (function display_pos(hive){var pos = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(hive);return ("Lat: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(hivez.core.floormat.call(null,"%.2f",new cljs.core.Keyword(null,"lat","lat",-580793929).cljs$core$IFn$_invoke$arity$1(pos)))+" Lng: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(hivez.core.floormat.call(null,"%.2f",new cljs.core.Keyword(null,"lng","lng",1667213918).cljs$core$IFn$_invoke$arity$1(pos))));
});
hivez.core.display_origin = (function display_origin(hive){return ("Originated: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"origin","origin",1037372088).cljs$core$IFn$_invoke$arity$1(hive)));
});
hivez.core.begin_edit = (function begin_edit(owner,edit_key){return om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"editing","editing",1365491601),edit_key);
});
hivez.core.end_edit = (function end_edit(owner){return om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"editing","editing",1365491601),null);
});
hivez.core.on_edit = (function on_edit(cb,hive,key,owner){om.core.update_BANG_.call(null,hive,key,goog.string.unescapeEntities(om.core.get_node.call(null,owner,key).innerHTML));
hivez.core.db_add_hive.call(null,cljs.core.deref.call(null,hive));
return cb.call(null);
});
hivez.core.input = (function input(hive,owner,p__55759){var map__55766 = p__55759;var map__55766__$1 = ((cljs.core.seq_QMARK_.call(null,map__55766))?cljs.core.apply.call(null,cljs.core.hash_map,map__55766):map__55766);var opts = map__55766__$1;var on_key_down = cljs.core.get.call(null,map__55766__$1,new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765));var on_edit = cljs.core.get.call(null,map__55766__$1,new cljs.core.Keyword(null,"on-edit","on-edit",745088083));var edit_key = cljs.core.get.call(null,map__55766__$1,new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727));var className = cljs.core.get.call(null,map__55766__$1,new cljs.core.Keyword(null,"className","className",-1983287057));var id = cljs.core.get.call(null,map__55766__$1,new cljs.core.Keyword(null,"id","id",-1388402092));if(typeof hivez.core.t55767 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55767 = (function (input,map__55766,on_key_down,owner,hive,edit_key,className,on_edit,id,p__55759,opts,meta55768){
this.input = input;
this.map__55766 = map__55766;
this.on_key_down = on_key_down;
this.owner = owner;
this.hive = hive;
this.edit_key = edit_key;
this.className = className;
this.on_edit = on_edit;
this.id = id;
this.p__55759 = p__55759;
this.opts = opts;
this.meta55768 = meta55768;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55767.cljs$lang$type = true;
hivez.core.t55767.cljs$lang$ctorStr = "hivez.core/t55767";
hivez.core.t55767.cljs$lang$ctorPrWriter = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55767");
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.t55767.prototype.om$core$IRenderState$ = true;
hivez.core.t55767.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_,p__55770){var self__ = this;
var map__55771 = p__55770;var map__55771__$1 = ((cljs.core.seq_QMARK_.call(null,map__55771))?cljs.core.apply.call(null,cljs.core.hash_map,map__55771):map__55771);var exit_type = cljs.core.get.call(null,map__55771__$1,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934));var ___$1 = this;return React.DOM.div({"id": "input-wrapper"},React.DOM.div({"dangerouslySetInnerHTML": {"__html": self__.edit_key.call(null,self__.hive)}, "onBlur": ((function (___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),"out");
return setTimeout(((function (___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){return self__.on_edit.call(null,self__.hive,self__.edit_key,self__.owner);
});})(___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
,(100));
});})(___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
, "onKeyDown": self__.on_key_down, "contentEditable": "true", "style": hivez.core.display.call(null,cljs.core.not.call(null,exit_type)), "className": self__.className, "ref": self__.edit_key, "id": self__.id}),React.DOM.div({"onClick": ((function (___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),"btn");
return setTimeout(((function (___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){return self__.on_edit.call(null,self__.hive,self__.edit_key,self__.owner);
});})(___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
,(100));
});})(___$1,map__55771,map__55771__$1,exit_type,map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
, "style": hivez.core.display.call(null,!(cljs.core._EQ_.call(null,exit_type,"out"))), "id": "input-ok"},React.DOM.span({"id": "input-ok-mark"},goog.string.unescapeEntities("&#10003;"))));
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.t55767.prototype.om$core$IDidMount$ = true;
hivez.core.t55767.prototype.om$core$IDidMount$did_mount$arity$1 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_){var self__ = this;
var ___$1 = this;return om.core.get_node.call(null,self__.owner,self__.edit_key).focus();
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.t55767.prototype.om$core$IInitState$ = true;
hivez.core.t55767.prototype.om$core$IInitState$init_state$arity$1 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),null], null);
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.t55767.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_55769){var self__ = this;
var _55769__$1 = this;return self__.meta55768;
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.t55767.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_55769,meta55768__$1){var self__ = this;
var _55769__$1 = this;return (new hivez.core.t55767(self__.input,self__.map__55766,self__.on_key_down,self__.owner,self__.hive,self__.edit_key,self__.className,self__.on_edit,self__.id,self__.p__55759,self__.opts,meta55768__$1));
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.core.__GT_t55767 = ((function (map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function __GT_t55767(input__$1,map__55766__$2,on_key_down__$1,owner__$1,hive__$1,edit_key__$1,className__$1,on_edit__$1,id__$1,p__55759__$1,opts__$1,meta55768){return (new hivez.core.t55767(input__$1,map__55766__$2,on_key_down__$1,owner__$1,hive__$1,edit_key__$1,className__$1,on_edit__$1,id__$1,p__55759__$1,opts__$1,meta55768));
});})(map__55766,map__55766__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
}
return (new hivez.core.t55767(input,map__55766__$1,on_key_down,owner,hive,edit_key,className,on_edit,id,p__55759,opts,null));
});
hivez.core.input_control = (function input_control(hive,owner,p__55772){var map__55780 = p__55772;var map__55780__$1 = ((cljs.core.seq_QMARK_.call(null,map__55780))?cljs.core.apply.call(null,cljs.core.hash_map,map__55780):map__55780);var opts = map__55780__$1;var on_edit = cljs.core.get.call(null,map__55780__$1,new cljs.core.Keyword(null,"on-edit","on-edit",745088083));if(typeof hivez.core.t55781 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55781 = (function (on_edit,opts,map__55780,p__55772,owner,hive,input_control,meta55782){
this.on_edit = on_edit;
this.opts = opts;
this.map__55780 = map__55780;
this.p__55772 = p__55772;
this.owner = owner;
this.hive = hive;
this.input_control = input_control;
this.meta55782 = meta55782;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55781.cljs$lang$type = true;
hivez.core.t55781.cljs$lang$ctorStr = "hivez.core/t55781";
hivez.core.t55781.cljs$lang$ctorPrWriter = ((function (map__55780,map__55780__$1,opts,on_edit){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55781");
});})(map__55780,map__55780__$1,opts,on_edit))
;
hivez.core.t55781.prototype.om$core$IRenderState$ = true;
hivez.core.t55781.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__55780,map__55780__$1,opts,on_edit){
return (function (_,p__55784){var self__ = this;
var map__55785 = p__55784;var map__55785__$1 = ((cljs.core.seq_QMARK_.call(null,map__55785))?cljs.core.apply.call(null,cljs.core.hash_map,map__55785):map__55785);var editing = cljs.core.get.call(null,map__55785__$1,new cljs.core.Keyword(null,"editing","editing",1365491601));var ___$1 = this;return React.DOM.div({"id": "input-ctrl"},(function (){var G__55786 = (((editing instanceof cljs.core.Keyword))?editing.fqn:null);switch (G__55786) {
case "notes":
return om.core.build.call(null,hivez.core.input,self__.hive,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"notes-input",new cljs.core.Keyword(null,"className","className",-1983287057),"notes input",new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727),new cljs.core.Keyword(null,"notes","notes",-1039600523),new cljs.core.Keyword(null,"on-edit","on-edit",745088083),self__.on_edit], null)], null));

break;
case "name":
return om.core.build.call(null,hivez.core.input,self__.hive,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"name-input",new cljs.core.Keyword(null,"className","className",-1983287057),"name input single-line",new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"on-edit","on-edit",745088083),self__.on_edit,new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765),((function (G__55786,___$1,map__55785,map__55785__$1,editing,map__55780,map__55780__$1,opts,on_edit){
return (function (e){if(cljs.core._EQ_.call(null,e.keyCode,(13)))
{return false;
} else
{return null;
}
});})(G__55786,___$1,map__55785,map__55785__$1,editing,map__55780,map__55780__$1,opts,on_edit))
], null)], null));

break;
default:
return null;

}
})());
});})(map__55780,map__55780__$1,opts,on_edit))
;
hivez.core.t55781.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55780,map__55780__$1,opts,on_edit){
return (function (_55783){var self__ = this;
var _55783__$1 = this;return self__.meta55782;
});})(map__55780,map__55780__$1,opts,on_edit))
;
hivez.core.t55781.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55780,map__55780__$1,opts,on_edit){
return (function (_55783,meta55782__$1){var self__ = this;
var _55783__$1 = this;return (new hivez.core.t55781(self__.on_edit,self__.opts,self__.map__55780,self__.p__55772,self__.owner,self__.hive,self__.input_control,meta55782__$1));
});})(map__55780,map__55780__$1,opts,on_edit))
;
hivez.core.__GT_t55781 = ((function (map__55780,map__55780__$1,opts,on_edit){
return (function __GT_t55781(on_edit__$1,opts__$1,map__55780__$2,p__55772__$1,owner__$1,hive__$1,input_control__$1,meta55782){return (new hivez.core.t55781(on_edit__$1,opts__$1,map__55780__$2,p__55772__$1,owner__$1,hive__$1,input_control__$1,meta55782));
});})(map__55780,map__55780__$1,opts,on_edit))
;
}
return (new hivez.core.t55781(on_edit,opts,map__55780__$1,p__55772,owner,hive,input_control,null));
});
hivez.core.hive_info = (function hive_info(hive,owner,p__55788){var map__55793 = p__55788;var map__55793__$1 = ((cljs.core.seq_QMARK_.call(null,map__55793))?cljs.core.apply.call(null,cljs.core.hash_map,map__55793):map__55793);var opts = map__55793__$1;var begin_edit = cljs.core.get.call(null,map__55793__$1,new cljs.core.Keyword(null,"begin-edit","begin-edit",-253186107));if(typeof hivez.core.t55794 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55794 = (function (begin_edit,opts,map__55793,p__55788,owner,hive,hive_info,meta55795){
this.begin_edit = begin_edit;
this.opts = opts;
this.map__55793 = map__55793;
this.p__55788 = p__55788;
this.owner = owner;
this.hive = hive;
this.hive_info = hive_info;
this.meta55795 = meta55795;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55794.cljs$lang$type = true;
hivez.core.t55794.cljs$lang$ctorStr = "hivez.core/t55794";
hivez.core.t55794.cljs$lang$ctorPrWriter = ((function (map__55793,map__55793__$1,opts,begin_edit){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55794");
});})(map__55793,map__55793__$1,opts,begin_edit))
;
hivez.core.t55794.prototype.om$core$IRender$ = true;
hivez.core.t55794.prototype.om$core$IRender$render$arity$1 = ((function (map__55793,map__55793__$1,opts,begin_edit){
return (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "info"},React.DOM.span({"dangerouslySetInnerHTML": {"__html": new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(self__.hive)}, "data-ph": "Name", "onClick": ((function (___$1,map__55793,map__55793__$1,opts,begin_edit){
return (function (){return self__.begin_edit.call(null,new cljs.core.Keyword(null,"name","name",1843675177));
});})(___$1,map__55793,map__55793__$1,opts,begin_edit))
, "className": "name editable single-line", "id": "name-editable"}),React.DOM.div({"className": "origin"},hivez.core.display_origin.call(null,self__.hive)),React.DOM.div({"className": "location"},hivez.core.display_pos.call(null,self__.hive)),React.DOM.div({"dangerouslySetInnerHTML": {"__html": new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(self__.hive)}, "data-ph": "Notes...", "onClick": ((function (___$1,map__55793,map__55793__$1,opts,begin_edit){
return (function (){return self__.begin_edit.call(null,new cljs.core.Keyword(null,"notes","notes",-1039600523));
});})(___$1,map__55793,map__55793__$1,opts,begin_edit))
, "className": "notes editable", "id": "notes-editable"}));
});})(map__55793,map__55793__$1,opts,begin_edit))
;
hivez.core.t55794.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55793,map__55793__$1,opts,begin_edit){
return (function (_55796){var self__ = this;
var _55796__$1 = this;return self__.meta55795;
});})(map__55793,map__55793__$1,opts,begin_edit))
;
hivez.core.t55794.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55793,map__55793__$1,opts,begin_edit){
return (function (_55796,meta55795__$1){var self__ = this;
var _55796__$1 = this;return (new hivez.core.t55794(self__.begin_edit,self__.opts,self__.map__55793,self__.p__55788,self__.owner,self__.hive,self__.hive_info,meta55795__$1));
});})(map__55793,map__55793__$1,opts,begin_edit))
;
hivez.core.__GT_t55794 = ((function (map__55793,map__55793__$1,opts,begin_edit){
return (function __GT_t55794(begin_edit__$1,opts__$1,map__55793__$2,p__55788__$1,owner__$1,hive__$1,hive_info__$1,meta55795){return (new hivez.core.t55794(begin_edit__$1,opts__$1,map__55793__$2,p__55788__$1,owner__$1,hive__$1,hive_info__$1,meta55795));
});})(map__55793,map__55793__$1,opts,begin_edit))
;
}
return (new hivez.core.t55794(begin_edit,opts,map__55793__$1,p__55788,owner,hive,hive_info,null));
});
hivez.core.name_select = (function name_select(data,owner,p__55797){var map__55802 = p__55797;var map__55802__$1 = ((cljs.core.seq_QMARK_.call(null,map__55802))?cljs.core.apply.call(null,cljs.core.hash_map,map__55802):map__55802);var opts = map__55802__$1;var route = cljs.core.get.call(null,map__55802__$1,new cljs.core.Keyword(null,"route","route",329891309));if(typeof hivez.core.t55803 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55803 = (function (route,opts,map__55802,p__55797,owner,data,name_select,meta55804){
this.route = route;
this.opts = opts;
this.map__55802 = map__55802;
this.p__55797 = p__55797;
this.owner = owner;
this.data = data;
this.name_select = name_select;
this.meta55804 = meta55804;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55803.cljs$lang$type = true;
hivez.core.t55803.cljs$lang$ctorStr = "hivez.core/t55803";
hivez.core.t55803.cljs$lang$ctorPrWriter = ((function (map__55802,map__55802__$1,opts,route){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55803");
});})(map__55802,map__55802__$1,opts,route))
;
hivez.core.t55803.prototype.om$core$IRender$ = true;
hivez.core.t55803.prototype.om$core$IRender$render$arity$1 = ((function (map__55802,map__55802__$1,opts,route){
return (function (this__14153__auto__){var self__ = this;
var this__14153__auto____$1 = this;return React.DOM.div({"onClick": ((function (this__14153__auto____$1,map__55802,map__55802__$1,opts,route){
return (function (){return cljs.core.async.put_BANG_.call(null,om.core.get_shared.call(null,self__.owner,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.route,self__.data], null));
});})(this__14153__auto____$1,map__55802,map__55802__$1,opts,route))
, "className": "name-select"},React.DOM.span({"className": "name-select-title"},new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(self__.data)));
});})(map__55802,map__55802__$1,opts,route))
;
hivez.core.t55803.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55802,map__55802__$1,opts,route){
return (function (_55805){var self__ = this;
var _55805__$1 = this;return self__.meta55804;
});})(map__55802,map__55802__$1,opts,route))
;
hivez.core.t55803.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55802,map__55802__$1,opts,route){
return (function (_55805,meta55804__$1){var self__ = this;
var _55805__$1 = this;return (new hivez.core.t55803(self__.route,self__.opts,self__.map__55802,self__.p__55797,self__.owner,self__.data,self__.name_select,meta55804__$1));
});})(map__55802,map__55802__$1,opts,route))
;
hivez.core.__GT_t55803 = ((function (map__55802,map__55802__$1,opts,route){
return (function __GT_t55803(route__$1,opts__$1,map__55802__$2,p__55797__$1,owner__$1,data__$1,name_select__$1,meta55804){return (new hivez.core.t55803(route__$1,opts__$1,map__55802__$2,p__55797__$1,owner__$1,data__$1,name_select__$1,meta55804));
});})(map__55802,map__55802__$1,opts,route))
;
}
return (new hivez.core.t55803(route,opts,map__55802__$1,p__55797,owner,data,name_select,null));
});
hivez.core.places_info = (function places_info(places,owner){if(typeof hivez.core.t55809 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55809 = (function (owner,places,places_info,meta55810){
this.owner = owner;
this.places = places;
this.places_info = places_info;
this.meta55810 = meta55810;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55809.cljs$lang$type = true;
hivez.core.t55809.cljs$lang$ctorStr = "hivez.core/t55809";
hivez.core.t55809.cljs$lang$ctorPrWriter = (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55809");
});
hivez.core.t55809.prototype.om$core$IRender$ = true;
hivez.core.t55809.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.apply.call(null,om.dom.div,{"className": "select-list"},om.core.build_all.call(null,hivez.core.name_select,self__.places,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"route","route",329891309),"place"], null)], null)));
});
hivez.core.t55809.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_55811){var self__ = this;
var _55811__$1 = this;return self__.meta55810;
});
hivez.core.t55809.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_55811,meta55810__$1){var self__ = this;
var _55811__$1 = this;return (new hivez.core.t55809(self__.owner,self__.places,self__.places_info,meta55810__$1));
});
hivez.core.__GT_t55809 = (function __GT_t55809(owner__$1,places__$1,places_info__$1,meta55810){return (new hivez.core.t55809(owner__$1,places__$1,places_info__$1,meta55810));
});
}
return (new hivez.core.t55809(owner,places,places_info,null));
});
hivez.core.place_info = (function place_info(place,owner){if(typeof hivez.core.t55815 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55815 = (function (owner,place,place_info,meta55816){
this.owner = owner;
this.place = place;
this.place_info = place_info;
this.meta55816 = meta55816;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55815.cljs$lang$type = true;
hivez.core.t55815.cljs$lang$ctorStr = "hivez.core/t55815";
hivez.core.t55815.cljs$lang$ctorPrWriter = (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55815");
});
hivez.core.t55815.prototype.om$core$IRender$ = true;
hivez.core.t55815.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"className": "place-info"},React.DOM.span({"className": "place-title"}),cljs.core.apply.call(null,om.dom.div,{"className": "select-list"},om.core.build_all.call(null,hivez.core.name_select,cljs.core.vals.call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(self__.place)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"route","route",329891309),"hive"], null)], null))));
});
hivez.core.t55815.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_55817){var self__ = this;
var _55817__$1 = this;return self__.meta55816;
});
hivez.core.t55815.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_55817,meta55816__$1){var self__ = this;
var _55817__$1 = this;return (new hivez.core.t55815(self__.owner,self__.place,self__.place_info,meta55816__$1));
});
hivez.core.__GT_t55815 = (function __GT_t55815(owner__$1,place__$1,place_info__$1,meta55816){return (new hivez.core.t55815(owner__$1,place__$1,place_info__$1,meta55816));
});
}
return (new hivez.core.t55815(owner,place,place_info,null));
});
hivez.core.root = (function root(root_id,owner,comp,data,opts){return om.core.root.call(null,comp,data,cljs.core.into.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById(root_id),new cljs.core.Keyword(null,"shared","shared",-384145993),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"route-chan","route-chan",1651359250),om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250))], null)], null),opts));
});
hivez.core.navicon = (function navicon(data,owner,p__55819){var map__55826 = p__55819;var map__55826__$1 = ((cljs.core.seq_QMARK_.call(null,map__55826))?cljs.core.apply.call(null,cljs.core.hash_map,map__55826):map__55826);var opts = map__55826__$1;var route_chan = cljs.core.get.call(null,map__55826__$1,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250));if(typeof hivez.core.t55827 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55827 = (function (route_chan,opts,map__55826,p__55819,owner,data,navicon,meta55828){
this.route_chan = route_chan;
this.opts = opts;
this.map__55826 = map__55826;
this.p__55819 = p__55819;
this.owner = owner;
this.data = data;
this.navicon = navicon;
this.meta55828 = meta55828;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55827.cljs$lang$type = true;
hivez.core.t55827.cljs$lang$ctorStr = "hivez.core/t55827";
hivez.core.t55827.cljs$lang$ctorPrWriter = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55827");
});})(map__55826,map__55826__$1,opts,route_chan))
;
hivez.core.t55827.prototype.om$core$IRenderState$ = true;
hivez.core.t55827.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function (_,p__55830){var self__ = this;
var map__55831 = p__55830;var map__55831__$1 = ((cljs.core.seq_QMARK_.call(null,map__55831))?cljs.core.apply.call(null,cljs.core.hash_map,map__55831):map__55831);var editing = cljs.core.get.call(null,map__55831__$1,new cljs.core.Keyword(null,"editing","editing",1365491601));var active = cljs.core.get.call(null,map__55831__$1,new cljs.core.Keyword(null,"active","active",1895962068));var ___$1 = this;return React.DOM.div({"onClick": ((function (___$1,map__55831,map__55831__$1,editing,active,map__55826,map__55826__$1,opts,route_chan){
return (function (){om.core.update_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"active","active",1895962068),((function (___$1,map__55831,map__55831__$1,editing,active,map__55826,map__55826__$1,opts,route_chan){
return (function (p1__55818_SHARP_){return cljs.core.not.call(null,p1__55818_SHARP_);
});})(___$1,map__55831,map__55831__$1,editing,active,map__55826,map__55826__$1,opts,route_chan))
);
return cljs.core.async.put_BANG_.call(null,self__.route_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["open"], null));
});})(___$1,map__55831,map__55831__$1,editing,active,map__55826,map__55826__$1,opts,route_chan))
, "className": ("navicon"+cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(active)?" active":null))), "style": hivez.core.display_fade_in.call(null,(editing == null))});
});})(map__55826,map__55826__$1,opts,route_chan))
;
hivez.core.t55827.prototype.om$core$IInitState$ = true;
hivez.core.t55827.prototype.om$core$IInitState$init_state$arity$1 = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),false], null);
});})(map__55826,map__55826__$1,opts,route_chan))
;
hivez.core.t55827.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function (_55829){var self__ = this;
var _55829__$1 = this;return self__.meta55828;
});})(map__55826,map__55826__$1,opts,route_chan))
;
hivez.core.t55827.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function (_55829,meta55828__$1){var self__ = this;
var _55829__$1 = this;return (new hivez.core.t55827(self__.route_chan,self__.opts,self__.map__55826,self__.p__55819,self__.owner,self__.data,self__.navicon,meta55828__$1));
});})(map__55826,map__55826__$1,opts,route_chan))
;
hivez.core.__GT_t55827 = ((function (map__55826,map__55826__$1,opts,route_chan){
return (function __GT_t55827(route_chan__$1,opts__$1,map__55826__$2,p__55819__$1,owner__$1,data__$1,navicon__$1,meta55828){return (new hivez.core.t55827(route_chan__$1,opts__$1,map__55826__$2,p__55819__$1,owner__$1,data__$1,navicon__$1,meta55828));
});})(map__55826,map__55826__$1,opts,route_chan))
;
}
return (new hivez.core.t55827(route_chan,opts,map__55826__$1,p__55819,owner,data,navicon,null));
});
hivez.core.control_panel = (function control_panel(data,owner,p__55832){var map__55839 = p__55832;var map__55839__$1 = ((cljs.core.seq_QMARK_.call(null,map__55839))?cljs.core.apply.call(null,cljs.core.hash_map,map__55839):map__55839);var opts = map__55839__$1;var route_chan = cljs.core.get.call(null,map__55839__$1,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250));if(typeof hivez.core.t55840 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55840 = (function (route_chan,opts,map__55839,p__55832,owner,data,control_panel,meta55841){
this.route_chan = route_chan;
this.opts = opts;
this.map__55839 = map__55839;
this.p__55832 = p__55832;
this.owner = owner;
this.data = data;
this.control_panel = control_panel;
this.meta55841 = meta55841;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55840.cljs$lang$type = true;
hivez.core.t55840.cljs$lang$ctorStr = "hivez.core/t55840";
hivez.core.t55840.cljs$lang$ctorPrWriter = ((function (map__55839,map__55839__$1,opts,route_chan){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55840");
});})(map__55839,map__55839__$1,opts,route_chan))
;
hivez.core.t55840.prototype.om$core$IRenderState$ = true;
hivez.core.t55840.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__55839,map__55839__$1,opts,route_chan){
return (function (_,p__55843){var self__ = this;
var map__55844 = p__55843;var map__55844__$1 = ((cljs.core.seq_QMARK_.call(null,map__55844))?cljs.core.apply.call(null,cljs.core.hash_map,map__55844):map__55844);var editing = cljs.core.get.call(null,map__55844__$1,new cljs.core.Keyword(null,"editing","editing",1365491601));var ___$1 = this;return React.DOM.div({"className": "control-panel"},om.core.build.call(null,hivez.core.navicon,self__.data,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"opts","opts",155075701),self__.opts,new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",1365491601),editing], null)], null)));
});})(map__55839,map__55839__$1,opts,route_chan))
;
hivez.core.t55840.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__55839,map__55839__$1,opts,route_chan){
return (function (_55842){var self__ = this;
var _55842__$1 = this;return self__.meta55841;
});})(map__55839,map__55839__$1,opts,route_chan))
;
hivez.core.t55840.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__55839,map__55839__$1,opts,route_chan){
return (function (_55842,meta55841__$1){var self__ = this;
var _55842__$1 = this;return (new hivez.core.t55840(self__.route_chan,self__.opts,self__.map__55839,self__.p__55832,self__.owner,self__.data,self__.control_panel,meta55841__$1));
});})(map__55839,map__55839__$1,opts,route_chan))
;
hivez.core.__GT_t55840 = ((function (map__55839,map__55839__$1,opts,route_chan){
return (function __GT_t55840(route_chan__$1,opts__$1,map__55839__$2,p__55832__$1,owner__$1,data__$1,control_panel__$1,meta55841){return (new hivez.core.t55840(route_chan__$1,opts__$1,map__55839__$2,p__55832__$1,owner__$1,data__$1,control_panel__$1,meta55841));
});})(map__55839,map__55839__$1,opts,route_chan))
;
}
return (new hivez.core.t55840(route_chan,opts,map__55839__$1,p__55832,owner,data,control_panel,null));
});
hivez.core.drawer = (function drawer(data,owner){if(typeof hivez.core.t55913 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55913 = (function (owner,data,drawer,meta55914){
this.owner = owner;
this.data = data;
this.drawer = drawer;
this.meta55914 = meta55914;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55913.cljs$lang$type = true;
hivez.core.t55913.cljs$lang$ctorStr = "hivez.core/t55913";
hivez.core.t55913.cljs$lang$ctorPrWriter = (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55913");
});
hivez.core.t55913.prototype.om$core$IRenderState$ = true;
hivez.core.t55913.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,p__55916){var self__ = this;
var map__55917 = p__55916;var map__55917__$1 = ((cljs.core.seq_QMARK_.call(null,map__55917))?cljs.core.apply.call(null,cljs.core.hash_map,map__55917):map__55917);var route_chan = cljs.core.get.call(null,map__55917__$1,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250));var editing = cljs.core.get.call(null,map__55917__$1,new cljs.core.Keyword(null,"editing","editing",1365491601));var open = cljs.core.get.call(null,map__55917__$1,new cljs.core.Keyword(null,"open","open",-1763596448));var ___$1 = this;cljs.core.println.call(null,editing);
cljs.core.println.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(self__.data));
return React.DOM.div({"id": "drawer-wrapper"},om.core.build.call(null,hivez.core.control_panel,self__.data,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"route-chan","route-chan",1651359250),route_chan], null),new cljs.core.Keyword(null,"init-state","init-state",1450863212),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",1365491601),editing], null),new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",1365491601),editing], null)], null)),(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(self__.data))?om.core.build.call(null,hivez.core.input_control,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(self__.data).call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"places","places",1043491706).cljs$core$IFn$_invoke$arity$1(self__.data),(0)))),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",1365491601),editing], null),new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-edit","on-edit",745088083),cljs.core.partial.call(null,hivez.core.on_edit,((function (___$1,map__55917,map__55917__$1,route_chan,editing,open){
return (function (){return hivez.core.end_edit.call(null,self__.owner);
});})(___$1,map__55917,map__55917__$1,route_chan,editing,open))
)], null)], null)):null),React.DOM.div({"className": (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"orientation","orientation",623557579).cljs$core$IFn$_invoke$arity$1(self__.data))+cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var and__12534__auto__ = open;if(cljs.core.truth_(and__12534__auto__))
{return cljs.core.not.call(null,editing);
} else
{return and__12534__auto__;
}
})())?" show":" hide"))), "id": "drawer"}));
});
hivez.core.t55913.prototype.om$core$IDidMount$ = true;
hivez.core.t55913.prototype.om$core$IDidMount$did_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.put_BANG_.call(null,om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["places"], null));
});
hivez.core.t55913.prototype.om$core$IWillMount$ = true;
hivez.core.t55913.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;var c__15086__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__15086__auto__,___$1){
return (function (){var f__15087__auto__ = (function (){var switch__15071__auto__ = ((function (c__15086__auto__,___$1){
return (function (state_55957){var state_val_55958 = (state_55957[(1)]);if((state_val_55958 === (9)))
{var inst_55921 = (state_55957[(7)]);var inst_55922 = (state_55957[(8)]);var inst_55935 = cljs.core.second.call(null,inst_55921);var inst_55936 = cljs.core.deref.call(null,inst_55935);var inst_55937 = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(inst_55936);var inst_55938 = cljs.core.keyword.call(null,inst_55937);var inst_55939 = om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"active","active",1895962068),inst_55938);var inst_55940 = cljs.core.second.call(null,inst_55921);var inst_55941 = [new cljs.core.Keyword(null,"opts","opts",155075701)];var inst_55942 = [new cljs.core.Keyword(null,"begin-edit","begin-edit",-253186107)];var inst_55943 = cljs.core.partial.call(null,hivez.core.begin_edit,self__.owner);var inst_55944 = [inst_55943];var inst_55945 = cljs.core.PersistentHashMap.fromArrays(inst_55942,inst_55944);var inst_55946 = [inst_55945];var inst_55947 = cljs.core.PersistentHashMap.fromArrays(inst_55941,inst_55946);var inst_55948 = inst_55922.call(null,hivez.core.hive_info,inst_55940,inst_55947);var state_55957__$1 = (function (){var statearr_55959 = state_55957;(statearr_55959[(9)] = inst_55939);
return statearr_55959;
})();var statearr_55960_55980 = state_55957__$1;(statearr_55960_55980[(2)] = inst_55948);
(statearr_55960_55980[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (8)))
{var inst_55921 = (state_55957[(7)]);var inst_55922 = (state_55957[(8)]);var inst_55931 = cljs.core.second.call(null,inst_55921);var inst_55932 = cljs.core.PersistentHashMap.EMPTY;var inst_55933 = inst_55922.call(null,hivez.core.place_info,inst_55931,inst_55932);var state_55957__$1 = state_55957;var statearr_55961_55981 = state_55957__$1;(statearr_55961_55981[(2)] = inst_55933);
(statearr_55961_55981[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (7)))
{var inst_55922 = (state_55957[(8)]);var inst_55926 = cljs.core.deref.call(null,self__.data);var inst_55927 = new cljs.core.Keyword(null,"places","places",1043491706).cljs$core$IFn$_invoke$arity$1(inst_55926);var inst_55928 = cljs.core.PersistentHashMap.EMPTY;var inst_55929 = inst_55922.call(null,hivez.core.places_info,inst_55927,inst_55928);var state_55957__$1 = state_55957;var statearr_55962_55982 = state_55957__$1;(statearr_55962_55982[(2)] = inst_55929);
(statearr_55962_55982[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (6)))
{var inst_55921 = (state_55957[(7)]);var inst_55922 = (state_55957[(8)]);var inst_55923 = (function (){var route_BANG_ = inst_55922;var route = inst_55921;return ((function (route_BANG_,route,inst_55921,inst_55922,state_val_55958,c__15086__auto__,___$1){
return (function (p1__55845_SHARP_){return cljs.core.not.call(null,p1__55845_SHARP_);
});
;})(route_BANG_,route,inst_55921,inst_55922,state_val_55958,c__15086__auto__,___$1))
})();var inst_55924 = om.core.update_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"open","open",-1763596448),inst_55923);var state_55957__$1 = state_55957;var statearr_55963_55983 = state_55957__$1;(statearr_55963_55983[(2)] = inst_55924);
(statearr_55963_55983[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (5)))
{var inst_55952 = (state_55957[(2)]);var state_55957__$1 = (function (){var statearr_55964 = state_55957;(statearr_55964[(10)] = inst_55952);
return statearr_55964;
})();var statearr_55965_55984 = state_55957__$1;(statearr_55965_55984[(2)] = null);
(statearr_55965_55984[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (4)))
{var inst_55921 = (state_55957[(7)]);var inst_55921__$1 = (state_55957[(2)]);var inst_55922 = cljs.core.partial.call(null,hivez.core.root,"drawer",self__.owner);var inst_55950 = cljs.core.first.call(null,inst_55921__$1);var state_55957__$1 = (function (){var statearr_55966 = state_55957;(statearr_55966[(7)] = inst_55921__$1);
(statearr_55966[(8)] = inst_55922);
return statearr_55966;
})();var G__55967_55985 = inst_55950;switch (G__55967_55985) {
case "open":
var statearr_55968_55987 = state_55957__$1;(statearr_55968_55987[(1)] = (6));

break;
case "places":
var statearr_55969_55988 = state_55957__$1;(statearr_55969_55988[(1)] = (7));

break;
case "place":
var statearr_55970_55989 = state_55957__$1;(statearr_55970_55989[(1)] = (8));

break;
case "hive":
var statearr_55971_55990 = state_55957__$1;(statearr_55971_55990[(1)] = (9));

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_55950))));

}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_55958 === (3)))
{var inst_55955 = (state_55957[(2)]);var state_55957__$1 = state_55957;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_55957__$1,inst_55955);
} else
{if((state_val_55958 === (2)))
{var inst_55919 = om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250));var state_55957__$1 = state_55957;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_55957__$1,(4),inst_55919);
} else
{if((state_val_55958 === (1)))
{var state_55957__$1 = state_55957;var statearr_55972_55991 = state_55957__$1;(statearr_55972_55991[(2)] = null);
(statearr_55972_55991[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(c__15086__auto__,___$1))
;return ((function (switch__15071__auto__,c__15086__auto__,___$1){
return (function() {
var state_machine__15072__auto__ = null;
var state_machine__15072__auto____0 = (function (){var statearr_55976 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_55976[(0)] = state_machine__15072__auto__);
(statearr_55976[(1)] = (1));
return statearr_55976;
});
var state_machine__15072__auto____1 = (function (state_55957){while(true){
var ret_value__15073__auto__ = (function (){try{while(true){
var result__15074__auto__ = switch__15071__auto__.call(null,state_55957);if(cljs.core.keyword_identical_QMARK_.call(null,result__15074__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__15074__auto__;
}
break;
}
}catch (e55977){if((e55977 instanceof Object))
{var ex__15075__auto__ = e55977;var statearr_55978_55992 = state_55957;(statearr_55978_55992[(5)] = ex__15075__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_55957);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e55977;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__15073__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__55993 = state_55957;
state_55957 = G__55993;
continue;
}
} else
{return ret_value__15073__auto__;
}
break;
}
});
state_machine__15072__auto__ = function(state_55957){
switch(arguments.length){
case 0:
return state_machine__15072__auto____0.call(this);
case 1:
return state_machine__15072__auto____1.call(this,state_55957);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__15072__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__15072__auto____0;
state_machine__15072__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__15072__auto____1;
return state_machine__15072__auto__;
})()
;})(switch__15071__auto__,c__15086__auto__,___$1))
})();var state__15088__auto__ = (function (){var statearr_55979 = f__15087__auto__.call(null);(statearr_55979[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__15086__auto__);
return statearr_55979;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__15088__auto__);
});})(c__15086__auto__,___$1))
);
return c__15086__auto__;
});
hivez.core.t55913.prototype.om$core$IInitState$ = true;
hivez.core.t55913.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"open","open",-1763596448),false,new cljs.core.Keyword(null,"editing","editing",1365491601),null,new cljs.core.Keyword(null,"route-chan","route-chan",1651359250),cljs.core.async.chan.call(null)], null);
});
hivez.core.t55913.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_55915){var self__ = this;
var _55915__$1 = this;return self__.meta55914;
});
hivez.core.t55913.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_55915,meta55914__$1){var self__ = this;
var _55915__$1 = this;return (new hivez.core.t55913(self__.owner,self__.data,self__.drawer,meta55914__$1));
});
hivez.core.__GT_t55913 = (function __GT_t55913(owner__$1,data__$1,drawer__$1,meta55914){return (new hivez.core.t55913(owner__$1,data__$1,drawer__$1,meta55914));
});
}
return (new hivez.core.t55913(owner,data,drawer,null));
});
hivez.core.to_save = (function to_save(){om.core.build.call(null,hivez.core.places_info,new cljs.core.Keyword(null,"places","places",1043491706).cljs$core$IFn$_invoke$arity$1(hivez.core.data));
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(hivez.core.data)))
{return om.core.build.call(null,hivez.core.hive_info,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(hivez.core.data).call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(hivez.core.data)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"begin-edit","begin-edit",-253186107),cljs.core.partial.call(null,hivez.core.begin_edit,hivez.core.owner)], null)], null));
} else
{return null;
}
});
hivez.core.app = (function app(data,owner){if(typeof hivez.core.t55997 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t55997 = (function (owner,data,app,meta55998){
this.owner = owner;
this.data = data;
this.app = app;
this.meta55998 = meta55998;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t55997.cljs$lang$type = true;
hivez.core.t55997.cljs$lang$ctorStr = "hivez.core/t55997";
hivez.core.t55997.cljs$lang$ctorPrWriter = (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.core/t55997");
});
hivez.core.t55997.prototype.om$core$IRender$ = true;
hivez.core.t55997.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"className": ("flex-container "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"orientation","orientation",623557579).cljs$core$IFn$_invoke$arity$1(self__.data)))},React.DOM.div({"className": "flex-content"},om.core.build.call(null,hivez.map.goog_map,self__.data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"add","add",235287739),cljs.core.partial.call(null,hivez.core.add_hive,self__.data),new cljs.core.Keyword(null,"activate","activate",441219614),cljs.core.partial.call(null,hivez.core.activate_hive,self__.data),new cljs.core.Keyword(null,"delete","delete",-1768633620),cljs.core.partial.call(null,hivez.core.delete_hive,self__.data)], null)], null))),om.core.build.call(null,hivez.core.drawer,self__.data));
});
hivez.core.t55997.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_55999){var self__ = this;
var _55999__$1 = this;return self__.meta55998;
});
hivez.core.t55997.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_55999,meta55998__$1){var self__ = this;
var _55999__$1 = this;return (new hivez.core.t55997(self__.owner,self__.data,self__.app,meta55998__$1));
});
hivez.core.__GT_t55997 = (function __GT_t55997(owner__$1,data__$1,app__$1,meta55998){return (new hivez.core.t55997(owner__$1,data__$1,app__$1,meta55998));
});
}
return (new hivez.core.t55997(owner,data,app,null));
});
hivez.core.render = (function render(){hivez.core.handleOrientation.call(null);
window.addEventListener("resize",hivez.core.handleOrientation);
return hivez.core.db_new.call(null,(function (){return hivez.core.db_get_all.call(null,(function (){return om.core.root.call(null,hivez.core.app,hivez.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("content")], null));
}));
}));
});

//# sourceMappingURL=core.js.map