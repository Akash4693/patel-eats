"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var FilterPage_1 = require("./FilterPage");
var input_1 = require("./ui/input");
var react_1 = require("react");
var button_1 = require("./ui/button");
var badge_1 = require("./ui/badge");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var aspect_ratio_1 = require("./ui/aspect-ratio");
var skeleton_1 = require("./ui/skeleton");
var useRestaurantStore_1 = require("@/store/useRestaurantStore");
var SearchPage = function () {
    var params = (0, react_router_dom_1.useParams)();
    var _a = (0, react_1.useState)(""), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = (0, useRestaurantStore_1.useRestaurantStore)(), loading = _b.loading, searchedRestaurant = _b.searchedRestaurant, searchRestaurant = _b.searchRestaurant, setAppliedFilter = _b.setAppliedFilter, appliedFilter = _b.appliedFilter;
    (0, react_1.useEffect)(function () {
        searchRestaurant(params.text, searchQuery, appliedFilter);
    }, [params.text, appliedFilter]);
    return (<div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage_1.default />
        <div className="flex-1">
          {/* Search Input Field  */}
          <div className="flex items-center gap-2">
            <input_1.Input type="text" value={searchQuery} placeholder="Search by restaurant & cuisines" onChange={function (e) { return setSearchQuery(e.target.value); }}/>
            <button_1.Button onClick={function () {
            return searchRestaurant(params.text, searchQuery, appliedFilter);
        }} className="bg-orange hover:bg-hoverOrange">
              Search
            </button_1.Button>
          </div>
          {/* Searched Items display here  */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({searchedRestaurant === null || searchedRestaurant === void 0 ? void 0 : searchedRestaurant.data.length}) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map(function (selectedFilter, idx) { return (<div key={idx} className="relative inline-flex items-center max-w-full">
                      <badge_1.Badge className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap" variant="outline">
                        {selectedFilter}
                      </badge_1.Badge>
                      <lucide_react_1.X onClick={function () { return setAppliedFilter(selectedFilter); }} size={16} className="absolute text-[#D19254] right-1 hover:cursor-pointer"/>
                    </div>); })}
              </div>
            </div>
            {/* Restaurant Cards  */}
            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (<SearchPageSkeleton />) : !loading && (searchedRestaurant === null || searchedRestaurant === void 0 ? void 0 : searchedRestaurant.data.length) === 0 ? (<NoResultFound searchText={params.text}/>) : (searchedRestaurant === null || searchedRestaurant === void 0 ? void 0 : searchedRestaurant.data.map(function (restaurant) { return (<card_1.Card key={restaurant._id} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <aspect_ratio_1.AspectRatio ratio={16 / 6}>
                        <img src={restaurant.imageUrl} alt="" className="w-full h-full object-cover"/>
                      </aspect_ratio_1.AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <card_1.CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <lucide_react_1.MapPin size={16}/>
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <lucide_react_1.Globe size={16}/>
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cuisines.map(function (cuisine, idx) { return (<badge_1.Badge key={idx} className="font-medium px-2 py-1 rounded-full shadow-sm">
                              {cuisine}
                            </badge_1.Badge>); })}
                      </div>
                    </card_1.CardContent>
                    <card_1.CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <react_router_dom_1.Link to={"/restaurant/".concat(restaurant._id)}>
                        <button_1.Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </button_1.Button>
                      </react_router_dom_1.Link>
                    </card_1.CardFooter>
                  </card_1.Card>); }))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = SearchPage;
var SearchPageSkeleton = function () {
    return (<>
      {__spreadArray([], Array(3), true).map(function (_, index) { return (<card_1.Card key={index} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <div className="relative">
            <aspect_ratio_1.AspectRatio ratio={16 / 6}>
              <skeleton_1.Skeleton className="w-full h-full"/>
            </aspect_ratio_1.AspectRatio>
          </div>
          <card_1.CardContent className="p-4">
            <skeleton_1.Skeleton className="h-8 w-3/4 mb-2"/>
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <skeleton_1.Skeleton className="h-4 w-1/2"/>
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <skeleton_1.Skeleton className="h-4 w-1/2"/>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <skeleton_1.Skeleton className="h-6 w-20"/>
              <skeleton_1.Skeleton className="h-6 w-20"/>
              <skeleton_1.Skeleton className="h-6 w-20"/>
            </div>
          </card_1.CardContent>
          <card_1.CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <skeleton_1.Skeleton className="h-10 w-24 rounded-full"/>
          </card_1.CardFooter>
        </card_1.Card>); })}
    </>);
};
var NoResultFound = function (_a) {
    var searchText = _a.searchText;
    return (<div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <react_router_dom_1.Link to="/">
        <button_1.Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </button_1.Button>
      </react_router_dom_1.Link>
    </div>);
};
