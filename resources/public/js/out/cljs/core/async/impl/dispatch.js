// Compiled by ClojureScript 0.0-2371
goog.provide('cljs.core.async.impl.dispatch');
goog.require('cljs.core');
goog.require('goog.async.nextTick');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.buffers');
cljs.core.async.impl.dispatch.tasks = cljs.core.async.impl.buffers.ring_buffer((32));
cljs.core.async.impl.dispatch.running_QMARK_ = false;
cljs.core.async.impl.dispatch.queued_QMARK_ = false;
cljs.core.async.impl.dispatch.TASK_BATCH_SIZE = (1024);
cljs.core.async.impl.dispatch.process_messages = (function process_messages(){cljs.core.async.impl.dispatch.running_QMARK_ = true;
cljs.core.async.impl.dispatch.queued_QMARK_ = false;
var count_27485 = (0);while(true){
var m_27486 = cljs.core.async.impl.dispatch.tasks.pop();if((m_27486 == null))
{} else
{(m_27486.cljs$core$IFn$_invoke$arity$0 ? m_27486.cljs$core$IFn$_invoke$arity$0() : m_27486.call(null));
if((count_27485 < cljs.core.async.impl.dispatch.TASK_BATCH_SIZE))
{{
var G__27487 = (count_27485 + (1));
count_27485 = G__27487;
continue;
}
} else
{}
}
break;
}
cljs.core.async.impl.dispatch.running_QMARK_ = false;
if((cljs.core.async.impl.dispatch.tasks.length > (0)))
{return (cljs.core.async.impl.dispatch.queue_dispatcher.cljs$core$IFn$_invoke$arity$0 ? cljs.core.async.impl.dispatch.queue_dispatcher.cljs$core$IFn$_invoke$arity$0() : cljs.core.async.impl.dispatch.queue_dispatcher.call(null));
} else
{return null;
}
});
cljs.core.async.impl.dispatch.queue_dispatcher = (function queue_dispatcher(){if(cljs.core.truth_((function (){var and__3628__auto__ = cljs.core.async.impl.dispatch.queued_QMARK_;if(cljs.core.truth_(and__3628__auto__))
{return cljs.core.async.impl.dispatch.running_QMARK_;
} else
{return and__3628__auto__;
}
})()))
{return null;
} else
{cljs.core.async.impl.dispatch.queued_QMARK_ = true;
var G__27489 = cljs.core.async.impl.dispatch.process_messages;return goog.async.nextTick(G__27489);
}
});
cljs.core.async.impl.dispatch.run = (function run(f){cljs.core.async.impl.dispatch.tasks.unbounded_unshift(f);
return cljs.core.async.impl.dispatch.queue_dispatcher();
});
cljs.core.async.impl.dispatch.queue_delay = (function queue_delay(f,delay){var G__27492 = f;var G__27493 = delay;return setTimeout(G__27492,G__27493);
});
