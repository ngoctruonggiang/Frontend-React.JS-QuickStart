import EventEmitter from "events";

const emitter = new EventEmitter();
emitter.setMaxListeners(0);//set so luong listener khong gioi han

export default emitter;