$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$searchInput = this.$el.find("input");
  this.$users = this.$el.find(".users");

  // this.render();
  this.$el.on("input", "input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.renderResults = function (fetchedUsers) {
  //this.$users = [];
  var li;

  fetchedUsers.forEach ( function (user) {
    li = "<li>" + user.name + "</li>";
    this.$users.append(li);
  });
};

$.UsersSearch.prototype.handleInput = function () {
  // event.preventDefault();
  //
  // this.render();
  //
  var $searchTerm = $(event.currentTarget);
  this.searchResults = this.$el.data("search-results");

  $.ajax({
    method: "get",
    url: "/users/search",
    data: { "query": this.$searchInput.val() },
    dataType: "json",
    success: function () {
      this.renderResults(this.searchResults);
    }.bind(this)
  });
};


$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
