import axios from "axios";
var total_order = [];




console.log(1)
const initState = {
    countProductInCart: localStorage.getItem('countcart'),
    countOrder: localStorage.getItem('countorder'),
    //countOrder: total_order.length,
    // countOrder: 0,
    countCart: 0,
    search: [],
    total_order: []
}
console.log(2)
// axios.get('/api/view-order-by-user').then(res => {
//     if (res.data.status === 200) {
//         console.log(1)
//         total_order = res.data.data
//     }
//     this.setState({ countOrder: total_order.length })
// })
console.log(
    3
)



const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DECREMENT':
            try {
                // var countCartItems;
                // let isUser = localStorage.getItem('auth_name');
                // if (isUser) {
                //     axios.get(`/api/cart`).then((response) => {
                //         var list = response.data.data
                //         var count = 0;
                //         for (var i = 0; i < list.length; i++) {
                //             count++;
                //         }
                //         localStorage.setItem('countcart', count);
                //     })
                // }
                // else {
                //     countCartItems = localStorage.getItem('countcart');
                //     if (countCartItems === null) {
                //         localStorage.setItem('countcart', 0);
                //         return { ...state, countProductInCart: 0 };
                //     }
                // }


                const countCartItems = localStorage.getItem('countcart');
                if (countCartItems === null) {
                    return undefined;
                }
                localStorage.setItem('countcart', JSON.parse(countCartItems) - 1)
                return { ...state, countProductInCart: JSON.parse(countCartItems) - 1 }
            } catch (e) {
                return undefined;
            }
        // return {
        //     ...state, countProductInCart: --state.countProductInCart
        // };
        case 'INCREMENT':
            try {
                const countCartItems = localStorage.getItem('countcart');
                if (countCartItems === null) {
                    return undefined;
                }
                localStorage.setItem('countcart', JSON.parse(countCartItems) + 1)
                return { ...state, countProductInCart: JSON.parse(countCartItems) + 1 }

            } catch (e) {
                return undefined;
            }
        // return {
        //     ...state, countProductInCart: ++state.countProductInCart
        // };
        case 'SEARCHPRODUCT':
            console.log(action.payload);
            return {
                ...state, search: action.payload
            };

        case 'INCREMENTORDER':
            console.log(action.payload);
            try {
                const countOrders = localStorage.getItem('countorder');
                if (countOrders === null) {
                    return undefined;
                }
                localStorage.setItem('countorder', JSON.parse(countOrders) + 1)
                return { ...state, countOrder: JSON.parse(countOrders) + 1 }

            } catch (e) {
                return undefined;
            }
        case 'DESCREMENTORDER':
            console.log(action.payload);
            try {
                const countOrders = localStorage.getItem('countorder');
                if (countOrders === null) {
                    return undefined;
                }
                localStorage.setItem('countorder', JSON.parse(countOrders) - 1)
                return { ...state, countOrder: JSON.parse(countOrders) - 1 }

            } catch (e) {
                return undefined;
            }
        case 'RESETCOUNTCART':
            console.log(action.payload);
            try {
                const countOrders = localStorage.getItem('countcart');
                if (countOrders === null) {
                    return undefined;
                }
                localStorage.setItem('countcart', 0)
                return { ...state, countProductInCart: 0 }

            } catch (e) {
                return undefined;
            }
        default:
            return state;
    }

}

export default rootReducer;