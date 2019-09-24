// Function that calculates the total of all items

$(function () {
    var $cartItems = $(".cart-item"),           //Getting the price of a single item.
        getPrice = /(\d+)\.(\d{2})/g,
        animationEnd = "webkitAnimationEnd oanimationend oAnimationEnd animationend",
        removedItemAlert =
            '<li class="is-added"><div class="alert alert-default" data-mod="undo-alert">{{ Item name }} has been removed from your cart. <a href="" class="btn btn-secondary" data-mod="undo-delete-btn">↩ Undo</a></div></div>',
        emptyCartAlert =
            '<li class="is-added"><div class="alert alert-default"><h3 class="alert-header">Bummer, your cart\'s empty.</h3><div class="alert-body"><p>You currently don\'t have any items in your cart. Need some help? Check out our: </p><a href="" class="btn btn-primary">Products</a><span class=""> or </span><a href="" class="btn btn-deals">Specials</a></div></div></li>',
        removedItems = 0;
    getSubTotal = function () {
        var subTotal = itemPrice * itemQty;      //  Multiplies the price of a single item to the number of items selected
        return subTotal.toFixed(2);
    };

    $cartItems.each(function (index) {
        var $cartItem = $(this),
            $itemInput = $cartItem.find("input"),
            $subTotal = $cartItem.find(".cart-item-subtotal");
            

// Getting price of a single item        

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

                $removedItem.addClass("is-removed").on(animationEnd, function () {     //----User removes items from a cart
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

// Removing items from a cart function

            var cartItemsLength = $cartItems.length;

            if (cartItemsLength === removedItems) {
                $(".cart-items-body").append(emptyCartAlert);
            } else {
            }

            $subTotal.text("$" + getSubTotal());

            $subTotal.addClass("pulse").on(animationEnd, function () {
                $subTotal.removeClass("pulse");
            });
        });
    });

    $(".cart-controls")
        .find(".btn-primary")
        .on("click", function () {
            $(".cart").addClass("is-hidden");
            $("#login")
                .addClass("is-added")
                .removeClass("is-hidden");
        });
    
// Login function after checking out


    $("#login")
        .find(".btn")
        .on("click", function (e) {
            e.preventDefault();
            $("#login").addClass("is-hidden");
            $("#checkout")
                .addClass("is-added")
                .removeClass("is-hidden");
        });

// Form validation function

    var validateForms = function () {
        var isValid = true,
            $formParent = $(this).closest("section");

        $formParent.find("input").each(function () {
            if (!$(this).val()) {
                isValid = false;
                $(this)
                    .closest(".field-wrap")
                    .addClass("error");
            }
        });

        if (isValid) {
            $(".progress-step.is-active")
                .next(".progress-step")
                .addClass("is-active");

            if ($formParent.hasClass("payment-info")) {
                $("#checkout").addClass("is-hidden");
                $("#checkout-receipt")
                    .addClass("is-added")
                    .on(animationEnd, function () {
                        $(this).removeClass("is-added");
                    })
                    .removeClass("is-hidden");
            } else {
                $formParent.addClass("is-hidden");
                $formParent
                    .next("section")
                    .removeClass("is-hidden")
                    .addClass("is-added")
                    .on(animationEnd, function () {
                        $(this).removeClass("is-added");
                    });
            }
            return false;
        } else {
            $formParent.addClass("error");
            return false;
        }
    };

//End of form validation function

    $("#step1, #step2, #step3")
        .find(".btn-primary")
        .on("click", validateForms);

    $("#step2, #step3")
        .find(".btn-secondary")
        .on("click", function (e) {
            e.preventDefault();

            $formParent = $(this).closest("section");

            $formParent.removeClass("is-added").addClass("is-hidden");
            $formParent
                .prev("section")
                .addClass("is-added")
                .on(animationEnd, function () {
                    $(this).removeClass("is-added");
                })
                .removeClass("is-hidden");

            $(".progress-step.is-active")
                .last(".is-active")
                .removeClass("is-active");
        });

    var $nlSignupBody = $(".nl-signup-body");        //Sign up form for checkout purposes

    $("#nl-signup").on("click", function (e) {
        e.preventDefault();
        $nlSignupBody
            .empty()
            .append(
                '<div class="is-added">Good choice! Be sure to lookout for our next newsletter on {{ date }}. You won\'t regret it.</div>'
            );
        $(".nl-signup").startDecay();
    });

// Final stage after checking out
    $("#nl-noThanks").on("click", function (e) {
        e.preventDefault();
        $nlSignupBody
            .empty()
            .append(
                '<div class="is-added">Too bad, please check us out in the future!</div>'
            );
        $(".nl-signup").startDecay();
    });
});

$.fn.startDecay = function () {
    parentContainer = this;

    parentContainer
        .css("position", "relative")
        .append('<div class="decay-progress"></div>')
        .delay(7000)
        .fadeOut(500);

    return false;
};
