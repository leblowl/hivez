// Compiled by ClojureScript 0.0-2371
goog.provide('hivez.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('goog.string');
goog.require('om.dom');
goog.require('goog.string');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('cljs.core.async');
goog.require('goog.events');
goog.require('goog.string.format');
goog.require('om.core');
goog.require('om.core');
goog.require('goog.events');
goog.require('cljs_http.client');
cljs.core.enable_console_print_BANG_.call(null);
hivez.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"orientation","orientation",623557579),(((window.innerHeight > window.innerWidth))?new cljs.core.Keyword(null,"portrait","portrait",-9810007):new cljs.core.Keyword(null,"landscape","landscape",1519839253)),new cljs.core.Keyword(null,"hives","hives",-1303225483),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"none","none",1333468478),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"",new cljs.core.Keyword(null,"origin","origin",1037372088),"12/21/2012",new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),(0),new cljs.core.Keyword(null,"lng","lng",1667213918),(0)], null),new cljs.core.Keyword(null,"notes","notes",-1039600523),""], null)], null),new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"none","none",1333468478)], null));
hivez.core.mark_pos = (function mark_pos(map,pos){return (new google.maps.Marker({"title": "hive", "map": map, "position": pos}));
});
hivez.core.activate_marker = (function activate_marker(data,marker){cljs.core.dorun.call(null,cljs.core.map.call(null,(function (p1__18974_SHARP_){if(!((new cljs.core.Keyword(null,"marker","marker",865118313).cljs$core$IFn$_invoke$arity$1(p1__18974_SHARP_) == null)))
{return new cljs.core.Keyword(null,"marker","marker",865118313).cljs$core$IFn$_invoke$arity$1(p1__18974_SHARP_).setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
} else
{return null;
}
}),cljs.core.vals.call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,data)))));
return marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
});
hivez.core.handleOrientation = (function handleOrientation(evt){return cljs.core.swap_BANG_.call(null,hivez.core.app_state,(function (p1__18975_SHARP_){return cljs.core.assoc.call(null,p1__18975_SHARP_,new cljs.core.Keyword(null,"orientation","orientation",623557579),(((window.innerHeight > window.innerWidth))?new cljs.core.Keyword(null,"portrait","portrait",-9810007):new cljs.core.Keyword(null,"landscape","landscape",1519839253)));
}));
});
hivez.core.lat_lng_key = (function lat_lng_key(lat_lng){return cljs.core.keyword.call(null,("lat="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lat_lng.lat())+"lng="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lat_lng.lng())));
});
hivez.core.fdate_now = (function fdate_now(){var d = (new Date());var date = d.getDate();var month = (d.getMonth() + (1));var year = d.getFullYear();return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(month)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(date)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(year));
});
hivez.core.add_hive = (function add_hive(data,marker){om.core.transact_BANG_.call(null,data,new cljs.core.Keyword(null,"hives","hives",-1303225483),(function (_){var pos = marker.getPosition();return cljs.core.assoc.call(null,_,hivez.core.lat_lng_key.call(null,pos),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"marker","marker",865118313),marker,new cljs.core.Keyword(null,"name","name",1843675177),"",new cljs.core.Keyword(null,"origin","origin",1037372088),hivez.core.fdate_now.call(null),new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),pos.lat(),new cljs.core.Keyword(null,"lng","lng",1667213918),pos.lng()], null),new cljs.core.Keyword(null,"notes","notes",-1039600523),""], null));
}));
om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"active","active",1895962068),hivez.core.lat_lng_key.call(null,marker.getPosition()));
return hivez.core.activate_marker.call(null,data,marker);
});
hivez.core.goog_map = (function goog_map(data,owner){if(typeof hivez.core.t18979 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t18979 = (function (owner,data,goog_map,meta18980){
this.owner = owner;
this.data = data;
this.goog_map = goog_map;
this.meta18980 = meta18980;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t18979.cljs$lang$type = true;
hivez.core.t18979.cljs$lang$ctorStr = "hivez.core/t18979";
hivez.core.t18979.cljs$lang$ctorPrWriter = (function (this__13125__auto__,writer__13126__auto__,opt__13127__auto__){return cljs.core._write.call(null,writer__13126__auto__,"hivez.core/t18979");
});
hivez.core.t18979.prototype.om$core$IRender$ = true;
hivez.core.t18979.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div({"id": "map-canvas"});
});
hivez.core.t18979.prototype.om$core$IDidMount$ = true;
hivez.core.t18979.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var map_options = {"zoom": (6), "center": {"lng": (0), "lat": (0)}};var map = (new google.maps.Map(document.getElementById("map-canvas"),map_options));google.maps.event.addListener.call(null,map,"rightclick",((function (map_options,map,this$__$1){
return (function (evt){var marker = hivez.core.mark_pos.call(null,map,evt.latLng);document.getElementById("name").blur();
document.getElementById("notes").blur();
hivez.core.add_hive.call(null,self__.data,marker);
google.maps.event.addListener.call(null,marker,"click",((function (marker,map_options,map,this$__$1){
return (function (_){om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"active","active",1895962068),hivez.core.lat_lng_key.call(null,marker.getPosition()));
return hivez.core.activate_marker.call(null,self__.data,marker);
});})(marker,map_options,map,this$__$1))
);
return google.maps.event.addListener.call(null,marker,"rightclick",((function (marker,map_options,map,this$__$1){
return (function (_){marker.setMap(null);
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"none","none",1333468478));
});})(marker,map_options,map,this$__$1))
);
});})(map_options,map,this$__$1))
);
if(cljs.core.truth_(navigator.geolocation))
{return navigator.geolocation.getCurrentPosition(((function (map_options,map,this$__$1){
return (function (pos){var initialLoc = (new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude));return map.setCenter(initialLoc);
});})(map_options,map,this$__$1))
);
} else
{return cljs.core.println.call(null,"Hey, where'd you go!? Geolocation Disabled");
}
});
hivez.core.t18979.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18981){var self__ = this;
var _18981__$1 = this;return self__.meta18980;
});
hivez.core.t18979.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18981,meta18980__$1){var self__ = this;
var _18981__$1 = this;return (new hivez.core.t18979(self__.owner,self__.data,self__.goog_map,meta18980__$1));
});
hivez.core.__GT_t18979 = (function __GT_t18979(owner__$1,data__$1,goog_map__$1,meta18980){return (new hivez.core.t18979(owner__$1,data__$1,goog_map__$1,meta18980));
});
}
return (new hivez.core.t18979(owner,data,goog_map,null));
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
floormat.cljs$lang$applyTo = (function (arglist__18982){
var args = cljs.core.seq(arglist__18982);
return floormat__delegate(args);
});
floormat.cljs$core$IFn$_invoke$arity$variadic = floormat__delegate;
return floormat;
})()
;
hivez.core.display = (function display(show){if(cljs.core.truth_(show))
{return {};
} else
{return {"display": "none"};
}
});
hivez.core.display_name = (function display_name(hive){return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(hive);
});
hivez.core.display_pos = (function display_pos(hive){var pos = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(hive);return ("Lat: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(hivez.core.floormat.call(null,"%.2f",new cljs.core.Keyword(null,"lat","lat",-580793929).cljs$core$IFn$_invoke$arity$1(pos)))+" Lng: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(hivez.core.floormat.call(null,"%.2f",new cljs.core.Keyword(null,"lng","lng",1667213918).cljs$core$IFn$_invoke$arity$1(pos))));
});
hivez.core.display_origin = (function display_origin(hive){return ("Originated: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"origin","origin",1037372088).cljs$core$IFn$_invoke$arity$1(hive)));
});
hivez.core.display_notes = (function display_notes(hive){return new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(hive);
});
hivez.core.handle_change = (function handle_change(e,data,edit_key,owner){return om.core.transact_BANG_.call(null,data,edit_key,(function (_){return e.target.value;
}));
});
hivez.core.end_edit = (function end_edit(text,owner,cb){om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"editing","editing",1365491601),false);
return cb.call(null,text);
});
hivez.core.editable = (function editable(data,owner,p__18985){var map__18992 = p__18985;var map__18992__$1 = ((cljs.core.seq_QMARK_.call(null,map__18992))?cljs.core.apply.call(null,cljs.core.hash_map,map__18992):map__18992);var opts = map__18992__$1;var on_edit = cljs.core.get.call(null,map__18992__$1,new cljs.core.Keyword(null,"on-edit","on-edit",745088083));var edit_key = cljs.core.get.call(null,map__18992__$1,new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727));if(typeof hivez.core.t18993 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t18993 = (function (edit_key,on_edit,opts,map__18992,p__18985,owner,data,editable,meta18994){
this.edit_key = edit_key;
this.on_edit = on_edit;
this.opts = opts;
this.map__18992 = map__18992;
this.p__18985 = p__18985;
this.owner = owner;
this.data = data;
this.editable = editable;
this.meta18994 = meta18994;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t18993.cljs$lang$type = true;
hivez.core.t18993.cljs$lang$ctorStr = "hivez.core/t18993";
hivez.core.t18993.cljs$lang$ctorPrWriter = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (this__13125__auto__,writer__13126__auto__,opt__13127__auto__){return cljs.core._write.call(null,writer__13126__auto__,"hivez.core/t18993");
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
hivez.core.t18993.prototype.om$core$IRenderState$ = true;
hivez.core.t18993.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (_,p__18996){var self__ = this;
var map__18997 = p__18996;var map__18997__$1 = ((cljs.core.seq_QMARK_.call(null,map__18997))?cljs.core.apply.call(null,cljs.core.hash_map,map__18997):map__18997);var editing = cljs.core.get.call(null,map__18997__$1,new cljs.core.Keyword(null,"editing","editing",1365491601));var ___$1 = this;var text = cljs.core.get.call(null,self__.data,self__.edit_key);return React.DOM.div(null,React.DOM.span({"onClick": ((function (text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (){return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",1365491601),true);
});})(text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key))
, "style": hivez.core.display.call(null,cljs.core.not.call(null,editing))},text),om.dom.input.call(null,{"onBlur": ((function (text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (e){if(cljs.core.truth_(om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",1365491601))))
{return hivez.core.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
});})(text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key))
, "onKeyPress": ((function (text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (p1__18984_SHARP_){if((p1__18984_SHARP_.keyCode === (13)))
{return hivez.core.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
});})(text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key))
, "onChange": ((function (text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (p1__18983_SHARP_){return hivez.core.handle_change.call(null,p1__18983_SHARP_,self__.data,self__.edit_key,self__.owner);
});})(text,___$1,map__18997,map__18997__$1,editing,map__18992,map__18992__$1,opts,on_edit,edit_key))
, "value": text, "style": hivez.core.display.call(null,editing)}));
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
hivez.core.t18993.prototype.om$core$IInitState$ = true;
hivez.core.t18993.prototype.om$core$IInitState$init_state$arity$1 = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",1365491601),false], null);
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
hivez.core.t18993.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (_18995){var self__ = this;
var _18995__$1 = this;return self__.meta18994;
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
hivez.core.t18993.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function (_18995,meta18994__$1){var self__ = this;
var _18995__$1 = this;return (new hivez.core.t18993(self__.edit_key,self__.on_edit,self__.opts,self__.map__18992,self__.p__18985,self__.owner,self__.data,self__.editable,meta18994__$1));
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
hivez.core.__GT_t18993 = ((function (map__18992,map__18992__$1,opts,on_edit,edit_key){
return (function __GT_t18993(edit_key__$1,on_edit__$1,opts__$1,map__18992__$2,p__18985__$1,owner__$1,data__$1,editable__$1,meta18994){return (new hivez.core.t18993(edit_key__$1,on_edit__$1,opts__$1,map__18992__$2,p__18985__$1,owner__$1,data__$1,editable__$1,meta18994));
});})(map__18992,map__18992__$1,opts,on_edit,edit_key))
;
}
return (new hivez.core.t18993(edit_key,on_edit,opts,map__18992__$1,p__18985,owner,data,editable,null));
});
hivez.core.hive_info = (function hive_info(hive,owner){if(typeof hivez.core.t19001 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t19001 = (function (owner,hive,hive_info,meta19002){
this.owner = owner;
this.hive = hive;
this.hive_info = hive_info;
this.meta19002 = meta19002;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t19001.cljs$lang$type = true;
hivez.core.t19001.cljs$lang$ctorStr = "hivez.core/t19001";
hivez.core.t19001.cljs$lang$ctorPrWriter = (function (this__13125__auto__,writer__13126__auto__,opt__13127__auto__){return cljs.core._write.call(null,writer__13126__auto__,"hivez.core/t19001");
});
hivez.core.t19001.prototype.om$core$IRender$ = true;
hivez.core.t19001.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div({"className": "info", "id": "info"},om.core.build.call(null,hivez.core.editable,self__.hive,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"on-edit","on-edit",745088083),hivez.core.handle_change], null)], null)),React.DOM.div({"className": "origin"},hivez.core.display_origin.call(null,self__.hive)),React.DOM.div({"className": "location"},hivez.core.display_pos.call(null,self__.hive)),om.core.build.call(null,hivez.core.editable,self__.hive,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"on-edit","on-edit",745088083),hivez.core.handle_change], null)], null)));
});
hivez.core.t19001.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19003){var self__ = this;
var _19003__$1 = this;return self__.meta19002;
});
hivez.core.t19001.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19003,meta19002__$1){var self__ = this;
var _19003__$1 = this;return (new hivez.core.t19001(self__.owner,self__.hive,self__.hive_info,meta19002__$1));
});
hivez.core.__GT_t19001 = (function __GT_t19001(owner__$1,hive__$1,hive_info__$1,meta19002){return (new hivez.core.t19001(owner__$1,hive__$1,hive_info__$1,meta19002));
});
}
return (new hivez.core.t19001(owner,hive,hive_info,null));
});
hivez.core.app = (function app(data,owner){if(typeof hivez.core.t19007 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.core.t19007 = (function (owner,data,app,meta19008){
this.owner = owner;
this.data = data;
this.app = app;
this.meta19008 = meta19008;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.core.t19007.cljs$lang$type = true;
hivez.core.t19007.cljs$lang$ctorStr = "hivez.core/t19007";
hivez.core.t19007.cljs$lang$ctorPrWriter = (function (this__13125__auto__,writer__13126__auto__,opt__13127__auto__){return cljs.core._write.call(null,writer__13126__auto__,"hivez.core/t19007");
});
hivez.core.t19007.prototype.om$core$IRender$ = true;
hivez.core.t19007.prototype.om$core$IRender$render$arity$1 = (function (this__14155__auto__){var self__ = this;
var this__14155__auto____$1 = this;return React.DOM.div({"className": "content-liner"},React.DOM.div({"className": ("flex-container"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"orientation","orientation",623557579).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"portrait","portrait",-9810007)))?" column":" row")))},React.DOM.div({"className": ("one"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"orientation","orientation",623557579).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"portrait","portrait",-9810007)))?" vert":" flat")))},om.core.build.call(null,hivez.core.goog_map,self__.data)),React.DOM.div({"className": ("two"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"orientation","orientation",623557579).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"portrait","portrait",-9810007)))?" vert":" flat")))},om.core.build.call(null,hivez.core.hive_info,cljs.core.get.call(null,new cljs.core.Keyword(null,"hives","hives",-1303225483).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(self__.data))))));
});
hivez.core.t19007.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19009){var self__ = this;
var _19009__$1 = this;return self__.meta19008;
});
hivez.core.t19007.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19009,meta19008__$1){var self__ = this;
var _19009__$1 = this;return (new hivez.core.t19007(self__.owner,self__.data,self__.app,meta19008__$1));
});
hivez.core.__GT_t19007 = (function __GT_t19007(owner__$1,data__$1,app__$1,meta19008){return (new hivez.core.t19007(owner__$1,data__$1,app__$1,meta19008));
});
}
return (new hivez.core.t19007(owner,data,app,null));
});
hivez.core.main = (function main(){window.addEventListener("resize",hivez.core.handleOrientation);
return om.core.root.call(null,hivez.core.app,hivez.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("content")], null));
});

//# sourceMappingURL=core.js.map