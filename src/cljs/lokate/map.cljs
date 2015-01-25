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
(defn reset-ico [icon]
  (-> icon .-options .-icon (set! "radio-button-off"))
  icon)

(defn activate-ico [icon]
  (-> icon .-options .-icon (set! "radio-button-on"))
  icon)

(defn reset-markers [owner]
  (let [markers (om/get-state owner :markers)]
    (dorun
      (map #(.setIcon (:marker %) (reset-ico (:icon %))) (vals markers)))))

(defn activate-marker
  [owner id]
  (let [l-map (om/get-state owner :map)
        active (om/get-state owner [:markers id])]
    (when active
      (do (.setIcon (:marker active) (activate-ico (:icon active)))
          (.panTo l-map (.getLatLng (:marker active)))))))

(defn mark-it!
  [unit drawer lmap evt-bus]
  (let [icon green-ico
        marker (-> js/L
                 (.marker (clj->js (:latlng unit)) #js {:icon icon})
                 (.addTo lmap))]

    (.on marker "click"
      #(do
         (om/update! drawer :open? true)
         (async/put! evt-bus
           [:set-path :unit (:cid unit) (:id unit) :info])))

    (assoc unit :marker marker :icon icon)))

(defn add-markers [drawer units owner]
  (let [lmap (om/get-state owner :map)
        evt-bus (om/get-shared owner :event-bus)]
    (om/update-state! owner :units
      (fn [m] (merge m (u/mmap #(mark-it! % drawer lmap evt-bus) units))))))

(defn delete-markers [owner keys]
  (let [l-map (om/get-state owner :map)]
    (dorun
      (map #(->>
              (om/get-state owner [:markers % :marker])
              (.removeLayer l-map))
        keys)))
  (om/update-state! owner :markers
    #(apply dissoc % keys)))

(defn add-group [owner places opts]
  (map #({:name (:name %) :group (js/L.MarkerClusterGroup.)})))

(defn add-unit [owner evt]
  (async/put! (:event-bus (om/get-shared owner))
    [:add-unit [(.-lat (.-latlng evt))
                (.-lng (.-latlng evt))]]))

(defn l-map [[drawer path units] owner]
  (reify
    om/IInitState
    (init-state [_]
      {:center #js [0 0]
       :evt-timeout nil
       :units {}
       :map nil})

    om/IWillReceiveProps
    (will-receive-props [this next-props]
      (let [next-units    (set next-props)
            current-units (set (om/get-props owner))
            to-add (set/difference next-units current-units)
            to-delete (set/difference current-units next-units)]

        ;(delete-markers owner (keys to-delete))
        ;(add-markers data owner to-add)
        ;(reset-markers owner)
        ;(when-let [u-id (-> next-props :route :opts :u-id)]
         ; (activate-marker owner u-id))

        ; if a collection is selected, allow map context menu
        (let [cm (.-contextmenu (om/get-state owner :map))]
          (if (= (ffirst next-props) :collection)
            (.addHooks cm)
            (.removeHooks cm)))))

    om/IDidMount
    (did-mount [_]
      (let [tile-url "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            tile-attr "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            l-map (-> js/L
                    (.map "map"
                      (clj->js {:zoomControl false
                                :contextmenu true
                                :contextmenuWidth 140
                                :contextmenuAnchor [-70 -35]
                                :contextmenuItems [{:text "Add unit"
                                                    :callback #(add-unit owner %)}]}))
                    (.setView (om/get-state owner :center) 9))]

        (-> l-map .-contextmenu .removeHooks)

        (-> js/L
          (.tileLayer tile-url #js {:attribution tile-attr})
          (.addTo l-map))

        (.on l-map "contextmenu" #())

        (if navigator.geolocation
          (.getCurrentPosition navigator.geolocation
            (fn [pos]
             (let [initialLoc #js [(.-coords.latitude pos)
                                   (.-coords.longitude pos)]]
               (.setView l-map initialLoc 9))))
          (println "Hey, where'd you go!? Geolocation Disabled"))


        (om/set-state! owner :map l-map)
        (add-markers drawer units owner)))

    om/IRenderState
    (render-state [_ {:keys [markers]}]
      (dom/div #js {:id "map"}))))
