export const ApiConstants = {
    BIKE: {
        ADD: (userId) => {
            return '/bike/' + userId
        },
        GET_ALLBIKES: (limit, page, filter) => {
            return `/bike/allBikes?limit=${limit || 10}&page=${page || 1}&avgRating=${filter?.avgRating || 5}&location=${filter?.location || '_'}&color=${filter?.color || '_'}&model=${filter?.model|| '_'}` 
        },
        GET_ALLBIKESADMIN: (limit, page, filter) => {
            return `/bike/allBikesAdmin?limit=${limit || 10}&page=${page || 1}&avgRating=${filter?.avgRating || 5}&location=${filter?.location || '_'}&color=${filter?.color || '_'}&model=${filter?.model|| '_'}` 
        },
        GET_BIKE: (bikeId) => {
            return '/bike/'+bikeId
        },
        UPDATE_BIKE: (userId, bikeId) => {
            return '/bike/'+userId+'/'+bikeId
        },
        DELETE_BIKE: (userId, bikeId) => {
            return '/bike/'+userId+'/'+bikeId
        },
    },
    RES: {
        ADD: (userId, bikeId) => {
            return '/reservation/create/' +userId+'/'+bikeId
        },
        ALL_RES: '/reservation/allReservations',
        GET_RES: (id) => {
            return '/reservation/' + id
        },
        GET_RES_BY_USER: (userId) => {
            return '/reservation/Reservation/user/' + userId
        },
        GET_RES_BY_BIKE: (bikeId) => {
            return '/reservation/Reservation/bike/' + bikeId
        },
        GET_RES_BY_USER_AND_BIKE: (userId, bikeId) => {
            return '/reservation/' +userId+'/'+bikeId
        },
        UPDATE_RES: (userId, resId) => {
            return '/reservation/' + userId +'/'+ resId
        },
        DELETE_RES: (userId, resId) => {
            return '/reservation/' + userId +'/'+ resId
        },
        CANCEL_RES: (userId, resId) => {
            return '/reservation/cancelReservation/' + userId +'/'+ resId
        },
    },
    REV: {
        ADD: (userId, bikeId) => {
            return '/review/' + userId +'/'+ bikeId
        },
        GET_REV_BY_BIKE: (bikeId) => {
            return '/review/Bike/' + bikeId
        },
        GET_REV: (id) => {
            return '/review/' + id
        },
    },

    USER: {
        ADD: "/user/signUp",
        GET: '/user',
        GET_BYID: (id)=> {
            return '/user/' + id
        },
        GET_BYMAIL: (email) => {
            return '/user/mail/' + email
        },
        UPGRADE: (id) => {
            return '/user/upgrade/' + id
        },
        UPDATE:(id) => {
            return '/user/' + id
        },
        UPDATE_USER: (id) => {
            return '/user/update/' + id
        },
        DELETE: (id) => {
            return '/user/' + id
        }
    },

    AUTH: {
        LOGIN: "/auth/login"
    }

}