export const tg_bot_token = process.env.TELEGRAM_BOT_TOKEN;
export const tg_bot_chat = process.env.TELEGRAM_BOT_CHAT;
export const int_from = process.env.INT_FROM;
export const int_to = process.env.INT_TO;

const businessId = "09250556-2450-437f-aede-82e78712f114"
const serviceId = "63fe0e8c-b127-43e3-874a-bac9c660045b"

const url = "https://ambasada-r-moldova-in-f-rusa.reservio.com/api/v2/";
const business = `businesses/${businessId}/availability/booking-days`;
const filterResource = "?filter[resourceId]=";
const filterService = `&filter[serviceId]=${serviceId}`;
const filterBoundaries = "&ignoreBookingBoundaries=0";

export function makeUrl(from, to) {
    return url + business + filterResource + filterService + filterBoundaries +
        `&filter[from]=${from}` + `&filter[to]=${to}`
}