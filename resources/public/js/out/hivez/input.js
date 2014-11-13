// Compiled by ClojureScript 0.0-2371
goog.provide('hivez.input');
goog.require('cljs.core');
goog.require('hivez.util');
goog.require('hivez.util');
goog.require('goog.string');
goog.require('goog.string');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
hivez.input.input = (function input(data,owner,p__33002){var map__33009 = p__33002;var map__33009__$1 = ((cljs.core.seq_QMARK_.call(null,map__33009))?cljs.core.apply.call(null,cljs.core.hash_map,map__33009):map__33009);var opts = map__33009__$1;var on_key_down = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765));var on_edit = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"on-edit","on-edit",745088083));var edit_key = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"edit-key","edit-key",-1833788727));var className = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"className","className",-1983287057));var id = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"id","id",-1388402092));if(typeof hivez.input.t33010 !== 'undefined')
{} else
{
/**
* @constructor
*/
hivez.input.t33010 = (function (input,on_key_down,owner,data,map__33009,edit_key,p__33002,className,on_edit,id,opts,meta33011){
this.input = input;
this.on_key_down = on_key_down;
this.owner = owner;
this.data = data;
this.map__33009 = map__33009;
this.edit_key = edit_key;
this.p__33002 = p__33002;
this.className = className;
this.on_edit = on_edit;
this.id = id;
this.opts = opts;
this.meta33011 = meta33011;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
hivez.input.t33010.cljs$lang$type = true;
hivez.input.t33010.cljs$lang$ctorStr = "hivez.input/t33010";
hivez.input.t33010.cljs$lang$ctorPrWriter = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (this__13123__auto__,writer__13124__auto__,opt__13125__auto__){return cljs.core._write.call(null,writer__13124__auto__,"hivez.input/t33010");
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.t33010.prototype.om$core$IRenderState$ = true;
hivez.input.t33010.prototype.om$core$IRenderState$render_state$arity$2 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_,p__33013){var self__ = this;
var map__33014 = p__33013;var map__33014__$1 = ((cljs.core.seq_QMARK_.call(null,map__33014))?cljs.core.apply.call(null,cljs.core.hash_map,map__33014):map__33014);var exit_type = cljs.core.get.call(null,map__33014__$1,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934));var ___$1 = this;return React.DOM.div({"id": "input-wrapper"},React.DOM.div({"dangerouslySetInnerHTML": {"__html": self__.edit_key.call(null,self__.data)}, "onBlur": ((function (___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),"out");
return setTimeout(((function (___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){return self__.on_edit.call(null,self__.data,self__.edit_key,self__.owner);
});})(___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
,(100));
});})(___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
, "onKeyDown": self__.on_key_down, "contentEditable": "true", "style": hivez.util.display.call(null,cljs.core.not.call(null,exit_type)), "className": self__.className, "ref": self__.edit_key, "id": self__.id}),React.DOM.div({"onClick": ((function (___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),"btn");
return setTimeout(((function (___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (){return self__.on_edit.call(null,self__.data,self__.edit_key,self__.owner);
});})(___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
,(100));
});})(___$1,map__33014,map__33014__$1,exit_type,map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
, "style": hivez.util.display.call(null,!(cljs.core._EQ_.call(null,exit_type,"out"))), "id": "input-ok"},React.DOM.span({"id": "input-ok-mark"},goog.string.unescapeEntities("&#10003;"))));
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.t33010.prototype.om$core$IDidMount$ = true;
hivez.input.t33010.prototype.om$core$IDidMount$did_mount$arity$1 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_){var self__ = this;
var ___$1 = this;return om.core.get_node.call(null,self__.owner,self__.edit_key).focus();
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.t33010.prototype.om$core$IInitState$ = true;
hivez.input.t33010.prototype.om$core$IInitState$init_state$arity$1 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exit-type","exit-type",-252538934),null], null);
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.t33010.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_33012){var self__ = this;
var _33012__$1 = this;return self__.meta33011;
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.t33010.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function (_33012,meta33011__$1){var self__ = this;
var _33012__$1 = this;return (new hivez.input.t33010(self__.input,self__.on_key_down,self__.owner,self__.data,self__.map__33009,self__.edit_key,self__.p__33002,self__.className,self__.on_edit,self__.id,self__.opts,meta33011__$1));
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
hivez.input.__GT_t33010 = ((function (map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id){
return (function __GT_t33010(input__$1,on_key_down__$1,owner__$1,data__$1,map__33009__$2,edit_key__$1,p__33002__$1,className__$1,on_edit__$1,id__$1,opts__$1,meta33011){return (new hivez.input.t33010(input__$1,on_key_down__$1,owner__$1,data__$1,map__33009__$2,edit_key__$1,p__33002__$1,className__$1,on_edit__$1,id__$1,opts__$1,meta33011));
});})(map__33009,map__33009__$1,opts,on_key_down,on_edit,edit_key,className,id))
;
}
return (new hivez.input.t33010(input,on_key_down,owner,data,map__33009__$1,edit_key,p__33002,className,on_edit,id,opts,null));
});

//# sourceMappingURL=input.js.map