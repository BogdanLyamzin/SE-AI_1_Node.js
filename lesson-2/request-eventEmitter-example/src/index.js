import RequestService from "./requests/RequestService.js";
import {writeAuditLog} from "./logs/logsOperations.js";
import {updateStats} from "./stats/statsOperations.js";

const requestService = new RequestService();

requestService.on("requestCreated", async request => {
  await writeAuditLog({operation: "requestCreated", request});
});

requestService.on("requestCreated", async request => {
  await updateStats("requestCreated");
});

requestService.on("requestDeleted", async request => {
  await writeAuditLog({operation: "requestDeleted", request});
})

requestService.on("requestDeleted", async request => {
  await updateStats("requestDeleted");
});

try {
  const request = await requestService.create({
    name: "Bogdan",
    message: "Не можу зайти в обліковий запис"
  });
  console.log(await requestService.getAll());
  await requestService.deleteById(request.id);
    console.log(await requestService.getAll());
}
catch(error) {
  console.log(error.message);
}