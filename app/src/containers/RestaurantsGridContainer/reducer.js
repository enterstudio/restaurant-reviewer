import {
  RESTAURANTS_LOADING_INITIATION,
  RESTAURANTS_LOADING_SUCCESS,
  RESTAURANTS_LOADING_FAILURE,
  RESTAURANT_CATEGORIES,
  CLEAR_RESTAURANT_ERRORS,
  RESTAURANT_LOCATIONS,
  SET_FILTER_LOCATION,
  SET_FILTER_RATING,
  SET_FILTER_CATEGORY,
  APPLY_RESTAURANTS_FILTERS,
  CLEAR_RESTAURANTS_FILTERS,
} from './constants';

const initialState = {
  items: [],
  filteredItems: [],
  errors: [],
  isLoading: false,
  categoryFilter: 'All',
  ratingFilter: 'All',
  locationFilter: 'All',
  appliedFilter: {
    isApplied: false,
  },
  categories: [],
  locations: [],
  ratings: [
    {
      id: 0,
      value: 'All',
    },
    {
      id: 1,
      value: '1 Star',
    },
    {
      id: 2,
      value: '2 Star',
    },
    {
      id: 3,
      value: '3 Star',
    },
    {
      id: 4,
      value: '4 Star',
    },
    {
      id: 5,
      value: '5 Star',
    },
  ],
};

const filteredItems = (state = [], action, previousState) => {
  switch (action.type) {
    case APPLY_RESTAURANTS_FILTERS:
      return previousState.items.filter(i =>
        previousState.categoryFilter !== 'All' ?
          i.type.name === previousState.categoryFilter : true
      ).filter(i =>
        previousState.ratingFilter !== 'All' ?
          i.average_rating === parseInt(previousState.ratingFilter, 10) : true
      ).filter(i =>
        previousState.locationFilter !== 'All' ?
          i.city === previousState.locationFilter : true
      );
    default:
      return state;
  }
};

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANTS_LOADING_INITIATION:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RESTAURANTS_LOADING_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.restaurants,
        filteredItems: action.restaurants,
      });
    case RESTAURANT_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories,
      });
    case RESTAURANT_LOCATIONS:
      return Object.assign({}, state, {
        locations: action.locations.map((i, index) => ({
          id: index,
          value: i,
        })),
      });
    case RESTAURANTS_LOADING_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: [...state.errors, action.error],
      });
    case CLEAR_RESTAURANT_ERRORS:
      return Object.assign({}, state, {
        errors: [],
      });
    case SET_FILTER_LOCATION:
      return Object.assign({}, state, {
        locationFilter: action.location,
      });
    case SET_FILTER_RATING:
      return Object.assign({}, state, {
        ratingFilter: action.rating,
      });
    case SET_FILTER_CATEGORY:
      return Object.assign({}, state, {
        categoryFilter: action.category,
      });
    case APPLY_RESTAURANTS_FILTERS:
      return Object.assign({}, state, {
        filteredItems: filteredItems(state.filteredItems, action, state),
        appliedFilter: {
          isApplied: true,
        },
      });
    case CLEAR_RESTAURANTS_FILTERS:
      return Object.assign({}, state, {
        locationFilter: 'All',
        ratingFilter: 'All',
        categoryFilter: 'All',
        filteredItems: state.items,
        appliedFilter: {
          isApplied: false,
        },
      });
    default:
      return state;
  }
};

export default restaurants;
