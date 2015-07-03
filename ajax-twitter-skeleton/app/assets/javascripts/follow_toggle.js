$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");

  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  var followText;

  if (this.followState === "working") {
    this.$el.prop("disabled", true);
    return;
  }

  if (this.followState !== "unfollowed") {
    followText = "Unfollow!";
  } else if (this.followState !== "followed"){
    followText = "Follow!";
  }

  this.$el.prop("disabled", false);
  this.$el.text(followText);
};

$.FollowToggle.prototype.handleClick = function () {
  event.preventDefault();
  var followMethod;
  var holder;

  if (this.followState === "followed") {
     followMethod = "delete";
     this.followState = "working";
     holder = "unfollowed";
   } else if (this.followState === "unfollowed") {
     followMethod = "post";
     this.followState = "working";
     holder = "followed";
   };

  this.render();

  $.ajax({
    method: followMethod,
    url: "/users/" + this.userId + "/follow",
    dataType: "json",
    success: function () {
      this.followState = holder;
      this.render();
    }.bind(this)
  });
};


$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
