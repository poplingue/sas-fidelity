let deferredPrompt;

self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

self.addEventListener("push", (event) => {
  console.log("worker event push", event);
});

self.addEventListener("sync", (event) => {
  console.log("worker event sync", event);
});

self.addEventListener("messageerror", (error) => {
  console.log("worker message error", error);
});

self.addEventListener("rejectionhandled", (error) => {
  console.log("worker rejectionhandled error", error);
});

self.addEventListener("unhandledrejection", (error) => {
  console.log("worker unhandledrejection error", error);
});
