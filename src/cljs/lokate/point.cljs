(ns lokate.point
  (:require-macros [cljs.core.async.macros :refer [go go-loop alt!]])
  (:require [cljs.core.async :refer [put! <! >! chan timeout]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [lokate.components :refer [select-list edit begin-edit]]
            [lokate.util :refer [display display-fade-in fdate-now floormat distance]]
            [lokate.db :refer [db-new db-add db-delete db-get-all]]))

(defn status-color [status]
  (case status
    "green"  "#bbf970"
    "yellow" "#ffc991"
    "red"    "#ff8e7f"))

(defn display-pos [pos]
  (str
    "Lat: " (floormat "%.2f" (:lat pos))
    " Lng: " (floormat "%.2f" (:lng pos))))

(defn display-origin [point]
  (str "Originated: " (:origin point)))

(defn point-controls
  [data owner {:keys [collection-id point-id] :as opts}]
  (om/component
    (let [point (get-in data [:collections collection-id :points point-id])]
      (when (-> point :pos (comp not empty?))
        (dom/div #js {:id "check-in-btn"
                      :className "btn icon-in-alt"
                      :onClick #(put! (om/get-shared owner :nav)
                                  [:route (str "/collections/" collection-id "/points/" point-id)])})))))

(defn point-view
  [data owner {:keys [collection-id point-id] :as opts}]
  (om/component
    (let [point (get-in data [:collections collection-id :points point-id])]
      (dom/div #js {:className "info"}
        (dom/div #js {:id "name-editable"
                      :className "editable"
                      :onClick #(begin-edit data point collection-id)}
          (dom/span #js {:className "editable-title"
                         :data-ph "Unit Name"
                         :dangerouslySetInnerHTML #js {:__html (:name point)}}))
        (dom/div #js {:id "point-content"
                      :className "info-content"}
          (dom/div #js {:className "origin"}
            (display-origin point))
          (if (empty? (:pos point))
            (dom/div #js {:className "location-tip-wrapper"}
              (dom/div #js {:className "location-tip"}
                (dom/span #js {:className "img icon-pin"})
                (dom/span #js {:className "location-tip-msg"}
                  "Right click or long press on the map to add a location to your unit!")))
            (dom/div #js {:className "location"}
              (dom/span #js {:className "img icon-pin status"
                             :style #js {:color (status-color "green")}})
              (dom/span #js {:className "location-lat-lng"} (display-pos (:pos point))))))))))
