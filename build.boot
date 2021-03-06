(set-env!
        :target-path "target"
        :resource-paths #{"resources"}
        :source-paths #{"src/clj" "src/cljs" "../boot-cljs/src"}
        :dependencies '[;[adzerk/boot-cljs "0.0-2629-9"]
                        [adzerk/boot-cljs-repl "0.1.8"]
                        [adzerk/boot-reload "0.2.4"]
                        [org.clojure/clojure "1.6.0"]
                        [org.clojure/clojurescript "0.0-2727"]
                        [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                        [org.omcljs/om "0.8.6"]
                        [sablono "0.3.1"]
                        [org.clojars.leanpixel/cljs-uuid-utils "1.0.0-SNAPSHOT"]
                        [com.andrewmcveigh/cljs-time "0.3.0"]
                        [ring "1.3.1"]
                        [compojure "1.2.1"]
                        [http-kit "2.1.19"]])

(require
  '[adzerk.boot-cljs       :refer :all]
  '[adzerk.boot-reload     :refer :all]
  '[adzerk.boot-cljs-repl  :refer :all]
  '[lokate.server             :as server]
  '[ring.middleware.reload    :as reload]
  '[ring.middleware.file      :as file]
  '[ring.middleware.file-info :as file-info])

(defn dev-handler []
  (-> server/handler (reload/wrap-reload)
                     (file/wrap-file "target/public")
                     (file-info/wrap-file-info)))

(deftask dev-cljs
  "Build cljs for development."
[]
(comp (watch)
      (speak)
      (reload :on-jsload (symbol "lokate.app/go!"))
      (cljs :source-map true
            :optimizations :none
            :output-to "public/js/main.js")))

(deftask dev-serve
  "Start server for development."
[]
(with-post-wrap fileset (server/run (dev-handler))))

(deftask dev
  "Build cljs and start server for development."
[]
(comp
      (dev-cljs)
      (dev-serve)))

(deftask prod
  "Build application uberjar with http-kit main."
[]
(comp (cljs :unified true
            :source-map true
            :optimizations :none
            :output-to "public/js/main.js")
      (aot :all true)
      (uber)
      (jar :file "lokate.jar" :main 'lokate.server)))
