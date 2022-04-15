const transactionType = {
    1: 'waitingConfirmOrder',
    2: 'waitingPayment',
    3: 'waitingApprovePayment',
    4: 'failedPayment',
    5: 'waitingShipping',
    6: 'duringShipping',
    7: 'success',
    8: 'cancel'
}

module.exports.transactionType = transactionType