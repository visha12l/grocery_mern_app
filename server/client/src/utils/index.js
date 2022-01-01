import _ from "lodash";
import { authServer } from "../services";

_.mixin({
  updateCartDataOnServer: async function (id, updatedCartData) {
    const result = await authServer.post(`/users/cart`, {
      id,
      cart: updatedCartData
    });
  }
});
