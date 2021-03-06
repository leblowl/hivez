(ns lokate.map
  (:require [cljs.core.async :as async]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [clojure.set :as set]
            [lokate.util :as u]))

(-> js/L .-AwesomeMarkers .-Icon .-prototype .-options .-prefix (set! "icon"))

(def green-ico  (-> js/L .-AwesomeMarkers (.icon #js {:icon "radio-button-off"
                                                      :markerColor "lightgreen"
                                                      :iconColor "#444444"})))
(def yellow-ico (-> js/L .-AwesomeMarkers (.icon #js {:icon "radio-button-off"
                                                      :markerColor "beige"
                                                      :iconColor "#444444"})))
(def red-ico    (-> js/L .-AwesomeMarkers (.icon #js {:icon "radio-button-off"
                                                      :markerColor "lightred"
                                                      :iconColor "#444444"})))

(def ico-map
  {"green"  green-ico
   "yellow" yellow-ico
   "red"    red-ico})

(defn reset-ico [icon]
  (-> icon .-options .-icon (set! "radio-button-off"))
  icon)

(defn activate-ico [icon]
  (-> icon .-options .-icon (set! "radio-button-on"))
  icon)

(defn reset-markers [owner]
  (let [units (om/get-state owner :units)]
    (dorun
      (map #(.setIcon (:marker %) (reset-ico (:icon %))) (vals units)))))

(defn activate-marker
  [owner id]
  (let [l-map (om/get-state owner :map)
        active (om/get-state owner [:units id])]
    (when active
      (do (.setIcon (:marker active) (activate-ico (:icon active)))
          (.panTo l-map (.getLatLng (:marker active)))))))

(defn mark-it!
  [unit lmap evt-bus]
  (let [icon (get ico-map (:status unit))
        marker (-> js/L
                 (.marker (clj->js (:latlng unit)) #js {:icon icon})
                 (.addTo lmap))]

    (.on marker "click"
      #(do
         (async/put! evt-bus [:drawer :set :open? true])
         (u/route! evt-bus :unit (:cid unit) (:id unit) :info)))

    (assoc unit :marker marker :icon icon)))

(defn add-markers [units owner]
  (let [lmap (om/get-state owner :map)
        evt-bus (om/get-shared owner :event-bus)]
    (om/update-state! owner :units
      (fn [m] (merge m (u/mmap #(mark-it! % lmap evt-bus) units))))))

(defn delete-markers [owner keys]
  (let [l-map (om/get-state owner :map)]
    (dorun
      (map #(->>
              (om/get-state owner [:units % :marker])
              (.removeLayer l-map))
        keys)))
  (om/update-state! owner :markers
    #(apply dissoc % keys)))

(defn add-group [owner places opts]
  (map #({:name (:name %) :group (js/L.MarkerClusterGroup.)})))

(defn add-unit [evt-bus evt]
  (async/put! evt-bus
    [:app :add-unit [(.-lat (.-latlng evt))
                     (.-lng (.-latlng evt))]]))

(defn init-map [tile-url tile-attr owner]
  (when-let [l-map (om/get-state owner :map)]
    (.remove l-map))
  (let [l-map (-> js/L
                (.map "map"
                  (clj->js {:zoomControl false
                            :contextmenu true
                            :contextmenuWidth 140
                            :contextmenuAnchor [-70 -35]
                            :contextmenuItems [
                              {:text "Add unit"
                               :iconCls "icon-pin"
                               :callback #(add-unit (om/get-shared owner :event-bus) %)}
                            ]}))
                (.setView (om/get-state owner :center) 9))]

    (-> l-map .-contextmenu .removeHooks)

    (-> js/L
      (.tileLayer (:value tile-url) #js {:attribution (:value tile-attr)})
      (.addTo l-map))

    (.on l-map "contextmenu" #())

    (if navigator.geolocation
      (.getCurrentPosition navigator.geolocation
        (fn [pos]
          (let [initialLoc #js [(.-coords.latitude pos)
                                (.-coords.longitude pos)]]
            (.setView l-map initialLoc 9))))
      (println "Hey, where'd you go!? Geolocation Disabled."))

    (om/set-state! owner :map l-map)))

(defn l-map [[path units {:keys [tile-url tile-attr]}] owner]
  (reify
    om/IInitState
    (init-state [_]
      {:center #js [0 0]
       :evt-timeout nil
       :units {}
       :map nil})

    om/IWillReceiveProps
    (will-receive-props [this [path units {:keys [tile-url tile-attr]}]]
      (let [current-url   (get-in (om/get-props owner) [2 :tile-url])
            current-attr  (get-in (om/get-props owner) [2 :tile-attr])
            next-units    (set units)
            current-units (set (second (om/get-props owner)))
            to-add (set/difference next-units current-units)
            to-delete (set/difference current-units next-units)]

        (when-not (and (= current-url tile-url) (= current-attr tile-attr))
          (init-map tile-url tile-attr owner)
          (add-markers units owner))

        (delete-markers owner (keys to-delete))
        (add-markers to-add owner)
        (reset-markers owner)

        (let [[route args] path]
          (when (= route :unit)
            (let [[cid uid page] args]
              (activate-marker owner uid))))

        ; if a collection is selected, allow map context menu
        (let [cm (.-contextmenu (om/get-state owner :map))]
          (if (= (first path) :collection)
            (.addHooks cm)
            (.removeHooks cm)))))

    om/IDidMount
    (did-mount [_]
      (init-map tile-url tile-attr owner)
      (add-markers units owner))

    om/IRenderState
    (render-state [_ {:keys [markers]}]
      (dom/div #js {:id "map"}))))
