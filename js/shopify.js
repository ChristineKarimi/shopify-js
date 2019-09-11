// alert messages for user actions
$(function () {
    var $cartItems = $(".cart-item"),
        getPrice = /(\d+)\.(\d{2})/g,
        animationEnd = "webkitAnimationEnd oanimationend oAnimationEnd animationend",
        removedItemAlert =
            '<li class="is-added"><div class="alert alert-default" data-mod="undo-alert">{{ Item name }} has been removed from your cart. <a href="" class="btn btn-secondary" data-mod="undo-delete-btn">↩ Undo</a></div></div>',
        emptyCartAlert =
            '<li class="is-added"><div class="alert alert-default"><h3 class="alert-header">Bummer, your cart\'s empty.</h3><div class="alert-body"><p>You currently don\'t have any items in your cart. Need some help? Check out our: </p><a href="" class="btn btn-primary">Products</a><span class=""> or </span><a href="" class="btn btn-deals">Specials</a></div></div></li>',
        removedItems = 0;
    getSubTotal = function () {
        var subTotal = itemPrice * itemQty;
        return subTotal.toFixed(2);
    };