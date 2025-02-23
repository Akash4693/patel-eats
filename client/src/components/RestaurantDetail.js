"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useRestaurantStore_1 = require("@/store/useRestaurantStore");
var AvailableMenu_1 = require("./AvailableMenu");
var badge_1 = require("./ui/badge");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var RestaurantDetail = function () {
    var params = (0, react_router_dom_1.useParams)();
    var _a = (0, useRestaurantStore_1.useRestaurantStore)(), singleRestaurant = _a.singleRestaurant, getSingleRestaurant = _a.getSingleRestaurant;
    (0, react_1.useEffect)(function () {
        getSingleRestaurant(params.id);
    }, [params.id]);
    return (<div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img src={(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.imageUrl) || "Loading..."} alt="res_image" className="object-cover w-full h-full rounded-lg shadow-lg"/>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">{(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.restaurantName) || "Loading..."}</h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.cuisines.map(function (cuisine, idx) { return (<badge_1.Badge key={idx}>{cuisine}</badge_1.Badge>); })}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <lucide_react_1.Timer className="w-5 h-5"/>
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]">{(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.deliveryTime) || "NA"} mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
       {(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.menus) && <AvailableMenu_1.default menus={singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.menus}/>} 
      </div>
    </div>);
};
exports.default = RestaurantDetail;
