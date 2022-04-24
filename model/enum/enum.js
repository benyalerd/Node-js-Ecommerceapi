const transactionType = {
    1: 'addToCart',
    2: 'waitingPayment',
    3: 'waitingApprovePayment',
    4: 'failedPayment',
    5: 'waitingShipping',
    6: 'duringShipping',
    7: 'success',
    8: 'cancel'
}

const mediaType = {
    1: 'image',
    2: 'video'
}

const contentType = {
    1: 'mainImage',
    2: 'subMainImage',
    3: 'skuImage',
    4: 'promotionImage'
}

module.exports.transactionType = transactionType