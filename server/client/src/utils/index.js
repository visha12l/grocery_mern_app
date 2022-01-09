import _ from "lodash";

_.mixin({
  formatDate: function (timeStamp) {
    const date = new Date(timeStamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
});
