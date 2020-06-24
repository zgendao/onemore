(ns app.views
  (:require
    [reagent.core :as reagent :refer [atom]]
    [cljs.core.async :refer [go]]
    [async-interop.interop :refer [<p!]]
    ["@harmony-js/core" :refer [Harmony Blockchain TruffleProvider ExtensionType]]
    ))

(def app-state (atom {}))

(when (get (js->clj ExtensionType) "MathWallet")
  (go
    (let [account (js->clj (<p! (.getAccount (.-harmony js/window))))]
      (swap! app-state assoc :account account))))

(defn app []
  [:div {:style {:display "flex" :align-items "center" :flex-direction "column"}}
   [:h2 "Welcome "(get-in @app-state [:account "name"])]
   [:h3 {:style {:font-weight 400}} "Your address is "[:b (get-in @app-state [:account "address"])]]
   ])
