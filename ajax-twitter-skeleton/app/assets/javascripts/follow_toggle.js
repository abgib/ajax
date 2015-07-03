$.FollowToggle = function (el) {
  this.$el = $(el);
  this.$userId = $(this.$el.data("user-id"));
  this.$followState = $(this.$el.data("initial-follow-state"));

  this.$el.text(this.render());
};

$.FollowToggle.prototype.render = function () {
  var text;
  if (this.$followState) {
    text = "Unfollow!";
  } else {
    text = "Follow!"
  };

  return text;
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
