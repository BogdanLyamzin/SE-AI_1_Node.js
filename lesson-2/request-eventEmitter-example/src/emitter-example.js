import {EventEmitter} from "node:events";

const emitter = new EventEmitter();

emitter.once("requestCreated", ()=> {
    console.log("First request");
})

emitter.on("requestCreated", (request)=> {
    console.log(`Save request with ${request.id} to audit log`);
    // writeAuditLog(request);
});

const addToStats = (request)=> {
    console.log(`Add request with ${request.id} to stats`);
    // updateStats(request);
};

emitter.on("requestCreated", addToStats);

// emitter.on("requestCreated", request => {
//     notifyAdmin(request);
// })

emitter.emit("requestCreated", {
    id: "request-1",
    name: "Bogdan",
    mesasge: "Не можу зайти в свій обліковий запис",
    status: "new"
});
emitter.off("requestCreated", addToStats)
emitter.emit("requestCreated", {
    id: "request-2",
    name: "Nastya",
    mesasge: "Зламалася клавітура",
    status: "new"
});