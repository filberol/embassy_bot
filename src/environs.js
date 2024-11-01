export const tg_bot_token = process.env.TELEGRAM_BOT_TOKEN;
export const tg_bot_chat = process.env.TELEGRAM_BOT_CHAT;
export const int_from = process.env.INT_FROM;
export const int_to = process.env.INT_TO;
export const commit_name = process.env.COMMIT_NAME;

const businessId = "09250556-2450-437f-aede-82e78712f114"
export const serviceIds =
    {
        "Приобретения гражданства (4-й этаж)": "63fe0e8c-b127-43e3-874a-bac9c660045b",
        "Перерегистрация (брак / рождение / развод / смерть)": "96a60481-29f2-49e7-b986-5ad24c46f890"
    }

const url = "https://ambasada-r-moldova-in-f-rusa.reservio.com/api/v2/";
const business = `businesses/${businessId}/availability/booking-days`;
const filterResource = "?filter[resourceId]=";
const filterBoundaries = "&ignoreBookingBoundaries=0";

export function makeUrl(from, to, resource_id) {
    return url + business + filterResource +
        `&filter[serviceId]=${resource_id}` +
        filterBoundaries +
        `&filter[from]=${from}` +
        `&filter[to]=${to}`
}