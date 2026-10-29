import { getRequests, createRequest, deleteRequestById } from "./requests/requestOperations.js";

try {
  const newRequest = await createRequest({
    name: "Bogdan",
    message: "Не можу увійти у свій обліковий запис",
  });
  console.log(await getRequests());
  await deleteRequestById(newRequest.id);
  console.log(await getRequests());
} catch (error) {
  console.log(error.message);
}
