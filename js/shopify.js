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

            $cartItems.each(function (index) {
                        var $cartItem = $(this),
                            $itemInput = $cartItem.find("input"),
                            $subTotal = $cartItem.find(".cart-item-subtotal");

                        itemPrice = $cartItem
                            .find(".cart-item-price")
                            .text()
                            .match(getPrice);
                        itemQty = $itemInput.val();

                        $subTotal.append("$" + getSubTotal());

                        $itemInput.on("input", function () {
                                    itemPrice = $cartItem
                                        .find(".cart-item-price")
                                        .text()
                                        .match(getPrice);
                                    itemQty = $cartItem.find("input").val();

                                    if (itemQty <= 0) {
                                        $removedItem = $cartItem;

                                        $removedItem.addClass("is-removed").on(animationEnd, function () {
                                            $removedItem.removeClass("is-removed").addClass("is-hidden");
                                        });

                                        $('[data-mod="undo-alert"]')
                                            .parent("li")
                                            .remove();
                                        $removedItem.before(removedItemAlert);
                                        $('[data-mod="undo-alert"]').startDecay();
                                        $('[data-mod="undo-alert"]')
                                            .parent("li")
                                            .delay(7000)
                                            .fadeOut();

                                        removedItems += 1;
                                    }
