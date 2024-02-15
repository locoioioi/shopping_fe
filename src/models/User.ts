class User {
  id: number;
  firstName: string;
  lastName: string;
  point: number;
  roles: string[];
  username: string;
  cartId: number;
  wishListId: number;
  orderlist: number[];
  constructor(id: number, firstName: string, lastName: string, point: number, roles: string[], username: string, cartId: number, wishListId: number, orderlist: number[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.point = point;
    this.roles = roles;
    this.username = username;
    this.cartId = cartId;
    this.wishListId = wishListId;
    this.orderlist = orderlist;
  }
}

export default User;