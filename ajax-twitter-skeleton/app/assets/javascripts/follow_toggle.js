$.FollowToggle = function (el) {
  
};

$.FollowToggle.prototype.method1 = function () {
// ...
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
