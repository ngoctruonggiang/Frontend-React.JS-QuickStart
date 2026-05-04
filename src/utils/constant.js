//khai bao cac hang so dung chung trong du an de khi sua thi sua 1 cho
export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_DOCTOR: '/detail-doctor/:id',//:id la tham so dong
    DOCTOR: '/doctor',
    VERIFY_EMAIL_BOOKING: '/verify-booking',

    //path cho patient
    DETAIL_SPECIALTY: '/detail-specialty/:id',//id la tham so dong de truyen tham so id vao trang detail-specialty

};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};

export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3'
}