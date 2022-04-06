const transactionType = {
    1: 'waitingConfirmOrder',
    2: 'waitingPayment',
    3: 'waitingShipping',
    4: 'duringShipping',
    5: 'success',
    6: 'cancel'

}

module.exports.transactionType = transactionType