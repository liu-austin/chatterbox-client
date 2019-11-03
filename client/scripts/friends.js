var Friends = {

  toggleStatus: function(username) {
    if (Friends[username] === undefined) {
      Friends[username] = true;
    } else {
      Friends[username] = !Friends[username];
    }
    App.fetch(App.stopSpinner);
  }
};