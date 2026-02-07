import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
    minecraftUsername : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Order system types and modules
  module OrderItem {
    public func compareByProductName(item1 : OrderItem, item2 : OrderItem) : Order.Order {
      Text.compare(item1.product, item2.product);
    };

    public func compareByUnitPrice(item1 : OrderItem, item2 : OrderItem) : Order.Order {
      Nat.compare(item1.unitPriceINR, item2.unitPriceINR);
    };
  };

  public type OrderItem = {
    product : Text;
    unitPriceINR : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Nat;
    buyer : Text;
    upiRef : Text;
    totalINR : Nat;
    timestamp : Nat;
    items : [OrderItem];
    owner : Principal;
  };

  public type OrderPayload = {
    buyer : Text;
    upiRef : Text;
    items : [OrderItem];
  };

  public type OrderConfirmation = {
    id : Nat;
    buyer : Text;
    upiRef : Text;
    totalINR : Nat;
    timestamp : Nat;
    items : [OrderItem];
  };

  var nextOrderId = 1;
  let orders = Map.empty<Nat, Order>();

  func calculateTotal(items : [OrderItem]) : Nat {
    items.foldLeft(0, func(total, item) { total + (item.unitPriceINR * item.quantity) });
  };

  func toOrderConfirmation(order : Order) : OrderConfirmation {
    {
      id = order.id;
      buyer = order.buyer;
      upiRef = order.upiRef;
      totalINR = order.totalINR;
      timestamp = order.timestamp;
      items = order.items;
    };
  };

  public shared ({ caller }) func createOrder(payload : OrderPayload) : async Nat {
    // Only authenticated users can create orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    let timestamp = Time.now().toNat();
    let totalINR = calculateTotal(payload.items);
    let order : Order = {
      id = nextOrderId;
      upiRef = payload.upiRef;
      items = payload.items;
      buyer = payload.buyer;
      timestamp;
      totalINR;
      owner = caller;
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getOrderById(orderId : Nat) : async ?OrderConfirmation {
    // Only the order owner or admin can view order details
    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) {
        if (caller != order.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        ?toOrderConfirmation(order);
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderConfirmation] {
    // Admin-only function
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray().map(toOrderConfirmation);
  };

  public query ({ caller }) func getOrdersByBuyer(buyer : Text) : async [OrderConfirmation] {
    // Users can only view their own orders, admins can view any
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    let filteredOrders = orders.values().toArray().filter(func(order) {
      order.buyer == buyer and (order.owner == caller or AccessControl.isAdmin(accessControlState, caller))
    });
    filteredOrders.map(toOrderConfirmation);
  };

  public query ({ caller }) func getItemsByProduct(product : Text) : async [OrderItem] {
    // Admin-only analytics function
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view product analytics");
    };

    let allItems = List.empty<OrderItem>();

    for (order in orders.values()) {
      let filteredItems = order.items.filter(func(item) { item.product == product });
      allItems.addAll(filteredItems.values());
    };

    allItems.toArray();
  };

  public query ({ caller }) func getBestSellingProducts() : async [(Text, Nat)] {
    // Admin-only analytics function
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view sales analytics");
    };

    let productSales = Map.empty<Text, Nat>();

    for (order in orders.values()) {
      for (item in order.items.values()) {
        let currentTotal = switch (productSales.get(item.product)) {
          case (null) { 0 };
          case (?total) { total };
        };
        productSales.add(item.product, currentTotal + (item.quantity * item.unitPriceINR));
      };
    };

    productSales.toArray();
  };
};
