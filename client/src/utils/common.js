export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened ? "-100%" : "0" };
  }
  return {};
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavourites = (id, favourites = []) => {
  if (!Array.isArray(favourites)) {
    console.error('Expected favourites to be an array');
    return [];
  }

  if (favourites.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites = []) => {
  if (!Array.isArray(favourites)) {
    console.error('Expected favourites to be an array');
    return "white";
  }
  return favourites.includes(id) ? "#fa3e5f" : "white";
};

export const validateString = (value) => {
  if (value == null || value.length < 3) {
    return "Must have at least 3 characters";
  }
  return null;
};
