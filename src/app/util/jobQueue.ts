import Queue from "bull";

export const myJobQueue = new Queue("myJobQueue");
